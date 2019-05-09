<?php
/**
 * The template for displaying Author Archive pages
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

global $wp_query;

$context          = Timber::get_context();
$context['posts'] = new Timber\PostQuery();
if ( isset( $wp_query->query_vars['author'] ) ) {
	$author            = new Timber\User( $wp_query->query_vars['author'] );
	$context['author'] = $author;
	$context['title']  = 'Author: ' . $author->name();
}

$args = array(
    'orderby'             => 'nicename',
    'order'               => 'ASC',
    'has_published_posts' => array( 'post' ),
    'blog_id'             => absint( get_current_blog_id() )
);

$context['blog_authors'] = get_users( $args );

Timber::render( array( 'author.twig', 'archive.twig' ), $context );
