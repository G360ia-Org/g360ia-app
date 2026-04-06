import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useAuth } from '@/context/auth';
import { router } from 'expo-router';

const MODULES = [
  { id: 'crm', label: 'CRM', icon: '👥', description: 'Leads, oportunidades y contactos' },
  { id: 'mcp', label: 'Canales', icon: '📡', description: 'WhatsApp, Google, Meta' },
  { id: 'perfil', label: 'Mi perfil', icon: '👤', description: 'Configuración de cuenta' },
];

export default function HomeScreen() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {user?.photo ? (
            <Image source={{ uri: user.photo }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitial}>
                {user?.name?.[0]?.toUpperCase() ?? '?'}
              </Text>
            </View>
          )}
          <View>
            <Text style={styles.greeting}>Hola,</Text>
            <Text style={styles.userName}>{user?.name?.split(' ')[0]}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
          <Text style={styles.signOutText}>Salir</Text>
        </TouchableOpacity>
      </View>

      {/* Email badge */}
      <View style={styles.emailBadge}>
        <Text style={styles.emailText}>{user?.email}</Text>
      </View>

      {/* Modules */}
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Módulos</Text>
        {MODULES.map((mod) => (
          <TouchableOpacity key={mod.id} style={styles.moduleCard} activeOpacity={0.8}>
            <Text style={styles.moduleIcon}>{mod.icon}</Text>
            <View style={styles.moduleInfo}>
              <Text style={styles.moduleLabel}>{mod.label}</Text>
              <Text style={styles.moduleDesc}>{mod.description}</Text>
            </View>
            <Text style={styles.moduleArrow}>›</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.versionBadge}>
          <Text style={styles.versionText}>Gestión 360 iA · Demo v1.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A',
    paddingTop: 56,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#B08A55',
  },
  avatarPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#506886',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  greeting: {
    color: '#7A9BB5',
    fontSize: 12,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  signOutButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1E3350',
  },
  signOutText: {
    color: '#7A9BB5',
    fontSize: 13,
  },
  emailBadge: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: '#152234',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: '#1E3350',
  },
  emailText: {
    color: '#B08A55',
    fontSize: 12,
    letterSpacing: 0.3,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: '#7A9BB5',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  moduleCard: {
    backgroundColor: '#152234',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#1E3350',
    gap: 14,
  },
  moduleIcon: {
    fontSize: 24,
  },
  moduleInfo: {
    flex: 1,
  },
  moduleLabel: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  moduleDesc: {
    color: '#506886',
    fontSize: 12,
    marginTop: 2,
  },
  moduleArrow: {
    color: '#506886',
    fontSize: 22,
    fontWeight: '300',
  },
  versionBadge: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  versionText: {
    color: '#1E3350',
    fontSize: 12,
  },
});
