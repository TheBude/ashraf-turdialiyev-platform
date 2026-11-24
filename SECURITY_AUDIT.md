# Security Audit — Ashraf Turdialiyev Platform

**Date:** 2026-11-24  
**Scope:** Authentication, authorization, input validation, file uploads, data exposure  
**Classification:** Internal Security Assessment

---

## Vulnerability Summary

| ID | Vulnerability | Severity | CVSS-like | Status |
|---|---|---|---|---|
| SEC-001 | Hardcoded JWT secret fallback | 🔴 CRITICAL | 9.8 | OPEN |
| SEC-002 | Prefilled admin credentials on login page | 🔴 HIGH | 8.1 | OPEN |
| SEC-003 | No login rate limiting | 🔴 HIGH | 7.5 | OPEN |
| SEC-004 | Public API leaks DRAFT records | 🔴 HIGH | 7.2 | OPEN |
| SEC-005 | Mass assignment via spread operator | 🟡 MEDIUM | 6.5 | OPEN |
| SEC-006 | MIME-only file validation (no magic bytes) | 🟡 MEDIUM | 5.3 | OPEN |
| SEC-007 | Settings API publicly readable | 🟡 MEDIUM | 4.3 | OPEN |
| SEC-008 | No CSRF protection | 🟡 MEDIUM | 4.0 | OPEN |
| SEC-009 | Contact form lacks sanitization limits | 🟢 LOW | 3.1 | OPEN |
| SEC-010 | No security headers configured | 🟢 LOW | 2.5 | OPEN |

---

## Detailed Findings

### SEC-001 — Hardcoded JWT Secret Fallback

