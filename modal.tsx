import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTasks } from './contexts/TaskContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

export default function TaskModal() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { addTask, editTask } = useTasks();
  
  const isEditing = !!params.id;

  const [text, setText] = useState('');
  
  // dateValue guarda a data interna para o componente de roleta funcionar
  const [dateValue, setDateValue] = useState(new Date());
  
  // Novos estados para controlar o texto que aparece nos botões
  const [displayDate, setDisplayDate] = useState('');
  const [displayTime, setDisplayTime] = useState('');

  // Fallbacks para Web
  const [webDate, setWebDate] = useState('');
  const [webTime, setWebTime] = useState('');
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    if (isEditing) {
      // Se for edição, carrega os dados existentes
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
      // Se for ADICIONAR NOVA TAREFA, deixa tudo em branco
      setText('');
      setDisplayDate(''); // <--- Fica em branco
      setDisplayTime(''); // <--- Fica em branco
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
      // Ao selecionar, preenche o texto do botão
      setDisplayDate(selectedDate.toLocaleDateString('pt-BR'));
    }
  };

  const onChangeTime = (event: any, selectedDate?: Date) => {
    setShowTimePicker(false);
    if (event.type === 'set' && selectedDate) {
      const newDate = new Date(dateValue);
      newDate.setHours(selectedDate.getHours(), selectedDate.getMinutes());
      setDateValue(newDate);
      // Ao selecionar, preenche o texto do botão
      setDisplayTime(selectedDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
    }
  };

  const handleSave = () => {
    if (!text.trim()) return;

    // Se o usuário não selecionou nada e não digitou na web, usamos a data atual como padrão ao salvar
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>{isEditing ? 'Editar Atividade' : 'O que precisa ser feito?'}</Text>
        <TextInput 
          style={styles.input} 
          value={text} 
          onChangeText={setText} 
          placeholder="Ex: Estudar Engenharia" 
          placeholderTextColor="#6B7280"
          autoFocus 
        />
        
        <View style={styles.row}>
          <View style={{flex: 1, marginRight: 10}}>
            <Text style={styles.label}>Data</Text>
            {Platform.OS === 'web' ? (
              <TextInput 
                style={styles.input} 
                value={webDate} 
                onChangeText={setWebDate} 
                placeholder="DD/MM/YYYY" 
                placeholderTextColor="#6B7280"
              />
            ) : (
              <TouchableOpacity style={styles.pickerButton} onPress={() => setShowDatePicker(true)}>
                {/* Mostra a data selecionada ou um placeholder cinza se estiver vazio */}
                <Text style={[styles.pickerButtonText, !displayDate && {color: '#6B7280'}]}>
                  {displayDate || 'DD/MM/YYYY'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          
          <View style={{flex: 1}}>
            <Text style={styles.label}>Hora</Text>
            {Platform.OS === 'web' ? (
              <TextInput 
                style={styles.input} 
                value={webTime} 
                onChangeText={setWebTime} 
                placeholder="00:00" 
                placeholderTextColor="#6B7280"
              />
            ) : (
              <TouchableOpacity style={styles.pickerButton} onPress={() => setShowTimePicker(true)}>
                <Text style={[styles.pickerButtonText, !displayTime && {color: '#6B7280'}]}>
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
            onChange={onChangeDate}
          />
        )}

        {showTimePicker && Platform.OS !== 'web' && (
          <DateTimePicker
            value={dateValue}
            mode="time"
            is24Hour={true}
            display="spinner" 
            onChange={onChangeTime}
          />
        )}

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>{isEditing ? 'Salvar Alterações' : 'Confirmar'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
  backButton: { alignSelf: 'flex-start', padding: 5 },
  content: { paddingHorizontal: 25, paddingBottom: 25 },
  label: { fontSize: 16, fontWeight: 'bold', color: '#FFF', marginBottom: 8 },
  input: { backgroundColor: '#1F2937', color: '#FFF', borderRadius: 12, padding: 15, fontSize: 16, marginBottom: 20 },
  row: { flexDirection: 'row', marginBottom: 20 },
  pickerButton: { backgroundColor: '#1F2937', borderRadius: 12, padding: 15, alignItems: 'center', minHeight: 55, justifyContent: 'center' },
  pickerButtonText: { color: '#FFF', fontSize: 16 },
  saveButton: { backgroundColor: '#3B82F6', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  saveButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});