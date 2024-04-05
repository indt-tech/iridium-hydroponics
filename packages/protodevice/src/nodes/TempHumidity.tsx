import React from "react";
import { Node, Field, NodeParams } from 'protoflow';
// import { Node, Field, HandleOutput, NodeParams } from '../../flowslib';
// import { pinTable } from '../../../lib/device/Device'

const TempHumidity = ({ node = {}, nodeData = {}, children, color }: any) => {
    const transitionErrorMsg = 'Add units s/ms'

    const nodeParams: Field[] = [
        { label: 'Name', static: true, field: 'param-1', type: 'input' },
        {
            label: 'Model', static: true, field: 'param-2', type: 'select',
            data: ["DHT11", "DHT22", "DHT22_TYPE2", "AM2302", "RHT03", "SI7021"]
        },
        {
            label: 'Update Interval', static: true, field: 'param-3', type: 'input',
            error: !['s', 'ms'].includes(nodeData['param-3']?.replace(/['"0-9]+/g, '')) ? transitionErrorMsg : null
        }
    ] as Field[]
    return (
        <Node node={node} isPreview={!node.id} title='Temperature & Humidity' color={color} id={node.id} skipCustom={true} disableInput disableOutput>
            <NodeParams id={node.id} params={nodeParams} />
        </Node>
    )
}

export default TempHumidity
