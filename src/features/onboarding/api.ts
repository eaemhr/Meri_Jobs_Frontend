import { apiClient } from "@/shared/api/client";

export function completeOnboarding(payload: Record<string, unknown>) {
  return apiClient<{ success: boolean }>("/onboarding/complete", {
    method: "POST",
    body: payload,
  });
}
