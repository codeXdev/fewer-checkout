<?php
const FEWERWC_PAYLOAD_PREFIX = "fewerwc-payload";
const FEWERWC_BTNPOS_PRODUCT_PAGE = "fewer-product-page";
const FEWERWC_BTNPOS_BEFORE_CHECKOUT = "fewer-before-checkout-form";
const FEWERWC_BTNPOS_PROCEED_TO_CHECKOUT = "fewer-proceed-to-checkout";
const FEWERWC_BTNPOS_MINICART = "fewer-mini-cart";
const FEWERWC_BTNPOS_PRODUCT_SHORTCODE = "fewer-product-custom";
const FEWERWC_BTNPOS_CART_SHORTCODE = "fewer-cart-custom";

add_action('init', 'fewerwc_load_visual_hook_filters');
add_action('init', 'fewerwc_load_custom_shortcodes');

function fewerwc_load_custom_shortcodes()
{
    add_shortcode('fewer-product-checkout', 'fewerwc_product_checkout_shortcode');
    add_shortcode('fewer-cart-checkout', 'fewerwc_cart_checkout_shortcode');
}

function fewerwc_load_visual_hook_filters()
{
    $button_position = get_option('fewerwc_product_button_placement', 'woocommerce_after_add_to_cart_button');
    $location_options = array(
        'woocommerce_before_add_to_cart_form',
        'woocommerce_after_add_to_cart_form',
        'woocommerce_after_add_to_cart_button',
        'woocommerce_after_single_product_summary'
    );

    if (in_array($button_position, $location_options)) {
        add_filter(
            $button_position,
            'fewerwc_add_checkout_after_main_content',
            10
        );
    } else {
        add_filter(
            'woocommerce_after_add_to_cart_button',
            'fewerwc_add_checkout_after_main_content',
            10
        );
    }
    add_filter(
        'woocommerce_widget_shopping_cart_before_buttons',
        'fewerwc_render_mini_cart',
        10
    );

    add_filter(
        get_option('fewerwc_cart_page_button_placement'),
        'fewerwc_render_proceed_to_checkout',
        10
    );

    add_filter(
        get_option('fewerwc_checkout_page_button_placement'),
        'fewerwc_render_before_checkout_form',
        10
    );
    add_filter(
        'woocommerce_package_rates',
        'fewerwc_handle_shipping_methods_when_free_is_available',
        10,
        2
    );
}

function fewerwc_add_checkout_after_main_content()
{
    if (!fewerwc_should_render_button() || !get_option('fewer_auto_render_product_button')) {
        return;
    }

    if(WC()->cart->is_empty()) {
        global $product;
        $target = uniqid(FEWERWC_PAYLOAD_PREFIX);
        $amount = wc_get_price_excluding_tax($product);
        $taxes = wc_get_price_including_tax($product) - $amount;
        if ($amount > 0) {
            echo fewerwc_button($target, $taxes, $amount, $amount, 0, fewerwc_prepare_product($product), FEWERWC_BTNPOS_PRODUCT_PAGE);
        }
    }
}

function fewerwc_render_mini_cart()
{
    if (!fewerwc_should_render_button() || !get_option('fewerwc_auto_render_minicart_button')) {
        return;
    }

	fewerwc_render_cart(FEWERWC_BTNPOS_MINICART);
}

function fewerwc_render_proceed_to_checkout()
{
    if (!fewerwc_should_render_button() || !get_option('fewer_auto_render_cart_button')) {
        return;
    }

	fewerwc_render_cart(FEWERWC_BTNPOS_PROCEED_TO_CHECKOUT);
}

function fewerwc_render_before_checkout_form()
{
    if (!fewerwc_should_render_button() || !get_option('fewerwc_auto_render_checkout_page_button')) {
        return;
    }

//	fewerwc_render_cart(FEWERWC_BTNPOS_BEFORE_CHECKOUT);
}

