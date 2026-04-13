// app/_layout.tsx
// Layout raíz de la app. Define todas las pantallas de la navegación.
//
// CAMBIO: Se agregó la pantalla "index" (Bienvenida) como punto de entrada,
// antes de que el usuario llegue al login y luego a las tabs.

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  // La pantalla inicial es la de bienvenida (app/index.tsx)
  anchor: 'index',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Pantalla de Bienvenida — sin header */}
        <Stack.Screen name="index" options={{ headerShown: false }} />

        {/* Tabs (Login + Mapa) — sin header, el propio tab bar lo maneja */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Modal genérico */}
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
