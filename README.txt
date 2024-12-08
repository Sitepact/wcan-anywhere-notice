=== Anywhere Notice for WooCommerce ===
Contributors: sitepact, ryonwhyte
Tags: woocommerce, notices, hooks, notification
Requires at least: 6.2  
Tested up to: 6.7  
Requires PHP: 8.0 
Stable tag: 1.0.0  
License: GPLv2 or later  
License URI: https://www.gnu.org/licenses/gpl-2.0.html  

A powerful plugin for placing notices anywhere on your WooCommerce store using flexible display rules and hooks.

== Description ==

**Anywhere Notice for WooCommerce** empowers WooCommerce Store owners to create and manage custom notices that can be displayed anywhere in your store. Using WooCommerce's powerful hook system, this plugin allows you to target specific pages or templates and fine-tune where your notices appear. This is built into the powerful Gutenberg editor that make design options limitless.

== Basic usage: ==
1. After plugin is installed and activated go to **WooCommerce > Anywhere Notices**.
2. Click Add New WCAN Anywhere Notice. [Screenshot](https://sitepact.com/wp-content/uploads/2024/12/add-new-notice-v1.png)
3. You can opt to utilize the default notice block. [Screenshot](https://sitepact.com/wp-content/uploads/2024/12/notice-default-block-v1.png)
4. General Settings Allows you to hide header or content etc. [Screenshot](https://sitepact.com/wp-content/uploads/2024/12/wcan-general-settings-v1.png)
5. The style tab allows you to change all the styling on the plugin default block. [Screenshot](https://sitepact.com/wp-content/uploads/2024/12/wcan-style-tab-v1.png)
6. Finally add the display rule(s) and save. Thats it! Your notice will now be displayed on the frontend [Screenshot](https://sitepact.com/wp-content/uploads/2024/12/display-rules-v1.png)

== Advanced Usage: ==
1. Instead of using the default plugin block above you can design your own element from scratch in the gutenberg editor. [Screenshot](https://sitepact.com/wp-content/uploads/2024/11/gutenberg-anything.png)
2. Add display rules and save. Thats it.

== Key Features: ==
*Gutenberg Compatible:** Easily create/design and manage notices in the Gutenberg editor.
*Limitless Design Options:** Design notices any way you imagine using using all the features of the Gutenberg editor
*Flexible Display Rules:** Define where and how each notice should appear using WooCommerce-specific hooks.
*Intuitive Sidebar Settings:** Configure display rules directly within the WordPress block editor.
*Dynamic Styling Options:** Customize the look and feel of your notices, including text alignment, colors, borders, and padding.
*Support for Multiple Notices:** Add multiple rules to target different areas of your WooCommerce store.
*Database Integration:** Store and retrieve notice display rules efficiently with robust database handling.
*Safe and Optimized:** Follows best practices for security, including sanitization, escaping, and prepared statements.

== A Few Use Cases: ==
*Notices:** Add a notice anywhere on your WooCommerce store. These notices could be promotional information eg (20% off this product).
*Disclaimers:** Ensure customers seen product disclaimers in the right places.
*Terms and Conditions:** Add written consent information in any spot for maximum visibility. Eg. at checkout.
*Banner Displays:** In Gutenberg you can design banners or use images as your notification.

== Installation ==

= Manual =
1. Upload the plugin files to the `/wp-content/plugins` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. Navigate to **WooCommerce > Anywhere Notices** to start creating your custom notices.
4. Use the sidebar controls to configure display rules and style each notice.

= Within WordPress =
1. Go to **Plugins > Add New**.
2. Search "Anywhere Notice for WooCommerce".
3. Install and Activate
4. Go to **WooCommerce > Anywhere Notices** and create your first notice

== Frequently Asked Questions ==

= How do I create a new notice? =  
Navigate to **WooCommerce > Anywhere Notices** and click 'Add New WCAN Anywhere Notice'. From there, you can define your message and set display rules using the sidebar options.

= What are WooCommerce hooks? =  
Hooks are points in WooCommerce where you can add or modify functionality. This plugin uses hooks to determine where your notices should appear on the site giving you maximum flexibility

= Can I display multiple notices on the same page? =  
Yes! You can configure multiple notices with different rules, and they will be displayed based on their respective hook and visibility settings.

= How do I style my notices? = 
We have included design blocks that you can use and design finitely. Each notice includes options to customize text color, font size, background, padding, and more. These options are available under the 'Styles' tab in the block editor sidebar. However, you have limitless design options if you wish to make any custom design in the Gutenberg Editor


= Is this plugin compatible with custom WooCommerce templates? =  
Absolutely! The plugin dynamically reads available WooCommerce templates and allows you to target notices specifically for those templates.

= What happens if I delete a notice? =  
When a notice is permanently deleted, all its associated display rules are also removed from the database. Therefore the notice will no longer be shown on the frontend

== Changelog ==

= 1.0.0 =
* Initial release
* Custom post type for notices  
* Dynamic WooCommerce hook integration  
* Sidebar controls for managing notices  
* Flexible display and styling options  

== Upgrade Notice ==

= 1.0.0 =  
First stable release. Please report any issues to our support team.

== Screenshots ==

1. **Custom Post Type Management**
   Easily manage your custom notices from the WordPress dashboard.  

2. **Sidebar Controls**  
   Configure display rules and style options directly within the block editor.  

3. **Notice shown at checkout**  
   Custom notices displayed at checkout in varying locations.  

4. **Example in user account**
   Notice displayed on user account.
== Support ==

For support or further inquiries, please visit [Sitepact Support](https://sitecare.sitepact.com). 

== Source Code & Contribution ==
The source code of this plugin, including non-compressed versions of JavaScript and CSS files, is available publicly on GitHub for transparency and development collaboration:

[GitHub Repository for WCAN Anywhere Notice](https://github.com/Sitepact/wcan-anywhere-notice)

The repository includes all development files and tools used, such as build scripts for generating minified JavaScript and CSS. This plugin uses npm and webpack to compile and minify JavaScript and CSS files. To rebuild these assets, follow the steps below:

1. Clone the GitHub repository.
2. Run `npm install` to install dependencies.
3. Run `npm run build` to compile and generate production assets.