function fewerwc_product_checkout_shortcode($atts)
{
    if (!fewerwc_should_render_button() || WC()->cart->is_empty()) {
        return;
    }

    $a = shortcode_atts(['product_id' => NULL], $atts);
    if (!isset($atts['product_id'])) {
        global $product;
        if (!$product) {
            return '';
        }
    } else {
        $product = \wc_get_product($a['product_id']);
    }

    if (!($product instanceof WC_Product)) {
        return '';
    }

    $target = uniqid(FEWERWC_PAYLOAD_PREFIX);
    $amount = wc_get_price_excluding_tax($product);
    $taxes = wc_get_price_including_tax($product) - $amount;
    if ($amount > 0) {
        echo fewerwc_button($target, $taxes, $amount, $amount, 0, fewerwc_prepare_product($product), FEWERWC_BTNPOS_PRODUCT_SHORTCODE);
    }

    return '';
}

function fewerwc_cart_checkout_shortcode($atts)
{
    if (!fewerwc_should_render_button()) {
        return '';
    }

    $cart = WC()->cart;
    if (is_null($cart) || !($cart instanceof WC_Cart)) {
        return '';
    }
    return fewerwc_render_cart(FEWERWC_BTNPOS_CART_SHORTCODE);
}


function fewerwc_button($id,$taxes, $amount,$total_amount,$discount, $payload, $position,$coupons = null, $fewer_order_id = null)
{
    $postcode_optional_countries = fewerwc_get_option_or_set_default(FEWERWC_SETTING_POSTCODE_OPTIONAL_COUNTRIES,array());
    $allowed_address_countries = fewer_get_shipping_country();
    $allowed_address_states = fewer_get_shipping_states($allowed_address_countries);
    $allowed_address_cities = fewerwc_get_shipping_cities($allowed_address_countries);
    $cart_contains_virtual = fewerwc_check_cart_contains_virtual($payload);
    if($total_amount == (float)0){
        $html = "";
    }else{
        $user = wp_get_current_user();
        $user_email = $user->ID != 0 ? $user->user_email:"";
        $single = $position === FEWERWC_BTNPOS_PRODUCT_PAGE;
        $img_path = FEWERWC_PLUGIN_DIR . '/assets/images/';
        $html = fewerwc_button_style($position);
        $html .= '<p class="fewer-container ' . $position . '">';
        $html .= '<fewer-checkout-button ';
        $html .= 'merchant-id="' . fewerwc_get_app_id() . '" ';
        $html .= 'locale="' . fewerwc_get_current_lang() . '" ';
        $html .= 'amount="' . $amount . '"';
        $html .= 'ref-id="'.$id.'"';
        $html .= 'taxes="'.$taxes.'"';
        $html .= 'discount="'.$discount.'"';
        $html .= 'disabled="true"';
		$enable_installment = true;
		if(get_option("fewerwc_setting_exclude_installment_slugs")){
			$categories_slugs = explode(',',get_option("fewerwc_setting_exclude_installment_slugs"));
			foreach ($categories_slugs as $slug) {
				foreach ($payload as $key => $value) {
					if(in_array($slug,$value['categories']) || in_array($slug,$value['tags'])){
						$enable_installment = false;
					}
				}
			}

		}
	    if($enable_installment){
		    $html .= 'installment-options-url="'.(get_option("fewerwc_setting_installment_options") ?? "").'"';
	    }

        $html .= 'show-payment-brands="true"';
        $html .= 'enable-pre-pay-trigger="true"';
        $html .= 'enable-pre-checkout-trigger="true"';
        $html .= 'label="'.($single ? "quick-buy" : "checkout").'"';
        $html .= 'country-code="' . get_option("fewer_checkout_currency") . '"';
        $html .= 'debug="'.(get_option("fewerwc_debug_mode") ? "true" : "false").'"';
        $html .= 'dark-mode="'.(get_option("fewerwc_use_dark_mode") ? "on" : "off").'"';
        $html .= 'allowed-address-countries="'.esc_html(json_encode($allowed_address_countries)).'"';
        $html .= 'allowed-address-states="'.esc_html(json_encode($allowed_address_states)).'"';
        $html .= 'allowed-address-cities="' . esc_html(json_encode($allowed_address_cities)) . '"';
        $html .= 'postcode-optional-countries="' . esc_html(json_encode($postcode_optional_countries)) . '"';
        $address_required = !$cart_contains_virtual && get_option("fewer_checkout_address_required");
        if($address_required && !$fewer_order_id){
            $html .= 'address-required="true"';
            $html .= 'address-handshake="true"';
            $html .= 'email-required="'.(! ( $user_email != '' ) && (bool) get_option( "fewer_checkout_guest_email_required" )? "true":"false") . '"' ;
        }
        else{
            $html .= 'address-required="false"';
            $html .= 'address-handshake="false"';
        }
        if(FEWERWC_ENV != 'prod'){
            $html .= 'test-environment="'.FEWERWC_ENV.'"';
        }
        if($fewer_order_id){
            $user_info = fewerwc_get_user_address(null,$fewer_order_id);
        }
        elseif($user->ID != 0){
            $user_info = fewerwc_get_user_address($user->ID,null);
        }
        if($user_info){
            $address = [
                "street1"           => $user_info['address_1'],
                "street2"           => $user_info['address_2'],
                "city"              => $user_info['city'],
                "state"             => $user_info['state'],
                "postcode"          => $user_info['postcode'],
                "country"           => $user_info['country'],
            ];
            $html .= 'initial-address="'.esc_html(json_encode($address)).'"';
            $html .= 'initial-email="'.$user_info['email'].'"';
            $html .= 'initial-phone-number="'.$user_info['phone'].'"';
            $html .= 'initial-first-name="'.$user_info['first_name'].'"';
            $html .= 'initial-last-name="'.$user_info['last_name'].'"';
        }
        $html .= 'position="'.$position.'" ';
        if(!empty($fewer_order_id)) {
            $html .= 'checkout-order-id="' . $fewer_order_id . '" ';
        }
        $html .= '></fewer-checkout-button>';
        $html .= '</p>';
    }


    return $html;
}

