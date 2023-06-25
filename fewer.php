<?php

/**
 * Plugin Name: Fewer Checkout
 * Plugin URI: https://fewer.tech/
 * Author: Fewer
 * Author URI: https://fewer.tech
 * Description: 1-click biometric checkout- the fastest and most secure way to accept online payments.
 * Version: 1.0.44
 * Requires at least: 6.0.2
 * Tested up to: 6.2
 * Requires PHP: 7.4
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/old-licenses/gpl-3.0.html
 *
 * @package Fewer
 */

defined('ABSPATH') || exit;

define('FEWERWC_PATH', plugin_dir_path(__FILE__));
define('FEWERWC_URL', plugin_dir_url(__FILE__));
define('FEWERWC_PLUGIN_BASENAME', plugin_basename(__FILE__));
define('FEWERWC_PAYMENT_METHOD_ID', 'fewer');
define('FEWERWC_PAYMENT_METHOD_SLUG', 'Fewer Checkout');
define('FEWERWC_VERSION', '1.0.44');

require_once FEWERWC_PATH . 'constants.php';
require_once FEWERWC_PATH . 'includes/woocommerce.php';
add_option( 'fewer_valid_app_id', false);
if (fewerwc_is_woocommerce_active()) {
    if (fewerwc_are_permalinks_disabled()) {
        fewerwc_admin_notice_permalinks_are_disabled();
    }

    if (!fewerwc_check_fewer_configured()) {
        fewerwc_admin_notice_incomplete_configuration();
    }

    /*
	 * Composer provides a convenient, automatically generated class loader for
	 * our plugin. We'll require it here so that we don't have to worry about manual
	 * loading any of our classes later on.
	 */
    require_once FEWERWC_PATH . 'vendor/autoload.php';
    require_once FEWERWC_PATH . 'includes/admin/settings.php';
    require_once FEWERWC_PATH . 'includes/debug.php';
    require_once FEWERWC_PATH . 'includes/assets.php';
    require_once FEWERWC_PATH . 'includes/utilities.php';
    require_once FEWERWC_PATH . 'includes/hooks.php';
    require_once FEWERWC_PATH . 'includes/button.php';
    require_once FEWERWC_PATH . 'includes/routes.php';

    /**
	 * Load the Fewer payment gateway after plugins are loaded.
	 */
	function fewerwc_plugins_loaded() {
		// Add the Fewer Checkout payment gateway object.
		require_once FEWERWC_PATH . 'includes/class-wc-gateway-fewer.php';
	}
	add_action( 'plugins_loaded', 'fewerwc_plugins_loaded' );

} else {
    fewerwc_admin_notice_woocommerce_is_missing();
}


if (!defined('FEWERWC_PLUGIN_FILE')) {
    define('FEWERWC_PLUGIN_FILE', __FILE__);
}

if (!defined('FEWERWC_PLUGIN_DIR')) {

    define('FEWERWC_PLUGIN_DIR', untrailingslashit(plugins_url('/', FEWERWC_PLUGIN_FILE)));
}

if (!defined('FEWERWC_ABSPATH')) {
    define('FEWERWC_ABSPATH', dirname(FEWERWC_PLUGIN_FILE) . '/');
}
define( 'FEWERWC_PLUGIN_ACTIVATED', 'fewerwc_plugin_activated' );
/**
 * Add a flag indicating that the plugin was just activated.
 */
function fewerwc_plugin_activated() {
	// First make sure that WooCommerce is installed and active.
	if ( fewerwc_is_woocommerce_active() ) {
		// Add a flag to show that the plugin was activated.
		add_option( FEWERWC_PLUGIN_ACTIVATED, true );
	}
    update_option( 'wc_hide_shipping_options', 'hide_all' );
}
register_activation_hook( __FILE__, 'fewerwc_plugin_activated' );