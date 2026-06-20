import React, { memo, useCallback } from "react";
import { Pressable, PressableProps, Text, TextStyle, ViewStyle, ActivityIndicator } from "react-native";
import { styles } from "./Button.styles";

export interface ButtonProps extends Omit<PressableProps, 'style'> {
    label: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
    style?: ViewStyle;
    labelStyle?: TextStyle;
}

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

export const Button = memo<ButtonProps>(({
    label,
    variant = 'primary',
    size = 'md',
    loading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    disabled,
    style,
    onPress,
    ...rest
}) => {
    const isDisabled = disabled || loading;

    const handlePress = useCallback(
        (e: any) => {
            if (!isDisabled) onPress?.(e);
        },
        [isDisabled, onPress]
    );

    return (
        <Pressable
            style={({ pressed }) => [
                styles.base,
                styles[variant],
                styles[size],
                fullWidth && styles.fullWidth,
                isDisabled && styles.disabled,
                pressed && !isDisabled && styles.pressed,
                style,
            ]}
            onPress={handlePress}
            disabled={isDisabled}
            accessibilityRole="button"
            accessibilityState={{ disabled: isDisabled, busy: loading }}
            accessibilityLabel={label}
            {...rest}
        >
            {loading ? (
                <ActivityIndicator
                    size="small"
                    color={variant === 'primary' ? '#fff' : '#007AFF'}
                    testID="button-loading"
                />
            ) : (
                <>
                    {leftIcon}
                    <Text style={[styles.label, styles[`${variant}Label`], styles[`${size}Label`]]}>
                        {label}
                    </Text>
                    {rightIcon}
                </>
            )}
        </Pressable>
    );
});

Button.displayName = 'Button';