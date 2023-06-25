<?php

namespace Fewer\Http\Controllers;

use Exception;
use WC_Customer;
use WP_REST_Request;
use WP_REST_Response;
use function is_wp_error;


class UpdateCheckoutController extends Controller
{

    public $fewer_cart_id;
    protected $namespace = 'wc/fewer/v2';
    /**
     * Route name.
     *
     * @var string
     */
    protected $route = 'checkout/update';
    /**
     * Route methods.
     *
     * @var string
     */
    protected $method = 'POST';

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @param WP_REST_Request $request
     *
     * @return WP_REST_Response
     */
    public function handle($request)
    {
        $body = $request->get_json_params();
        $cart = WC()->cart;
        if (array_key_exists("fewer_cart_id", $body)) {
            $this->fewer_cart_id = $body['fewer_cart_id'];
            try {
                $order_schema = $this->fewerwc_build_order_schema($body);
                list($order_request, $user_id) = $this->fewerwc_order_core($order_schema);

                WC()->customer = new WC_Customer($user_id,true);
                $address = $order_request->get_ship_to();
                if ($address) {
                    WC()->customer->set_props($address->to_customer_address_props());
                }
                if ($order_request->get_order()->get_shipping() != NULL) {
                    WC()->session->set('chosen_shipping_methods', [$order_request->get_order()->get_shipping()->get_rate_id()]);
                }
                WC()->cart->calculate_totals();
                $shipping_list = $this->get_shipping_methods($cart);
                $total_taxes = $cart->get_cart_contents_tax() + $cart->get_fee_tax();
                $discount = $cart->get_discount_total();
            } catch (Exception $e) {
                return $this->order_creation_error_response('Unexpected error in saving shipping details', print_r($e, true));
            }
            return new WP_REST_Response([
                "shipping_methods" => $shipping_list,
                "taxes" => $total_taxes,
                "discount" => $discount,
                "amount" => $cart->get_cart_contents_total() + $cart->get_fee_total() + $discount
            ], 201);
        }
        return $this->order_creation_error_response('Could not find fewer cart id');

    }


    private function get_shipping_methods($cart)
    {
        $shipping_data = [];
        $packages_keys = array_keys($cart->get_shipping_packages());
        $shipping_tax_class = get_option( 'woocommerce_shipping_tax_class' );
        $shipping_tax_class_is_zero = $shipping_tax_class == 'zero-rate' || $shipping_tax_class == '%d9%85%d8%b9%d8%af%d9%84-%d8%b5%d9%81%d8%b1';
	    $fewerwc_exclude_shipping_method_placement = fewerwc_get_option_or_set_default(FEWERWC_SETTING_EXCLUDE_SHIPPING_METHODS,array());
        foreach ($packages_keys as $key) {
            $shipping_rates = WC()->session->get('shipping_for_package_' . $key)['rates'];
            foreach ($shipping_rates as $rate_key => $rate) {
				if(is_array($fewerwc_exclude_shipping_method_placement) && in_array($rate->method_id,$fewerwc_exclude_shipping_method_placement))
					continue;

                $price = (float)$rate->cost;
                if (!$shipping_tax_class_is_zero && count($rate->taxes) > 0) {
                    $price += (float)array_sum($rate->taxes);
                }
                $shipping_data[] = [
                    "id" => $rate->id,
                    "label" => $rate->label,
                    "price" => $price,
                ];
            }
        }
        return $shipping_data;
    }

    public function get_permission_callback()
    {
        return $this->WCBasicAuth();
    }

}
