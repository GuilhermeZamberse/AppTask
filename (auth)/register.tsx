import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

export default function RegisterScreen() {
  const router = useRouter();
  const { registerUser } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }

    const result = await registerUser(name, email, password);

    if (result.success) {
      Alert.alert('Sucesso', 'Cadastro realizado! Faça login para entrar.', [
        { text: 'Ir para Login', onPress: () => router.replace('/(auth)/login') }
      ]);
    } else {
      Alert.alert('Erro', result.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.brandContainer}>
        <View style={styles.logoIcon}>
          <Feather name="check-square" size={32} color="#FFF" />
        </View>
        <Text style={styles.brandName}>AppTask</Text>
        <Text style={styles.brandSubtitle}>Gerencie suas tarefas com facilidade</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Criar Conta</Text>

        <Text style={styles.label}>Nome</Text>
        <View style={styles.inputContainer}>
          <Feather name="user" size={18} color="#9CA3AF" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Seu nome completo"
            placeholderTextColor="#4B5563"
            value={name}
            onChangeText={setName}
          />
        </View>

        <Text style={styles.label}>E-mail</Text>
        <View style={styles.inputContainer}>
          <Feather name="mail" size={18} color="#9CA3AF" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="seu@email.com"
            placeholderTextColor="#4B5563"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <Text style={styles.label}>Senha</Text>
        <View style={styles.inputContainer}>
          <Feather name="lock" size={18} color="#9CA3AF" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="........"
            placeholderTextColor="#4B5563"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Já tem conta? </Text>
        <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
          <Text style={styles.footerLink}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', paddingHorizontal: 24 },
  brandContainer: { alignItems: 'center', marginBottom: 32 },
  logoIcon: { width: 64, height: 64, backgroundColor: '#3B82F6', borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  brandName: { fontSize: 32, fontWeight: 'bold', color: '#FFF', marginBottom: 4 },
  brandSubtitle: { fontSize: 14, color: '#9CA3AF' },
  card: { backgroundColor: '#111315', borderRadius: 20, padding: 24, borderWidth: 1, borderColor: '#1F2225' },
  cardTitle: { fontSize: 22, fontWeight: 'bold', color: '#FFF', marginBottom: 24 },
  label: { fontSize: 14, color: '#FFF', marginBottom: 8, fontWeight: '500' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1D1F', borderRadius: 12, borderWidth: 1, borderColor: '#2A2F33', marginBottom: 20, paddingHorizontal: 14 },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, color: '#FFF', height: 48, fontSize: 15 },
  button: { backgroundColor: '#2E4485', borderRadius: 12, height: 48, justifyContent: 'center', alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  footerText: { color: '#9CA3AF', fontSize: 14 },
  footerLink: { color: '#3B82F6', fontSize: 14, fontWeight: '600' },
});