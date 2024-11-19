const { PluginSidebarMoreMenuItem, PluginSidebar} = wp.editor;
const { PanelBody, SelectControl, Button } = wp.components;
const { useSelect, useDispatch } = wp.data;
const { useState, useEffect } = wp.element;

const WCANSidebar = () => {
    const postMeta = useSelect((select) => select('core/editor').getEditedPostAttribute('meta')) || {};
    const { editPost } = useDispatch('core/editor');

    const wooCommercePages = wcanData.wooCommercePages;
    const wooCommerceTemplates = wcanData.wooCommerceTemplates;

    const pageOptions = Object.entries(wooCommercePages).map(([key, value]) => ({
        label: value.label,
        value: key
    }));

    const pageTemplates = Object.entries(wooCommerceTemplates).map(([key, value]) => ({
        label: value.label,
        value: key
    }));

    // Ensure at least one default rule
    const defaultRule = {
        displayType: 'page',
        displayOn: pageOptions[0]?.value || '',
        selectedHook: wooCommercePages[pageOptions[0]?.value]?.hooks[0]?.value || '',
    };

    const [rules, setRules] = useState(() => {
        const existingRules = postMeta._wcan_notice_rules || [];
        return existingRules.length > 0 ? JSON.parse(existingRules) : [defaultRule]; // Ensure at least one rule
    });

    const addNewRule = () => {
        setRules((prevRules) => [
            ...prevRules,
            {
                displayType: 'page',
                displayOn: pageOptions[0]?.value || '',
                selectedHook: wooCommercePages[pageOptions[0]?.value]?.hooks[0]?.value || '',
            },
        ]);
    };

    const updateRule = (index, field, value) => {
        setRules((prevRules) => {
            const newRules = [...prevRules];
            newRules[index][field] = value;

            // Reset `displayOn` and `selectedHook` when `displayType` changes
            if (field === 'displayType') {
                if (value === 'page') {
                    newRules[index].displayOn = pageOptions[0]?.value || '';
                    newRules[index].selectedHook = wooCommercePages[pageOptions[0]?.value]?.hooks[0]?.value || '';
                } else if (value === 'template') {
                    newRules[index].displayOn = pageTemplates[0]?.value || '';
                    newRules[index].selectedHook = wooCommerceTemplates[pageTemplates[0]?.value]?.hooks[0]?.value || '';
                }
            }

            // Update `selectedHook` when `displayOn` changes
            if (field === 'displayOn') {
                const hooks =
                    newRules[index].displayType === 'page'
                        ? wooCommercePages[value]?.hooks
                        : wooCommerceTemplates[value]?.hooks;

                newRules[index].selectedHook = hooks?.[0]?.value || '';
            }

            return newRules;
        });
    };


    const removeRule = (index) => {
        setRules((prevRules) => prevRules.filter((_, i) => i !== index));
    };

    useEffect(() => {
        editPost({ meta: { _wcan_notice_rules: JSON.stringify(rules) } });
    }, [rules, editPost]);

    return (
        <>
            <PluginSidebarMoreMenuItem target="wcan-sidebar">
                WCAN Display Rules
            </PluginSidebarMoreMenuItem>
            <PluginSidebar
                name="wcan-sidebar"
                title="WC Anywhere Notice Settings"
                icon="flag"
            >
                <PanelBody title="Display Rules" initialOpen={true}>
                    {rules.map((rule, index) => (
                        <div key={index}>
                            {index > 0 && (
                                <>
                                <hr />
                                <Button className="wcan-remove-rule-btn" variant="link" isLink={false} 
                                style={{
                                    border: 'solid 2px red',
                                    padding: '2px 6px',
                                    textDecoration: 'none',
                                    color: '#ffffff',
                                    marginBottom: '9px',
                                    backgroundColor: 'red',
                                    borderRadius: '5px',
                                        }}
                                onClick={() => removeRule(index)}
                                    >
                                        Remove
                                </Button>
                            </>)}
                            
                            <SelectControl
                                label="Display On"
                                value={rule.displayType}
                                options={[
                                    { label: "Page", value: "page" },
                                    { label: "Template", value: "template" }
                                ]}
                                onChange={(value) =>
                                    updateRule(index, 'displayType', value)
                                }
                            />
                            <SelectControl
                                label={rule.displayType === "page" ? "Select Page" : "Select Template"}
                                value={rule.displayOn}
                                options={rule.displayType === "page" ? pageOptions : pageTemplates}
                                onChange={(value) =>
                                    updateRule(index, 'displayOn', value)
                                }
                            />
                            <SelectControl
                                label="Select Hook"
                                value={rule.selectedHook}
                                options={
                                    rule.displayType === "page"
                                        ? wooCommercePages[rule.displayOn]?.hooks || []
                                        : wooCommerceTemplates[rule.displayOn]?.hooks || []
                                }
                                onChange={(value) =>
                                    updateRule(index, 'selectedHook', value)
                                }
                            />
                        </div>
                    ))}
                    <Button isPrimary onClick={addNewRule} style={{ marginTop: '15px' }}>
                        Add Another Rule
                    </Button>
                </PanelBody>
            </PluginSidebar>
        </>
    );
};

export default WCANSidebar;
