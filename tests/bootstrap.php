<?php

define( 'WP_TESTS_DIR', dirname( __FILE__ ) . '/wordpress-tests-lib' );
require_once WP_TESTS_DIR . '/includes/functions.php';

function _manually_load_plugin() {
	require dirname( dirname( __FILE__ ) ) . '/fewer.php';
}

tests_add_filter( 'muplugins_loaded', '_manually_load_plugin' );

require WP_TESTS_DIR . '/includes/bootstrap.php';