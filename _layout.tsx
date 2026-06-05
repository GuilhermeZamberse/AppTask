import { Stack } from 'expo-router';
import { TaskProvider } from './contexts/TaskContext';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext'; // Importado

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TaskProvider>
          <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
            <Stack.Screen name="(auth)/login" />
            <Stack.Screen name="(auth)/register" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="settings/index" />
            <Stack.Screen name="settings/notifications" />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          </Stack>
        </TaskProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}