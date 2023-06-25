<?php
/**
 * Common utility functions for the Fewer plugin.
 *
 * @package Fewer
 */

/**
 * Load a Fewer temlate.
 *
 * @param string $template_name The name of the template to load.
 * @param array  $args          Optional. Args to pass to the template. Requires WP 5.5+.
 *
 * @uses load_template
 */
function fewerwc_load_template( $template_name, $args = array() ) {
	$locations = array(
		// Child theme directory.
		get_stylesheet_directory() . '/templates/' . $template_name . '.php',

		// Parent theme directory.
		get_template_directory() . '/templates/' . $template_name . '.php',

		// Plugin directory.
		FEWERWC_PATH . 'templates/' . $template_name . '.php',
	);

	// Check each file location and load the first one that exists.
	foreach ( $locations as $location ) {
		if ( file_exists( $location ) ) {
			$action_template_name = str_replace(
				array( '/', '-' ),
				'_',
				$template_name
			);

			/**
			 * Action hook to trigger before loading the template.
			 *
			 * @param array $args Array of args that get passed to the template.
			 */
			do_action( "fewerwc_before_load_template_{$action_template_name}", $args );

			/**
			 * WordPress load_template function to load the located template.
			 *
			 * @param string $location     Location of the template to load.
			 * @param bool   $require_once Flag to use require_once instead of require.
			 * @param array  $args         Array of args to pass to the tepmlate. Requires WP 5.5+.
			 */
			load_template( $location, false, $args );

			/**
			 * Action hook to trigger after loading the template.
			 *
			 * @param array $args Array of args that get passed to the template.
			 */
			do_action( "fewerwc_after_load_template_{$action_template_name}", $args );

			fewerwc_log_info( 'Loaded template: ' . $location );
			return;
		}
	}
}


/**
 * Determine if a product is supported.
 *
 * @param int $product_id The product ID to check.
 *
 * @return bool
 */
function fewerwc_product_is_supported( $product_id ) {
	/**
	 * Filter to determine if a product is supported by Fewer Checkout. Returns true by default.
	 *
	 * @param bool $is_supported Flag to pass through the filters to set if the product is supported.
	 * @param int  $product_id   The ID of the product to check.
	 */
	$is_supported = apply_filters( 'fewerwc_product_is_supported', true, $product_id );

	fewerwc_log_info( 'Product is' . ( $is_supported ? '' : ' not' ) . ' supported: ' . $product_id );

	return $is_supported;
}

/**
 * Check if a product is supported based on if it has addons.
 *
 * @param bool $is_supported Flag to pass through the filters to set if the product is supported.
 * @param int  $product_id   The ID of the product to check.
 *
 * @return bool
 */
function fewerwc_product_is_supported_if_no_addons( $is_supported, $product_id ) {
	if ( fewerwc_product_has_addons( $product_id ) ) {
		$is_supported = false;
	}

	fewerwc_log_info( 'Product is' . ( $is_supported ? '' : ' not' ) . ' supported after addon check: ' . $product_id );

	return $is_supported;
}
add_filter( 'fewerwc_product_is_supported', 'fewerwc_product_is_supported_if_no_addons', 10, 2 );

/**
 * Check if a product is supported based on if it is not a grouped product.
 *
 * @param bool $is_supported Flag to pass through the filters to set if the product is supported.
 * @param int  $product_id   The ID of the product to check.
 *
 * @return bool
 */
function fewerwc_product_is_supported_if_not_grouped( $is_supported, $product_id ) {
	if ( fewerwc_product_is_grouped( $product_id ) ) {
		$is_supported = false;
	}

	fewerwc_log_info( 'Product is' . ( $is_supported ? '' : ' not' ) . ' supported after grouped check: ' . $product_id );

	return $is_supported;
}
add_filter( 'fewerwc_product_is_supported', 'fewerwc_product_is_supported_if_not_grouped', 10, 2 );

