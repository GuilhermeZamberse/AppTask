import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useTasks } from '../contexts/TaskContext';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  const { tasks } = useTasks();
  const { user, logoutUser } = useAuth();

  const completedCount = tasks ? tasks.filter(t => t.completed).length : 0;
  const totalTasks = tasks ? tasks.length : 0;
  const progress = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  const handleLogout = async () => {
    await logoutUser();
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topHeader}>
        <Ionicons name="person-outline" size={24} color="#FFF" />
        <Text style={styles.topTitle}>Perfil</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.userInfoRow}>
          <View style={styles.avatar}>
             <Ionicons name="person" size={40} color="#FFF" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.userName} numberOfLines={1}>
              {user?.name || 'João Silva'}
            </Text>
            <Text style={styles.userEmail} numberOfLines={1}>
              {user?.email || 'joao.silva@email.com'}
            </Text>
          </View>
        </View>

        {/* CORRIGIDO: Mudado de <div> para <View> */}
        <View style={styles.divider} />

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNum}>{totalTasks}</Text>
            <Text style={styles.statLabel}>Tarefas</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNum}>{completedCount}</Text>
            <Text style={styles.statLabel}>Concluídas</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNum, { color: '#A855F7' }]}>{progress}%</Text>
            <Text style={styles.statLabel}>Progresso</Text>
          </View>
        </View>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/settings/notifications')}>
          <View style={styles.menuItemLeft}>
            <Feather name="bell" size={20} color="#3B82F6" />
            <Text style={styles.menuItemText}>Notificações</Text>
          </View>
          <Feather name="chevron-right" size={18} color="#4B5563" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/settings')}>
          <View style={styles.menuItemLeft}>
            <Feather name="settings" size={20} color="#3B82F6" />
            <Text style={styles.menuItemText}>Configurações</Text>
          </View>
          <Feather name="chevron-right" size={18} color="#4B5563" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <View style={styles.menuItemLeft}>
            <Feather name="log-out" size={20} color="#EF4444" />
            <Text style={[styles.menuItemText, { color: '#EF4444' }]}>Sair</Text>
          </View>
          <Feather name="chevron-right" size={18} color="#4B5563" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  topHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 40, marginBottom: 20 },
  topTitle: { fontSize: 28, fontWeight: 'bold', color: '#FFF', marginLeft: 10 },
  profileCard: { backgroundColor: '#1A2232', marginHorizontal: 20, borderRadius: 20, padding: 20, marginBottom: 20 },
  userInfoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#3B82F6', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  userName: { fontSize: 22, fontWeight: 'bold', color: '#FFF' },
  userEmail: { fontSize: 14, color: '#9CA3AF', marginTop: 2 },
  divider: { height: 1, backgroundColor: '#2E3A4E', marginBottom: 20 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  statItem: { alignItems: 'center' },
  statNum: { fontSize: 22, fontWeight: 'bold', color: '#FFF' },
  statLabel: { fontSize: 12, color: '#9CA3AF', marginTop: 4 },
  menuContainer: { paddingHorizontal: 20 },
  menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#1A2232', padding: 18, borderRadius: 16, marginBottom: 12 },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center' },
  menuItemText: { color: '#FFF', fontSize: 16, fontWeight: '500', marginLeft: 14 }
});