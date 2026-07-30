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
      </body>
    </html>
  );
}
