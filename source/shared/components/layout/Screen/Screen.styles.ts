import { StyleSheet } from 'react-native'
import { UI } from '@/source/shared/constants/ui'

const { spacing } = UI

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  padding: {
    paddingHorizontal: spacing.sm,
    gap: spacing.sm,
  },
})
