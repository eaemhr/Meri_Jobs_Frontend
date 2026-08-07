import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { LanguageProvider } from "@/shared/providers/LanguageContext";


import { GlobalHeader } from '../../shared/components/GlobalHeader';
import { GlobalBottomNav } from '../../shared/components/GlobalBottomNav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Meri Jobs - Find Your Dream Job & Optimize CV',
  description: 'AI-powered job matching, CV optimization, and interview preparation platform.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-foreground antialiased min-h-screen flex flex-col`}>
        { }
        <LanguageProvider>
          <GlobalHeader />

          <main className="flex-1 pb-16">
            {children}
          </main>

          <GlobalBottomNav />
        </LanguageProvider>
      </body>
    </html>
  );
}