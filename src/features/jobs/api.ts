import { apiClient } from "@/shared/api/client";
import type { Job } from "./types";

export function searchJobs(query: string) {
  return apiClient<Job[]>(`/jobs?q=${encodeURIComponent(query)}`);
}

export function getJob(jobId: string) {
  return apiClient<Job>(`/jobs/${jobId}`);
}
