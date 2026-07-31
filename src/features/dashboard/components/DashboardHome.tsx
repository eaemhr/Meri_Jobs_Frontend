'use client';

import React from 'react';
import Link from 'next/link';
import { Briefcase, FileText, Sparkles, ArrowRight, TrendingUp } from 'lucide-react';

interface DashboardHomeProps {
  userName: string;
}

export default function DashboardHome({ userName }: DashboardHomeProps) {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 sm:p-8 rounded-3xl border border-primary/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <Sparkles size={14} />
            <span>Meri Jobs Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Welcome back, {userName}! 
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            Your profile has been set up successfully. You can now explore job opportunities, optimize your CV, or prepare for upcoming interviews.
          </p>
        </div>
        
        <Link
          href="/cv"
          className="btn-primary px-5 py-3 text-sm flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <span>Optimize Your CV</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Quick Stats / Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Job Matches Card */}
        <Link 
          href="/jobs" 
          className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-primary/50 transition-all group"
        >
          <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4 group-hover:scale-110 transition-transform">
            <Briefcase size={24} />
          </div>
          <h3 className="text-base font-semibold text-foreground mb-1">Job Matches</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Browse tailored job recommendations based on your unique skills and preferences.
          </p>
          <span className="text-xs font-semibold text-primary flex items-center gap-1">
            Find Jobs <ArrowRight size={14} />
          </span>
        </Link>

        {/* CV Optimization Card */}
        <Link 
          href="/cv" 
          className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-primary/50 transition-all group"
        >
          <div className="p-3 rounded-xl bg-accent/10 text-accent w-fit mb-4 group-hover:scale-110 transition-transform">
            <FileText size={24} />
          </div>
          <h3 className="text-base font-semibold text-foreground mb-1">CV Optimization</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Review your resume with AI-enhanced insights and boost your score.
          </p>
          <span className="text-xs font-semibold text-primary flex items-center gap-1">
            Edit CV <ArrowRight size={14} />
          </span>
        </Link>

        {/* Interview Prep Card */}
        <Link 
          href="/interview-prep" 
          className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-primary/50 transition-all group"
        >
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 w-fit mb-4 group-hover:scale-110 transition-transform">
            <TrendingUp size={24} />
          </div>
          <h3 className="text-base font-semibold text-foreground mb-1">Interview Prep</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Prepare for your target roles with targeted Q&A practice sessions.
          </p>
          <span className="text-xs font-semibold text-primary flex items-center gap-1">
            Start Preparing <ArrowRight size={14} />
          </span>
        </Link>
      </div>
    </div>
  );
}