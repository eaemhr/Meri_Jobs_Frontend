// Feature-local UI state types for auth (not the API contract — see shared/api/types.ts)
export interface LoginFormState {
  email: string;
  password: string;
  error?: string;
}
