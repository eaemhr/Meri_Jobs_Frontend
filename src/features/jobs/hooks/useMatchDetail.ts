import { useQuery } from '@tanstack/react-query';
import { matchesApi } from '../../../../shared/api/endpoints/matches';
import { MatchDetailResponse } from '../types';
import { mockBreakdown } from '../mocks/mockData';

// Set to true to use mock data (when backend is not ready)
const USE_MOCK_DATA = false;

export const useMatchDetail = (id: string) => {
  return useQuery<MatchDetailResponse>({
    queryKey: ['match-detail', id],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
          match: {
            id: id,
            title: 'Senior Full-Stack Engineer',
            company: 'Andela',
            match_score: 0.92,
            matched_skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'REST APIs'],
            missing_skills: ['AWS', 'Docker', 'GraphQL', 'Redis', 'CI/CD'],
            location: 'Remote',
            remote_type: 'remote',
            seniority: 'senior',
            region: 'Africa',
            description: "Join Andela's distributed engineering team to build scalable platforms serving 1M+ users across Africa.",
            source_url: 'https://andela.com/careers',
            posted_date: '2024-01-15',
          },
          breakdown: mockBreakdown,
        };
      }
      return matchesApi.getMatchDetail(id);
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};