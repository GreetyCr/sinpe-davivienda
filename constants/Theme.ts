import { MD3LightTheme } from 'react-native-paper';
import { Colors } from './Colors';

export const AppTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: Colors.primary.red,
    secondary: Colors.primary.blue,
    tertiary: Colors.primary.orange,
    error: Colors.status.error,
    background: Colors.background.primary,
    surface: Colors.background.secondary,
    onPrimary: Colors.text.white,
    onSecondary: Colors.text.white,
    onBackground: Colors.text.primary,
    onSurface: Colors.text.primary,
  },
  roundness: 12,
};

export type AppThemeType = typeof AppTheme;

