import { Home, Briefcase, FileText, History as HistoryIcon } from "lucide-react";

// Placeholder only. Per the onboarding guide, a persistent app-wide nav bar
// like this belongs in shared/ui/ (Dev 4 owns it) so every feature gets the
// same one — don't let this local copy become the real implementation.
export default function BottomNavigation() {
  const items = [
    { icon: Home, label: "Home" },
    { icon: FileText, label: "CV" },
    { icon: Briefcase, label: "Jobs" },
    { icon: HistoryIcon, label: "Prep" },
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl justify-around px-4 py-2">
        {items.map(({ icon: Icon, label }) => (
          <button key={label} className="flex flex-col items-center gap-0.5 px-3 py-1 text-slate-500">
            <Icon className="h-5 w-5" />
            <span className="text-[11px]">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
