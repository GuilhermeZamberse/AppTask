import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.accent,
      tabBarInactiveTintColor: colors.subtext,
      tabBarStyle: {
        backgroundColor: colors.card,
        borderTopColor: colors.border,
        height: 60,
        paddingBottom: 8,
        paddingTop: 8
      }
    }}>
      <Tabs.Screen 
        name="index" 
        options={{
          title: 'Atividades',
          tabBarIcon: ({ color }) => <Feather name="list" size={22} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="calendar" 
        options={{
          title: 'Calendário',
          tabBarIcon: ({ color }) => <Feather name="calendar" size={22} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <Feather name="user" size={22} color={color} />
        }} 
      />
    </Tabs>
  );
}