import React, { useContext } from 'react';
import { FlowStoreContext } from "../store/FlowsStore"
import { NodeTypes } from '../..';

type themeKey = "edgeColor" | "nodeBackgroundColor" | "inputBackgroundColor" | "textColor" | "interactiveColor" | 'interactiveHoverColor' | 'inputBorder' | 'borderColor'
    | 'borderWidth' | 'borderWidthSelected' | 'colorError' | 'handleBorderColor' | 'flowOutputColor' | 'dataOutputColor' | 'highlightInputBackgroundColor' | 'blockPort' | 'flowPort'
    | 'dataPort' | 'nodeBorderWidth' | 'nodeBorderColor' | 'portSize' | 'nodeFontSize' | 'containerColor' | 'titleColor' | 'disableTextColor' | 'nodeEdgeWidth' | 'nodeEdgeStyle'
    | 'plusColor' | 'selectedColor' | 'separatorColor' | 'nodePalette'

const commonVars: any = {
    nodeBorderWidth: '1px',
    nodeFontSize: 20,
    nodeEdgeWidth: 3,
    nodeEdgeStyle: "7 5"
}
commonVars.portSize = 20
commonVars.borderWidth = 0//Math.floor(commonVars.nodeFontSize / 10)
commonVars.borderWidthSelected = 0.5

const outlineColorLight = '#222'
const outlineColorDark = '#888'
const Theme = {
    light: {
        ...commonVars,
        nodePalette: {
            colors: [
                '#EF9A9A',
                '#F48FB1',
                '#CE93D8',
                '#B39DDB',
                '#9FA8DA',
                '#90CAF9',
                '#81D4FA',
                '#80DEEA',
                '#80CBC4',
                '#A5D6A7',
                '#C5E1A5',
                '#FFF59D',
                '#FFE082',
                '#FFCC80',
                '#FFAB91',
                '#BCAAA4',
                '#EEEEEE',
                '#B0BEC5',
                '#E57373',
                '#F06292',
                '#BA68C8',
                '#9575CD',
                '#7986CB',
                '#64B5F6',
                '#4FC3F7',
                '#4DD0E1',
                '#4DB6AC',
                '#81C784',
                '#AED581',
                '#FFF176',
                '#FFD54F',
                '#FFB74D',
                '#FF8A65',
                '#A1887F',
                '#E0E0E0',
                '#90A4AE'
            ],
            custom: {
                SourceFile: '#F7B500',
                Block: '#ccc'                
            }
        },
        plusColor: '#999',
        edgeColor: '#888',
        nodeBackgroundColor: "#fdfdfd",
        inputBackgroundColor: "white",
        inputBorder: '1px solid #ccc',
        textColor: "#666",
        selectedColor: "#2680EB",
        disableTextColor: "#ccc",
        interactiveColor: "#4fc2f7",
        interactiveHoverColor: 'rgba(79, 194, 247, 0.1)',
        borderColor: '#888',
        colorError: '#EF4444',
        handleBorderColor: 'white',
        flowOutputColor: 'white',
        dataOutputColor: 'black',
        highlightInputBackgroundColor: '#F1F1F1',
        blockPort: '#fefefe',
        flowPort: '#fefefe',
        dataPort: '#fefefe',
        nodeBorderColor: '#aaa',
        titleColor: '#222',
        containerColor: '#00000005',
        separatorColor: '#D4D4D4'
    },
    dark: {
        ...commonVars,
        nodePalette: {
            colors: [
                '#EF9A9A',
                '#F48FB1',
                '#CE93D8',
                '#B39DDB',
                '#9FA8DA',
                '#90CAF9',
                '#81D4FA',
                '#80DEEA',
                '#80CBC4',
                '#A5D6A7',
                '#C5E1A5',
                '#FFF59D',
                '#FFE082',
                '#FFCC80',
                '#FFAB91',
                '#BCAAA4',
                '#EEEEEE',
                '#B0BEC5',
                '#E57373',
                '#F06292',
                '#BA68C8',
                '#9575CD',
                '#7986CB',
                '#64B5F6',
                '#4FC3F7',
                '#4DD0E1',
                '#4DB6AC',
                '#81C784',
                '#AED581',
                '#FFF176',
                '#FFD54F',
                '#FFB74D',
                '#FF8A65',
                '#A1887F',
                '#E0E0E0',
                '#90A4AE'
            ],
            custom: {
                SourceFile: '#F7B500',
                Block: '#ccc'                
            }
        },
        plusColor: 'white',
        handleBorderColor: 'black',
        edgeColor: outlineColorDark,
        nodeBackgroundColor: "#303030", //bg of nodes
        inputBackgroundColor: "#404040",
        inputBorder: '0',
        textColor: "#e5e5e5",
        selectedColor: "#2680EB",
        disableTextColor: "grey",
        interactiveColor: "#4772b3",
        interactiveHoverColor: '#252525',
        borderColor: outlineColorDark,
        colorError: '#EF4444',
        flowOutputColor: 'grey',
        dataOutputColor: 'black',
        highlightInputBackgroundColor: "#222222",
        blockPort: 'black',
        flowPort: 'grey',
        dataPort: 'grey',
        nodeBorderColor: outlineColorDark,
        titleColor: 'black',
        containerColor: '#FFFFFF05',
        separatorColor: '#424242'
    }
}

const useTheme = (key: themeKey, defaultValue = null) => {
    const useFlowsStore = useContext(FlowStoreContext)
    const themeMode = useFlowsStore(state => state.themeMode)
    const themeOverride = useFlowsStore(state => state.themeOverride)
    const _theme = { ...Theme[themeMode], ...themeOverride }
    try {
        const value = _theme[key]
        return value
    } catch (e) {
        return defaultValue
    }

}

export const useNodeColor = (type) => {
    //NodeTypes
    const nodePalette = useTheme('nodePalette', {
        colors: ['#ccc'],
        custom: {}
    })
    return nodePalette.custom[type] ?? nodePalette.colors[Object.keys(NodeTypes).indexOf(type) % nodePalette.colors.length]
}

export default useTheme