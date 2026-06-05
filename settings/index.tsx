import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export default function SettingsScreen() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);

  const SettingRow = ({ icon, title, subtitle, onPress, hasSwitch, switchValue, onSwitchChange }: any) => (
    <TouchableOpacity style={styles.rowCard} onPress={onPress} disabled={hasSwitch}>
      <View style={styles.iconWrapper}>
        <Feather name={icon} size={20} color="#3B82F6" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowSubtitle}>{subtitle}</Text>
      </View>
      {hasSwitch ? (
        <Switch value={switchValue} onValueChange={onSwitchChange} trackColor={{ true: '#3B82F6', false: '#3E3E3E' }} />
      ) : (
        <Feather name="chevron-right" size={18} color="#4B5563" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Feather name="arrow-left" size={20} color="#3B82F6" />
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Configurações</Text>
      <Text style={styles.subtitle}>Personalize seu aplicativo</Text>

      <Text style={styles.sectionHeader}>Geral</Text>
      <SettingRow 
        icon="moon" 
        title="Modo escuro" 
        subtitle="Tema escuro para o app" 
        hasSwitch 
        switchValue={darkMode} 
        onSwitchChange={setDarkMode} 
      />
      <SettingRow 
        icon="globe" 
        title="Idioma" 
        subtitle="Português (Brasil)" 
        onPress={() => {}} 
      />

      <Text style={styles.sectionHeader}>Outros</Text>
      <SettingRow icon="lock" title="Privacidade" subtitle="Gerencie suas preferências de privacidade" onPress={() => {}} />
      <SettingRow icon="help-circle" title="Ajuda" subtitle="Central de ajuda e suporte" onPress={() => {}} />
      <SettingRow icon="info" title="Sobre" subtitle="Versão 1.0.0" onPress={() => {}} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingHorizontal: 20, paddingTop: 16 },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backText: { color: '#3B82F6', fontSize: 16, marginLeft: 6 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#FFF' },
  subtitle: { fontSize: 14, color: '#9CA3AF', marginBottom: 24 },
  sectionHeader: { fontSize: 18, fontWeight: 'bold', color: '#FFF', marginTop: 16, marginBottom: 12 },
  rowCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111315', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#1F2225' },
  iconWrapper: { width: 40, height: 40, backgroundColor: '#1A1D1F', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  textContainer: { flex: 1 },
  rowTitle: { fontSize: 16, fontWeight: '600', color: '#FFF' },
  rowSubtitle: { fontSize: 12, color: '#9CA3AF', marginTop: 2 }
});