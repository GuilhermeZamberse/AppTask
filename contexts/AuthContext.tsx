import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  name: string;
  email: string;
  password?: string;
}

interface AuthContextData {
  user: User | null;
  registerUser: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  loginUser: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logoutUser: () => Promise<void>;
  updateUserName: (newName: string) => Promise<void>;
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

  const registerUser = async (name: string, email: string, password: string) => {
    try {
      const savedUsers = await AsyncStorage.getItem('@AppTask:registered_users');
      const usersList: User[] = savedUsers ? JSON.parse(savedUsers) : [];

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

      const loggedUserData = { name: foundUser.name, email: foundUser.email };
      setUser(loggedUserData);
      await AsyncStorage.setItem('@AppTask:logged_user', JSON.stringify(loggedUserData));
      
      return { success: true, message: 'Logado com sucesso!' };
    } catch (error) {
      return { success: false, message: 'Erro ao efetuuar login.' };
    }
  };

  const logoutUser = async () => {
    setUser(null);
    await AsyncStorage.removeItem('@AppTask:logged_user');
  };

  const updateUserName = async (newName: string) => {
    if (!user || !newName.trim()) return;

    try {
      // 1. Atualiza a sessão ativa do usuário no estado e armazenamento local
      const updatedLoggedUser = { ...user, name: newName };
      setUser(updatedLoggedUser);
      await AsyncStorage.setItem('@AppTask:logged_user', JSON.stringify(updatedLoggedUser));

      // 2. Persiste a alteração do nome na lista de cadastrados gerais
      const savedUsers = await AsyncStorage.getItem('@AppTask:registered_users');
      if (savedUsers) {
        const usersList: User[] = JSON.parse(savedUsers);
        const updatedList = usersList.map(u => 
          u.email.toLowerCase() === user.email.toLowerCase() ? { ...u, name: newName } : u
        );
        await AsyncStorage.setItem('@AppTask:registered_users', JSON.stringify(updatedList));
      }
    } catch (error) {
      console.log('Erro ao atualizar o nome:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, registerUser, loginUser, logoutUser, updateUserName }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);