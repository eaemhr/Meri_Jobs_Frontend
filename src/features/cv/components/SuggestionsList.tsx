import React from "react";

export function SuggestionsList({ suggestions }: { suggestions: string[] }) {
  return (
    <ul>
      {suggestions.map((s, i) => <li key={i}>{s}</li>)}
    </ul>
  );
}
