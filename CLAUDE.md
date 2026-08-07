# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The Georgia Tech Women's Rugby club website: a Vite + React 19 + TypeScript single-page app with a Supabase backend (auth, Postgres, storage) and a password-protected `/admin` area for editing site content. Deployed to Vercel.

## Commands

```bash
npm run dev       # start Vite dev server
npm run build      # tsc -b (type-check) && vite build
npm run lint       # oxlint (not eslint)
npm run preview    # preview a production build locally
```

There is no test suite/runner configured in this repo — don't assume `npm test` exists.

Linting uses **oxlint**, configured in `.oxlintrc.json`, not ESLint.

## Environment

Requires `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` (see `.env.example`). `src/utils/supabase.ts` throws at import time if either is missing, which will break `npm run dev`/`build` immediately — set them in `.env` locally and in Vercel project settings for deploys.

## Architecture

### Routing: two independent trees

`src/App.tsx` splits routing into two trees, not one nested layout:

- **Public site** (`PublicSite`): wraps every public route in shared `Header`/`Footer`, matched via a catch-all `/*` route.
- **Admin** (`/admin/*`): a separate route tree using `AdminLayout` (its own chrome, no public `Header`/`Footer`), gated by `ProtectedRoute`. `/admin/login` is the only unprotected admin route.

`vercel.json` rewrites all paths to `/index.html` so this client-side routing works on Vercel.

### Auth

`AuthContext` (`src/contexts/AuthContext.tsx`) wraps Supabase email/password auth (`supabase.auth`) and exposes `session`/`signIn`/`signOut` via `useAuth()`. `ProtectedRoute` redirects to `/admin/login` when there's no session. There's a single admin role — no granular permissions.

### Content model: default-first, Supabase-hydrated

Every editable content type (people, alumni, games, practices, carousel photos, site copy) follows the same pattern:

1. `src/data/<thing>.ts` — TypeScript types plus a hardcoded `default<Thing>` fallback (and any pure helpers, e.g. `sortByGameDate`/`formatGameDate` in `data/games.ts`).
2. `src/hooks/use<Thing>.ts` — a hook that renders the default data synchronously, then fires an async Supabase `select` and swaps in live data if the query succeeds and returns rows.

This means public pages always render something immediately (no loading spinners for content) and degrade gracefully if Supabase is unreachable or a table is empty. When adding a new editable content type, follow this same default + hook pairing rather than fetching Supabase data directly in a page component.

Admin pages under `src/pages/admin/` (`AdminPeople`, `AdminAlumni`, `AdminGames`, `AdminPractices`, `AdminCarousel`, `AdminContent`) write directly through the `supabase` client (insert/update/delete), and Supabase RLS policies (see below) enforce that only authenticated sessions can write.

### Supabase schema is not version-controlled here

`/supabase` is **gitignored** (see `.gitignore`) — `schema.sql` and `migration_*.sql` are local reference copies of what's been run manually in the Supabase SQL editor, not applied automatically by any build/deploy step. `schema.sql` is the current full source of truth (tables: `people`, `alumni`, `site_content`, `practices`, `games`, plus `carousel-photos`/`site-photos` storage buckets). If you change the schema, you must also hand the user the SQL to run in the Supabase dashboard — it won't happen on its own. Every table uses RLS: public `select`, writes restricted to `auth.role() = 'authenticated'`.

`games.game_date` (a `date` column) is the single source of truth for both sort order and display; `formatGameDate` in `data/games.ts` deliberately omits the year on the public site (year is admin-only, for the date picker).

### Styling

Plain CSS per component/page (`Component.css` next to `Component.tsx`), no CSS-in-JS or Tailwind. Brand colors, fonts, and layout tokens are CSS custom properties defined once in `src/index.css` (`--gt-gold`, `--gt-navy`, `--gt-diploma`, semantic aliases like `--color-bg`/`--color-heading`, etc.) — reuse these tokens rather than hardcoding hex values.

Full brand/design rules (color distribution, typography scale, component guidelines, GT logo restrictions) live in `DESIGN_GUIDE.md` — read it before making visual changes. Two rules worth calling out because they're easy to violate accidentally:

- The site background is `var(--gt-diploma)` (#f9f6e5) everywhere, never white; translucent overlays on navy should tint with diploma (`rgba(249, 246, 229, α)`), not white.
- Never put `!important` on a `color` declaration, and if a color default must target a descendant selector (e.g. `.page p`), wrap it in `:where(...)` so a single class can still override it.
