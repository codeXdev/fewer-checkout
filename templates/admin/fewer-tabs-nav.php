<?php
/**
 * Fewer admin settings page nav template.
 *
 * @package Fewer
 */

$fewerwc_tabs       = fewerwc_get_settings_tabs();
$fewerwc_active_tab = fewerwc_get_active_tab();

?>

<nav class="nav-tab-wrapper">
	<?php
	foreach ( $fewerwc_tabs as $tab_name => $tab_label ) :
		$tab_url   = sprintf( 'admin.php?page=fewer&tab=%s', $tab_name );
		$tab_class = array( 'nav-tab' );
		if ( $fewerwc_active_tab === $tab_name ) {
			$tab_class[] = 'nav-tab-active';
		}
		$tab_class = implode( ' ', $tab_class );
		?>
	<a href="<?php echo esc_url( $tab_url ); ?>" class="<?php echo esc_attr( $tab_class ); ?>"><?php echo esc_html( $tab_label ); ?></a>
	<?php endforeach; ?>
</nav>
