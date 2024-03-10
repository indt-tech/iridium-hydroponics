
import { AlertCircle } from '@tamagui/lucide-icons'
import React, { useId, useRef, ReactNode } from 'react'
import type { SizeTokens } from 'tamagui';
import { View } from 'tamagui'
import { Input } from './bento/components/inputsParts'
import type { TextInput } from 'react-native'
import { useForwardFocus } from './bento/hooks/useForwardFocus'
import { ButtonProps, InputProps } from '@my/ui';

/**
 * note: make sure to use the same width for the Input and the Input.Area
 */
type BentoInputProps = {
    size?: SizeTokens,
    label?: string,
    error?: string,
    message?: string,
    placeholder?: string,
    children?: ReactNode,
    leftIcon?: any,
    rightIcon?: any,
    leftButton?: any,
    rightButton?: any,
    leftButtonProps?: ButtonProps,
    rightButtonProps?: ButtonProps,
    onRightButtonPress?: any,
    onLeftButtonPress?: any
}
export function BentoInput({
    size = "$3",
    label,
    error,
    message,
    placeholder,
    children,
    leftIcon,
    rightIcon,
    leftButton,
    rightButton,
    leftButtonProps,
    rightButtonProps,
    onRightButtonPress = () => { },
    onLeftButtonPress = () => { },
    ...inputProps
}: BentoInputProps & InputProps) {
    const uniqueId = useId()
    const inputRef = useRef<TextInput>(null)
    const focusTrigger = useForwardFocus(inputRef)
    return (
        <View flexDirection="column" justifyContent="center" alignItems="center">
            <Input
                {...(error && {
                    theme: 'red',
                })}
                size={size}
            >
                {label && <Input.Label htmlFor={uniqueId}>{label}</Input.Label>}
                <Input.Box>
                    {leftButton && <Input.Section>
                        <Input.Button onPress={onLeftButtonPress} {...leftButtonProps}>
                            <Input.Icon>
                                {leftButton}
                            </Input.Icon>
                        </Input.Button>
                    </Input.Section>}
                    <Input.Section>
                        {error && (
                            <Input.Icon {...focusTrigger}>
                                <AlertCircle />
                            </Input.Icon>
                        )}
                        {leftIcon && (
                            <Input.Icon {...focusTrigger}>
                                {leftIcon}
                            </Input.Icon>
                        )}
                        <Input.Area
                            ref={inputRef}
                            paddingLeft={0}
                            id={uniqueId}
                            placeholder={placeholder}
                            {...inputProps}
                        />
                        {rightIcon && (
                            <Input.Icon {...focusTrigger}>
                                {rightIcon}
                            </Input.Icon>
                        )}
                    </Input.Section>
                    {rightButton && <Input.Section>
                        <Input.Button onPress={onRightButtonPress} {...rightButtonProps}>
                            <Input.Icon>
                                {rightButton}
                            </Input.Icon>
                        </Input.Button>
                    </Input.Section>}
                </Input.Box>
                {error && <Input.Info>{error}</Input.Info>}
                {!error && message && <Input.Info>{message}</Input.Info>}
                {children}
            </Input>
        </View>
    )
}
