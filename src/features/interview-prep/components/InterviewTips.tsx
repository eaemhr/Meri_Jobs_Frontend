import { Target as TargetIcon, Star, PenLine, MessageSquareText, Compass } from "lucide-react";

const TIPS = [
  {
    icon: Star,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    text: "Use the STAR method for behavioral questions (Situation, Task, Action, Result).",
  },
  {
    icon: TargetIcon,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
    text: "Be specific — vague answers score lower. Name the project, the tool, the outcome.",
  },
  {
    icon: PenLine,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-500",
    text: "Aim for 2-3 minute answers. Too short = unprepared. Too long = unfocused.",
  },
  {
    icon: MessageSquareText,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    text: "Practice the same question a few times. Each pass improves clarity and confidence.",
  },
];

export default function InterviewTips() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-900">
        <Compass className="h-4 w-4 text-blue-600" /> Interview tips
      </p>
      <div className="space-y-2">
        {TIPS.map((tip, i) => {
          const Icon = tip.icon;
          return (
            <div
              key={i}
              className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs text-slate-600"
            >
              <span
                className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${tip.iconBg} ${tip.iconColor}`}
              >
                <Icon className="h-3.5 w-3.5" />
              </span>
              <span className="leading-relaxed">{tip.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
