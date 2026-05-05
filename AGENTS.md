<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# agents.md — Project Brain

> **This is the single source of truth for every AI coding session on this project.**
> Read it fully before touching a file. Update it whenever something changes — architecture, decisions, copy rules, pending tasks. An outdated agents.md causes drift. Keeping it current is as important as keeping the code clean.
> **Last updated: 2026-05-05 (SEO + discoverability pass — sitemap, robots, per-page metadata, OG image, JSON-LD Person/WebSite/Article, case studies split to `/portfolio/[slug]`, custom 404, /admin noindex)**

---

## 0. How to Use This File

- **Before starting any session:** read sections 1–7 to orient yourself
- **Before writing any copy:** read section 8 (Brand Voice) and section 9 (Anti-AI-Slop Rules)
- **After completing any meaningful change:** update the relevant section here — file structure, decisions log, pending tasks
- **This is not optional.** Stale context produces stale output.

---

## 1. Purpose

Personal brand + SaaS showcase website for **Josh Holzhauser**.
Core MO: **we build everything ourselves. No third-party embeds, no iframe dependencies, no outsourcing UX to other platforms.**

Goals (in priority order):
1. Convert visitors → submitted contact requests (Firebase-backed, custom-built)
2. Establish Josh as a capable, trusted solo developer
3. Showcase real products in production
4. Zero ongoing hosting cost

Live URL (target): `https://joshholzhauser.vercel.app`

---

## 2. Tech Stack

| Layer       | Choice                        | Notes                                        |
|-------------|------------------------------|----------------------------------------------|
| Framework   | Next.js 16.2.4 (App Router)  | TypeScript, `src/` dir, `@/*` alias          |
| Styling     | Tailwind CSS 4               | CSS-first — config in `globals.css`          |
| Animation   | Framer Motion ^12            | `useInView` for scroll triggers              |
| Icons       | lucide-react (v1.x)          | No brand icons — use inline SVG              |
| Database    | Firebase Firestore           | Project: `joshholzhauser-3a74c`              |
| Auth        | Firebase Auth (Google)       | Admin-only — `wunkoteam@gmail.com`           |
| Hosting     | Vercel Hobby (free)          |                                              |
| Analytics   | Vercel Analytics (free)      | Enable in Vercel dashboard                   |
| Email (future) | Resend (3k/mo free)       |                                              |

### No third-party booking embeds
Cal.com was evaluated and rejected. The `/book` page is a **custom 3-step contact form** that writes directly to Firestore. We own the UX. We own the data.

### Firebase project
- Project ID: `joshholzhauser-3a74c`
- App ID: `1:513711576279:web:edc42f01945542c9974c92`
- Admin email: `wunkoteam@gmail.com`
- Config lives in `.env.local` (not committed) and must be added to Vercel environment variables before deploy

### Critical Tailwind 4 rule
No `tailwind.config.js`. All tokens live in `globals.css` inside `@theme inline {}`.

### lucide-react brand icon note
`Github`, `Linkedin`, `Twitter` do **not** exist in v1.x.
Use inline SVG components instead (see `Footer.tsx` and `about/page.tsx` for examples).

### Framer Motion ease cast
Cubic-bezier arrays must be cast: `ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number]`

---

## 3. Design System

| Token        | Value     | Usage                          |
|--------------|-----------|--------------------------------|
| `--color-bg` | `#07080B` | Page background (near-black)   |
| Surface      | `#101319` | Cards, panels                  |
| Surface-2    | `#171A22` | Tag chips, inset blocks        |
| Border       | `#1B1F2A` | Dividers, outlines             |
| Border-2     | `#262B38` | Hover/elevated borders         |
| Primary CTA  | `#5B8DEF` | Buttons, links (refined blue — not Tailwind default) |
| Primary hover| `#4775D9` | Button hover                   |
| Primary text accent | `#86A8FF` | Link hover, muted accents |
| Accent       | `#06B6D4` | Cyan punch — gradients, KPIs   |
| Success      | `#10B981` | Positive signals               |
| Text primary | `#F9FAFB` |                                |
| Text muted   | `#9CA3AF` |                                |
| Text faint   | `#6B7280` |                                |

