import { useQuery } from '@tanstack/react-query';
import { matchesApi } from '../../../../shared/api/endpoints/matches';
import { MatchFilters, MatchesResponse } from '../types';
import { mockMatches } from '../mocks/mockData';

// Set to true to use mock data (when backend is not ready)
const USE_MOCK_DATA = false;

export const useMatches = (filters?: MatchFilters) => {
  return useQuery<MatchesResponse>({
    queryKey: ['matches', filters],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        let filtered = [...mockMatches];
        if (filters?.min_score && filters.min_score > 0) {
          filtered = filtered.filter(m => m.match_score >= filters.min_score!);
        }
        if (filters?.sort === 'date') {
          filtered = filtered.sort((a, b) => 
            new Date(b.posted_date || 0).getTime() - new Date(a.posted_date || 0).getTime()
          );
        } else {
          filtered = filtered.sort((a, b) => b.match_score - a.match_score);
        }
        
        return {
          matches: filtered,
          total: filtered.length,
        };
      }
      return matchesApi.getMatches(filters);
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};