"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getInterviewHistory } from "../../api";
import type { PastSession } from "../../types";
import HistorySearchBar from "./HistorySearchBar";
import SessionListItem from "./SessionListItem";
import WeakAreaTagCloud from "./WeakAreaTagCloud";
import EmptyState from "./EmptyState";
import LoadingSkeleton from "./LoadingSkeleton";
import BottomNavigation from "./BottomNavigation";

// userId would come from shared/state's auth session in the real app.
const MOCK_USER_ID = "user-1";

export default function InterviewHistoryView() {
  const router = useRouter();
  const [sessions, setSessions] = useState<PastSession[] | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    getInterviewHistory(MOCK_USER_ID).then((result) => {
      if (!cancelled) setSessions(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    if (!sessions) return [];
    const q = query.trim().toLowerCase();
    if (!q) return sessions;
    return sessions.filter(
      (s) => s.job.title.toLowerCase().includes(q) || s.job.company.toLowerCase().includes(q)
    );
  }, [sessions, query]);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <button
          onClick={() => router.back()}
          className="mb-4 flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </button>

        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900">Practice history</h1>
          <p className="mt-1 text-sm text-slate-500">
            Review past sessions and track recurring focus areas.
          </p>
        </div>

        <div className="space-y-4">
          {sessions === null ? (
            <LoadingSkeleton />
          ) : sessions.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <WeakAreaTagCloud sessions={sessions} />
              <HistorySearchBar value={query} onChange={setQuery} />
              <div className="space-y-3">
                {filtered.map((session) => (
                  <SessionListItem key={session.id} session={session} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}
