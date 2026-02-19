# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Critical Rule: Submodules Are Read-Only

**NEVER modify, edit, or write files inside submodule directories.** These are independent git repositories. If a task requires changes in a submodule, STOP and tell the user which files need changing and why, so they can do it in a dedicated session.

Submodule directories: `NAuth/`, `NNews/`, `zTools/`, `BazzucaMedia/`, `nauth-react/`, `nnews-react/`

## Common Commands

### Admin Frontend (in `admin/`)
```bash
npm install          # Install dependencies
npm run dev          # Dev server at http://localhost:5173
npm run build        # TypeScript check + Vite production build
npm run preview      # Preview production build
```

### Docker (full stack)
```bash
docker-compose up --build                # Build and start all services
docker-compose up --build <service>      # Rebuild specific service (e.g. nnews-api)
docker-compose down                      # Stop all services
./migrate.sh                             # Run migrations.sql on the running postgres container
```

### Submodule React Libraries (nauth-react, nnews-react, BazzucaMedia/bazzuca-react)
```bash
npm run build          # Build library
npm run test           # Run tests (Vitest)
npm run test:watch     # Watch mode
npm run lint           # ESLint
npm run type-check     # TypeScript only
```

## Architecture

```
Nginx (:80)
├── /admin       → React SPA (built inside docker/nginx/Dockerfile)
├── /api/nauth/  → nauth-api:80    (NAuth - auth, users, roles)
├── /api/nnews/  → nnews-api:8080  (NNews - articles, categories, tags)
└── /api/bazzuca/→ bazzuca-api:8080 (BazzucaMedia - clients, posts, calendar)

All APIs share:
├── postgres:5432 (single database: abipesca)
├── JWT_SECRET (shared JWT validation)
└── ntools-api:8080 (zTools - mail, ChatGPT, S3 file ops)
```

### Admin Frontend (`admin/`)

- React 19 + Vite 7 + TypeScript 5.9 + Tailwind 3.4
- Base URL: `/admin/` (set in vite.config.ts and BrowserRouter basename)
- Three nested providers: `NAuthProvider` → `NNewsProvider` → `BazzucaProvider`
- Auth token from `useAuth()` is passed as `authHeaders` to NNews and Bazzuca providers via `useMemo`
- Local npm packages linked via `file:` references in package.json
- API calls use relative paths (`/api/nauth`, `/api/nnews`, `/api/bazzuca`), proxied by nginx in Docker
- Icons: lucide-react. Toasts: sonner. Rich text: react-quill-new. Modals: @radix-ui/react-dialog

### .NET APIs (submodules)

Each API follows the same pattern:
- .NET 8, PostgreSQL via Npgsql/EF Core
- Connection string env var: `ConnectionStrings__<Context>Context` (NAuthContext, NNewsContext, BazzucaContext)
- JWT auth with shared secret via `NAuth__JwtSecret`
- NTools integration via `NTools__ApiUrl=http://ntools-api:8080`

### Database

- PostgreSQL 16, single database `abipesca` with all schemas
- Schema defined in `docker/postgres/migrations.sql` (NAuth tables + NNews tables + Bazzuca tables)
- Init script `docker/postgres/init-databases.sh` creates the app user/database and runs migrations on first startup
- To apply schema changes to a running container: `./migrate.sh`

### Docker Build Chain

The nginx Dockerfile (`docker/nginx/Dockerfile`) is a multi-stage build:
1. Builds nauth-react → nnews-react → bazzuca-react → admin (sequentially, as they depend on each other)
2. Copies `admin/dist` to nginx and serves it

## Key Conventions

- **Tailwind brand colors**: `brand-navy` (#203e64), `brand-blue` (#0693e3), `brand-orange` (#ff6900), `brand-gray` (#32373c)
- **Dark mode**: Tailwind `class` strategy (`dark:` prefix)
- **Protected routes**: `ProtectedRoute` component stores redirect in `sessionStorage('redirectAfterLogin')`
- **Exports**: Named exports for most page components; default exports for SearchUsersPage, RolesPage, UserEditPage
- **Path alias**: `@/*` maps to `admin/src/*` (configured in vite.config.ts and tsconfig)

## Versioning

GitVersion with ContinuousDelivery mode. Commit message prefixes control version bumps:
- `major:` or `breaking:` → major bump
- `feat:` or `feature:` → minor bump
- `fix:` or `patch:` → patch bump
- `+semver: skip` → no bump

## Environment

Copy `.env.example` to `.env` and fill in secrets before running `docker-compose up`. Required: `POSTGRES_PASSWORD`, `DB_PASSWORD`, `JWT_SECRET` (min 64 chars).
