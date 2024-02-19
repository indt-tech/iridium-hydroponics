import React, { useContext } from 'react';
import useTheme from '../diagram/Theme';
import Text from '../diagram/NodeText'
import { FlowStoreContext } from '../store/FlowsStore';
import {
    AlignLeft, AlignCenter, AlignRight, AlignJustify,
    AlignStartVertical, AlignEndVertical, AlignCenterVertical, StretchVertical,
    ArrowRightFromLine, ArrowLeftFromLine, ArrowDownFromLine, ArrowUpFromLine,
    AlignVerticalJustifyStart, AlignVerticalJustifyCenter, AlignVerticalJustifyEnd, AlignVerticalSpaceAround, AlignVerticalSpaceBetween
} from 'lucide-react';

export default ({ nodeData = {}, item, node }) => {
    const useFlowsStore = useContext(FlowStoreContext)
    const setNodeData = useFlowsStore(state => state.setNodeData)
    const deletePropNodeData = useFlowsStore(state => state.deletePropNodeData)
    const nodeFontSize = useTheme('nodeFontSize')

    const { field, label, type, fieldType } = item

    const dataKey = fieldType ? (fieldType + '-' + field) : field
    const data = nodeData[dataKey]
    const value = data?.value
    const rotation = getIconRotation()

    function getIconRotation() {
        let rot = '0deg';
        const isRowDir = Boolean(nodeData["prop-flexDirection"]?.value?.startsWith("row"))
        if (isRowDir) {
            rot = field == 'alignItems' ? '90deg' : '-90deg'
        }
        return rot;
    }

    const getIconColor = (type) => {
        if (value == type) return 'white'
        else return
    }

    const onToggleAlignment = (val) => {
        if (value == val) {// deletes nodeData 
            deletePropNodeData(node.id, dataKey)
        }
        else { // add new prop to nodeData
            setNodeData(node.id, { ...nodeData, [dataKey]: { ...data, key: field, value: val, kind: 'StringLiteral' } })
        }
    }

    const Icon = ({ icon, name, rotate = '0deg' }) => {
        return <div title={name} style={{ cursor: 'pointer', rotate: rotate }} onClick={() => onToggleAlignment(name)}>
            {React.createElement(icon, { color: getIconColor(name) })}
        </div>
    }
    const getInput = () => {
        switch (type) {
            case 'alignment-text':
                return <div style={{ gap: '10px', display: 'flex' }}>
                    <Icon icon={AlignLeft} name={'left'} />
                    <Icon icon={AlignCenter} name={'center'} />
                    <Icon icon={AlignRight} name={'right'} />
                    <Icon icon={AlignJustify} name={'justify'} />
                </div>
            case 'alignment-items':
                return <div style={{ gap: '10px', display: 'flex' }}>
                    <Icon rotate={rotation} icon={AlignStartVertical} name={'start'} />
                    <Icon rotate={rotation} icon={AlignCenterVertical} name={'center'} />
                    <Icon rotate={rotation} icon={AlignEndVertical} name={'end'} />
                    <Icon rotate={rotation} icon={StretchVertical} name={'stretch'} />
                </div>
            case 'alignment-flex':
                return <div style={{ gap: '10px', display: 'flex' }}>
                    <Icon icon={ArrowRightFromLine} name={'row'} />
                    <Icon icon={ArrowLeftFromLine} name={'row-reverse'} />
                    <Icon icon={ArrowDownFromLine} name={'column'} />
                    <Icon icon={ArrowUpFromLine} name={'column-reverse'} />
                </div>
            case 'alignment-content':
                return <div style={{ gap: '10px', display: 'flex' }}>
                    <Icon rotate={rotation} icon={AlignVerticalJustifyStart} name={'start'} />
                    <Icon rotate={rotation} icon={AlignVerticalJustifyCenter} name={'center'} />
                    <Icon rotate={rotation} icon={AlignVerticalJustifyEnd} name={'end'} />
                    <Icon rotate={rotation} icon={AlignVerticalSpaceBetween} name={'space-between'} />
                    <Icon rotate={rotation} icon={AlignVerticalSpaceAround} name={'space-around'} />
                </div>
        }
    }

    return <div style={{ alignItems: 'stretch', flexBasis: 'auto', flexShrink: 0, listStyle: 'none', position: 'relative', display: 'flex', flexDirection: "column" }}>
        <div style={{ fontSize: nodeFontSize + 'px', padding: '8px 15px 8px 15px', display: 'flex', flexDirection: 'row', alignItems: 'stretch' }}>
            <div className={"handleKey"} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Text>{label}</Text>
            </div>
            <div className={"handleValue"} style={{ minWidth: '180px', marginRight: '10px', display: 'flex', flexDirection: 'row', flexGrow: 1, alignItems: 'center' }}>
                {getInput()}
            </div>
        </div>
    </div>
}