'use client';

import React from 'react';
import { ArrowRight, Sparkles, Briefcase, FileCheck } from 'lucide-react';

interface WelcomeStepProps {
  lang: 'en' | 'am';
  userName?: string;
  onNext: () => void;
}

const t = {
  en: {
    badge: 'Welcome to Meri Jobs',
    heading: 'Let’s set up your profile for success',
    subheading:
      'We’ll guide you through a few quick steps to tailor your job search, optimize your CV, and connect you with the right opportunities.',
    feature1Title: 'Tailored Job Matches',
    feature1Desc: 'Get recommendations based on your skills and preferences.',
    feature2Title: 'CV Optimization',
    feature2Desc: 'Stand out to recruiters with AI-enhanced resume insights.',
    cta: 'Get Started',
  },
  am: {
    badge: 'እንኳን ወደ መሪ ጆብስ በደህና መጡ',
    heading: 'ለስኬት የሚረዳዎትን ፕሮፋይል እናዘጋጅ',
    subheading: 'የስራ ፍለጋዎን የተሳካ ለማድረግ፣ ሲቪዎን ለማስተካከል እና ከተስማሚ ስራዎች ጋር ለማገናኘት በጥቂት እርምጃዎች እንመራዎታለን።',
    feature1Title: 'ለእርስዎ የሚሆኑ ስራዎች',
    feature1Desc: ' በክህሎትዎ እና በፍላጎትዎ መሰረት የተመረጡ ስራዎችን ያግኙ።',
    feature2Title: 'የሲቪ ማሻሻያ',
    feature2Desc: 'በአርቲፊሻል ኢንተሊጀንስ ታግዘው ሲቪዎን ለአሳጣሪዎች ማራኪ ያድርጉ።',
    cta: 'እንጀምር',
  },
};

export default function WelcomeStep({ lang, userName = 'Friend', onNext }: WelcomeStepProps) {
  const strings = t[lang];
  const displayName = userName || (lang === 'am' ? 'ጓደኛ' : 'Friend');

  return (
    <div className="flex flex-col items-center text-center max-w-xl mx-auto py-4">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6">
        <Sparkles size={14} />
        <span>{strings.badge}</span>
      </div>

      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-3">
        {lang === 'am' ? `ሰላም ${userName}! ` : `Hi ${userName}! `}
        <br />
        <span className="text-primary">{strings.heading}</span>
      </h1>

      {/* Subheading */}
      <p className="text-sm sm:text-base text-muted-foreground mb-8 leading-relaxed">
        {strings.subheading}
      </p>

      {/* Feature Highlights Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8 text-left">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
            <Briefcase size={20} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">{strings.feature1Title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{strings.feature1Desc}</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-accent/10 text-accent">
            <FileCheck size={20} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">{strings.feature2Title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{strings.feature2Desc}</p>
          </div>
        </div>
      </div>

      {/* Next Step CTA */}
      <button
        type="button"
        onClick={onNext}
        className="btn-primary w-full sm:w-auto px-8 py-3.5 text-sm flex items-center justify-center gap-2 group cursor-pointer"
      >
        <span>{strings.cta}</span>
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}