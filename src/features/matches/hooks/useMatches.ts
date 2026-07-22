import { useEffect, useState } from "react";
import { getMatchesForCv } from "../api";
import type { Match } from "../types";

export function useMatches(cvId: string | null) {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    if (!cvId) return;
    getMatchesForCv(cvId).then(setMatches);
  }, [cvId]);

  return matches;
}
