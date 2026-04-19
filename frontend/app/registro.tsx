// app/registro.tsx
// Pantalla de Registro — CampusQuest
// Crea un usuario nuevo llamando al backend POST /api/usuarios

import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { router } from 'expo-router';

const USC_BLUE       = '#003087';
const USC_GREEN      = '#00843D';
const USC_LIGHT_BLUE = '#E8F0FE';

// ← Cambia esta URL por la URL pública de tu Codespace cuando tengas el backend corriendo
// Ejemplo: 'https://xxxx-4000.app.github.dev'
const API_URL = 'https://opctak0-anonymous-8081.exp.direct/';

export default function RegistroScreen() {
  const [nombre, setNombre]       = useState('');
  const [codigo, setCodigo]       = useState('');
  const [password, setPassword]   = useState('');
  const [equipo, setEquipo]       = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState('');

  const handleRegistro = async () => {
    if (!nombre.trim() || !codigo.trim() || !password.trim()) {
      setError('Nombre, código y contraseña son obligatorios.');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombre.trim(),
          codigo: codigo.trim(),
          password,
          equipo: equipo.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // El backend devuelve { message: '...' } cuando hay error
        setError(data.message || 'Error al registrarse.');
        return;
      }

      // Registro exitoso → ir al login
      router.replace('/login');

    } catch (err) {
      setError('Error de conexión. Verifica tu internet.');
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
        {/* Logo */}
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
          <Text style={styles.formTitle}>Crear Cuenta</Text>

          {/* Nombre */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nombre completo</Text>
            <TextInput
              style={[styles.textInput, error ? styles.inputError : null]}
              placeholder="Tu nombre y apellido"
              placeholderTextColor="#a0a0a0"
              value={nombre}
              onChangeText={(t) => { setNombre(t); setError(''); }}
              autoCorrect={false}
              returnKeyType="next"
            />
          </View>

          {/* Código */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Código USC</Text>
            <TextInput
              style={[styles.textInput, error ? styles.inputError : null]}
              placeholder="Ej: 2024115001"
              placeholderTextColor="#a0a0a0"
              value={codigo}
              onChangeText={(t) => { setCodigo(t); setError(''); }}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              returnKeyType="next"
            />
          </View>

          {/* Contraseña */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Contraseña</Text>
            <TextInput
              style={[styles.textInput, error ? styles.inputError : null]}
              placeholder="Mínimo 6 caracteres"
              placeholderTextColor="#a0a0a0"
              value={password}
              onChangeText={(t) => { setPassword(t); setError(''); }}
              secureTextEntry
              returnKeyType="next"
            />
          </View>

          {/* Equipo (opcional) */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Equipo <Text style={styles.optional}>(opcional)</Text></Text>
            <TextInput
              style={styles.textInput}
              placeholder="Nombre de tu equipo"
              placeholderTextColor="#a0a0a0"
              value={equipo}
              onChangeText={setEquipo}
              autoCorrect={false}
              returnKeyType="done"
              onSubmitEditing={handleRegistro}
            />
          </View>

          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
            </View>
          ) : null}

          {/* Botón registrar */}
          <TouchableOpacity
            style={[styles.registerButton, isLoading && styles.buttonDisabled]}
            onPress={handleRegistro}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            {isLoading
              ? <ActivityIndicator color="#FFFFFF" size="small" />
              : <Text style={styles.registerButtonText}>Crear Cuenta</Text>
            }
          </TouchableOpacity>

          {/* Enlace al login */}
          <TouchableOpacity
            style={styles.loginLink}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.loginLinkText}>
              ¿Ya tienes cuenta?{' '}
              <Text style={styles.loginLinkBold}>Inicia Sesión</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>Facultad de Ingeniería · USC · Cali, Colombia</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: USC_BLUE },
  scrollContent: {
    flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 40,
  },
  logoSection: { alignItems: 'center', marginBottom: 32 },
  logoPlaceholder: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 16, borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)',
  },
  logoEmoji: { fontSize: 48 },
  universityName: {
    fontSize: 20, fontWeight: '700', color: '#FFFFFF',
    textAlign: 'center', lineHeight: 26, letterSpacing: 0.5,
  },
  appTitle: { fontSize: 32, fontWeight: '900', color: '#FFFFFF', marginTop: 8, letterSpacing: 1 },
  appSubtitle: { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4, textAlign: 'center' },
  formCard: {
    backgroundColor: '#FFFFFF', borderRadius: 20, padding: 28,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15, shadowRadius: 12, elevation: 8,
  },
  formTitle: { fontSize: 22, fontWeight: '700', color: USC_BLUE, marginBottom: 24, textAlign: 'center' },
  inputGroup: { marginBottom: 16 },
  inputLabel: {
    fontSize: 13, fontWeight: '600', color: '#555',
    marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5,
  },
  optional: { fontWeight: '400', textTransform: 'none', color: '#999' },
  textInput: {
    height: 52, borderWidth: 1.5, borderColor: '#DDE3F0', borderRadius: 12,
    paddingHorizontal: 16, fontSize: 16, color: '#1a1a2e', backgroundColor: USC_LIGHT_BLUE,
  },
  inputError: { borderColor: '#E53935', backgroundColor: '#FFF5F5' },
  errorBox: {
    backgroundColor: '#FFF3F3', borderLeftWidth: 3, borderLeftColor: '#E53935',
    borderRadius: 8, padding: 10, marginBottom: 12,
  },
  errorText: { color: '#C62828', fontSize: 13, fontWeight: '500' },
  registerButton: {
    backgroundColor: USC_GREEN, height: 52, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center', marginTop: 8,
    shadowColor: USC_GREEN, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  buttonDisabled: { opacity: 0.6 },
  registerButtonText: { color: '#FFFFFF', fontSize: 17, fontWeight: '700', letterSpacing: 0.5 },
  loginLink: { marginTop: 20, alignItems: 'center' },
  loginLinkText: { fontSize: 14, color: '#888' },
  loginLinkBold: { color: USC_BLUE, fontWeight: '700' },
  footer: {
    textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 11, marginTop: 24,
  },
});
