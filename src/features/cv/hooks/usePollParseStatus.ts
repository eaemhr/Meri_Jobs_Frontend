// import { useEffect, useState } from "react";
// import { getCvStatus } from "../api";

// export function usePollParseStatus(cvId: string | null, intervalMs = 2000) {
//   const [status, setStatus] = useState<"processing" | "done" | "failed" | null>(null);

//   useEffect(() => {
//     if (!cvId) return;
//     const interval = setInterval(async () => {
//       const result = await getCvStatus(cvId);
//       setStatus(result.status);
//       if (result.status !== "processing") clearInterval(interval);
//     }, intervalMs);
//     return () => clearInterval(interval);
//   }, [cvId, intervalMs]);

//   return status;
// }

import { useEffect, useState } from "react";
import { getCvStatus } from "../api";

export function usePollParseStatus(cvId: string | null) {
  const [status, setStatus] = useState<
    "idle" | "processing" | "completed" | "failed"
  >("idle");

  const [parsedData, setParsedData] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!cvId) return;

    setLoading(true);

    const interval = setInterval(async () => {
      try {
        const response = await getCvStatus(cvId);

        setStatus(response.status);

        if (response.status === "completed") {
          setParsedData(response.parsed_data);
          setLoading(false);
          clearInterval(interval);
        }

        if (response.status === "failed") {
          setLoading(false);
          clearInterval(interval);
        }
      } catch (err) {
        setLoading(false);
        setError("Failed to check CV status");
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [cvId]);

  return {
    status,
    parsedData,
    loading,
    error,
  };
}
