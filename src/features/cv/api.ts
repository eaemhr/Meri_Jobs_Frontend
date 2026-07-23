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

// export function updateCvField(
//   cvId: string,
//   field: string,
//   value: string
// ) {
//   return apiClient(`/cv/${cvId}`, {
//     method: "PATCH",
//     body: {
//       field,
//       value,
//     },
//   });
// }

// export function acceptSuggestion(
//   cvId: string,
//   suggestionId: string
// ) {
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

import { apiClient } from "@/shared/api/client";

export interface UploadCvResponse {
  cv_id: string;
  status: "processing";
  message: string;
}

export interface CvStatusResponse {
  cv_id: string;
  status: "processing" | "completed" | "failed";
  parsed_data?: {
    name: string;
    email: string;
    phone: string;
    skills: string[];
    experience: unknown[];
    education: unknown[];
  };
  optimization_suggestions?: {
    section: string;
    suggestion: string;
    priority: string;
  }[];
}

export function uploadCv(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return apiClient<UploadCvResponse>("/cv/upload", {
    method: "POST",
    body: formData,
  });
}

export function getCvStatus(cvId: string) {
  return apiClient<CvStatusResponse>(`/cv/${cvId}/status`);
}

export function updateCvField(cvId: string, field: string, value: string) {
  return apiClient(`/cv/${cvId}`, {
    method: "PATCH",
    body: {
      field,
      value,
    },
  });
}

export function acceptSuggestion(cvId: string, suggestionId: string) {
  return apiClient(`/cv/${cvId}/suggestions/accept`, {
    method: "POST",
    body: {
      suggestion_id: suggestionId,
    },
  });
}

export function exportCv(cvId: string) {
  return apiClient(`/cv/${cvId}/export`);
}
