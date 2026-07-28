# Meri_Jobs Frontend — Repo Onboarding Guide

> **Stack assumption:** React + TypeScript, Next.js (App Router). One repo, one app,
> talking to the backend only through `api-gateway`'s REST endpoints — never
> directly to `cv-parser`, `matching-engine`, `job-ingestion`, or `interview-prep`.
> If your stack differs (plain Vite SPA, Remix, etc.), the folder shapes below
> still apply — just swap `app/` routing for your router of choice.

## ⚠ Read this before writing any code

One repo, one Next.js app, split into **feature folders** — not five separate
apps like the backend, because the frontend is a single UI surface. With 4
devs covering 5 backend services plus cross-cutting concerns (onboarding,
language, the dashboard shell), the split isn't a clean 1:1 — Dev 4 owns
everything that wraps around the other three features, not a single backend
service.

| Dev | Owns (feature folders) | Maps to backend service(s) |
|---|---|---|
| **Dev 1** | `cv/` — CV upload & optimization | `cv-parser` |
| **Dev 2** | `jobs/` + `matches/` — job matching & browsing | `job-ingestion` + `matching-engine` |
| **Dev 3** | `interview-prep/` | `interview-prep` |
| **Dev 4** | `auth/`, `onboarding/`, `shared/i18n/`, dashboard shell/UX, + shared design system/infra | `api-gateway` + shared frontend infra |

**The single most important rule:** a feature folder never imports components,
hooks, or state directly from another feature folder. The only way features
share anything is through `shared/` — the typed API client, the design
system, global state, and translations. If you're reaching into
`features/matches/` from inside `features/cv/`, stop — that belongs in
`shared/` instead.

---

## 01 — The Big Picture

```
meri_jobs-frontend/
├── package.json          ← scripts, dependencies
├── next.config.js         ← build config
├── .env.example           ← template for required env vars (API base URL, etc.)
├── CONTRIBUTING.md        ← branching/PR rules — read before your first commit
│
├── shared/
│   ├── api/               ← THE CONTRACT. Typed client + request/response types
│   │                         for every api-gateway endpoint. Nobody owns it alone.
│   ├── ui/                ← design system: buttons, inputs, cards, modals, layout primitives
│   ├── state/             ← global state (auth session, feature flags) — not feature-specific data
│   ├── i18n/               ← translation strings + locale switching logic
│   └── lib/                ← utils, hooks, constants used by more than one feature
│
├── src/
│   ├── app/                ← Next.js routes (thin — pages import from features/)
│   └── features/           ← your actual work lives here, one folder per feature
│       ├── auth/
│       ├── onboarding/
│       ├── dashboard/
│       ├── cv/
│       ├── jobs/
│       ├── matches/
│       └── interview-prep/
│
└── docs/architecture.md   ← diagrams from design sessions (shared with backend team)
```

**Why this mirrors the backend:** just like backend services only talk
through Kafka events defined in `shared/events/`, frontend features only talk
to the backend through the typed client in `shared/api/` — and only talk to
*each other* through `shared/state/`. Nobody hand-writes a `fetch()` call
inside a feature folder pointing at a raw URL, and nobody hardcodes user-facing
text instead of pulling it from `shared/i18n/`.

---

## 02 — Root-Level Files

| File / Folder | Purpose | Who Touches It |
|---|---|---|
| `package.json` | Scripts (`dev`, `build`, `lint`, `test`), dependencies. | Everyone; Dev 4 maintains shared tooling scripts |
| `.env.example` | `NEXT_PUBLIC_API_BASE_URL` and any other required vars, with placeholders. Copy to `.env.local`, never commit real values. | Everyone, on first setup |
| `CONTRIBUTING.md` | Branch naming (`feature/<your-feature>/<short-name>`), PR rules, commit conventions. | Everyone, read once |
| `shared/api/` | The exact request/response shape for every `api-gateway` endpoint you call — generated or hand-typed from the backend's OpenAPI schema if one exists. | Everyone reads; changes reviewed by whoever owns that endpoint's flow |
| `shared/ui/` | The design system — every reusable visual primitive lives here so four different "primary button" implementations don't creep in. | Dev 4 owns; everyone contributes new primitives here, not inline in a feature |
| `shared/state/` | Global auth/session state, feature flags — anything more than one feature needs to read. | Dev 4 owns; others as needed, reviewed |
| `shared/i18n/` | Every user-facing string, keyed and translated, plus the locale-switching logic. | Dev 4 owns; everyone adds keys here instead of inlining text in a feature |
| `docs/architecture.md` | System diagrams, page flows, how frontend routes map to backend events (e.g. "CV upload → `cv.parsed` → match results appear"). | Everyone reads; update as design evolves |

