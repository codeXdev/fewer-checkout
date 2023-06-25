<?php
/**
 * Fewer Plugin Settings
 *
 * Adds config UI for wp-admin.
 *
 * @package Fewer
 */

// Load admin notices.
require_once FEWERWC_PATH . 'includes/admin/notices.php';
// Load admin constants.
require_once FEWERWC_PATH . 'includes/admin/constants.php';
// Load admin fields.
require_once FEWERWC_PATH . 'includes/admin/fields.php';

/**
 * Add timestamp when an option is updated.
 *
 * @param string $option    Name of the updated option.
 * @param mixed  $old_value The old option value.
 * @param mixed  $value     The new option value.
 */
function fewerwc_updated_option( $option, $old_value, $value ) {
	if ( $old_value === $value ) {
		return;
	}

	$stampable_options = array(
		FEWERWC_SETTING_APP_ID
	);

	if ( in_array( $option, $stampable_options, true ) ) {
		$fewerwc_settings_timestamps = get_option( FEWERWC_SETTINGS_TIMESTAMPS, array() );

		$fewerwc_settings_timestamps[ $option ] = time();

		update_option( FEWERWC_SETTINGS_TIMESTAMPS, $fewerwc_settings_timestamps );
	}
}
add_action( 'updated_option', 'fewerwc_updated_option', 10, 3 );

add_action( 'admin_menu', 'fewerwc_admin_create_menu' );
add_action( 'admin_init', 'fewerwc_maybe_redirect_after_activation', 1 );
add_action( 'admin_init', 'fewerwc_admin_setup_sections' );
add_action( 'admin_init', 'fewerwc_admin_setup_fields' );

/**
 * Add plugin action links to the Fewer plugin on the plugins page.
 *
 * @param array  $plugin_meta The list of links for the plugin.
 * @param string $plugin_file Path to the plugin file relative to the plugins directory.
 * @param array  $plugin_data An array of plugin data.
 * @param string $status      Status filter currently applied to the plugin list. Possible
 *                            values are: 'all', 'active', 'inactive', 'recently_activated',
 *                            'upgrade', 'mustuse', 'dropins', 'search', 'paused',
 *                            'auto-update-enabled', 'auto-update-disabled'.
 *
 * @return array
 */
function fewerwc_admin_plugin_row_meta( $plugin_meta, $plugin_file, $plugin_data, $status ) {
	if ( plugin_basename( FEWERWC_PATH . 'fewer.php' ) !== $plugin_file ) {
		return $plugin_meta;
	}

	// Add "Become a Seller!" CTA if the Fewer App ID has not yet been set.
	if ( function_exists( 'fewerwc_get_app_id' ) ) {
		$fewer_app_id = fewerwc_get_app_id();

		if ( empty( $fewer_app_id ) ) {
			$fewerwc_setting_fewer_onboarding_url = get_option(FEWERWC_MERCHANT_DASHBOARD);

			$plugin_meta[] = printf(
				'%1$s <a href="%2$s" target="_blank" rel="noopener">%3$s</a>',
				esc_html__( "Don't have an app yet?", 'fewer' ),
				esc_url( $fewerwc_setting_fewer_onboarding_url ),
				esc_html__( 'Create account on Fewer.tech to get an Merchant ID and enter it here.', 'fewer' )
			);
		}
	}

	$plugin_meta[] = sprintf(
		'<a href="%1$s">%2$s</a>',
		esc_url( admin_url( 'admin.php?page=fewer' ) ),
		esc_html__( 'Settings', 'fewer' )
	);

	return $plugin_meta;
}
add_action( 'plugin_row_meta', 'fewerwc_admin_plugin_row_meta', 10, 4 );

/**
 * Registers the Fewer menu within wp-admin.
 */
