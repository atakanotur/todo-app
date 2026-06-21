export const ROUTES = {
  INDEX: '/',
  AUTH: {
    ROOT: '/(auth)',
    LOGIN: '/(auth)/login',
    REGISTER: '/(auth)/register',
    ONBOARDING: '/(auth)/onboarding',
  },
  TABS: {
    ROOT: '/(tabs)',
    HOME: '/(tabs)',
    EXPLORE: '/(tabs)/explore',
    PROFILE: '/(tabs)/profile',
  },
  PROTECTED: {
    ROOT: '/(protected)',
    SETTINGS: '/(protected)/settings',
    EDIT_PROFILE: '/(protected)/edit-profile',
    CREATE_TODO: '/(protected)/create-todo',
  },
} as const
