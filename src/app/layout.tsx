// TypeScript may not have .css module declarations in this project setup.
// Ignore the next line's type error for the side-effect CSS import.
// @ts-ignore
import "./globals.css";
import { GlobalBottomNav } from "@/shared/components/GlobalBottomNav";
import { GlobalHeader } from "@/shared/components/GlobalHeader";
import { Providers } from "./providers";
import React from "react";
import { NavSidebar } from "@/features/dashboard/components/NavSidebar";
import { Toaster } from "sonner";

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
          <main className="pb-20">{children}</main>
          <GlobalBottomNav />
        </Providers>
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

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
      <body className={`${inter.className} bg-slate-50 text-foreground antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  );
}