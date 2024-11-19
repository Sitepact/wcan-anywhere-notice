import { FontSizePicker } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

// Default font size options
const defaultFontSizes = [
    {
        name: __( 'Small', 'your-text-domain' ),
        slug: 'small',
        size: 12,
    },
    {
        name: __( 'Medium', 'your-text-domain' ),
        slug: 'medium',
        size: 16,
    },
    {
        name: __( 'Large', 'your-text-domain' ),
        slug: 'large',
        size: 26,
    },
];

// Reusable FontSizePicker component
const WCANFontSizePicker = ({
    fallbackFontSize,
    value,
    onChange,
}) => {
    return (
        <FontSizePicker
            fontSizes={defaultFontSizes}
            value={value}
            fallbackFontSize={fallbackFontSize}
            onChange={onChange}
        />
    );
};

export default WCANFontSizePicker;
