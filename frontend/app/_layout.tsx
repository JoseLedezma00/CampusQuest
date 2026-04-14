// app/_layout.tsx
// Layout raíz de la app. Define todas las pantallas de la navegación.
// Estructura: Bienvenida → Login (sin tabs)

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Pantalla de Bienvenida — primera pantalla que ve el usuario */}
        <Stack.Screen name="index" options={{ headerShown: false }} />

        {/* Pantalla de Login */}
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
