import { useState } from "react";

export function useOnboardingFlow(totalSteps: number) {
  const [step, setStep] = useState(1);
  const next = () => setStep((s) => Math.min(s + 1, totalSteps));
  const back = () => setStep((s) => Math.max(s - 1, 1));
  return { step, totalSteps, next, back };
}
