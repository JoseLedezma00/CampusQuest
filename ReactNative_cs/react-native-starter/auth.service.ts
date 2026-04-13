// services/auth.service.ts
// Servicio de autenticación para CampusQuest - USC
//
// Por ahora simula el login localmente (mock).
// La próxima semana (abril 13) conectamos esto al backend real.
// Solo deberás cambiar la función `login` para que llame a la API.

// ─── Tipos ────────────────────────────────────────────────────────────────────

/** Lo que enviamos al servidor cuando el usuario hace login */
export interface LoginCredentials {
  username: string;
  password: string;
}

/** Lo que el servidor nos devuelve si el login es exitoso */
export interface LoginResponse {
  token: string;       // JWT para las siguientes peticiones
  user: {
    id: string;
    username: string;
    nombre: string;
    facultad: string;
  };
}

// ─── URL del backend ──────────────────────────────────────────────────────────
// Cuando tengan el backend listo, cambien esto por la URL real.
// Ejemplo: 'https://campusquest-api.usc.edu.co'
const API_URL = 'http://TU_IP_LOCAL:3000'; // ← Cambiar cuando tengan backend

// ─── Función principal de login ───────────────────────────────────────────────

/**
 * Intenta autenticar al usuario contra el backend.
 *
 * USO:
 *   const result = await login({ username: 'abc123', password: 'mi_clave' });
 *
 * Si el login falla, lanza un Error con un mensaje legible.
 * Si tiene éxito, devuelve el token y datos del usuario.
 */
export async function login(credentials: LoginCredentials): Promise<LoginResponse> {

  // ════════════════════════════════════════════════════════════════════
  // MODO MOCK: activo mientras no haya backend.
  // Borra este bloque cuando conectes el backend real (semana del 13 de abril).
  // ════════════════════════════════════════════════════════════════════
  await delay(800); // Simula la latencia de red

  if (credentials.username === 'estudiante' && credentials.password === '1234') {
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
    // Simula un error 401 del servidor
    throw Object.assign(new Error('Login fallido'), {
      response: { data: { message: 'Usuario o contraseña incorrectos.' } },
    });
  }
  // ════════════════════════════════════════════════════════════════════
  // FIN MODO MOCK
  // ════════════════════════════════════════════════════════════════════

  // ────────────────────────────────────────────────────────────────────
  // BACKEND REAL: descomenta esto cuando tengan el servidor funcionando.
  // ────────────────────────────────────────────────────────────────────
  /*
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const message = errorData?.message || `Error del servidor (${response.status})`;
      throw Object.assign(new Error(message), { response: { data: errorData } });
    }

    const data: LoginResponse = await response.json();
    return data;

  } catch (error: any) {
    // Si el fetch falla completamente (sin internet, servidor caído, etc.)
    if (!error.response) {
      throw Object.assign(new Error('Error de conexión. Verifica tu internet.'), {
        response: { data: { message: 'Error de conexión. Verifica tu internet.' } },
      });
    }
    throw error;
  }
  */
}

// ─── Utilidad interna ─────────────────────────────────────────────────────────

/** Pausa la ejecución por `ms` milisegundos. Solo para el mock. */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}