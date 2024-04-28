import React from 'react'
import { Check } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { Avatar, Text, View, YGroup, debounce } from 'tamagui'
import { Checkboxes } from './bento/components/checkboxParts'
import { SizableText, Stack, StackProps } from '@my/ui'
import { Tinted } from 'protolib'

type Item = {
    title: string,
    description: string,
    id: string,
    checked: boolean,
    chip?: string,
    chipColor?: string,
    image: string
}

type BentoGroupedCheckboxProps = {
    items: Item[] | [],
    setState?: (newState: Record<string, boolean>) => void
}

export function BentoGroupedCheckbox({items=[], setState=()=>{}, ...props}: BentoGroupedCheckboxProps & StackProps) {
    const [values, setValues] = useState<Record<string, boolean>>(() =>
        items.reduce(
            (a, b) => ({
                ...a,
                [b.id]: b.checked,
            }),
            {}
        )
    )

    const onValuesChange = debounce((values: any) => {
        setValues(values)
        setState(values)
    })

    return (
        <Stack {...props}>
            <Checkboxes values={values} onValuesChange={onValuesChange}>
                <Checkboxes.FocusGroup
                    // maxWidth={420}
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                    loop
                >
                    <Checkboxes.Group orientation="vertical" flexShrink={1}>
                        {items.map((item) => (
                            <Checkboxes.FocusGroup.Item value={item.id} key={item.id}>
                                <Item checked={values[item.id]} key={item.id} item={item} />
                            </Checkboxes.FocusGroup.Item>
                        ))}
                    </Checkboxes.Group>
                </Checkboxes.FocusGroup>
            </Checkboxes>
        </Stack>

    )
}



function Item({
    item,
    checked,
}: {
    item: Item
    checked: boolean
}) {
    const { id, image } = item

    return (
        <YGroup.Item>
            <Checkboxes.Card
                flexDirection="row"
                backgroundColor={checked ? '$backgroundPress' : '$backgroundTransparent'}
                borderColor={checked ? '$borderColorPress' : '$borderColor'}
                marginBottom={-1}
                borderWidth={1}
                alignItems="center"
                gap="$3"
                width="100%"
                padding="$3.5"
                minHeight={90}
                cursor="pointer"
                $sm={{
                    gap: '$2',
                }}
            >
                <Avatar circular size="$6">
                    <Avatar.Image src={image} />
                    <Avatar.Fallback borderColor="$background" />
                </Avatar>
                <View flexDirection="column" flex={1} gap="$1">
                    <View flexDirection="row" gap="$3" f={1}>
                        <Checkboxes.Checkbox.Label size="$5" lh="$2" htmlFor={id}>
                            {item.title}
                        </Checkboxes.Checkbox.Label>
                        {item.chip &&
                            <SizableText
                                theme={item.chipColor??'green'}
                                backgroundColor="$color6"
                                borderRadius={100_000}
                                color="$color9"
                                fontSize="$1"
                                fontWeight="$1"
                                lineHeight="$1"
                                marginRight="auto"
                                paddingHorizontal="$2"
                                paddingVertical="$0.5"
                                y={-1}>
                                {item.chip}
                            </SizableText>
                        }

                        <Checkboxes.Checkbox marginLeft="auto" id={id} alignSelf="flex-start">
                            <Checkboxes.Checkbox.Indicator>
                                <Check />
                            </Checkboxes.Checkbox.Indicator>
                        </Checkboxes.Checkbox>
                    </View>
                    <SizableText
                        numberOfLines={2}
                        fontSize="$3"
                        lineHeight="$3"
                        fontWeight="300"
                        col="$gray9"
                    >
                        {item.description}
                    </SizableText>
                </View>
            </Checkboxes.Card>
        </YGroup.Item>
    )
}