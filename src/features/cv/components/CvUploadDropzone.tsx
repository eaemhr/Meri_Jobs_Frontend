'use client';

import React, { useRef, useState } from "react";
import { Upload, FileText, AlertCircle } from "lucide-react";

interface CvUploadDropzoneProps {
  onUpload: (file: File) => void;
}

export function CvUploadDropzone({
  onUpload,
}: CvUploadDropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [dragOver, setDragOver] = useState(false);
  const [fileError, setFileError] = useState("");

  const validateAndUpload = (file: File) => {
    setFileError("");

    const ext = file.name.split(".").pop()?.toLowerCase();

    if (!["pdf", "docx"].includes(ext || "")) {
      setFileError("Only PDF and DOCX files are supported.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setFileError("File size must be under 10MB.");
      return;
    }

    // Call your existing upload handler
    onUpload(file);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      validateAndUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    setDragOver(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      validateAndUpload(file);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200 ${
          dragOver
            ? "border-primary bg-primary-light"
            : "border-border bg-card hover:border-primary/50"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx"
          className="hidden"
          onChange={handleFileChange}
        />

        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
            dragOver ? "bg-primary" : "bg-primary-light"
          }`}
        >
          <Upload
            size={30}
            className={
              dragOver
                ? "text-primary-foreground"
                : "text-primary"
            }
          />
        </div>

        <h2 className="text-xl font-bold mb-2">
          {dragOver ? "Drop your CV here" : "Upload your CV"}
        </h2>

        <p className="text-sm text-muted-foreground mb-4">
          Drag and drop your PDF or DOCX file here, or click to browse.
        </p>

        <div className="flex justify-center gap-3">
          <span className="px-3 py-1 rounded-full border flex items-center gap-2 text-sm">
            <FileText size={14} />
            PDF
          </span>

          <span className="px-3 py-1 rounded-full border flex items-center gap-2 text-sm">
            <FileText size={14} />
            DOCX
          </span>

          <span className="text-xs flex items-center">
            Max 10MB
          </span>
        </div>
      </div>

      {fileError && (
        <div className="mt-4 p-3 rounded-xl border border-red-300 bg-red-50 flex gap-2">
          <AlertCircle size={18} className="text-red-500" />
          <p className="text-sm text-red-600">{fileError}</p>
        </div>
      )}

      <div className="mt-6 rounded-xl border p-5">
        <h3 className="font-semibold mb-3">
          What we extract from your CV
        </h3>

        <ul className="grid grid-cols-2 gap-2 text-sm">
          <li> Name & Contact</li>
          <li> Education</li>
          <li> Work Experience</li>
          <li> Skills</li>
          <li>Certifications</li>
          <li>Professional Summary</li>
        </ul>
      </div>
    </div>
  );
}
