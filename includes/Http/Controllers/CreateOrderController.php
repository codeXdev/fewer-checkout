<?php

namespace Fewer\Http\Controllers;
use Exception;
use WC_Customer;
use WP_REST_Request;
use WP_REST_Response;


class CreateOrderController extends Controller
{

    protected $namespace = 'wc/fewer/v2';
    /**
     * Route name.
     *
     * @var string
     */
    protected $route = 'order/create';

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
        if (array_key_exists("fewer_cart_id", $body)) {

            $this->fewer_cart_id = $body['fewer_cart_id'];
            $fewer_order_id = array_key_exists("fewer_order_id", $body) ? $body['fewer_order_id'] : null;
            try {
                $fewer_transaction_id = $body['transaction_details']['id'];
                $transaction_details = $this->get_transaction_details($fewer_transaction_id);
                if ( $transaction_details['status'] == 'success' ) {
                    return $this->order_creation_error_response('Invalid Payment Transaction Status');
                }
                if ( $transaction_details['merchant_key'] != fewerwc_get_app_id() ) {
                    return $this->order_creation_error_response('Invalid Payment Transaction Merchant Key');
                }
                if (!empty($fewer_order_id)) {
                    $order_res = wc_get_order($fewer_order_id);
                } else {
                    $order_schema = $this->fewerwc_build_order_schema($transaction_details);
                    list($order_request, $user_id) = $this->fewerwc_order_core($order_schema);
                    $address = $order_request->get_ship_to();
                    if($address) {
                        WC()->customer = new WC_Customer($user_id);
                        WC()->customer->set_props($address->to_customer_address_props());
                        WC()->customer->save();
                        WC()->session->set('chosen_shipping_methods', [$order_request->get_order()->get_shipping()->get_rate_id()]);
                        WC()->cart->calculate_totals();
                    }
                    $checkout = WC()->checkout();
                    $order_id = $checkout->create_order(array());
                    if(is_wp_error($order_id)){
                        $message = htmlspecialchars_decode( $order_id->get_error_message());
                        return new WP_REST_Response($message, 500);
                    }
                    $order_res = wc_get_order($order_id);
                    if($address) {
                        $order_res->set_address($address->to_address_props(), 'shipping');
                        $order_res->set_address($address->to_address_props());
                    }
                    $order_res->set_customer_id(WC()->customer->get_id());

                    $order_res->set_payment_method(FEWERWC_PAYMENT_METHOD_ID);
                    $order_res->set_payment_method_title(FEWERWC_PAYMENT_METHOD_SLUG);

                    $order_res->calculate_totals();
                }
                $order_res->update_meta_data('fewer_transaction_id', $transaction_details['id']);
                $order_res->update_meta_data('fewer_cart_id', $body['fewer_cart_id']);
                $order_res->set_status(apply_filters('woocommerce_default_order_status', 'pending'));
                $order_res->save();

                return new WP_REST_Response([
                    'order_id' => strval($order_res->get_id()),
                    'amount' => $order_res->get_total()
                ], 201);
            } catch (Exception $e) {
                return $this->order_creation_error_response('Could not find order', print_r($e, true));
            }
        }
        return $this->order_creation_error_response('Could not find fewer cart id');

    }

    public function get_permission_callback()
    {
        return $this->WCBasicAuth();
    }
}