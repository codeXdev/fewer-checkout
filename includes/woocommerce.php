<?php

/**
 * Check whether WooCommerce is active.
 *
 * @return bool
 */
function fewerwc_is_woocommerce_active()
{
    if (!function_exists('is_plugin_active')) {
        require_once ABSPATH . '/wp-admin/includes/plugin.php';
    }
    $wc_is_active = is_plugin_active( 'woocommerce/woocommerce.php' );

    if ( ! $wc_is_active ) {
        // Add an admin notice that WooCommerce must be active in order for Fewer to work.
        add_action(
            'admin_notices',
            'fewerwc_settings_admin_notice_woocommerce_not_installed'
        );
    }
    return $wc_is_active;
}

/**
 * Add hook for admin notice caused by missing WooCommerce plugin
 */
function fewerwc_admin_notice_woocommerce_is_missing()
{
    add_action(
        'admin_notices',
        'fewerwc_display_admin_notice_for_missing_woocommerce'
    );
}

/**
 * Display the error message when WooCommerce plugin is missing.
 */
function fewerwc_display_admin_notice_for_missing_woocommerce()
{
    printf(
        '<div class="notice notice-error"><p>%s</p></div>',
        'Fewer Checkout requires an active WooCommerce installation.'
    );
}

/**
 * Check if plugin required configuration is set
 */
function fewerwc_check_fewer_configured()
{
    return get_option('fewer_app_id') && get_option('fewer_valid_app_id');
}

/**
 * Add hook for admin notice caused by incomplete Fewer configuration
 */
function fewerwc_admin_notice_incomplete_configuration()
{
    add_action(
        'admin_notices',
        'fewerwc_display_admin_notice_incomplete_configuration'
    );
}

/**
 * Display error message when API Key & Secret is not configured.
 */
function fewerwc_display_admin_notice_incomplete_configuration()
{
    printf(
        '<div class="notice notice-error"><p>%s</p></div>',
        'Fewer Checkout <a href="/wp-admin/admin.php?page=fewer&tab=fewer_app_info">API Key</a> are not configured, quick buy buttons will not appear until they are set.'
    );
}

/**
 * Check whether custom Permalinks are disabled.
 *
 * @return bool
 */
function fewerwc_are_permalinks_disabled()
{
    return get_option('permalink_structure') === "";
}

/**
 * Add hook for admin notice caused by disabled custom Permalinks
 */
function fewerwc_admin_notice_permalinks_are_disabled()
{
    add_action(
        'admin_notices',
        'fewerwc_display_admin_notice_for_disabled_permalinks'
    );
}

/**
 * Display the error message when custom Permalinks are disabled.
 */
function fewerwc_display_admin_notice_for_disabled_permalinks()
{
    printf(
        '<div class="notice notice-error"><p>%s</p></div>',
        sprintf(
            'Fewer Plugin requires pretty <a href="https://wordpress.org/support/article/settings-permalinks-screen/" target="_blank">%s</a> to be enabled.',
            'Permalinks'
        )
    );
}

/**
 * Load the Fewer WC Gateway class
 *
 * @param array $gateways The WC payment gateways.
 *
 * @return array
 */
function fewerwc_add_payment_gateway( $gateways ) {
	$gateways[] = 'FewerWC\WC_Gateway_Fewer';
	return $gateways;
}
add_filter( 'woocommerce_payment_gateways', 'fewerwc_add_payment_gateway' );