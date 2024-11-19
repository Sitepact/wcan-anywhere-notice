import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		heading = '', // Fallback to empty string if undefined
		hideHeading,
		content = '', // Fallback to empty string if undefined
		hideContent,
		contentAlignment,
		headingColor,
		headingFontSize,
		contentColor,
		contentFontSize,
		backgroundColor = 'transparent', // Default transparent
		borderColor = 'transparent', // Default transparent
		containerPadding = {}, // Default to empty object
		borderSize = {}, // Default to empty object
		borderRadius = {}, // Default to empty object
	} = attributes;

	// Generate inline styles with fallbacks
	const blockProps = useBlockProps.save({
		style: {
			backgroundColor,
			borderColor,
			paddingTop: containerPadding.top || 0,
			paddingBottom: containerPadding.bottom || 0,
			paddingLeft: containerPadding.left || 0,
			paddingRight: containerPadding.right || 0,

			borderTop: `${borderSize.top || 0} solid ${borderColor}`,
			borderBottom: `${borderSize.bottom || 0} solid ${borderColor}`,
			borderLeft: `${borderSize.left || 0} solid ${borderColor}`,
			borderRight: `${borderSize.right || 0} solid ${borderColor}`,

			borderTopLeftRadius: borderRadius.top || 0,
			borderTopRightRadius: borderRadius.right || 0,
			borderBottomLeftRadius: borderRadius.left || 0,
			borderBottomRightRadius: borderRadius.bottom || 0,
		},
	});

	return (
		<div {...blockProps}>
			{heading && !hideHeading && (
				<RichText.Content
					tagName="h3"
					value={heading}
					style={{
						color: headingColor || 'inherit',
						marginTop: 0,
						marginBottom: 0,
						fontSize: headingFontSize ? `${headingFontSize}` : 'inherit',
						textAlign: contentAlignment,
					}}
					className="wcan-notice-heading-text"
				/>
			)}

			{content && !hideContent && (
				<RichText.Content
					tagName="p"
					value={content}
					style={{
						marginBottom: 0,
						color: contentColor || 'inherit',
						fontSize: contentFontSize ? `${contentFontSize}` : 'inherit',
						textAlign: contentAlignment,
					}}
					className="wcan-notice-content-text"
				/>
			)}
		</div>
	);
}
