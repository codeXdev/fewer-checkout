<?php

namespace Fewer\Http\Controllers;

use Exception;
use WC_Customer;
use WP_REST_Request;
use WP_REST_Response;
use function is_wp_error;


class OrderDetailsController extends Controller
{

    public $fewer_cart_id;
    protected $namespace = 'wc/fewer/v2';
    /**
     * Route name.
     *
     * @var string
     */
    protected $route = 'order/details';
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
        if (array_key_exists("order_id", $body)) {
            $order_id = $body['order_id'];
            $transaction_id = $body['transaction_id'];
            $order = wc_get_order($order_id);
            $fewer_transaction_id = $order->get_meta('fewer_transaction_id');
            if ($fewer_transaction_id === $transaction_id) {
                return $this->fewerwc_order_details_core($order);
            }

        }
        elseif (array_key_exists('transaction_id', $body)){
            $transaction_id = $body['transaction_id'];
            $orders = $this->get_order_by_fewer_transaction_id($transaction_id);
            if(!empty($orders)){
                try {
                    return new WP_REST_Response( array_map("self::fewerwc_order_details", $orders) );
                }
                catch (Exception $e){
                    return new WP_REST_Response( print_r($e,true), 500);
                }
            }
            return new WP_REST_Response("Unexpected error occurred with getting order with this transaction id = ".print_r($transaction_id,true), 500);
        }
        return new WP_REST_Response("This order cannot be found !!", 400);
    }


    public function fewerwc_order_details($order) {
        $result_items = [];
        $order_items = $order->get_items();
        if (!empty($order_items)) {
            foreach ($order_items as $item_id => $item) {
                $result_items[] = [
                    'id' => $item->get_product_id(),
                    'name' => $item->get_name(),
                    'quantity' => $item->get_quantity(),
                    'total' => $item->get_total()
                ];
            }
        }

        return [
            'order_details' => array_merge($order->get_data(), ['products' => $result_items]),
            'order_status' => $order->get_status(),
            'redirect_url' => $order->get_checkout_order_received_url(),
        ];
    }


    /**
     * @param $order
     * @return WP_REST_Response
     */
    public function fewerwc_order_details_core($order): WP_REST_Response
    {
        try {
            return new WP_REST_Response( $this->fewerwc_order_details($order) );
        }
        catch (Exception $e){
            return new WP_REST_Response( print_r($e,true), 500);
        }
    }

    private function get_order_by_fewer_transaction_id($transaction_id){
        return wc_get_orders([
            'limit'      => 1,
            'meta_key'   => 'fewer_transaction_id',
            'meta_value' => $transaction_id,
        ]);
    }

    public function get_permission_callback()
    {
        return $this->WCBasicAuth();
    }

}
