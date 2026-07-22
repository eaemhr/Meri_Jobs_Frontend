import React from "react";

export function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <h2>Welcome</h2>
      <button onClick={onNext}>Get started</button>
    </div>
  );
}
