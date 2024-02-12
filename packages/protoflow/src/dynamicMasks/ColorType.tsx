import React, { useContext, useState } from 'react';
import useTheme from '../diagram/Theme';
import Text from '../diagram/NodeText'
import { FlowStoreContext } from '../store/FlowsStore';
import { GithubPicker, SketchPicker } from "react-color";
import Input from '../diagram/NodeInput'
import { useThemeName, Popover, ToggleGroup, Theme } from "@my/ui";
import { Pipette, Palette } from 'lucide-react'

export const getColorProps = () => [
    "color"
]

export default ({ nodeData = {}, field, node }) => {
    const rawThemeName = useThemeName()
    const THEMENAME = rawThemeName.charAt(0).toUpperCase() + rawThemeName.slice(1)

    const useFlowsStore = useContext(FlowStoreContext)
    const setNodeData = useFlowsStore(state => state.setNodeData)
    const metadata = useFlowsStore(state => state.metadata)

    const colors = metadata?.tamagui?.color
    const nodeFontSize = useTheme('nodeFontSize')
    const interactiveColor = useTheme('interactiveColor')

    const tones = ['blue', 'gray', 'green', 'orange', 'pink', 'purple', 'red', 'yellow']

    const colorArrs = tones.map(t => Object.keys(colors).filter(c => c.startsWith(t) && c.endsWith(THEMENAME)).map(c => colors[c].val)) // [[], []]

    const dataKey = 'prop-' + field
    const data = nodeData[dataKey]
    const value = data?.value

    const [colorMode, setColorMode] = React.useState('theme');
    const [tmpColor, setTmpColor] = useState(value)

    const pickerStyles = { default: { card: { background: 'transparent', border: '0px', boxShadow: 'none' } } }

    const onSubmitThemeColor = (col) => {
        setNodeData(node.id, { ...nodeData, [dataKey]: { ...data, key: field, value: col, kind: 'StringLiteral' } })
        setTmpColor(col)
    }

    const getInput = () => {
        switch (field) {
            case 'color':
                return <div style={{ gap: '10px', display: 'flex', alignItems: 'center' }}>
                    <Popover placement='left'>
                        <Popover.Trigger asChild>
                            <div
                                style={{
                                    width: "28px", height: "28px", cursor: 'pointer',
                                    backgroundColor: colors[value + THEMENAME]?.val ?? value,
                                    borderRadius: 4, zIndex: 10, position: 'absolute', marginLeft: '5px',
                                }}>
                            </div>
                        </Popover.Trigger>
                        <Input
                            onBlur={() => onSubmitThemeColor(tmpColor)}
                            style={{
                                fontSize: nodeFontSize + 'px',
                                fontWeight: 'medium', paddingLeft: '38px'
                            }}
                            value={tmpColor}
                            placeholder="default"
                            onChange={t => setTmpColor(t.target.value)}
                        />
                        <Theme reset >
                            <Theme name='light' >
                                <Popover.Content width={'250px'} height={'380px'} backgroundColor='white' borderWidth="1px" borderColor='gray'>
                                    <Popover.Arrow />
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <Text style={{ color: 'black', fontFamily: 'Jost-Medium', fontSize: '16px', paddingLeft: 0 }}>Choose a Color</Text>
                                            <Text style={{ color: 'gray', fontSize: '14px', paddingLeft: 0 }} >{colorMode == 'theme' ? 'Theme Color' : 'Custom Color'}</Text>
                                        </div>
                                        <ToggleGroup disableDeactivation={true} value={colorMode} onValueChange={val => setColorMode(val)} type="single" orientation='horizontal' size='$2' height='30px'>
                                            <ToggleGroup.Item value="theme">
                                                <Palette color={colorMode == 'theme' ? interactiveColor : 'gray'} fillOpacity={0} />
                                            </ToggleGroup.Item>
                                            <ToggleGroup.Item value="custom">
                                                <Pipette color={colorMode == 'custom' ? interactiveColor : 'gray'} fillOpacity={0} />
                                            </ToggleGroup.Item>
                                        </ToggleGroup>
                                    </div>
                                    {colorMode == 'theme'
                                        ?
                                        // <Popover.Close>
                                        <Popover.ScrollView style={{ height: '280px', marginTop: '5px' }}>
                                            <GithubPicker
                                                className={"loooll"}
                                                styles={pickerStyles}
                                                triangle='hide'
                                                onChangeComplete={val => {
                                                    const valToFind = convertirHSLAString(val.hsl)
                                                    const matchedKey = Object.keys(colors).find(colorKey => colors[colorKey].val == valToFind && colorKey.endsWith(THEMENAME))
                                                    const newColor = matchedKey.replace(THEMENAME, '')
                                                    onSubmitThemeColor(newColor)
                                                }}
                                                width={'210px'}
                                                colors={colorArrs.flat(1)}
                                            />
                                        </Popover.ScrollView>
                                        // </Popover.Close>
                                        : <SketchPicker
                                            color={tmpColor}
                                            onChangeComplete={(newColor) => {
                                                onSubmitThemeColor(newColor.hex)
                                            }}
                                            styles={{ default: { picker: { background: 'transparent', border: '0px', boxShadow: 'none', width: '210px' } } }}
                                        />
                                    }
                                </Popover.Content>
                            </Theme>
                        </Theme>
                    </Popover>
                </div >
        }
    }
    return <div style={{ alignItems: 'stretch', flexBasis: 'auto', flexShrink: 0, listStyle: 'none', position: 'relative', display: 'flex', flexDirection: "column" }}>
        <div style={{ fontSize: nodeFontSize + 'px', padding: '8px 15px 8px 15px', display: 'flex', flexDirection: 'row', alignItems: 'stretch' }}>
            <div className={"handleKey"} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Text>{field}</Text>
            </div>
            <div className={"handleValue"} style={{ minWidth: '180px', marginRight: '10px', display: 'flex', flexDirection: 'row', flexGrow: 1, alignItems: 'center' }}>
                {getInput()}
            </div>
        </div>
    </div>
}

function convertirHSLAString(colorHSLA) {
    const { h, s, l, a } = colorHSLA;

    const hValue = Math.round(h);
    const sValue = s == 1 ? 100 : (s * 100).toFixed(1);
    const lValue = (l * 100).toFixed(1);

    const hslaString = `hsl(${hValue}, ${sValue}%, ${lValue}%)`//, ${aValue})`;

    return hslaString;
}
