"use client";
import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  Wrench,
  Award,
  AlertTriangle,
  CheckCircle2,
  Edit3,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
} from "lucide-react";
import { t } from "@/shared/i18n";
import type { ParsedCv } from "../types";

interface ParsedFieldsViewProps {
  fields: ParsedCv;
  flaggedSections?: string[];
  onProceed?: () => void;
  onStartOver?: () => void;
}

interface WorkEntry {
  id?: string;
  company: string;
  title: string;
  dates: string;
  bullets: string[];
}

interface EducationEntry {
  id?: string;
  institution: string;
  degree: string;
  dates: string;
}

function withCount(key: string, count: number): string {
  return t(key).replace("{count}", String(count));
}

export function ParsedFieldsView({
  fields,
  flaggedSections = [],
  onProceed = () => {},
  onStartOver = () => {},
}: ParsedFieldsViewProps) {
  const [data, setData] = useState({
    name: fields.name ?? "",
    email: fields.email ?? "",
    phone: fields.phone ?? "",
    location: "",
    summary: fields.professional_summary ?? "",

    education: ((fields.education as unknown as EducationEntry[]) ?? []).map(
      (edu, idx) => ({
        ...edu,
        id: edu.id ?? `edu-${idx}`,
      }),
    ),

    experience: ((fields.experience as unknown as WorkEntry[]) ?? []).map(
      (exp, idx) => ({
        ...exp,
        id: exp.id ?? `exp-${idx}`,
      }),
    ),

    skills: fields.skills ?? [],
    certifications: fields.certifications ?? [],
  });

  const [editingField, setEditingField] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    "sec-contact": true,
    "sec-summary": true,
    "sec-education": true,
    "sec-experience": true,
    "sec-skills": true,
    "sec-certs": true,
  });

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Best-effort match against flagged_sections by entry id — see TODO above.
  const isFlagged = (id: string) => flaggedSections.includes(id);
  const flagCount = flaggedSections.length;

  const updateField = (field: keyof typeof data, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setEditingField(null);
  };

  const updateExpBullet = (expId: string, bulletIdx: number, value: string) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) =>
        e.id === expId
          ? {
              ...e,
              bullets: e.bullets.map((b, i) => (i === bulletIdx ? value : b)),
            }
          : e,
      ),
    }));
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {flagCount > 0 && (
        <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5 mb-6">
          <AlertTriangle
            size={18}
            className="text-warning flex-shrink-0 mt-0.5"
          />
          <div>
            <p className="text-sm font-semibold text-foreground">
              {withCount(
                flagCount > 1
                  ? "cv.parsed.sectionsNeedReviewPlural"
                  : "cv.parsed.sectionsNeedReview",
                flagCount,
              )}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {t("cv.parsed.reviewExplainer")}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT COLUMN */}
        <div className="space-y-4">
          <SectionCard
            id="sec-contact"
            icon={<User size={16} className="text-primary" />}
            title={t("Contact Information")}
            expanded={expandedSections["sec-contact"]}
            onToggle={() => toggleSection("sec-contact")}
          >
            <div className="space-y-6">
              {[
                {
                  id: "field-name",
                  icon: User,
                  label: t("FullName"),
                  field: "name" as const,
                  value: data.name,
                },
                {
                  id: "field-email",
                  icon: Mail,
                  label: t("Email"),
                  field: "email" as const,
                  value: data.email,
                },
                {
                  id: "field-phone",
                  icon: Phone,
                  label: t("Phone"),
                  field: "phone" as const,
                  value: data.phone,
                },
              ].map((item) => {
                const Icon = item.icon;
                const isEditing = editingField === item.id;
                return (
                  <div key={item.id} className="group">
                    <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                      {item.label}
                    </label>
                    {isEditing ? (
                      <input
                        autoFocus
                        defaultValue={item.value}
                        onBlur={(e) => updateField(item.field, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter")
                            updateField(
                              item.field,
                              (e.target as HTMLInputElement).value,
                            );
                          if (e.key === "Escape") setEditingField(null);
                        }}
                        className="input-field text-sm"
                      />
                    ) : (
                      <div
                        className="flex items-center gap-2 p-4 rounded-xl border border-transparent hover:border-border hover:bg-muted/50 cursor-pointer transition-all group"
                        onClick={() => setEditingField(item.id)}
                      >
                        <Icon
                          size={14}
                          className="text-muted-foreground flex-shrink-0"
                        />
                        <span className="text-sm text-foreground flex-1">
                          {item.value}
                        </span>
                        <Edit3
                          size={12}
                          className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </SectionCard>

          <SectionCard
            id="sec-summary"
            icon={<Briefcase size={16} className="text-primary" />}
            title={t("Professional Summary")}
            expanded={expandedSections["sec-summary"]}
            onToggle={() => toggleSection("sec-summary")}
          >
            {editingField === "field-summary" ? (
              <textarea
                autoFocus
                defaultValue={data.summary}
                rows={4}
                onBlur={(e) => updateField("summary", e.target.value)}
                className="input-field text-sm resize-none"
              />
            ) : (
              <div
                className="p-4 rounded-xl border border-transparent hover:border-border hover:bg-muted/50 cursor-pointer transition-all group"
                onClick={() => setEditingField("field-summary")}
              >
                <p className="text-base leading-8 text-gray-700">
                  {data.summary || t("NoSummary")}
                </p>
                <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Edit3 size={11} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {t("ClickToEdit")}
                  </span>
                </div>
              </div>
            )}
          </SectionCard>

          <SectionCard
            id="sec-education"
            icon={<GraduationCap size={16} className="text-primary" />}
            title={t("Education")}
            count={data.education.length}
            expanded={expandedSections["sec-education"]}
            onToggle={() => toggleSection("sec-education")}
          >
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div
                  key={edu.id}
                  className="p-4 rounded-xl bg-muted/40 border border-border"
                >
                  <p className="font-semibold text-sm text-foreground">
                    {edu.degree}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {edu.institution}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {edu.dates}
                  </p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4">
          <SectionCard
            id="sec-experience"
            icon={<Briefcase size={16} className="text-primary" />}
            title={t("Work Experience")}
            count={data.experience.length}
            expanded={expandedSections["sec-experience"]}
            onToggle={() => toggleSection("sec-experience")}
          >
            <div className="space-y-4">
              {data.experience.map((exp) => {
                const flagged = isFlagged(exp.id);
                return (
                  <div
                    key={exp.id}
                    className={`p-5 rounded-2xl border bg-white transition-all ${
                      flagged
                        ? "flagged-section border-warning/40"
                        : "bg-muted/40 border-border"
                    }`}
                  >
                    {flagged && (
                      <div className="mt-4 flex items-center justify-between rounded-xl border border-yellow-300 bg-yellow-50 px-4 py-3">
                        <AlertTriangle
                          size={13}
                          className="text-warning flex-shrink-0"
                        />
                        <p className="text-xs text-warning font-medium">
                          {t("EntryFlagged")}
                        </p>
                        {/* TODO(Phase 5): call PATCH /internal/cv/{id} with
                            the confirmed value — editing clears the flag
                            server-side automatically. Not wired yet. */}
                        <button className="ml-auto text-xs text-accent font-semibold hover:underline">
                          {t("MarkAsCorrect")}
                        </button>
                      </div>
                    )}
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-sm text-foreground">
                          {exp.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {exp.company}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {exp.dates}
                        </p>
                      </div>
                    </div>
                    <ul className="mt-2 space-y-1.5">
                      {exp.bullets.map((bullet, bi) => (
                        <li
                          key={`${exp.id}-bullet-${bi + 1}`}
                          className="group flex items-start gap-2"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          {editingField === `${exp.id}-bullet-${bi}` ? (
                            <input
                              autoFocus
                              defaultValue={bullet}
                              onBlur={(e) => {
                                updateExpBullet(exp.id, bi, e.target.value);
                                setEditingField(null);
                              }}
                              className="input-field text-xs flex-1"
                            />
                          ) : (
                            <span
                              className="text-xs text-foreground flex-1 cursor-pointer hover:text-primary transition-colors"
                              onClick={() =>
                                setEditingField(`${exp.id}-bullet-${bi}`)
                              }
                            >
                              {bullet}
                            </span>
                          )}
                          <Edit3
                            size={11}
                            className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5 cursor-pointer"
                            onClick={() =>
                              setEditingField(`${exp.id}-bullet-${bi}`)
                            }
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </SectionCard>

          <SectionCard
            id="sec-skills"
            icon={<Wrench size={16} className="text-primary" />}
            title={t("Skills")}
            count={data.skills.length}
            expanded={expandedSections["sec-skills"]}
            onToggle={() => toggleSection("sec-skills")}
          >
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span
                  key={`skill-${skill}`}
                  className="rounded-full bg-blue-50 border-blue-100 px-4 py-1 text-sm text-blue-600 border-primary/20 group cursor-pointer hover:bg-error-light hover:text-error hover:border-error/20 transition-all"
                >
                  {skill}
                  <Trash2
                    size={10}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </span>
              ))}
              <button className="badge-base bg-muted text-muted-foreground border border-dashed border-border hover:border-primary hover:text-primary transition-all">
                <Plus size={12} />
                {t("AddSkill")}
              </button>
            </div>
          </SectionCard>

          <SectionCard
            id="sec-certs"
            icon={<Award size={16} className="text-primary" />}
            title={t("Certifications")}
            count={data.certifications.length}
            expanded={expandedSections["sec-certs"]}
            onToggle={() => toggleSection("sec-certs")}
          >
            <div className="space-y-2">
              {data.certifications.map((cert) => (
                <div
                  key={`cert-${cert}`}
                  className="flex items-center gap-3 p-4 rounded-xl bg-muted/40 border border-border"
                >
                  <Award size={14} className="text-accent flex-shrink-0" />
                  <span className="text-sm text-foreground flex-1">{cert}</span>
                  <CheckCircle2
                    size={14}
                    className="text-accent flex-shrink-0"
                  />
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="mt-8 flex justify-between items-center pt-6">
        <button onClick={onStartOver} className="btn-secondary">
          Upload Different CV
        </button>

        <div className="flex-1" />

        {flagCount > 0 && (
          <div className="flex items-center gap-2 text-warning text-sm">
            <AlertTriangle size={16} />
            <span>
              {flagCount} flagged section{flagCount > 1 ? "s" : ""} remaining
            </span>
          </div>
        )}

        <button onClick={onProceed} className="btn-primary">
          Optimize My CV →
        </button>
      </div>
    </div>
  );
}

function SectionCard({
  icon,
  title,
  count,
  expanded,
  onToggle,
  children,
}: {
  id: string;
  icon: React.ReactNode;
  title: string;
  count?: number;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border bg-white shadow-sm overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-6 py-5 hover:bg-muted/30 transition-colors text-left"
        aria-expanded={expanded}
      >
        <div className="w-7 h-7 rounded-lg bg-primary-light flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <span className="font-semibold text-sm text-foreground flex-1">
          {title}
        </span>
        {count !== undefined && (
          <span className="badge-base bg-muted text-muted-foreground border border-border text-xs">
            {count}
          </span>
        )}
        {expanded ? (
          <ChevronUp size={16} className="text-muted-foreground" />
        ) : (
          <ChevronDown size={16} className="text-muted-foreground" />
        )}
      </button>
      {expanded && <div className="px-6 pb-6">{children}</div>}
    </div>
  );
}
