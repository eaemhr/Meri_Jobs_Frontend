"use client";
import React, { useState } from "react";
import {
  Check,
  X,
  Edit3,
  Download,
  ArrowLeft,
  AlertCircle,
  Sparkles,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import CVScoreGauge from "./CVScoreGauge";

interface Suggestion {
  id: string;
  section: string;
  sectionColor: string;
  type: "keyword" | "bullet" | "achievement" | "structure";
  typeLabel: string;
  original: string;
  suggested: string;
  impact: number;
  status: "pending" | "accepted" | "rejected" | "editing";
  editValue?: string;
}

// BACKEND INTEGRATION: Replace with suggestions from POST /api/cv/optimize response
const initialSuggestions: Suggestion[] = [
  {
    id: "sug-1",
    section: "Work Experience",
    sectionColor: "text-primary bg-primary-light",
    type: "bullet",
    typeLabel: "Weak bullet",
    original: "Worked on improving the sales process",
    suggested:
      "Redesigned sales pipeline reducing deal closure time by 28%, contributing to $120K additional ARR",
    impact: 12,
    status: "pending",
  },
  {
    id: "sug-2",
    section: "Skills",
    sectionColor: "text-accent bg-accent-light",
    type: "keyword",
    typeLabel: "Missing keyword",
    original: "(not present in CV)",
    suggested:
      'Add "CI/CD pipelines" — required in 73% of matched job listings',
    impact: 8,
    status: "pending",
  },
  {
    id: "sug-3",
    section: "Work Experience",
    sectionColor: "text-primary bg-primary-light",
    type: "achievement",
    typeLabel: "Unquantified achievement",
    original: "Led migration from monolithic architecture to microservices",
    suggested:
      "Led migration from monolithic to microservices architecture, reducing deployment time from 45min to 8min and improving system uptime to 99.7%",
    impact: 10,
    status: "pending",
  },
  {
    id: "sug-4",
    section: "Summary",
    sectionColor: "text-purple-700 bg-purple-50",
    type: "keyword",
    typeLabel: "Missing keyword",
    original: "passionate about remote work",
    suggested:
      'Replace with: "experienced in async-first remote collaboration using Slack, Notion, and Jira"',
    impact: 6,
    status: "pending",
  },
  {
    id: "sug-5",
    section: "Work Experience",
    sectionColor: "text-primary bg-primary-light",
    type: "bullet",
    typeLabel: "Vague bullet",
    original: "Developed responsive web interfaces for 12+ clients",
    suggested:
      "Delivered 14 production web applications for international clients using React and TypeScript, maintaining 98% on-time delivery rate",
    impact: 9,
    status: "pending",
  },
  {
    id: "sug-6",
    section: "Skills",
    sectionColor: "text-accent bg-accent-light",
    type: "keyword",
    typeLabel: "Missing keyword",
    original: "(not present in CV)",
    suggested:
      'Add "Kubernetes" — appears in 45% of senior dev job listings matching your profile',
    impact: 5,
    status: "pending",
  },
];

const BASE_SCORE = 58;

function calcScore(suggestions: Suggestion[]): number {
  const gained = suggestions
    .filter((s) => s.status === "accepted")
    .reduce((sum, s) => sum + s.impact, 0);
  return Math.min(100, BASE_SCORE + gained);
}

interface CVOptimizationPanelProps {
  onBack: () => void;
  onStartOver: () => void;
}

export default function CVOptimizationPanel({
  onBack,
}: CVOptimizationPanelProps) {
  const [suggestions, setSuggestions] =
    useState<Suggestion[]>(initialSuggestions);
  const [activeEditId, setActiveEditId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState("");
  const [exporting, setExporting] = useState(false);

  const score = calcScore(suggestions);
  const accepted = suggestions.filter((s) => s.status === "accepted").length;
  const rejected = suggestions.filter((s) => s.status === "rejected").length;
  const pending = suggestions.filter((s) => s.status === "pending").length;

  const updateStatus = (
    id: string,
    status: Suggestion["status"],
    editValue?: string,
  ) => {
    setSuggestions((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status, editValue: editValue ?? s.editValue } : s,
      ),
    );
    if (status === "accepted")
      toast.success("Suggestion applied — CV score updated");
    if (status === "rejected") toast.info("Suggestion dismissed");
  };

  const startEdit = (sug: Suggestion) => {
    setActiveEditId(sug.id);
    setEditDraft(sug.suggested);
  };

  const saveEdit = (id: string) => {
    updateStatus(id, "accepted", editDraft);
    setActiveEditId(null);
  };

  const handleExport = () => {
    setExporting(true);
    // BACKEND INTEGRATION: POST /api/cv/export → returns PDF blob URL
    setTimeout(() => {
      setExporting(false);
      toast.success("CV exported as PDF — check your downloads");
    }, 2000);
  };

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* LEFT: Suggestions list */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-foreground">
                AI Optimization Suggestions
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                {pending} pending · {accepted} accepted · {rejected} dismissed
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSuggestions((prev) =>
                    prev.map((s) =>
                      s.status === "pending" ? { ...s, status: "accepted" } : s,
                    ),
                  );
                  toast.success("All suggestions applied");
                }}
                className="btn-accent text-xs px-3 py-2"
              >
                <Check size={13} />
                Accept All
              </button>
            </div>
          </div>

          {suggestions.map((sug) => (
            <SuggestionCard
              key={sug.id}
              suggestion={sug}
              isEditing={activeEditId === sug.id}
              editDraft={editDraft}
              onEditDraftChange={setEditDraft}
              onAccept={() => updateStatus(sug.id, "accepted")}
              onReject={() => updateStatus(sug.id, "rejected")}
              onEdit={() => startEdit(sug)}
              onSaveEdit={() => saveEdit(sug.id)}
              onCancelEdit={() => setActiveEditId(null)}
              onUndo={() => updateStatus(sug.id, "pending")}
            />
          ))}
        </div>

        {/* RIGHT: Score panel + actions */}
        <div className="space-y-4">
          <div className="card-base p-5 text-center sticky top-20">
            <p className="section-label mb-4">CV Score</p>
            <CVScoreGauge score={score} previousScore={BASE_SCORE} size={160} />

            {/* <div className="mt-4 space-y-2.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Completeness</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: "82%" }}
                    />
                  </div>
                  <span className="tabular-nums font-semibold text-xs text-foreground">
                    82%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Keyword match</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, 55 + accepted * 6)}%` }}
                    />
                  </div>
                  <span className="tabular-nums font-semibold text-xs text-foreground">
                    {Math.min(100, 55 + accepted * 6)}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Clarity</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, 60 + accepted * 4)}%` }}
                    />
                  </div> */}
            {/* <span className="tabular-nums font-semibold text-xs text-foreground">
                    {Math.min(100, 60 + accepted * 4)}%
                  </span>
                </div>
              </div>
            </div> */}

            <div className="mt-5 p-3 rounded-xl bg-muted/50 border border-border text-left">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={14} className="text-accent" />
                <p className="text-xs font-semibold text-foreground">
                  Impact so far
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                Accepting all suggestions could raise your score to{" "}
                <span className="text-accent font-bold">
                  {Math.min(
                    100,
                    BASE_SCORE +
                      initialSuggestions.reduce((s, sg) => s + sg.impact, 0),
                  )}
                </span>
              </p>
            </div>

            <div className="mt-5 space-y-2">
              <button
                onClick={handleExport}
                disabled={exporting}
                className="btn-primary w-full text-sm"
              >
                {exporting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download size={15} />
                    Export as PDF
                  </>
                )}
              </button>
              <Link
                href="/job-matches"
                className="btn-accent w-full text-sm flex items-center justify-center gap-2"
              >
                <Sparkles size={15} />
                Find Matching Jobs
                <ChevronRight size={14} />
              </Link>
              <button onClick={onBack} className="btn-secondary w-full text-sm">
                <ArrowLeft size={14} />
                Back to Edit
              </button>
            </div>
          </div>

          {/* Score breakdown info card */}
          <div className="card-base p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle size={14} className="text-primary" />
              <p className="text-xs font-semibold text-foreground">
                How your score is calculated
              </p>
            </div>
            <div className="space-y-2 text-xs text-muted-foreground">
              <p>
                •{" "}
                <strong className="text-foreground">Completeness (30%):</strong>{" "}
                All sections filled with sufficient detail
              </p>
              <p>
                •{" "}
                <strong className="text-foreground">
                  Keyword relevance (40%):
                </strong>{" "}
                Match against skills required in your target roles
              </p>
              <p>
                • <strong className="text-foreground">Clarity (30%):</strong>{" "}
                Quantified achievements, action verbs, concise bullets
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SuggestionCard({
  suggestion: sug,
  isEditing,
  editDraft,
  onEditDraftChange,
  onAccept,
  onReject,
  onEdit,
  onSaveEdit,
  onCancelEdit,
  onUndo,
}: {
  suggestion: Suggestion;
  isEditing: boolean;
  editDraft: string;
  onEditDraftChange: (v: string) => void;
  onAccept: () => void;
  onReject: () => void;
  onEdit: () => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onUndo: () => void;
}) {
  const typeColors: Record<string, string> = {
    keyword: "bg-blue-50 text-blue-700 border-blue-200",
    bullet: "bg-purple-50 text-purple-700 border-purple-200",
    achievement: "bg-orange-50 text-orange-700 border-orange-200",
    structure: "bg-pink-50 text-pink-700 border-pink-200",
  };

  if (sug.status === "accepted") {
    return (
      <div className="card-base p-4 suggestion-accepted animate-pulse-highlight">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
              <Check size={12} className="text-accent-foreground" />
            </div>
            <span className="text-sm font-semibold text-accent">Applied</span>
            <span className={`badge-base border text-xs ${sug.sectionColor}`}>
              {sug.section}
            </span>
          </div>
          <button
            onClick={onUndo}
            className="text-xs text-muted-foreground hover:text-foreground underline"
          >
            Undo
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
          {sug.editValue ?? sug.suggested}
        </p>
      </div>
    );
  }

  if (sug.status === "rejected") {
    return (
      <div className="card-base p-4 suggestion-rejected">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
              <X size={12} className="text-muted-foreground" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              Dismissed
            </span>
            <span className="badge-base bg-muted text-muted-foreground border border-border text-xs">
              {sug.section}
            </span>
          </div>
          <button
            onClick={onUndo}
            className="text-xs text-muted-foreground hover:text-foreground underline"
          >
            Restore
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card-base p-4 border-l-4 border-l-primary animate-slide-up">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`badge-base border text-xs ${sug.sectionColor}`}>
            {sug.section}
          </span>
          <span className={`badge-base border text-xs ${typeColors[sug.type]}`}>
            {sug.typeLabel}
          </span>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <TrendingUp size={12} className="text-accent" />
          <span className="text-xs font-bold text-accent">
            +{sug.impact} pts
          </span>
        </div>
      </div>

      {sug.status === "pending" && !isEditing && (
        <>
          <div className="space-y-2 mb-3">
            <div className="p-2.5 rounded-lg bg-error-light border border-error/15">
              <p className="text-xs font-semibold text-error mb-1">Current</p>
              <p className="text-xs text-foreground">{sug.original}</p>
            </div>
            <div className="p-2.5 rounded-lg bg-accent-light border border-accent/15">
              <p className="text-xs font-semibold text-accent mb-1">
                Suggested
              </p>
              <p className="text-xs text-foreground">{sug.suggested}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onAccept}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-accent text-accent-foreground text-xs font-semibold hover:opacity-90 active:scale-95 transition-all"
            >
              <Check size={13} />
              Accept
            </button>
            <button
              onClick={onReject}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-border bg-card text-foreground text-xs font-semibold hover:bg-muted active:scale-95 transition-all"
            >
              <X size={13} />
              Reject
            </button>
            <button
              onClick={onEdit}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-primary-light text-primary text-xs font-semibold hover:bg-primary/20 active:scale-95 transition-all"
            >
              <Edit3 size={13} />
              Edit
            </button>
          </div>
        </>
      )}

      {isEditing && (
        <div className="space-y-2">
          <label className="text-xs font-semibold text-muted-foreground">
            Edit suggestion
          </label>
          <textarea
            autoFocus
            value={editDraft}
            onChange={(e) => onEditDraftChange(e.target.value)}
            rows={3}
            className="input-field text-xs resize-none"
          />
          <div className="flex gap-2">
            <button
              onClick={onSaveEdit}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-accent text-accent-foreground text-xs font-semibold hover:opacity-90 active:scale-95 transition-all"
            >
              <Check size={13} />
              Save & Apply
            </button>
            <button
              onClick={onCancelEdit}
              className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-border bg-card text-foreground text-xs font-semibold hover:bg-muted active:scale-95 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
