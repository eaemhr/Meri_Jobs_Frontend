"use client";

import { Building2, Target } from "lucide-react";
import type { Job } from "../types";

// Repurposed: this used to gate the session behind a "Start" button. Since
// the job is already known when the user lands on this page (it came in via
// routing from features/matches/), the session now starts automatically —
// this component is just a context banner, no click required.
export default function SessionStart({ job }: { job: Job }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        <Building2 className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Practicing for
        </p>
        <h2 className="mt-0.5 text-lg font-semibold text-slate-900">
          {job.title} · {job.company}
        </h2>
        <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
          <Target className="h-3.5 w-3.5 text-emerald-500" />
          {job.matchScore}% match{job.location ? ` · ${job.location}` : ""}
        </p>
      </div>
    </div>
  );
}