function fewerwc_admin_create_menu() {
	// Add the menu item and page.
	$page_title = 'Fewer Settings';
	$menu_title = 'Fewer Checkout';
	$capability = 'manage_options';
	$slug       = 'fewer';
	$callback   = 'fewerwc_settings_page_content';
	$icon 		= 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiB3aWR0aD0iNzMuMDAwMDAwcHQiIGhlaWdodD0iNjEuMDAwMDAwcHQiIHZpZXdCb3g9IjAgMCA3My4wMDAwMDAgNjEuMDAwMDAwIgogcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCI+Cgo8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCw2MS4wMDAwMDApIHNjYWxlKDAuMTAwMDAwLC0wLjEwMDAwMCkiCmZpbGw9IiMwMDAwMDAiIHN0cm9rZT0ibm9uZSI+CjxwYXRoIGQ9Ik0yMCA1OTAgYy0xOSAtMTkgLTIwIC0zMyAtMjAgLTI4OSAwIC0yNjggMCAtMjcwIDIyIC0yODUgMTkgLTE0IDcwCi0xNiAzNTAgLTE2IDMyNiAwIDMyNyAwIDM0MiAyMiAxNCAxOSAxNiA2NCAxNiAyOTAgMCAyNjQgMCAyNjcgLTIyIDI4MiAtMTkKMTQgLTY5IDE2IC0zNDUgMTYgLTMxMCAwIC0zMjQgLTEgLTM0MyAtMjB6IG0zOTUgLTg2IGMxOSAtMTAgMzEgLTExIDMzIC01IDIKNiAyOCAxMSA1OCAxMSBsNTQgMCAwIC0yMDAgMCAtMjAwIC01NSAwIGMtMzAgMCAtNTUgNCAtNTUgOSAwIDYgLTE3IDMgLTM3IC02Ci0xMTAgLTQ1IC0yMzQgNDEgLTI1MCAxNzUgLTcgNjQgMTAgMTE0IDU2IDE2NSA1OSA2NSAxMzIgODQgMTk2IDUxeiIvPgo8cGF0aCBkPSJNMzE4IDM5NSBjLTU5IC0zMiAtNTggLTEzOSAyIC0xNzAgNDMgLTIyIDY4IC0xOCAxMDEgMTQgMjMgMjQgMjkgMzgKMjkgNzQgMCAzOCAtNSA0OSAtMzEgNzEgLTM0IDI5IC02MSAzMiAtMTAxIDExeiIvPgo8L2c+Cjwvc3ZnPgo=';
	$position   = 100;

	add_menu_page( $page_title, $menu_title, $capability, $slug, $callback, $icon, $position );
}

/**
 * Maybe redirect to the Fewer settings page after activation.
 */
function fewerwc_maybe_redirect_after_activation() {
	$activated = get_option( FEWERWC_PLUGIN_ACTIVATED, false );

	if ( $activated ) {
		// Delete the flag to prevent an endless redirect loop.
		delete_option( FEWERWC_PLUGIN_ACTIVATED );

		// Redirect to the Fewer settings page.
		wp_safe_redirect(
			esc_url(
				admin_url( 'admin.php?page=fewer' )
			)
		);
		exit;
	}
}

/**
 * Get the list of tabs for the Fewer settings page.
 *
 * @return array
 */
function fewerwc_get_settings_tabs() {
	/**
	 * Filter the list of settins tabs.
	 *
	 * @param array $settings_tabs The settings tabs.
	 *
	 * @return array
	 */
	return apply_filters(
		'fewerwc_settings_tabs',
		array(
			'fewer_app_info'  => __( 'Basic Configuration', 'fewer' ),
			'fewer_options'    => __( 'Button', 'fewer' ),
			'fewer_styles'   => __( 'Advanced', 'fewer' ),
		)
	);
}

/**
 * Get the active tab in the Fewer settings page.
 *
 * @return string
 */
function fewerwc_get_active_tab() {
	return isset( $_GET['tab'] ) ? sanitize_text_field( wp_unslash( $_GET['tab'] ) ) : 'fewer_app_info'; // phpcs:ignore
}

/**
 * Renders content of Fewer settings page.
 */
function fewerwc_settings_page_content() {
	fewerwc_load_template( 'admin/fewer-settings' );
}

/**
 * Sets up sections for Fewer settings page.
 */
function fewerwc_admin_setup_sections() {

	$section_name = 'fewer_app_info';
	add_settings_section( $section_name, '', false, $section_name );
	register_setting( $section_name, FEWERWC_SETTING_APP_ID );
	register_setting( $section_name, FEWERWC_SETTING_APP_SECRET );
	register_setting( $section_name, FEWERWC_SETTING_CURRENCY );
	register_setting( $section_name, FEWERWC_SETTING_ADDRESS_REQUIRED );
	register_setting( $section_name, FEWERWC_SETTING_GUEST_EMAIL_REQUIRED );
	register_setting( $section_name, FEWERWC_SETTING_TEST_MODE );
	register_setting( $section_name, FEWERWC_SETTING_DEBUG_MODE );
	register_setting( $section_name, FEWERWC_SETTING_USE_DARK_MODE );
	register_setting( $section_name, FEWERWC_SETTING_HIDE_SHIPPING_METHODS );
	register_setting( $section_name, FEWERWC_SETTING_EXCLUDE_SHIPPING_METHODS );
	register_setting( $section_name, FEWERWC_SETTING_POSTCODE_OPTIONAL_COUNTRIES );
	register_setting( $section_name, FEWERWC_SETTING_EXCLUDE_INSTALLMENT_SLUGS );
	register_setting( $section_name, FEWERWC_SETTING_INSTALLMENT_OPTIONS );

	$section_name = 'fewer_styles';
	add_settings_section( $section_name, '', false, $section_name );
	register_setting( $section_name, FEWERWC_SETTING_EXTRA_EVENTS );
	register_setting( $section_name, FEWERWC_SETTING_PDP_BUTTON_STYLES );
	register_setting( $section_name, FEWERWC_SETTING_CART_BUTTON_STYLES );
	register_setting( $section_name, FEWERWC_SETTING_MINI_CART_BUTTON_STYLES );
	register_setting( $section_name, FEWERWC_SETTING_CHECKOUT_BUTTON_STYLES );

	$section_name = 'fewer_options';
	add_settings_section( $section_name, '', false, $section_name );
	register_setting( $section_name, FEWERWC_SETTING_AUTO_RENDER_PRODUCT_BUTTON );
	register_setting( $section_name, FEWERWC_SETTING_PRODUCT_BUTTON_PLACEMENT );
//	register_setting( $section_name, FEWERWC_SETTING_HIDE_PRODUCT_BUTTON_IF_CART_NOT_EMPTY );
	register_setting( $section_name, FEWERWC_SETTING_AUTO_RENDER_CART_BUTTON );
	register_setting( $section_name, FEWERWC_SETTING_CART_PAGE_BUTTON_PLACEMENT );
	register_setting( $section_name, FEWERWC_SETTING_AUTO_RENDER_CHECKOUT_PAGE_BUTTON );
	register_setting( $section_name, FEWERWC_SETTING_CHECKOUT_PAGE_BUTTON_PLACEMENT );
	register_setting( $section_name, FEWERWC_SETTING_AUTO_RENDER_MINICART_BUTTON );
	
}

