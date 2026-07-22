# Contributing

## Branching
`feature/<your-feature>/<short-name>` e.g. `feature/matches/score-badge-redesign`

## Ownership
- Dev 1 — `cv/` (CV Upload & Optimization)
- Dev 2 — `jobs/` + `matches/` (Job Matching & Browsing)
- Dev 3 — `interview-prep/`
- Dev 4 — `auth/`, `onboarding/`, `dashboard/`, `shared/i18n/`, `shared/ui/`, `shared/state/`

## Rules
1. Never import across feature folders — share through `shared/` only.
2. All backend calls go through `shared/api/`.
3. Every response type must match `shared/api/`'s types exactly.
4. Check `shared/ui/` before building a one-off component.
5. No hardcoded user-facing strings — use `shared/i18n/`.
6. `.env.local` is never committed.

## PR process
- One feature per PR, small and reviewable.
- At least one reviewer from outside your feature if you touched `shared/`.
- Link the relevant section of `docs/architecture.md` if your PR changes a flow.
