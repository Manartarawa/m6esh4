# MESH

MESH is a creative marketplace that matches clients with independent designers, developers, and studios. Briefs, portfolios, applications, messaging, and Creative Match live in one product — with mock data first, and PostgreSQL ready underneath.

## Idea

Clients post structured briefs. Creators apply with relevant work. MESH scores fit using skills, category, style, budget, availability, experience, and portfolio relevance. AI helps shape briefs; it does not replace matching.

## Technology stack

- Next.js 15 (App Router) + React 19 + TypeScript (strict)
- Tailwind CSS 4 with design tokens
- Zod validation
- Prisma + PostgreSQL schema (MVP)
- Cookie session architecture (Better Auth-ready)
- Object storage and AI provider abstractions

## Requirements

- Node.js 20.9+
- npm
- PostgreSQL 15+ for later database-backed runs

## Installation

```bash
cd mesh
npm install
cp .env.example .env
```

## Environment variables

See `.env.example`. Never commit `.env` or real secrets.

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection |
| `AUTH_SECRET` | Session / password hashing secret |
| `NEXT_PUBLIC_APP_URL` | Public app URL |
| `AI_API_KEY` | Future live AI provider |
| `STORAGE_*` | Future object storage |

## Database setup

```bash
npx prisma validate
npx prisma generate
npx prisma migrate dev --name init
```

Do not run migrations until `DATABASE_URL` points at a real PostgreSQL instance.

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Demo accounts (password `meshdemo1`):

- `client@mesh.app`
- `creator@mesh.app`
- `admin@mesh.app`

## Build

```bash
npm run typecheck
npm run lint
npm run build
npm start
```

## Production

Set `AUTH_SECRET`, `DATABASE_URL`, and `NEXT_PUBLIC_APP_URL`. Keep `MESH_ENABLE_PAYMENTS` and `MESH_ENABLE_LIVE_AI` off until those phases are wired. Serve the Next.js production server or a Node host that supports the App Router.

## Behance auto sync

The server-side sync endpoint is `POST /api/behance/sync`. Protect scheduled calls with the server-only `CRON_SECRET` header:

```bash
curl -X POST http://localhost:3000/api/behance/sync -H "x-cron-secret: $CRON_SECRET"
```

Configure this request in the host's scheduled jobs (for example, every 30-60 minutes). The sync updates projects by Behance project ID, reclassifies only changed content, and marks missing projects inactive instead of deleting them. Failed syncs preserve the existing portfolio.

## Project structure

```
src/app            routes, layouts, server actions
src/components     shared UI
src/features       marketplace, auth, brief builder
src/lib            auth, matching, storage, AI, validation
src/services       business logic (no UI)
src/types          domain types
src/config         app name, categories, flags
prisma             PostgreSQL schema
```

## Architecture notes

UI talks to the service layer, not Prisma directly. Today services read mock data so the product can run without a database. Swap the service implementations to Prisma in the backend phase without rebuilding screens.