/**
 * Sets up fields for Fewer settings page.
 */
function fewerwc_admin_setup_fields() {
	// App Info settings.
	$settings_section = 'fewer_app_info';
	add_settings_field( FEWERWC_SETTING_APP_ID, __( 'Fewer Marchant Id', 'fewer' ), 'fewerwc_app_id_content', $settings_section, $settings_section );
	// add_settings_field( FEWERWC_SETTING_APP_SECRET, __( 'Fewer API Secret', 'fewer' ), 'fewerwc_app_secret_content', $settings_section, $settings_section );
    add_settings_field( FEWERWC_SETTING_INSTALLMENT_OPTIONS, __( 'Checkout URL', 'fewer' ), 'fewerwc_setting_installment_options_content', $settings_section, $settings_section );
	add_settings_field( FEWERWC_SETTING_EXCLUDE_INSTALLMENT_SLUGS, __( 'Product Instalment Slugs', 'fewer' ), 'fewerwc_setting_exclude_installment_slugs_content', $settings_section, $settings_section );
	add_settings_field( FEWERWC_SETTING_CURRENCY, __( 'Currency', 'fewer' ), 'fewer_currency_content', $settings_section, $settings_section );
	add_settings_field( FEWERWC_SETTING_USE_DARK_MODE, __( 'Dark Mode', 'fewer' ), 'fewerwc_setting_use_dark_mode', $settings_section, $settings_section );
	add_settings_field( FEWERWC_SETTING_ADDRESS_REQUIRED, __( 'Address Required ', 'fewer' ), 'fewerwc_address_required_content', $settings_section, $settings_section );
	add_settings_field( FEWERWC_SETTING_GUEST_EMAIL_REQUIRED, __( 'Guest Email Required', 'fewer' ), 'fewerwc_guest_email_required_content', $settings_section, $settings_section );
	add_settings_field( FEWERWC_SETTING_HIDE_SHIPPING_METHODS, __( 'Hide shipping methods', 'fewer' ), 'fewerwc_hide_shipping_methods_content', $settings_section, $settings_section );
	add_settings_field( FEWERWC_SETTING_EXCLUDE_SHIPPING_METHODS, __( 'Exclude shipping methods', 'fewer' ), 'fewerwc_exclude_shipping_methods_content', $settings_section, $settings_section );
	add_settings_field( FEWERWC_SETTING_POSTCODE_OPTIONAL_COUNTRIES, __( 'Optional Postal Code', 'fewer' ), 'fewerwc_postcode_optional_countries_content', $settings_section, $settings_section );
	add_settings_field( FEWERWC_SETTING_TEST_MODE, __( 'Test Mode', 'fewer' ), 'fewerwc_test_mode_content', $settings_section, $settings_section );
	add_settings_field( FEWERWC_SETTING_DEBUG_MODE, __( 'Debug Mode', 'fewer' ), 'fewerwc_debug_mode_content', $settings_section, $settings_section );
	

	// Button style settings.
	$settings_section = 'fewer_options';

	add_settings_field( FEWERWC_SETTING_AUTO_RENDER_PRODUCT_BUTTON, __( 'Automatically render button in product page', 'fewer' ), 'fewer_auto_render_product_button_content', $settings_section, $settings_section );
	add_settings_field( FEWERWC_SETTING_PRODUCT_BUTTON_PLACEMENT, __( 'Product button placement', 'fewer' ), 'fewerwc_product_button_placement_content', $settings_section, $settings_section );
//	add_settings_field( FEWERWC_SETTING_HIDE_PRODUCT_BUTTON_IF_CART_NOT_EMPTY, __( 'Hide button if cart contains at least one item', 'fewer' ), 'fewerwc_hide_product_button_if_cart_not_empty_content', $settings_section, $settings_section );
	add_settings_field( FEWERWC_SETTING_AUTO_RENDER_CART_BUTTON, __( 'Automatically render button in cart page', 'fewer' ), 'fewer_auto_render_cart_button_content', $settings_section, $settings_section );
	add_settings_field( FEWERWC_SETTING_CART_PAGE_BUTTON_PLACEMENT, __( 'Cart page button placement', 'fewer' ), 'fewerwc_cart_page_button_placement_content', $settings_section, $settings_section );
//	add_settings_field( FEWERWC_SETTING_AUTO_RENDER_CHECKOUT_PAGE_BUTTON, __( 'Automatically render button in checkout page', 'fewer' ), 'fewerwc_auto_render_checkout_page_button_content', $settings_section, $settings_section );
//	add_settings_field( FEWERWC_SETTING_CHECKOUT_PAGE_BUTTON_PLACEMENT, __( 'Checkout page button placement', 'fewer' ), 'fewerwc_checkout_page_button_placement_content', $settings_section, $settings_section );
	add_settings_field( FEWERWC_SETTING_AUTO_RENDER_MINICART_BUTTON, __( 'Render quick checkout in minicart widget', 'fewer' ), 'fewerwc_auto_render_minicart_button_content', $settings_section, $settings_section );


	// Button options settings.
	$settings_section = 'fewer_styles';
	add_settings_field( FEWERWC_SETTING_EXTRA_EVENTS, __( 'Extra javascript events', 'fewer' ), 'fewerwc_checkout_extra_events_content', $settings_section, $settings_section );
	add_settings_field( FEWERWC_SETTING_PDP_BUTTON_STYLES, __( 'Product page button styles', 'fewer' ), 'fewerwc_pdp_button_styles_content', $settings_section, $settings_section );
	add_settings_field( FEWERWC_SETTING_CART_BUTTON_STYLES, __( 'Cart page button styles', 'fewer' ), 'fewerwc_cart_button_styles_content', $settings_section, $settings_section );
	add_settings_field( FEWERWC_SETTING_MINI_CART_BUTTON_STYLES, __( 'Mini cart widget button styles', 'fewer' ), 'fewerwc_mini_cart_button_styles_content', $settings_section, $settings_section );
	add_settings_field( FEWERWC_SETTING_CHECKOUT_BUTTON_STYLES, __( 'Checkout page button styles', 'fewer' ), 'fewerwc_checkout_button_styles_content', $settings_section, $settings_section );

}