**File:** [`src/lib/auth.ts#L6`](file:///c:/Users/sbuny/Downloads/AshrafTurdialiyev/src/lib/auth.ts#L6)

```typescript
const JWT_SECRET = process.env.JWT_SECRET || 'ashraf-turdialiyev-super-secure-jwt-secret-key-2026-production';
```

**Attack Vector:** Anyone who reads the public GitHub source code knows the JWT signing secret. They can forge valid admin tokens with `jwt.sign({ userId: 'any', email: 'any', name: 'any', role: 'ADMIN' }, 'ashraf-turdialiyev-super-secure-jwt-secret-key-2026-production', { expiresIn: '7d' })` and gain full admin access without credentials.

**Remediation:**
1. Remove the fallback string entirely
2. Throw an error at startup if `JWT_SECRET` env var is missing
3. Generate a random 256-bit secret for production

---

### SEC-002 — Prefilled Admin Credentials on Login Page

**File:** [`src/app/admin/login/page.tsx#L11-L12`](file:///c:/Users/sbuny/Downloads/AshrafTurdialiyev/src/app/admin/login/page.tsx#L11-L12)

```typescript
const [email, setEmail] = useState('admin@ashrafturdialiyev.com');
const [password, setPassword] = useState('AshrafAdmin2026!Secure');
```

**Attack Vector:** Visiting `/admin/login` reveals working credentials. The password field shows the actual admin password pre-filled. Text at bottom says "Default seed credentials are pre-populated for swift review."

**Remediation:**
1. Set both useState defaults to empty strings `('')`
2. Remove the helper text about default credentials

---

### SEC-003 — No Login Rate Limiting

**File:** [`src/app/api/auth/login/route.ts`](file:///c:/Users/sbuny/Downloads/AshrafTurdialiyev/src/app/api/auth/login/route.ts)

**Attack Vector:** Unlimited POST requests to `/api/auth/login`. An attacker can run automated brute-force attacks against the login endpoint.

**Remediation:**
1. Add in-memory rate limiting (IP + email based)
2. Lock out after 5 failed attempts for 15 minutes
3. Add configurable delay after failed attempts

---

### SEC-004 — Public API Leaks DRAFT Records

**Files:**
- [`src/app/api/globe/route.ts#L5-L26`](file:///c:/Users/sbuny/Downloads/AshrafTurdialiyev/src/app/api/globe/route.ts#L5-L26)
- [`src/app/api/destinations/route.ts#L5-L28`](file:///c:/Users/sbuny/Downloads/AshrafTurdialiyev/src/app/api/destinations/route.ts#L5-L28)

**Problem:** GET endpoints accept optional `?status=` parameter but default to returning ALL records (PUBLISHED + DRAFT). Public-facing pages can display unpublished content.

**Affected endpoints:**
- `GET /api/globe` — no default status filter
- `GET /api/destinations` — no default status filter
- `GET /api/globe/[id]` — returns any record by ID regardless of status
- `GET /api/destinations/[id]` — returns any record by ID/slug regardless of status

**Remediation:**
1. Default to `status: 'PUBLISHED'` when no auth token is present
2. Allow admin-authenticated requests to see all statuses
3. Individual GET by ID should check status for unauthenticated requests

---

### SEC-005 — Mass Assignment via Spread Operator

**Files:** Multiple PUT route handlers

```typescript
// Example from destinations/[id]/route.ts
const updated = await prisma.destination.update({
  where: { id },
  data: {
    ...body,  // ← ANY field from request body is passed to Prisma
    // ...
  },
});
```

**Attack Vector:** An attacker with admin access could send `{ "id": "new-id", "createdAt": "2020-01-01" }` or other protected fields in the request body. While Prisma ignores unknown fields, it allows overwriting `createdAt`, `updatedAt`, etc.

**Affected routes:** globe/[id], destinations/[id], timeline/[id], publications/[id], certificates/[id], countries/[id]

**Remediation:** Explicitly destructure and whitelist allowed fields instead of spreading the entire body.

---

### SEC-006 — MIME-Only File Validation

**File:** [`src/app/api/upload/route.ts#L21-L27`](file:///c:/Users/sbuny/Downloads/AshrafTurdialiyev/src/app/api/upload/route.ts#L21-L27)

**Problem:** Validation checks `file.type` (client-sent MIME), not the file's actual binary content.

**Attack Vector:** An attacker could upload a malicious file with a spoofed `Content-Type: image/jpeg` header containing an HTML file with JavaScript, PHP code, or a polyglot file.

**Remediation:** Read the first 16 bytes and validate against known magic byte signatures:
- JPEG: `FF D8 FF`
- PNG: `89 50 4E 47`
- WebP: `52 49 46 46 ... 57 45 42 50`
- PDF: `25 50 44 46`

---

### SEC-007 — Settings API Publicly Readable

**File:** [`src/app/api/settings/route.ts#L5-L16`](file:///c:/Users/sbuny/Downloads/AshrafTurdialiyev/src/app/api/settings/route.ts#L5-L16)

**Problem:** GET handler has no authentication. All site settings (key-value pairs) are readable by anyone.

**Remediation:** Require admin auth for GET, or create a separate public endpoint that only exposes specific safe keys.

---

### SEC-008 — No CSRF Protection

**Problem:** No CSRF tokens on forms. The JWT cookie uses `sameSite: 'lax'` which provides basic CSRF protection for top-level navigations but not for all attack vectors.

**Remediation:** `sameSite: 'lax'` is acceptable for this application since all mutations use JSON `POST`/`PUT`/`DELETE` with `Content-Type: application/json`, which cannot be triggered by cross-site form submissions.

**Status:** ACCEPTABLE RISK (SameSite + JSON content type provides sufficient protection)

---

### SEC-009 — Contact Form Lacks Length Limits

**File:** [`src/app/api/contact/route.ts#L20-L56`](file:///c:/Users/sbuny/Downloads/AshrafTurdialiyev/src/app/api/contact/route.ts#L20-L56)

**Problem:** No maximum length on `name`, `subject`, or `message` fields. An attacker could submit very large payloads to bloat the database.

**Remediation:** Add `String.prototype.slice()` limits: name ≤ 100, email ≤ 200, subject ≤ 200, message ≤ 5000.

---

### SEC-010 — No Security Headers

**Problem:** No `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy`, or `Strict-Transport-Security` headers configured.

**Remediation:** Add security headers via `next.config.mjs` or middleware.

---

## Authentication Architecture Review

| Aspect | Current | Recommended |
|---|---|---|
| Secret source | Env var with hardcoded fallback | Env var REQUIRED, no fallback |
| Password hashing | bcryptjs (10 rounds) | ✅ Acceptable |
| Session mechanism | JWT in HTTP-only cookie | ✅ Good |
| Cookie security | `httpOnly: true, secure: production, sameSite: lax` | ✅ Good |
| Session expiry | 7 days | ✅ Acceptable |
| Role enforcement | `getCurrentAdmin()` checks user exists | Should also verify `role === 'ADMIN'` |
| Rate limiting | None | REQUIRED |
| Brute-force protection | None | REQUIRED |
