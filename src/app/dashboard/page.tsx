'use client';

import React from 'react';
import { useSession } from '@/features/auth/hooks/useSession';
import DashboardHome from '@/features/dashboard/components/DashboardHome';

export default function DashboardPage() {
  const { user } = useSession();
  const userName = user?.firstName || 'Friend';

  return (
    <main className="min-h-screen bg-slate-50">
      <DashboardHome userName={userName} />
    </main>
  );
}