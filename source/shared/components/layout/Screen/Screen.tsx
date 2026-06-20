import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import {
    SafeAreaView,
    SafeAreaViewProps,
} from 'react-native-safe-area-context';

import { useTheme } from '@/source/features/theme/hooks/useTheme';
import { UI } from '@/source/shared/constants/ui';
import { styles } from './Screen.styles';

const { spacing } = UI;

export interface ScreenProps extends SafeAreaViewProps {
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    withPadding?: boolean;
}

export const Screen: React.FC<ScreenProps> = ({
    children,
    style,
    withPadding = true,
    edges = ['top'],
    ...rest
}) => {
    const { colors } = useTheme();

    return (
        <SafeAreaView
            edges={edges}
            style={[
                styles.container,
                withPadding && styles.padding,
                { backgroundColor: colors.background },
                style,
            ]}
            {...rest}
        >
            {children}
        </SafeAreaView>
    );
};

Screen.displayName = 'Screen';