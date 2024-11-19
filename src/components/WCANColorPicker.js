import { __ } from '@wordpress/i18n';
import { Button, Dropdown, ColorPicker } from '@wordpress/components';

const WCANColorPicker = ({ label, value, onChange }) => {

    return (
        <div className="wcan-notice-control wcan-notice-field-section">
            <div className="wcan-notice-field-label">
                <label>{label}</label>
            </div>
            <div className="wcan-notice-field-wrap with-reset">
                <Dropdown
                    className="wcan-color-components-dropdown"
                    contentClassName="wcan-color-picker-dropdown"
                    renderToggle={({ isOpen, onToggle }) => (
                        <Button
                            className="wcan-notice-color-palette-button"
                            onClick={onToggle}
                            aria-expanded={isOpen}
                            aria-haspopup="true"
                            aria-label={__('Custom color picker', 'wcan-anywhere-notice')}
                            style={{ backgroundColor: value || 'transparent' }}
                        />
                    )}
                    renderContent={() => (
                        <ColorPicker
                            color={value}
                            onChange={(newHeadingColor) => onChange(newHeadingColor)}
                            enableAlpha
                            defaultValue="#000"
                        />
                    )}
                />
                <div className="wcan-notice-reset-wrapper">
                    <Button
                        type="button"
                        className="wcan-notice-reset-button"
                        onClick={() => onChange('')}
                    >
                        {__('Clear')}
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default WCANColorPicker;
