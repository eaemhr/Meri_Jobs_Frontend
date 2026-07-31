"use client";

import { Search } from "lucide-react";

interface HistorySearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function HistorySearchBar({ value, onChange }: HistorySearchBarProps) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
      <Search className="h-4 w-4 flex-shrink-0 text-slate-400" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Filter by role or company…"
        className="w-full border-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
      />
    </div>
  );
}