function fewerwc_get_user_address($user_id = null, $fewer_order_id = null){
    $info = ['address_1','address_2','city','state','postcode','country','phone','first_name','last_name','email'];
    $result = array();
    if($user_id){
        foreach ($info as $item){
            $temp = get_user_meta( $user_id, 'billing_'.$item, true );
            if(empty($temp)){
                $temp = get_user_meta( $user_id, 'shipping_'.$item, true );
            }
            $result[$item] = $temp ?? '';
        }
    }
    if($fewer_order_id){
        $order_data = wc_get_order($fewer_order_id)->get_data();
        foreach ($info as $item){
            $result[$item] = $order_data['billing'][$item] ?? $order_data['shipping'][$item] ?? '';
        }
    }
    $state = $result['state'];
    $result['state'] = fewer_get_state_by_code($result['country'],$state);
    return $result;
}
function fewerwc_button_style($position)
{
    switch ($position) {
        case FEWERWC_BTNPOS_PRODUCT_PAGE:
            $style = get_option(FEWERWC_SETTING_PDP_BUTTON_STYLES);
            break;
        case FEWERWC_BTNPOS_MINICART:
            $style = get_option(FEWERWC_SETTING_MINI_CART_BUTTON_STYLES);
            break;
        case FEWERWC_BTNPOS_PROCEED_TO_CHECKOUT:
            $style = get_option(FEWERWC_SETTING_CART_BUTTON_STYLES);
            break;
        case FEWERWC_BTNPOS_BEFORE_CHECKOUT:
            $style = get_option(FEWERWC_SETTING_CHECKOUT_BUTTON_STYLES);
            break;
        default:
            return false;
    }
    return '<style type="text/css">' . esc_html($style) . '</style>';
}

function fewerwc_button_payload($taxes,$cart,$user_email,array $coupons = NULL): string {
    return esc_html(base64_encode(json_encode([
        'cart' => $cart,
        'locale' => fewerwc_get_current_lang(),
        'currency' => get_woocommerce_currency(),
        'userEmail' =>$user_email,
        'taxes' => $taxes,
        'coupons' => $coupons
    ])));
}

function fewerwc_prepare_product($product): array {
    return [
        fewerwc_get_product_attributes($product)
    ];
}

