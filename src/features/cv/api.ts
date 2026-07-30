import { apiClient, apiUpload } from "@/shared/api/client";
import type { CvStatus, UploadAccepted } from "./types";
export function uploadCv(
  file: File,
  userId?: string,
  onProgress?: (percent: number) => void,
): Promise<UploadAccepted> {
  const formData = new FormData();
  formData.append("file", file);

  if (userId) {
    formData.append("user_id", userId);
  }

  return apiUpload<UploadAccepted>("/cv", formData, onProgress);
}

/** Poll target while a CV is being parsed. Used starting Day 2. */
export function getCvStatus(cvId: string): Promise<CvStatus> {
  return apiClient<CvStatus>(`/cv/${cvId}/status`);
}
