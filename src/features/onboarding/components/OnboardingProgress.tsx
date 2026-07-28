import React from "react";

export function OnboardingProgress({ step, total }: { step: number; total: number }) {
  return <div>{step} / {total}</div>;
}
