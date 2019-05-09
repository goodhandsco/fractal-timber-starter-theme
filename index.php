<?php
/**
 * The main template file
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

$context = Timber::get_context();
$paged = (get_query_var('paged')) ? get_query_var('paged') : 1; 
$postArgs = array(
	'posts_per_page' => 8,
    'post__not_in' => get_option( 'sticky_posts' ),
    'paged' => $paged
);
$context['posts'] = new Timber\PostQuery($postArgs);
$data['post'] = $post;

$args = array(
	'posts_per_page' => 1,
	'post__in'  => get_option( 'sticky_posts' ),
	'ignore_sticky_posts' => 1
);

$context['sticky_post'] = new WP_Query( $args );

$templates = array( 'index.twig' );
if ( is_home() ) {
	array_unshift( $templates, 'front-page.twig', 'home.twig' );
}
Timber::render( $templates, $context );
