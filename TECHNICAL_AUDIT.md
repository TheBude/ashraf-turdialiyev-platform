# Technical Audit — Ashraf Turdialiyev Platform

**Date:** 2026-11-24  
**Auditor:** Principal Software Architect (Automated Deep Audit)  
**Scope:** Full codebase analysis of all source files, API routes, database schema, and configuration

---

## 1. Architecture Overview

| Component | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 15.1.7 |
| UI Library | React | 19.0.0 |
| Language | TypeScript (strict) | 5.7.3 |
| ORM | Prisma | 6.4.1 |
| Database | SQLite | file:./dev.db |
| Auth | Custom JWT + bcryptjs | jsonwebtoken 9.0.2 |
| 3D Engine | Three.js | 0.187.0 |
| CSS | Tailwind CSS | 3.4.17 |
| Animations | Framer Motion | 12.4.7 |
| Notifications | Sonner | 2.0.1 |

**Total source files:** 76  
**API route files:** 24  
**Public page routes:** 12  
**Admin routes:** 10  
**Prisma models:** 11  

---

## 2. Critical Issues Found

### 2.1 SECURITY — Hardcoded JWT Secret (CRITICAL)

- **File:** `src/lib/auth.ts:6`
- **Problem:** JWT_SECRET has a hardcoded fallback string: `'ashraf-turdialiyev-super-secure-jwt-secret-key-2026-production'`
- **Risk:** Anyone reading the source code (public GitHub repo) can forge valid admin JWT tokens
- **Severity:** 🔴 CRITICAL

### 2.2 SECURITY — Prefilled Login Credentials (HIGH)

- **File:** `src/app/admin/login/page.tsx:11-12`
- **Problem:** Admin email and password are prefilled as `useState` defaults. The login form renders with actual credentials visible.
- **Risk:** Any visitor to `/admin/login` sees working credentials pre-populated
- **Severity:** 🔴 HIGH

### 2.3 SECURITY — `.env` Contains Real Secrets (HIGH)

- **File:** `.env` (committed per `.gitignore` exclusion, BUT contains real values)
- **Problem:** `.env` has the actual JWT secret and admin default password. While `.gitignore` excludes `.env`, the hardcoded fallback in `auth.ts` mirrors the same value.
- **Severity:** 🟡 MEDIUM (`.gitignore` mitigates but fallback negates it)

### 2.4 SECURITY — No Rate Limiting on Login (HIGH)

- **File:** `src/app/api/auth/login/route.ts`
- **Problem:** No rate limiting, no lockout, no CAPTCHA. Unlimited brute-force attempts allowed.
- **Severity:** 🔴 HIGH

### 2.5 SECURITY — Public API Exposes All Records (HIGH)

- **Files:** `src/app/api/globe/route.ts`, `src/app/api/destinations/route.ts`
- **Problem:** GET endpoints return ALL records including DRAFT status when no `?status=` filter is passed. Public pages should only see PUBLISHED content.
- **Globe API:** No default status filter — returns everything
- **Destinations API:** Same pattern — returns everything unless `?status=PUBLISHED` is explicitly passed
- **Severity:** 🔴 HIGH

### 2.6 SECURITY — No Input Validation Framework (MEDIUM)

- **Files:** All POST/PUT API routes
- **Problem:** Input validation is manual `if (!field)` checks. No schema validation (Zod, Yup, etc.). Arbitrary fields from `...body` spread directly into Prisma `data`, enabling mass assignment.
- **Affected routes:** `globe/[id]`, `destinations/[id]`, `timeline/[id]`, `publications/[id]`, `certificates/[id]`, `countries/[id]`
- **Risk:** Attackers can overwrite fields like `createdAt`, `id`, or inject unintended data
- **Severity:** 🟡 MEDIUM

### 2.7 SECURITY — Upload MIME-Only Validation (MEDIUM)

- **File:** `src/app/api/upload/route.ts:21-27`
- **Problem:** File type validation relies solely on `file.type` which is the client-reported MIME type (easily spoofable). No magic byte / file signature verification.
- **Severity:** 🟡 MEDIUM

### 2.8 SECURITY — Settings & Audience API Public GET (MEDIUM)

- **File:** `src/app/api/settings/route.ts:5-16`
- **Problem:** Settings GET is public (no auth). Could leak internal configuration.
- **File:** `src/app/api/audience/route.ts:5-14`
- **Problem:** Audience stats GET is public — this is intended but could expose `isSimulated` flag.
- **Severity:** 🟡 MEDIUM (design decision, but should not expose `isSimulated`)

---

## 3. Three.js / WebGL Issues

### 3.1 Memory Leak — Full Scene Recreated on Location Change (HIGH)

- **File:** `src/components/globe/EarthGlobe3D.tsx:151-478`
- **Problem:** The main `useEffect` has `[interactivePicker, locations]` as dependencies. Every time `locations` array changes, the **entire Three.js scene** (renderer, camera, geometry, materials, textures, event listeners) is destroyed and recreated. This causes:
  - Texture re-downloads (4 HTTP requests)
  - GPU memory allocation churn
  - Brief flash/flicker
- **Fix:** Separate scene initialization from marker updates. Scene should init once; markers should update in a separate effect.
- **Severity:** 🟡 HIGH (performance)

