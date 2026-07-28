import React from "react";
import { MatchScoreBadge } from "./MatchScoreBadge";
import type { Match } from "../types";

export function MatchListView({ matches }: { matches: Match[] }) {
  return (
    <ul>
      {matches.map((m) => (
        <li key={m.jobId}>
          {m.jobTitle} <MatchScoreBadge score={m.score} gatePassed={m.gatePassed} />
        </li>
      ))}
    </ul>
  );
}
