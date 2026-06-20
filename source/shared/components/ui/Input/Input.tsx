import { memo } from 'react'
import React, { forwardRef, useCallback, useState } from 'react'
import { Pressable, TextInput, TextInputProps, View, ViewStyle } from 'react-native'
import { Text } from '../Text'
import { useTheme } from '@/source/features/theme/hooks/useTheme'
import { createStyles } from './Input.styles'

export interface InputProps extends TextInputProps {
    label?: string
    error?: string
    hint?: string
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    onRightIconPress?: () => void
    containerStyle?: ViewStyle
    required?: boolean
}

export const Input = memo(forwardRef<TextInput, InputProps>(
    (
        {
            label,
            error,
            hint,
            leftIcon,
            rightIcon,
            onRightIconPress,
            containerStyle,
            required = false,
            editable = true,
            onFocus,
            onBlur,
            style,
            ...rest
        },
        ref
    ) => {
        const { colors } = useTheme();
        const styles = createStyles(colors);
        const [isFocused, setIsFocused] = useState(false)

        const handleFocus = useCallback(
            (e: any) => {
                setIsFocused(true)
                onFocus?.(e)
            },
            [onFocus]
        )

        const handleBlur = useCallback(
            (e: any) => {
                setIsFocused(false)
                onBlur?.(e)
            },
            [onBlur]
        )

        const hasError = Boolean(error)

        return (
            <View style={[styles.wrapper, containerStyle]}>
                {label && (
                    <Text variant="sm" weight="medium" color="text">
                        {label}
                        {required && <Text variant="sm" weight="medium" color="notification"> *</Text>}
                    </Text>
                )}

                <View
                    style={[
                        styles.inputContainer,
                        isFocused && styles.inputFocused,
                        hasError && styles.inputError,
                        !editable && styles.inputDisabled,
                    ]}
                >
                    {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}

                    <TextInput
                        ref={ref}
                        style={[
                            styles.input,
                            leftIcon ? styles.inputWithLeftIcon : undefined,
                            rightIcon ? styles.inputWithRightIcon : undefined,
                            style
                        ]}
                        placeholderTextColor={colors.border}
                        editable={editable}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        accessibilityLabel={label}
                        accessibilityHint={hint}
                        accessibilityState={{ disabled: !editable }}
                        {...rest}
                    />

                    {rightIcon && (
                        <Pressable
                            style={styles.iconRight}
                            onPress={onRightIconPress}
                            hitSlop={8}
                            accessibilityRole={onRightIconPress ? 'button' : 'none'}
                        >
                            {rightIcon}
                        </Pressable>
                    )}
                </View>

                {(error || hint) && (
                    <Text variant="xs" color={hasError ? 'notification' : '#8E8E93'}>
                        {error || hint}
                    </Text>
                )}
            </View>
        )
    }
))

Input.displayName = 'Input'
