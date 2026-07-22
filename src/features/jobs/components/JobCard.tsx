import React from "react";
import type { Job } from "../types";

export function JobCard({ job }: { job: Job }) {
  return (
    <div>
      <h3>{job.title}</h3>
      <p>{job.company}</p>
      <a href={job.sourceUrl} target="_blank" rel="noreferrer">Apply</a>
    </div>
  );
}
