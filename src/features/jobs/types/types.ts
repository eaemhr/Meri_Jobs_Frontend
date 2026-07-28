export interface JobMatch {
  id: string;
  title: string;
  company: string;
  match_score: number;
  matched_skills: string[];
  missing_skills: string[];
  location: string;
  remote_type: 'remote' | 'hybrid' | 'onsite';
  seniority: 'entry' | 'mid' | 'senior' | 'lead';
  region: string;
  description: string;
  source_url?: string;
  posted_date?: string;
}

export interface MatchBreakdown {
  skill_overlap: {
    matched: number;
    total: number;
    percentage: number;
  };
  experience_match: {
    score: number;
    max: number;
    status: 'exact' | 'close' | 'below';
  };
  keywords_found: string[];
  skills_analysis: {
    matched: string[];
    missing: string[];
  };
  recommendations: string[];
}

export interface MatchFilters {
  min_score?: number;
  sort?: 'score' | 'date';
  remote_type?: 'remote' | 'hybrid' | 'onsite' | 'all';
  seniority?: 'entry' | 'mid' | 'senior' | 'lead' | 'all';
}