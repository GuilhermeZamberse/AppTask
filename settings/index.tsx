import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

export default function SettingsScreen() {
  const router = useRouter();
  const { isDarkMode, toggleTheme, colors } = useTheme();

  const SettingRow = ({ icon, title, subtitle, onPress, hasSwitch, switchValue, onSwitchChange }: any) => (
    <TouchableOpacity 
      style={[styles.rowCard, { backgroundColor: colors.card, borderColor: colors.border }]} 
      onPress={onPress} 
      disabled={hasSwitch}
    >
      <View style={[styles.iconWrapper, { backgroundColor: isDarkMode ? '#1A1D1F' : '#F3F4F6' }]}>
        <Feather name={icon} size={20} color={colors.accent} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.rowTitle, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.rowSubtitle, { color: colors.subtext }]}>{subtitle}</Text>
      </View>
      {hasSwitch ? (
        <Switch 
          value={switchValue} 
          onValueChange={onSwitchChange} 
          trackColor={{ true: colors.accent, false: '#3E3E3E' }} 
        />
      ) : (
        <Feather name="chevron-right" size={18} color={colors.subtext} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Feather name="arrow-left" size={20} color={colors.accent} />
        <Text style={[styles.backText, { color: colors.accent }]}>Voltar</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: colors.text }]}>Configurações</Text>
      <Text style={[styles.subtitle, { color: colors.subtext }]}>Personalize seu aplicativo</Text>

      <Text style={[styles.sectionHeader, { color: colors.text }]}>Geral</Text>
      <SettingRow 
        icon="moon" 
        title="Modo escuro" 
        subtitle="Tema escuro para o app" 
        hasSwitch 
        switchValue={isDarkMode} 
        onSwitchChange={toggleTheme} 
      />
      <SettingRow 
        icon="globe" 
        title="Idioma" 
        subtitle="Português (Brasil)" 
        onPress={() => {}} 
      />

      <Text style={[styles.sectionHeader, { color: colors.text }]}>Outros</Text>
      <SettingRow icon="lock" title="Privacidade" subtitle="Gerencie suas preferências de privacidade" onPress={() => {}} />
      <SettingRow icon="help-circle" title="Ajuda" subtitle="Central de ajuda e suporte" onPress={() => {}} />
      <SettingRow icon="info" title="Sobre" subtitle="Versão 1.0.0" onPress={() => {}} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 16 },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 10 },
  backText: { fontSize: 16, marginLeft: 6 },
  title: { fontSize: 32, fontWeight: 'bold' },
  subtitle: { fontSize: 14, marginBottom: 24 },
  sectionHeader: { fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 12 },
  rowCard: { flexDirection: 'row', alignItems: 'center', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1 },
  iconWrapper: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  textContainer: { flex: 1 },
  rowTitle: { fontSize: 16, fontWeight: '600' },
  rowSubtitle: { fontSize: 12, marginTop: 2 }
});