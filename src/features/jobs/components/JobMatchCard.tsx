'use client';

import { JobMatch } from '../types';
import Link from 'next/link';

interface JobMatchCardProps {
  match: JobMatch;
}

export const JobMatchCard = ({ match }: JobMatchCardProps) => {
  const matchedCount = match.matched_skills.length;
  const totalSkills = matchedCount + match.missing_skills.length;
  const matchPercentage = Math.round(match.match_score * 100);

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900">
            {match.title}
          </h3>
          <p className="text-gray-600 font-medium">{match.company}</p>
          
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {match.remote_type}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {match.seniority}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
              {match.region}
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-2">
            {matchedCount}/{totalSkills} required skills matched
          </p>
        </div>

        {/* Match Score Badge */}
        <div className="ml-4 flex-shrink-0">
          <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex flex-col items-center justify-center shadow-lg">
            <span className="text-xl font-bold">{matchPercentage}%</span>
            <span className="text-[10px] opacity-80">match</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mt-3 line-clamp-2">
        {match.description}
      </p>

      {/* Actions */}
      <div className="mt-4 flex gap-3">
        <Link
          href={`/matches/${match.id}`}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          View details →
        </Link>
      </div>
    </div>
  );
};