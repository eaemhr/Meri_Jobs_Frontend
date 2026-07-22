import React from "react";
import { NavSidebar } from "@/features/dashboard/components/NavSidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // TODO: auth-gate this — redirect unauthenticated users to /login,
  // and first-time users into /onboarding.
  return (
    <html lang="en">
      <body>
        <NavSidebar />
        <main>{children}</main>
      </body>
    </html>
  );
}
