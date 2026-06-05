import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useTasks } from '../contexts/TaskContext'; 
import { useTheme } from '../contexts/ThemeContext';
import { TaskItem } from '../../components/TaskItem'; // Importação corrigida e direta
import { useRouter } from 'expo-router';

LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan.', 'Fev.', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul.', 'Ago', 'Set.', 'Out.', 'Nov.', 'Dez.'],
  dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

export default function CalendarScreen() {
  const router = useRouter();
  const { tasks, toggleTask, deleteTask } = useTasks();
  const { colors, isDarkMode } = useTheme();

  const markedDates = tasks.reduce((acc, task) => {
    const parts = task.date.split('/');
    if (parts.length === 3) {
      const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
      acc[formattedDate] = { marked: true, dotColor: colors.accent };
    }
    return acc;
  }, {} as any);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Calendário</Text>
        <Text style={[styles.headerSubtitle, { color: colors.subtext }]}>Seus compromissos</Text>
      </View>

      <View style={[styles.calendarCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Calendar 
          markedDates={markedDates} 
          theme={{ 
            backgroundColor: colors.card,
            calendarBackground: colors.card,
            textSectionTitleColor: colors.subtext,
            dayTextColor: colors.text,
            todayTextColor: colors.accent,
            selectedDayTextColor: '#FFF',
            monthTextColor: colors.text,
            selectedDayBackgroundColor: colors.accent,
            arrowColor: colors.accent,
            dotColor: colors.accent,
            textDisabledColor: isDarkMode ? '#4B5563' : '#D1D5DB'
          }} 
        />
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerTitle, { color: colors.text }]}>Atividades</Text>
        
        <FlatList 
          data={tasks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ backgroundColor: 'transparent' }}
          renderItem={({ item }) => (
            <TaskItem 
              task={item} 
              onToggle={() => toggleTask(item.id)} 
              onDelete={() => deleteTask(item.id)}
              onEdit={() => router.push({
                pathname: '/modal',
                params: { id: item.id, text: item.text, date: item.date, time: item.time }
              })} 
            />
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', color: colors.subtext, marginTop: 20 }}>
              Nenhuma Atividade
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, marginTop: 10 },
  headerTitle: { fontSize: 32, fontWeight: 'bold' },
  headerSubtitle: { fontSize: 16 },
  calendarCard: { margin: 20, borderRadius: 16, padding: 10, borderWidth: 1 },
  footer: { padding: 20, flex: 1 },
  footerTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 }
});