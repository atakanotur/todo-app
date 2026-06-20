import { StyleSheet } from 'react-native'
import { ColorPalette } from '@/source/features/theme/types/theme.types'

export const createStyles = (colors: ColorPalette) => StyleSheet.create({
  text: {
    color: colors.text,
  },
})
