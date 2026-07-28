import React from "react";

export function ParsedFieldsView({ fields }: { fields: Record<string, unknown> }) {
  // TODO: render extracted CV fields
  return <pre>{JSON.stringify(fields, null, 2)}</pre>;
}
