import React from "react";
import { t } from "@/shared/i18n";

export function CvUploadDropzone({ onUpload }: { onUpload: (file: File) => void }) {
  return (
    <div>
      <p>{t("cv.upload.prompt")}</p>
      <input
        type="file"
        onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])}
      />
    </div>
  );
}
