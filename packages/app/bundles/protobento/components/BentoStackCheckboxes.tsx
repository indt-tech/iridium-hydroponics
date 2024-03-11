import React from 'react'
import { Check } from '@tamagui/lucide-icons'
import { useState, useId } from 'react'
import { Text, YStack, debounce } from 'tamagui'
import { Checkboxes } from './bento/components/checkboxParts'
import { SizableText, Stack, StackProps, View } from '@my/ui'

type Item = {
    id: string,
    label: string,
    description?: string,
    checked: boolean
}

type BentoStackCheckboxesProps = {
    items: Item[],
    title?: string,
    subtitle?: string,
    setState?: (newState: Record<string, boolean>) => void,
    mode: "horizontal" | "vertical"
}

export function BentoStackCheckboxes({ mode="horizontal", items = [], title, subtitle, setState = () => { }, ...props }: BentoStackCheckboxesProps & StackProps) {
    const uniqueId = useId()
    const [values, setValues] = useState<Record<string, boolean>>(() =>
        items.reduce((a, b) => ({ ...a, [b.id]: b.checked }), {})
    )

    const onValuesChange = debounce((values: any) => {
        setValues(values)
        setState(values)
    })

    return (
        <Stack {...props}>
            <Checkboxes
                values={values}
                onValuesChange={onValuesChange}
                maxWidth="100%"
                gap="$4"
            >
                {title && <Checkboxes.Title>{title}</Checkboxes.Title>}
                {subtitle && <SizableText fontSize="$5" lineHeight="$5" fontWeight="300" col="$gray10">
                    {subtitle}
                </SizableText>}
                <Checkboxes.FocusGroup flexDirection={mode == "horizontal" ? "row":"column"} gap="$4" flexWrap="wrap" rowGap="$2">
                    {items.map(({ id, label, description }) => (
                        <Checkboxes.FocusGroup.Item flex={1} flexBasis={150} value={id} key={id}>
                            <Item description={description} id={id} label={label} uniqueId={uniqueId} />
                        </Checkboxes.FocusGroup.Item>
                    ))}
                </Checkboxes.FocusGroup>
            </Checkboxes>
        </Stack>

    )
}


function Item({
    id,
    label,
    description,
    uniqueId,
}: {
    id: string
    label: string
    description?: string
    uniqueId: string
}) {
    return (
        <Checkboxes.Card
            flexDirection="row"
            alignItems="flex-start"
            gap="$3"
            height="100%"
            padding="$3"
            paddingHorizontal="$3.5"
            cursor="pointer"
        >
            <View flexDirection="row" y={1}>
                <Checkboxes.Checkbox id={id + uniqueId}>
                    <Checkboxes.Checkbox.Indicator>
                        <Check />
                    </Checkboxes.Checkbox.Indicator>
                </Checkboxes.Checkbox>
            </View>

            <View flexDirection="column" flexShrink={1}>
                <Checkboxes.Checkbox.Label
                    size="$4"
                    lineHeight="$2"
                    alignItems="flex-start"
                    flexDirection="column"
                    cursor="pointer"
                    htmlFor={id + uniqueId}
                >
                    {label}
                </Checkboxes.Checkbox.Label>
                {description && <Text
                    flexShrink={1}
                    fontSize="$3"
                    lineHeight="$3"
                    fontWeight="300"
                    color="$gray9"
                >
                    {description}
                </Text>}
            </View>
        </Checkboxes.Card>
    )
}