> **Palette intent:** near-black neutral with the faintest cool undertone, paired with a periwinkle-leaning blue (`#5B8DEF`) instead of the default Tailwind 500 (`#3B82F6`) so the site escapes the "generic dev portfolio" look. The cyan accent stays as the contrast pop.

Fonts: `Inter Variable` (`--font-inter`) + `Geist Mono` (`--font-geist-mono`)

Utility classes (defined in `globals.css`):
- `.gradient-text` — cyan→blue
- `.gradient-text-blue` — blue→sky
- `.grid-bg` — dot/grid overlay
- `.glow-blue` — blue box-shadow
- `.noise` — noise texture

---

## 4. File Structure

```
src/
  app/
    globals.css              ← design tokens + keyframes
    layout.tsx               ← root layout: Navbar + Footer + metadata
    page.tsx                 ← Home (8 sections)
    about/page.tsx           ← Story, headshot, values, tech stack
    admin/page.tsx           ← Lead dashboard (Google Auth protected)
    book/page.tsx            ← Custom 3-step contact form → Firestore
    portfolio/page.tsx       ← 6 Tier-1 case studies + Lab grid with #anchors
    services/page.tsx        ← 5 pricing tiers
  components/
    layout/Navbar.tsx        ← Sticky, scroll-aware, mobile hamburger
    layout/Footer.tsx        ← 3-col: brand + nav + CTA; inline SVG social icons
    sections/Hero.tsx        ← Typewriter, dual CTA, trust anchors
    sections/SocialProofBar.tsx
    sections/ServicesGrid.tsx
    sections/PortfolioPreview.tsx ← 4 featured projects from projects.ts
    sections/AIShowcase.tsx  ← Scroll-synced split-view scenes: code panel (typing) left, live preview (UI assembling) right. Three phases (Plan/Build/Result) with progress rail + reduced-motion fallback.
    sections/HowIWork.tsx
    sections/WhyJosh.tsx     ← Comparison table
    sections/FinalCTA.tsx
    sections/LabGrid.tsx     ← Tier-2 compact card grid for /portfolio
    sections/SkillsGraph.tsx ← 5-category animated skills grid
    ui/FadeIn.tsx            ← FadeIn, Stagger, StaggerItem
    ui/PublicationBadges.tsx ← Vercel/Play Store/GitHub/Moodle/Website badges
  data/
    projects.ts              ← Single source of truth: all 12 projects, tiers, featured flags
  lib/
    firebase.ts              ← Firebase app + Firestore export
    utils.ts                 ← cn() helper (clsx + tailwind-merge)
public/
  engler-logo.png            ← Engler Contracting ECC logo
  JoshBioPic.jpg               ← Josh headshot
firestore.rules              ← Security rules (deploy with firebase CLI)
firestore.indexes.json
firebase.json
.env.local                   ← Firebase config (not committed)
```

---

## 5. Firebase Architecture

### Firestore collection: `leads`
Each document written by the `/book` contact form:
```ts
{
  name:        string,   // required
  email:       string,   // required, lowercased
  projectType: string,   // 'website' | 'app' | 'automation' | 'mobile' | 'saas' | 'unsure'
  message:     string,   // required
  budget:      string,   // 'under1k' | '1k-3k' | '3k-7k' | '7k+' | 'unsure'
  timeline:    string,   // 'asap' | '1-3mo' | 'flexible'
  extra:       string,   // optional
  status:      'new' | 'contacted' | 'closed',
  createdAt:   Timestamp,
}
```

### Security rules
- **Write (create):** anyone — required fields validated server-side by Firestore rules
- **Read/update:** only `wunkoteam@gmail.com` via Google Auth
- Rules file: `firestore.rules` — deploy with `firebase deploy --only firestore:rules --project joshholzhauser-3a74c`

### Admin dashboard (`/admin`)
- Sign in with Google (`wunkoteam@gmail.com`)
- Shows all leads sorted newest-first, with status badges, expand-to-read, and one-click status updates
- Not linked from the public nav — access directly at `/admin`

### Required Firebase Console setup (one-time)
1. Firestore Database → Create database → production mode → pick region
2. Authentication → Sign-in method → Google → Enable → save `wunkoteam@gmail.com` as support email
3. Run: `firebase deploy --only firestore:rules --project joshholzhauser-3a74c`

