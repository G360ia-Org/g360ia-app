import { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  TextInput, ActivityIndicator, KeyboardAvoidingView, Platform,
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/context/auth';
import LogoBrand from '@/components/ui/logo-brand';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed.includes('@')) {
      setError('Ingresá un email válido.');
      return;
    }
    setError('');
    setLoading(true);
    await signIn({
      id: trimmed,
      name: trimmed.split('@')[0],
      email: trimmed,
    });
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.logoContainer}>
        <LogoBrand size="lg" subtitle="Panel Admin" />
      </View>

      <View style={styles.card}>
        <Text style={styles.welcome}>Bienvenido</Text>
        <Text style={styles.instructions}>
          Ingresá tu email para acceder al panel.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="tu@email.com"
          placeholderTextColor="#2E4A66"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          onSubmitEditing={handleLogin}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.button, loading && styles.disabled]}
          onPress={handleLogin}
          disabled={loading}
          activeOpacity={0.85}
        >
          {loading
            ? <ActivityIndicator color="#FFFFFF" />
            : <Text style={styles.buttonText}>Ingresar</Text>
          }
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>gestion360ia.com.ar</Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#152234',
    borderRadius: 16,
    padding: 28,
    gap: 14,
    borderWidth: 1,
    borderColor: '#1E3350',
  },
  welcome: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  instructions: {
    color: '#7A9BB5',
    fontSize: 14,
    lineHeight: 20,
  },
  input: {
    backgroundColor: '#0D1B2A',
    borderWidth: 1,
    borderColor: '#1E3350',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 13,
    color: '#FFFFFF',
    fontSize: 15,
  },
  error: {
    color: '#E05A5A',
    fontSize: 13,
  },
  button: {
    backgroundColor: '#506886',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  footer: {
    color: '#2E4A66',
    fontSize: 12,
    letterSpacing: 1,
  },
});
