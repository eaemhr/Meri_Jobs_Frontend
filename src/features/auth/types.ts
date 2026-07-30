

export interface User {
  id: string;
  email: string;
  fullName: string;
  language: 'en' | 'am';
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  fullName: string;
  email: string;
  password: string;
  language: 'en' | 'am';
}