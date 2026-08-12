export interface User {
  id: string;
  email: string;
  name: string;
  full_name?: string;
  language: 'en' | 'am';
  phone?: string;
  location?: string;
  bio?: string;
  role: 'user' | 'premium_user' | 'admin';
  created_at: string;
  last_login?: string;
}

export interface AuthResponse {
  user: User;
  access: string;
  refresh: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  language?: 'en' | 'am';
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ChangePasswordPayload {
  old_password: string;
  new_password: string;
}

const BASE_URL = 'http://localhost:8080/api/v1';

// 1. Register
export async function signupUser(payload: SignupPayload): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || 'Failed to create account!');
  }
  const data = await res.json();
  
  // ቶከኖቹን ለያይቶ ማስቀመጥ
  localStorage.setItem('access_token', data.access);
  localStorage.setItem('refresh_token', data.refresh);
  return data;
}

// 2. Login
export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || 'Failed to login');
  }
  const data = await res.json();
  
  // ቶከኖቹን ለያይቶ ማስቀመጥ
  localStorage.setItem('access_token', data.access);
  localStorage.setItem('refresh_token', data.refresh);
  return data;
}

// 3. Refresh Token
export async function refreshToken(refreshTokenStr: string): Promise<{ access: string; refresh: string }> {
  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh: refreshTokenStr }),
  });
  if (!res.ok) {
    throw new Error('Failed to refresh token');
  }
  const data = await res.json();
  
  localStorage.setItem('access_token', data.access);
  localStorage.setItem('refresh_token', data.refresh);
  return data;
}

// 4. Update Profile Detail (ለ Onboarding)
export async function updateProfileDetail(profileData: Partial<User>): Promise<User> {
  const res = await fetch(`${BASE_URL}/auth/profile/detail`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profileData),
  });
  if (!res.ok) {
    throw new Error('Failed to update profile');
  }
  const data = await res.json();
  return data.user || data;
}
