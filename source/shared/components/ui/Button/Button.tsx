import React, { memo, useCallback } from "react";
import { Pressable, PressableProps, ViewStyle, ActivityIndicator, StyleProp } from "react-native";
import { Text } from "../Text";
import { useTheme } from "@/source/features/theme/hooks/useTheme";
import { createStyles } from "./Button.styles";

export interface ButtonProps extends Omit<PressableProps, 'style'> {
    label: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
    style?: StyleProp<ViewStyle>;
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
    const { colors } = useTheme();
    const styles = createStyles(colors);

    const isDisabled = disabled || loading;

    const handlePress = useCallback(
        (e: any) => {
            if (!isDisabled) onPress?.(e);
        },
        [isDisabled, onPress]
    );

    const getTextColor = () => {
        if (variant === 'primary' || variant === 'danger') return '#FFFFFF'; // White text on solid backgrounds
        if (variant === 'ghost') return 'primary';
        return 'text'; 
    };

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
                    color={variant === 'primary' || variant === 'danger' ? '#FFFFFF' : colors.primary}
                    testID="button-loading"
                />
            ) : (
                <>
                    {leftIcon}
                    <Text 
                        variant={size === 'sm' ? 'sm' : size === 'md' ? 'md' : 'lg'} 
                        weight="semibold" 
                        color={getTextColor()}
                    >
                        {label}
                    </Text>
                    {rightIcon}
                </>
            )}
        </Pressable>
    );
});

Button.displayName = 'Button';