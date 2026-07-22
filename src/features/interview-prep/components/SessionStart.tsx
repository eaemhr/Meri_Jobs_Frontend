import React from "react";
import { Button } from "@/shared/ui";
import { t } from "@/shared/i18n";

export function SessionStart({ onStart }: { onStart: () => void }) {
  return <Button onClick={onStart}>{t("interview.session.start")}</Button>;
}
