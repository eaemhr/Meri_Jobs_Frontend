import React from "react";
import { t } from "@/shared/i18n";

export function ParseStatusBanner({ status }: { status: "processing" | "done" | "failed" }) {
  if (status === "processing") return <div>{t("cv.upload.processing")}</div>;
  if (status === "failed") return <div>Something went wrong parsing your CV.</div>;
  return null;
}
