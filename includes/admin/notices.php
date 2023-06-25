<?php
/**
 * Display admin notices.
 *
 * @package Fewer
 */

/**
 * Check for conditions to display admin notices.
 */
function fewerwc_maybe_display_admin_notices() {
	$fewer_app_id              = fewerwc_get_app_id();
	$fewerwc_debug_mode        = get_option( FEWERWC_SETTING_DEBUG_MODE, 0 );
	$fewerwc_test_mode         = get_option( FEWERWC_SETTING_TEST_MODE, '1' );

	if ( ! empty( $fewerwc_debug_mode ) ) {
		add_action( 'admin_notices', 'fewerwc_settings_admin_notice_debug_mode' );
	}

	if ( ! empty( $fewerwc_test_mode ) ) {
		add_action( 'admin_notices', 'fewerwc_settings_admin_notice_test_mode' );
	}
}
add_action( 'admin_init', 'fewerwc_maybe_display_admin_notices' );


/**
 * Template for printing an admin notice.
 *
 * @param string $message The message to display.
 * @param string $type    Optional. The type of message to display.
 */
function fewerwc_admin_notice( $message, $type = 'warning' ) {
	$class = 'notice notice-' . $type;

	printf(
		'<div class="%1$s"><p>%2$s</p></div>',
		esc_attr( $class ),
		esc_html( $message )
	);
}

/**
 * Print the Test Mode admin notice.
 */
function fewerwc_settings_admin_notice_test_mode() {
	fewerwc_admin_notice( __( 'Fewer Checkout for WooCommerce is currently in Test Mode.', 'fewer' ) );
}

/**
 * Print the Debug Mode admin notice.
 */
function fewerwc_settings_admin_notice_debug_mode() {
	fewerwc_admin_notice( __( 'Fewer Checkout for WooCommerce is currently in Debug Mode.', 'fewer' ) );
}