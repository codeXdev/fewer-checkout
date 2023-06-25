<?php

namespace Fewer\Models;

final class Order
{

    /**
     * @var string
     */
    private $currency;
    /**
     * @var array
     */
    private $cart;
    /**
     * @var string
     */
    private $coupon;
    /**
     * @var int
     */
    private $fewer_discount;

    /**
     * @var OrderShipping
     */
    private $shipping;

    public function __construct($currency, $shipping, $coupons, $fewer_discount, array $cart)
    {
        $this->currency           = $currency;
        $this->shipping           = $shipping;
        $this->fewer_discount   = $fewer_discount;
        $this->coupons             = $coupons;
        $this->cart               = $cart;
    }

    public static function from_json(array $json)
    {
        $items = [];
        if (isset($json['cart'])) {
            $items = array_map(function ($el) {
                return CartItem::from_json($el);
            }, $json['cart']);
        }

        $shipping = NULL;
        if (isset($json['shipping'])) {
            $shipping = OrderShipping::from_json($json['shipping']);
        }

        $discount = 0;
        if (isset($json['fewer_discount'])) {
            $discount = $json['fewer_discount']['amount'];
        }
        return new Order(
            $json['currency'],
            $shipping,
            $json['coupons'] ?? NULL,
            $discount,
            $items
        );
    }


    public function get_currency()
    {
        return $this->currency;
    }

    public function get_shipping()
    {
        return $this->shipping;
    }

    public function get_coupon()
    {
        return $this->coupons;
    }

    public function get_fewer_discount()
    {
        return Money::from_cents($this->fewer_discount);
    }

    public function get_cart()
    {
        return $this->cart;
    }
}
