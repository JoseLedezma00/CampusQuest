// app/mapa.tsx
// Pantalla del Mapa — CampusQuest
// Por ahora es un placeholder. Aquí irá el mapa de OpenStreetMap con las estaciones.

import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

const USC_BLUE = '#003087';

export default function MapaScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={USC_BLUE} />
      <Text style={styles.text}>Mapa</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: USC_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: 1,
  },
});
