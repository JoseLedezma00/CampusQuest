// app/index.tsx
// Pantalla de Bienvenida — CampusQuest
// Es la primera pantalla que ve el usuario al abrir la app.
// Al presionar el botón, navega al Login.

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';

const { height } = Dimensions.get('window');

// ─── Colores institucionales USC ─────────────────────────────────────────────
const USC_BLUE       = '#003087';
const USC_BLUE_DARK  = '#001d5e';
const USC_GREEN      = '#00843D';
const USC_GOLD       = '#F5A623';  // Acento dorado para destacar el título

export default function WelcomeScreen() {

  // ── Valores de animación ──────────────────────────────────────────────────
  // Cada elemento entra con un pequeño retraso escalonado (staggered reveal)
  const fadeTitle    = useRef(new Animated.Value(0)).current;
  const fadeSubtitle = useRef(new Animated.Value(0)).current;
  const fadeCard     = useRef(new Animated.Value(0)).current;
  const slideCard    = useRef(new Animated.Value(40)).current;
  const fadeButton   = useRef(new Animated.Value(0)).current;
  const slideButton  = useRef(new Animated.Value(20)).current;
  const scaleLogo    = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    // Secuencia de animaciones al montar la pantalla
    Animated.sequence([
      // 1. Logo aparece con rebote
      Animated.spring(scaleLogo, {
        toValue: 1,
        tension: 60,
        friction: 6,
        useNativeDriver: true,
      }),
      // 2. Título
      Animated.timing(fadeTitle, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      // 3. Subtítulo + tarjeta + botón en paralelo
      Animated.parallel([
        Animated.timing(fadeSubtitle, { toValue: 1, duration: 350, useNativeDriver: true }),
        Animated.timing(fadeCard,     { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(slideCard,    { toValue: 0, duration: 400, useNativeDriver: true }),
        Animated.timing(fadeButton,   { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(slideButton,  { toValue: 0, duration: 400, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={USC_BLUE_DARK} />

      {/* ── Fondo decorativo: círculo grande difuso ─────────────────────── */}
      <View style={styles.bgCircle} />

      {/* ── Sección superior: Logo + nombre app ─────────────────────────── */}
      <View style={styles.topSection}>

        {/* Logo provisional — reemplazar con <Image source={require(...)} /> */}
        <Animated.View style={[styles.logoWrapper, { transform: [{ scale: scaleLogo }] }]}>
          <View style={styles.logoCircle}>
            {/* Cuando tengan el logo real, reemplazar este Text por:
                <Image
                  source={require('../assets/images/usc-logo.png')}
                  style={{ width: 70, height: 70, resizeMode: 'contain' }}
                />
            */}
            <Text style={styles.logoEmoji}>🎓</Text>
          </View>
          {/* Anillo decorativo exterior */}
          <View style={styles.logoRingOuter} />
        </Animated.View>

        {/* Nombre de la universidad */}
        <Animated.Text style={[styles.universityName, { opacity: fadeTitle }]}>
          Universidad Santiago de Cali
        </Animated.Text>

        {/* Nombre de la app */}
        <Animated.Text style={[styles.appTitle, { opacity: fadeTitle }]}>
          CampusQuest
        </Animated.Text>

        {/* Subtítulo */}
        <Animated.Text style={[styles.appSubtitle, { opacity: fadeSubtitle }]}>
          Gymkhana Institucional · Citadela Pampalinda
        </Animated.Text>
      </View>

      {/* ── Sección inferior: Descripción + Botón ───────────────────────── */}
      <Animated.View
        style={[
          styles.bottomCard,
          {
            opacity: fadeCard,
            transform: [{ translateY: slideCard }],
          },
        ]}
      >
        {/* Descripción breve del juego */}
        <Text style={styles.description}>
          Explora el campus, llega a cada estación y demuestra tu conocimiento
          universitario en esta aventura académica.
        </Text>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Info de la facultad */}
        <Text style={styles.facultyLabel}>
          Facultad de Ingeniería · USC · Cali, Colombia
        </Text>

        {/* Botón principal */}
        <Animated.View
          style={{
            opacity: fadeButton,
            transform: [{ translateY: slideButton }],
          }}
        >
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push('/(tabs)')}
            activeOpacity={0.85}
          >
            <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
            <Text style={styles.loginButtonArrow}>→</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: USC_BLUE,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 40,
  },

  // ── Fondo decorativo ──
  bgCircle: {
    position: 'absolute',
    width: 420,
    height: 420,
    borderRadius: 210,
    backgroundColor: USC_BLUE_DARK,
    top: -180,
    right: -100,
    opacity: 0.6,
  },

  // ── Sección superior ──
  topSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingHorizontal: 28,
  },

  // ── Logo ──
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  logoCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.35)',
    zIndex: 1,
  },
  logoRingOuter: {
    position: 'absolute',
    width: 136,
    height: 136,
    borderRadius: 68,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  logoEmoji: {
    fontSize: 52,
  },

  // ── Textos superiores ──
  universityName: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    letterSpacing: 0.3,
    marginBottom: 6,
  },
  appTitle: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    marginBottom: 8,
  },
  appSubtitle: {
    fontSize: 13,
    color: USC_GOLD,
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.4,
  },

  // ── Tarjeta inferior ──
  bottomCard: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 28,
    paddingTop: 32,
    paddingBottom: 16,
  },
  description: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.12)',
    marginBottom: 14,
  },
  facultyLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.4)',
    textAlign: 'center',
    marginBottom: 24,
    letterSpacing: 0.3,
  },

  // ── Botón ──
  loginButton: {
    backgroundColor: USC_GREEN,
    height: 56,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    shadowColor: USC_GREEN,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  loginButtonArrow: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '300',
  },
});
