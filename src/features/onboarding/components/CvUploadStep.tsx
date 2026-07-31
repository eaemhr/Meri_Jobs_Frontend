'use client';

import React, { useState } from 'react';
import {
  Upload,
  FileText,
  CheckCircle2,
  Info,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';

interface CvUploadStepProps {
  lang: 'en' | 'am';
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

const t = {
  en: {
    title: 'My CV',
    subtitle: 'Upload, optimize, and export your professional CV',
    step1: 'Upload',
    step2: 'Review & Edit',
    step3: 'Optimize',
    uploadHeading: 'Upload your CV',
    uploadSubText: 'Drag and drop your file here, or click to browse',
    maxSize: 'Max 10MB',
    extractTitle: 'WHAT WE EXTRACT FROM YOUR CV',
    extract1: 'Name & Contact',
    extract2: 'Education',
    extract3: 'Work Experience',
    extract4: 'Skills',
    extract5: 'Certifications',
    extract6: 'Summary',
    infoNote:
      'Unclear or multi-column sections will be flagged for your review — nothing is silently discarded.',
    backBtn: 'Back',
    skipBtn: 'Skip for now',
    completeBtn: 'Continue',
  },
  am: {
    title: 'ሲቪዬ',
    subtitle: 'ሲቪዎን ይጫኑ፣ ያሻሽሉ እና ወደ ውጭ ኤክስፖርት ያድርጉ',
    step1: 'መጫኛ',
    step2: 'ከለሳ እና ማስተካከያ',
    step3: 'ማሻሻያ',
    uploadHeading: 'ሲቪዎን ያስገቡ',
    uploadSubText: 'ፋይልዎን እዚህ ጋር ያስገቡ ወይም በመንካት ይምረጡ',
    maxSize: 'ከ 10MB ያልበለጠ',
    extractTitle: 'ከሲቪዎ የሚወጡ ዋና መረጃዎች',
    extract1: 'ስም እና አድራሻ',
    extract2: 'ትምህርት',
    extract3: 'የስራ ልምድ',
    extract4: 'ክህሎቶች',
    extract5: 'ሰርተፊኬቶች',
    extract6: 'ማጠቃለያ',
    infoNote:
      'ግልጽ ያልሆኑ ክፍሎች ለማረጋገጥ ለእርስዎ ይቀርባሉ — ምንም መረጃ በከንቱ አይጣልም።',
    backBtn: 'ተመለስ',
    skipBtn: 'ለጊዜው ይለፉ',
    completeBtn: 'ቀጥል',
  },
};

export default function CvUploadStep({
  lang,
  onNext,
  onBack,
  onSkip,
}: CvUploadStepProps) {
  const strings = t[lang];
  const [uploadedFile, setUploadedFile] = useState<File | null>(null); 

  return (
    <div className="max-w-2xl mx-auto w-full text-left">
      {/* Page Title & Subtitle */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {strings.title}
        </h1>
        <p className="text-sm text-slate-500 mt-1">{strings.subtitle}</p>
      </div>

      {/* Stepper Header (1 Upload -> 2 Review -> 3 Optimize) */}
      <div className="flex items-center justify-between mb-8 px-2 max-w-lg mx-auto text-xs font-semibold">
        <div className="flex items-center gap-2 text-blue-600">
          <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
            1
          </span>
          <span>{strings.step1}</span>
        </div>

        <div className="h-[1px] flex-1 bg-slate-200 mx-3" />

        <div className="flex items-center gap-2 text-slate-400 font-normal">
          <span className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center text-xs">
            2
          </span>
          <span>{strings.step2}</span>
        </div>

        <div className="h-[1px] flex-1 bg-slate-200 mx-3" />

        <div className="flex items-center gap-2 text-slate-400 font-normal">
          <span className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center text-xs">
            3
          </span>
          <span>{strings.step3}</span>
        </div>
      </div>

      {}
      <label className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer mb-6 group block">
        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
          <Upload size={26} />
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-1">
          {uploadedFile ? uploadedFile.name : strings.uploadHeading}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mb-5">
          {uploadedFile ? 'File selected successfully!' : strings.uploadSubText}
        </p>

        {/* Formats Badges */}
        <div className="flex items-center justify-center gap-2.5 text-xs font-medium text-slate-500">
          <span className="px-3 py-1 bg-slate-100/80 rounded-lg border border-slate-200 flex items-center gap-1.5">
            <FileText size={13} className="text-slate-400" /> PDF
          </span>
          <span className="px-3 py-1 bg-slate-100/80 rounded-lg border border-slate-200 flex items-center gap-1.5">
            <FileText size={13} className="text-slate-400" /> DOCX
          </span>
          <span className="ml-1 text-slate-400 text-xs">{strings.maxSize}</span>
        </div>

        {/* Hidden File Input */}
        <input 
          type="file" 
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setUploadedFile(e.target.files[0]);
            }
          }}
        />
      </label>

      {/* What We Extract Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 mb-4 shadow-sm">
        <h4 className="text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-3.5">
          {strings.extractTitle}
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-3 gap-x-4 text-xs font-medium text-slate-700">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
            <span>{strings.extract1}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
            <span>{strings.extract2}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
            <span>{strings.extract3}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
            <span>{strings.extract4}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
            <span>{strings.extract5}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
            <span>{strings.extract6}</span>
          </div>
        </div>
      </div>

      {/* Info Warning Banner */}
      <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-blue-700 mb-8">
        <Info size={16} className="shrink-0 mt-0.5 text-blue-600" />
        <p className="leading-relaxed">{strings.infoNote}</p>
      </div>

      {/* Onboarding Control Buttons */}
      <div className="flex items-center justify-between pt-5 border-t border-slate-200">
        <button
          type="button"
          onClick={onBack}
          className="btn-secondary px-5 py-2.5 text-sm flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>{strings.backBtn}</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onSkip}
            className="text-xs font-semibold text-slate-400 hover:text-slate-600 px-3 py-2 cursor-pointer"
          >
            {strings.skipBtn}
          </button>

          <button
            type="button"
            onClick={onNext}
            className="btn-primary px-6 py-2.5 text-sm flex items-center gap-2 cursor-pointer"
          >
            <span>{strings.completeBtn}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}