/**
 * Renders the App ID field.
 */
function fewerwc_app_id_content() {
	$fewerwc_setting_app_id              = fewerwc_get_app_id();
	$fewerwc_setting_fewer_onboarding_url = get_option(FEWERWC_MERCHANT_DASHBOARD);

	$description = '';
	if ( empty( $fewerwc_setting_app_id ) ) {
		$description = sprintf(
			'%1$s <a href="%2$s" target="_blank" rel="noopener">%3$s</a>',
			esc_html__( "Don't have an app yet?", 'fewer' ),
			esc_url( $fewerwc_setting_fewer_onboarding_url ),
			esc_html__( 'Create account on Fewer.tech to get an Merchant ID and enter it here.', 'fewer' )
		);
	}

	fewerwc_settings_field_input(
		array(
			'name'        => 'fewer_app_id',
			'value'       => $fewerwc_setting_app_id,
			'description' => $description,
			'style'		  => 'width:30%'
		)
	);
}

add_filter( 'pre_update_option_fewer_app_id', function( $new_value, $old_value ) {
    if($new_value === ''){
        update_option('fewer_valid_app_id',false);
    }
    if($new_value != $old_value){
        $result = checkMerchant($new_value);
        if(gettype($result) == 'array' || $result != null){
            $valid = array_key_exists('valid',$result) && $result['valid'] == 1;
            update_option('fewer_valid_app_id',$valid);
        }else{
            update_option('fewer_valid_app_id',false);
        }
    }
    return $new_value;
  
  }, 10, 2);

function checkMerchant($merchant_id)
{
    $url = FEWERWC_SERVER_URI.'/merchant/check/'.$merchant_id;
    $res = wp_remote_retrieve_body( wp_remote_get( $url ) );
    return json_decode($res,true);
}

function fewerwc_app_secret_content() {
    $fewerwc_setting_app_secret              = fewerwc_get_app_secret();
    $fewerwc_setting_fewer_onboarding_url = get_option(FEWERWC_MERCHANT_DASHBOARD);

    $description = '';
    if ( empty( $fewerwc_setting_app_secret ) ) {
        $description = sprintf(
            '%1$s <a href="%2$s" target="_blank" rel="noopener">%3$s</a>',
            esc_html__( "Don't have a Secret Api Key yet ?", 'fewer' ),
            esc_url( $fewerwc_setting_fewer_onboarding_url ),
            esc_html__( 'Go to merchant account. Get the Secret API Key.', 'fewer' )
        );
    }

    fewerwc_settings_field_input(
        array(
            'name'        => 'fewer_app_secret',
            'value'       => $fewerwc_setting_app_secret,
            'description' => $description,
            'style'		  => 'width:30%'
        )
    );
}

