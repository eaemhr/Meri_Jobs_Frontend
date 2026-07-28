# Architecture

_TODO: paste/adapt diagrams from design sessions here._

## How frontend features map to backend services

| Frontend feature | Backend service |
|---|---|
| `auth/` | `api-gateway` |
| `onboarding/`, `dashboard/` | `api-gateway` |
| `cv/` | `cv-parser` |
| `jobs/`, `matches/` | `job-ingestion`, `matching-engine` |
| `interview-prep/` | `interview-prep` |

## Key flows

1. **CV upload → parse → suggestions**: `cv/` uploads a file, polls parse
   status, then shows extracted fields + suggestions.
2. **Parse complete → matches available**: once a CV is parsed, `matches/`
   can show scored jobs for it.
3. **Match → interview prep session**: a session in `interview-prep/` is
   entered from a specific match via routing.
