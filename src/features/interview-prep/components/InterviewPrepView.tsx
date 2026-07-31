"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, History, RotateCcw } from "lucide-react";
import { useInterviewSession } from "../hooks/useInterviewSession";
import type { Job } from "../types";
import QuestionCard from "./QuestionCard";
import AnswerFeedback from "./AnswerFeedback";
import InterviewTips from "./InterviewTips";
import SessionStats from "./SessionStats";

// Wraps a single Q&A block so it slides up + fades in when it first mounts,
// instead of just appearing instantly below the previous one. Also scrolls
// itself into view so the newest question is what you land on.
function AnimatedThreadItem({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      ref={ref}
      className={`space-y-3 transition-all duration-300 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

interface InterviewPrepViewProps {
  // Already known on page load — comes from routing (features/matches/),
  // not user selection.
  job: Job;
}

export default function InterviewPrepView({ job }: InterviewPrepViewProps) {
  const router = useRouter();
  const { thread, totalQuestions, starting, isComplete, answer, retry, reset } =
    useInterviewSession(job);

  const answered = thread.filter((t) => t.status === "done").length;
  // The one item still awaiting an answer — everything before it is
  // resolved, everything after it hasn't been generated yet.
  const activeQuestionId = thread.find((t) => t.status === "idle")?.question.id;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
        {/* Header sits directly on the page background — no card around it */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">
                Interview Prep
              </h1>
              <p className="mt-0.5 text-sm text-slate-500">
                {job.title} · {job.company} · {job.matchScore}% match
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => router.push("/interview-prep/history")}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
            >
              <History className="h-3.5 w-3.5" /> History
            </button>
            <button
              onClick={reset}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
          </div>
        </div>

        {/* Main content + sidebar — stacks on mobile, side-by-side from lg up */}
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            {starting ? (
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
                <span className="flex gap-1">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-400" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-400 [animation-delay:200ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-400 [animation-delay:400ms]" />
                </span>
                Preparing your first question…
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all"
                      style={{ width: `${(answered / totalQuestions) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-500">
                    {answered}/{totalQuestions}
                  </span>
                </div>

                <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-4 lg:p-6">
                  {thread.map((item) => (
                    <AnimatedThreadItem key={item.question.id}>
                      <QuestionCard question={item.question} />
                      <AnswerFeedback
                        item={item}
                        isActive={item.question.id === activeQuestionId}
                        onSubmit={(text) => answer(item.question.id, text)}
                        onRetry={() => retry(item.question.id)}
                      />
                    </AnimatedThreadItem>
                  ))}

                  {isComplete && (
                    <div className="ml-9 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800">
                      Session complete — nice work. Head to History to review it
                      later, or practice another job.
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <aside className="space-y-4">
            {!starting && (
              <SessionStats thread={thread} totalQuestions={totalQuestions} />
            )}
            <InterviewTips />
          </aside>
        </div>
      </div>
    </div>
  );
}
