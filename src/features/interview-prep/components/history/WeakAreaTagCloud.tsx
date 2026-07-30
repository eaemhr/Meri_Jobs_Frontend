import { Compass } from "lucide-react";
import type { PastSession } from "../../types";

interface WeakAreaTagCloudProps {
  sessions: PastSession[];
}

export default function WeakAreaTagCloud({ sessions }: WeakAreaTagCloudProps) {
  const counts = new Map<string, number>();
  sessions.forEach((session) => {
    session.thread.forEach((item) => {
      item.feedback?.improvements.forEach((tag) => {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      });
    });
  });

  const tags = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);

  if (tags.length === 0) return null;

  const maxCount = tags[0][1];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-900">
        <Compass className="h-4 w-4 text-blue-600" /> Areas to focus on
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map(([tag, count]) => {
          const weight = count / maxCount;
          return (
            <span
              key={tag}
              className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-blue-700"
              style={{ fontSize: `${11 + weight * 4}px` }}
            >
              {tag}
            </span>
          );
        })}
      </div>
    </div>
  );
}
