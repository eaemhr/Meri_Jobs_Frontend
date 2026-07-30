'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface OnboardingProgressProps {
  currentStep: number; // 1, 2, 3 ...
  totalSteps?: number;
  steps: {
    id: number;
    titleEn: string;
    titleAm: string;
  }[];
  lang: 'en' | 'am';
}

export default function OnboardingProgress({
  currentStep,
  steps,
  lang,
}: OnboardingProgressProps) {
  const percentage = Math.round((currentStep / steps.length) * 100);

  return (
    <div className="w-full max-w-xl mx-auto mb-8">
      {/* Top Header Label & Percentage */}
      <div className="flex items-center justify-between mb-2 text-xs font-semibold text-muted-foreground">
        <span>
          {lang === 'am'
            ? `ደረጃ ${currentStep} ከ ${steps.length}`
            : `Step ${currentStep} of ${steps.length}`}
        </span>
        <span className="text-primary font-bold">{percentage}%</span>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Visual Step Circles */}
      <div className="flex items-center justify-between relative">
        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;

          return (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all z-10 ${
                  isCompleted
                    ? 'bg-primary text-white'
                    : isCurrent
                    ? 'bg-primary/10 border-2 border-primary text-primary'
                    : 'bg-slate-100 text-slate-400 border border-slate-200'
                }`}
              >
                {isCompleted ? <Check size={14} /> : step.id}
              </div>

              {/* Step Title Label */}
              <span
                className={`mt-2 text-[11px] font-medium text-center hidden sm:block ${
                  isCurrent || isCompleted
                    ? 'text-foreground font-semibold'
                    : 'text-muted-foreground'
                }`}
              >
                {lang === 'am' ? step.titleAm : step.titleEn}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}