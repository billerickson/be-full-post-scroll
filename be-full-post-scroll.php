<?php
/**
 * Plugin Name: BE Full Post Scroll
 * Plugin URI:  https://github.com/billerickson/be-full-post-scroll
 * GitHub URI: billerickson/be-full-post-scroll
 * Description: When viewing a single post, dynamically load the next post as the user scrolls
 * Author:      Bill Erickson
 * Version:     1.0.0
 *
 * BE Full Post Scroll is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * any later version.
 *
 * BE Full Post Scroll is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with EA Share Count. If not, see <http://www.gnu.org/licenses/>.
 *
 * @package    BE_Full_Post_Scroll
 * @author     Bill Erickson
 * @since      1.0.0
 * @license    GPL-2.0+
 * @copyright  Copyright (c) 2015
 */
 
// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Main class
 *
 * @since 1.0.0
 * @package BE_Full_Post_Scroll
 */
final class BE_Full_Post_Scroll {

	/**
	 * Instance of the class.
	 *
	 * @since 1.0.0
	 * @var object
	 */
	private static $instance;

	/** 
	 * Full Post Scroll Instance.
	 *
	 * @since 1.0.0
	 * @return EA_Share_Count
	 */
	public static function instance() {

		if ( ! isset( self::$instance ) && ! ( self::$instance instanceof BE_Full_Post_Scroll ) ) {
			
			self::$instance = new BE_Full_Post_Scroll;
			self::$instance->constants();
			self::$instance->includes();

			add_action( 'init', array( self::$instance, 'init' ) );
		}
		return self::$instance;
	}

	/**
	 * Define some constants.
	 *
	 * @since 1.3.0
	 */
	public function constants() {

		// Directory path
		define( 'BE_FULL_POST_SCROLL_DIR', plugin_dir_path( __FILE__ ) );

		// Directory URL
		define( 'BE_FULL_POST_SCROLL_URL', plugin_dir_url( __FILE__ ) );

		// Base name
		define( 'BE_FULL_POST_SCROLL_BASE', plugin_basename( __FILE__ ) );
		
		// Plugin root file
		define( 'BE_FULL_POST_SCROLL_FILE', __FILE__ );
	}

	/**
	 * Load includes.
	 *
	 * @since 1.3.0
	 */
	public function includes() {

		require_once BE_FULL_POST_SCROLL_DIR . 'includes/class-install.php';
		require_once BE_FULL_POST_SCROLL_DIR . 'includes/class-core.php';

	}

	/**
	 * Bootstap.
	 * 
	 * @since 1.3.0
	 */
	public function init() {

		$this->install = new BE_Full_Post_Scroll_Install;
		$this->core  = new BE_Full_Post_Scroll_Core;
	}

}

/**
 * The function provides access to the internal methods.
 *
 * Use this function like you would a global variable, except without needing
 * to declare the global.
 *
 * @since 1.0.0
 * @return object
 */
function be_full_post_scroll() {
	return BE_Full_Post_Scroll::instance();
}
be_full_post_scroll();