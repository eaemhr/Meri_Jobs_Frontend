
import { AuthResponse, LoginPayload, SignupPayload } from './types';

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  // TODO: Replace with real API endpoint
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Failed to login');
  }

  return res.json();
}

export async function signupUser(payload: SignupPayload): Promise<AuthResponse> {
  // TODO: Replace with real API endpoint
  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Failed to create account');
  }

  return res.json();
}