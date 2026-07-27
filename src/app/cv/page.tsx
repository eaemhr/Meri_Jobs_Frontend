// import React from "react";
// import { CvUploadDropzone } from "@/features/cv/components/CvUploadDropzone";

// export default function CvPage() {
//   return <CvUploadDropzone onUpload={() => {}} />;
// }
"use client";
import { ParsedFieldsView } from "@/features/cv/components/ParsedFieldsView";
import React, { useState } from "react";
import { useSession } from "@/features/auth/hooks/useSession";
import { CvUploadDropzone } from "@/features/cv/components/CvUploadDropzone";
import { ParseStatusBanner } from "@/features/cv/components/ParseStatusBanner";
import { uploadCv } from "@/features/cv/api";
import { usePollParseStatus } from "@/features/cv/hooks/usePollParseStatus";
import CVOptimizationPanel from "@/features/cv/components/CVOptimizationPanel";

// TEMP(dev-only): auth isn't wired up on the backend yet. Falls back to a
// fake user id so upload can still be tested end-to-end. Remove this and
// restore the real guard below once auth actually lands.
const DEV_FALLBACK_USER_ID = "temp-dev-user-id";

export default function CvPage() {
  const [cvId, setCvId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const { user } = useSession();

  const { status, parsedData, flaggedSections, error } =
    usePollParseStatus(cvId);
  const [step, setStep] = useState<"upload" | "review" | "optimize">("upload");

  const isUploading = !!selectedFile && !cvId && !uploadError;

  async function handleUpload(file: File) {
    // TEMP(dev-only): guard disabled while backend auth is unfinished —
    // uncomment this block once /auth/login actually issues real sessions.
    // if (!user) {
    //   setUploadError("You need to be signed in to upload a CV.");
    //   return;
    // }
    //new
    // const userId = user?.id ?? DEV_FALLBACK_USER_ID;
    // setSelectedFile(file);
    // setUploadError(null);
    // setUploadProgress(0);
    // try {
    //   const response = await uploadCv(file, userId, (percent) => {
    //     setUploadProgress(percent);
    //   });
    //   setCvId(response.cv_id);
    // } catch (err) {
    //   setUploadError(err instanceof Error ? err.message : "Upload failed. Please try again.");
    // }

    //temp

    setSelectedFile(file);
    setUploadError(null);
    setUploadProgress(100);

    // Fake upload
    setTimeout(() => {
      setCvId("demo-cv-id");
      setStep("review");
    }, 500);
  }

  function handleStartOver() {
    setCvId(null);
    setSelectedFile(null);
    setUploadProgress(0);
    setUploadError(null);
    setStep("upload");
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">CV Upload</h1>

      {step === "upload" && (
        <>
          <CvUploadDropzone onUpload={handleUpload} />

          {uploadError && (
            <ParseStatusBanner status="failed" errorMessage={uploadError} />
          )}

          <div className="mt-8">
            {isUploading && (
              <ParseStatusBanner
                status="uploading"
                uploadProgress={uploadProgress}
              />
            )}

            {cvId && !isUploading && (
              <ParseStatusBanner
                status={status === "idle" ? "pending" : status}
                errorMessage={error}
              />
            )}
          </div>
        </>
      )}

      {/* Review Screen */}
      {parsedData && step === "review" && (
        <div className="mt-8">
          <ParsedFieldsView
            fields={parsedData}
            flaggedSections={flaggedSections}
            onProceed={() => setStep("optimize")}
            onStartOver={handleStartOver}
          />
        </div>
      )}

      {/* Optimization Screen */}
      {step === "optimize" && (
        <CVOptimizationPanel
          onBack={() => setStep("review")}
          onStartOver={handleStartOver}
        />
      )}
    </div>
  );
}
