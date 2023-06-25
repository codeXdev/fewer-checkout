<?php

namespace Fewer\Http\Controllers;

use Fewer\Models\Order;
use WC_Order;
use WP_REST_Request;
use WP_REST_Response;


class CreateCheckoutController extends Controller
{

    protected $namespace = 'wc/fewer/v2';
    /**
     * Route name.
     *
     * @var string
     */
    protected $route = 'checkout/create';

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
    public function handle($request){
        $body = $request->get_json_params();
        $cart = WC()->cart;
//        if (array_key_exists("order",$body)) {
//            $cart_from_body = $body['order']['cart'];
//            if(!empty($cart_from_body)) {
//                $product_extra_options = $this->fewerwc_handle_product_extra_option($cart_from_body);
//                $order_items = Order::from_json($product_extra_options);
//            }
//            else{
//                $order_items = Order::from_json($body['order']);
//            }
//            foreach ($order_items->get_cart() as $item) {
//                $productAdded = $cart->add_to_cart(
//                    $item->get_product_id(),
//                    $item->get_quantity(),
//                    null,
//                    $item->get_attributes_array()
//                );
//                if (is_bool($productAdded) && !$productAdded) {
//                    throw new InvalidProductException(json_encode(WC()->session->get('wc_notices')));
//                }
//            }
//        }
        if(array_key_exists("pre_existing_order_id",$body)){
            $order = wc_get_order($body['pre_existing_order_id']);
            $total_amount   = $order->get_total();
            $taxes          = $order->get_total_tax('');
            $response_result = [
                'discount'      => 0,
                'taxes'         => $taxes,
                'amount'        => max( 0, $total_amount - $taxes),
                'order_content' => $this->fewerwc_get_order_items($order)
            ];
        }
        else{
            $cart->calculate_totals();
            $discount = $cart->get_discount_total();
            $response_result = [
                'discount'      => $discount,
                'taxes'         => $cart->get_cart_contents_tax() + $cart->get_fee_tax() + $cart->get_shipping_tax(),
                'amount'        => $cart->get_cart_contents_total() + $cart->get_fee_total() + $cart->get_shipping_total() + $discount,
                'order_content' => $this->fewerwc_get_cart_items()
            ];

        }
        return new WP_REST_Response($response_result, 201);
    }

    private function fewerwc_handle_product_extra_option($order_cart){
        $products = array();
        foreach ($order_cart as $obj){
            if(array_key_exists('product_id',$obj)){
                $products[] = [
                    'product_id'=>$obj['product_id'],
                    'quantity'=>$obj['quantity'],
                    'variation_id'=>$obj['variation_id']??"",
                ];
            }
            foreach ($obj as $key => $value) {
                if (preg_match('/^(.*)_product_(\d+)_(.*)$/', $key, $matches)) {
                    $productIdKey = $matches[1] . "_product_" . $matches[2];
                    if(!empty($obj[$productIdKey])){
                        $field = $matches[3];
                        if ($field == "quantity") {
                            $quantity = intval($value);
                            if ($quantity > 0) {
                                if (!array_key_exists($productIdKey, $products)) {
                                    $products[$productIdKey] = array(
                                        "product_id" => $obj[$productIdKey],
                                        "quantity" => $quantity,
                                        "variation_id" => ""
                                    );
                                } else {
                                    $products[$productIdKey]["quantity"] = $quantity;
                                }
                            }
                        }
                        else if ($field == "variation_id") {
                            if (!array_key_exists($productIdKey, $products)) {
                                $products[$productIdKey] = array(
                                    "product_id" => $obj[$productIdKey],
                                    "quantity" => 0,
                                    "variation_id" => $value
                                );
                            }
                            else {
                                $products[$productIdKey]["variation_id"] = $value;
                            }
                        }
                    }

                }
            }
        }
        return ['cart'=>array_values($products)];
    }

    private function fewerwc_get_order_items($order){
        $result_items = [];
        $order_items = $order->get_items();
        if(!empty($order_items)){
            foreach ($order_items as $item_id => $item) {
                $result_items[] = [
                    'id'=> $item->get_product_id(),
                    'name'=> $item->get_name(),
                    'quantity' => $item->get_quantity(),
                    'total' => $item->get_total()
                ];
            }
        }

        return $result_items;
    }

    private function fewerwc_get_cart_items(){
        $result_items = [];
        global $woocommerce;
        $items = $woocommerce->cart->get_cart();
        foreach($items as $item => $values) {
            $_product =  wc_get_product( $values['data']->get_id());
            $price = get_post_meta($values['product_id'] , '_price', true);
            $result_items[] = [
                'id'=> $_product->get_id(),
                'name'=> $_product->get_name(),
                'quantity' => $values['quantity'],
                'total' => $price
            ];
        }
        return $result_items;
    }

    public function get_permission_callback()
    {
        return $this->WCBasicAuth();
    }
}