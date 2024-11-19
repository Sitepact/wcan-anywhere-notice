import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
    TextControl,
    ButtonGroup,
    Button,
    Flex,
    FlexItem,
} from '@wordpress/components';

const WCANDimensionControl = ({ label, value = {}, onChange }) => {
    const [isLinked, setIsLinked] = useState(true); // Linked or unlinked values
    const units = ['px', '%', 'em', 'vw']; // Available units
    const [unit, setUnit] = useState('px'); // Default unit

    // Ensure value is an object with top, right, bottom, and left properties
    const initialValue = {
        top: value?.top,
        right: value?.right,
        bottom: value?.bottom,
        left: value?.left,
    };

    const handleIndividualChange = (side, newValue) => {
        const newValues = { ...value, [side]: `${newValue || 0}${unit}` };
        onChange(newValues);
    };

    const handleLinkedChange = (newValue) => {
        const newValues = {
            top: `${newValue || 0}${unit}`,
            right: `${newValue || 0}${unit}`,
            bottom: `${newValue || 0}${unit}`,
            left: `${newValue || 0}${unit}`,
        };
        onChange(newValues);
    };

    const handleUnitChange = (newUnit) => {
        setUnit(newUnit);
    };

    return (
            <div className="wcan-dimension-control">
                <div className="wcan-components-panel__row wcan-panel-row-height-auto">
                    <label className="wcan-control-title">{label}</label>
                    <ButtonGroup className="wcan-units-choices">
                        {units.map((u) => (
                            <Button
                                key={u}
                                size="small"
                                //isPrimary={u === unit}
                                isPressed={u === unit}
                                onClick={() => handleUnitChange(u)}
                            >
                                {u.toUpperCase()}
                            </Button>
                        ))}
                    </ButtonGroup>
                </div>
                <div className="wcan-components-panel__row wcan-dimension-flex-wrapper">
                    <Flex align="center" justify="start" gap={1}>
                        <FlexItem>
                            <TextControl
                                label={__('Top', 'wcan-anywhere-notice')}
                            value={parseInt(value.top, 10) || initialValue.top}
                            type='number'
                            className='wcan-number-dimension-input'
                                onChange={(newValue) =>
                                    isLinked
                                        ? handleLinkedChange(newValue)
                                        : handleIndividualChange('top', newValue)
                                }
                            />
                        </FlexItem>
                        <FlexItem>
                            <TextControl
                            label={__('Right', 'wcan-anywhere-notice')}
                            type='number'
                            className='wcan-number-dimension-input'
                                value={parseInt(value.right, 10) || initialValue.right}
                                onChange={(newValue) =>
                                    isLinked
                                        ? handleLinkedChange(newValue)
                                        : handleIndividualChange('right', newValue)
                                }
                            />
                        </FlexItem>
                        <FlexItem>
                            <TextControl
                            label={__('Bottom', 'wcan-anywhere-notice')}
                            type='number'
                            className='wcan-number-dimension-input'
                                value={parseInt(value.bottom, 10) || initialValue.bottom}
                                onChange={(newValue) =>
                                    isLinked
                                        ? handleLinkedChange(newValue)
                                        : handleIndividualChange('bottom', newValue)
                                }
                            />
                        </FlexItem>
                        <FlexItem>
                            <TextControl
                            label={__('Left', 'wcan-anywhere-notice')}
                            type='number'
                            className='wcan-number-dimension-input'
                                value={parseInt(value.left, 10) || initialValue.left}
                                onChange={(newValue) =>
                                    isLinked
                                        ? handleLinkedChange(newValue)
                                        : handleIndividualChange('left', newValue)
                                }
                            />
                        </FlexItem>
                        <FlexItem>
                            <Button
                                icon={
                                    isLinked ? 'admin-links' : 'editor-unlink'
                                }
                                onClick={() => setIsLinked(!isLinked)}
                                //variant="tertiary"
                            title={isLinked ? __('Unlink Values', 'wcan-anywhere-notice') : __('Link Values', 'wcan-anywhere-notice')}
                            className='wcan-dimension-icon-button'
                            />
                        </FlexItem>
                    </Flex>
                </div>
            </div>
    );
};

export default WCANDimensionControl;
