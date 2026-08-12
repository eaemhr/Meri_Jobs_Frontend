'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  Briefcase, 
  FileText, 
  TrendingUp 
} from 'lucide-react';
import NavSidebar from './NavSidebar';

interface DashboardHomeProps {
  userName?: string;
  lang?: 'en' | 'am';
}

export default function DashboardHome({ userName = 'Friend', lang = 'en' }: DashboardHomeProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Component */}
      <NavSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      { }
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-6 sm:p-10 max-w-5xl mx-auto space-y-8 w-full">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 sm:p-8 rounded-3xl border border-primary/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                <Sparkles size={14} />
                <span>Meri Jobs Dashboard</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {lang === 'am' ? `እንኳን ደህና መጡ፣ ${userName}!` : `Welcome back, ${userName}!`}
              </h1>
              <p className="text-sm text-slate-600 max-w-xl leading-relaxed">
                {lang === 'am'
                  ? 'መገለጫዎ በትክክል ተስተካክሏል። አሁን የስራ ዕድሎችን መፈለግ፣ ሲቪዎን ማሻሻል ወይም ለቃለ-መጠይቅ መዘጋጀት ይችላሉ።'
                  : 'Your profile has been set up successfully. You can now explore job opportunities, optimize your CV, or prepare for upcoming interviews.'}
              </p>
            </div>
            
            <Link
              href="/cv"
              className="bg-primary text-primary-foreground px-5 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2 shrink-0 cursor-pointer shadow-md hover:opacity-90 transition-all"
            >
              <span>{lang === 'am' ? 'ሲቪዎን ያሻሽሉ' : 'Optimize Your CV'}</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              href="/jobs" 
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-primary/50 hover:shadow-md transition-all group"
            >
              <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4 group-hover:scale-110 transition-transform">
                <Briefcase size={24} />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-1">
                {lang === 'am' ? 'የስራ ግጥሚያዎች' : 'Job Matches'}
              </h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                {lang === 'am'
                  ? 'ከእርስዎ ችሎታ እና ፍላጎት ጋር የሚጣጣሙ የስራ ዕድሎችን ያስሱ።'
                  : 'Browse tailored job recommendations based on your unique skills and preferences.'}
              </p>
              <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                {lang === 'am' ? 'ስራዎችን ፈልግ' : 'Find Jobs'} <ArrowRight size={14} />
              </span>
            </Link>

            <Link 
              href="/cv" 
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-primary/50 hover:shadow-md transition-all group"
            >
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 w-fit mb-4 group-hover:scale-110 transition-transform">
                <FileText size={24} />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-1">
                {lang === 'am' ? 'የሲቪ ማሻሻያ' : 'CV Optimization'}
              </h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                {lang === 'am'
                  ? 'በሰው ሰራሽ አስተዋይ (AI) እገዛ ሲቪዎን ይገምግሙና ውጤትዎን ያሻሽሉ።'
                  : 'Review your resume with AI-enhanced insights and boost your score.'}
              </p>
              <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                {lang === 'am' ? 'ሲቪ አስተካክል' : 'Edit CV'} <ArrowRight size={14} />
              </span>
            </Link>

            <Link 
              href="/interview-prep" 
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-primary/50 hover:shadow-md transition-all group"
            >
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 w-fit mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-1">
                {lang === 'am' ? 'ለቃለ-መጠይቅ ዝግጅት' : 'Interview Prep'}
              </h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                {lang === 'am'
                  ? 'ለሚፈልጉት የስራ መደብ በጥያቄና መልስ ልምምድ ራሶን ያዘጋጁ።'
                  : 'Prepare for your target roles with targeted Q&A practice sessions.'}
              </p>
              <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                {lang === 'am' ? 'ዝግጅቱን ጀምር' : 'Start Preparing'} <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}