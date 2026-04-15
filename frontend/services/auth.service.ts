// services/auth.service.ts
// Servicio de autenticación para CampusQuest - USC
//
// Por ahora simula el login localmente (mock).
// Cuando el backend esté listo, solo descomenta el bloque BACKEND REAL
// y borra el bloque MODO MOCK.

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    nombre: string;
    facultad: string;
  };
}

const API_URL = 'http://TU_IP_LOCAL:3000'; // ← Cambiar por la URL del backend cuando esté listo

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {

  // ════════════════════════════════════════════════════════════════════
  // MODO MOCK — borrar este bloque cuando conectes el backend real
  // ════════════════════════════════════════════════════════════════════
  await delay(800);

  if (credentials.username === '1109667255' && credentials.password === 'jose') {
    return {
      token: 'mock-jwt-token-campusquest-usc',
      user: {
        id: 'u001',
        username: 'estudiante',
        nombre: 'Estudiante USC',
        facultad: 'Ingeniería de Sistemas',
      },
    };
  } else {
    throw Object.assign(new Error('Login fallido'), {
      response: { data: { message: 'Usuario o contraseña incorrectos.' } },
    });
  }
  // ════════════════════════════════════════════════════════════════════
  // FIN MODO MOCK
  // ════════════════════════════════════════════════════════════════════

  // ────────────────────────────────────────────────────────────────────
  // BACKEND REAL — descomenta esto cuando tengan el servidor funcionando
  // ────────────────────────────────────────────────────────────────────
  /*
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const message = errorData?.message || `Error del servidor (${response.status})`;
      throw Object.assign(new Error(message), { response: { data: errorData } });
    }

    return await response.json();

  } catch (error: any) {
    if (!error.response) {
      throw Object.assign(new Error('Error de conexión. Verifica tu internet.'), {
        response: { data: { message: 'Error de conexión. Verifica tu internet.' } },
      });
    }
    throw error;
  }
  */
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
