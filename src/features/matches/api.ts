import { apiClient } from "@/shared/api/client";
import type { Match } from "./types";

export function getMatchesForCv(cvId: string) {
  return apiClient<Match[]>(`/matches/${cvId}`);
}

export function getMatchDetail(cvId: string, jobId: string) {
  return apiClient<Match>(`/matches/${cvId}/${jobId}`);
}
