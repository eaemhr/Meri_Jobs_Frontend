import { useState } from "react";
import { startSession, submitAnswer } from "../api";

export function useInterviewSession() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [question, setQuestion] = useState<string | null>(null);

  const start = async (matchId: string) => {
    const result = await startSession(matchId);
    setSessionId(result.sessionId);
    setQuestion(result.firstQuestion);
  };

  const answer = async (text: string) => {
    if (!sessionId) return;
    const result = await submitAnswer(sessionId, text);
    return result.feedback;
  };

  return { sessionId, question, start, answer };
}
