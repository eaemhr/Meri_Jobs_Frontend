// export interface CvUploadState {
//   cvId: string | null;
//   status: "idle" | "processing" | "done" | "failed";
// }

// export type CvStatus = "idle" | "processing" | "completed" | "failed";

// export interface CvUploadState {
//   cvId: string | null;
//   status: CvStatus;
// }

// src/features/cv/types.ts
// Mirrors cv-parser-api.yaml's schemas. If the backend changes a field,
// update here first and flag it to whoever else consumes this endpoint
// (per the onboarding guide's Rule #3).

export interface UploadAccepted {
  cv_id: string;
  status: "pending";
}

export interface CvScore {
  overall: number;
  completeness: number;
  keyword_relevance: number;
  clarity: number;
}

export interface ParsedCv {
  name: string;
  email: string;
  phone: string;
  professional_summary: string | null;
  education: Record<string, unknown>[];
  experience: Record<string, unknown>[];
  skills: string[];
  certifications: string[];
  confidence_score: number;
}

export interface Suggestion {
  suggestion_id: string;
  type: "missing_keyword" | "weak_bullet" | "unquantified";
  field_reference: string;
  suggestion_text: string;
  status: "pending" | "accepted" | "rejected" | "edited";
}

export interface CvStatus {
  cv_id: string;
  status: "pending" | "processing" | "complete" | "needs_review" | "failed";
  uploaded_at: string;
  updated_at: string;
  score: CvScore | null;
  parsed: ParsedCv | null;
  suggestions: Suggestion[];
  flagged_sections: string[];
  error: string | null;
}
