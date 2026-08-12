'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Briefcase, FileText, TrendingUp, LogOut } from 'lucide-react';

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Job Matches', href: '/jobs', icon: Briefcase },
  { name: 'CV Optimization', href: '/cv', icon: FileText },
  { name: 'Interview Prep', href: '/interview-prep', icon: TrendingUp },
];

interface NavSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function NavSidebar({ isOpen = false, onClose }: NavSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile / Website Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/20 z-30"
        />
      )}

      {/* Sidebar Container  */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col justify-between p-6 pt-20 transition-transform duration-300 transform shadow-xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6">
          {/* Navigation Links */}
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon size={20} />
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
            onClick={onClose}
            className="flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut size={20} />
            <span>Log Out</span>
          </Link>
        </div>
      </aside>
    </>
  );
}