function fewerwc_setting_installment_options_content() {

	$description = 'Add a full link to checkout url to be able to use installment options in Fewer Checkout Button.';

	fewerwc_settings_field_input(
		array(
			'name'        => FEWERWC_SETTING_INSTALLMENT_OPTIONS,
			'value'       => get_option(FEWERWC_SETTING_INSTALLMENT_OPTIONS),
			'description' => $description,
			'style'		  => 'width:30%'
		)
	);
}

function fewerwc_setting_exclude_installment_slugs_content() {

	$description = 'Add product categories,tags slugs comma separated to exclude from installment options in Fewer Checkout Button.';

	fewerwc_settings_field_input(
		array(
			'name'        => FEWERWC_SETTING_EXCLUDE_INSTALLMENT_SLUGS,
			'value'       => get_option(FEWERWC_SETTING_EXCLUDE_INSTALLMENT_SLUGS),
			'description' => $description,
			'style'		  => 'width:30%'
		)
	);
}
function fewer_currency_content(){
	$fewerwc_setting_currency = fewerwc_get_option_or_set_default( FEWERWC_SETTING_CURRENCY, "SA" );
	fewerwc_settings_field_input(
		array(
			'name'        => 'fewer_checkout_currency',
			'value'       => $fewerwc_setting_currency,
			'style'		  => 'width:30%'
		)
	);
}

/**
 * Renders a checkbox to set whether or not to enable dark mode.
 */
function fewerwc_setting_use_dark_mode() {
	$fewerwc_use_dark_mode = get_option( FEWERWC_SETTING_USE_DARK_MODE, 0 );

	fewerwc_settings_field_checkbox(
		array(
			'name'        => FEWERWC_SETTING_USE_DARK_MODE,
			'current'     => $fewerwc_use_dark_mode,
			'label'       => __( 'Enable Dark Mode for the Fewer Buttons.', 'fewer' ),
			'description' => __( 'When this box is checked, the Fewer buttons will be rendered in dark mode.', 'fewer' ),
		)
	);
}

/**
 * Renders the PDP button styles field.
 */
function fewerwc_pdp_button_styles_content() {
	$fewerwc_setting_pdp_button_styles = fewerwc_get_option_or_set_default( FEWERWC_SETTING_PDP_BUTTON_STYLES, FEWERWC_SETTING_PDP_BUTTON_STYLES_DEFAULT );

	fewerwc_settings_field_textarea(
		array(
			'name'  => 'fewer_pdp_button_styles',
			'value' => $fewerwc_setting_pdp_button_styles,
		)
	);
}

/**
 * Renders the cart button styles field.
 */
function fewerwc_cart_button_styles_content() {
	$fewerwc_setting_cart_button_styles = fewerwc_get_option_or_set_default( FEWERWC_SETTING_CART_BUTTON_STYLES, FEWERWC_SETTING_CART_BUTTON_STYLES_DEFAULT );

	fewerwc_settings_field_textarea(
		array(
			'name'  => 'fewer_cart_button_styles',
			'value' => $fewerwc_setting_cart_button_styles,
		)
	);
}

/**
 * Renders the mini-cart button styles field.
 */
function fewerwc_mini_cart_button_styles_content() {
	$fewerwc_setting_mini_cart_button_styles = fewerwc_get_option_or_set_default( FEWERWC_SETTING_MINI_CART_BUTTON_STYLES, FEWERWC_SETTING_MINI_CART_BUTTON_STYLES_DEFAULT );

	fewerwc_settings_field_textarea(
		array(
			'name'  => 'fewer_mini_cart_button_styles',
			'value' => $fewerwc_setting_mini_cart_button_styles,
		)
	);
}

/**
 * Renders the checkout button styles field.
 */
function fewerwc_checkout_button_styles_content() {
	$fewerwc_setting_checkout_button_styles = fewerwc_get_option_or_set_default( FEWERWC_SETTING_CHECKOUT_BUTTON_STYLES, FEWERWC_SETTING_CHECKOUT_BUTTON_STYLES_DEFAULT );

	fewerwc_settings_field_textarea(
		array(
			'name'  => 'fewer_checkout_button_styles',
			'value' => $fewerwc_setting_checkout_button_styles,
		)
	);
}
function fewerwc_checkout_extra_events_content() {
	$fewerwc_setting_extra_events = fewerwc_get_option_or_set_default( FEWERWC_SETTING_EXTRA_EVENTS, FEWERWC_SETTING_EXTRA_EVENTS_DEFAULT );

	fewerwc_settings_field_textarea(
		array(
			'name'  => 'fewer_checkout_extra_events',
			'value' => $fewerwc_setting_extra_events,
		)
	);
}



