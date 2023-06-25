<?php

namespace Fewer\Services;

use Fewer\Exceptions\{InapplicableCouponException, InvalidCouponException, InvalidProductException};
use Fewer\Models\CartItem;
use Fewer\Models\OrderRequest;
use Exception;

class OrderService
{

    private $addFeeActionClosure;

    /**
     * @throws InvalidCouponException
     * @throws InapplicableCouponException
     * @throws \WC_Data_Exception
     * @throws InvalidProductException
     */
    public function update_cart_order($order ,$user_id, OrderRequest $order_request,$status)
    {
        add_filter('woocommerce_persistent_cart_enabled', '__return_false');
        wp_set_current_user($user_id);
        WC()->customer = new \WC_Customer($user_id);

        $order = $this->assign_shipping_address($order, $order_request);
        WC()->session->set('chosen_payment_method', FEWERWC_PAYMENT_METHOD_ID);

        $order->set_customer_id($user_id);

        if ($order_request->get_order()->get_shipping() != NULL) {
            WC()->session->set('chosen_shipping_methods', [$order_request->get_order()->get_shipping()->get_rate_id()]);
        }
        WC()->cart->calculate_totals();

        if ($this->addFeeActionClosure != NULL) {
            remove_action('woocommerce_cart_calculate_fees', $this->addFeeActionClosure);
        }
        $this->fewerwc_set_data_from_cart($order);
        $order->set_payment_method(FEWERWC_PAYMENT_METHOD_ID);
        $order->set_payment_method_title(FEWERWC_PAYMENT_METHOD_SLUG);
        $order->set_status(\apply_filters('woocommerce_default_order_status', $status));
        $order->calculate_totals();
        do_action('woocommerce_checkout_create_order', $order, []);
        $order_id = $order->save();
        do_action('woocommerce_checkout_update_order_meta', $order_id, []);

        return $order;
    }

    /**
     * @param                $wc_order
     * @param  OrderRequest  $request
     *
     * @return \WC_Order
     */
    private function assign_shipping_address($wc_order, OrderRequest $request)
    {
        $user = $request->get_user();
        $address = $request->get_ship_to();
        if ($address) {
            $wc_order->set_address($address->to_address_props(), 'shipping');
            $wc_order->set_address($address->to_address_props(), 'billing');
            WC()->customer->set_props($address->to_customer_address_props());
        } else {
            $wc_order->set_billing_first_name($user->get_first_name());
            $wc_order->set_billing_last_name($user->get_last_name());
        }

        return $wc_order;
    }

    private function fewerwc_set_data_from_cart( &$order ) {
        $order_vat_exempt = WC()->cart->get_customer()->get_is_vat_exempt() ? 'yes' : 'no';
        $order->add_meta_data( 'is_vat_exempt', $order_vat_exempt, true );
        $order->set_shipping_total( WC()->cart->get_shipping_total() );
        $order->set_discount_total( WC()->cart->get_discount_total() );
        $order->set_discount_tax( WC()->cart->get_discount_tax() );
        $order->set_cart_tax( WC()->cart->get_cart_contents_tax() + WC()->cart->get_fee_tax() );
        $order->set_shipping_tax( WC()->cart->get_shipping_tax() );
        WC()->cart->calculate_totals();
        $order->set_total( WC()->cart->get_total( 'edit' ) );
        $order->remove_order_items('shipping');
        WC()->checkout()->create_order_shipping_lines( $order,
            WC()->session->get( 'chosen_shipping_methods' ),
            WC()->shipping()->get_packages() );
    }

}
