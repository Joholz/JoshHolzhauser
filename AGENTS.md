<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# agents.md — Project Brain
> Reference this file at the start of every AI coding session on this project.

---

## 1. Purpose
Personal brand + SaaS showcase website for **Josh Holzhauser**.
Goals (in priority order):
1. Convert visitors → booked discovery calls (Cal.com)
2. Establish Josh as a capable, trusted solo developer
3. Showcase real products in production
4. Zero ongoing hosting cost

Live URL (target): `https://joshholzhauser.vercel.app`

---

## 2. Tech Stack

| Layer          | Choice                         | Notes                               |
|----------------|-------------------------------|-------------------------------------|
| Framework      | Next.js 16.2.4 (App Router)   | TypeScript, `src/` dir, `@/*` alias |
| Styling        | Tailwind CSS 4                | CSS-first — config in `globals.css` |
| Animation      | Framer Motion ^12             | `useInView` for scroll triggers     |
| Icons          | lucide-react (v1.x)           | No brand icons — use inline SVG     |
| Hosting        | Vercel Hobby (free)           |                                     |
| Booking        | Cal.com (free)                | iframe embed at `/book`             |
| Analytics      | Vercel Analytics (free)       | Add in Vercel dashboard             |
| Email (future) | Resend (3k/mo free)           |                                     |
| CRM (future)   | HubSpot free tier             |                                     |

### Critical Tailwind 4 rule
No `tailwind.config.js`. All tokens live in `globals.css` inside `@theme inline {}`.

### lucide-react brand icon note
`Github`, `Linkedin`, `Twitter` do **not** exist in v1.x.
Use inline SVG components instead (see `Footer.tsx` and `about/page.tsx` for examples).

### Framer Motion ease cast
Cubic-bezier arrays must be cast: `ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number]`

---

## 3. Design System

| Token        | Value     | Usage              |
|--------------|-----------|--------------------|
| `--color-bg` | `#0A0E1A` | Page background    |
| Surface      | `#111827` | Cards, panels      |
| Border       | `#1E2A3A` | Dividers, outlines |
| Primary CTA  | `#3B82F6` | Buttons, links     |
| Accent       | `#06B6D4` | Secondary accents  |
| Success      | `#10B981` | Positive signals   |
| Text primary | `#F9FAFB` |                    |
| Text muted   | `#9CA3AF` |                    |
| Text faint   | `#6B7280` |                    |

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
    globals.css            ← design tokens + keyframes
    layout.tsx             ← root layout: Navbar + Footer + metadata
    page.tsx               ← Home (8 sections)
    about/page.tsx
    book/page.tsx          ← Cal.com iframe
    portfolio/page.tsx     ← 3 case studies with #anchors
    services/page.tsx      ← 5 pricing tiers
  components/
    layout/Navbar.tsx
    layout/Footer.tsx
    sections/Hero.tsx
    sections/SocialProofBar.tsx
    sections/ServicesGrid.tsx
    sections/PortfolioPreview.tsx
    sections/AIShowcase.tsx
    sections/HowIWork.tsx
    sections/WhyJosh.tsx
    sections/FinalCTA.tsx
    ui/FadeIn.tsx          ← FadeIn, Stagger, StaggerItem
  lib/utils.ts             ← cn() helper
public/
  engler-logo.png          ← Engler Contracting ECC logo
  headshot.jpg             ← Josh headshot (needs solo crop)
```

---

## 5. Portfolio Projects

| ID               | Project           | Status                     | Tech                                  |
|------------------|-------------------|----------------------------|---------------------------------------|
| `#leah-renewals` | Leah Renewals     | Live · $20/mo subscriber   | React, Node.js, Firebase, Sheets API  |
| `#engler`        | Engler Contracting| Live at englercontracting.com | React, Next.js, Vercel             |
| `#cookbookpal`   | CookBookPal       | Available on GitHub        | React Native, Expo, Firebase, OpenAI  |

---

## 6. Pending Setup Tasks

### Cal.com (REQUIRED before launch)
1. Create account at `cal.com`
2. Create "Discovery Call" event (30 min, Google Meet)
3. Update iframe `src` in `src/app/book/page.tsx` with your username URL

### Deployment
```bash
git add . && git commit -m "Initial website build" && git push origin main
# Connect repo at vercel.com → auto-detects Next.js → deploy
```

### Assets
- Replace `/public/headshot.jpg` with solo cropped photo
- Update Footer LinkedIn URL (currently placeholder `https://linkedin.com`)

### Future features
- [ ] `src/app/not-found.tsx` — custom 404
- [ ] `src/app/sitemap.ts` + `robots.ts` — SEO
- [ ] Contact form with Resend
- [ ] Blog with MDX
- [ ] Vercel Analytics (enable in dashboard)
- [ ] Google Analytics 4
- [ ] HubSpot CRM free

---

## 7. Key Decisions

- Tailwind 4 = CSS-only config, no `tailwind.config.js`
- lucide v1.x removed brand icons → always use inline SVG
- Server Components by default, `'use client'` only for hooks
- `params` is a Promise in Next 16 — must `await params` in dynamic routes
- Framer Motion `ease` arrays need explicit tuple cast
- AIShowcase terminal is pure animation — no external AI APIs called
- Vercel Hobby free tier, Cal.com free tier

---

## 8. Brand Voice

- Direct, confident, zero fluff
- "I build X so you don't need a team"
- Solo advantage: speed, full ownership, long-term relationships
- Real numbers: $20/mo paying subscriber, deployed client sites
- Honest: "minimal briefing", "no commitment discovery call"
