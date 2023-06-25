<?php
/**
 * Fewer admin settings page template.
 *
 * @package Fewer
 */

$fewerwc_tabs       = fewerwc_get_settings_tabs();
$fewerwc_active_tab = fewerwc_get_active_tab();

?>
<div class="wrap fewer-settings">
	<h2><?php esc_html_e( 'Fewer Settings', 'fewer' ); ?></h2>

	<?php
	// Load the tabs nav.
	fewerwc_load_template( 'admin/fewer-tabs-nav' );

	// Load the tab content for the active tab.
	$valid_tab_contents   = array_keys( $fewerwc_tabs );
	$valid_tab_contents[] = 'fewer_advanced';
	if ( ! in_array( $fewerwc_active_tab, $valid_tab_contents, true ) ) {
		$fewerwc_active_tab = 'fewer_app_info';
	}
	$fewerwc_tab_template = 'admin/tabs/' . str_replace( '_', '-', $fewerwc_active_tab );
	fewerwc_load_template( $fewerwc_tab_template );
	?>
</div>
