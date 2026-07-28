import React from "react";
import { t } from "@/shared/i18n";

export function MatchScoreBadge({ score, gatePassed }: { score: number; gatePassed: boolean }) {
  return (
    <span title={t("matches.score.label")}>
      {gatePassed ? `${Math.round(score * 100)}%` : "Not eligible"}
    </span>
  );
}
