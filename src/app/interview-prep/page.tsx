import InterviewPrepView from "@/features/interview-prep/components/InterviewPrepView";
import type { Job } from "@/features/interview-prep/types";

// Stands in for what features/matches/ will eventually hand you via routing
// (e.g. a route param or query string once a real job/match id exists).
// Replace this with a real job lookup once that wiring is in place —
// everything else on the page stays the same.
const MOCK_JOB: Job = {
  id: "job-1",
  title: "React developer",
  company: "Nexa Labs",
  matchScore: 87,
  location: "Remote",
};

export default function InterviewPrepPage() {
  return <InterviewPrepView job={MOCK_JOB} />;
}
