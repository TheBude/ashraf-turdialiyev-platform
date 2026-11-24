# Implementation Roadmap — Ashraf Turdialiyev Platform

**Date:** 2026-11-24  
**Purpose:** Prioritized fix plan based on TECHNICAL_AUDIT.md, SECURITY_AUDIT.md, and ARCHITECTURE_REVIEW.md

---

## Phase 1 — Critical Security Remediation ⏱️ ~2 hours

### 1.1 Auth Hardening
- [ ] Remove hardcoded JWT secret fallback in `src/lib/auth.ts`
- [ ] Add startup validation: throw if `JWT_SECRET` env var is missing/weak
- [ ] Verify `role === 'ADMIN'` in `requireAuth()` guard
- [ ] Clear prefilled credentials from `src/app/admin/login/page.tsx`
- [ ] Update `.env.example` with placeholder values

### 1.2 Login Rate Limiting
- [ ] Create `src/lib/rate-limit.ts` with in-memory rate limiter
- [ ] Apply to `/api/auth/login` (5 attempts / 15 minutes per IP)
- [ ] Add configurable delay after failed attempts

### 1.3 Public API Data Filtering
- [ ] `GET /api/globe` — default to `status: 'PUBLISHED'` for unauthenticated requests
- [ ] `GET /api/destinations` — same treatment
- [ ] `GET /api/globe/[id]` — check status for unauthenticated requests
- [ ] `GET /api/destinations/[id]` — same treatment
- [ ] `GET /api/settings` — require auth, or expose only safe keys

### 1.4 Input Validation
- [ ] Install `zod` as dependency
- [ ] Create Zod schemas for all POST/PUT bodies
- [ ] Replace `...body` spread with explicit field whitelisting in all PUT routes
- [ ] Add contact form field length limits

### 1.5 Upload Security
- [ ] Add magic byte validation (JPEG/PNG/WebP/PDF signature check)
- [ ] Sanitize uploaded filenames (already partially done)
- [ ] Validate `category` enum value

---

## Phase 2 — Three.js Globe Fixes ⏱️ ~1.5 hours

### 2.1 Memory Leak Fix
- [ ] Separate scene initialization into one-time `useEffect([], [])`
- [ ] Move marker rendering to separate `useEffect` with `[filteredLocations, pickedCoord]`
- [ ] Properly dispose geometries, materials, textures in cleanup

### 2.2 Stale Closure Fix
- [ ] Convert `isAutoRotating` from useState to useRef for animation loop
- [ ] Keep useState for UI rendering, sync to ref

### 2.3 Quality of Life
- [ ] Add `prefers-reduced-motion` support
- [ ] Add Page Visibility API (pause when tab hidden)
- [ ] Add WebGL context loss recovery handler
- [ ] Add fallback color when textures fail to load
- [ ] Reduce pixel ratio on mobile (cap at 1.5)

---

## Phase 3 — Database Improvements ⏱️ ~1 hour

### 3.1 Add Indexes
- [ ] `Destination`: index on `status`, `featured`, `slug`
- [ ] `GlobeLocation`: index on `status`, `featured`, `category`
- [ ] `TimelineEvent`: index on `year`, `category`
- [ ] `Certificate`: index on `category`, `featured`
- [ ] `Publication`: index on `year`, `featured`
- [ ] `AudienceStat`: index on `key`
- [ ] `ContactMessage`: index on `isRead`

### 3.2 Migrate to Prisma Migrations
- [ ] Run `npx prisma migrate dev --name init` to baseline
- [ ] Future changes via `prisma migrate dev`

---

## Phase 4 — CMS Completeness ⏱️ ~1 hour

### 4.1 Experience Page
- [ ] Create `Experience` model in Prisma schema
- [ ] Create `/api/experience` CRUD routes
- [ ] Create admin management UI
- [ ] Update `[locale]/experience/page.tsx` to fetch from database

### 4.2 Content Authenticity
- [ ] Mark seeded/demo data with a flag or DRAFT status
- [ ] Make profile image configurable via SiteSetting

---

## Phase 5 — Multilingual Audit ⏱️ ~30 minutes

- [ ] Scan all public pages for hardcoded English strings
- [ ] Ensure language switcher preserves current page path
- [ ] Add localized `<title>` and meta descriptions per page

---

## Phase 6 — Public Website Polish ⏱️ ~1 hour

- [ ] Add loading states / Suspense boundaries
- [ ] Add error boundaries for each page
- [ ] Add empty states for pages with no data
- [ ] Update admin login page to light theme
- [ ] Remove duplicate Footer component

---

## Phase 7 — Build Verification & Delivery ⏱️ ~30 minutes

- [ ] Run `tsc --noEmit` — 0 errors
- [ ] Run `next lint` — 0 errors
- [ ] Run `next build` — successful
- [ ] Run `verify-full-system.js` — all tests pass
- [ ] Update DEVELOPMENT_PROGRESS.md
- [ ] Commit and push to GitHub

---

## Estimated Total: ~7.5 hours

### Execution Order
1. **Phase 1** (Security) — highest priority, do first
2. **Phase 2** (Three.js) — fix memory leaks and bugs
3. **Phase 3** (Database) — add indexes for performance
4. **Phase 4** (CMS) — make experience page editable
5. **Phase 5** (i18n) — fix hardcoded strings
6. **Phase 6** (Polish) — loading/error/empty states
7. **Phase 7** (Verify) — final build and delivery

Each phase is independently committable. If execution is interrupted, start from the first uncompleted phase.