---

## 03 — Every Feature Follows the Same Internal Shape

Same principle as the backend: once you understand one feature's layout, you
can navigate any other one immediately.

```
src/features/<feature-name>/
├── components/      ← UI specific to this feature (not reusable elsewhere — else it goes in shared/ui/)
├── hooks/           ← feature-specific hooks (e.g. usePollParseStatus)
├── api.ts           ← calls into shared/api/'s typed client, scoped to this feature's endpoints
├── types.ts         ← feature-local types (UI state shapes, not the API contract itself)
└── tests/
```

Routes in `src/app/` stay thin — a page component mostly just renders the
matching feature's top-level component. Business logic, data fetching, and
state live inside `features/`, not inside `app/`.

---

## 04 — Dev 1 · CV Upload & Optimization

*Maps to `cv-parser`.*

Owns the CV upload flow, the "processing…" state, parsed-results display, and
optimization suggestions.

```
src/features/cv/
├── components/
│   ├── CvUploadDropzone.tsx
│   ├── ParseStatusBanner.tsx  ← shows processing / failed / done states
│   ├── ParsedFieldsView.tsx
│   └── SuggestionsList.tsx
├── hooks/
│   └── usePollParseStatus.ts  ← polls or subscribes for parse completion
├── api.ts                     ← POST /cv/upload, GET /cv/{id}/status, GET /cv/{id}/suggestions
└── types.ts
```

**What you need to know**
- Parsing is async on the backend (Celery), so the UI needs a real
  "processing…" state, not a spinner that blocks the page — poll or use
  whatever mechanism `api-gateway` exposes for status.
- If parsing fails (bad format, corrupted file), show the user a clear
  message — don't fail silently, mirroring the backend's own rule.
- Don't fetch match results here even though they're triggered by a
  successful parse — that's `features/matches/`'s job. Cross-feature
  navigation ("view your matches") goes through routing, not a shared import.
- Pull every user-facing string (upload prompts, error messages, suggestion
  labels) from `shared/i18n/` — don't hardcode English text inline.

---

## 05 — Dev 2 · Job Matching & Browsing

*Maps to `job-ingestion` + `matching-engine`.*

Owns job search/browsing and match-score display — combined because, from a
user's perspective, "find jobs" and "see how well I match" are one flow, even
though they're two backend services.

```
src/features/jobs/
├── components/
│   ├── JobSearchBar.tsx
│   ├── JobCard.tsx
│   └── JobDetailView.tsx
├── hooks/
│   └── useJobSearch.ts
├── api.ts                     ← GET /jobs, GET /jobs/{id}
└── types.ts

src/features/matches/
├── components/
│   ├── MatchScoreBadge.tsx    ← shows the weighted score, gate pass/fail
│   └── MatchListView.tsx
├── hooks/
│   └── useMatches.ts
├── api.ts                     ← GET /matches/{cv_id}, GET /matches/{cv_id}/{job_id}
└── types.ts
```

**What you need to know**
- These are two feature folders, not one — keep `jobs/` (listing/browsing)
  and `matches/` (scoring against a specific CV) separate even though you own
  both, so neither grows into a dumping ground.
- `source_url` from a job listing is what your "Apply" button links to —
  make sure you're not accidentally stripping or rewriting it; it's the real
  external application link.
- Match scores and gate results come from `matching-engine` read-only
  endpoints — don't compute or re-derive scoring logic client-side.
- Loading states matter here more than elsewhere: job search can be slow, and
  match data may not exist yet for a freshly uploaded CV — design for the
  empty/pending state explicitly.

---

## 06 — Dev 3 · Interview Prep

*Maps to `interview-prep`.*

Owns the mock-interview flow: starting a session, presenting questions, and
showing feedback on answers.

```
src/features/interview-prep/
├── components/
│   ├── SessionStart.tsx
│   ├── QuestionCard.tsx
│   └── AnswerFeedback.tsx
├── hooks/
│   └── useInterviewSession.ts
├── api.ts                     ← POST /interview/session, POST /interview/session/{id}/answer
└── types.ts
```

**What you need to know**
- Question generation is LLM-backed on the backend and can be slower than a
  typical API call — design the UI around a real loading/generating state,
  not an instant response.
- A session is tied to a specific match (a job the user matched with) —
  entry into this feature comes from `features/matches/` via routing/a link,
  never a direct import of match data or components.
- Keep feedback display flexible — the shape of "feedback" may evolve as the
  backend's generation logic changes; don't over-couple the UI to today's
  exact response shape.
- Route user-facing copy (question prompts framing, feedback labels) through
  `shared/i18n/` like every other feature.

---

## 07 — Dev 4 · Auth, Onboarding, Language & Dashboard/UX

