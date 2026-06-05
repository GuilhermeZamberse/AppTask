import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  name: string;
  email: string;
  password?: string; // Armazenamos temporariamente para validação
}

interface AuthContextData {
  user: User | null;
  registerUser: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  loginUser: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logoutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadSavedUser = async () => {
      const saved = await AsyncStorage.getItem('@AppTask:logged_user');
      if (saved) setUser(JSON.parse(saved));
    };
    loadSavedUser();
  }, []);

  // REGRA: Apenas salva o usuário na lista de cadastrados, NÃO loga ele direto
  const registerUser = async (name: string, email: string, password: string) => {
    try {
      const savedUsers = await AsyncStorage.getItem('@AppTask:registered_users');
      const usersList: User[] = savedUsers ? JSON.parse(savedUsers) : [];

      // Verifica se o e-mail já está cadastrado
      const userExists = usersList.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (userExists) {
        return { success: false, message: 'Este e-mail já está cadastrado!' };
      }

      const newUser = { name, email: email.toLowerCase(), password };
      usersList.push(newUser);

      await AsyncStorage.setItem('@AppTask:registered_users', JSON.stringify(usersList));
      return { success: true, message: 'Cadastro realizado com sucesso!' };
    } catch (error) {
      return { success: false, message: 'Erro ao salvar cadastro.' };
    }
  };

  // REGRA: Só permite entrar se o e-mail e a senha baterem com alguém da lista
  const loginUser = async (email: string, password: string) => {
    try {
      const savedUsers = await AsyncStorage.getItem('@AppTask:registered_users');
      const usersList: User[] = savedUsers ? JSON.parse(savedUsers) : [];

      const foundUser = usersList.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (!foundUser) {
        return { success: false, message: 'E-mail ou senha incorretos / Usuário não cadastrado.' };
      }

      // Salva apenas os dados públicos do usuário logado
      const loggedUserData = { name: foundUser.name, email: foundUser.email };
      setUser(loggedUserData);
      await AsyncStorage.setItem('@AppTask:logged_user', JSON.stringify(loggedUserData));
      
      return { success: true, message: 'Logado com sucesso!' };
    } catch (error) {
      return { success: false, message: 'Erro ao efetuar login.' };
    }
  };

  const logoutUser = async () => {
    setUser(null);
    await AsyncStorage.removeItem('@AppTask:logged_user');
  };

  return (
    <AuthContext.Provider value={{ user, registerUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);