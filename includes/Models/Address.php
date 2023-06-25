<?php

namespace Fewer\Models;

final class Address
{
    /**
     * @var string
     */
    private $address;
    /**
     * @var string
     */
    private $city;
    /**
     * @var string
     */
    private $postcode;
    /**
     * @var string
     */
    private $state;
    /**
     * @var string
     */
    private $country;
    /**
     * @var string
     */
    private $notes;

    public function __construct($address, $city, $postcode, $state, $country,$phone,$first_name,$last_name, $notes)
    {
        $this->address   = $address;
        $this->city      = $city;
        $this->postcode  = $postcode;
        $this->state     = $state;
        $this->country   = $country;
        $this->notes     = $notes;
        $this->phone     = $phone;
        $this->first_name     = $first_name;
        $this->last_name     = $last_name;
    }

    public static function from_json(array $json)
    {
        if (is_null($json)) {
            throw new \InvalidArgumentException("missing address data");
        }

        return new Address(
            $json['address'],
            $json['city'],
            $json['postcode'],
            $json['state'],
            $json['country'],
            $json['phone'],
            $json['first_name'],
            $json['last_name'],
            $json['notes']
        );
    }

    /**
     * returns the address represented as woo address props, optionally prefixed
     */
    public function to_address_props($prefix = '')
    {
        $pfx = strlen($prefix) > 0 ? "${prefix}_" : "";
        return [
            "${pfx}country"   => $this->country,
            "${pfx}state"     => $this->state,
            "${pfx}postcode"  => $this->postcode,
            "${pfx}city"      => $this->city,
            "${pfx}address_1" => $this->address,
            "${pfx}address_2" => $this->notes,
            "${pfx}phone"     => $this->phone,
            "${pfx}first_name"     => $this->first_name,
            "${pfx}last_name"     => $this->last_name,
        ];
    }

    /**
     * returns the address ready to be ingested by WC_Customer#set_props
     */
    public function to_customer_address_props()
    {
        return $this->to_address_props('shipping') + $this->to_address_props('billing');
    }

    public function get_address()
    {
        return $this->address;
    }

    public function get_city()
    {
        return $this->city;
    }

    public function get_postcode()
    {
        return $this->postcode;
    }

    public function get_state()
    {
        return $this->state;
    }

    public function get_country()
    {
        return $this->country;
    }

    public function get_notes()
    {
        return $this->notes;
    }
    public function get_phone()
    {
        return $this->phone;
    }

    public function get_first_name()
    {
        return $this->first_name;
    }

    public function get_last_name()
    {
        return $this->last_name;
    }
}