*Maps to `api-gateway` + shared frontend infra.*

The broadest role on the team: owns everything a user touches before and
around the three "core" features above — logging in, the first-run
onboarding flow, switching languages, and the overall dashboard shell. Also
owns the design system and shared tooling everyone else builds on.

```
src/features/auth/
├── components/
│   ├── LoginForm.tsx
│   └── SignupForm.tsx
├── hooks/
│   └── useSession.ts          ← reads/writes shared/state session, exposes isAuthenticated
├── api.ts                     ← POST /auth/login, /auth/signup, /auth/refresh
└── types.ts

src/features/onboarding/
├── components/
│   ├── WelcomeStep.tsx
│   ├── ProfileBasicsStep.tsx
│   └── OnboardingProgress.tsx
├── hooks/
│   └── useOnboardingFlow.ts
├── api.ts                     ← whatever api-gateway exposes for onboarding state
└── types.ts

src/features/dashboard/
├── components/
│   ├── DashboardHome.tsx      ← landing view after login, links into cv/jobs/interview-prep
│   └── NavSidebar.tsx
└── hooks/

src/app/
├── layout.tsx                 ← app shell: nav, sidebar, auth-gated route wrapper
└── (routes for each feature, thin wrappers)

PLUS, you own:
shared/ui/                     ← buttons, inputs, cards, layout primitives, tokens
shared/state/                  ← auth session, feature flags
shared/i18n/                   ← translation keys, locale switcher
shared/lib/                    ← shared hooks/utils (e.g. useDebounce, formatDate)
next.config.js, tsconfig.json  ← keep build config working as the app grows
```

**What you need to know**
- You own the session for the whole app — every other feature trusts that a
  logged-in user's JWT is already attached to outgoing requests. Get token
  storage/refresh right first; everyone else builds on top of it.
- `shared/api/`'s client should attach the auth header automatically (an
  interceptor), so individual features never handle tokens themselves.
- You own the route-protection wrapper — redirecting unauthenticated users to
  `/login`, and routing first-time users into `onboarding/` before they reach
  the dashboard.
- Get `shared/ui/` and `shared/i18n/` populated early (core buttons/inputs/
  cards, and the translation-key convention) — the other three devs are
  blocked from building polished, localized UI without this, same as the
  backend's infra owner unblocking everyone with `docker-compose.yml`.
- Language switching is global state, not per-feature — a locale change in
  `shared/i18n/` should re-render every feature's text without each one
  managing its own language logic.
- When someone proposes a new shared primitive, a new translation key
  convention, or a change to `shared/api/`'s types, you're a natural reviewer
  (since you touch these folders most), but it's a team decision — flag
  changes in your team chat, don't let them merge silently, same as the
  backend's schema-review rule.
- `dashboard/` is intentionally thin — it's the landing/navigation hub, not a
  place to build out CV, job, or interview logic. Link into those features;
  don't reimplement their views here.

---

## 08 — Rules Everyone Follows

1. **Never import across feature folders.** If `matches/` needs something
   from `cv/`, that's a sign it belongs in `shared/` instead, or the
   navigation between them should happen via routing, not a shared import.
2. **All backend calls go through `shared/api/`.** No feature hand-writes a
   raw `fetch()`/`axios` call to a backend URL — the typed client is the only
   door to the backend, exactly like Kafka is the only door between backend
   services.
3. **Every response type must match `shared/api/`'s types exactly.** If the
   backend adds a field, update the shared type first and flag it to whoever
   else consumes that endpoint, before relying on it in a feature.
4. **Design system first.** Before building a one-off button or card inside a
   feature, check `shared/ui/` — if it doesn't exist yet, add it there, not
   inline.
5. **No hardcoded user-facing strings.** Every label, button, and error
   message goes through `shared/i18n/`, even if you're only building for one
   language today.
6. **`.env.local` is never committed.** Only `.env.example` (with placeholder
   values) goes in git.
7. **Branch per feature:** `feature/<your-feature>/<short-name>` (e.g.
   `feature/matches/score-badge-redesign`) — see `CONTRIBUTING.md` for the
   full PR process.

---

## 09 — First Week Checklist

- [ ] Clone the repo, copy `.env.example` to `.env.local`
- [ ] Read `docs/architecture.md` in full
- [ ] Read `shared/api/` — know what every endpoint expects/returns before writing code that calls it
- [ ] Get `npm run dev` running locally against a working backend (`docker-compose up` from the backend repo)
- [ ] Confirm you can log in, hit one real endpoint through `shared/api/`, and render a response — proves your local setup works end to end
- [ ] Skim `shared/ui/` and `shared/i18n/` so you know what primitives and translation keys already exist before building your own
