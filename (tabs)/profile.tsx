import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useTasks } from '../contexts/TaskContext';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext'; // Importação do tema
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  const { tasks } = useTasks();
  const { user, logoutUser, updateUserName } = useAuth();
  const { colors } = useTheme(); // Consumo do tema dinâmico

  // Estados para controlar o modo de edição inline (direto na tela)
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');

  const completedCount = tasks ? tasks.filter(t => t.completed).length : 0;
  const totalTasks = tasks ? tasks.length : 0;
  const progress = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  const handleLogout = async () => {
    await logoutUser();
    router.replace('/(auth)/login');
  };

  // Ativa o campo de texto com o nome atual do usuário
  const handleStartEditing = () => {
    setEditedName(user?.name || '');
    setIsEditing(true);
  };

  // Salva o novo nome e fecha o campo de texto
  const handleSaveName = async () => {
    if (editedName.trim()) {
      await updateUserName(editedName.trim());
    }
    setIsEditing(false);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* HEADER DA TELA */}
      <View style={styles.topHeader}>
        <Ionicons name="person-outline" size={24} color={colors.text} />
        <Text style={[styles.topTitle, { color: colors.text }]}>Perfil</Text>
      </View>

      {/* CARD DE INFORMAÇÕES DO USUÁRIO */}
      <View style={[styles.profileCard, { backgroundColor: colors.card }]}>
        <View style={styles.userInfoRow}>
          <View style={[styles.avatar, { backgroundColor: colors.accent }]}>
             <Ionicons name="person" size={40} color="#FFF" />
          </View>
          
          {/* Container de texto ajustado para respeitar os limites do card */}
          <View style={styles.textContainer}>
            {isEditing ? (
              /* SE ESTIVER EM MODO DE EDIÇÃO: Mostra o input e o botão de salvar do lado */
              <View style={[styles.editInputContainer, { backgroundColor: colors.background, borderColor: colors.border }]}>
                <TextInput
                  style={[styles.inlineInput, { color: colors.text }]}
                  value={editedName}
                  onChangeText={setEditedName}
                  placeholder="Novo nome"
                  placeholderTextColor={colors.subtext}
                  autoFocus
                />
                <TouchableOpacity style={styles.saveInlineButton} onPress={handleSaveName}>
                  <Feather name="check" size={18} color="#FFF" />
                </TouchableOpacity>
              </View>
            ) : (
              /* Mostra o nome ajustado em até 2 linhas caso seja longo */
              <Text style={[styles.userName, { color: colors.text }]} numberOfLines={2}>
                {user?.name || 'Carregando...'}
              </Text>
            )}
            
            {/* E-MAIL EXIBIDO: Tamanho reduzido e proteção contra cortes */}
            <Text style={[styles.userEmail, { color: colors.subtext }]} numberOfLines={1}>
              {user?.email || 'Carregando...'}
            </Text>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={[styles.statNum, { color: colors.text }]}>{totalTasks}</Text>
            <Text style={[styles.statLabel, { color: colors.subtext }]}>Tarefas</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNum, { color: colors.text }]}>{completedCount}</Text>
            <Text style={[styles.statLabel, { color: colors.subtext }]}>Concluídas</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNum, { color: '#A855F7' }]}>{progress}%</Text>
            <Text style={[styles.statLabel, { color: colors.subtext }]}>Progresso</Text>
          </View>
        </View>
      </View>

      {/* MENU DE OPÇÕES */}
      <View style={styles.menuContainer}>
        {/* BOTÃO DE EDITAR PERFIL */}
        <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.card }]} onPress={handleStartEditing}>
          <View style={styles.menuItemLeft}>
            <Feather name="edit-3" size={20} color={colors.accent} />
            <Text style={[styles.menuItemText, { color: colors.text }]}>Editar Perfil</Text>
          </View>
          <Feather name="chevron-right" size={18} color={colors.subtext} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.card }]} onPress={() => router.push('/settings/notifications')}>
          <View style={styles.menuItemLeft}>
            <Feather name="bell" size={20} color={colors.accent} />
            <Text style={[styles.menuItemText, { color: colors.text }]}>Notificações</Text>
          </View>
          <Feather name="chevron-right" size={18} color={colors.subtext} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.card }]} onPress={() => router.push('/settings')}>
          <View style={styles.menuItemLeft}>
            <Feather name="settings" size={20} color={colors.accent} />
            <Text style={[styles.menuItemText, { color: colors.text }]}>Configurações</Text>
          </View>
          <Feather name="chevron-right" size={18} color={colors.subtext} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.card }]} onPress={handleLogout}>
          <View style={styles.menuItemLeft}>
            <Feather name="log-out" size={20} color="#EF4444" />
            <Text style={[styles.menuItemText, { color: '#EF4444' }]}>Sair</Text>
          </View>
          <Feather name="chevron-right" size={18} color={colors.subtext} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 40, marginBottom: 20 },
  topTitle: { fontSize: 28, fontWeight: 'bold', marginLeft: 10 },
  profileCard: { marginHorizontal: 20, borderRadius: 20, padding: 20, marginBottom: 20 },
  userInfoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  avatar: { width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  
  textContainer: { 
    flex: 1, 
    justifyContent: 'center',
    flexShrink: 1 
  },
  userName: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    flexWrap: 'wrap'
  },
  userEmail: { 
    fontSize: 12, 
    marginTop: 4,
    flexWrap: 'nowrap' 
  },

  divider: { height: 1, marginBottom: 20 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  statItem: { alignItems: 'center' },
  statNum: { fontSize: 22, fontWeight: 'bold' },
  statLabel: { fontSize: 12, marginTop: 4 },
  menuContainer: { paddingHorizontal: 20 },
  menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 18, borderRadius: 16, marginBottom: 12 },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center' },
  menuItemText: { fontSize: 16, fontWeight: '500', marginLeft: 14 },
  
  editInputContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderRadius: 8, 
    borderWidth: 1, 
    paddingHorizontal: 8,
    marginRight: 4,
    width: '100%'
  },
  inlineInput: { 
    flex: 1, 
    fontSize: 15, 
    height: 36, 
    padding: 0 
  },
  saveInlineButton: { 
    backgroundColor: '#3B82F6', 
    borderRadius: 6, 
    width: 28, 
    height: 28, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginLeft: 4
  }
});