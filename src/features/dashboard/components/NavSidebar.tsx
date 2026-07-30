'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Briefcase, FileText, TrendingUp, LogOut, Sparkles } from 'lucide-react';

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Job Matches', href: '/jobs', icon: Briefcase },
  { name: 'CV Optimization', href: '/cv', icon: FileText },
  { name: 'Interview Prep', href: '/interview-prep', icon: TrendingUp },
];

export default function NavSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col justify-between p-6">
      <div className="space-y-8">
        {/* Brand Logo / Title */}
        <div className="flex items-center gap-3 px-2">
          <div className="p-2 rounded-xl bg-primary text-primary-foreground">
            <Sparkles size={20} />
          </div>
          <span className="font-bold text-lg text-foreground tracking-tight">Meri Jobs</span>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-slate-50 hover:text-foreground'
                }`}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout / Footer Section */}
      <div className="pt-6 border-t border-slate-100">
        <Link
          href="/login"
          className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors"
        >
          <LogOut size={18} />
          <span>Log Out</span>
        </Link>
      </div>
    </aside>
  );
}