import React, { memo } from "react";
import { Text as RNText, TextProps as RNTextProps, TextStyle } from "react-native";
import { useTheme } from "@/source/features/theme/hooks/useTheme";
import { UI } from "@/source/shared/constants/ui";
import { ColorPalette } from "@/source/features/theme/types/theme.types";
import { createStyles } from "./Text.styles";

export interface TextProps extends RNTextProps {
    /**
     * Typography variant based on UI.fontSize constants
     * @default 'md'
     */
    variant?: keyof typeof UI.fontSize;
    /**
     * Font weight based on UI.fontWeight constants
     * @default 'regular'
     */
    weight?: keyof typeof UI.fontWeight;
    /**
     * Color from the active theme palette
     * @default 'text'
     */
    color?: keyof ColorPalette | string;
    /**
     * Text alignment
     * @default 'auto'
     */
    align?: TextStyle['textAlign'];
}

export const Text = memo<TextProps>(({
    children,
    style,
    variant = 'md',
    weight = 'regular',
    color = 'text',
    align = 'auto',
    ...rest
}) => {
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Fallback logic for color in case a direct string is passed instead of theme key
    const textColor = Object.keys(colors).includes(color as string) 
      ? colors[color as keyof ColorPalette] 
      : color as string;

    const customStyles: TextStyle = {
        fontSize: UI.fontSize[variant],
        fontWeight: UI.fontWeight[weight],
        color: textColor,
        textAlign: align,
    };

    return (
        <RNText style={[styles.text, customStyles, style]} {...rest}>
            {children}
        </RNText>
    )
})