---

## 6. Portfolio Projects

### Tier 1 — Case Studies (6)

Each tier-1 project has its own indexable URL at `/portfolio/<slug>` (rendered by `src/app/portfolio/[slug]/page.tsx` with `generateStaticParams` + `generateMetadata`). The `/portfolio` index now renders summary cards that link into the slug pages — anchor links (`/portfolio#engler`) are gone.

| Slug URL                            | Title                                              | Featured | Publications                          |
|-------------------------------------|----------------------------------------------------|----------|---------------------------------------|
| `/portfolio/insurance-ops`          | Insurance Ops Platform (anonymized client)         | ✓        | None (private)                        |
| `/portfolio/engler`                 | Engler Contracting — Business Website              | ✓        | englercontracting.com                 |
| `/portfolio/enterprise-ai-platform` | Enterprise AI Orchestration Platform (anonymized)  | ✓        | None (private)                        |
| `/portfolio/polklookup`             | PolkLookup — Property Records (Mobile + Web)       | ✓        | Vercel + Google Play                  |
| `/portfolio/marigold`               | Marigold — Recipe App (formerly CookBookPal)       |          | Google Play + GitHub                  |
| `/portfolio/moodle-stack`           | Moodle — Custom Plugins & Container Stack          |          | Moodle badge                          |

### Tier 2 — Lab Grid (6)

| ID                   | Title                        | Publications         |
|----------------------|------------------------------|----------------------|
| `#halitaily`         | HaliTaily                    | Vercel               |
| `#enterprise-desktop`| Cross-platform Desktop App   | None (private)       |
| `#mcp-trio`          | MCP Server Trio              | GitHub               |
| `#siphaus`           | SipHaus                      | None                 |
| `#couples-game`      | Couples Game                 | None                 |
| `#waveform-creator`  | Waveform Creator             | None                 |

**Single source of truth:** `src/data/projects.ts` — all projects, tiers, featured flags, publication badges.

---

## 7. Pending Tasks

### Before deploy
- [ ] Complete Firebase Console setup (Firestore + Auth — see section 5)
- [ ] Add `.env.local` variables to Vercel environment variables
- [ ] Replace `/public/JoshBioPic.jpg` with solo cropped photo
- [ ] Update Footer LinkedIn URL (currently `https://linkedin.com` placeholder)

### Deployment
```bash
git add . && git commit -m "Initial website build" && git push origin main
# Connect repo at vercel.com → import project → auto-detects Next.js → deploy
# Add all NEXT_PUBLIC_FIREBASE_* vars in Vercel project settings → Environment Variables
```

### Future features
- [x] Signature Home timeline in `src/components/sections/AIShowcase.tsx` (implemented 2026-05-01)
- [x] Services page interactive estimator in `src/app/services/page.tsx` (implemented; refactored 2026-05-04 to "Starting at" framing)
- [x] `src/app/not-found.tsx` — custom 404 (implemented 2026-05-05)
- [x] `src/app/sitemap.ts` + `robots.ts` — SEO (implemented 2026-05-05; sitemap enumerates all 6 case-study slug URLs)
- [ ] About page capability visualization in `src/app/about/page.tsx`
- [ ] Email notification when a new lead is submitted (Resend, 3k/mo free)
- [ ] Blog with MDX
- [ ] Google Analytics 4
- [ ] LinkedIn URL for Footer

### SEO standby items — blocked on user input
*Added 2026-05-05 after the SEO pass. Do not act on these without explicit user confirmation each time. The user is aware these are open and will signal when to proceed.*

