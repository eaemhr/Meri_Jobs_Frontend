import React from "react";
import { Input } from "@/shared/ui";
import { t } from "@/shared/i18n";

export function JobSearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  return (
    <Input
      placeholder={t("jobs.search.placeholder")}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}
