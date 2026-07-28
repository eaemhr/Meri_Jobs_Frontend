import { apiClient } from '../client';
import { MatchFilters, MatchesResponse, MatchDetailResponse } from '../../../src/features/jobs/types';

const INTERNAL_API_BASE = 'http://localhost:8002/internal/matches';
const TEST_CV_ID = '11111111-1111-1111-1111-111111111111';

export const matchesApi = {
  /**
   * GET /matches
   * Get all job matches with optional filters
   */
  getMatches: async (filters?: MatchFilters): Promise<MatchesResponse> => {
    // We hit the internal backend API directly to bypass the proxy for now.
    const url = `${INTERNAL_API_BASE}/${TEST_CV_ID}`;
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch from internal matches API');
      const data = await res.json();
      
      // The backend returns: { cv_id, count, results: [{ job_id, overall_score, source_url, computed_at }] }
      // We will append dummy GUI jobs later to ensure they show up
      // We must adapt this to MatchesResponse: { matches: JobMatch[], total: number }
      const mockMatches = data.results.map((r: any, idx: number) => ({
        id: r.job_id,
        title: r.title || `Software Engineer Role ${idx + 1}`, // Placeholder or mockup
        company: r.company || 'Unknown Company', // Placeholder or mockup
        match_score: (r.overall_score || 0) / 100, // convert 100 -> 1.0 format used in UI
        matched_skills: [], 
        missing_skills: [],
        location: 'Remote',
        remote_type: 'remote',
        seniority: 'mid',
        region: 'Global',
        description: 'Detail not provided by list API.',
        source_url: r.source_url,
        posted_date: r.computed_at
      }));

      // Apply generic filtering logic here if needed (the backend API didn't support filters directly in the snippet)
      let filtered = [...mockMatches];
      if (filters?.min_score && filters.min_score > 0) {
        filtered = filtered.filter(m => m.match_score >= filters.min_score!);
      }
      
      // Using frontend sorting as fallback
      if (filters?.sort === 'date') {
        filtered = filtered.sort((a, b) => 
          new Date(b.posted_date || 0).getTime() - new Date(a.posted_date || 0).getTime()
        );
      } else {
        filtered = filtered.sort((a, b) => b.match_score - a.match_score);
      }

      // Add our mock frontend jobs dynamically to the result array
      const demoJobs: any[] = [
        { id: 'mock-frontend-job-1', title: 'Senior Frontend Engineer', company: 'Tech Innovators', match_score: 0.95, matched_skills: [], missing_skills: [], location: 'Remote', remote_type: 'remote', seniority: 'senior', region: 'Global', description: 'Detail not provided by list API.', source_url: 'https://example.com', posted_date: '2026-07-23' },
        { id: 'mock-frontend-job-2', title: 'React Developer', company: 'Global Solutions', match_score: 0.88, matched_skills: [], missing_skills: [], location: 'Remote', remote_type: 'remote', seniority: 'mid', region: 'Global', description: 'Detail not provided by list API.', source_url: 'https://example.com', posted_date: '2026-07-22' }
      ];
      
      filtered.push(...demoJobs);

      return {
        matches: filtered,
        total: (data.count || filtered.length - 2) + 2,
      };
    } catch (e) {
      console.error("API GET Matches Failed: ", e);
      // Even if fetch fails, show the 2 mock jobs
      const fallbackJobs: any[] = [
        { id: 'mock-frontend-job-1', title: 'Senior Frontend Engineer', company: 'Tech Innovators', match_score: 0.95, matched_skills: [], missing_skills: [], location: 'Remote', remote_type: 'remote', seniority: 'senior', region: 'Global', description: 'API Server Offline - Mock only', source_url: 'https://example.com', posted_date: '2026-07-23' },
        { id: 'mock-frontend-job-2', title: 'React Developer', company: 'Global Solutions', match_score: 0.88, matched_skills: [], missing_skills: [], location: 'Remote', remote_type: 'remote', seniority: 'mid', region: 'Global', description: 'API Server Offline - Mock only', source_url: 'https://example.com', posted_date: '2026-07-22' }
      ];
      return { matches: fallbackJobs, total: 2 };
    }
  },

  /**
   * GET /matches/{id}
   * Get detailed breakdown for a specific match
   */
  getMatchDetail: async (id: string): Promise<MatchDetailResponse> => {
    // Intercept our dummy mock jobs for UI purposes
    if (id.startsWith('mock-frontend-')) {
      return {
        match: {
          id: id,
          title: id === 'mock-frontend-job-1' ? 'Senior Frontend Engineer' : 'React Developer',
          company: id === 'mock-frontend-job-1' ? 'Tech Innovators' : 'Global Solutions',
          match_score: id === 'mock-frontend-job-1' ? 0.95 : 0.88,
          matched_skills: ['React', 'TypeScript', 'Next.js'],
          missing_skills: ['GraphQL', 'AWS'],
          location: 'Remote',
          remote_type: 'remote',
          seniority: 'senior',
          region: 'US',
          description: "This is a frontend-only mock job added for UI demonstration purposes.",
          source_url: `https://example.com/${id}`,
          posted_date: '2026-07-23'
        },
        breakdown: {
          skill_overlap: { matched: 3, total: 5, percentage: 60 },
          experience_match: { score: 4, max: 4, status: 'exact' },
          keywords_found: ['React', 'TypeScript', 'Next.js'],
          skills_analysis: {
            matched: ['React', 'TypeScript', 'Next.js'],
            missing: ['GraphQL', 'AWS'],
          },
          recommendations: ['Consider learning GraphQL to improve your matching score on this job.']
        }
      };
    }

    const url = `${INTERNAL_API_BASE}/${TEST_CV_ID}/${id}`;
    
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch match details');
    const data = await res.json();
    
    // The backend returns:
    // { breakdown: { skills: { matched, missing, score, matched_count, required_count }, experience: {}, seniority: {} } }
    const bd = data.breakdown || {};
    const skillBd = bd.skills || {};
    const expBd = bd.experience || {};
    const senBd = bd.seniority || {};

    return {
      match: {
        id: data.job_id,
        title: 'Full-Stack Developer', // Placeholder
        company: 'Gebeya Inc.', // Placeholder to match UI 
        match_score: (data.overall_score || 0) / 100,
        matched_skills: skillBd.matched || [],
        missing_skills: skillBd.missing || [],
        location: 'Remote',
        remote_type: 'remote',
        seniority: senBd.candidate || 'mid',
        region: 'Global',
        description: "", 
        source_url: data.source_url,
        posted_date: data.computed_at
      },
      breakdown: {
        skill_overlap: {
          matched: skillBd.matched_count || 0,
          total: skillBd.required_count || 0,
          percentage: skillBd.score || 0,
        },
        experience_match: {
          score: expBd.candidate_years || 0,
          max: expBd.required_years || 0,
          status: 'exact',
        },
        keywords_found: skillBd.matched || [],
        skills_analysis: {
          matched: skillBd.matched || [],
          missing: skillBd.missing || [],
        },
        recommendations: [
           `Adding ${skillBd.missing?.join(' and ')} to your CV could increase your score.`
        ],
      }
    };
  },

  applyToJob: async (id: string) => {
    return apiClient<{ success: boolean; redirect_url?: string }>(
      `/matches/${id}/apply`,
      { method: 'POST', body: {} }
    );
  },

  startPractice: async (id: string) => {
    return apiClient<{ session_id: string }>(
      `/matches/${id}/practice`,
      { method: 'POST', body: {} }
    );
  },
};