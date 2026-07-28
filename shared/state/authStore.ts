// Global auth/session state. Feature folders read from here — none of them
// should keep their own copy of "is the user logged in" state.

import { useState, useCallback } from "react";
import type { User, AuthTokens } from "@/shared/api/types";

// TODO: replace with your actual state library (Zustand, Redux, Context, etc.)
let currentUser: User | null = null;
let currentTokens: AuthTokens | null = null;

export function getSession() {
  return { user: currentUser, tokens: currentTokens };
}

export function setSession(user: User, tokens: AuthTokens) {
  currentUser = user;
  currentTokens = tokens;
}

export function clearSession() {
  currentUser = null;
  currentTokens = null;
}
