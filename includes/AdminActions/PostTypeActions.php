<?php

namespace WCAN\AdminActions;

class PostTypeActions {

    public function __construct() {
        add_action('init', [$this, 'register_post_type']);
        add_action('init', [$this, 'wcan_init_custom_meta']);
        add_action('admin_menu', [$this, 'add_to_woocommerce_menu']);
        add_action('rest_after_insert_wc_anywhere_notice', [$this, 'wcan_save_display_rules'], 10, 3);
        add_action('before_delete_post', [$this, 'wcan_delete_display_rules']);
        //add_action('save_post_wc_anywhere_notice', [$this, 'wcan_save_display_rules'], 10, 3);
    }

    // Register custom post type
    public function register_post_type() {
        $labels = [
            'name'               => __('WC Anywhere Notices', 'wcan-anywhere-notice'),
            'singular_name'      => __('WC Anywhere Notice', 'wcan-anywhere-notice'),
            'menu_name'          => __('WC Anywhere Notices', 'wcan-anywhere-notice'),
            'add_new'            => __('Add New Notice', 'wcan-anywhere-notice'),
            'add_new_item'       => __('Add New WC Anywhere Notice', 'wcan-anywhere-notice'),
            'edit_item'          => __('Edit WC Anywhere Notice', 'wcan-anywhere-notice'),
            'new_item'           => __('New WC Anywhere Notice', 'wcan-anywhere-notice'),
            'view_item'          => __('View WC Anywhere Notice', 'wcan-anywhere-notice'),
            'all_items'          => __('All WC Anywhere Notices', 'wcan-anywhere-notice'),
            'search_items'       => __('Search WC Anywhere Notices', 'wcan-anywhere-notice'),
            'not_found'          => __('No notices found.', 'wcan-anywhere-notice'),
        ];

        $args = [
            'labels'             => $labels,
            'public'             => false,
            'show_ui'            => true,
            'show_in_menu'       => false, // We'll add it to WooCommerce menu separately
            'supports'           => ['title', 'editor', 'custom-fields'],
            'show_in_rest'       => true, // Gutenberg support
            'menu_icon'          => 'dashicons-megaphone',
            'hierarchical'       => false,
            'has_archive'        => false,
            'exclude_from_search'   => true,
        ];

        register_post_type('wc_anywhere_notice', $args);
    }

    // Add to WooCommerce menu
    public function add_to_woocommerce_menu() {
        add_submenu_page(
            'woocommerce',
            __('WC Anywhere Notices', 'wcan-anywhere-notice'),
            __('WC Anywhere Notices', 'wcan-anywhere-notice'),
            'manage_options',
            'edit.php?post_type=wc_anywhere_notice'
        );
    }


    public function wcan_init_custom_meta() {
        register_post_meta('wc_anywhere_notice', '_wcan_notice_rules', [
            'single'       => true,
            'type'         => 'array',
            'show_in_rest' => true,
            'type'         => "string",
            'auth_callback' => function() {
                // Allow authenticated users to edit the custom field
                return current_user_can( 'edit_posts' );
            },
        ]);
    }


    /*public function wcan_save_display_rules($post_id, $post, $update) {
        error_log(print_r($update));
        error_log("Rex is rex");
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
        if (wp_is_post_autosave($post_id) || wp_is_post_revision($post_id)) return;

        $rules = get_post_meta($post_id, '_wcan_notice_rules', true);
        if (!$rules || empty($rules)) return;

        $rules = json_decode($rules , true);

        global $wpdb;
        $table_name = $wpdb->prefix . 'wcan_display_rules';

        // Delete old rules for this post
        $wpdb->delete($table_name, ['post_id' => $post_id], ['%d']);

        // Insert each rule
        foreach ($rules as $rule) {
            $wpdb->insert($table_name, [
                'post_id' => $post_id,
                'type'    => sanitize_text_field($rule['displayType']),
                'type_id' => sanitize_text_field($rule['displayOn']),
                'hook'    => sanitize_text_field($rule['selectedHook']),
            ], ['%d', '%s', '%s', '%s']);
        }
    }*/

    public function wcan_save_display_rules($post, $request, $creating) {
        $post_id = $post->ID;

        // Fetch the rules meta
        $rules = get_post_meta($post_id, '_wcan_notice_rules', true);
        if (!$rules || empty($rules)) return;

        $rules = json_decode($rules, true);

        global $wpdb;
        $table_name = $wpdb->prefix . 'wcan_display_rules';

        // Delete old rules for this post
        $wpdb->query(
            $wpdb->prepare(
                "DELETE FROM %i WHERE post_id = %d",
                $table_name,
                $post_id
            )
        );

        // Insert each rule
        foreach ($rules as $rule) {
            $wpdb->query(
                $wpdb->prepare(
                    "INSERT INTO %i (post_id, type, type_id, hook) VALUES (%d, %s, %s, %s)",
                    $table_name,
                    $post_id,
                    sanitize_text_field($rule['displayType']),
                    sanitize_text_field($rule['displayOn']),
                    sanitize_text_field($rule['selectedHook'])
                )
            );
        }
    }

    /**
     * Delete display rules when a post is permanently deleted.
     *
     * @param int $post_id
     */
    public function wcan_delete_display_rules($post_id) {
        $post_type = get_post_type($post_id);
        if ($post_type !== 'wc_anywhere_notice') {
            return;
        }

        global $wpdb;
        $table_name = $wpdb->prefix . 'wcan_display_rules';

        $wpdb->query(
            $wpdb->prepare(
                "DELETE FROM %i WHERE post_id = %d",
                $table_name,
                $post_id
            )
        );
    }
}