function fewerwc_product_button_placement_content() {
	$fewerwc_product_button_placement = fewerwc_get_option_or_set_default(FEWERWC_SETTING_PRODUCT_BUTTON_PLACEMENT, 'woocommerce_after_add_to_cart_button');

	$location_options = array(
        'woocommerce_before_add_to_cart_form' => __('Before Add To Cart Form'),
        'woocommerce_after_add_to_cart_form' => __('After Add To Cart Form'),
//		'woocommerce_before_add_to_cart_quantity' => __( 'Before Quantity' ),
//		'woocommerce_after_add_to_cart_quantity' => __( 'After Quantity' ),
        'woocommerce_after_add_to_cart_button' => __('After Add To Cart Button'),
        'woocommerce_after_single_product_summary' => __('After Product Summary'),
    );

	fewerwc_settings_field_select(
		array(
			'name'        => FEWERWC_SETTING_PRODUCT_BUTTON_PLACEMENT,
			'options'     => $location_options,
			'value'       => $fewerwc_product_button_placement,
		)
	);
}


function fewerwc_exclude_shipping_methods_content() {
    $fewerwc_exclude_shipping_method_placement = fewerwc_get_option_or_set_default(FEWERWC_SETTING_EXCLUDE_SHIPPING_METHODS,array());
    if ( ! empty( $fewerwc_exclude_shipping_method_placement ) ) {
        if ( ! is_array( $fewerwc_exclude_shipping_method_placement ) ) {
            $fewerwc_exclude_shipping_method_placement = array( $fewerwc_exclude_shipping_method_placement );
        }
    }
    $shipping_methods = array();
    foreach(WC()->shipping->get_shipping_methods() as $key=>$val) {
        $shipping_methods[$val->id] = $val->method_title;
    }
    fewerwc_settings_field_ajax_select(
        array(
            'name'        => FEWERWC_SETTING_EXCLUDE_SHIPPING_METHODS,
            'options'     => $shipping_methods,
            'selected'    => $fewerwc_exclude_shipping_method_placement,
            'class'       => 'fewer-select fewer-select-exclude-shipping-methods',
            'description' => __( 'Exclude Shipping methods ', 'fewercheckout' ),
            'nonce'       => 'exclude-shipping-methods',
        )
    );
}

function fewerwc_postcode_optional_countries_content() {
    $fewerwc_postcode_optional_countries_placement = fewerwc_get_option_or_set_default(FEWERWC_SETTING_POSTCODE_OPTIONAL_COUNTRIES,array());
    if ( ! empty( $fewerwc_postcode_optional_countries_placement ) ) {
        if ( ! is_array( $fewerwc_postcode_optional_countries_placement ) ) {
            $fewerwc_postcode_optional_countries_placement = array( $fewerwc_postcode_optional_countries_placement );
        }
    }
    $optional_countries = [];
    $countryClass = new WC_Countries();
    $countryList = $countryClass->get_shipping_countries();
    foreach ($countryList as $key=>$val){
        $optional_countries[$key] = $val;
    }

    fewerwc_settings_field_ajax_select(
        array(
            'name'        => FEWERWC_SETTING_POSTCODE_OPTIONAL_COUNTRIES,
            'options'     => $optional_countries,
            'selected'    => $fewerwc_postcode_optional_countries_placement,
            'class'       => 'fewer-select fewer-select-postcode-optional-countries',
            'description' => __( 'Exclude Countries From Postal Code Required.', 'fewercheckout' ),
            'nonce'       => 'postcode-optional-countries',
        )
    );
}

/**
 * Redirect the user after checkout.
 */
function fewer_auto_render_product_button_content() {
	$fewerwc_auto_render_checkout_page = get_option( FEWERWC_SETTING_AUTO_RENDER_PRODUCT_BUTTON, '1' );

	fewerwc_settings_field_checkbox(
		array(
			'name'        => FEWERWC_SETTING_AUTO_RENDER_PRODUCT_BUTTON,
			'current'     => $fewerwc_auto_render_checkout_page,
			'label'       => __( 'Automatically render checkout button in product pages.', 'fewer' ),
		)
	);
}


function fewer_auto_render_cart_button_content() {
	$fewer_auto_render_cart_button = get_option( FEWERWC_SETTING_AUTO_RENDER_CART_BUTTON, '1' );

	fewerwc_settings_field_checkbox(
		array(
			'name'        => FEWERWC_SETTING_AUTO_RENDER_CART_BUTTON,
			'current'     => $fewer_auto_render_cart_button,
			'label'       => __( 'Automatically render checkout button in cart page.', 'fewer' ),
		)
	);
}

//function fewerwc_hide_product_button_if_cart_not_empty_content() {
//	$fewerwc_hide_product_button_if_cart_not_empty = get_option( FEWERWC_SETTING_HIDE_PRODUCT_BUTTON_IF_CART_NOT_EMPTY, '1' );
//    if($fewerwc_hide_product_button_if_cart_not_empty == '0' || $fewerwc_hide_product_button_if_cart_not_empty == '0' ){
//        update_option(FEWERWC_SETTING_HIDE_PRODUCT_BUTTON_IF_CART_NOT_EMPTY,1);
//    }
//	fewerwc_settings_field_checkbox(
//		array(
//			'name'        => FEWERWC_SETTING_HIDE_PRODUCT_BUTTON_IF_CART_NOT_EMPTY,
//			'current'     => $fewerwc_hide_product_button_if_cart_not_empty,
//			'label'       => __( ' Hide product button if cart contains at least one item.', 'fewer' ),
//		)
//	);
//}


