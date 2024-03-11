import { useState, useEffect } from 'react'
import { atom, useAtom } from 'jotai'
import { EditorStore, useEditorContext } from "@protocraft/core";
import { useRouter } from 'next/router'
import Diff from 'deep-diff'

// create craftjs context 
export function newVisualUiContext(options: any) {
  return useEditorContext(options)
}

// handle no contextAtom provided on UIEditor()/useEdit()
export function useVisualUiAtom(_atom: any) {
  const contextAtom = _atom ?? null
  return contextAtom ? useAtom(contextAtom) : [null, null]
}

// hook to subscribe to a visualUi instance state
// *client* refers to any subscriber
export function useVisualUi(atom, callb?, defState?) {
  if (atom) {
    const [craftContext] = useAtom<EditorStore>(atom) // protocraft internal state
    const [prevNodes, setPreviousNodes] = useState<string>(null) // previous nodes on every udpate
    const [lastEvent, setLastEvent] = useState<any>(null) // get last event triggered by any
    const [state, setState] = useState(defState ?? null) // client wanted internal state based on a callback trigger

    // state reducer
    useEffect(() => {
        if (!craftContext || !craftContext['subscribe']) return

        craftContext.subscribe(
            (_) => {
                setState((prev: any) => {
                    const result = callb && callb(prev, craftContext)
                    return result ?? prev
                })
            },
            () => {
                // we need to discover more about this callback
            }
        );
    }, [craftContext])

    // events
    useEffect(() => {
        if (craftContext.history.timeline.length < 1) return  // this is to avoid empty initializer of craft
        if (lastEvent === null && prevNodes === null) { // first load
            setPreviousNodes(craftContext.query.serialize())
            return 
        } 

        const currentNodes: any = JSON.parse(craftContext.query.serialize())
        const diffs = Diff.diff(JSON.parse(prevNodes), currentNodes) 
        console.log('in-dev: diffs', diffs)
        if (diffs.length < 1) return 

        if (diffs.find(d => d.kind == 'N')) { // add case
            console.log('in: add', diffs.find(d => d.kind == 'N').path, diffs.find(d => d.kind == 'N'))
            setLastEvent({
                action: 'add-node'
            })
        } else if (diffs.find(d => d.kind == 'D')) { //delete case
            const deletedNodes = diffs.filter(d => d.kind == 'D').map(n => n.path[0])
            const parentId = diffs.find(d => d.kind == 'A').path[0]            
            setLastEvent({
                action: 'delete-node',
                deletedNodes: deletedNodes,
                parent: parentId
            })
        } else if (diffs.find(d => d.kind == 'E')) { // edit case
            console.log('in: edit', diffs.find(d => d.kind == 'E').path, diffs.find(d => d.kind == 'E'))
            setLastEvent({
                action: 'add-node'
            })
        }
    }, [craftContext.query.serialize()])

    return {
        actions: craftContext.actions, 
        query: craftContext.query, 
        state: state,
        lastEvent: lastEvent
    }
  } else {
    throw new Error("useVisualUi(...) must have a defined atom")
  }
}

// toggle communication mode visualUi
export function useVisualUiComms({ actions, query }, { resolveComponentsDir, appendNewNodeToTree }, setPreviousNodes, topicData, contextAtom) {
    const router = useRouter()
    const queryParams = router.query

    if (queryParams.experimental_comms === 'true') {
        console.log('protocraft experimental communications')
        const {lastEvent} = useVisualUi(contextAtom)
        useEffect(() => {
            console.log('craftEvent: ', lastEvent)
        }, [lastEvent])
    } else {
        console.log('protocraft legacy communications')
        useEffect(() => {
            const flowData = topicData
            const action = flowData.action
            const nodeId = flowData.nodeId;
            const value = flowData.value;
            const modifiedKey = flowData.param;
        
            switch (action) {
              case 'delete-node':
                if (flowData.deletedNodeType != "JsxElement") return
                actions.setOptions(options => options['skipTopic'] = true)
                flowData.nodesToDelete?.forEach(nId => actions.delete(nId))
                setPreviousNodes(JSON.parse(query.serialize()));
                break;
              case 'delete-data':
                if (!modifiedKey) return
                try {
                  actions.setOptions(options => options['skipTopic'] = true)
                  actions.setProp(nodeId, (props) => {
                    delete props[modifiedKey]
                    return props
                  })
                  setPreviousNodes(JSON.parse(query.serialize()));
                } catch (e) {
                  console.error('error deleting data. ', e)
                }
                break;
              case 'edit-data': // modify existing node prop/child
                if (!modifiedKey) return
                try {
                  actions.setOptions(options => options['skipTopic'] = true)
                  actions.setProp(nodeId, (props) => props[modifiedKey] = value)
                  actions.setCustom(nodeId, (custom) => custom[modifiedKey] = "JsxText")
                  const deleteKey = flowData?.deleteKey
                  if (deleteKey) {
                    actions.setProp(nodeId, (props) => {
                      delete props[deleteKey]
                      return props
                    })
                  }
                  setPreviousNodes(JSON.parse(query.serialize()));
                } catch (e) {
                  console.error('error editing data. ', e)
                }
                break;
              case 'add-data': // modify existing node adding new prop/child
                let newNodes = JSON.parse(query.serialize())
                if (!newNodes[nodeId]) return
                try {
                  newNodes[nodeId] = { ...newNodes[nodeId], props: { ...newNodes[nodeId].props, [modifiedKey]: value } }
                  actions.setOptions(options => options['skipTopic'] = true)
                  actions.setProp(nodeId, (props) => props[modifiedKey] = value)
                  setPreviousNodes(newNodes);
                } catch (e) {
                  console.error('error adding data. ', e)
                }
                break;
              case 'add-node':
                const type = flowData.type
                const childrenIndex = flowData.childrenPos;
                const name = flowData.nodeName;
                const parentId = flowData.parent;
                if (type == "JsxElement") { // Is a new component
                  const newCraftNodeData = {
                    displayName: name,
                    props: {},
                    custom: {
                      defaultImport: name,
                      moduleSpecifier: `"${resolveComponentsDir}${name}"`,
                      _nodeType: "JsxElement"
                    },
                    hidden: false,
                    isCanvas: true,
                    parent: parentId,
                    type: {
                      resolvedName: name
                    },
                    nodes: []
                  }
                  const prevNodes = JSON.parse(query.serialize());
                  if (!parentId || !prevNodes) return
                  try {
                    const newTree = appendNewNodeToTree(prevNodes, nodeId, newCraftNodeData, parentId, childrenIndex)
                    actions.setOptions(options => options['skipTopic'] = true)
                    actions.deserialize(newTree);
                    setPreviousNodes(JSON.parse(query.serialize()));
                  } catch (e) {
                    console.error('error adding node (JsxElement). ', e)
                  }
                } else { // is a prop of a component
                  try {
                    const newPropData = flowData.data;
                    if (!newPropData?.isAncestorJsxElement) return
                    actions.setOptions(options => options['skipTopic'] = true)
                    actions.setProp(parentId, (props) => props[newPropData.key] = newPropData.value)
                    setPreviousNodes(JSON.parse(query.serialize()));
                  } catch (e) {
                    console.error('error adding node (Not a JsxElement). ', e)
                  }
                }
                break;
              default:
                break;
            }
        }, [topicData])
    }

}
