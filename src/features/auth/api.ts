import { apiClient } from "@/shared/api/client";
import type { User, AuthTokens } from "@/shared/api/types";

export function login(email: string, password: string) {
  return apiClient<{ user: User; tokens: AuthTokens }>("/auth/login", {
    method: "POST",
    body: { email, password },
  });
}

export function signup(email: string, password: string, name: string) {
  return apiClient<{ user: User; tokens: AuthTokens }>("/auth/signup", {
    method: "POST",
    body: { email, password, name },
  });
}
