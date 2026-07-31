// Meri Jobs — interview-prep feature types
// These mirror what api-gateway is expected to return. Once shared/api/ has
// real generated types for /interview/*, prefer importing from there instead
// of redeclaring shapes here — this file exists so the feature can be built
// and demoed before that contract is finalized.

export interface Job {
  id: string;
  title: string;
  company: string;
  matchScore: number;
  location?: string;
}

export interface Question {
  id: string;
  index: number; // 0-based position in the session
  text: string;
  tags: string[];
}

export interface Feedback {
  content: string;
  strengths: string[];
  improvements: string[];
}

export type FeedbackStatus = "idle" | "loading" | "done" | "timeout";

export interface ThreadItem {
  question: Question;
  answerText?: string;
  feedback?: Feedback;
  status: FeedbackStatus;
}

// One completed practice session, as returned by the (currently
// unconfirmed) GET /interview/history/{user_id} endpoint. Confirm the real
// shape against shared/api/ before wiring this up for real — see USAGE.md.
export interface PastSession {
  id: string;
  job: Job;
  completedAt: string; // ISO timestamp
  thread: ThreadItem[];
}
export interface StartSessionResult {
  sessionId: string;
  job: Job;
  totalQuestions: number;
  firstQuestion: Question;
}

// Response shape for POST /interview/session/{id}/answer — feedback on the
// answer just given, plus the next question (or none, if this was the last).
export interface SubmitAnswerResult {
  feedback: Feedback;
  nextQuestion: Question | null;
  isComplete: boolean;
}
