import React from 'react'
import { Check } from '@tamagui/lucide-icons'
import { useEffect, useId, useState } from 'react'
import { Text, View, Avatar, debounce } from 'tamagui'
import { Checkboxes } from './bento/components/checkboxParts'
import { SizableText, Spacer, StackProps } from '@my/ui'

type BentoCheckboxListProps = {
    items: {
        title: string,
        checked: boolean,
        desc: string,
        key: string,
        picture: string
    }[],
    title?: string,
    subtitle?: string,
    setState?: (newState: Record<string, boolean>) => void
}

export function BentoCheckboxList({items=[], title, subtitle, setState=()=>{}, ...props}: BentoCheckboxListProps & StackProps) {
  const [values, setValues] = useState<Record<string, boolean>>([] as any)
  const uniqueId = useId()

  useEffect(() => {
    setValues(Object.fromEntries(items.map((item) => [item.key, item.checked])))
  }, [])

  const onValuesChange = debounce((values: any) => {
    setValues(values)
    setState(values)
  })

  return (
    <Checkboxes
      values={values}
      onValuesChange={onValuesChange}
      borderColor="$color6"
      borderWidth={0.5}
      bs="solid"
      maxWidth="100%"
      borderRadius={20}
      overflow="hidden"
      $gtXs={{
        elevation: '$3',
      }}
      $xxs={{
        borderWidth: 0,
        borderRadius: 0,
        backgroundColor: '$background',
      }}
      {...props}
    >
      <Checkboxes.FocusGroup f={1}>
        <View
          flexDirection="column"
          paddingVertical="$4"
          alignSelf="center"
          alignItems="center"
        >
          {title && <Checkboxes.Title alignSelf="center">{title}</Checkboxes.Title>}
          {subtitle && <SizableText fontSize="$3" fontWeight="$3" lineHeight="$3" theme="alt1">
            {subtitle}
          </SizableText> }
        </View>
        <View flexDirection="column">
          {items?.map((value, i) => (
            <Checkboxes.FocusGroup.Item value={value.key}>
              <CheckboxItem
                isLastItem={i === items.length - 1}
                item={value}
                key={value.key}
                uniqueId={uniqueId}
              />
            </Checkboxes.FocusGroup.Item>
          ))}
        </View>
      </Checkboxes.FocusGroup>
    </Checkboxes>
  )
}



function CheckboxItem({
  item,
  isLastItem,
  uniqueId,
}: {
  item: (typeof items)[number]
  isLastItem: boolean
  uniqueId: string
}) {
  const { desc, title, key } = item

  return (
    <Checkboxes.Card
      flexDirection="row"
      backgroundColor="transparent"
      flex={1}
      paddingHorizontal="$4"
      borderRadius={0}
      cursor="pointer"
      gap="$4"
      paddingVertical="$3"
      borderWidth={0}
      alignItems="center"
      $xxs={{
        paddingHorizontal: '$3',
        gap: '$3',
        borderLeftWidth: 0,
        borderRightWidth: 0,
      }}
    >
      <Avatar
        circular
        size="$4"
        $xxs={{
          size: '$3',
        }}
      >
        <Avatar.Image src={item.picture} />
        <Avatar.Fallback borderColor="$background" />
      </Avatar>
      <View flexDirection="column" flex={1}>
        <View flexDirection="row" alignItems="center" justifyContent="space-between">
          <Checkboxes.Checkbox.Label size="$4" lineHeight="$2" htmlFor={key + uniqueId}>
            {title}
          </Checkboxes.Checkbox.Label>
          <Checkboxes.Checkbox marginLeft="auto" id={key + uniqueId}>
            <Checkboxes.Checkbox.Indicator>
              <Check />
            </Checkboxes.Checkbox.Indicator>
          </Checkboxes.Checkbox>
        </View>
        <SizableText fontSize="$2" fontWeight="$2" lineHeight="$2" theme="alt1">
          {desc}
        </SizableText>
      </View>
    </Checkboxes.Card>
  )
}