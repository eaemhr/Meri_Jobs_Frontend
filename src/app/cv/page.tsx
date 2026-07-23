// import React from "react";
// import { CvUploadDropzone } from "@/features/cv/components/CvUploadDropzone";

// export default function CvPage() {
//   return <CvUploadDropzone onUpload={() => {}} />;
// }

"use client";

import React, { useState } from "react";
import { CvUploadDropzone } from "@/features/cv/components/CvUploadDropzone";
import { uploadCv } from "@/features/cv/api";
import { usePollParseStatus } from "@/features/cv/hooks/usePollParseStatus";

export default function CvPage() {
  const [cvId, setCvId] = useState<string | null>(null);

  const { status, parsedData, loading, error } = usePollParseStatus(cvId);

  async function handleUpload(file: File) {
    try {
      const response = await uploadCv(file);
      setCvId(response.cv_id);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  }

  return (
    <div>
      <h1>CV Upload</h1>

      <CvUploadDropzone onUpload={handleUpload} />

      <p>Status: {status}</p>

      {loading && <p>Processing your CV...</p>}

      {error && <p>{error}</p>}

      {parsedData && <pre>{JSON.stringify(parsedData, null, 2)}</pre>}
    </div>
  );
}
