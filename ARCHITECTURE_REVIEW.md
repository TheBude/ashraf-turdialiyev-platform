# Architecture Review — Ashraf Turdialiyev Platform

**Date:** 2026-11-24  
**Scope:** Overall system architecture, code organization, patterns, and scalability

---

## 1. System Architecture Diagram

```
┌─────────────────────────────────────────────────┐
│                   Client Browser                 │
│  ┌──────────┐  ┌──────────┐  ┌───────────────┐ │
│  │ Public    │  │ Admin    │  │ Three.js Globe│ │
│  │ Pages     │  │ Dashboard│  │ (WebGL)       │ │
│  └────┬─────┘  └────┬─────┘  └───────┬───────┘ │
└───────┼──────────────┼────────────────┼─────────┘
        │              │                │
        ▼              ▼                ▼
┌─────────────────────────────────────────────────┐
│              Next.js App Router                  │
│  ┌──────────────┐  ┌──────────────────────────┐ │
│  │ Server       │  │ API Routes               │ │
│  │ Components   │  │ /api/auth/*              │ │
│  │ (RSC)        │  │ /api/globe/*             │ │
│  │              │  │ /api/destinations/*      │ │
│  │ [locale]/    │  │ /api/media/*             │ │
│  │ admin/       │  │ /api/upload              │ │
│  │              │  │ /api/timeline/*          │ │
│  │              │  │ /api/certificates/*      │ │
│  │              │  │ /api/publications/*      │ │
│  │              │  │ /api/audience            │ │
│  │              │  │ /api/settings            │ │
│  │              │  │ /api/contact/*           │ │
│  │              │  │ /api/countries/*         │ │
│  └──────┬───────┘  └──────────┬───────────────┘ │
│         │                     │                  │
│         ▼                     ▼                  │
│  ┌──────────────────────────────────────────┐   │
│  │          Prisma ORM (6.4.1)              │   │
│  │  11 models, no indexes, no migrations    │   │
│  └──────────────────┬───────────────────────┘   │
│                     │                            │
│                     ▼                            │
│  ┌──────────────────────────────────────────┐   │
│  │       SQLite (prisma/dev.db)             │   │
│  └──────────────────────────────────────────┘   │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │    Local File Storage (public/uploads/)  │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

---

## 2. Strengths

### 2.1 Correct Use of App Router
- Server Components for public pages (data fetching at the edge)
- Client Components properly marked with `'use client'` where needed
- Proper `params` as `Promise` (Next.js 15 convention)

### 2.2 Clean Separation of Concerns
- `src/lib/` for shared utilities (auth, prisma, translations, api-guard)
- `src/components/` for reusable UI components
- `src/app/api/` for REST endpoints
- `src/context/` for React context providers

### 2.3 Multilingual Architecture
- 4-language support (uz/en/ru/tr) via `[locale]` dynamic route
- Database fields for localized content (e.g., `title`, `titleUz`, `titleRu`, `titleTr`)
- `LanguageContext` for client-side locale management

### 2.4 Consistent API Pattern
- All admin routes use `requireAuth()` guard
- Consistent error handling with try/catch
- JSON responses with appropriate HTTP status codes

---

## 3. Weaknesses

### 3.1 No Input Validation Layer
**Current:** Manual field presence checks (`if (!title || !country)`)  
**Needed:** Zod schemas for every POST/PUT endpoint, providing type-safe validation, error messages, and automatic TypeScript inference.

### 3.2 Mass Assignment Vulnerability Pattern
**Current:** `...body` spread in PUT handlers passes arbitrary client fields to Prisma  
**Needed:** Explicit field destructuring with whitelist

### 3.3 Monolithic Admin Component
**File:** `AdminDashboardClient.tsx` (1343 lines)  
**Problem:** 8 tab panels (destinations, timeline, certificates, publications, audience, messages, settings, stats) all in one file  
**Impact:** Hard to maintain, slow to load, impossible to code-split

### 3.4 Hardcoded Content
**File:** `src/app/[locale]/experience/page.tsx`  
**Problem:** Professional experience data is hardcoded in JSX. Not editable from admin.  
**Impact:** Requires code changes to update professional history

### 3.5 Deployment Limitations
- SQLite: Single-file database not suited for serverless (no connection pooling, file locks)
- Local uploads: `public/uploads/` is ephemeral on Vercel, Railway, etc.
- No environment-specific configuration beyond `.env`

### 3.6 Three.js Lifecycle Management
- Full scene recreation on prop change (should be init-once, update-markers-only)
- Stale React state closures in animation loop
- No cleanup of geometries/materials/textures

---

## 4. API Route Authorization Matrix

| Endpoint | GET | POST | PUT | DELETE |
|---|---|---|---|---|
| `/api/auth/login` | — | 🔓 Public | — | — |
| `/api/auth/logout` | — | 🔓 Public | — | — |
| `/api/auth/me` | 🔓 Public (returns 401) | — | — | — |
| `/api/globe` | ⚠️ Public (leaks DRAFT) | 🔒 Auth | — | — |
| `/api/globe/[id]` | ⚠️ Public (any status) | — | 🔒 Auth | 🔒 Auth |
| `/api/destinations` | ⚠️ Public (leaks DRAFT) | 🔒 Auth | — | — |
| `/api/destinations/[id]` | ⚠️ Public (any status) | — | 🔒 Auth | 🔒 Auth |
| `/api/timeline` | 🔓 Public | 🔒 Auth | — | — |
| `/api/timeline/[id]` | 🔓 Public | — | 🔒 Auth | 🔒 Auth |
| `/api/certificates` | 🔓 Public | 🔒 Auth | — | — |
| `/api/certificates/[id]` | 🔓 Public | — | 🔒 Auth | 🔒 Auth |
| `/api/publications` | 🔓 Public | 🔒 Auth | — | — |
| `/api/publications/[id]` | 🔓 Public | — | 🔒 Auth | 🔒 Auth |
| `/api/audience` | 🔓 Public | — | 🔒 Auth | — |
| `/api/settings` | ⚠️ Public | — | 🔒 Auth | — |
| `/api/contact` | 🔒 Auth (GET) | 🔓 Public (POST) | — | — |
| `/api/contact/[id]` | — | — | 🔒 Auth | 🔒 Auth |
| `/api/countries` | 🔓 Public | 🔒 Auth | — | — |
| `/api/countries/[id]` | 🔓 Public | — | 🔒 Auth | 🔒 Auth |
| `/api/media` | 🔒 Auth | 🔒 Auth | — | — |
| `/api/media/[id]` | — | — | — | 🔒 Auth |
| `/api/upload` | — | 🔒 Auth | — | — |

**Legend:** 🔓 = Intentionally public, 🔒 = Requires auth, ⚠️ = Should filter by status

---

## 5. Recommendations

### Priority 1 — Security (Immediate)
1. Remove JWT secret fallback; require env var
2. Clear prefilled credentials from login page
3. Add rate limiting to login endpoint
4. Default public GET endpoints to `status: 'PUBLISHED'`
5. Add Zod validation on all POST/PUT bodies
6. Add magic byte validation for uploads
7. Whitelist fields in PUT handlers (remove `...body` spread)

### Priority 2 — Stability (This Sprint)
1. Fix Three.js memory leak (separate init from markers update)
2. Fix `isAutoRotating` stale closure (use ref)
3. Proper Three.js cleanup (dispose geometries, materials, textures)
4. Add database indexes on frequently queried fields

### Priority 3 — Maintainability (Next Sprint)
1. Create Prisma migrations
2. Split `AdminDashboardClient.tsx` into separate modules
3. Make experience page data-driven
4. Remove duplicate Footer component
5. Add error boundaries and loading states

### Priority 4 — Production Readiness (Before Launch)
1. Migrate from SQLite to PostgreSQL
2. Implement cloud storage for uploads
3. Add security headers
4. Set up proper CI/CD pipeline
