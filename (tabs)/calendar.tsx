import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useTasks } from '../contexts/TaskContext'; 
import { TaskItem } from '../../components/TaskItem'; 
import { useRouter } from 'expo-router';

// Configuração do calendário para Português (Brasil)
LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ],
  monthNamesShort: ['Jan.', 'Fev.', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul.', 'Ago', 'Set.', 'Out.', 'Nov.', 'Dez.'],
  dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

export default function CalendarScreen() {
  const router = useRouter();
  const { tasks, toggleTask, deleteTask } = useTasks();

  const markedDates = tasks.reduce((acc, task) => {
    const parts = task.date.split('/');
    if (parts.length === 3) {
      const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
      acc[formattedDate] = { marked: true, dotColor: '#3B82F6' };
    }
    return acc;
  }, {} as any);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Calendário</Text>
        <Text style={styles.headerSubtitle}>Seus compromissos</Text>
      </View>

      <View style={styles.calendarCard}>
        <Calendar 
          markedDates={markedDates} 
          theme={{ 
            calendarBackground: '#1F2937',
            textSectionTitleColor: '#9CA3AF',
            dayTextColor: '#FFF',
            todayTextColor: '#3B82F6',
            selectedDayTextColor: '#FFF',
            monthTextColor: '#FFF',
            selectedDayBackgroundColor: '#3B82F6',
            arrowColor: '#3B82F6',
            dotColor: '#3B82F6' 
          }} 
        />
      </View>

      <View style={styles.footer}>
        {/* TEXTO ALTERADO AQUI */}
        <Text style={styles.footerTitle}>Atividades</Text>
        
        <FlatList 
          data={tasks}
          keyExtractor={(item) => item.id}
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
            /* TEXTO ALTERADO AQUI */
            <Text style={{ textAlign: 'center', color: '#9CA3AF', marginTop: 20 }}>
              Nenhuma Atividade
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { padding: 20, marginTop: 10 },
  headerTitle: { fontSize: 32, fontWeight: 'bold', color: '#FFF' },
  headerSubtitle: { fontSize: 16, color: '#9CA3AF' },
  calendarCard: { backgroundColor: '#1F2937', margin: 20, borderRadius: 16, padding: 10 },
  footer: { padding: 20, flex: 1 },
  footerTitle: { fontSize: 22, fontWeight: 'bold', color: '#FFF', marginBottom: 15 }
});