"use client";

import { useState } from "react";
import { ChevronDown, Calendar } from "lucide-react";
import type { PastSession } from "../../types";
import QuestionCard from "../QuestionCard";
import AnswerFeedback from "../AnswerFeedback";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function SessionListItem({ session }: { session: PastSession }) {
  const [expanded, setExpanded] = useState(false);
  const answeredCount = session.thread.filter((t) => t.status === "done").length;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white">
      <button
        onClick={() => setExpanded((e) => !e)}
        className="flex w-full items-center justify-between gap-3 p-4 text-left"
      >
        <div>
          <p className="text-sm font-semibold text-slate-900">
            {session.job.title} · {session.job.company}
          </p>
          <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
            <Calendar className="h-3 w-3" />
            {formatDate(session.completedAt)} · {answeredCount} questions
          </p>
        </div>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-slate-400 transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {expanded && (
        <div className="space-y-6 border-t border-slate-100 p-4">
          {session.thread.map((item) => (
            <div key={item.question.id} className="space-y-3">
              <QuestionCard question={item.question} />
              <AnswerFeedback item={item} isActive={false} onSubmit={() => {}} onRetry={() => {}} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
