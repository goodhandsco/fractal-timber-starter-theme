<?php
/**
 * Timber starter-theme
 * https://github.com/timber/starter-theme
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

if ( ! class_exists( 'Timber' ) ) {
	add_action( 'admin_notices', function() {
		echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
	});

	add_filter('template_include', function( $template ) {
		return get_stylesheet_directory() . '/static/no-timber.html';
	});

	return;
}

/**
 * Sets the directories (inside your theme) to find .twig files
 */

Timber::$dirname = array( 
	'templates', 
	'components',
);

/**
 * By default, Timber does NOT autoescape values. Want to enable Twig's autoescape?
 * No prob! Just set this value to true
 */
Timber::$autoescape = false;


/**
 * We're going to configure our theme inside of a subclass of Timber\Site
 * You can move this to its own file and include here via php's include("MySite.php")
 */
class StarterSite extends Timber\Site {
	/** Add timber support. */
	public function __construct() {
		add_action( 'after_setup_theme', array( $this, 'theme_supports' ) );
		add_filter( 'timber_context', array( $this, 'add_to_context' ) );
		add_filter( 'get_twig', array( $this, 'add_to_twig' ) );
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		parent::__construct();
	}
	/** This is where you can register custom post types. */
	public function register_post_types() {

	}
	/** This is where you can register custom taxonomies. */
	public function register_taxonomies() {

	}

	/** This is where you add some context
	 *
	 * @param string $context context['this'] Being the Twig's {{ this }}.
	 */
	public function add_to_context( $context ) {
		$context['menu'] = new \Timber\Menu( 'Primary Menu' );
		$context['site'] = $this;
        $context['option'] = get_fields('option');
		return $context;
	}

	public function theme_supports() {
		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5', array(
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
			)
		);

		/*
		 * Enable support for Post Formats.
		 *
		 * See: https://codex.wordpress.org/Post_Formats
		 */
		add_theme_support(
			'post-formats', array(
				'aside',
				'image',
				'video',
				'quote',
				'link',
				'gallery',
				'audio',
			)
		);

		add_theme_support( 'menus' );

	}

	/** This is where you can add your own functions to twig.
	 *
	 * @param string $twig get extension.
	 */
	public function add_to_twig( $twig ) {
		$twig->addExtension( new Twig_Extension_StringLoader() );
		$twig->addFilter( new Twig_SimpleFilter( 'myfoo', array( $this, 'myfoo' ) ) );
		return $twig;
	}

}

new StarterSite();

/**
 * Enqueue scripts and styles.
 */
function engine_commerce_scripts() {
	wp_enqueue_script( 'jquery' );

    wp_enqueue_style( 'gh-starter-theme-style', get_template_directory_uri() . '/public/styles/main.css', false, filemtime(get_stylesheet_directory() . '/public/styles/main.css'));

	wp_register_script('sticky-kit-js', get_template_directory_uri() . '/public/scripts/jquery.sticky-kit.min.js', false, filemtime( get_stylesheet_directory().'/public/scripts/jquery.sticky-kit.min.js' ), true);
	wp_enqueue_script('sticky-kit-js');

	wp_register_script('flickity-js', get_template_directory_uri() . '/public/scripts/flickity.pkgd.min.js', false, filemtime( get_stylesheet_directory().'/public/scripts/flickity.pkgd.min.js' ), true);
	wp_enqueue_script('flickity-js');

    wp_register_script('aos-js', get_template_directory_uri() . '/public/scripts/aos.js', false, filemtime( get_stylesheet_directory().'/public/scripts/aos.js' ), true);
    wp_enqueue_script('aos-js');

	wp_register_script('global-js', get_template_directory_uri() . '/public/scripts/main.js', false, filemtime( get_stylesheet_directory().'/public/scripts/main.js' ), true);
	wp_enqueue_script('global-js');
}
add_action( 'wp_enqueue_scripts', 'engine_commerce_scripts' );

function myguten_enqueue() {
    wp_enqueue_script( 'sticky-kit-js', get_template_directory_uri() . '/public/scripts/jquery.sticky-kit.min.js', false, filemtime( get_stylesheet_directory().'/public/scripts/jquery.sticky-kit.min.js' ), true );
    wp_enqueue_script( 'flickity-js', get_template_directory_uri() . '/public/scripts/flickity.pkgd.min.js', false, filemtime( get_stylesheet_directory().'/public/scripts/flickity.pkgd.min.js' ), true );
    wp_enqueue_script( 'aos-js', get_template_directory_uri() . '/public/scripts/aos.js', false, filemtime( get_stylesheet_directory().'/public/scripts/aos.js' ), true );
    wp_enqueue_script( 'global-js', get_template_directory_uri() . '/public/scripts/main.js', false, filemtime( get_stylesheet_directory().'/public/scripts/main.js' ), true );
}
add_action( 'enqueue_block_editor_assets', 'myguten_enqueue' );

add_action( 'acf/init', 'my_acf_init' );
function my_acf_init() {
    // Check function exists.
    if( function_exists('acf_register_block') ) {
        
        
    }
}

/**
*  This is the callback that displays the block.
*
* @param   array $block The block settings and attributes.
* @param   string $content The block content (emtpy string).
* @param   bool $is_preview True during AJAX preview.
*/
function acf_block_render_callback( $block, $content = '', $is_preview = false ) {
    $context = Timber::get_context();
    
    // Store block values.
    $context['block'] = $block;

    // Store field values.
    $context['fields'] = get_fields(); 

    $slug = str_replace('acf/', '', $block['name']);

	Timber::render('components/' . $slug . '/' . $slug . '.twig', $context );
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 */
function editor_setup() {
    // Add support for editor styles.
    add_theme_support( 'editor-styles' );
  
    // Enqueue editor styles.
    add_editor_style( get_template_directory_uri() .'/public/styles/main.css' );

}
add_action( 'after_setup_theme', 'editor_setup' );

function mytheme_setup() {
  add_theme_support( 'align-wide' );
}
add_action( 'after_setup_theme', 'mytheme_setup' );

if( function_exists('acf_add_options_page') ) {
    
    acf_add_options_page(array(
        'page_title'    => 'Theme Settings',
        'menu_title'    => 'Theme Settings',
        'menu_slug'     => 'theme-settings',
        'capability'    => 'edit_posts',
        'redirect'      => true
    ));
    
    acf_add_options_sub_page(array(
        'page_title'    => 'Header',
        'menu_title'    => 'Header',
        'parent_slug'   => 'theme-settings',
    ));
    
    acf_add_options_sub_page(array(
        'page_title'    => 'Footer',
        'menu_title'    => 'Footer',
        'parent_slug'   => 'theme-settings',
    ));
}

/**
 * WordPress' missing is_blog_page() function.  Determines if the currently viewed page is
 * one of the blog pages, including the blog home page, archive, category/tag, author, or single
 * post pages.
 *
 * @return bool
 */
function is_blog_page()
{
    global $post;

    // Post type must be 'post'.
    $post_type = get_post_type($post);

    // Check all blog-related conditional tags, as well as the current post type, 
    // to determine if we're viewing a blog page.
    return ( $post_type === 'post' ) && ( is_home() || is_archive() || is_single() );
}
