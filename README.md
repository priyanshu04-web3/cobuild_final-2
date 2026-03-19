# CoBuild Solutions — Startup Platform

A high-fidelity startup networking platform built with React, TypeScript, Tailwind CSS, and Supabase.

## Quick Start

```bash
npm create vite@latest cobuild -- --template react-ts
cd cobuild
npm install @supabase/supabase-js framer-motion lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Copy `App.jsx` → `src/App.tsx`  
Copy `supabaseClient.ts` → `src/supabaseClient.ts`

## Environment Variables

Create `.env` at project root:

```
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON=your_anon_key_here
```

## Supabase Setup

1. Create a project at https://supabase.com
2. Run the SQL schema found in the comment block at the top of `App.jsx`
3. Enable Email Auth under **Authentication → Providers**
4. Paste your project URL and anon key into `.env`

### Schema Overview

| Table | Purpose | RLS |
|-------|---------|-----|
| `profiles` | User metadata + role | Public read, own update |
| `startups` | Startup listings | Public read, admin insert |
| `job_postings` | Opportunity listings | Public read, admin manage |

### User Roles

| Role | Capabilities |
|------|-------------|
| `Startup_Admin` | Post roles, launch startup, view applicants |
| `Individual_Contributor` | Browse, apply, save opportunities |

## Architecture

```
App.jsx
├── FontInjector         – Google Fonts + global CSS
├── OrbBg / NoiseOverlay – Ambient visual effects
├── LandingPage
│   ├── Navbar
│   ├── Hero             – Animated word cycle + stats
│   └── Features         – 4-up glassmorphism cards
├── AuthModal            – Dual-role sign up / sign in
└── Dashboard
    ├── Sidebar          – Role-aware navigation
    ├── BentoOverview    – Stats grid + bento cards
    ├── StartupListings  – Searchable glassmorphism grid
    ├── JobPostings      – Animated opportunity list
    ├── PostRoleForm     – Admin: create job listing
    └── LaunchStartupForm – Admin: 3-step startup wizard
```

## Design System

- **Background**: `#050505` Midnight Black
- **Accent**: `#FF5A1F` Electric Orange
- **Typography**: Outfit (headings) + Plus Jakarta Sans (body)
- **Cards**: Glassmorphism — `rgba(255,255,255,0.035)` + `backdrop-filter: blur(12px)`
- **Motion**: Framer Motion page transitions + staggered card reveals
