import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { AppTheme } from '../constants/Theme';

export default function RootLayout() {
  return (
    <PaperProvider theme={AppTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </PaperProvider>
  );
}

