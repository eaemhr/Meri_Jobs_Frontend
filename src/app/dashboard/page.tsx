'use client';

import React from 'react';
import { useSession } from '@/features/auth/hooks/useSession';
import DashboardHome from '@/features/dashboard/components/DashboardHome';
import NavSidebar from '@/features/dashboard/components/NavSidebar';

export default function DashboardPage() {
  const { user } = useSession();
  const userName = user?.firstName || 'Friend';

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar Navigation */}
      <NavSidebar />

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10">
        <DashboardHome userName={userName} />
      </main>
    </div>
  );
}