function fewerwc_render_cart( $position,$fewer_order_id = null ) {
	$cart = WC()->cart;
    if ( $cart instanceof WC_Cart ) {
        $target         = uniqid( FEWERWC_PAYLOAD_PREFIX );
        $total_amount   = $cart->get_total("");
        $coupons        = fewerwc_get_coupons_code( $cart );
        if(!empty($fewer_order_id)){
            $order          = wc_get_order($fewer_order_id);
            $total_amount   = $order->get_total();
            $taxes          = $cart->get_total_tax();
            $amount         = max( 0, $total_amount - $taxes);
            $discount_total = 0;
        } else {
            $shipping_taxes = 0;
            foreach ( $cart->get_shipping_taxes() as $tax ) {
                $shipping_taxes += $tax;
            }
            $discount_total = $cart->get_discount_total();
            $amount          = $cart->get_cart_contents_total() + $cart->get_fee_total() + $discount_total;
            $taxes          = $cart->get_cart_contents_tax() + $cart->get_fee_tax();
        }
        if($amount > 0) {
            echo fewerwc_button($target, $taxes, $amount, $total_amount, $discount_total, fewerwc_prepare_cart($cart), $position, $coupons, $fewer_order_id);
        }
	}
}

function fewerwc_prepare_cart($cart)
{
    return array_reduce($cart->get_cart_contents(), function ($acc, $el) {
        if (array_key_exists('data', $el) && $el['data'] instanceof WC_Product) {
            array_push($acc, fewerwc_get_product_attributes($el['data'], $el['quantity'], $el['variation']));
        }
        return $acc;
    }, []);
}

function fewerwc_get_product_attributes(WC_Product $product, $qty = null, $variation = null)
{
	$product_categories = array();
	$product_tags = array();

	$product_cat = get_the_terms( $product->get_id(),'product_cat');
	if(is_array($product_cat)) {
		foreach ($product_cat as $category) {
			$product_categories[] = $category->slug;
		}
	}
	$product_tag = get_the_terms( $product->get_id(),'product_tag');
	if(is_array($product_tag)){
		foreach ($product_tag as $tag){
			$product_tags[] = $tag->slug;
		}
	}
    $attrs = [
        'product_id'         => strval($product->get_id()),
        'product_type'       => strval($product->get_type()),
        'in_stock'           => $product->is_in_stock(),
        'price'              => wc_get_price_excluding_tax($product),
        'backorders_allowed' => $product->backorders_allowed(),
        'stock_quantity'     => $product->get_stock_quantity(),
        'sold_individually'  => $product->is_sold_individually(),
        'purchasable'        => $product->is_purchasable(),
        'virtual'            => $product->is_virtual(),
	    'categories'         => $product_categories,
	    'tags'               => $product_tags
    ];

    if(is_a($product, 'WC_Product_Variable')) {
        $attrs['variations']   = array_map(function ($el) use ($qty) {
            return fewerwc_get_product_attributes(wc_get_product($el['variation_id']), $qty);
        }, $product->get_available_variations());
    }
    elseif (is_a($product, 'WC_Product_Variation')) {
        if (!isset($variation)) {
            $variation = $product->get_variation_attributes();
        }
        $attrs['attributes']   = $variation;
    }
    else if (is_a($product, 'WC_Product_Bundle')) {
        $bundled = \WC_PB_DB::query_bundled_items([
            'return' => 'id=>product_id',
            'bundle_id' => [$product->get_id()]
        ]);
        $attrs['bundle_configuration'] = array_reduce($bundled, function ($acc, $el) {
            $acc[strval($el)] = fewerwc_get_product_attributes(wc_get_product($el));
            return $acc;
        }, []);
    }

    if ($qty) {
        $attrs['quantity'] = $qty;
    }

    return $attrs;
}

function fewerwc_get_coupons_code($cart): array {
	$coupons = $cart->get_coupons();
	$coupons_ids = array();
	if(!empty($coupons)){
		foreach($coupons as $coupon){
			$coupons_ids[] = $coupon->get_code();
		}
	}
	return $coupons_ids;
}

function fewerwc_get_current_lang(){
	$lang = get_bloginfo('language' ) ;

	return str_contains($lang, '-') ? explode("-", $lang)[0] : $lang;
}

function fewerwc_should_render_button() {
    if (!fewerwc_check_fewer_configured()) {
        error_log('MISSING FEWER API KEY');
        return false;
    }
    $fewerwc_test_mode = get_option( FEWERWC_SETTING_TEST_MODE, FEWERWC_SETTING_TEST_MODE_NOT_SET );
    if ($fewerwc_test_mode == '1') {
        return in_array('administrator', wp_get_current_user()->roles, true);
    }

    return true;
}


