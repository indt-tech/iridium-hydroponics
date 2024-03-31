import { YStack, XStack, Paragraph, Text, Button, Stack, ScrollView, Spacer } from 'tamagui'
import { Center, useRemoteStateList, ObjectGrid, DataTableCard, MapView, PendingResult, AlertDialog, API, Tinted, EditableObject, AsyncView, Notice, ActiveGroup, ActiveGroupButton, ButtonGroup } from 'protolib'
import { createContext, forwardRef, useContext, useEffect, useState } from 'react'
import { Plus, LayoutGrid, List, Layers, X, ChevronLeft, ChevronRight, MapPin } from '@tamagui/lucide-icons'
import { z } from "protolib/base";
import { getErrorMessage, useToastController } from '@my/ui'
import { useUpdateEffect } from 'usehooks-ts';
import { usePageParams, useQueryState } from 'protolib/next'
import React from 'react';
import { getPendingResult } from '../base/PendingResult'
import { DataTableList } from './DataTableList'
import ActiveRender from "./ActiveRender"
import { EditableObjectProps } from './EditableObject';
import { FileWidget } from '../adminpanel/features/components/FilesWidget';
import { IconContainer } from './IconContainer';
import { SearchContext } from '../context/SearchContext';
import { InteractiveIcon } from './InteractiveIcon';
import { ItemMenu } from './ItemMenu';
import { useRouter } from 'next/router';

type DataViewState = {
    items: PendingResult,
    model: any,
    selected: any[],
    setSelected: Function,
    onSelectItem: Function | undefined
    state: any,
    push: Function,
    mergePush: Function,
    removePush: Function,
    replace: Function,
    tableColumns: any[],
    rowIcon: any,
    sourceUrl: string
}
export const DataViewContext = createContext<DataViewState>({
    items: getPendingResult('pending'),
    model: null,
    selected: [],
    setSelected: (selected) => null,
    onSelectItem: undefined,
    state: {},
    push: () => null,
    mergePush: () => null,
    removePush: () => null,
    replace: () => null,
    tableColumns: [],
    rowIcon: null,
    sourceUrl: ""
});

