// app/bienvenida.tsx
// Pantalla de Bienvenida provisional — CampusQuest
// Muestra mensaje de éxito post-login/registro antes de ir al mapa

import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  StatusBar,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

const USC_BLUE = '#003087';
const USC_GREEN = '#00843D';
const USC_GOLD = '#F5A623';

export default function BienvenidaScreen() {
  const { nombre, codigo } = useLocalSearchParams<{ nombre?: string; codigo?: string }>();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleIrAlMapa = () => {
    router.replace('/mapa');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={USC_BLUE} />
      
      {/* Fondo decorativo */}
      <View style={styles.bgCircle} />
      
      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        {/* Ícono de éxito */}
        <View style={styles.successIcon}>
          <Text style={styles.successIconText}>✓</Text>
        </View>

        {/* Mensaje principal */}
        <Text style={styles.welcomeTitle}>¡Bienvenido!</Text>
        <Text style={styles.userName}>
          {nombre || 'Estudiante'}
        </Text>
        <Text style={styles.userCode}>
          Código: {codigo || 'USC'}
        </Text>

        {/* Descripción */}
        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionText}>
            Estás listo para comenzar la Gymkhana CampusQuest. 
            Explora el campus, encuentra las estaciones y responde 
            las preguntas para ganar puntos.
          </Text>
        </View>

        {/* Botón principal */}
        <TouchableOpacity
          style={styles.goButton}
          onPress={handleIrAlMapa}
          activeOpacity={0.85}
        >
          <Text style={styles.goButtonText}>🗺️ Ir al Mapa del Campus</Text>
        </TouchableOpacity>

        {/* Hint opcional */}
        <Text style={styles.hint}>
          💡 Consejo: Activa tu ubicación para que el juego 
          valide que estás en cada estación.
        </Text>
      </Animated.View>

      {/* Footer */}
      <Text style={styles.footer}>
        Facultad de Ingeniería · USC · Cali, Colombia
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: USC_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  bgCircle: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: 'rgba(255,255,255,0.08)',
    top: -150,
    right: -100,
  },
  content: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: USC_GREEN,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  successIconText: {
    fontSize: 36,
    color: '#FFFFFF',
    fontWeight: '900',
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  userName: {
    fontSize: 22,
    fontWeight: '600',
    color: USC_GOLD,
    marginBottom: 4,
  },
  userCode: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 24,
  },
  descriptionBox: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    width: '100%',
  },
  descriptionText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 20,
  },
  goButton: {
    backgroundColor: USC_GREEN,
    width: '100%',
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: USC_GREEN,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  goButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  hint: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    fontSize: 11,
    color: 'rgba(255,255,255,0.4)',
    textAlign: 'center',
  },
});