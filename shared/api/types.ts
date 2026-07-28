// Shared request/response types for api-gateway endpoints.
// Keep this in sync with the backend's schema — update here first,
// then flag the change to whoever consumes the affected endpoint.

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// TODO: add CV, Job, Match, InterviewSession types as endpoints solidify.
