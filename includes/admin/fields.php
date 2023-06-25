<?php
/**
 * Fewer Plugin Settings Fields
 *
 * @package Fewer
 */

// Load base field class.
require_once FEWERWC_PATH . 'includes/admin/fields/class-field.php';
// Load input field class.
require_once FEWERWC_PATH . 'includes/admin/fields/class-input.php';
// Load textarea field class.
require_once FEWERWC_PATH . 'includes/admin/fields/class-textarea.php';
// Load checkbox field class.
require_once FEWERWC_PATH . 'includes/admin/fields/class-checkbox.php';
// Load select field class.
require_once FEWERWC_PATH . 'includes/admin/fields/class-select.php';
// Load ajax select field class.
require_once FEWERWC_PATH . 'includes/admin/fields/class-ajaxselect.php';


/**
 * Standard text input field.
 *
 * @param array $args Attribute args for the field.
 *
 * @return FewerWC\Admin\Fields\Input
 */
function fewerwc_settings_field_input( $args ) {
	return new FewerWC\Admin\Fields\Input( $args );
}

/**
 * Standard textarea field.
 *
 * @param array $args Attribute args for the field.
 *
 * @return FewerWC\Admin\Fields\Textarea
 */
function fewerwc_settings_field_textarea( $args ) {
	return new FewerWC\Admin\Fields\Textarea( $args );
}

/**
 * Standard checkbox input field.
 *
 * @param array $args Attribute args for the field.
 *
 * @return FewerWC\Admin\Fields\Checkbox
 */
function fewerwc_settings_field_checkbox( $args ) {
	return new FewerWC\Admin\Fields\Checkbox( $args );
}

/**
 * Regular select settings field.
 *
 * @param array $args Attribute args for the field.
 *
 * @return FewerWC\Admin\Fields\Select
 */
function fewerwc_settings_field_select( $args ) {
	return new FewerWC\Admin\Fields\Select( $args );
}

/**
 * Ajax select settings field.
 *
 * @param array $args Attribute args for the field.
 *
 * @return FewerWC\Admin\Fields\AjaxSelect
 */
function fewerwc_settings_field_ajax_select( $args ) {
    return new FewerWC\Admin\Fields\AjaxSelect( $args );
}
