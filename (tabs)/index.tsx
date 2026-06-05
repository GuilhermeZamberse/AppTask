import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useTasks } from '../contexts/TaskContext';
import { TaskItem } from '../../components/TaskItem';
import { useRouter } from 'expo-router';

export default function TasksList() {
  const router = useRouter();
  const { tasks, toggleTask, deleteTask } = useTasks();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        <View style={styles.header}>
          <Text style={styles.title}>Atividades</Text>
        </View>

        <FlatList 
          data={tasks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={tasks.length === 0 ? styles.emptyContainer : styles.listContainer}
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
            <Text style={styles.emptyText}>Nenhuma Atividade Pendente</Text>
          }
        />

        {/* Botão Inferior Conforme a Imagem de Design Original */}
        <TouchableOpacity style={styles.floatingButton} onPress={() => router.push('/modal')}>
          <Text style={styles.floatingButtonText}>+ Adicionar Nova Tarefa</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#000' },
  container: { flex: 1, paddingHorizontal: 20, paddingBottom: 20 },
  header: { marginTop: 40, marginBottom: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#FFF' },
  listContainer: { paddingBottom: 100 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 100 },
  emptyText: { color: '#9CA3AF', fontSize: 16, textAlign: 'center' },
  floatingButton: { 
    backgroundColor: '#3B82F6', 
    padding: 16, 
    borderRadius: 14, 
    alignItems: 'center', 
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5
  },
  floatingButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});