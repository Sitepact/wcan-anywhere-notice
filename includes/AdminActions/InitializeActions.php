<?php

namespace WCAN\AdminActions;

class InitializeActions {
    public function __construct() {
        add_action( 'init', array( $this, 'load_textdomain' ));
        add_filter( 'render_block', array( $this,'wcan_woocommerce_cart_block_do_actions'), 9999, 2 );
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

    public function wcan_woocommerce_cart_block_do_actions( $block_content, $block ) {
        $blocks = array(
            'woocommerce/cart',
            'woocommerce/filled-cart-block',
            'woocommerce/cart-items-block',
            'woocommerce/cart-line-items-block',
            'woocommerce/cart-cross-sells-block',
            'woocommerce/cart-cross-sells-products-block',
            'woocommerce/cart-totals-block',
            'woocommerce/cart-order-summary-block',
            'woocommerce/cart-order-summary-heading-block',
            'woocommerce/cart-order-summary-coupon-form-block',
            'woocommerce/cart-order-summary-subtotal-block',
            'woocommerce/cart-order-summary-fee-block',
            'woocommerce/cart-order-summary-discount-block',
            'woocommerce/cart-order-summary-shipping-block',
            'woocommerce/cart-order-summary-taxes-block',
            'woocommerce/cart-express-payment-block',
            'woocommerce/proceed-to-checkout-block',
            'woocommerce/cart-accepted-payment-methods-block',
        );
        if ( in_array( $block['blockName'], $blocks ) ) {
            ob_start();
            do_action( 'wcan_before_' . $block['blockName'] );
            echo $block_content;
            do_action( 'wcan_after_' . $block['blockName'] );
            $block_content = ob_get_contents();
            ob_end_clean();
        }
        return $block_content;
    }

}