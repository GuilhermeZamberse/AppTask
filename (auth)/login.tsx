import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext'; // Importado para controle dinâmico

export default function LoginScreen() {
  const router = useRouter();
  const { loginUser } = useAuth();
  const { colors } = useTheme(); // Consumindo as cores dinâmicas

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Atenção', 'Preencha o e-mail e a senha.');
      return;
    }

    const result = await loginUser(email, password);

    if (result.success) {
      router.replace('/(tabs)');
    } else {
      Alert.alert('Erro de Acesso', result.message);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.brandContainer}>
        <View style={[styles.logoIcon, { backgroundColor: colors.accent }]}>
          <Feather name="check-square" size={32} color="#FFF" />
        </View>
        <Text style={[styles.brandName, { color: colors.text }]}>AppTask</Text>
        <Text style={[styles.brandSubtitle, { color: colors.subtext }]}>Gerencie suas tarefas com facilidade</Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Entrar</Text>

        <Text style={[styles.label, { color: colors.text }]}>E-mail</Text>
        <View style={[styles.inputContainer, { backgroundColor: colors.inputBg, borderColor: colors.border }]}>
          <Feather name="mail" size={18} color={colors.subtext} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="seu@email.com"
            placeholderTextColor={colors.subtext}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <Text style={[styles.label, { color: colors.text }]}>Senha</Text>
        <View style={[styles.inputContainer, { backgroundColor: colors.inputBg, borderColor: colors.border }]}>
          <Feather name="lock" size={18} color={colors.subtext} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="........"
            placeholderTextColor={colors.subtext}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={[styles.button, { backgroundColor: colors.accent }]} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.subtext }]}>Não tem conta? </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
          <Text style={[styles.footerLink, { color: colors.accent }]}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 24 },
  brandContainer: { alignItems: 'center', marginBottom: 32 },
  logoIcon: { width: 64, height: 64, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  brandName: { fontSize: 32, fontWeight: 'bold', marginBottom: 4 },
  brandSubtitle: { fontSize: 14 },
  card: { borderRadius: 20, padding: 24, borderWidth: 1 },
  cardTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 24 },
  label: { fontSize: 14, marginBottom: 8, fontWeight: '500' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, borderWidth: 1, marginBottom: 20, paddingHorizontal: 14 },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, height: 48, fontSize: 15 },
  button: { borderRadius: 12, height: 48, justifyContent: 'center', alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  footerText: { fontSize: 14 },
  footerLink: { fontSize: 14, fontWeight: '600' },
});