function fewerwc_cart_page_button_placement_content() {
	$fewer_auto_render_cart_button = fewerwc_get_option_or_set_default( FEWERWC_SETTING_CART_PAGE_BUTTON_PLACEMENT, 'woocommerce_proceed_to_checkout' );

	$location_options = array(
		'woocommerce_proceed_to_checkout' => __( 'Before Checkout' ),
		'woocommerce_after_cart_table' => __( 'After Cart Review' ),
		'woocommerce_cart_totals_after_order_total' => __( 'After Order Totals' ),
	);

	fewerwc_settings_field_select(
		array(
			'name'        => FEWERWC_SETTING_CART_PAGE_BUTTON_PLACEMENT,
			'options'     => $location_options,
			'value'       => $fewer_auto_render_cart_button,
		)
	);
}

function fewerwc_auto_render_checkout_page_button_content() {
	$fewerwc_auto_render_checkout_page_button = get_option( FEWERWC_SETTING_AUTO_RENDER_CHECKOUT_PAGE_BUTTON, '0' );

	fewerwc_settings_field_checkbox(
		array(
			'name'        => FEWERWC_SETTING_AUTO_RENDER_CHECKOUT_PAGE_BUTTON,
			'current'     => '0',
			'label'       => __( 'Automatically render button in checkout page', 'fewer' ),
		)
	);
}

function fewerwc_checkout_page_button_placement_content() {
	$fewerwc_checkout_page_button_placement = fewerwc_get_option_or_set_default( FEWERWC_SETTING_CHECKOUT_PAGE_BUTTON_PLACEMENT, 'woocommerce_review_order_before_submit' );

	$location_options = array(
		'woocommerce_checkout_before_customer_details' => __( 'Before Customer Details' ),
		'woocommerce_checkout_before_order_review' => __( 'Before Order Review' ),
		'woocommerce_review_order_before_payment' => __( 'Before Payment' ),
		'woocommerce_review_order_before_submit' => __( 'Before Submit' ),
	);

	fewerwc_settings_field_select(
		array(
			'name'        => FEWERWC_SETTING_CHECKOUT_PAGE_BUTTON_PLACEMENT,
			'options'     => $location_options,
			'value'       => $fewerwc_checkout_page_button_placement,
		)
	);
}

function fewerwc_auto_render_minicart_button_content() {
	$fewerwc_auto_render_minicart_button = get_option( FEWERWC_SETTING_AUTO_RENDER_MINICART_BUTTON, '1' );

	fewerwc_settings_field_checkbox(
		array(
			'name'        => FEWERWC_SETTING_AUTO_RENDER_MINICART_BUTTON,
			'current'     => $fewerwc_auto_render_minicart_button,
			'label'       => __( 'Render quick checkout in minicart widget', 'fewer' ),
		)
	);
}
function fewerwc_address_required_content() {
	$fewerwc_address_required = get_option( FEWERWC_SETTING_ADDRESS_REQUIRED, '1' );

	fewerwc_settings_field_checkbox(
		array(
			'name'        => 'fewer_checkout_address_required',
			'current'     => $fewerwc_address_required,
			'label'       => __( 'Enable address required option', 'fewer' ),
			'description' => __( 'When address required option is enabled, Fewer Checkout Plugin will return the address.', 'fewer' ),
		)
	);
}

function fewerwc_guest_email_required_content() {
	$fewerwc_guest_email_required = get_option( FEWERWC_SETTING_GUEST_EMAIL_REQUIRED, '1' );

	fewerwc_settings_field_checkbox(
		array(
			'name'        => 'fewer_checkout_guest_email_required',
			'current'     => $fewerwc_guest_email_required,
			'label'       => __( 'Enable guest email required option', 'fewer' ),
			'description' => __( 'When address required option is enabled, Fewer Checkout Plugin will send order confirmation email to the guest.', 'fewer' ),
		)
	);
}

function fewerwc_hide_shipping_methods_content(){
    $fewerwc_hide_shipping_methods = fewerwc_get_option_or_set_default( FEWERWC_SETTING_HIDE_SHIPPING_METHODS, 'hide_all' );

    $location_options = array(
        'display_all' => __( 'Display all shipping methods' ),
        'hide_all' => __( 'Hide all other shipping methods and only show "Free Shipping"' ),
        'hide_except_local' => __( 'Hide all other shipping methods and only show "Free Shipping" and "Local Pickup" ' ),
    );

    $description = sprintf(
        '%1$s',
        esc_html__( 'When "Free Shipping" is available during checkout', 'fewer' )
    );
    fewerwc_settings_field_select(
        array(
            'name'        => FEWERWC_SETTING_HIDE_SHIPPING_METHODS,
            'options'     => $location_options,
            'description' => $description,
            'value'       => $fewerwc_hide_shipping_methods,
        )
    );
}
/**
 * Renders the Test Mode field.
 */
