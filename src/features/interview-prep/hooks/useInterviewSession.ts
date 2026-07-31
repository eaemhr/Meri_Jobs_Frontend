"use client";

import { useCallback, useEffect, useState } from "react";
import { startInterviewSession, submitAnswer } from "../api";
import type { Job, ThreadItem } from "../types";

export function useInterviewSession(job: Job) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [thread, setThread] = useState<ThreadItem[]>([]);
  const [starting, setStarting] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  const runStart = useCallback(async () => {
    setStarting(true);
    setIsComplete(false);
    try {
      const result = await startInterviewSession(job);
      setSessionId(result.sessionId);
      setTotalQuestions(result.totalQuestions);
      setThread([{ question: result.firstQuestion, status: "idle" }]);
    } finally {
      setStarting(false);
    }
  }, [job]);

  // Starts automatically on mount — no briefing step, no button to click
  // first. Note: this state lives in the component, so navigating away
  // (e.g. to /interview-prep/history) and back will reset it — that's the
  // tradeoff of not lifting state into a layout-level provider.
  useEffect(() => {
    runStart();
    // React 18 Strict Mode runs this twice in dev — harmless here since
    // it's an idempotent mock call for the same job.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const answer = useCallback(
    async (questionId: string, text: string) => {
      if (!sessionId) return;

      setThread((prev) =>
        prev.map((item) =>
          item.question.id === questionId
            ? { ...item, answerText: text, status: "loading" as const }
            : item,
        ),
      );

      try {
        const result = await submitAnswer(sessionId, questionId, text);
        setThread((prev) => {
          const updated = prev.map((item) =>
            item.question.id === questionId
              ? { ...item, feedback: result.feedback, status: "done" as const }
              : item,
          );
          return result.nextQuestion
            ? [
                ...updated,
                { question: result.nextQuestion, status: "idle" as const },
              ]
            : updated;
        });
        if (result.isComplete) setIsComplete(true);
      } catch {
        setThread((prev) =>
          prev.map((item) =>
            item.question.id === questionId
              ? { ...item, status: "timeout" as const }
              : item,
          ),
        );
      }
    },
    [sessionId],
  );

  const retry = useCallback(
    (questionId: string) => {
      const item = thread.find((t) => t.question.id === questionId);
      if (item?.answerText) answer(questionId, item.answerText);
    },
    [thread, answer],
  );

  const reset = useCallback(() => {
    runStart();
  }, [runStart]);

  return { thread, totalQuestions, starting, isComplete, answer, retry, reset };
}
