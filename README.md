# Meri_Jobs Frontend

React + TypeScript (Next.js App Router) frontend for Meri_Jobs, talking to the
backend only through `api-gateway`'s REST API.

## Getting started

```bash
cp .env.example .env.local
npm install
npm run dev
```

## Structure

See [`docs/architecture.md`](./docs/architecture.md) and
[`CONTRIBUTING.md`](./CONTRIBUTING.md) for the full folder-by-folder guide and
team ownership.

```
shared/       ← API client, design system, global state, i18n, shared utils
src/app/      ← Next.js routes (thin wrappers)
src/features/ ← auth, onboarding, dashboard, cv, jobs, matches, interview-prep
```
