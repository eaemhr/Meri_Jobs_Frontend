import React from "react";
import type { Job } from "../types";

export function JobDetailView({ job }: { job: Job }) {
  return (
    <div>
      <h2>{job.title}</h2>
      <p>{job.description}</p>
    </div>
  );
}
