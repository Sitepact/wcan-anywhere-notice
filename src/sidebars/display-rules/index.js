const { registerPlugin } = wp.plugins;
import WCANSidebar from "./sidebar";
import './editor.scss';

registerPlugin('wcan-anywhere-notice-sidebar', { render: WCANSidebar });