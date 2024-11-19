import './editor.scss';
import { __ } from '@wordpress/i18n';
import { TabPanel, PanelBody, ToggleControl, ToolbarGroup } from '@wordpress/components';
import { InspectorControls, useBlockProps, RichText, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { heading as headingIcon, postContent, settings, square } from '@wordpress/icons';
import WCANColorPicker from '../../components/WCANColorPicker';
import WCANDimensionControl from '../../components/WCANDimensionControl';
import WCANFontSizePicker from '../../components/WCANFontSizePicker';

const Edit = ({ attributes, setAttributes }) => {
	const blockProps = useBlockProps();
	const { heading, hideHeading, contentAlignment, content, hideContent, headingFontSize, headingColor, contentColor, contentFontSize, backgroundColor, borderColor, containerPadding, borderSize, borderRadius } = attributes;

	const onSelect = ( tabName ) => {
    	console.log( 'Selecting tab', tabName );
	};
	
	// Apply the background color as inline styles to the container
	const containerStyle = {
		backgroundColor: backgroundColor || 'transparent',
		borderColor: borderColor || 'transparent',
		paddingTop: containerPadding.top,
		paddingBottom: containerPadding.bottom,
		paddingLeft: containerPadding.left,
		paddingRight: containerPadding.right,
		borderTop: `${borderSize.top || 0} solid ${borderColor || 'transparent'}`,
		borderBottom: `${borderSize.bottom || 0} solid ${borderColor || 'transparent'}`,
		borderLeft: `${borderSize.left || 0} solid ${borderColor || 'transparent'}`,
		borderRight: `${borderSize.right || 0} solid ${borderColor || 'transparent'}`,
		borderTopLeftRadius: borderRadius.top,
		borderTopRightRadius: borderRadius.right,
		borderBottomLeftRadius: borderRadius.left,
		borderBottomRightRadius: borderRadius.bottom,
	};

	return (
		<div {...useBlockProps()}>
			<BlockControls>
                <ToolbarGroup>
                    <AlignmentToolbar
                        value={ contentAlignment }
						onChange={(newAlignment) => {
							{ setAttributes({contentAlignment: newAlignment}) }
						}}
					/>
                </ToolbarGroup>
            </BlockControls>
			<InspectorControls>
				<TabPanel
					className="my-tab-panel"
					activeClass="active-tab"
					onSelect={onSelect}
					tabs={[
						{
							name: 'general',
							title: 'General',
							className: 'wcan-inspector-tab-general',
						},
						{
							name: 'styles',
							title: 'Styles',
							className: 'wcan-inspector-tab-styles',
						},
					]}
				>
					{(tab) => {
						if (tab.name === 'general') {
							return (
								<>
									<PanelBody title="Settings" icon={settings} initialOpen={true}>
										<ToggleControl
											__nextHasNoMarginBottom
											label="Hide Header"
											help={
												hideHeading
													? 'Heading text is hidden.'
													: 'Heading text is being shown.'
											}
											checked={ hideHeading }
											onChange={(newHeadingStatus) => {
												setAttributes({ hideHeading: newHeadingStatus });
											} }
										/>

										<ToggleControl
											__nextHasNoMarginBottom
											label="Hide Notice Content"
											help={
												hideContent
													? 'Content text is hidden.'
													: 'Content text is being shown.'
											}
											checked={ hideContent }
											onChange={(newContentStatus) => {
												setAttributes({ hideContent: newContentStatus });
											} }
										/>
									</PanelBody>
								</>
							);
						}
						if (tab.name === 'styles') {
							return (
								<>
									<PanelBody title="Area" icon={square} initialOpen={true}>
										<WCANColorPicker
											label={__('Background Color', 'wcan-anywhere-notice')}
											value={backgroundColor}
											onChange={(newColor) => setAttributes({ backgroundColor: newColor })}
										/>
										<WCANColorPicker
											label={__('Border Color', 'wcan-anywhere-notice')}
											value={borderColor}
											onChange={(newColor) => setAttributes({ borderColor: newColor })}
										/>
										<WCANDimensionControl
											label={__('Padding', 'wcan-anywhere-notice')}
											value={containerPadding}
											onChange={(newPadding) => setAttributes({ containerPadding: newPadding })}
										/>
										<WCANDimensionControl
											label={__('Border Size', 'wcan-anywhere-notice')}
											value={borderSize}
											onChange={(newBorderSize) => {
												console.log(newBorderSize);
												setAttributes({ borderSize: newBorderSize })
											}}	
										/>

										<WCANDimensionControl
											label={__('Border Radius', 'wcan-anywhere-notice')}
											value={borderRadius}
											onChange={(newBorderRadius) => {
												setAttributes({ borderRadius: newBorderRadius })
											}}	
										/>
									</PanelBody>
									
									<PanelBody title="Heading" icon={headingIcon} initialOpen={true}>
										<WCANColorPicker
											label={__('Heading Text Color', 'wcan-anywhere-notice')}
											value={headingColor}
											onChange={(newHeadingColor) => setAttributes({ headingColor: newHeadingColor })}
										/>
										<WCANFontSizePicker
											fallbackFontSize={16}
											value={headingFontSize}
											onChange={(newHeadingFontSize) => {
												setAttributes({ headingFontSize: newHeadingFontSize })
											}}
										/>
										
									</PanelBody>

									<PanelBody title="Content" icon={postContent} initialOpen={false}>
										<WCANColorPicker
											label={__('Content Text Color', 'wcan-anywhere-notice')}
											value={contentColor}
											onChange={(newContentColor) => setAttributes({ contentColor: newContentColor })}
										/>
										<WCANFontSizePicker
											fallbackFontSize={12}
											value={contentFontSize}
											onChange={(newContentFontSize) => {
												setAttributes({ contentFontSize: newContentFontSize })
											}}
										/>
									</PanelBody>
								</>
							);
						}
						return null;
					}}
				</TabPanel>
			</InspectorControls>

			<div style={containerStyle}>
				{!hideHeading && (
					<RichText
						{...blockProps}
						tagName="h3"
						className='wcan-notice-heading-text'
						value={heading}
						onChange={(headingText) => setAttributes({ heading: headingText })}
						placeholder={heading.default}
						style={{marginTop:0, marginBottom:0, color: headingColor, fontSize:headingFontSize, textAlign: contentAlignment}}
					/>
				)}

				{!hideContent && (
					<RichText
						{...blockProps}
						tagName="p"
						className='wcan-notice-content-text'
						value={content}
						onChange={(contentText) => setAttributes({ content: contentText })}
						placeholder={content.default}
						style={{marginBottom:0, color: contentColor, fontSize: contentFontSize, textAlign: contentAlignment}}
					/>
				)}
			</div>
		</div>
	);
};

export default Edit;
