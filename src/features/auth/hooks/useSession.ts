import { getSession, setSession, clearSession } from "@/shared/state/authStore";

export function useSession() {
  const session = getSession();
  return {
    user: session.user,
    isAuthenticated: !!session.user,
    setSession,
    clearSession,
  };
}