/**
 * Check if a product is supported based on if it is not a subscription product.
 *
 * @param bool $is_supported Flag to pass through the filters to set if the product is supported.
 * @param int  $product_id   The ID of the product to check.
 *
 * @return bool
 */
function fewerwc_product_is_supported_if_not_subscription( $is_supported, $product_id ) {
	if ( fewerwc_product_is_subscription( $product_id ) ) {
		$is_supported = false;
	}

	fewerwc_log_info( 'Product is' . ( $is_supported ? '' : ' not' ) . ' supported after subscription check: ' . $product_id );

	return $is_supported;
}
add_filter( 'fewerwc_product_is_supported', 'fewerwc_product_is_supported_if_not_subscription', 10, 2 );

/**
 * Detect if the product has any addons (Fewer Checkout does not yet support these products).
 *
 * @param int $product_id The ID of the product.
 *
 * @return bool
 */
function fewerwc_product_has_addons( $product_id ) {
	$has_addons = false;

	if ( class_exists( WC_Product_Addons_Helper::class ) ) {
		// If the store has the addons plugin installed, then we can use its static function to see if this product has any
		// addons.
		$addons = WC_Product_Addons_Helper::get_product_addons( $product_id );
		if ( ! empty( $addons ) ) {
			// If this product has any addons (not just the one in the cart, but the product as a whole), hide the button.
			$has_addons = true;
		}
	}

	fewerwc_log_info( 'Product does' . ( $has_addons ? '' : ' not' ) . ' have addons: ' . $product_id );

	return $has_addons;
}

/**
 * Detect if the product is a grouped product (Fewer Checkout does not yet support these products).
 *
 * @param int $product_id The ID of the product.
 *
 * @return bool
 */
function fewerwc_product_is_grouped( $product_id ) {
	$is_grouped = false;

	$product = wc_get_product( $product_id );

	if (
		method_exists( $product, 'get_type' ) &&
		'grouped' === $product->get_type()
	) {
		$is_grouped = true;
	}

	fewerwc_log_info( 'Product is' . ( $is_grouped ? '' : ' not' ) . ' grouped: ' . $product_id );

	return $is_grouped;
}

/**
 * Detect if the product is a subscription product (Fewer Checkout does not yet support these products).
 *
 * @param int $product_id The ID of the product.
 *
 * @return bool
 */
function fewerwc_product_is_subscription( $product_id ) {
	$product = wc_get_product( $product_id );

	$is_subscription = false;

	if (
		is_a( $product, WC_Product_Subscription::class ) ||
		is_a( $product, WC_Product_Variable_Subscription::class )
	) {
		$is_subscription = true;
	}

	fewerwc_log_info( 'Product is' . ( $is_subscription ? '' : ' not' ) . ' a subscription: ' . $product_id );

	return false;
}




/**
 * Check whether or not to use dark mode.
 *
 * @param int $product_id Optional. The ID of the product.
 *
 * @return bool
 */
function fewerwc_use_dark_mode( $product_id = 0 ) {
	$use_dark_mode = get_option( FEWERWC_SETTING_USE_DARK_MODE, false );

	/**
	 * Filter the boolean for using dark mode. The product ID allows for setting
	 * or disabling dark mode for specific products.
	 *
	 * @param bool $use_dark_mode The global dark mode setting.
	 * @param int  $product_id    The ID of the product.
	 *
	 * @return bool
	 */
	return apply_filters( 'fewer_use_dark_mode', $use_dark_mode, $product_id );
}


function fewerwc_refund_request($order,$request_body){
    $url = FEWERWC_REFUND_HOST . $order->get_transaction_id().'/';
    $response =  wp_remote_request(
        $url,
        array(
            'method' => 'POST',
            'body' => $request_body,
            'headers'  => [
                'Authorization' => fewerwc_get_app_secret()
            ],
        )
    );
    $response_code = wp_remote_retrieve_response_code($response);
    if(in_array($response_code, array(200, 201))){
        $response_body = json_decode(wp_remote_retrieve_body($response));
        if($response_body->status == 'success'){
            return true;
        }
    }
    return false;
}
