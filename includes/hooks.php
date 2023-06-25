<?php

add_action('init', 'fewerwc_woocommerce_order_created');

function fewerwc_woocommerce_order_created()
{
    if (!isset($_GET['fewer_order_created'])) {
        return;
    }

    $redirect_url = wc_get_endpoint_url('order-received', null, wc_get_checkout_url());

    $order_id = absint($_GET['fewer_order_created']);
    $order = wc_get_order($order_id);
    if ($order) {
        $redirect_url = $order->get_checkout_order_received_url();
    }
    WC()->cart->empty_cart();
    wp_safe_redirect($redirect_url);
    exit;
}

function fewerwc_report_error($ref_id,$body){
    if(!empty($ref_id)) {
        $url = FEWERWC_TRANSACTION_DETAILS . $ref_id . '/report_error';
        wp_remote_post($url, array(
                'method' => 'POST',
                'body' => $body,
            )
        );
    }
}


add_filter('rocket_exclude_js', 'exclude_js_from_minification');
function exclude_js_from_minification($excluded_files = array()) {
    $excluded_files[] = '/wp-content/plugins/fewer-checkout/(.*).js';
    return $excluded_files;
}