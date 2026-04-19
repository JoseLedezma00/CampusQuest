// services/auth.service.ts
import * as SecureStore from 'expo-secure-store';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  usuario: {
    nombre: string;
    codigo: string;
    equipo?: string;
  };
}

// ✅ Usa la variable de entorno que definiste en frontend/.env

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  if (!API_URL) {
    throw new Error('Falta configurar EXPO_PUBLIC_API_URL en el .env del frontend');
  }

  const response = await fetch(`${API_URL}/api/usuarios/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData?.message || errorData?.mensaje || `Error del servidor (${response.status})`;
    throw Object.assign(new Error(message), {
      response: { data: errorData },
    });
  }

  const data = await response.json();
  
  // ✅ Guarda el token de forma segura
  await SecureStore.setItemAsync('campusquest_token', data.token);
  
  return {
    token: data.token,
    usuario: data.usuario,
  };
}

export async function logout(): Promise<void> {
  await SecureStore.deleteItemAsync('campusquest_token');
}