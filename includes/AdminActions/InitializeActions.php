<?php

namespace WCAN\AdminActions;

class InitializeActions {
    public function __construct() {
        add_action( 'init', array( $this, 'load_textdomain' ));
    }

    public function load_textdomain(){
		load_plugin_textdomain("wcan-anywhere-notice", false, dirname( plugin_basename( __FILE__ ) ) . '/languages');
	}

    public function create_display_rules_db_table() {
        global $wpdb;
        $table_name = $wpdb->prefix . 'wcan_display_rules';
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            post_id bigint(20) NOT NULL,
            type varchar(20) NOT NULL,
            type_id varchar(20) NOT NULL,
            hook varchar(100) NOT NULL,
            PRIMARY KEY  (id)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }

}