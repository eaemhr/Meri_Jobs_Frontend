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

// import { useEffect, useState } from "react";
// import { getCvStatus } from "../api";
// import type { CvStatus } from "../types";

// const POLL_INTERVAL_MS = 2000;

// export function usePollParseStatus(cvId: string | null) {
//   const [status, setStatus] = useState<CvStatus["status"] | "idle">("idle");
//   const [parsedData, setParsedData] = useState<CvStatus["parsed"]>(null);
//   const [flaggedSections, setFlaggedSections] = useState<string[]>([]);
//   const [score, setScore] = useState<CvStatus["score"]>(null);
//   const [suggestions, setSuggestions] = useState<CvStatus["suggestions"]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!cvId) {
//       setStatus("idle");
//       setParsedData(null);
//       setFlaggedSections([]);
//       setScore(null);
//       setSuggestions([]);
//       setLoading(false);
//       setError(null);
//       return;
//     }

//     let cancelled = false;
//     let timeoutId: number;

//     setLoading(true);
//     setError(null);

//     async function poll() {
//       try {
//         const response = await getCvStatus(cvId as string);
//         if (cancelled) return;

//         setStatus(response.status);

//         if (
//           response.status === "complete" ||
//           response.status === "needs_review"
//         ) {
//           setParsedData(response.parsed);
//           setFlaggedSections(response.flagged_sections);
//           setScore(response.score);
//           setSuggestions(response.suggestions);
//           setLoading(false);
//           return; // stop polling — terminal state reached
//         }

//         if (response.status === "failed") {
//           setError(response.error ?? "CV parsing failed");
//           setLoading(false);
//           return; // stop polling — terminal state reached
//         }

//         // Still "pending" or "processing" — schedule the next poll only
//         // after this one has fully resolved, so slow responses can never
//         // overlap with the next request.
//         timeoutId = window.setTimeout(poll, POLL_INTERVAL_MS);
//       } catch (err) {
//         if (cancelled) return;
//         setLoading(false);
//         setError(
//           err instanceof Error ? err.message : "Failed to check CV status",
//         );
//       }
//     }

//     poll();

//     return () => {
//       cancelled = true;
//       window.clearTimeout(timeoutId);
//     };
//   }, [cvId]);

//   return {
//     status,
//     parsedData,
//     flaggedSections,
//     score,
//     suggestions,
//     loading,
//     error,
//   };
// }

//demo
import { useEffect, useState } from "react";

export function usePollParseStatus(cvId: string | null) {
  const [status, setStatus] = useState<
    "idle" | "uploading" | "processing" | "complete"
  >("idle");

  const [parsedData, setParsedData] = useState<any>(null);
  const [flaggedSections, setFlaggedSections] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!cvId) {
      setStatus("idle");
      setParsedData(null);
      setFlaggedSections([]);
      return;
    }

    setStatus("processing");

    const timer = setTimeout(() => {
      setStatus("complete");

      setParsedData({
        name: "Kidist Debebe",
        email: "kidist@example.com",
        phone: "+251 91 234 5678",
        location: "Addis Ababa",
        summary:
          "Frontend Developer experienced in React, Next.js and TypeScript.",

        education: [
          {
            id: "edu1",
            institution: "Addis Ababa University",
            degree: "BSc Computer Science",
            dates: "2020-2024",
          },
        ],

        experience: [
          {
            id: "exp1",
            company: "Meri Jobs",
            title: "Frontend Developer",
            dates: "2025-Present",
            bullets: [
              "Built CV Upload UI",
              "Integrated Rocket UI",
              "Implemented polling",
            ],
            flagged: false,
          },
        ],

        skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],

        certifications: [],

        flaggedSections: [],
      });

      setFlaggedSections([]);
    }, 2000);

    return () => clearTimeout(timer);
  }, [cvId]);

  return {
    status,
    parsedData,
    flaggedSections,
    error,
  };
}
