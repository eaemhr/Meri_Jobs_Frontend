import {
  SignupPayload,
  LoginPayload,
  AuthResponse,
  User,
} from './types';

const BASE_URL = 'http://localhost:8080/api/v1';

/**
 * Helper function to parse API responses safely
 */
async function handleResponse(res: Response) {
  const text = await res.text();

  let data: any = {};
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(text);
    }
  }

  if (!res.ok) {
    throw new Error(
      data?.error?.message ||
      data?.message ||
      `Request failed (${res.status})`
    );
  }

  return data;
}

/**
 * Register
 */
export async function signupUser(
  payload: SignupPayload
): Promise<AuthResponse> {
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await handleResponse(res);

    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);

    return data;
  } catch (error) {
    console.error('Register Error:', error);

    if (error instanceof TypeError) {
      throw new Error(
        'Unable to connect to the backend. Make sure the backend server is running.'
      );
    }

    throw error;
  }
}

/**
 * Login
 */
export async function loginUser(
  payload: LoginPayload
): Promise<AuthResponse> {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await handleResponse(res);

    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);

    return data;
  } catch (error) {
    console.error('Login Error:', error);

    if (error instanceof TypeError) {
      throw new Error(
        'Unable to connect to the backend. Make sure the backend server is running.'
      );
    }

    throw error;
  }
}

/**
 * Refresh Token
 */
export async function refreshToken(
  refreshToken: string
): Promise<{ access: string; refresh: string }> {
  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refresh: refreshToken,
    }),
  });

  const data = await handleResponse(res);

  localStorage.setItem('access_token', data.access);
  localStorage.setItem('refresh_token', data.refresh);

  return data;
}

/**
 * Update Profile Detail
 */
export async function updateProfileDetail(
  profileData: Partial<User>
): Promise<User> {
  const res = await fetch(`${BASE_URL}/auth/profile/detail`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profileData),
  });

  const data = await handleResponse(res);

  return data.user ?? data;
}
