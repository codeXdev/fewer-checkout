<?php

use Fewer\Http\Controllers\{
    AboutController,
    CreateOrderController,
    CompleteOrderController,
    CreateCheckoutController,
    UpdateCheckoutController,
    CancelOrderController,
    OrderDetailsController,
    OrderHealthController
};

add_action('rest_api_init', 'fewerwc_register_routes');
add_action('rest_api_init', 'fewerwc_rest_api_includes');

function fewerwc_register_routes()
{
    $controllers = [
        new AboutController(),
        new CreateOrderController(),
        new CompleteOrderController(),
        new CreateCheckoutController(),
        new UpdateCheckoutController(),
        new CancelOrderController(),
        new OrderDetailsController(),
        new OrderHealthController()
    ];
    foreach ($controllers as $controller) {
        register_rest_route(
            $controller->get_namespace(),
            $controller->get_route(),
            [
                'methods'             => $controller->get_method(),
                'callback'            => [$controller, 'handle'],
            ]
        );
    }
}

function fewerwc_rest_api_includes()
{
    // Fixes https://github.com/woocommerce/woocommerce/issues/27157
    if (empty(WC()->cart)) {
        WC()->frontend_includes();
        wc_load_cart();
    }
}