### 3.2 Stale Closure — `isAutoRotating` in Animation Loop (MEDIUM)

- **File:** `src/components/globe/EarthGlobe3D.tsx:425`
- **Problem:** `isAutoRotating` is React state read inside the animation loop closure. The closure captures the value at effect creation time and never updates. The auto-rotation toggle button changes state but the animation loop uses the stale value.
- **Fix:** Use a `useRef` for `isAutoRotating` instead of `useState`, or read from ref in the loop.
- **Severity:** 🟡 MEDIUM (functional bug)

### 3.3 No Geometry/Material Disposal (MEDIUM)

- **File:** `src/components/globe/EarthGlobe3D.tsx:465-477`
- **Problem:** Cleanup function calls `renderer.dispose()` but does NOT dispose geometries, materials, or textures. This leaks GPU memory on component unmount/re-mount cycles.
- **Severity:** 🟡 MEDIUM

### 3.4 No Reduced Motion Support (LOW)

- **Problem:** No `prefers-reduced-motion` media query check. Users with motion sensitivity preferences get full 3D rotation and animations.
- **Severity:** 🟢 LOW

### 3.5 No Page Visibility Handling (LOW)

- **Problem:** Animation loop runs continuously even when the browser tab is hidden, wasting CPU/GPU.
- **Severity:** 🟢 LOW

### 3.6 No WebGL Context Loss Handling (LOW)

- **Problem:** If the browser reclaims WebGL context (common on mobile), the globe silently breaks with no recovery or fallback.
- **Severity:** 🟢 LOW

---

## 4. Database & Schema Issues

### 4.1 No Database Indexes (MEDIUM)

- **File:** `prisma/schema.prisma`
- **Problem:** No `@@index` directives on any model. Frequently queried fields (`status`, `featured`, `category`, `order`, `year`, `slug`) have no indexes.
- **Impact:** Performance degrades as data grows.
- **Severity:** 🟡 MEDIUM

### 4.2 JSON Strings Instead of Relations (LOW)

- **Models:** `Destination.photos`, `GlobeLocation.photos`, `Publication.tags`
- **Problem:** Photos and tags are stored as JSON strings (`"[]"` default). This prevents relational queries and joins.
- **Impact:** Acceptable for SQLite but limits query capabilities.
- **Severity:** 🟢 LOW (acceptable for MVP)

### 4.3 No Formal Migrations (MEDIUM)

- **Problem:** Schema uses `prisma db push` (destructive sync) instead of `prisma migrate`. No migration history.
- **Impact:** Risky for production — schema changes could drop data.
- **Severity:** 🟡 MEDIUM

### 4.4 Duplicate Content Models (LOW)

- **Models:** `Destination` and `GlobeLocation` overlap significantly (both store coordinates, country, photos, multilingual text).
- **Impact:** Data duplication, two admin CRUD interfaces for similar content.
- **Severity:** 🟢 LOW (intentional separation)

---

## 5. Frontend & UI Issues

### 5.1 Experience Page Has Hardcoded Data (HIGH)

- **File:** `src/app/[locale]/experience/page.tsx:33-76`
- **Problem:** Professional roles are hardcoded in the component source code. Not editable from admin panel. No database model for experience/roles.
- **Severity:** 🟡 HIGH (violates CMS requirement)

### 5.2 Admin Login Page Uses Dark Theme (LOW)

- **File:** `src/app/admin/login/page.tsx:47`
- **Problem:** Login page uses `bg-[#08090c]` dark theme while the rest of the site uses warm editorial light theme. Visual inconsistency.
- **Severity:** 🟢 LOW

### 5.3 Duplicate Footer Components (LOW)

- **Files:** `src/components/Footer.tsx` and `src/components/layout/Footer.tsx`
- **Problem:** Two Footer components exist. The layout one is used by locale pages; the original one may be unused.
- **Severity:** 🟢 LOW

### 5.4 AdminDashboardClient Is 1343 Lines (MEDIUM)

- **File:** `src/components/admin/AdminDashboardClient.tsx`
- **Problem:** Massive single component with 8+ inline tab panels. Hard to maintain.
- **Severity:** 🟡 MEDIUM (maintainability)

---

## 6. Deployment & Configuration Issues

### 6.1 SQLite + Local File Storage (HIGH for Production)

- **Problem:** SQLite database file and uploaded files in `public/uploads/` are ephemeral on serverless platforms (Vercel, etc.). Data will be lost on every deployment.
- **Impact:** Cannot deploy to production without migrating to PostgreSQL and cloud storage (S3/Cloudflare R2).
- **Severity:** 🔴 HIGH (for production deployment)

### 6.2 `images.remotePatterns` Too Permissive (LOW)

- **File:** `next.config.mjs:6-9`
- **Problem:** `hostname: '**'` allows images from ANY domain. Should be restricted to known domains.
- **Severity:** 🟢 LOW

---

## 7. Summary Statistics

| Category | Critical | High | Medium | Low |
|---|---|---|---|---|
| Security | 1 | 3 | 3 | 0 |
| Three.js | 0 | 1 | 2 | 3 |
| Database | 0 | 0 | 2 | 2 |
| Frontend | 0 | 1 | 1 | 3 |
| Deployment | 0 | 1 | 0 | 1 |
| **Total** | **1** | **6** | **8** | **9** |
