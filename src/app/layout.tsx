import type { Metadata } from "next";
import "./globals.css"; // ← This imports Tailwind
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "JobGen - Job Matching",
  description: "Find your perfect remote job match",
};

import { GlobalHeader } from '../../shared/components/layout/GlobalHeader';
import { GlobalBottomNav } from '../../shared/components/layout/GlobalBottomNav';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 min-h-screen">
        <Providers>
          <GlobalHeader />
          <main className="pb-20">
            {children}
          </main>
          <GlobalBottomNav />
        </Providers>
      </body>
    </html>
  );
}