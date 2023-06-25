<?php
/**
 * Template for rendering individual tabs.
 *
 * @package Fewer
 */

$tab_name = ! empty( $args['tab'] ) ? $args['tab'] : '';

?>
<form method="post" action="options.php">
	<?php
	settings_fields( $tab_name );
	do_settings_sections( $tab_name );
	submit_button();
	?>
</form>
