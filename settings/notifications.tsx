import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export default function NotificationsScreen() {
  const router = useRouter();
  const [tasksEnabled, setTasksEnabled] = useState<boolean>(true);
  const [eventsEnabled, setEventsEnabled] = useState<boolean>(true);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Feather name="arrow-left" size={20} color="#3B82F6" />
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Notificações</Text>
      <Text style={styles.subtitle}>Gerencie suas preferências</Text>

      <View style={styles.rowCard}>
        <View style={styles.iconWrapper}><Feather name="check-square" size={20} color="#3B82F6" /></View>
        <View style={{ flex: 1 }}><Text style={styles.rowTitle}>Tarefas</Text><Text style={styles.rowSubtitle}>Alertas de tarefas pendentes</Text></View>
        <Switch 
          value={tasksEnabled} 
          onValueChange={(value: boolean) => setTasksEnabled(value)} 
          trackColor={{ false: '#767577', true: '#3B82F6' }} 
        />
      </View>

      <View style={styles.rowCard}>
        <View style={styles.iconWrapper}><Feather name="calendar" size={20} color="#3B82F6" /></View>
        <View style={{ flex: 1 }}><Text style={styles.rowTitle}>Eventos</Text><Text style={styles.rowSubtitle}>Lembretes de eventos</Text></View>
        <Switch 
          value={eventsEnabled} 
          onValueChange={(value: boolean) => setEventsEnabled(value)} 
          trackColor={{ false: '#767577', true: '#3B82F6' }} 
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingHorizontal: 20, paddingTop: 40 },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 10 },
  backText: { color: '#3B82F6', fontSize: 16, marginLeft: 6 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#FFF' },
  subtitle: { fontSize: 14, color: '#9CA3AF', marginBottom: 24 },
  rowCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A2232', borderRadius: 16, padding: 16, marginBottom: 12 },
  iconWrapper: { width: 40, height: 40, backgroundColor: '#111315', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  rowTitle: { fontSize: 16, fontWeight: '600', color: '#FFF' },
  rowSubtitle: { fontSize: 12, color: '#9CA3AF', marginTop: 2 }
});