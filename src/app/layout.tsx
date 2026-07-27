// TypeScript may not have .css module declarations in this project setup.
// Ignore the next line's type error for the side-effect CSS import.
// @ts-ignore
import "./globals.css";
import React from "react";
import { NavSidebar } from "@/features/dashboard/components/NavSidebar";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: auth-gate this — redirect unauthenticated users to /login,
  // and first-time users into /onboarding.
  return (
    <html lang="en">
      <body>
        <NavSidebar />
        <main>{children}</main>
        <Toaster richColors />
      </body>
    </html>
  );
}
