# TODO / Ideas

Ideas for the GT Women's Rugby site, based on what's built vs. what `DESIGN_GUIDE.md` recommends and gaps noticed while reading the code. Not commitments — pick what's worth doing.

## Content gaps vs. the design guide

- [ ] **Player roster page/section.** `About.tsx` shows Coaches and Executive Board (via `usePeople`), but there's no full player roster — `DESIGN_GUIDE.md` lists "Roster" as a top-level nav item and "Who's on the team?" as a core question the site should answer. Could reuse the existing `people`/flip-card pattern with a new `section` value.
- [ ] **Join / registration flow.** The nav CTA "Join the Team" and the guide's "Join Women's Rugby → Register" both point at a real join path, but today it just links to `/contact`. Consider a dedicated `/join` page with next-steps info (practice times, gear, contact form) rather than routing everyone through general contact.
- [ ] **News section.** `DESIGN_GUIDE.md`'s homepage layout calls for "Featured News" editorial cards (image, headline, one sentence, read more) — there's no news/posts content type yet. Would follow the existing `data/<thing>.ts` + `hooks/use<thing>.ts` + admin CRUD pattern.
- [ ] **Sponsors section.** Guide calls for a Sponsors section with a "Become a Sponsor" CTA; not implemented anywhere.
- [ ] **Instagram gallery embed.** Contact page links out to Instagram, but the guide's homepage layout wants an in-page "Instagram Gallery" section, not just a link.

## Home page

- [ ] **Upcoming Match card.** `Schedule.tsx` already computes `nextGame` from `useGames()` — Home currently only shows the practice table, not the next match. Pulling the same "Next Game" card onto Home would match the guide's "Upcoming Match" priority section.
- [ ] **Latest Result.** `games` already carries `status`/`score`, but nothing surfaces the most recent completed game (Win/Loss + score) anywhere on the site.
- [ ] Match card niceties the guide calls out: countdown, directions link, "Add to Calendar" — none of these exist yet on the Schedule next-game card.

## Footer

- [ ] Footer (`Footer.tsx`) is minimal: brand, copyright, tagline only. Consider adding quick nav links and social/Instagram links, which is common for a footer and currently only lives on the Contact page.

## SEO / metadata

- [ ] `index.html` has only a bare `<title>` — no meta description, Open Graph tags, or social preview image. Worth adding, especially since this is a public-facing recruiting site.

## Admin / data

- [ ] No history/versioning table.
- [ ] There's no automated way to apply `supabase/schema.sql` changes — worth a short note in the admin flow (or a script) since `/supabase` is gitignored and changes have to be pasted into the Supabase SQL editor by hand (see `CLAUDE.md`).

## Technical

- [ ] No test suite exists (`package.json` has no `test` script). Even a handful of tests around the sort/format helpers in `data/games.ts` (`sortByGameDate`, `formatGameDate`) would catch regressions cheaply since they're pure functions.
- [ ] `dist/` exists in the working tree (gitignored, untracked) — looks like stray local build output from a past `npm run build`/`vercel` run. Safe to delete unless it's being used for something.
