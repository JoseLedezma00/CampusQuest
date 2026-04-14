// app/login.tsx
// Pantalla de Login — CampusQuest
// Recibe usuario y contraseña, llama al servicio de auth y navega al mapa.

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { login } from '../services/auth.service';

const USC_BLUE       = '#003087';
const USC_GREEN      = '#00843D';
const USC_LIGHT_BLUE = '#E8F0FE';

export default function LoginScreen() {
  const [username, setUsername]   = useState('');
  const [password, setPassword]   = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState('');

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError('Por favor completa todos los campos.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await login({ username: username.trim(), password });

      // Login exitoso — replace() evita volver al login con el botón atrás
      // Cuando tengas la pantalla del mapa, cámbia '/login' por '/map' o la ruta que corresponda
      router.replace('/login'); // ← cambiar por router.replace('/map') cuando esté lista

    } catch (err: any) {
      const message = err.response?.data?.message || 'Error de conexión. Verifica tu internet.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Logo y nombre */}
        <View style={styles.logoSection}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoEmoji}>🎓</Text>
          </View>
          <Text style={styles.universityName}>Universidad{'\n'}Santiago de Cali</Text>
          <Text style={styles.appTitle}>CampusQuest</Text>
          <Text style={styles.appSubtitle}>Gymkhana Institucional · Citadela Pampalinda</Text>
        </View>

        {/* Formulario */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Iniciar Sesión</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Usuario</Text>
            <TextInput
              style={[styles.textInput, error ? styles.inputError : null]}
              placeholder="Tu usuario USC"
              placeholderTextColor="#a0a0a0"
              value={username}
              onChangeText={(text) => { setUsername(text); setError(''); }}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Contraseña</Text>
            <TextInput
              style={[styles.textInput, error ? styles.inputError : null]}
              placeholder="Tu contraseña"
              placeholderTextColor="#a0a0a0"
              value={password}
              onChangeText={(text) => { setPassword(text); setError(''); }}
              secureTextEntry={true}
              returnKeyType="done"
              onSubmitEditing={handleLogin}
            />
          </View>

          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.loginButtonText}>Entrar al Campus</Text>
            )}
          </TouchableOpacity>

          {/* Solo para pruebas — borrar antes de entregar */}
          <Text style={styles.testHint}>
            🧪 Prueba: usuario <Text style={{ fontWeight: 'bold' }}>estudiante</Text> / clave <Text style={{ fontWeight: 'bold' }}>1234</Text>
          </Text>
        </View>

        <Text style={styles.footer}>
          Facultad de Ingeniería · USC · Cali, Colombia
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: USC_BLUE,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  logoEmoji: {
    fontSize: 48,
  },
  universityName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 26,
    letterSpacing: 0.5,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 8,
    letterSpacing: 1,
  },
  appSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
    textAlign: 'center',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: USC_BLUE,
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  textInput: {
    height: 52,
    borderWidth: 1.5,
    borderColor: '#DDE3F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1a1a2e',
    backgroundColor: USC_LIGHT_BLUE,
  },
  inputError: {
    borderColor: '#E53935',
    backgroundColor: '#FFF5F5',
  },
  errorBox: {
    backgroundColor: '#FFF3F3',
    borderLeftWidth: 3,
    borderLeftColor: '#E53935',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  errorText: {
    color: '#C62828',
    fontSize: 13,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: USC_GREEN,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    shadowColor: USC_GREEN,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  testHint: {
    textAlign: 'center',
    color: '#aaa',
    fontSize: 11,
    marginTop: 14,
  },
  footer: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.5)',
    fontSize: 11,
    marginTop: 24,
  },
});
