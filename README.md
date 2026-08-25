# Triova Infradesigns — Next.js site

A rebuild of the original static `triova-website v2/` site as a Next.js 16 App Router
project. Same brand, same business data, same images — restructured around a typed
content layer, accessible React components and per-route SEO metadata.

---

## Running it locally

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with Turbopack |
| `npm run build` | Production build (runs the TypeScript check) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

Copy `.env.example` to `.env.local` before deploying. The only variable the site needs
today is `NEXT_PUBLIC_SITE_URL`; the rest become relevant once you connect an email
provider (see **TODO** below).

---

## Folder structure

```
src/
  app/
    layout.tsx                  Root layout: Outfit font, header, footer, floating CTAs, LocalBusiness JSON-LD
    page.tsx                    /
    about/page.tsx              /about
    services/page.tsx           /services
    services/[slug]/page.tsx    /services/interior-designing | construction | home-renovation | raw-materials
    portfolio/page.tsx          /portfolio
    contact/page.tsx            /contact
    api/contact/route.ts        POST endpoint for both enquiry forms
    not-found.tsx               404 (noindex)
    sitemap.ts robots.ts        Generated /sitemap.xml and /robots.txt
    icon.png apple-icon.png favicon.ico   Generated from the logo
    globals.css                 ALL design tokens live here

  components/
    ui/          Button, Card, Container, Section, SectionTitle, Tag, Field, Icon, Accordion, Lightbox, Reveal
    layout/      Header, MobileNav, Logo, Footer, BackToTop, WhatsAppFloat, MobileCallBar
    sections/    One component per page section (Hero, TrustBar, AboutSection, ServicesGrid, …)
    seo/         JsonLd.tsx — LocalBusiness, Service, FAQPage, BreadcrumbList

  data/          ← EDIT CONTENT HERE
  hooks/         useScrollDirection, useFocusTrap, useLockBodyScroll, useCountUp
  lib/           utils (cn), motion variants, zod schemas, SEO metadata builder
  types/         Shared TypeScript interfaces

public/images/   Optimised WebP assets
```

The four service pages are driven by a single `[slug]` route rather than four
near-identical page files — add a service by adding an object to `src/data/services.ts`
and it gets a route, a nav entry, a footer link, a card and JSON-LD automatically.

---

## Where to edit content

Nothing in `src/components` or `src/app` hard-codes copy, a phone number or an image
path. Everything lives in `src/data/`:

| File | Controls |
|---|---|
| `site.ts` | **Phone numbers, email, address, hours, domain, nav links, service names.** The single source of truth — change a number here and it updates the header, footer, contact page, call bar, WhatsApp link and JSON-LD. |
| `services.ts` | All four service pages: hero, intro, "what we do" block, sub-services, process steps, FAQs, featured project ids, and the page's `<title>` / meta description. |
| `projects.ts` | Portfolio items — title, category, caption, image + alt text. Categories come from `projectCategories`. |
| `testimonials.ts` | The testimonial carousel. |
| `faqs.ts` | The FAQ accordion shown on `/`, `/services` and `/contact`. Service-page FAQs live in `services.ts`. |
| `process.ts` | The four-step home-page timeline. |
| `stats.ts` | The trust bar (20+ / 250+ / 100% / Turnkey). |
| `whyChoose.ts` | The six "Why Choose Triova" points. |

Icons are referenced **by name** (`icon: "hammer"`), not imported as components, so
data files stay plain objects. The allowed names are the keys of `ICON_REGISTRY` in
`src/components/ui/Icon.tsx` — add a lucide import there to make a new one available;
TypeScript will reject any name that isn't registered.

### Design tokens

All colour, radius, shadow and spacing values are Tailwind v4 `@theme` tokens defined in
`src/app/globals.css`. There are no hard-coded hex values anywhere in `src/components`.

| Token | Value | Notes |
|---|---|---|
| `--color-navy` | `#0B1F3A` | Header, dark sections, button text on gold |
| `--color-navy-bright` | `#0B3B7A` | Browser theme colour |
| `--color-gold` | `#D4AF37` | Accent — backgrounds, icons, large display text |
| `--color-gold-deep` / `--color-gold-soft` | `#C9A227` / `#C8A35F` | Hover and secondary golds |
| `--color-gold-text` | `#8A6D1A` | **See the accessibility note below** |
| `--color-ink` | `#111111` | Body text, footer |
| `--color-surface` | `#F8F9FB` | Alternating section background |

---

## ⚠️ Invented placeholder copy — review before launch

The original `construction.html`, `home-renovation.html` and `raw-materials.html` were
**0-byte files**. Everything on those three pages was written from scratch as plausible
industry copy. It is *not* sourced from the business and should be reviewed line by line.

