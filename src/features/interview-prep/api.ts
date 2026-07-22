import { apiClient } from "@/shared/api/client";

export function startSession(matchId: string) {
  return apiClient<{ sessionId: string; firstQuestion: string }>("/interview/session", {
    method: "POST",
    body: { matchId },
  });
}

export function submitAnswer(sessionId: string, answer: string) {
  return apiClient<{ feedback: string; nextQuestion?: string }>(
    `/interview/session/${sessionId}/answer`,
    { method: "POST", body: { answer } }
  );
}
