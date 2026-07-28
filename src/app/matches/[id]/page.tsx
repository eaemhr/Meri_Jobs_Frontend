'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';
import { useMatchDetail } from '../../../features/jobs/hooks/useMatchDetail';
import { useLanguage } from '../../../../shared/providers/LanguageContext';

// ============================================================
// TRANSLATIONS
// ============================================================
const translations = {
  en: {
    match: 'match',
    matchScore: 'Match Score',
    matchBreakdown: 'MATCH BREAKDOWN',
    skillOverlap: 'Skill overlap',
    experienceLevel: 'Experience level',
    exactMatch: 'Exact match',
    keywordsMatched: 'Keywords matched',
    keywordsFound: 'Keywords found in your CV',
    skillAnalysis: 'SKILL ANALYSIS',
    matched: 'Matched',
    missing: 'Missing',
    skillsToDevelop: 'skills to develop',
    experienceMatches: 'Your experience level matches this role',
    experienceDesc: 'The seniority level of this position aligns well with your work history and years of experience.',
    prepForInterview: 'Prep for this Interview',
    applyNow: 'Apply Now',
    boostChances: 'Boost your chances',
    boostDesc: 'Practice AI-generated interview questions tailored specifically to this role before you apply.',
    jobDescription: 'JOB DESCRIPTION',
  },
  am: {
    match: 'ተዛማጅነት',
    matchScore: 'የተዛማጅነት ውጤት',
    matchBreakdown: 'የተዛማጅነት ትንተና',
    skillOverlap: 'የክህሎት ተዛማጅነት',
    experienceLevel: 'የልምድ ደረጃ',
    exactMatch: 'ትክክለኛ ተዛማጅነት',
    keywordsMatched: 'ቁልፍ ቃላት ተዛምደዋል',
    keywordsFound: 'በሲቪዎ ውስጥ የተገኙ ቁልፍ ቃላት',
    skillAnalysis: 'የክህሎት ትንተና',
    matched: 'የተዛመዱ',
    missing: 'የጎደሉ',
    skillsToDevelop: 'ማሳደግ ያለብዎት ክህሎቶች',
    experienceMatches: 'የልምድ ደረጃዎ ከዚህ ሚና ጋር ይዛመዳል',
    experienceDesc: 'የዚህ ቦታ የልምድ ደረጃ ከስራ ታሪክዎ እና ከልምድ ዓመቶችዎ ጋር ይጣጣማል።',
    prepForInterview: 'ለዚህ ቃለመጠይቅ ይዘጋጁ',
    applyNow: 'አሁን ያመልክቱ',
    boostChances: 'እድሎትን ያሳድጉ',
    boostDesc: 'ከማመልከትዎ በፊት ለዚህ ሚና የተዘጋጁ በአይኤ የተፈጠሩ የቃለመጠይቅ ጥያቄዎችን ይለማመዱ።',
    jobDescription: 'የስራው መግለጫ',
  }
};