export const DataView = forwardRef(({
    onSelectItem,
    itemData,
    rowIcon,
    disableViewSelector = false,
    initialItems,
    sourceUrl,
    numColumnsForm = 1,
    name,
    pluralName,
    entityName,
    hideAdd = false,
    enableAddToInitialData = false,
    pageState,
    icons = {},
    model,
    extraFields = {},
    columns,
    onEdit = (data) => data,
    onDelete = (data) => data,
    onAdd = (data) => data,
    views = undefined,
    extraViews = [],
    openMode = 'edit',
    disableToggleMode,
    customFields = {},
    dataTableRawProps = {},
    dataTableListProps = {},
    dataTableGridProps = {},
    dataMapProps = {},
    extraFieldsForms = {},
    extraFieldsFormsEdit = {},
    extraFieldsFormsAdd = {},
    customFieldsForms = {},
    defaultView = 'list',
    disableViews = [],
    toolBarContent = null,
    onAddButton = undefined,
    extraMenuActions = [],
    deleteable = () => { return true },
    objectProps = {},
    refreshOnHotReload = false,
    quickRefresh = false
}: { objectProps?: EditableObjectProps, openMode: 'edit' | 'view' } & any, ref) => {
    const _plural = (entityName ?? pluralName) ?? name + 's'
    const { query } = useRouter();
    const [state, setState] = useState(pageState ?? query)
    const fetch = async (fn) => {
        const data = await API.get({ url: sourceUrl, ...state })
        fn(data)
    }

    const [items, setItems] = useRemoteStateList(initialItems, fetch, 'notifications/' + model.load({}).getModelName() + "/#", model, quickRefresh)
    const [currentItems, setCurrentItems] = useState<PendingResult | undefined>(initialItems ?? getPendingResult('pending'))
    const [createOpen, setCreateOpen] = useState(false)
    const { push, mergePush, removePush, replace } = usePageParams(state)
    const [selected, setSelected] = useState([])
    const [currentItemData, setCurrentItemData] = useState(itemData)
    const { search, setSearch, setSearchName } = useContext(SearchContext)
    const hasGlobalMenu = extraMenuActions && extraMenuActions.some(action => action.menus && action.menus.includes("global"));

    useQueryState(setState)

    useEffect(() => {
        if (refreshOnHotReload && process.env.NODE_ENV === 'development' && module['hot']) {
            module['hot'].addStatusHandler(status => {
                if (status === 'ready') {
                    document.location.reload()
                }
            });
        }
    }, []);

    useEffect(() => {
        if (items && items.isLoaded) {
            // console.log('***********************set current items: ', items)
            setCurrentItems(items)
        }
    }, [items])

    useUpdateEffect(() => {
        if (search) {
            push("search", search, false)
        } else {
            removePush("search")
        }
    }, [search])

    useEffect(() => {
        setSearchName(_plural)
    })

    useUpdateEffect(() => { fetch(setItems) }, [state.orderBy + '_' + state.itemsPerPage + '_' + state.page + '_' + state.search + '_' + state.orderDirection])

    const onSearch = async (text) => setSearch(text)
    const toast = useToastController()

    var defaultViews = [
        {
            name: 'list',
            icon: List,
            component: DataTableList,
            props: {
                sourceUrl,
                deleteable: deleteable,
                onDelete: async (_sourceUrl) => {
                    if (Array.isArray(selected) && selected.length && sourceUrl) {
                        const deletePromises = selected.map(ele => API.get(`${sourceUrl}/${model.load(ele).getId()}/delete`));
                        await Promise.all(deletePromises);
                        setSelected([]);
                    } else if (sourceUrl) {
                        await API.get(`${_sourceUrl}/delete`);
                    }
                    onDelete({ sourceUrl: _sourceUrl, selected })
                },
                enableAddToInitialData,
                extraMenuActions: extraMenuActions,
                ...dataTableListProps
            }
        },
        {
            name: 'grid',
            icon: LayoutGrid,
            component: ObjectGrid,
            props: {
                mt: "$8",
                model,
                items: items?.data?.items,
                sourceUrl,
                customFields,
                extraFields,
                icons,
                ml: "$5",
                deleteable: deleteable,
                onDelete: async (sourceUrl) => {
                    await API.get(sourceUrl + '/delete')
                    onDelete({ sourceUrl, selected })
                },
                onSelectItem: onSelectItem ? onSelectItem : (item) => replace('item', item.getId()),
                extraMenuActions: extraMenuActions,
                itemMinHeight: 320,
                itemMinWidth: 320,
                spacing: 20,
                ...dataTableGridProps
            }
        },
        {
            name: 'raw',
            icon: Layers,
            component: DataTableCard,
            props: {
                mt: "$8",
                onDelete: async (key) => {
                    await API.get(`${sourceUrl}/${key}/delete`);
                    onDelete({ sourceUrl, selected, key })
                },
                ...dataTableRawProps
            }
        }
    ]

    const mapView = {
        name: 'map',
        icon: MapPin,
        component: MapView,
        props: {
            mt: "$3",
            onDelete: async (key) => {
                await API.get(`${sourceUrl}/${key}/delete`);
            },
            ...dataMapProps
        }
    }

    const locationProps = model.load({}).getObjectSchema().is('location')
    if (locationProps.getFields().length) {
        defaultViews = [...defaultViews, mapView]
    }

    const tableViews = (views ?? [...defaultViews, ...extraViews]).filter(v => !disableViews.includes(v.name))

    const activeViewIndex = tableViews.findIndex(v => v.name == state.view) != -1 ? tableViews.findIndex(v => v.name == state.view) : tableViews.findIndex(v => v.name == defaultView)

    const getFilenameFromPath = (path) => {
        const parts = path.split('/');
        return parts.pop();
    }

    const totalPages = currentItems && currentItems.isLoaded ? Math.ceil(currentItems.data?.total / currentItems.data?.itemsPerPage) : 0
    if (items && items.isError) {
        return <Center>
            Error: {items.error && items.error.error ? items.error.error : items.error}
        </Center>
    }
    if(state.editFile) {
        
    }
    return (<AsyncView  atom={currentItems}>
        <YStack ref={ref} height="100%" f={1}>
            <DataViewContext.Provider value={{ items: currentItems, sourceUrl, model, selected, setSelected, onSelectItem, state, push, mergePush, removePush, replace, tableColumns: columns, rowIcon }}>
                <ActiveGroup initialState={activeViewIndex == -1 ? 0 : activeViewIndex}>
                    {/* <AlertDialog
                        integratedChat
                        p={"$0"}
                        hideAccept
                        setOpen={(s) => {
                            removePush('editFile')
                        }}
                        open={state.editFile}
                    > */}
                    { 
                        state.editFile && <FileWidget
                                id={"file-widget-" + getFilenameFromPath(state.editFile ?? '').split('.')[0]}
                                isFull={false}
                                hideCloseIcon={false}
                                isModified={true}
                                setIsModified={() => { }}
                                icons={[
                                    <IconContainer onPress={() => {
                                        removePush('editFile')
                                    }}>
                                        <X color="var(--color)" size={"$1"} />
                                    </IconContainer>
                                ]}
                                currentFileName={getFilenameFromPath(state.editFile ?? '')}
                                currentFile={state.editFile}
                            />
                    }
{/* 
                    </AlertDialog> */}

                    <AlertDialog
                        integratedChat
                        p={"$2"}
                        pt="$5"
                        pl="$5"
                        setOpen={setCreateOpen}
                        open={createOpen}
                        hideAccept={true}
                        description={""}
                    >
                        <YStack f={1} jc="center" ai="center" id={"admin-dataview-create-dlg"}>
                            <ScrollView maxHeight={"90vh"}>
                                <XStack mr="$4">
                                    <EditableObject
                                        id={"admin-eo"}
                                        name={name}
                                        numColumns={numColumnsForm}
                                        mode={'add'}
                                        onSave={async (originalData, data) => {
                                            try {
                                                const obj = model.load(data)
                                                const repeatedId = items.data.items.find(i => i.id === obj.getId())
                                                if (repeatedId) {
                                                    throw { error: "This id already exists" }
                                                }
                                                const result = await API.post(sourceUrl, onAdd(obj.create().getData()))
                                                if (result.isError) {
                                                    throw result.error
                                                }
                                                //fetch(setItems)
                                                setCreateOpen(false);
                                                toast.show(name + ' created', {
                                                    message: obj.getId()
                                                })
                                            } catch (e) {
                                                console.log('original error: ', e, e.flatten())
                                                throw getPendingResult('error', null, e instanceof z.ZodError ? e.flatten() : e)
                                            }
                                        }}
                                        model={model}
                                        extraFields={{ ...extraFields, ...extraFieldsForms, ...extraFieldsFormsAdd }}
                                        icons={icons}
                                        customFields={{ ...customFields, ...customFieldsForms }}
                                        {...objectProps}
                                    />
                                </XStack>
                            </ScrollView>
                        </YStack>
                    </AlertDialog>
                    <AlertDialog
                        integratedChat
                        p={"$1"}
                        pt="$5"
                        pl="$5"
                        hideAccept={true}
                        acceptCaption="Save"
                        setOpen={(s) => {
                            setCurrentItemData(undefined);
                            removePush('item')
                        }}
                        open={state.item}
                        description={""}
                    //bc={resolvedTheme == 'dark' ? "$background": "$color1"}
                    >
                        <YStack f={1} jc="center" ai="center">
                            <ScrollView maxHeight={"90vh"}>
                                <Stack mr="$5">
                                    <EditableObject
                                        disableToggleMode={disableToggleMode}
                                        initialData={currentItemData}
                                        name={name}
                                        spinnerSize={75}
                                        loadingText={<YStack ai="center" jc="center">Loading data for {name}<Paragraph fontWeight={"bold"}>{state.item}</Paragraph></YStack>}
                                        objectId={state.item}
                                        sourceUrl={sourceUrl + '/' + state.item}
                                        numColumns={numColumnsForm}
                                        mode={openMode}
                                        onSave={async (original, data) => {
                                            try {
                                                setCurrentItemData(undefined)
                                                const id = model.load(data).getId()
                                                const result = await API.post(sourceUrl + '/' + id, onEdit(model.load(original).update(model.load(data)).getData()))
                                                if (result.isError) {
                                                    throw result.error
                                                }
                                                //fetch(setItems)
                                                const { item, ...rest } = state;
                                                setState(rest)
                                                toast.show(name + ' updated', {
                                                    message: "Saved new settings for: " + id
                                                })
                                            } catch (e) {
                                                throw getPendingResult('error', null, e instanceof z.ZodError ? e.flatten() : e)
                                            }
                                        }}
                                        model={model}
                                        extraFields={{ ...extraFields, ...extraFieldsForms, ...extraFieldsFormsEdit }}
                                        icons={icons}
                                        customFields={{ ...customFields, ...customFieldsForms }}
                                        {...objectProps}
                                    />
                                </Stack>
                            </ScrollView>
                        </YStack>
                    </AlertDialog>
                    {!state.editFile && <>
                        <XStack pt="$3" px="$7" mb="$1">
                            <XStack left={-12} f={1} ai="center">

                                <Paragraph>
                                    <Text fontSize="$5" color="$color11">{pluralName ? pluralName.charAt(0).toUpperCase() + pluralName.slice(1) : name.charAt(0).toUpperCase() + name.slice(1) + 's'}</Text>
                                </Paragraph>
                                {hasGlobalMenu ? <Tinted><ItemMenu type={"global"} sourceUrl='' hideDeleteButton={true} element="" extraMenuActions={extraMenuActions}></ItemMenu></Tinted> : <></>}
                                {toolBarContent}
                            </XStack>

                            <XStack ai="center">
                                <XStack ai="center" ml="$3">
                                    {currentItems.isLoaded && <XStack ml={"$2"}>
                                        <XStack ml={"$5"} ai="center">
                                            <XStack ml={"$5"} ai="center">
                                                <Text fontSize={14} color="$color10">{(currentItems.data.itemsPerPage * currentItems.data.page) + 1}-{Math.min(currentItems.data.total, (currentItems.data.itemsPerPage * (currentItems.data.page + 1)))} of {currentItems.data.total}</Text>
                                            </XStack>
                                            <Tinted>
                                                <InteractiveIcon
                                                    Icon={ChevronLeft}
                                                    onPress={(e) => {
                                                        e.stopPropagation();
                                                        if (currentItems.data.page > 0) {
                                                            push("page", currentItems.data.page - 1);
                                                        }
                                                    }} ml={"$3"}
                                                    disabled={!(currentItems.data.page > 0)} />
                                                <Spacer size="$3" />
                                                <InteractiveIcon
                                                    Icon={ChevronRight}
                                                    onPress={(e) => {
                                                        e.stopPropagation();
                                                        if (currentItems.data.page < totalPages - 1) {
                                                            push("page", currentItems.data.page + 1);
                                                        }
                                                    }}
                                                    ml={"$3"}
                                                    disabled={!(currentItems.data.page < totalPages - 1)} />
                                            </Tinted>
                                        </XStack>
                                    </XStack>}
                                </XStack>
                                <XStack ai="center" marginLeft="$3">
                                    {!disableViewSelector && <ButtonGroup marginRight="$3">
                                        {
                                            tableViews.map((v, index) => <ActiveGroupButton id={'tableView-' + v.name} key={index} onSetActive={() => push('view', v.name)} activeId={index}>
                                                {React.createElement(v.icon, { size: "$1", strokeWidth: 1 })}
                                            </ActiveGroupButton>)
                                        }
                                    </ButtonGroup>}
                                    {!hideAdd && <Tinted>
                                        <Button id={"admin-dataview-add-btn"} hoverStyle={{ o: 1 }} o={0.7} circular onPress={() => {
                                            onAddButton ? onAddButton() : setCreateOpen(true)
                                        }} chromeless={true}>
                                            <Plus color={"$color10"} />
                                        </Button>
                                    </Tinted>
                                    }
                                </XStack>
                            </XStack>
                        </XStack>

                        {items && items.isError && (
                            <Notice>
                                <Paragraph>{getErrorMessage(items.error)}</Paragraph>
                            </Notice>
                        )}
                        <Stack f={1}>
                            <AsyncView atom={currentItems}>
                                {
                                    tableViews.map((v, index) => <ActiveRender height="100%" key={index} activeId={index}>
                                        {React.createElement(v.component, { ...v.props } ?? {})}
                                    </ActiveRender>
                                    )}
                            </AsyncView>
                        </Stack>
                    </>}
                </ActiveGroup>
            </DataViewContext.Provider>
        </YStack>
    </AsyncView>
    )
})