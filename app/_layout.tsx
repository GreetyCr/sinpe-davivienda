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
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="tabs" />
      </Stack>
    </PaperProvider>
  );
}

