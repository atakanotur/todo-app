export const UI = {
  spacing: {
    xxxs: 2,
    xxs: 4,
    xs: 6,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    huge: 40,
    giant: 48,
    massive: 64,
  },

  radius: {
    none: 0,
    xs: 4,
    sm: 6,
    md: 10,
    lg: 14,
    xl: 20,
    xxl: 28,
    pill: 999,
    full: 9999,
  },

  size: {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 56,
    xxl: 64,
  },

  button: {
    height: {
      sm: 36,
      md: 44,
      lg: 52,
    },
    minWidth: 120,
    borderRadius: 999,
    paddingHorizontal: {
      sm: 12,
      md: 16,
      lg: 20,
    },
  },

  icon: {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
    xxl: 40,
    xxxl: 48,
  },

  borderWidth: {
    none: 0,
    hairline: 0.5,
    thin: 1,
    normal: 2,
    thick: 3,
    heavy: 4,
  },

  opacity: {
    disabled: 0.4,
    muted: 0.6,
    subtle: 0.8,
    full: 1,
  },

  fontSize: {
    xxxs: 10,
    xxs: 12,
    xs: 13,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 28,
    displaySm: 32,
    displayMd: 40,
    displayLg: 48,
  },

  lineHeight: {
    xs: 16,
    sm: 18,
    md: 22,
    lg: 26,
    xl: 30,
    xxl: 36,
    display: 44,
  },

  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    heavy: '800',
  },

  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
  },

  zIndex: {
    base: 0,
    dropdown: 10,
    sticky: 20,
    overlay: 30,
    modal: 40,
    toast: 50,
  },

  shadow: {
    sm: {
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000',
      shadowOpacity: 0.15,
      shadowRadius: 16,
      elevation: 6,
    },
  },

  card: {
    padding: 16,
    borderRadius: 16,
    gap: 12,
  },

  input: {
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
} as const

export type UIConstants = typeof UI
