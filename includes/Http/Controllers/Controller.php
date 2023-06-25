<?php

namespace Fewer\Http\Controllers;

use Fewer\Models\Address;
use Fewer\Models\Order;
use Fewer\Models\OrderRequest;
use Fewer\Models\User;
use Fewer\Services\UserService;
use Exception;
use TypeError;
use WP_REST_Request;
use WP_REST_Response;


abstract class Controller
{

    const FEWERWC_API_NAMESPACE = 'vendor/fewer/v1';


    /**
     * Route namespace.
     *
     * @var string
     */
    protected $namespace = self::FEWERWC_API_NAMESPACE;

    /**
     * Route name.
     *
     * @var string
     */
    protected $route;

    /**
     * Route methods.
     *
     * @var string
     */
    protected $method;
    /**
     * Route permission callback.
     *
     * @var string
     */
    protected $permissionCallback = '__return_true';
    private $userService;

    public $fewer_cart_id;

    public function __construct(UserService $userService = NULL)
    {
        $this->userService = $userService ?: new  UserService();
    }

    /**
     * Route handler function.
     *
     * @param  WP_REST_Request  $request  JSON request.
     */
    abstract public function handle($request);

    /**
     * @return string
     */
    public function get_route()
    {
        return $this->route;
    }

    /**
     * @return string
     */
    public function get_method()
    {
        return $this->method;
    }

    /**
     * @return string
     */
    public function get_namespace()
    {
        return $this->namespace;
    }

    /**
     * @return string
     */
    public function get_permission_callback()
    {
        return $this->permissionCallback;
    }

    public function WCBasicAuth()
    {
        return apply_filters( 'determine_current_user', false );
    }

    /**
     * @param $order_schema
     * @param $fewer_order_id
     * @return array
     * @throws Exception
     */
    public function fewerwc_order_core($order_schema): array
    {
        try {
            $order_request = new OrderRequest(
                User::from_json($order_schema['user']),
                Order::from_json($order_schema['order']),
                isset($order_schema['order']['shipto']) ? Address::from_json($order_schema['order']['shipto']) : null
            );
        } catch (TypeError $ex) {
            throw new Exception($ex->getMessage());
        }
        if (is_wp_error($order_request)) {
            throw new Exception('Unhandled exception in order request');
        }
        $user_id = $this->userService->get_or_create($order_request->get_user());
        return array($order_request, $user_id);
    }

    protected function fewerwc_build_order_schema($transaction)
    {
        try {
            $user = [
                "email" => $transaction["client_email"] ?? "",
                "first_name" => $transaction["client_first_name"] ?? "",
                "last_name" => $transaction["client_last_name"] ?? "",
                "phone_number" => $transaction["client_phone_number"] ?? "",
            ];

            $schema = [
                "user" => $user,
                "order" => []
            ];

            if (!empty($transaction['shipping_details'])) {
                $shipping_details = $transaction['shipping_details'];
                $schema["order"]["shipping"] = [
                    "rate_id" => $shipping_details['id'],
                    "title" => $shipping_details['label'],
                    "cost_cents" => $shipping_details['price'],
                ];
            }

            if (!empty($transaction['address_details'])) {
                $addressDetails = $transaction['address_details'];
                if (!empty($addressDetails['email'])) {
                    $schema['user']['email'] = $addressDetails['email'];
                }
                $street = "$addressDetails[street1], $addressDetails[street2]";
                $schema['order']['shipto'] = [
                    "recipient" => $transaction["client_phone_number"],
                    "phone" => $transaction["client_phone_number"],
                    "address" => $street,
                    "city" => $addressDetails['city'] ?? "",
                    "postcode" => $addressDetails['postcode'] ?? "",
                    "state" => $addressDetails['state_code'] ?? $addressDetails['state'] ?? "",
                    "country" => $addressDetails['country'] ?? "",
                    "notes" => "",
                    "first_name" => $transaction['client_first_name'],
                    "last_name" => $transaction['client_last_name']
                ];
                $schema['user']['address_details'] = [
                    "street1" => $addressDetails['street1'] ?? "",
                    "street2" => $addressDetails['street2'] ?? "",
                    "zip" => $addressDetails['postcode'] ?? "",
                    "city" => $addressDetails['city'] ?? "",
                    "state" => $addressDetails['state_code'] ?? $addressDetails['state'] ?? "",
                    "country" => $addressDetails['country'] ?? "",
                ];
            }
            return $schema;
        } catch (Exception $e) {
            return $e;
        }
    }

    protected function order_creation_error_response($message, $full_error = NULL)
    {
        fewerwc_report_error($this->fewer_cart_id, empty($full_error) ? ["message" => $message] : [$message => $full_error]);
        fewerwc_log_debug('Order Controller - Error ( ' . print_r($message, true) . ')');
        return new WP_REST_Response($message, 500);
    }

    protected function get_transaction_details($fewer_transaction_id)
    {
        $url = FEWERWC_TRANSACTION_DETAILS . $fewer_transaction_id;
        $res = wp_remote_retrieve_body(wp_remote_get($url));
        return json_decode($res, true);
    }

}
