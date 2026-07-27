// // import { apiClient } from "@/shared/api/client";

// // export interface UploadCvResponse {
// //   cv_id: string;
// //   status: "processing";
// //   message: string;
// // }

// // export interface CvStatusResponse {
// //   cv_id: string;
// //   status: "processing" | "completed" | "failed";
// //   parsed_data?: {
// //     name: string;
// //     email: string;
// //     phone: string;
// //     skills: string[];
// //     experience: unknown[];
// //     education: unknown[];
// //   };
// //   optimization_suggestions?: {
// //     section: string;
// //     suggestion: string;
// //     priority: string;
// //   }[];
// // }

// // export function uploadCv(file: File) {
// //   const formData = new FormData();
// //   formData.append("file", file);

// //   return apiClient<UploadCvResponse>("/cv/upload", {
// //     method: "POST",
// //     body: formData,
// //   });
// // }

// // export function getCvStatus(cvId: string) {
// //   return apiClient<CvStatusResponse>(`/cv/${cvId}/status`);
// // }

// // export function updateCvField(
// //   cvId: string,
// //   field: string,
// //   value: string
// // ) {
// //   return apiClient(`/cv/${cvId}`, {
// //     method: "PATCH",
// //     body: {
// //       field,
// //       value,
// //     },
// //   });
// // }

// // export function acceptSuggestion(
// //   cvId: string,
// //   suggestionId: string
// // ) {
// //   return apiClient(`/cv/${cvId}/suggestions/accept`, {
// //     method: "POST",
// //     body: {
// //       suggestion_id: suggestionId,
// //     },
// //   });
// // }

// // export function exportCv(cvId: string) {
// //   return apiClient(`/cv/${cvId}/export`);
// // }

// import { apiClient } from "@/shared/api/client";

// export interface UploadCvResponse {
//   cv_id: string;
//   status: "processing";
//   message: string;
// }

// export interface CvStatusResponse {
//   cv_id: string;
//   status: "processing" | "completed" | "failed";
//   parsed_data?: {
//     name: string;
//     email: string;
//     phone: string;
//     skills: string[];
//     experience: unknown[];
//     education: unknown[];
//   };
//   optimization_suggestions?: {
//     section: string;
//     suggestion: string;
//     priority: string;
//   }[];
// }

// export function uploadCv(file: File) {
//   const formData = new FormData();
//   formData.append("file", file);

//   return apiClient<UploadCvResponse>("/cv/upload", {
//     method: "POST",
//     body: formData,
//   });
// }

// export function getCvStatus(cvId: string) {
//   return apiClient<CvStatusResponse>(`/cv/${cvId}/status`);
// }

// export function updateCvField(cvId: string, field: string, value: string) {
//   return apiClient(`/cv/${cvId}`, {
//     method: "PATCH",
//     body: {
//       field,
//       value,
//     },
//   });
// }

// export function acceptSuggestion(cvId: string, suggestionId: string) {
//   return apiClient(`/cv/${cvId}/suggestions/accept`, {
//     method: "POST",
//     body: {
//       suggestion_id: suggestionId,
//     },
//   });
// }

// export function exportCv(cvId: string) {
//   return apiClient(`/cv/${cvId}/export`);
// }

// src/features/cv/api.ts
import { apiClient, apiUpload } from "@/shared/api/client";
import type { CvStatus, UploadAccepted } from "./types";

/**
 * Uploads a CV file. Returns immediately with a cv_id — parsing happens
 * asynchronously on the backend (never synchronous). Uses apiUpload (not
 * apiClient) specifically to get real upload-progress percentages for
 * <ParseStatusBanner />.
 */
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

  // Gateway-facing path — never /internal/cv/upload, which is cv-parser's
  // own internal route that only the gateway itself is allowed to call.
  return apiUpload<UploadAccepted>("/cv", formData, onProgress);
}

/** Poll target while a CV is being parsed. Used starting Day 2. */
export function getCvStatus(cvId: string): Promise<CvStatus> {
  return apiClient<CvStatus>(`/cv/${cvId}/status`);
}
