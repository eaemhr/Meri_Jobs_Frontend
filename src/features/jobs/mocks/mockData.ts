import { JobMatch, MatchBreakdown } from '../types';

export const mockMatches: JobMatch[] = [
  {
    id: '1',
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
  {
    id: '2',
    title: 'Full-Stack Developer — MERN',
    company: 'Gebeya',
    match_score: 0.89,
    matched_skills: ['React', 'Node.js', 'MongoDB', 'Express'],
    missing_skills: ['TypeScript', 'AWS', 'Docker'],
    location: 'Remote',
    remote_type: 'remote',
    seniority: 'mid',
    region: 'Africa',
    description: "Help build Gebeya's talent marketplace connecting 70,000+ African tech professionals with global opportunities.",
    source_url: 'https://gebeya.com/careers',
    posted_date: '2024-01-14',
  },
  {
    id: '3',
    title: 'Frontend Engineer — React/TypeScript',
    company: 'EthioTech',
    match_score: 0.88,
    matched_skills: ['React', 'TypeScript', 'CSS', 'HTML'],
    missing_skills: ['Redux', 'Next.js', 'Jest'],
    location: 'Remote',
    remote_type: 'remote',
    seniority: 'mid',
    region: 'Africa',
    description: "Build beautiful user interfaces for Ethiopia's fastest-growing tech company.",
    source_url: 'https://ethiotech.com/careers',
    posted_date: '2024-01-13',
  },
];

export const mockBreakdown: MatchBreakdown = {
  skill_overlap: {
    matched: 9,
    total: 10,
    percentage: 90,
  },
  experience_match: {
    score: 3,
    max: 3,
    status: 'exact',
  },
  keywords_found: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'REST APIs'],
  skills_analysis: {
    matched: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'REST APIs'],
    missing: ['AWS', 'Docker', 'GraphQL', 'Redis', 'CI/CD'],
  },
  recommendations: [
    'Adding Docker and GraphQL to your CV could increase your match score significantly.',
  ],
};