function fewerwc_handle_shipping_methods_when_free_is_available( $rates ) {
    $fewerwc_hide_shipping_methods = get_option(FEWERWC_SETTING_HIDE_SHIPPING_METHODS);
    if($fewerwc_hide_shipping_methods == 'hide_all'){
        $free = array();
        foreach ( $rates as $rate_id => $rate ) {
            if ( 'free_shipping' === $rate -> method_id ) {
                $free[$rate_id] = $rate;
                break;
            }
        }
        return !empty($free) ? $free : $rates;

    } else if ($fewerwc_hide_shipping_methods == 'hide_except_local') {
        $new_rates = array();
        foreach ($rates as $rate_id => $rate) {
            if ('free_shipping' === $rate->method_id) {
                $new_rates[$rate_id] = $rate;
                break;
            }
        }

        if (!empty($new_rates)) {
            foreach ($rates as $rate_id => $rate) {
                if ('local_pickup' === $rate->method_id) {
                    $new_rates[$rate_id] = $rate;
                    break;
                }
            }
            return $new_rates;
        }
        return $rates;
    } else {
        return $rates;
    }
}

//add_filter( 'woocommerce_cart_needs_shipping', 'cart_needs_shipping' );
//function cart_needs_shipping( $needs_shipping ) {
//    if ( is_cart() ) {
//        $needs_shipping = false;
//    }
//    return $needs_shipping;
//}

function fewerwc_get_chosen_shipping_methods($fewer_order_id){
    $shipping_data = [];

    $order = wc_get_order($fewer_order_id);
    $shipping_methods = $order->get_shipping_methods();

    $shipping_id = WC()->session->get('chosen_shipping_methods')[0];
    foreach( $shipping_methods as $shipping_method ){
        $method_id = $shipping_method->get_method_id().":".$shipping_method->get_instance_id();
        if($shipping_id == $method_id){
            $shipping_data[] = [
                "id"          => $method_id,
                "label"       => $shipping_method->get_method_title(),
                "price"       => $shipping_method->get_total('')+$shipping_method->get_total_tax(''),
            ];
        }
    }
    return esc_html(json_encode($shipping_data));
}

function fewer_get_shipping_country()
{
    $countries = [];
    $countryClass = new WC_Countries();
    $countryList = $countryClass->get_shipping_countries();
    foreach ($countryList as $key=>$val){
        $countries[] = $key;
    }
    return $countries;
}
function fewerwc_get_shipping_cities($allowed_countries)
{
    if (in_array('states-cities-and-places-for-woocommerce/states-cities-and-places-for-woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')))) {
        $wc_states_and_places = new WC_States_Places();
        $cities = [];
        foreach ($allowed_countries as $code => $country) {
            $cities_in_country = $wc_states_and_places->get_places($country);
            if (gettype($cities_in_country) === 'array') {
                foreach ($cities_in_country as $key => $value) {
                    $cities[$country][$key] = $value;
                }
            }
        }
        return $cities;
    }
    return [];
}
function fewerwc_check_cart_contains_virtual($payload)
{
    $cart_contains_virtual = true;
    foreach ($payload as $item){
        if(in_array('virtual',$item) && !$item['virtual']) {
            $cart_contains_virtual = false;
            break;
        }
    }
    return $cart_contains_virtual;
}

function fewer_get_shipping_states($countries)
{
    $states = [];
    $final_states = [];
    $wc_countries = new WC_Countries();
    if(!empty($countries)) {
        foreach ($countries as $country) {
            $country_states = $wc_countries->get_states($country);
            if(!empty($country_states)){
                foreach ($country_states as $code => $name){
                    $states[$country][$code] = $name;
                }
            }

        }
        foreach ($states as $key=> $val){
            if(count($val)>0){
                $final_states[$key] = $val;
            }
        }
    }
    return $final_states;
}

function fewer_get_state_by_code($country,$state_code){
    $state = $state_code;
    $wc_countries = new WC_Countries();
    $country_states = $wc_countries->get_states($country);
    if(!empty($country_states)){
        foreach ($country_states as $code => $name){
            if($state_code == $code){
                return $name;
            }
        }
    }
    return $state;
}