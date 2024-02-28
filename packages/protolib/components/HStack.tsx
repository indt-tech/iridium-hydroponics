import React from "react"
import { StackProps, XStack } from "tamagui"

const HStack = React.forwardRef((props: StackProps, ref:any) => (
    //@ts-ignore
    <XStack ref={ref} {...props}>
        {props.children}
    </XStack>
))

export default HStack