function fewerwc_test_mode_content() {
	$fewerwc_test_mode = get_option( FEWERWC_SETTING_TEST_MODE, FEWERWC_SETTING_TEST_MODE_NOT_SET );

	if ( FEWERWC_SETTING_TEST_MODE_NOT_SET === $fewerwc_test_mode ) {
		// If the option is FEWERWC_SETTING_TEST_MODE_NOT_SET, then it hasn't yet been set. In this case, we
		// want to configure test mode to be on.
		$fewerwc_test_mode = '1';
		update_option( FEWERWC_SETTING_TEST_MODE, '1' );
	}

	fewerwc_settings_field_checkbox(
		array(
			'name'        => 'fewer_test_mode',
			'current'     => $fewerwc_test_mode,
			'label'       => __( 'Enable test mode', 'fewer' ),
			'description' => __( 'When test mode is enabled, only logged-in admin users will see the Fewer Checkout button.', 'fewer' ),
		)
	);
}


/**
 * Renders the Debug Mode field.
 */
function fewerwc_debug_mode_content() {
	$fewerwc_debug_mode = get_option( FEWERWC_SETTING_DEBUG_MODE, FEWERWC_SETTING_DEBUG_MODE_NOT_SET );

	if ( FEWERWC_SETTING_DEBUG_MODE_NOT_SET === $fewerwc_debug_mode ) {
		// If the option is FEWERWC_SETTING_DEBUG_MODE_NOT_SET, then it hasn't yet been set. In this case, we
		$fewerwc_debug_mode = 1;
		update_option( FEWERWC_SETTING_DEBUG_MODE, $fewerwc_debug_mode );
	}

	fewerwc_settings_field_checkbox(
		array(
			'name'        => FEWERWC_SETTING_DEBUG_MODE,
			'current'     => $fewerwc_debug_mode,
			'label'       => __( 'Enable debug mode', 'fewer' ),
			'description' => __( 'When debug mode is enabled, the Fewer plugin will maintain an error log.', 'fewer' ),
		)
	);
}


/**
 * Helper that returns the value of an option if it is set, and sets and returns a default if the option was not set.
 * This is similar to get_option($option, $default), except that it *sets* the option if it is not set instead of just returning a default.
 *
 * @see https://developer.wordpress.org/reference/functions/get_option/
 *
 * @param string $option Name of the option to retrieve. Expected to not be SQL-escaped.
 * @param mixed  $default Default value to set option to and return if the return value of get_option is falsey.
 * @return mixed The value of the option if it is truthy, or the default if the option's value is falsey.
 */
function fewerwc_get_option_or_set_default( $option, $default ) {
	$val = get_option( $option );
	if ( false !== $val ) {
		return $val;
	}
	update_option( $option, $default );
	return $default;
}

/**
 * Get the Fewer APP ID.
 *
 * @return string
 */
function fewerwc_get_app_id() {
	return get_option( FEWERWC_SETTING_APP_ID );
}

function fewerwc_get_app_secret() {
    return get_option( FEWERWC_SETTING_APP_SECRET );
}
/**
 * Search pages to return for the page select Ajax.
 */
function fewerwc_ajax_search_pages() {
	check_ajax_referer( 'search-pages', 'security' );

	$return = array();

	if ( isset( $_GET['term'] ) ) {
		$q_term = sanitize_text_field( wp_unslash( $_GET['term'] ) );
	}

	if ( empty( $q_term ) ) {
		wp_die();
	}

	$search_results = new WP_Query(
		array(
			's'              => $q_term,
			'post_status'    => 'publish',
			'post_type'      => 'page',
			'posts_per_page' => -1,
		)
	);

	if ( $search_results->have_posts() ) {
		while ( $search_results->have_posts() ) {
			$search_results->the_post();

			$return[ get_the_ID() ] = get_the_title();
		}
		wp_reset_postdata();
	}

	wp_send_json( $return );
}
add_action( 'wp_ajax_fewerwc_search_pages', 'fewerwc_ajax_search_pages' );

/**
 * Search users to return for the user select Ajax.
 */
function fewerwc_ajax_search_users() {
	check_ajax_referer( 'search-users', 'security' );

	$return = array();

	if ( isset( $_GET['term'] ) ) {
		$q_term = sprintf(
			'*%s*', // Add leading and trailing '*' for wildcard search.
			sanitize_text_field( wp_unslash( $_GET['term'] ) )
		);
	}

	if ( empty( $q_term ) ) {
		wp_die();
	}

	$search_results = get_users(
		array(
			'search'       => $q_term,
			'role__not_in' => 'Administrator',
		)
	);

	if ( ! empty( $search_results ) ) {
		foreach ( $search_results as $search_result_user ) {
			$return[ $search_result_user->ID ] = $search_result_user->display_name;
		}
	}

	wp_send_json( $return );
}
add_action( 'wp_ajax_fewerwc_search_users', 'fewerwc_ajax_search_users' );
