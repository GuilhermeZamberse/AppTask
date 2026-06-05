import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  date: string;
  time: string;
}

interface TaskContextData {
  tasks: Task[];
  addTask: (text: string, date: string, time: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, text: string, date: string, time: string) => void;
}

const TaskContext = createContext<TaskContextData>({} as TaskContextData);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth(); // Importa o usuário ativo para isolar os dados
  const [tasks, setTasks] = useState<Task[]>([]);

  // Regra: Define uma chave única de armazenamento para cada e-mail
  const getStorageKey = () => {
    return user?.email ? `@tasks:${user.email.toLowerCase()}` : null;
  };

  // Efeito 1: Carrega as tarefas específicas sempre que o usuário mudar (Login/Logout/Troca de conta)
  useEffect(() => {
    const loadTasks = async () => {
      const key = getStorageKey();
      if (key) {
        const saved = await AsyncStorage.getItem(key);
        if (saved) {
          setTasks(JSON.parse(saved));
        } else {
          setTasks([]); // Se for um usuário novo sem tarefas, limpa a tela anterior
        }
      } else {
        setTasks([]); // Se ninguém estiver logado, garante tela limpa
      }
    };
    loadTasks();
  }, [user]); // Monitora a mudança do objeto 'user' do AuthContext

  // Efeito 2: Grava as tarefas no banco apenas na chave do usuário atual quando a lista mudar
  useEffect(() => {
    const saveTasks = async () => {
      const key = getStorageKey();
      if (key && tasks) {
        await AsyncStorage.setItem(key, JSON.stringify(tasks));
      }
    };
    saveTasks();
  }, [tasks]);

  const addTask = (text: string, date: string, time: string) => {
    const newTask = { 
      id: Date.now().toString(), 
      text, 
      completed: false, 
      date: date || new Date().toLocaleDateString('pt-BR'), 
      time: time || "10:00" 
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const editTask = (id: string, text: string, date: string, time: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, text, date, time } : t));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask, editTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);