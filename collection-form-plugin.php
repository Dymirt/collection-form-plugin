<?php
/*
Plugin Name: Collection form
Plugin URI: http://URI_Of_Page_Describing_Plugin_and_Updates
Description: Dodaj kalkulator prowizji windykacji za pomocą shortcode [collection_form_shortcode]
Version: 1.0
Author: dmytrokolida
Author URI: http://URI_Of_The_Plugin_Author
License: A "Slug" license name e.g. GPL2
*/

function collection_form_shortcode_output() {
	ob_start(); // Start output buffering
	wp_enqueue_style( 'collection-form-style', plugin_dir_url( __FILE__ ) . 'build/index.css' );
	wp_enqueue_script( 'collection-form-script', plugin_dir_url( __FILE__ ) . 'build/index.js', array( 'wp-element' ), '1.0.0', true );
	// Load the app.php template
	include plugin_dir_path( __FILE__ ) . 'templates/app.php';

	$output = ob_get_clean(); // Get the buffered content
	return $output;
}
add_shortcode('collection_form_shortcode', 'collection_form_shortcode_output');