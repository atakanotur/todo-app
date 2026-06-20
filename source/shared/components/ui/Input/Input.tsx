import { memo } from 'react'
import React, { forwardRef, useCallback, useState } from 'react'
import { Pressable, Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native'
import { styles } from './Input.styles'

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
                    <Text style={styles.label}>
                        {label}
                        {required && <Text style={styles.required}> *</Text>}
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
                        placeholderTextColor="#8E8E93"
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
                    <Text style={[styles.helperText, hasError && styles.errorText]}>
                        {error || hint}
                    </Text>
                )}
            </View>
        )
    }
))

Input.displayName = 'Input'
