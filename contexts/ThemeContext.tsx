import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeColors {
  background: string;
  card: string;
  text: string;
  subtext: string;
  border: string;
  accent: string;
  inputBg: string;
}

interface ThemeContextData {
  isDarkMode: boolean;
  toggleTheme: () => void;
  colors: ThemeColors;
}

const lightTheme: ThemeColors = {
  background: '#F3F4F6', // Cinza claro para o fundo da tela
  card: '#FFFFFF',       // BRANCO para o cartão da tarefa se destacar
  text: '#111827',       // Texto escuro
  subtext: '#4B5563',    // Subtextos cinza escuro
  border: '#E5E7EB',     // Bordas claras
  accent: '#3B82F6',     // Azul padrão
  inputBg: '#E5E7EB'
};

const darkTheme: ThemeColors = {
  background: '#000000', // Preto puro para o fundo da tela
  card: '#1A2232',       // Cinza escuro para destacar os cards no fundo preto
  text: '#FFFFFF',       // Texto branco puro
  subtext: '#9CA3AF',    // Subtextos cinza claro
  border: '#2E3A4E',     // Borda sutil escura
  accent: '#3B82F6',     // Azul padrão
  inputBg: '#111315'
};

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('@AppTask:theme');
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark');
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newValue = !isDarkMode;
    setIsDarkMode(newValue);
    await AsyncStorage.setItem('@AppTask:theme', newValue ? 'dark' : 'light');
  };

  const colors = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);