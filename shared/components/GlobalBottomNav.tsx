'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../providers/LanguageContext";

export function GlobalBottomNav() {
  const { language } = useLanguage();
  const pathname = usePathname();

  const labels = {
    en: { myCV: 'My CV', jobs: 'Jobs', profile: 'Profile' },
    am: { myCV: 'የኔ ሲቪ', jobs: 'ስራዎች', profile: 'መገለጫ' }
  };
  
  
  const currentLang = (language === 'am' ? 'am' : 'en') as keyof typeof labels;
  const t = labels[currentLang];
    en: { myCV: "My CV", jobs: "Jobs", profile: "Profile" },
    am: { myCV: "የኔ ሲቪ", jobs: "ስራዎች", profile: "መገለጫ" },
  };
  const t = labels[language];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] z-50 px-8 py-3 pb-6 sm:pb-3">
      <div className="max-w-3xl mx-auto flex justify-between items-center px-4 sm:px-16">
        <NavItem 
          href="/cv" 
          label={t.myCV} 
          active={pathname?.startsWith('/cv') || false}
          icon={(
            <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          )} 
        />
        <NavItem 
          href="/jobs" 
          label={t.jobs} 
          active={pathname?.startsWith('/jobs') || pathname?.startsWith('/matches') || pathname === '/' || false}
          icon={(
            <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          )} 
        />
        <NavItem 
          href="/profile" 
          label={t.profile} 
          active={pathname?.startsWith('/profile') || false}
          icon={(
            <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          )} 
        <NavItem
          href="/cv"
          label={t.myCV}
          active={pathname?.startsWith("/cv") || false}
          icon={
            <svg
              className="w-[22px] h-[22px]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          }
        />
        <NavItem
          href="/jobs"
          label={t.jobs}
          active={
            pathname?.startsWith("/jobs") ||
            pathname?.startsWith("/matches") ||
            pathname === "/" ||
            false
          }
          icon={
            <svg
              className="w-[22px] h-[22px]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          }
        />
        <NavItem
          href="/profile"
          label={t.profile}
          active={pathname?.startsWith("/profile") || false}
          icon={
            <svg
              className="w-[22px] h-[22px]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          }
        />
      </div>
    </div>
  );
}

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}

function NavItem({ href, label, icon, active = false }: NavItemProps) {
function NavItem({ href, label, icon, active = false }: any) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center gap-1.5 pt-1 pb-2 relative transition-colors w-16 ${
        active ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
      }`}
    >
      {icon}
      <span className={`text-[12px] ${active ? 'font-bold' : 'font-semibold'}`}>{label}</span>
        active ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
      }`}
    >
      {icon}
      <span className={`text-[12px] ${active ? "font-bold" : "font-semibold"}`}>
        {label}
      </span>
      {active && (
        <span className="absolute bottom-0 w-8 h-1 bg-blue-600 rounded-t-full"></span>
      )}
    </Link>
  );
}

export default GlobalBottomNav;
