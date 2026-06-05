import React, { useState } from 'react';
// CORREÇÃO: Platform adicionado na linha de import abaixo
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Switch, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

export default function NotificationsScreen() {
  const router = useRouter();
  const { colors, isDarkMode } = useTheme();

  const [tasksEnabled, setTasksEnabled] = useState<boolean>(true);
  const [eventsEnabled, setEventsEnabled] = useState<boolean>(true);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* BOTÃO VOLTAR */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Feather name="arrow-left" size={20} color={colors.accent} />
        <Text style={[styles.backText, { color: colors.accent }]}>Voltar</Text>
      </TouchableOpacity>

      {/* TÍTULOS */}
      <Text style={[styles.title, { color: colors.text }]}>Notificações</Text>
      <Text style={[styles.subtitle, { color: colors.subtext }]}>Gerencie suas preferências</Text>

      {/* CARD 1: TAREFAS */}
      <View style={[styles.rowCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={[styles.iconWrapper, { backgroundColor: isDarkMode ? '#111315' : colors.background }]}>
          <Feather name="check-square" size={20} color={colors.accent} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.rowTitle, { color: colors.text }]}>Tarefas</Text>
          <Text style={[styles.rowSubtitle, { color: colors.subtext }]}>Alertas de tarefas pendentes</Text>
        </View>
        <Switch 
          value={tasksEnabled} 
          onValueChange={(value: boolean) => setTasksEnabled(value)} 
          trackColor={{ false: '#767577', true: colors.accent }} 
          thumbColor={Platform.OS === 'android' ? (tasksEnabled ? colors.accent : '#f4f3f4') : undefined}
        />
      </View>

      {/* CARD 2: EVENTOS */}
      <View style={[styles.rowCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={[styles.iconWrapper, { backgroundColor: isDarkMode ? '#111315' : colors.background }]}>
          <Feather name="calendar" size={20} color={colors.accent} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.rowTitle, { color: colors.text }]}>Eventos</Text>
          <Text style={[styles.rowSubtitle, { color: colors.subtext }]}>Lembretes de eventos</Text>
        </View>
        <Switch 
          value={eventsEnabled} 
          onValueChange={(value: boolean) => setEventsEnabled(value)} 
          trackColor={{ false: '#767577', true: colors.accent }} 
          thumbColor={Platform.OS === 'android' ? (eventsEnabled ? colors.accent : '#f4f3f4') : undefined}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 40 },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 10 },
  backText: { fontSize: 16, marginLeft: 6 },
  title: { fontSize: 32, fontWeight: 'bold' },
  subtitle: { fontSize: 14, marginBottom: 24 },
  rowCard: { flexDirection: 'row', alignItems: 'center', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1 },
  iconWrapper: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  textContainer: { flex: 1 },
  rowTitle: { fontSize: 16, fontWeight: '600' },
  rowSubtitle: { fontSize: 12, marginTop: 2 }
});