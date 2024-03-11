import React from 'react'
import { Check } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { Text, YStack, debounce } from 'tamagui'
import { Checkboxes } from './bento/components/checkboxParts'
import { SizableText, Stack, StackProps } from '@my/ui'

type Item = {
    id: string,
    label: string,
    checked: boolean
}

type BentoHorizontalCheckboxesProps = {
    items: Item[],
    title?: string,
    description?: string,
    setState?: (newState: Record<string, boolean>) => void
}

export function BentoHorizontalCheckboxes({items=[],title, description, setState=()=>{}, ...props }: BentoHorizontalCheckboxesProps & StackProps) {
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
                {description && <SizableText fontSize="$5" lineHeight="$5" fontWeight="300" col="$gray10">
                    {description}
                </SizableText>}
                <Checkboxes.FocusGroup flexDirection="row" gap="$4" flexWrap="wrap" rowGap="$2">
                    {items.map(({ id, label, checked }) => (
                        <Checkboxes.FocusGroup.Item flex={1} flexBasis={150} value={id} key={id}>
                            <Item id={id} label={label} checked={values[id]} />
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
    checked,
}: {
    id: string
    label: string
    checked: boolean
}) {
    return (
        <Checkboxes.Card
            flexDirection="row"
            hoverStyle={{
                borderColor: '$color7',
            }}
            alignItems="center"
            gap="$3"
            padding={"$3"}
            paddingHorizontal="$2.5"
            cursor="pointer"
        >
            <Checkboxes.Checkbox id={id}>
                <Checkboxes.Checkbox.Indicator>
                    <Check />
                </Checkboxes.Checkbox.Indicator>
            </Checkboxes.Checkbox>

            <Checkboxes.Checkbox.Label cursor="pointer" htmlFor={id}>
                {label}
            </Checkboxes.Checkbox.Label>
        </Checkboxes.Card>
    )
}
