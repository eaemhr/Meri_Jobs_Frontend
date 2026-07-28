import { JobMatch, MatchBreakdown } from './types';

export interface MatchesResponse {
  matches: JobMatch[];
  total: number;
}

export interface MatchDetailResponse {
  match: JobMatch;
  breakdown: MatchBreakdown;
}

export interface ApiError {
  error: string;
  message: string;
  status: number;
  correlation_id?: string;
  code?: string;
}