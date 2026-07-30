import React from "react";
import { t } from "@/shared/i18n";
import type { CvStatus } from "../types";

interface ParseStatusBannerProps {
  status: CvStatus["status"] | "uploading";
  /** Shown only while status === "uploading". */
  uploadProgress?: number;
  /** The real backend message from CvStatus.error — never a hardcoded fallback. */
  errorMessage?: string | null;
}

export function ParseStatusBanner({
  status,
  uploadProgress = 0,
  errorMessage,
}: ParseStatusBannerProps) {
  if (status === "uploading") {
    return (
      <div className="max-w-xl mx-auto">
        <p className="text-sm text-foreground mb-1.5">
          {t("cv.upload.uploading")}
        </p>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-200"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1">{uploadProgress}%</p>
      </div>
    );
  }

  if (status === "pending" || status === "processing") {
    return (
      <div className="text-sm text-primary">{t("cv.upload.processing")}</div>
    );
  }

  // Distinct from "failed" — parsing succeeded, but some sections need the
  // user's manual review. Falling through to null (or to the "failed"
  // message) here would hide the one state where the user most needs
  // feedback, per NFR-F1.2.
  if (status === "needs_review") {
    return (
      <div className="text-sm text-warning">{t("cv.upload.needsReview")}</div>
    );
  }

  if (status === "failed") {
    return (
      <div className="text-sm text-error">
        {errorMessage ?? t("cv.upload.failed")}
      </div>
    );
  }

  // status === "complete" — nothing to show here; ParsedFieldsView takes over.
  return null;
}
