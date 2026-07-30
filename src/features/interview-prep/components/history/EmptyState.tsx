import { History } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
      <History className="h-6 w-6 text-slate-300" />
      <p className="text-sm font-medium text-slate-700">No practice sessions yet</p>
      <p className="text-xs text-slate-500">
        Sessions you complete will show up here so you can review them anytime.
      </p>
    </div>
  );
}
