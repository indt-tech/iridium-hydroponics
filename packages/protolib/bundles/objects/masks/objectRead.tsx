import { Node, NodeParams, FallbackPortList, filterCallback, restoreCallback } from 'protoflow';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { API } from 'protolib/base'
import { useColorFromPalette } from 'protoflow/src/diagram/Theme'

const objectRead = (node: any = {}, nodeData = {}) => {
    const [objects, setObjects] = useState<any[]>([]);
    const color = useColorFromPalette(1)

    const getObjects = async () => {
        const { data } = await API.get('/adminapi/v1/objects?all=1')
        setObjects(data?.items.map((item: any) => item.name));
    }

    useEffect(() => {
        getObjects()
    }, [])

    return (
        <Node icon={Search} node={node} isPreview={!node?.id} title='Object Read' id={node.id} color={color} skipCustom={true}>
            <NodeParams id={node.id} params={[{ label: 'Object', field: 'param-1', type: 'select', static: true, data: objects }]} />
            <NodeParams id={node.id} params={[{ label: 'Object ID', field: 'param-2', type: 'input' }]} />
            <FallbackPortList 
                height='70px'
                node={node} 
                fallbacks={[{
                    "name": "onread",
                    "label": "onRead(item)",
                    "field": "param-4",
                    "preText": "async (item) => ",
                    "postText": "",
                    "fallbackText": "null"
                }, {
                    "name": "onerror",
                    "label": "OnError (error)",
                    "field": "param-5",
                    "preText": "async (error) => ",
                    "fallbackText": "null",
                    "postText": ""
                }]} 
                startPosX={125}
            />
        </Node>
    )
}

export default {
    id: 'objectRead',
    type: 'CallExpression',
    check: (node, nodeData) => {
        return (
            node.type == "CallExpression"
            && (nodeData.to == 'context.object.read')
        )
    },
    getComponent: objectRead,
    category: "Objects (CMS)",
    keywords: ["read", "cms", "object"],
    filterChildren: (node, childScope, edges) => {
        childScope = filterCallback("4", "onread")(node, childScope, edges)
        childScope = filterCallback("5", "onerror")(node, childScope, edges)
        return childScope
    },
    restoreChildren: (node, nodes, originalNodes, edges, originalEdges) => {
        let result = restoreCallback("4")(node, nodes, originalNodes, edges, originalEdges)
        result = restoreCallback("5")(node, result.nodes, originalNodes, result.edges, originalEdges)
        return result
    },
    getInitialData: () => {
        return {
            to: 'context.object.read',
            "param-1": { value: "", kind: "StringLiteral" },
            "param-2": { value: "", kind: "StringLiteral" },
            "param-3": { value: "null", kind: "Identifier" },
            "param-4": { value: "null", kind: "Identifier" },
            "param-5": { value: "null", kind: "Identifier" }
        }
    }
}