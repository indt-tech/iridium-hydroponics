import React, {useEffect, useState} from "react";
import { Node, Field, HandleOutput, NodeParams } from 'protoflow';
import { MessageSquare } from 'lucide-react';

const Logger = ({node= {}, nodeData= {}, children}: any) => {
    const nodeParams: Field[] = [
        { label: 'Level', static:true, field: 'to', type: 'select', data:['logger.trace', 'logger.debug', 'logger.info', 'logger.warn', 'logger.error', 'logger.fatal'] },
        { label: 'Message', field: 'param2' },
        { label: 'Data', field: 'param1' }
    ] as Field[]
    
    return (
        <Node icon={MessageSquare} node={node} isPreview={!node.id} title='Logger' color="#82d0ff" id={node.id} skipCustom={true}>
            <NodeParams id={node.id} params={nodeParams} />
        </Node>
    )
}

export default {
    id: 'logger',
    type: 'CallExpression',
    check: (node, nodeData) => node.type == "CallExpression" && nodeData.to?.startsWith('logger.'),
    getComponent: (node, nodeData, children) => <Logger node={node} nodeData={nodeData} children={children} />,
    getInitialData: () => { return { to: 'logger.info', param1: '{}', param2: '"message"' } }
}