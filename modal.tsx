import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTasks } from './contexts/TaskContext';
import { useTheme } from './contexts/ThemeContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

export default function TaskModal() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { addTask, editTask } = useTasks();
  const { colors, isDarkMode } = useTheme();
  
  const isEditing = !!params.id;

  const [text, setText] = useState('');
  const [dateValue, setDateValue] = useState(new Date());
  const [displayDate, setDisplayDate] = useState('');
  const [displayTime, setDisplayTime] = useState('');

  const [webDate, setWebDate] = useState('');
  const [webTime, setWebTime] = useState('');
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setText((params.text as string) || '');
      setDisplayDate((params.date as string) || '');
      setDisplayTime((params.time as string) || '');
      setWebDate((params.date as string) || '');
      setWebTime((params.time as string) || '');

      if (params.date && params.time) {
        const [day, month, year] = (params.date as string).split('/');
        const [hours, minutes] = (params.time as string).split(':');
        setDateValue(new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes)));
      }
    } else {
      setText('');
      setDisplayDate(''); 
      setDisplayTime(''); 
      setWebDate('');
      setWebTime('');
      setDateValue(new Date());
    }
  }, [params.id, params.text, params.date, params.time]);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (event.type === 'set' && selectedDate) {
      const newDate = new Date(dateValue);
      newDate.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
      setDateValue(newDate);
      setDisplayDate(selectedDate.toLocaleDateString('pt-BR'));
    }
  };

  const onChangeTime = (event: any, selectedDate?: Date) => {
    setShowTimePicker(false);
    if (event.type === 'set' && selectedDate) {
      const newDate = new Date(dateValue);
      newDate.setHours(selectedDate.getHours(), selectedDate.getMinutes());
      setDateValue(newDate);
      setDisplayTime(selectedDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
    }
  };

  const handleSave = () => {
    if (!text.trim()) return;

    const finalDate = Platform.OS === 'web' 
      ? (webDate || new Date().toLocaleDateString('pt-BR')) 
      : (displayDate || new Date().toLocaleDateString('pt-BR'));
      
    const finalTime = Platform.OS === 'web' 
      ? (webTime || "10:00") 
      : (displayTime || "10:00");

    if (isEditing) {
      editTask(params.id as string, text, finalDate, finalTime);
    } else {
      addTask(text, finalDate, finalTime);
    }
    
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={[styles.label, { color: colors.text }]}>{isEditing ? 'Editar Atividade' : 'O que precisa ser feito?'}</Text>
        <TextInput 
          style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text }]} 
          value={text} 
          onChangeText={setText} 
          placeholder="Ex: Estudar Engenharia" 
          placeholderTextColor={colors.subtext}
          autoFocus 
        />
        
        <View style={styles.row}>
          <View style={{flex: 1, marginRight: 10}}>
            <Text style={[styles.label, { color: colors.text }]}>Data</Text>
            {Platform.OS === 'web' ? (
              <TextInput 
                style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text }]} 
                value={webDate} 
                onChangeText={setWebDate} 
                placeholder="DD/MM/YYYY" 
                placeholderTextColor={colors.subtext}
              />
            ) : (
              <TouchableOpacity style={[styles.pickerButton, { backgroundColor: colors.inputBg }]} onPress={() => setShowDatePicker(true)}>
                <Text style={[styles.pickerButtonText, { color: colors.text }, !displayDate && {color: colors.subtext}]}>
                  {displayDate || 'DD/MM/YYYY'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          
          <View style={{flex: 1}}>
            <Text style={[styles.label, { color: colors.text }]}>Hora</Text>
            {Platform.OS === 'web' ? (
              <TextInput 
                style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text }]} 
                value={webTime} 
                onChangeText={setWebTime} 
                placeholder="00:00" 
                placeholderTextColor={colors.subtext}
              />
            ) : (
              <TouchableOpacity style={[styles.pickerButton, { backgroundColor: colors.inputBg }]} onPress={() => setShowTimePicker(true)}>
                <Text style={[styles.pickerButtonText, { color: colors.text }, !displayTime && {color: colors.subtext}]}>
                  {displayTime || '00:00'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {showDatePicker && Platform.OS !== 'web' && (
          <DateTimePicker
            value={dateValue}
            mode="date"
            display="default" 
            themeVariant={isDarkMode ? 'dark' : 'light'}
            onChange={onChangeDate}
          />
        )}

        {showTimePicker && Platform.OS !== 'web' && (
          <DateTimePicker
            value={dateValue}
            mode="time"
            is24Hour={true}
            display="spinner" 
            themeVariant={isDarkMode ? 'dark' : 'light'}
            onChange={onChangeTime}
          />
        )}

        <TouchableOpacity style={[styles.saveButton, { backgroundColor: colors.accent }]} onPress={handleSave}>
          <Text style={styles.saveButtonText}>{isEditing ? 'Salvar Alterações' : 'Confirmar'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
  backButton: { alignSelf: 'flex-start', padding: 5 },
  content: { paddingHorizontal: 25, paddingBottom: 25 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  input: { borderRadius: 12, padding: 15, fontSize: 16, marginBottom: 20 },
  row: { flexDirection: 'row', marginBottom: 20 },
  pickerButton: { borderRadius: 12, padding: 15, alignItems: 'center', minHeight: 55, justifyContent: 'center' },
  pickerButtonText: { fontSize: 16 },
  saveButton: { padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  saveButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});