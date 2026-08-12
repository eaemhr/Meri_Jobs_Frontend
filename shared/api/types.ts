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