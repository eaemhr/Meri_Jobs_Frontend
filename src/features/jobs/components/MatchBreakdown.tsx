'use client';

import { MatchBreakdown as IMatchBreakdown } from '../types';
import Link from 'next/link';

interface MatchBreakdownProps {
  breakdown: IMatchBreakdown;
  jobId: string;
}

export const MatchBreakdown = ({ breakdown, jobId }: MatchBreakdownProps) => {
  return (
    <div className="space-y-6">
      {/* Match Breakdown */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Match Breakdown
        </h3>
        
        {/* Skill Overlap */}
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Skill overlap</span>
            <span className="font-semibold">
              {breakdown.skill_overlap.matched}/{breakdown.skill_overlap.total} 
              ({breakdown.skill_overlap.percentage}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${breakdown.skill_overlap.percentage}%` }}
            />
          </div>
        </div>

        {/* Experience Level */}
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Experience level</span>
            <span className="font-semibold">
              {breakdown.experience_match.score}/{breakdown.experience_match.max}
              {breakdown.experience_match.status === 'exact' && ' (Exact match)'}
            </span>
          </div>
        </div>

        {/* Keywords Found */}
        <div>
          <p className="text-sm text-gray-600 mb-2">Keywords found in your CV</p>
          <div className="flex flex-wrap gap-2">
            {breakdown.keywords_found.map((keyword) => (
              <span
                key={keyword}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Skill Analysis */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Skill Analysis
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-green-600 mb-2">
              Matched ({breakdown.skills_analysis.matched.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {breakdown.skills_analysis.matched.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                >
                  ✅ {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium text-red-600 mb-2">
              Missing ({breakdown.skills_analysis.missing.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {breakdown.skills_analysis.missing.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendations */}
        {breakdown.recommendations.length > 0 && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm font-medium text-blue-800 mb-2">
              💡 {breakdown.recommendations.length} skills to develop
            </p>
            <ul className="list-disc list-inside text-sm text-blue-700">
              {breakdown.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Link
          href={`/interview-prep?job=${jobId}`}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
        >
          🎯 Prep for this Interview
        </Link>
        <Link
          href={`/matches/${jobId}/apply`}
          className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-center"
        >
          📝 Apply Now
        </Link>
      </div>

      {/* Boost Message */}
      <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
        <p className="text-sm text-purple-800">
          🚀 Boost your chances: Practice AI-generated interview questions tailored 
          specifically to this role before you apply.
        </p>
      </div>
    </div>
  );
};