import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#3B82F6',
      tabBarInactiveTintColor: '#9CA3AF',
      tabBarStyle: {
        backgroundColor: '#111315',
        borderTopColor: '#1F2225',
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