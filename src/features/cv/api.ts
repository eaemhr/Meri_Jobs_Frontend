import { apiClient } from "@/shared/api/client";

export function uploadCv(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  // NOTE: apiClient assumes JSON bodies — extend it (or add a variant)
  // to support multipart/form-data for real file uploads.
  return apiClient<{ cvId: string }>("/cv/upload", { method: "POST", body: formData as any });
}

export function getCvStatus(cvId: string) {
  return apiClient<{ status: "processing" | "done" | "failed" }>(`/cv/${cvId}/status`);
}

export function getCvSuggestions(cvId: string) {
  return apiClient<{ suggestions: string[] }>(`/cv/${cvId}/suggestions`);
}
