<?php
require_once '/Applications/MAMP/htdocs/wp-load.php';
use PHPUnit\Framework\TestCase;
use Fewer\Http\Controllers\OrderDetailsController;
use WP_REST_Request;
use WP_REST_Response;

class OrderDetailsControllerTest extends TestCase {

	public function testHandleReturnsBadRequestWhenOrderIdOrTransactionIdIsNotProvided()
	{
		$request = new WP_REST_Request('POST',
			'/wc/fewer/v2/order/details'
		);
		$controller = new OrderDetailsController();

		$response = $controller->handle($request);

		$this->assertInstanceOf(WP_REST_Response::class, $response);
		$this->assertEquals(400, $response->get_status());
		$this->assertEquals("This order cannot be found !!", $response->get_data());
	}

	public function testHandleReturnsServerErrorWhenUnexpectedErrorOccurs()
	{
		$request = new WP_REST_Request('POST', '/wc/fewer/v2/order/details');
		$request->set_body_params(['transaction_id' => '123']);
		$controller = new OrderDetailsController();

		$response = $controller->handle($request);

		$this->assertInstanceOf(WP_REST_Response::class, $response);
		$this->assertEquals(500, $response->get_status());
		$this->assertStringContainsString("Unexpected error occurred", $response->get_data());
	}

	public function testHandleReturnsOrderDetailsForValidOrderIdAndTransactionId()
	{
		$order_id = 1;
		$transaction_id = 'abc';
		$order = $this->getMockBuilder(WC_Order::class)
		              ->setMethods(['get_meta'])
		              ->getMock();
		$order->method('get_meta')
		      ->with('fewer_transaction_id')
		      ->willReturn($transaction_id);
		$orders = [$order];
		$request = new WP_REST_Request('POST', '/wc/fewer/v2/order/details');
		$request->set_body_params(['order_id' => $order_id, 'transaction_id' => $transaction_id]);
		$controller = $this->getMockBuilder(OrderDetailsController::class)
		                   ->onlyMethods(['fewerwc_order_details_core'])
		                   ->getMock();
		$controller->expects($this->once())
		           ->method('fewerwc_order_details_core')
		           ->with($order)
		           ->willReturn(new WP_REST_Response());

		$response = $controller->handle($request);

		$this->assertInstanceOf(WP_REST_Response::class, $response);
		$this->assertEquals(200, $response->get_status());
	}
}