// ============================================================
// MAIN DETAIL POPUP
// ============================================================
export default function MatchDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { data, isLoading } = useMatchDetail(id);
  const { language } = useLanguage();

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!data) return null;

  const { match, breakdown } = data;
  const t = translations[language];

  const handleClose = () => router.back();
  const matchScoreValue = Math.round(match.match_score * 100);

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
        <div 
          className="bg-white rounded-[20px] shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-y-auto pointer-events-auto flex flex-col hide-scrollbar"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Row */}
          <div className="flex justify-between items-center px-8 py-5 border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur z-20">
            <h1 className="text-[22px] font-bold text-gray-900">{match.title}</h1>
            <button 
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100 -mr-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body Content */}
          <div className="px-8 py-8 flex-1">
            
            {/* Top Info section & Match Badge */}
            <div className="flex items-start justify-between mb-8">
              <div className="space-y-4 max-w-2xl">
                <h2 className="text-xl font-bold text-gray-900">Gebeya Inc.</h2>
                <div className="flex flex-wrap gap-2 text-sm text-gray-600 font-medium items-center">
                  <span>{match.remote_type}</span>
                  <span className="text-gray-300">•</span>
                  <span>{match.seniority}</span>
                  <span className="text-gray-300">•</span>
                  <span>{match.region}</span>
                </div>
              </div>

              {/* Big floating Score Badge (like image 1) */}
              <div className="flex flex-col items-center justify-center w-[100px] h-[100px] bg-emerald-50 rounded-2xl border border-emerald-100/50 shadow-sm shrink-0 ml-4">
                <span className="text-4xl font-bold text-emerald-500 leading-none">{matchScoreValue}</span>
                <span className="text-xs font-semibold text-emerald-600 tracking-wide mt-2">{t.match}</span>
              </div>
            </div>

            <hr className="border-gray-100 mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-12">
              
              {/* LEFT COLUMN: Job Description */}
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-[13px] font-bold text-gray-400 uppercase tracking-wider mb-4">{t.jobDescription}</h3>
                  <div className="text-[15px] text-gray-700 leading-relaxed font-medium">
                    <p className="mb-4">
                      {match.description || "Gebeya is Africa's leading talent marketplace. We're looking for a developer to help us scale our platform to the next 100,000 professionals."}
                    </p>
                    
                    {/* Simulated lists based on designs, since actual API only returns a description blob */}
                    <div className="mb-4">
                      <strong className="text-gray-900 block mb-2">You'll work on:</strong>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        <li>New features for our talent matching and hiring platform</li>
                        <li>API integrations with enterprise HR systems</li>
                        <li>Performance improvements for mobile-first users in low-bandwidth environments</li>
                        <li>Real-time notifications and messaging features</li>
                      </ul>
                    </div>

                    <div>
                      <strong className="text-gray-900 block mb-2">Requirements:</strong>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        <li>3+ years MERN stack experience</li>
                        <li>Strong TypeScript skills</li>
                        <li>Experience with GraphQL APIs</li>
                        <li>Understanding of mobile-first performance optimization</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Match Breakdown & Skills */}
              <div className="flex flex-col gap-8">
                
                {/* MATCH BREAKDOWN */}
                <div>
                  <h3 className="text-[13px] font-bold text-gray-400 uppercase tracking-wider mb-4">{t.matchBreakdown}</h3>
                  
                  <div className="bg-white border text-[13px] border-gray-100 rounded-2xl p-5 shadow-sm shadow-blue-50/50 space-y-5">
                    
                    {/* Skill overlap */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-gray-600 font-medium">{t.skillOverlap}</span>
                        <span className="font-bold text-gray-900 text-[14px]">
                          {breakdown.skill_overlap.matched}/{breakdown.skill_overlap.total} <span className="text-gray-400 font-medium text-[13px]">({breakdown.skill_overlap.percentage}%)</span>
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-emerald-500 h-2 rounded-full"
                          style={{ width: `${breakdown.skill_overlap.percentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Keywords matched */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-gray-600 font-medium">{t.keywordsMatched}</span>
                        <span className="font-bold text-gray-900 text-[14px]">
                          {Math.min(8, breakdown.keywords_found.length)}/8
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-[#2a5cff] h-2 rounded-full"
                          style={{ width: `${Math.min((breakdown.keywords_found.length / 8) * 100, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Experience Level */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-gray-600 font-medium">{t.experienceLevel}</span>
                        <span className="font-bold text-gray-900 text-[14px]">
                          {breakdown.experience_match.score}/{breakdown.experience_match.max} 
                          {breakdown.experience_match.status === 'exact' && <span className="text-gray-400 font-medium text-[13px]"> ({t.exactMatch})</span>}
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `100%` }} />
                      </div>
                    </div>

                    <hr className="border-gray-100 my-2" />

                    {/* Keywords Found */}
                    <div>
                      <p className="text-gray-500 font-medium mb-3">{t.keywordsFound}</p>
                      <div className="flex flex-wrap gap-2">
                        {breakdown.keywords_found.map((keyword: string) => (
                          <span key={keyword} className="bg-blue-50 text-blue-600 font-semibold px-3 py-1.5 rounded-full text-xs">
                            {keyword}
                          </span>
                        ))}
                        {breakdown.keywords_found.length === 0 && (
                          <span className="text-gray-400 text-sm">No exact keywords parsed</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* SKILL ANALYSIS */}
                <div>
                  <h3 className="text-[13px] font-bold text-gray-400 uppercase tracking-wider mb-4">{t.skillAnalysis}</h3>
                  <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm shadow-emerald-50/50">
                    
                    <div className="flex items-center gap-4 mb-4">
                      <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                        {t.matched} ({breakdown.skills_analysis.matched.length})
                      </span>
                      <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-500">
                        {t.missing} ({breakdown.skills_analysis.missing.length})
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {breakdown.skills_analysis.matched.map((skill: string) => (
                        <span key={skill} className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 font-semibold text-xs rounded-full border border-emerald-100/50">
                          <span className="text-[10px]">✓</span> {skill}
                        </span>
                      ))}
                      {breakdown.skills_analysis.missing.map((skill: string) => (
                        <span key={skill} className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-600 font-semibold text-xs rounded-full border border-red-100/50">
                          <span className="text-[10px]">✕</span> {skill}
                        </span>
                      ))}
                    </div>

                    {/* Skills to develop */}
                    {breakdown.recommendations.length > 0 && (
                      <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-4 mb-4">
                        <p className="font-bold text-amber-700 text-sm mb-1.5 flex items-center gap-1.5">
                          {breakdown.recommendations.length} {t.skillsToDevelop}
                        </p>
                        <p className="text-amber-800 text-[13px] leading-relaxed opacity-90">
                          {breakdown.recommendations[0]}
                        </p>
                      </div>
                    )}

                    {/* Experience match */}
                    <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4">
                      <p className="font-bold text-emerald-700 text-sm mb-1.5 flex items-center gap-1.5">
                        <span className="text-emerald-500 border border-emerald-500 rounded-full w-4 h-4 flex items-center justify-center text-[10px]">✓</span>
                        {t.experienceMatches}
                      </p>
                      <p className="text-emerald-800 text-[13px] leading-relaxed opacity-90">
                        {t.experienceDesc}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Action Buttons Section */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <Link
                  href={`/interview-prep?job=${match.id}`}
                  className="flex-1 px-8 py-3.5 bg-white border-2 border-gray-100 shadow-sm text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-center font-bold text-[15px] flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                  {t.prepForInterview}
                </Link>
                <Link
                  href={`/matches/${match.id}/apply`}
                  className="flex-1 px-8 py-3.5 bg-emerald-500 text-white shadow-sm rounded-xl hover:bg-emerald-600 transition-colors text-center font-bold text-[15px] flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  {t.applyNow}
                </Link>
              </div>

              {/* Boost chances banner */}
              <div className="bg-[#eff2ff] rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 border border-[#e5e9ff]">
                <div className="hidden sm:flex text-blue-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-blue-700 flex items-center gap-2 mb-1">
                    <span className="sm:hidden -ml-0.5"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg></span>
                    {t.boostChances}
                  </p>
                  <p className="text-[13px] text-blue-600/80 font-medium">
                    {t.boostDesc}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}