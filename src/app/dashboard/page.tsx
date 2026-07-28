'use client';

import { useMatches } from '../../features/jobs/hooks/useMatches';
import { JobMatchCard } from '../../features/jobs/components/JobMatchCard';
import Link from 'next/link';

export default function DashboardPage() {
  const { data, isLoading, error } = useMatches();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
                <div className="h-20 bg-gray-200 rounded mt-3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <p className="text-red-600">Failed to load dashboard data</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <Link
            href="/jobs"
            className="text-sm text-blue-600 hover:underline"
          >
            View all matches →
          </Link>
        </div>
        <div className="space-y-4">
          {data?.matches.slice(0, 5).map((match) => (
            <JobMatchCard key={match.id} match={match} />
          ))}
        </div>
      </div>
    </div>
  );
}