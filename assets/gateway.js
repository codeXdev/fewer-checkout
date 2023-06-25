/**
 * Handle Payment Gateway Selector.
 *
 * event: payment_method_selected
 */

( function( $ ) {

	"use strict";

	let fewerGateway = {
		/**
		 * Hide the checkout button if the Fewer gateway is selected.
		 *
		 * @returns {void}
		 */
		maybeHideCheckout: function () {
			const selectedPaymentMethod = $('.woocommerce-checkout input[name="payment_method"]:checked').attr('id');
			let placeOrder = $('input[type="submit"]');
			if (!placeOrder.length) {
				placeOrder = $('button[type="submit"]');
			}
			const checkoutButton = $('div.fewer-container');
			if (selectedPaymentMethod === 'payment_method_Fewer' && placeOrder) {
				placeOrder.hide();
				checkoutButton.show();
			} else {
				placeOrder.show();
				checkoutButton.hide();
			}
		},
	};

	$( document ).ready( function() {
		fewerGateway.maybeHideCheckout();
	} );

	$( document.body ).on( 'payment_method_selected', function() {
		fewerGateway.maybeHideCheckout();
	} );

	$( document.body ).on( 'updated_checkout', function() {
		fewerGateway.maybeHideCheckout();
	} );

} ) ( jQuery );