- [ ] **Custom domain decision.** Site currently lives at `https://joshholzhauser.vercel.app` — `SITE_URL` constant is hardcoded in 4 files: [src/app/layout.tsx](src/app/layout.tsx), [src/app/robots.ts](src/app/robots.ts), [src/app/sitemap.ts](src/app/sitemap.ts), [src/app/opengraph-image.tsx](src/app/opengraph-image.tsx). When the user buys `joshholzhauser.com` / `.app` / similar, update all 4 constants. User considering wildcard subdomain pattern (`tool.joshholzhauser.app`, `customwebsite.joshholzhauser.app`) for sibling Vercel projects — root domain still goes to this portfolio site. Hobby plan supports unlimited custom subdomains.
- [ ] **Vercel Analytics install.** ~3-min job: `npm install @vercel/analytics`, drop `<Analytics />` in [src/app/layout.tsx](src/app/layout.tsx), enable in Vercel dashboard. Free tier on Hobby = 2,500 events/mo. Optional — user has not committed.
- [ ] **Google Search Console setup.** Defer until *after* the custom domain is live, so the GSC property is verified once against the canonical domain (avoid migrating properties later). Verification via DNS TXT record on the Vercel-managed domain → submit `https://<domain>/sitemap.xml`. This is the more important of the two analytics tools for SEO specifically.

---

## 8. Key Technical Decisions

- **No third-party booking tools** — we build our own contact flow, we own the data
- **Firebase for leads** — Firestore + Google Auth, no backend server needed
- **Tailwind 4** = CSS-only config, no `tailwind.config.js`
- **lucide v1.x removed brand icons** → always use inline SVG for GitHub, LinkedIn, Twitter
- **Server Components by default** — only add `'use client'` when using hooks or browser APIs
- **`params` is a Promise in Next 16** — must `await params` in dynamic routes
- **Framer Motion `ease` arrays** need explicit `as [number,number,number,number]` cast
- **AIShowcase** is a scroll-synced split-view: a fake code editor on the left types out source while a live preview on the right assembles the matching UI piece-by-piece. Three phases (Plan / Build / Result) on a sticky stage with a progress rail. Mobile stacks the two panels vertically and shrinks the code editor. Reduced-motion users get a static three-card fallback. No external AI APIs called.
- **Admin route** is not protected at the routing level — Firebase Auth on the client handles access. For a low-traffic personal site this is sufficient.
- **All seller-side pricing uses "Starting at $X" framing** — never a range with an upper bound. Ranges create anchoring resentment (buyers latch onto the low end) and make future price increases awkward. Each tier pairs the floor with a "What pushes it up" caption so the transparency promise survives. Buyer-side budget brackets in `/book` and `/admin` are unaffected — those are user-input categories, not quotes.
- **30-day fix-it warranty** ships with every one-time build tier — anything that breaks within 30 days of launch is fixed at no charge. New features and scope changes are explicitly out of scope and route to the retainer.
- **Maintenance retainer is reviewed quarterly** — `Starting at $250/mo` with explicit "adjusted to actual load" language. Protects both sides from the same anchoring problem on the recurring side: if a SaaS turns out to need $1,500/mo of real attention, there's a built-in moment to renegotiate without resentment.
- **Audience is non-technical SMB owners and first-time founders** — they don't know "web app" vs "mobile app" vs "SaaS" vs "LLM". Entry-point copy (Hero, services tier names, calculator inputs, book form, homepage service grid) speaks **goals**, not technologies. Tech terms are allowed deeper in the funnel — case study tech tags, About page — where the buyer has opted into more detail. The 1:1 vocabulary mapping between Hero typewriter, services tier names, and calculator type buttons is intentional — same five outcomes everywhere so the buyer's mental model carries from page to page.
- **Services page has three on-ramps** — a goal-picker (one-click → scroll-to-tier with `:target` highlight via globals.css `.tier-card:target`), a calculator (interactive scope explorer), and the tier cards themselves (direct browse). Each tier card carries a `crossRoute` field that actively steers misrouted buyers to the correct tier — surfaces the one-button escape hatch on every card instead of relying on the buyer to re-scan the wall.
- **SEO architecture (2026-05-05).** Each public page exports its own `metadata` (unique `title`, `description`, `alternates.canonical`, and `openGraph` with `images: ['/opengraph-image']` — Next overrides parent `openGraph` wholesale, so children must re-attach the image). Root layout owns `metadataBase`, the title template `'%s · Josh Holzhauser'`, twitter card defaults, and JSON-LD `Person` + `WebSite` schemas. Each `/portfolio/[slug]` page emits its own JSON-LD `Article` schema. `'use client'` pages (`/book`, `/admin`) get metadata via a sibling `layout.tsx`. `/admin` is `noindex,nofollow` via metadata *and* disallowed in `robots.ts` (belt + suspenders). The OG image is rendered from JSX at edge runtime via `src/app/opengraph-image.tsx` — no static asset to maintain. **Do not** re-introduce anchor links like `/portfolio#engler` — case studies are now individually indexable URLs and each one's ranking equity depends on the dedicated route.

