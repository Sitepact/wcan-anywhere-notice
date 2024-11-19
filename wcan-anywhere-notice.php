<?php
/**
 * Plugin Name:       WC Anywhere Notice
 * Description:       A plugin to add customizable notifications, media and other content anywhere in WooCommerce using hooks.
 * Requires at least: 6.2
 * Requires PHP:      8.0
 * Version:           1.0.0
 * Author:            Sitepact
 * Author URI:        https://sitepact.com
 * Plugin URI:        https://sitepact.com/wc-anywhere-notice/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wcan-anywhere-notice
 * Requires Plugins:  woocommerce
 */


 if (!defined('ABSPATH')) {
   exit;
 }


define('WCAN_NOTICE_VERSION', '0.1.0');
define('WCAN_NOTICE_URL', plugin_dir_url(__FILE__));
define('WCAN_NOTICE_INC_URL', WCAN_NOTICE_URL . 'includes/');
define('WCAN_NOTICE_PATH', plugin_dir_path(__FILE__));
define('WCAN_NOTICE_INC_PATH', WCAN_NOTICE_PATH . 'includes/');



 /**
	* Loads PSR-4-style plugin classes.
	*/

spl_autoload_register(function ($class) {
    $prefix = 'WCAN\\';
    $base_dir = __DIR__ . '/includes/';

    if (strpos($class, $prefix) !== 0) {
        return; // Not a class belonging to this plugin.
    }

    $relative_class = substr($class, strlen($prefix));
    $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';
    if (file_exists($file)) {
        require $file;
    }
	
});


$initializeActions = new \WCAN\AdminActions\InitializeActions();
new WCAN\AdminActions\SetupBlocks;
new WCAN\AdminActions\PostTypeActions;
new WCAN\PublicActions\DeployNotices;


register_activation_hook(__FILE__, [$initializeActions, 'create_display_rules_db_table']);