// Meri Jobs — interview-prep API layer
//
// MOCK IMPLEMENTATION. Every function here has the exact signature and
// return shape the real calls will have once api-gateway exposes them:
//   startInterviewSession -> POST /interview/session          (returns Q1)
//   submitAnswer          -> POST /interview/session/{id}/answer (returns
//                            feedback + the next question, one at a time)
//
// To go live: replace the bodies below with calls through shared/api/'s
// typed client, keep the function signatures and return types unchanged,
// and delete MOCK_QUESTION_POOL / mockFeedbackFor. Nothing that imports
// from this file needs to change.

import type {
  Job,
  Question,
  Feedback,
  StartSessionResult,
  SubmitAnswerResult,
  PastSession,
} from "./types";

const TOTAL_QUESTIONS = 10;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const MOCK_QUESTION_POOL: Omit<Question, "index">[] = [
  { id: "q1", text: "Explain the difference between useEffect and useLayoutEffect, and when you would use each.", tags: ["technical", "medium"] },
  { id: "q2", text: "Tell me about a time you had to refactor a messy component under a tight deadline.", tags: ["behavioral", "medium"] },
  { id: "q3", text: "How would you optimize a React list rendering thousands of rows?", tags: ["technical", "hard"] },
  { id: "q4", text: "Describe how you handled a disagreement with a teammate over a technical decision.", tags: ["behavioral", "easy"] },
  { id: "q5", text: "What are the tradeoffs between server components and client components in the App Router?", tags: ["technical", "medium"] },
  { id: "q6", text: "How do you decide when to reach for global state versus local component state?", tags: ["technical", "medium"] },
  { id: "q7", text: "Tell me about a time you disagreed with a product decision. What did you do?", tags: ["behavioral", "medium"] },
  { id: "q8", text: "How would you debug a memory leak in a long-running React app?", tags: ["technical", "hard"] },
  { id: "q9", text: "Describe a project where you had to learn something completely new under pressure.", tags: ["behavioral", "easy"] },
  { id: "q10", text: "How do you approach testing components that depend on network requests?", tags: ["technical", "medium"] },
];

// Mock in-memory session store, keyed by sessionId, so submitAnswer knows
// which question index comes next. A real backend would hold this
// server-side; this exists purely so the mock can behave statefully.
const mockSessions = new Map<string, { job: Job; currentIndex: number }>();

export async function startInterviewSession(job: Job): Promise<StartSessionResult> {
  await delay(500);
  const sessionId = `mock-session-${job.id}`;
  mockSessions.set(sessionId, { job, currentIndex: 0 });

  return {
    sessionId,
    job,
    totalQuestions: TOTAL_QUESTIONS,
    firstQuestion: { ...MOCK_QUESTION_POOL[0], index: 0 },
  };
}

export async function submitAnswer(
  sessionId: string,
  questionId: string,
  answerText: string
): Promise<SubmitAnswerResult> {
  await delay(1600 + Math.random() * 900);

  const feedback = mockFeedbackFor(answerText);
  const state = mockSessions.get(sessionId);
  const nextIndex = (state?.currentIndex ?? 0) + 1;

  if (state) state.currentIndex = nextIndex;

  const isComplete = nextIndex >= TOTAL_QUESTIONS;
  const nextQuestion = isComplete
    ? null
    : { ...MOCK_QUESTION_POOL[nextIndex], index: nextIndex };

  return { feedback, nextQuestion, isComplete };
}

function mockFeedbackFor(answerText: string): Feedback {
  const wordCount = answerText.trim().split(/\s+/).filter(Boolean).length;
  const strengths: string[] = [];
  const improvements: string[] = [];

  if (wordCount > 25) strengths.push("gave a well-developed answer");
  else improvements.push("add more detail — aim for 2-3 minutes spoken");

  if (/\b(result|impact|improved|reduced|increased)\b/i.test(answerText)) {
    strengths.push("mentioned a concrete outcome");
  } else {
    improvements.push("name a specific, measurable result");
  }

  if (strengths.length === 0) strengths.push("addressed the question directly");
  if (improvements.length === 0) improvements.push("keep this structure for future answers");

  return {
    content:
      "Your answer covers the core idea. Strengthening the specifics below would make it land harder in a real interview.",
    strengths,
    improvements,
  };
}

// MOCK — GET /interview/history/{user_id}
//
// This endpoint is not confirmed in the frontend onboarding guide's api.ts
// list (only session-start and answer-submit are listed there). Check
// shared/api/ before relying on this shape for real — see USAGE.md.
const MOCK_JOBS: Job[] = [
  { id: "job-1", title: "React developer", company: "Nexa Labs", matchScore: 87, location: "Remote" },
  { id: "job-2", title: "Frontend engineer", company: "Coral Systems", matchScore: 79, location: "Addis Ababa" },
  { id: "job-3", title: "Full-stack developer", company: "Birrhane Tech", matchScore: 91, location: "Remote" },
];

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

function mockPastThread(count: number): PastSession["thread"] {
  return MOCK_QUESTION_POOL.slice(0, count).map((q, i) => {
    const answerText = "This is a sample answer I gave during that session.";
    return {
      question: { ...q, index: i },
      answerText,
      status: "done" as const,
      feedback: mockFeedbackFor(answerText),
    };
  });
}

const MOCK_HISTORY: PastSession[] = [
  { id: "session-1", job: MOCK_JOBS[0], completedAt: daysAgo(1), thread: mockPastThread(5) },
  { id: "session-2", job: MOCK_JOBS[1], completedAt: daysAgo(4), thread: mockPastThread(3) },
  { id: "session-3", job: MOCK_JOBS[0], completedAt: daysAgo(9), thread: mockPastThread(4) },
];

export async function getInterviewHistory(_userId: string): Promise<PastSession[]> {
  await delay(500);
  return MOCK_HISTORY;
}
