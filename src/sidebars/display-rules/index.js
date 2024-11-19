const { registerPlugin } = wp.plugins;
import WCANSidebar from "./sidebar";

registerPlugin('wcan-anywhere-notice-sidebar', { render: WCANSidebar });