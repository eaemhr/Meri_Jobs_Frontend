import { Bot } from "lucide-react";
import type { Question } from "../types";

const TAG_COLOR: Record<string, string> = {
  technical: "text-emerald-600",
  behavioral: "text-blue-600",
  easy: "text-slate-500",
  medium: "text-amber-600",
  hard: "text-rose-600",
};

export default function QuestionCard({ question }: { question: Question }) {
  return (
    <div className="flex items-start gap-2">
      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
        <Bot className="h-4 w-4" />
      </div>
      <div className="max-w-[80%] rounded-2xl rounded-tl-sm border border-slate-200 bg-slate-50 px-4 py-3">
        <div className="mb-1 flex gap-2 text-[11px] font-medium">
          {question.tags.map((tag) => (
            <span key={tag} className={TAG_COLOR[tag] ?? "text-slate-500"}>
              {tag}
            </span>
          ))}
        </div>
        <p className="text-sm text-slate-800">{question.text}</p>
      </div>
    </div>
  );
}