All of it lives in `src/data/services.ts`. Specifically invented:

**`construction`** — everything except the service name:
- Heading, intro paragraph, `showcaseHeading` / `showcaseBody`
- All 10 `highlights` (Independent Houses & Villas, RCC & Masonry Work, …)
- All 6 `subServices` titles and descriptions
- All 8 `process` step descriptions
- All 6 FAQ answers — **note especially** the answers about approvals ("Statutory fees
  are paid by the owner"), estimates and change orders, which describe commercial terms
  Triova may not actually operate on.

**`home-renovation`** — everything except the service name and the one-line summary
(`"Transform existing spaces into modern masterpieces."`, which came from the original
home page). Invented: heading, intro, showcase copy, all 10 highlights, all 6
sub-services, all 8 process steps, all 6 FAQ answers — including claims about dust
barriers, phased occupancy and how mid-project discoveries are quoted.

**`raw-materials`** — everything except the service name and the summary line
(`"High-quality WPC and PVC boards, door frames and premium interior materials."`, from
the original home page). Invented: heading, intro, showcase copy, all 10 highlights, all
6 sub-services, all 8 process steps, all 6 FAQ answers — including the WPC-vs-plywood
technical comparison, minimum order quantities, delivery charging and the damage /
warranty policy.

**Also invented elsewhere:**
- `src/data/faqs.ts` — all 5 home-page FAQ questions and answers.
- `src/app/about/page.tsx` — the `PageHero` heading *"A Single Team, From First Drawing
  to Final Handover"* and its description.
- `src/app/services/page.tsx`, `/portfolio`, `/contact` — `PageHero` headings and
  descriptions, and all `CtaBanner` headings/descriptions.
- `src/data/services.ts` → `metaTitle` / `metaDescription` for all four services.
- `src/data/projects.ts` — project **titles and captions**. The original site labelled
  these images generically ("Luxury Living Room", "Hyderabad • Residential"); the
  square-footage and category labels are illustrative, not records of real jobs.
- `site.ts` → `foundingYear: 2019` and `geo` (Hyderabad city-centre coordinates).
  Both feed the LocalBusiness structured data — **correct these before launch**, since
  wrong coordinates hurt local search rather than help it.

**Not invented, carried over verbatim:** the home-page hero, About and Why-Choose copy,
the four home process steps, all three testimonials (names, quotes and roles), the entire
interior-design page including its 5 FAQs, and every stat (20+ / 250+ / 100% / Turnkey).

No awards, certifications, client logos, press mentions or review counts were added
anywhere, and none appear in the structured data.

---

## ⚠️ Image assets that need replacing

Auditing the original images turned up four problems. Three assets were **removed from
the site** because they carry other companies' branding; they are untouched in the
original `triova-website v2/images/` folder.

| Asset | Problem | What was done |
|---|---|---|
| `interior-hero.jpg` | Visible **"AD" (Architectural Digest) watermark** — licensed editorial photography | Removed. The interior-design page hero now uses `home-interior.webp`. |
| `material-supply.jpg` | A finished **marketing poster for "DENWUD"**, with that brand's logo, `www.denwud.com`, `@denwud.hyd` and `Denwud.hyd@gmail.com` baked into the image | Removed. The material-supply page now uses `wardrobe.webp`. Supply your own product photography — text baked into an image is also invisible to search engines and screen readers. |
| `project4.jpg` | Visible **"LANDMARKS" watermark** (third party) | Removed, along with the portfolio entry that used it. The gallery now has 12 projects instead of 13. |
| `architecture.jpg` | **Still in use, still wrong.** It is a European medieval old town (half-timbered houses on a cobbled lane), not Hyderabad construction. It fills the entire `/services/construction` hero. | Kept, because it is what the original site used for Construction and there is no replacement in the asset set. **Replace this first.** |
| `renovation.jpg` | Referenced 3× by the original `index.html` but **the file never existed** — those cards were broken | The renovation entries now point at real assets. |
| `apple-touch-icon.png` | Referenced by the original but missing | Generated from the logo as `src/app/apple-icon.png`. |
| `og-image.jpg` | The original meta pointed at `og-image.png`, which didn't exist either; the file on disk was square | Regenerated at the correct 1200×630 with the full wordmark visible. |

The logo mark is navy-on-transparent, so it was invisible against the navy header and
near-black footer on the original site. `src/components/layout/Logo.tsx` now sets it on a
white plate beside a TRIOVA / INFRADESIGNS wordmark.

### Image optimisation

All images were resized to realistic display dimensions and converted to WebP
(PNG retained for the logo, JPEG for the OG image, since some scrapers reject WebP).

**9.14 MB → 944 KB across the images actually used — 90% smaller.**

| Source | Output | Pixels | Before | After |
|---|---|---|---|---|
| `architecture.jpg` | `architecture.webp` | 3883×5824 → 1400×2100 | 4.29 MB | 385 KB |
| `logo.png` | `logo.png` | 1024² → 512² | 1.25 MB | 21 KB |
| `favicon.png` | → `icon.png` + `favicon.ico` + `apple-icon.png` | 1024² → 512/48/180 | 1.33 MB | 108 KB total |
| `interior-hero.jpg` | *removed (AD watermark)* | — | 1.06 MB | — |
| `material-supply.jpg` | *removed (DENWUD poster)* | — | 207 KB | — |
| `wardrobe.jpg` | `wardrobe.webp` | 1440×960 → 1200×800 | 250 KB | 67 KB |
| `og-image.jpg` | `og-image.jpg` | 1254² → 1200×630 | 68 KB | 22 KB |
| `ceiling.jpg` | `ceiling.webp` | 600×500 | 127 KB | 57 KB |
| everything else | `.webp` | unchanged (already small) | — | 20–90 KB each |

Compression used a throwaway `npx` install of `sharp` — nothing was added to
`package.json`. Several source images are genuinely low-resolution (`project2.jpg` is
330×270, `hero-luxury.jpg` is 1024×572) and were **not** upscaled, so they will look soft
on large displays. Higher-resolution originals would help most on the home hero.

---

## Accessibility notes

Two deliberate deviations from the original palette, both required for WCAG AA:

1. **Gold text on white fails badly.** `#D4AF37` on white is **1.9:1** — the original
   site used it for links, "Explore Service →" labels and stat numbers. Those now use
   `--color-gold-text` (`#8A6D1A`, **4.9:1**). Gold on navy or on `#111` is 8.5:1 and
   9.7:1, so the accent is unchanged in the header, footer and dark sections.
2. **Gold buttons had white labels** (2.0:1). They now use navy labels (**8.5:1**). The
   button still reads as gold; only the text colour moved.

Also: the WhatsApp brand green `#25D366` gives 1.8:1 with white text, so the button uses
a darkened `#0F7A40` (**5.4:1**).

Other work: semantic landmarks with a skip link; one `<h1>` per page; visible 3px focus
rings on every interactive element; the mobile drawer and lightbox are real
`role="dialog" aria-modal="true"` overlays with focus trapping, Escape-to-close, body
scroll lock and focus restoration; the FAQ accordion is a proper disclosure
(`aria-expanded` + `aria-controls` + labelled region); filter buttons expose
`aria-pressed` and announce results through a live region; every image has descriptive
alt text written against the actual photograph, and purely decorative hero backgrounds
use `alt=""`. All motion respects `prefers-reduced-motion`.

**Not audited:** no screen-reader testing was done, and contrast was checked by script
plus manual calculation rather than with an audit tool.

---

## TODO before launch

1. **Connect an email provider.** `src/app/api/contact/route.ts` validates and accepts
   enquiries but **sends nothing** — it writes the payload to stdout and returns `200`.
   Both a Resend and a Nodemailer/SMTP stub are commented in the file; uncomment one,
   fill in `.env.local`, delete the placeholder log line, and wrap the send in try/catch
   returning `502` so the form's error state actually fires. Until then the form shows a
   success message for an enquiry nobody receives.
2. **Replace `architecture.jpg`** — see the asset table above.
3. **Fix `site.geo`** with the real business coordinates, and `site.foundingYear`.
4. **Confirm the address.** The structured data only carries "Hyderabad, Telangana"
   because that is all the original site published. A full street address in
   `site.address` would meaningfully improve local search.
5. **Review every invented line** listed above with the business.
6. Set `NEXT_PUBLIC_SITE_URL` in the deployment environment.
7. Consider rate-limiting `/api/contact`. It has a honeypot field but no throttling.
8. The Google Map is an unauthenticated `maps.google.com` embed (lazy-loaded on scroll).
   Swap in a Maps Embed API key and a place ID once the business location is confirmed.

---

## Dependencies

Beyond the Next.js scaffold: `framer-motion`, `lucide-react`, `react-hook-form`, `zod`,
`embla-carousel-react`, and **`@hookform/resolvers`** — the last of these was not on the
approved list. It is the one-line official bridge between react-hook-form and zod; there
is no practical way to use those two together without it. Carousel autoplay is a
`setInterval` in `TestimonialCarousel.tsx` rather than `embla-carousel-autoplay`,
specifically to avoid adding another unapproved package.
