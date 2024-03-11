import React from 'react'
import { Check, Clock, Dot } from '@tamagui/lucide-icons'
import { Checkboxes } from './bento/components/checkboxParts'
import { useState } from 'react'
import { Text, View, debounce } from 'tamagui'

//TODO: visual problems, still not activated or properly parametrized
const packages = [
  {
    title: 'Toys',
    description: 'A package of toys',
    itemsCounts: 621,
    color: 'red',
  },
  {
    title: 'Books',
    description: 'A package of books',
    itemsCounts: 621,
    color: 'green',
  },
  {
    title: 'Clothes',
    description: 'A package of clothes',
    itemsCounts: 621,
    color: 'blue',
  },
  {
    title: 'Games',
    description: 'A package of games',
    itemsCounts: 18,
    color: 'yellow',
  },
] as const

export function BentoCheckboxCards() {
  const [values, setValues] = useState({
    Toys: false,
    Books: false,
    Clothes: false,
  })

  // Note: debounce is used to prevent multiple state updates that could toggle previous values
  const toggleValues = debounce((values: any) => {
    setValues((prev) => ({ ...prev, ...values }))
  }, 10)

  return (
    <Checkboxes
      values={values}
      onValuesChange={(values) => toggleValues(values)}
      gap="$4"
      width="100%"
      padding="$4"
      $sm={{
        padding: 0,
      }}
    >
      <Checkboxes.Title>Select your Gift</Checkboxes.Title>

      <Checkboxes.FocusGroup width="100%" flexDirection="row" gap="$3" flexWrap="wrap">
        {packages.map((item) => (
          <Checkboxes.FocusGroup.Item value={item.title} key={item.title} flexBasis={300}>
            <Checkboxes.Card height={150}>
              <View flexDirection="column" gap="$1">
                <View flexDirection="row" justifyContent="space-between">
                  <View
                    flexDirection="row"
                    theme={item.color}
                    paddingHorizontal="$2.5"
                    paddingVertical="$1"
                    backgroundColor="$color6"
                    borderRadius="$4"
                  >
                    <Dot marginLeft={-9} marginRight={-3} color="$color10" />
                    <Text col="$color9" fontSize="$4" fontWeight="$4" lineHeight="$4">
                      {item.title}
                    </Text>
                  </View>

                  <Checkboxes.Checkbox>
                    <Checkboxes.Checkbox.Indicator>
                      <Check />
                    </Checkboxes.Checkbox.Indicator>
                  </Checkboxes.Checkbox>
                </View>
                <Text fontSize="$5" fontWeight="$5" lineHeight="$5" theme="alt1">
                  {item.description}
                </Text>
              </View>
              <View flexDirection="row" gap="$2" marginTop="auto" alignItems="center">
                <Clock color="$color10" size={14} />
                <Text fontWeight="300" theme="alt2">
                  last bought 2 hr ago
                </Text>
              </View>
            </Checkboxes.Card>
          </Checkboxes.FocusGroup.Item>
        ))}
      </Checkboxes.FocusGroup>
    </Checkboxes>
  )
}
