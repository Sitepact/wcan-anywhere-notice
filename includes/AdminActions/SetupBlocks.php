<?php

namespace WCAN\AdminActions;

class SetupBlocks {

	/**
	 * @var string
	 */
	private static string $baseUrl;

	public function __construct() {
		// block initialization
		add_action('init',  [$this, 'gutenbergBlocksInit']);
		add_action('init',  [$this, 'enqueueEditorAssets']);
		add_filter('block_categories_all', [$this, 'gutenbergBlocksRegisterCategory'], 10, 2);
	}



	public static function getBlocksName(): array {
		return [
			'simple-notice'
		];
	}

	public function gutenbergBlocksInit() {
		foreach (self::getBlocksName() as $block_name) {
			//register_block_type(self::getBasePath() . '/build/blocks/' . $block_name);
			register_block_type(WCAN_NOTICE_PATH . '/build/blocks/' . $block_name);
		}
	}

	public function enqueueEditorAssets(){
		wp_enqueue_script(
			'wcan-blocks',
			//plugins_url('build/blocks/simple-notice/index.js', __DIR__),
			WCAN_NOTICE_URL . 'build/blocks/simple-notice/index.js',
			['wp-edit-post', 'wp-element', 'wp-components', 'wp-data', 'wp-plugins', 'wp-i18n'],
			filemtime(WCAN_NOTICE_PATH . 'build/blocks/simple-notice/index.js'),
			true
		);

		wp_enqueue_script(
			'wcan-notice-sidebar',
			//plugins_url('build/sidebars/display-rules/index.js', __DIR__),
			WCAN_NOTICE_URL . 'build/sidebars/display-rules/index.js',
			['wp-edit-post', 'wp-element', 'wp-components', 'wp-data', 'wp-plugins', 'wp-i18n'],
			filemtime(WCAN_NOTICE_PATH . 'build/sidebars/display-rules/index.js'),
			true
		);

		
		$json_file = WCAN_NOTICE_PATH . 'includes/assets/wooCommercePages.json';
		//File is local so there is no need to use wp_remote_get()
		$woo_commerce_pages = file_exists($json_file) ? json_decode(file_get_contents($json_file), true) : [];

		//templates
		$json_file_template = WCAN_NOTICE_PATH . 'includes/assets/wooCommerceTemplates.json';
		//File is local so there is no need to use wp_remote_get()
		$woo_commerce_templates = file_exists($json_file_template) ? json_decode(file_get_contents($json_file_template), true) : [];


		wp_localize_script('wcan-notice-sidebar', 'wcanData', [
			'wooCommercePages' => $woo_commerce_pages,
			'wooCommerceTemplates' => $woo_commerce_templates
		]);
	}

	public function gutenbergBlocksRegisterCategory($categories, $post) {
		return [
			[
				'slug'  => 'wcan-anywhere-notice-blocks',
				'title' => __('WooCommerce Anywhere Notices', 'wcan-anywhere-notice'),
			],
			...$categories,
		];
	}


	/**
	 * The base URL path to this plugin's folder.
	 *
	 * Uses plugins_url() instead of plugin_dir_url() to avoid a trailing slash.
	 */
	public static function getBaseUrl(): string {
		if (!isset(static::$baseUrl)) {
			static::$baseUrl = plugins_url('', static::getBasePath() . '/wcan-anywhere-notice.php');
		}
		return static::$baseUrl;
	}

	/**
	 * The absolute filesystem base path of this plugin.
	 *
	 * @return string
	 */
	public static function getBasePath(): string {
		return dirname(__DIR__);
	}
}