"use client";

import { useState } from "react";
import { Send, Sparkles, AlertTriangle, RefreshCw } from "lucide-react";
import type { ThreadItem } from "../types";

interface AnswerFeedbackProps {
  item: ThreadItem;
  isActive: boolean;
  onSubmit: (text: string) => void;
  onRetry: () => void;
}

export default function AnswerFeedback({ item, isActive, onSubmit, onRetry }: AnswerFeedbackProps) {
  const [draft, setDraft] = useState("");

  // Not yet reached in the thread — render nothing.
  if (!item.answerText && !isActive) return null;

  // Active, unanswered question — show the input.
  if (!item.answerText && isActive) {
    return (
      <div className="ml-9">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type your answer here… Use the STAR method: Situation, Task, Action, Result."
          rows={4}
          className="w-full resize-none rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-800 outline-none focus:border-blue-400"
        />
        <div className="mt-1 text-right text-xs text-slate-400">{draft.length} chars</div>
        <button
          onClick={() => draft.trim() && onSubmit(draft.trim())}
          disabled={!draft.trim()}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send className="h-3.5 w-3.5" /> Get AI feedback
        </button>
      </div>
    );
  }

  return (
    <div className="ml-9 flex flex-col items-end gap-2">
      <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-blue-600 px-4 py-3 text-sm text-white">
        {item.answerText}
      </div>

      {item.status === "loading" && (
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-500">
          <span className="flex gap-1">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-400" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-400 [animation-delay:200ms]" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-400 [animation-delay:400ms]" />
          </span>
          Reviewing your answer — this can take a moment
        </div>
      )}

      {item.status === "timeout" && (
        <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-700">
          <AlertTriangle className="h-3.5 w-3.5" />
          We couldn&apos;t get feedback in time.
          <button onClick={onRetry} className="flex items-center gap-1 font-medium underline">
            <RefreshCw className="h-3 w-3" /> Retry
          </button>
        </div>
      )}

      {item.status === "done" && item.feedback && (
        <div className="w-full max-w-[80%] rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
          <p className="mb-1 flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <Sparkles className="h-3.5 w-3.5 text-blue-500" /> AI FEEDBACK
          </p>
          <p className="text-slate-700">{item.feedback.content}</p>
          <div className="mt-2 space-y-1 text-xs">
            <p>
              <span className="font-medium text-emerald-600">Strengths — </span>
              {item.feedback.strengths.join(", ")}
            </p>
            <p>
              <span className="font-medium text-amber-600">Improve — </span>
              {item.feedback.improvements.join(", ")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
