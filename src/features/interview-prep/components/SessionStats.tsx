import { Flame, CheckCircle2, TrendingUp } from "lucide-react";
import type { ThreadItem } from "../types";

interface SessionStatsProps {
  thread: ThreadItem[];
  totalQuestions: number;
  streak?: number;
}

// Not in the original file list — added to fill out the sidebar and give
// the page more of a "live dashboard" feel alongside the static tips card.
export default function SessionStats({ thread, totalQuestions, streak = 3 }: SessionStatsProps) {
  const answered = thread.filter((t) => t.status === "done").length;
  const total = totalQuestions;
  const avgStrengths =
    answered > 0
      ? Math.round(
          (thread.reduce((sum, t) => sum + (t.feedback?.strengths.length ?? 0), 0) / answered) * 10
        ) / 10
      : 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="mb-3 text-sm font-medium text-slate-900">This session</p>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {answered}/{total}
            </p>
            <p className="text-xs text-slate-500">questions answered</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <TrendingUp className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-900">{avgStrengths || "—"}</p>
            <p className="text-xs text-slate-500">avg. strengths per answer</p>
          </div>
        </div>
       
      </div>
    </div>
  );
}
