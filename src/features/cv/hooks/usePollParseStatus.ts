import { useEffect, useState } from "react";
import { getCvStatus } from "../api";

export function usePollParseStatus(cvId: string | null, intervalMs = 2000) {
  const [status, setStatus] = useState<"processing" | "done" | "failed" | null>(null);

  useEffect(() => {
    if (!cvId) return;
    const interval = setInterval(async () => {
      const result = await getCvStatus(cvId);
      setStatus(result.status);
      if (result.status !== "processing") clearInterval(interval);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [cvId, intervalMs]);

  return status;
}
