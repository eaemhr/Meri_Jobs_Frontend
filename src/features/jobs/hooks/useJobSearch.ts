import { useState, useCallback } from "react";
import { searchJobs } from "../api";
import type { Job } from "../types";

export function useJobSearch() {
  const [results, setResults] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  const search = useCallback(async (query: string) => {
    setLoading(true);
    const jobs = await searchJobs(query);
    setResults(jobs);
    setLoading(false);
  }, []);

  return { results, loading, search };
}
