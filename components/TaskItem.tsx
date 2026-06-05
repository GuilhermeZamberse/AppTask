import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  date: string;
  time: string;
}

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

export function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  const { colors } = useTheme();

  // TRAVA DE SEGURANÇA INTELIGENTE:
  // Se a cor de fundo global da tela NÃO for preta (ou seja, a tela está no modo claro),
  // forçamos o card a ser branco puro (#FFFFFF) e o texto escuro (#111827).
  const fundoTelaEhEscuro = colors.background === '#000000' || colors.background === '#000';
  
  const cardBackgroundColor = fundoTelaEhEscuro ? colors.card : '#FFFFFF';
  const textColor = fundoTelaEhEscuro ? colors.text : '#111827';
  const subtextColor = fundoTelaEhEscuro ? colors.subtext : '#4B5563';
  const borderColor = fundoTelaEhEscuro ? colors.border : '#E5E7EB';

  return (
    <View style={[styles.card, { backgroundColor: cardBackgroundColor, borderColor: borderColor }]}>
      <TouchableOpacity onPress={onToggle} style={styles.checkButton}>
        <Feather 
          name={task.completed ? "check-square" : "square"} 
          size={22} 
          color={task.completed ? colors.accent : subtextColor} 
        />
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <Text style={[
          styles.taskText, 
          { color: textColor }, 
          task.completed && [styles.completedText, { color: subtextColor }]
        ]}>
          {task.text}
        </Text>
        
        <View style={styles.dateTimeRow}>
          <View style={styles.infoGroup}>
            <Feather name="calendar" size={12} color={subtextColor} style={styles.icon} />
            <Text style={[styles.infoText, { color: subtextColor }]}>{task.date}</Text>
          </View>
          <View style={styles.infoGroup}>
            <Feather name="clock" size={12} color={subtextColor} style={styles.icon} />
            <Text style={[styles.infoText, { color: subtextColor }]}>{task.time}</Text>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
          <Ionicons name="pencil" size={20} color={colors.accent} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
          <Ionicons name="trash" size={20} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  checkButton: {
    marginRight: 12,
    padding: 4,
  },
  contentContainer: {
    flex: 1,
    marginRight: 8,
  },
  taskText: {
    fontSize: 16,
    fontWeight: '600',
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  dateTimeRow: {
    flexDirection: 'row',
    marginTop: 6,
  },
  infoGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    marginRight: 4,
  },
  infoText: {
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 6,
    marginLeft: 4,
  },
});