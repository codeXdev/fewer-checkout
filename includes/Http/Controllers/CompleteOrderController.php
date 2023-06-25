<?php

namespace Fewer\Http\Controllers;

use Exception;
use WC_Customer;
use WP_REST_Request;
use WP_REST_Response;
use function apply_filters;
use function is_wp_error;


class CompleteOrderController extends Controller
{

    public $fewer_cart_id;
    protected $namespace = 'wc/fewer/v2';
    /**
     * Route name.
     *
     * @var string
     */
    protected $route = 'order/complete';
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
        if (array_key_exists("order_id", $body) && array_key_exists("fewer_cart_id", $body)) {
            $this->fewer_cart_id = $body['fewer_cart_id'];
            $fewer_order_id = $body['order_id'] ?? "";
            try {
                $order_res = wc_get_order($fewer_order_id);
                if ($order_res->get_meta('fewer_cart_id') !=  $this->fewer_cart_id){
                    return $this->order_creation_error_response('Cart id mismatch');
                }
	            $order_status = $order_res->get_status();
	            $pending_status  = apply_filters('woocommerce_default_order_status', 'pending');
	            $cancelled_status = apply_filters('woocommerce_default_order_status', 'cancelled');
	            $on_hold_status = apply_filters('woocommerce_default_order_status', 'on-hold');
	            $processing_status = apply_filters('woocommerce_default_order_status', 'processing');
	            $failed_status = apply_filters('woocommerce_default_order_status', 'failed');
	            // Define an array of invalid statuses
                if ( $order_status != $processing_status ) {
                    $invalid_statuses = array($pending_status, $cancelled_status, $failed_status, $on_hold_status);
                    // Check if the order status is not in the invalid array
                    if ( !in_array($order_status, $invalid_statuses) ) {
                        return $this->order_creation_error_response('Order not pending, cancelled, failed or on-hold');
                    }
                    $fewer_transaction_id = $order_res->get_meta('fewer_transaction_id');
                    $transaction_details = $this->get_transaction_details($fewer_transaction_id);
                    if ( $transaction_details['status'] == 'success' ) {
                        //first thing to execute to make sure the order is marked until it is marked as processing
                        $order_res->set_status($on_hold_status);
                        $order_res->save();

                        $order_schema = $this->fewerwc_build_order_schema($transaction_details);
                        if (is_wp_error($order_schema) || $order_schema instanceof Exception) {
                            return $this->order_creation_error_response('Could not complete order schema', print_r($order_schema, true));
                        }
                        list($order_request, $user_id) = $this->fewerwc_order_core($order_schema);

                        if(key_exists('email',$order_schema["user"]) && !empty($order_schema['user']['email'])) {
                            $order_res->set_billing_email($order_schema['user']['email']);
                        }
                        if(key_exists('first_name',$order_schema["user"]) && !empty($order_schema['user']['first_name'])) {
                            $first_name = $order_schema['user']['first_name'];
                            $order_res->set_billing_first_name($first_name);
                            $order_res->set_shipping_first_name($first_name);
                        }
                        if(key_exists('last_name',$order_schema["user"]) && !empty($order_schema['user']['last_name'])) {
                            $last_name = $order_schema['user']['last_name'];
                            $order_res->set_billing_last_name($last_name);
                            $order_res->set_shipping_last_name($last_name);
                        }
                        if(key_exists('phone_number',$order_schema["user"]) && !empty($order_schema['user']['phone_number'])) {
                            $phone_number = $order_schema['user']['phone_number'];
                            $order_res->set_billing_phone($phone_number);
                            $order_res->set_shipping_phone($phone_number);
                        }

                        $address = $order_request->get_order()->get_shipping();
                        if($address != NULL){
                            WC()->session->set('chosen_shipping_methods', [$address->get_rate_id()]);
                            WC()->cart->calculate_totals();
                        }
                        $order_res->save();
                        if ( $transaction_details['total_amount'] == $order_res->get_total() ) {
                            $order_res->payment_complete($fewer_transaction_id);
                            $order_res->set_status($processing_status);
                            $order_res->save();
                            $message = [
                                'order_id' => strval($order_res->get_id()),
                                'order_url' => $order_res->get_checkout_order_received_url()
                            ];
                            $this->fewerwc_update_order_details($fewer_transaction_id,$message);
                            return new WP_REST_Response($message, 201);
                        } else {
                            $total_error = new Exception('order total amount ' . $order_res->get_total());
                            return $this->order_creation_error_response('Could not validate the transaction', print_r($total_error, true));
                        }
                    }
                    else if ( $transaction_details['status'] == 'fail' ) {
                        $order_res->set_status($failed_status);
                        $order_res->update_meta_data('failure_reason', $transaction_details['failure_reason']);
                        $order_res->save();
                        $message = [
                            'order_id' => strval($order_res->get_id()),
                            'order_url' => $order_res->get_checkout_order_received_url()
                        ];
                        $this->fewerwc_update_order_details($fewer_transaction_id,$message);
                        return new WP_REST_Response($message, 201);
                    }
                    else {
                        if ($body['assert_transaction_status'] ) {
                            return $this->order_creation_error_response("Transaction status error",print_r($transaction_details['status'],true));
                        } else {
                            return new WP_REST_Response("Transaction payment was not completed", 200);
                        }
                    }
                }
            } catch (Exception $e) {
                return $this->order_creation_error_response('Could not find order', print_r($e, true));
            }
        }
        return $this->order_creation_error_response('Could not find fewer order id');

    }

    private function fewerwc_update_order_details($fewer_transaction_id,$body){
        if(!empty($fewer_transaction_id)) {
            $url = FEWERWC_TRANSACTION_DETAILS . $fewer_transaction_id . '/set_order_details';
            wp_remote_post($url, array(
                    'method' => 'POST',
                    'body' => $body,
                )
            );
        }
    }


    public function get_permission_callback()
    {
        return $this->WCBasicAuth();
    }

}
