import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      const saved = await AsyncStorage.getItem('@tasks');
      if (saved) setTasks(JSON.parse(saved));
    };
    loadTasks();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('@tasks', JSON.stringify(tasks));
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