
import { Node, FlowPort, NodeParams, FallbackPort, filterCallback, restoreCallback } from 'protoflow';
import { useColorFromPalette } from 'protoflow/src/diagram/Theme'
import { Cable } from 'lucide-react';
import { getFieldValue } from 'protoflow';

const OnDeviceEventMask = ({ node = {}, nodeData = {}, children }: any) => {
    const color = useColorFromPalette(45)
    return (
        <Node icon={Cable} node={node} isPreview={!node.id} title='On Device Event' color={color} id={node.id} skipCustom={true} disableInput disableOutput>
            <NodeParams id={node.id} params={[{ label: 'Event Path', field: 'param-3', type: 'input' }]} />
            <div style={{ height: '20px' }} />
            <div style={{ paddingBottom: "30px" }}>
                <FlowPort id={node.id} type='input' label='On Event (event)' style={{ top: '170px' }} handleId={'request'} />
                <FallbackPort node={node} port={'param-2'} type={"target"} fallbackPort={'request'} portType={"_"} preText="async (event) => " postText="" />
            </div>
            <div style={{ height: '50px' }} />
        </Node>
    )
}

export default {
    id: 'onDeviceEventMask',
    type: 'CallExpression',
    category: "ioT",
    keywords: ["automation", 'esp32', 'device', 'iot', 'trigger'],
    check: (node, nodeData) => {
        return node.type == "CallExpression" 
        && nodeData.to == 'context.onEvent'
        && getFieldValue('param-2', nodeData)?.startsWith('(event) =>') || getFieldValue('param-2', nodeData)?.startsWith('async (event) =>') 
        && nodeData["param-4"] 
        && getFieldValue('param-4', nodeData) == "device"
    },
    getComponent: (node, nodeData, children) => <OnDeviceEventMask node={node} nodeData={nodeData} children={children} />,
    getInitialData: () => { return { to: 'context.onEvent', "param-1": { value: 'context', kind: "Identifier" }, "param-2": { value: 'async (event) =>', kind: "Identifier" }, "param-3": { value: "", kind: "StringLiteral" }, "param-4": { value: 'device', kind: "StringLiteral" } } },
    filterChildren: filterCallback('-2'),
    restoreChildren: restoreCallback('-2'),
}