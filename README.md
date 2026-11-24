# Ashraf Turdialiyev — Official Personal Brand Platform

A high-performance, full-stack personal brand platform built for **Ashraf Turdialiyev** (International Explorer, Academic Scholar, and Global Thinker).

Designed with a bespoke dark luxury aesthetic featuring deep onyx tones and signature gold accents (`#d4af37`), full 4-language internationalization (Uzbek, English, Russian, Turkish), an interactive SVG world map, curated expedition chronicles, a peer-reviewed research repository, credentials vault, live telemetry audience counters, and an executive CMS admin dashboard.

---

## 🌟 Key Features

- **🌐 4-Language Internationalization:** Reactive instant switching between **O'zbekcha**, **English**, **Русский**, and **Türkçe** with persistence across sessions.
- **🗺️ Interactive Sovereign Territories Map:** Custom vector SVG cartography with glowing markers for explored nations, interactive hover tooltips, and detailed Territory Dossier Cards (field notes, coordinates, visited year).
- **🧭 Curated Expedition Chronicles:** Photo galleries, geographic coordinates, and expandable Chronicle Story Modals.
- **📈 Journey Milestones Timeline:** Vertical milestone path with category filtering (Education, Leadership, Expeditions, Honors, Scientific).
- **📚 Scientific Publications Directory:** Real-time search query filtering across papers, DOI links, citations badges, and comprehensive abstracts.
- **🏆 Credentials & Certifications Vault:** International diplomas with Lightbox verification modals and external accreditation links.
- **⚡ Live Audience Telemetry:** Dynamic client-side simulated live counters with gentle increments and pulsing status indicators.
- **📬 Inbound Collaboration Form:** Direct submission with field validation, toast feedback, and delivery to the administrative inbox.
- **🛡️ Executive CMS Admin Portal (`/admin`):** Full CRUD management for destinations, map countries, timeline events, certificates, research publications, audience telemetry configuration, and message inbox.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 15 (App Router), React 19, TypeScript 5.7
- **Styling:** Tailwind CSS 3.4, PostCSS, Autoprefixer, Lucide Icons
- **Database & ORM:** SQLite via Prisma ORM 6.19
- **Security & Auth:** JSON Web Tokens (JWT) in HTTP-only secure cookies, bcrypt password hashing
- **Notifications:** Sonner toasts

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/TheBude/ashraf-turdialiyev-platform.git
cd ashraf-turdialiyev-platform
```

### 2. Configure Environment Variables
Copy the template configuration:
```bash
cp .env.example .env
```
Default `.env` configuration:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="ashraf-turdialiyev-super-secure-jwt-secret-key-2026-production"
ADMIN_DEFAULT_EMAIL="admin@ashrafturdialiyev.com"
ADMIN_DEFAULT_PASSWORD="AshrafAdmin2026!Secure"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Database Setup & Seeding
```bash
# Push schema to SQLite
npx prisma db push

# Seed initial multi-language records
node prisma/seed.js
```

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the platform.

### 6. Production Build & Run
```bash
npm run build
npm start
```

---

## 🔐 Administrative Access

- **CMS Portal URL:** `http://localhost:3000/admin/login`
- **Email:** `admin@ashrafturdialiyev.com`
- **Passphrase:** `AshrafAdmin2026!Secure`

---

## 🧪 Automated Verification Suite

Run full-stack verification scripts:
```bash
# Test REST APIs and Security
node scripts/test-phase2.js

# Test All 10 End-to-End Workflows
node scripts/verify-all-workflows.js
```

---

## 📄 License

All rights reserved © 2026 Ashraf Turdialiyev.
