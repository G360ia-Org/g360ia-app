import { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { router } from 'expo-router';
import { useAuth } from '@/context/auth';

WebBrowser.maybeCompleteAuthSession();

const GOOGLE_CLIENT_ID = '535906459398-i08rdcarj2n4cqhvgbp4khv6dvidcbg1.apps.googleusercontent.com';

export default function LoginScreen() {
  const { signIn } = useAuth();

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: GOOGLE_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      fetchUserInfo(response.authentication?.accessToken);
    }
  }, [response]);

  const fetchUserInfo = async (token?: string) => {
    if (!token) return;
    try {
      const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      await signIn({
        id: data.id,
        name: data.name,
        email: data.email,
        photo: data.picture,
      });
      router.replace('/(tabs)');
    } catch (e) {
      console.error('Error al obtener info de usuario:', e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Gestión 360 iA</Text>
        <Text style={styles.subtitle}>PANEL DE ADMINISTRACIÓN</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.welcome}>Bienvenido</Text>
        <Text style={styles.instructions}>
          Ingresá con tu cuenta de Google para acceder al panel.
        </Text>

        <TouchableOpacity
          style={[styles.googleButton, !request && styles.disabled]}
          onPress={() => promptAsync()}
          disabled={!request}
          activeOpacity={0.85}
        >
          {!request ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Text style={styles.googleIcon}>G</Text>
              <Text style={styles.googleButtonText}>Ingresar con Google</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>gestion360ia.com.ar</Text>
    </View>
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
    gap: 8,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  subtitle: {
    color: '#B08A55',
    fontSize: 11,
    letterSpacing: 2,
  },
  card: {
    width: '100%',
    backgroundColor: '#152234',
    borderRadius: 16,
    padding: 28,
    gap: 16,
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
  googleButton: {
    backgroundColor: '#506886',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 8,
  },
  disabled: {
    opacity: 0.5,
  },
  googleIcon: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  googleButtonText: {
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
