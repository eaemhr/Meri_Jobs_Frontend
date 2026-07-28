'use client';

import Link from 'next/link';
import { useLanguage } from '../../providers/LanguageContext';

export function GlobalHeader() {
  const { language, setLanguage } = useLanguage();

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-600">
            {/* Blue Hexagon Logo */}
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7.77v8.46L12 22l10-5.77V7.77L12 2z" />
            </svg>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              {language === 'en' ? 'MeriJobs' : 'ሜሪጆብስ'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div 
              className="flex items-center gap-1 border border-gray-200 rounded-full px-3 py-1.5 bg-white cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setLanguage(language === 'en' ? 'am' : 'en')}
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-semibold text-gray-700 uppercase leading-none mt-0.5">{language}</span>
            </div>
            
            <div className="relative flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full absolute -top-1 -right-1 z-10 border-2 border-white"></div>
              <Link href="/profile" className="flex items-center justify-center">
                <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm hover:bg-blue-800 transition-colors">
                  DB
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
