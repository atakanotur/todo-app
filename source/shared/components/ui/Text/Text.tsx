import React, { memo } from "react";
import { Text as RNText, TextProps as RNTextProps } from "react-native";
import { styles } from "./Text.styles";

export interface TextProps extends RNTextProps {
}

export const Text = memo<TextProps>(({
    children,
    style
}) => {
    return (
        <RNText style={[style, styles.text]}>
            {children}
        </RNText>
    )
})