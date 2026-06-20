export type ThemeMode = 'light' | 'dark' | 'system';

export interface ColorPalette {
  background: string;
  card: string;
  text: string;
  primary: string;
  border: string;
  notification: string;
}

export interface AppTheme {
  colors: ColorPalette;
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  typography: {
    fontSize: {
      small: number;
      medium: number;
      large: number;
    };
  };
}