---

## 9. Brand Voice

- Direct, confident, no fluff
- "I build X that fits your business" — the canonical hero line. Cooperative framing, not competitive against the buyer's own people. (Earlier "so you don't need a team" was retired 2026-05-04 — read as antagonistic toward existing staff when the actual target was agencies.)
- Solo developer advantage: speed, full ownership, long-term relationships
- Lead with real specifics: named client projects, real tech, real outcomes
- CTAs describe the action, not the outcome: "Tell me about your project" not "Start your journey"

### Plain language ≠ dumbed down
The audience doesn't speak developer. Drop the jargon at every entry point, but stay in voice — direct, specific, with a point of view. Plain doesn't mean generic.

| ❌ Jargon (or generic) | ✅ Plain + in-voice |
|---|---|
| `AI & Automation Package` | `Stop doing it by hand` |
| `Custom Business App` | `A tool that runs your business` |
| `SaaS MVP Build` | `Build something you can sell` |
| `Web Presence` | `Get found online` |
| `Complexity: Custom logic, 1–2 APIs` | `Connects to a couple other tools — email, payments, calendar` |
| `End-to-end SaaS builds` (generic) | `User accounts, payments, the whole stack` (concrete) |

Both columns are short. The right column wins because it names the buyer's goal in the buyer's words, not the developer's deliverable in the developer's words.

---

## 10. Anti-AI-Slop Rules

**Read this before writing any copy.** Visitors recognise AI-generated text immediately — it reads like a template, not a person. Every session must check new copy against these rules before it ships.

### Banned phrases and patterns
| Pattern | Why it's banned |
|---|---|
| `"Real [X] · Real [Y] · Real [Z]"` | Triple parallel constructions are ChatGPT's default |
| `"No [X]. No [Y]. Just [Z]."` | The freelancer-template closer — appears on thousands of sites |
| `"Ready to [verb] your [noun]?"` | Generic CTA headline — means nothing |
| `"From concept to [deployed/launched/live]"` | Every AI writes this exact phrase |
| `"AI-powered"`, `"seamless"`, `"robust"`, `"leverage"`, `"streamlined"`, `"cutting-edge"` | Banned words — delete on sight |
| `"[noun] that [verb]. [thing], [thing], [thing]."` | Service card formula — rewrite with a point of view |
| `small uppercase label → h2 → gray subtitle` on every single section | Rotating or dropping the subtitle is fine; repeating the identical structure on every section is not |
| `"Real problems. Real solutions."` | Meaningless rhyming pair |
| `"[adj] · [adj] · [adj] capability"` | Tag stacking with no substance |
| Developer vocabulary at the *first* point of contact (`SaaS`, `LLM`, `web app`, `API integration`, `full stack` as a buyer-facing label) | Audience doesn't speak this language. Tech terms are fine deeper in the funnel (case study tech tags, About page) once the buyer has opted in — banned in Hero, services tier names, calculator inputs, book form, and homepage service grid |

### What good copy looks like on this site
- **Specific beats generic.** "A spreadsheet you're embarrassed by" is better than "existing systems."
- **Admits constraints.** "I'm one person" is a feature, not a disclaimer.
- **Has a voice.** Sentences can be short. Fragments are fine. Josh isn't a brochure.
- **Uses real names and numbers.** Leah Renewals, englercontracting.com — not "a client" or "a business."
- **CTAs describe the action.** "Tell me about your project" > "Book a free discovery call" > "Start your journey."

### The three-question test — run this before committing any copy
1. Could this exact sentence appear on 10,000 other developer portfolio sites? If yes, rewrite it.
2. Does it sound like a person talking, or a template with blanks filled in?
3. Is there a specific detail — a number, a project name, a real constraint — that could replace a vague claim?
