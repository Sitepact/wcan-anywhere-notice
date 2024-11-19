<?php

namespace WCAN\PublicActions;

class DeployNotices {
    
    public function __construct() {
        add_action('init', [$this, 'load_notices']);
    }

    /**
     * Load notices and hook them to appropriate actions.
     */
    public function load_notices() {
        $notices = $this->get_notices_from_db();

        foreach ($notices as $notice) {
            add_action($notice->hook, function () use ($notice) {
                echo wp_kses_post( $this->render_notice( $notice->post_id ) );
            });
        }
    }

    /**
     * Get all notices from the database.
     *
     * @return array
     */

    private function get_notices_from_db() {
        global $wpdb;

        // Use $wpdb->prepare with %i for the table name
        $table_name = $wpdb->prefix . 'wcan_display_rules';

        $query = $wpdb->prepare("SELECT * FROM %i", $table_name);
        return $wpdb->get_results($query);
    }

    /**
     * Render the notice content.
     *
     * @param int $post_id
     * @return string
     */
    private function render_notice($post_id) {
        $post = get_post($post_id);

        if (!$post || $post->post_status !== 'publish') {
            return ''; // Skip if the post is not valid or published.
        }

        // Apply filters like shortcodes if needed.
        return apply_filters('the_content', $post->post_content);
    }
}
