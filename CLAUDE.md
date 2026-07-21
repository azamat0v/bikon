# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**bikon.uz** is a premium marketing and e-commerce landing site for Bikon, an Uzbek computer hardware manufacturer founded in 2015 in Tashkent. The site serves B2B, B2G, and B2C markets across Uzbekistan.

**Product Lines:**
- SMARTBOOK / WORKBOOK Series — Laptops (`/laptops`)
- MATRIX Series AiOs — entry/mid all-in-one desktops (`/aios`, with model pages at `/matrix` and `/optima`)
- NOVA — premium all-in-one desktop (`/nova`)
- PHANTOM Series — PC Cases (`/cases`)
- VISION PRO Series — Monitors (`/monitors`)

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript 5.8 |
| Build Tool | Vite 6.2 |
| Styling | Tailwind CSS 4.1 + custom theme |
| Animations | Motion (Framer Motion 12), GSAP 3.14 |
| Smooth Scrolling | Lenis 1.3 |
| Icons | Lucide React |
| Routing | Custom client-side (History API) |
| i18n | Custom translations (EN / RU / UZ) |

## Dev Commands

```bash
npm run dev       # Vite dev server at http://localhost:3000
npm run build     # Production build → /dist
npm run preview   # Preview production build
npm run lint      # TypeScript type-check (no emit)
npm run clean     # Remove /dist folder
```

No test suite exists (`npm run lint` is the only code-correctness check).

## Architecture

### Routing

Custom client-side router using `window.history.pushState`. Current pages:
- `/` — Home page (all sections)
- `/about` — About/company page
- `/monitors` — VISION PRO monitors product page
- `/laptops` — SMARTBOOK laptops product page
- `/aios` — MATRIX all-in-one desktops product page (comparison table)
- `/nova` — NOVA all-in-one product page (dark/black theme)
- `/matrix` — Bikon Matrix AiO product page (dark/black theme)
- `/optima` — Bikon Optima AiO product page (dark/black theme)
- `/cases` — PHANTOM Series PC cases product page (gaming theme, purple `#a855f7` accent)
- `/blog` — Blog listing + `/blog/:slug` article detail
- `/b2b` — B2B inquiry form (sends leads via Telegram bot)
- `/careers` — Careers application form with CV upload (sends via Telegram bot)
- `/how-to-buy` — Purchasing guide page
- `/service-center` — Service center page

The `Page` type in `RouterContext` is the union of all path strings. Always use `Page` (not bare `string`) when navigating — `ProductSection.learnMoreHref` accepts `Page | undefined` for this reason.

The router also exposes `blogSlug: string | null` for `/blog/:slug` deep links — the `/blog` page reads this to auto-open a specific article.

```tsx
const { page, blogSlug, navigate } = useRouter();
navigate('/monitors'); // typed — only valid Page values accepted
navigate('/blog/my-article-slug'); // sets page='/blog', blogSlug='my-article-slug'
```

### Provider Order

`LenisContext` is **not** top-level. It is instantiated inside `HomePage` only, so sub-pages manage their own scroll setup independently.

```
LanguageProvider
  └── RouterProvider
        └── ShopModalProvider   ← wraps AppContent; renders the "Buy Now" modal
              └── AppContent (switches on `page`)
                    ├── HomePage → creates Lenis → LenisContext.Provider
                    ├── AboutPage (no Lenis, uses GSAP ScrollTrigger)
                    ├── MonitorsPage / LaptopsPage / AiosPage (no Lenis)
                    ├── NovaPage / MatrixPage / OptimaPage / CasesPage (no Lenis, dark/black bg)
                    ├── BlogPage (no Lenis, fetches from Strapi)
                    └── B2BPage / CareersPage / HowToBuyPage / ServiceCenterPage (static)
```

### ShopModal

`ShopModalContext` exposes `useShopModal()` → `{ open(product?: string) }`. Calling `open()` raises a multi-step modal (call → Telegram form → success/error). The modal submits leads to a Telegram bot using `VITE_TG_TOKEN` / `VITE_TG_CHAT` env vars. The same two env vars are read independently in `CTASection.tsx`, `B2BPage.tsx`, and `CareersPage.tsx` (each redeclares its own `TG_TOKEN`/`TG_CHAT` constants rather than sharing a module).

### Internationalization

Three languages: `en`, `ru`, `uz`. Language detection order:
1. `localStorage`
2. URL path prefix (`/ru`, `/uz`)
3. Defaults to `en`

```tsx
const { tr, lang, setLang } = useLang();
// tr.nav.home, tr.hero.headline, etc.
```

All strings live in [src/i18n/translations.ts](src/i18n/translations.ts). Add every new string under all three language keys. Product-page translations live on the top-level `tr` object under their product key (e.g. `tr.monitors`, `tr.matrix`, `tr.optima`). Because these keys are not in the base `Translations` type, pages access them with a cast: `(tr as unknown as { matrix: MatrixTr }).matrix`.

### Path Alias

`@` resolves to the project root (configured in `vite.config.ts` and `tsconfig.json`).

## Key Components

| Component | Purpose |
|---|---|
| `SplitHeading` | Reusable line-by-line slide-up animation; splits on `\n`, accepts `delay` prop |
| `SpecsSection` | Reusable two-column spec comparison table with blueprint dark background |
| `ProductSection` | Reusable split-layout product showcase — used 4× on the home page |
| `CTASection` | "Build Your PC" lead-capture form on the home page; submits to Telegram bot |
| `AboutPage` | Company page with GSAP `ScrollTrigger` animations |
| `MonitorsPage` | VISION PRO monitors product page; uses `SplitHeading` + `SpecsSection` |
| `LaptopsPage` | SMARTBOOK laptops product page; uses `SplitHeading` + `SpecsSection`; canvas scroll sequence from `/public/laptops/` |
| `AiosPage` | MATRIX all-in-one desktops product page; includes inline comparison table |
| `NovaPage` | NOVA all-in-one product page; dark/black theme, uses `SplitHeading` + `SpecsSection` + `FloatingPathsBackground` |
| `MatrixPage` | Bikon Matrix AiO product page; dark/black theme, uses `SpecsSection` + `FloatingPathsBackground` |
| `OptimaPage` | Bikon Optima AiO product page; dark/black theme, mirrors `MatrixPage` structure |
| `CasesPage` | PHANTOM Series cases page; gaming theme, video hero + 3 model cards (image↔video on hover) + ports grid + `SpecsSection` |
| `BlogPage` | Blog listing + article detail; fetches from Strapi, renders Strapi v5 rich-text blocks |
| `B2BPage` | B2B wholesale inquiry form; submits lead to Telegram bot |
| `CareersPage` | Job application form with CV file upload; submits to Telegram bot via multipart |
| `HowToBuyPage` | Static purchasing guide |
| `ServiceCenterPage` | Static service center info page |
| `FloatingPathsBackground` | SVG animated paths background used in dark-theme pages (`src/components/ui/floating-paths.tsx`) |

## Animation Patterns

- **Entry animations**: `motion.div` from `motion/react` with `initial`/`animate`/`whileInView`
- **Line-by-line headings**: `SplitHeading` component (wraps each `\n`-delimited line in a masked `motion.span`)
- **Scroll-driven (GSAP)**: `ScrollTrigger` — see `AboutPage.tsx`
- **Canvas sequence**: `LaptopsPage.tsx` — JPEG frames from `/public/laptops/`
- **3D tilt**: Mouse-tracked perspective transforms — see `Hero.tsx`

## Styling Conventions

- **Tailwind CSS 4** — no `tailwind.config` file; uses `@tailwindcss/vite` plugin
- **Apple-inspired design** — `#FBFBFD` bg, `#1D1D1F` text, `#0066CC` accent
- **Custom fonts**: Outfit (primary), Space Grotesk (mono), Caveat (decorative)
- **Custom utilities** (in `src/index.css`):
  - `.glass-nav` — frosted glass navbar
  - `.apple-button-primary` / `.apple-button-secondary` — CTA button styles
  - `.bikon-gradient` — animated gradient text
  - `.accent-label` — badge/tag style
  - `.animate-float` — continuous floating animation

## Adding a New Page

1. Add the path literal to the `Page` union in [src/context/RouterContext.tsx](src/context/RouterContext.tsx)
2. Add a `getPage()` case for the new path
3. Add a render branch in [src/App.tsx](src/App.tsx) `AppContent`
4. Add nav links using `navigate()` from `useRouter()`

For deep-link sub-paths (like `/blog/:slug`), use `path.startsWith('/blog')` in `getPage()` and parse the extra segment in a `get*Slug()` helper, exposing it via `RouterContextType`.

All lazy-loaded sub-pages use a black `minHeight: 100vh` fallback during `<Suspense>` loading.

## CMS Integration (Strapi)

Home page products, all seven product pages, the About page, and the blog are all powered by Strapi v5. The client lives in [src/lib/strapi.ts](src/lib/strapi.ts); in every case CMS data takes priority and missing/failed CMS data falls back to hard-coded translations silently (`.catch()` resolves to `null`/`[]`).

- **Home products**: `getProducts(locale)` — fetches `site-products` collection; `category_id` matches `BASE_PRODUCTS` ids (`noutbuklar`, `monobloklar`, `cases`, `monitorlar`).
- **Product pages**: `useProductPageCms(slug)` (from [src/lib/useProductPageCms.ts](src/lib/useProductPageCms.ts)) fetches the `product-pages` collection by `slug` (`monitors` | `laptops` | `aios` | `nova` | `matrix` | `optima` | `cases`) and returns hero copy, `models` (lineup cards with image/video), and `spec_categories`. Used by `MonitorsPage`, `LaptopsPage`, `AiosPage`, `NovaPage`, `MatrixPage`, `OptimaPage`, `CasesPage`. Pair with `cmsToSpecCategories(cms)` to convert `spec_categories` into the `SpecsSection` `categories` prop shape.
- **About page**: `useAboutPageCms()` fetches the singleton `about-page` endpoint (hero, story, stats, values, milestones, founder info).
- **Blog articles**: `getArticles(locale)` / `getArticleBySlug(slug, locale)` — fetches `articles` collection with `cover` populated. Content is Strapi v5 rich-text (`BlockNode[]`), rendered in `BlogPage`.
- **Media URLs**: always pass through `mediaUrl(url)` — prepends `VITE_STRAPI_URL` for relative paths.

## Environment Variables

Copy `.env.example` to `.env` in the project root and fill in:

```
GEMINI_API_KEY=    # Google Gemini AI API key (defined via Vite; not yet used in source)
APP_URL=           # Deployed app URL (e.g. https://bikon.uz)
VITE_STRAPI_URL=   # Strapi v5 base URL (defaults to http://localhost:1337)
VITE_TG_TOKEN=     # Telegram bot token — used by ShopModal, CTASection, B2BPage, CareersPage
VITE_TG_CHAT=      # Telegram chat/channel id leads are sent to
```

## Public Assets

```
public/
├── bikon.svg              # Favicon/logo
├── Bikon.pdf              # 2026 product catalog (downloadable)
├── laptop.png / monitor.png / monoblock.png / pc.png  # Home page product images
├── buildpc.png            # "Build your PC" section image
├── sequence/              # 210 JPEG frames (currently unused in source)
├── aio/                   # AiO product images for AiosPage
├── about/                 # Founder photo and partner logos for AboutPage
├── monitors/              # Monitor product images for MonitorsPage
├── laptops/               # Laptop product images + canvas frames for LaptopsPage
├── nova/                  # NOVA product images for NovaPage
├── matrix/                # MATRIX product images for MatrixPage
├── optima/                # OPTIMA product images for OptimaPage
├── cases/                 # PC case product images
├── icons/                 # Misc icon assets (port icons, OS logos, etc.)
└── categories/            # 4 category card images
```

## Utilities

- `src/lib/utils.ts` exports a single `cn(...inputs: ClassValue[])` helper (clsx + tailwind-merge) for conditional className merging. Use it anywhere you'd otherwise write `clsx(...)` or need Tailwind class deduplication.
- `src/lib/useSeo.ts` exports `useSeo({ title, description, url?, image?, type? })` — imperatively sets `document.title` and `og:*`/`canonical` meta tags on mount, restoring site defaults on unmount. Called by every product/content page (`MonitorsPage`, `LaptopsPage`, `BlogPage`, etc.) for per-page metadata.

## Behavioral Notes

- **PageLoader is session-gated** — it shows once per browser session via `sessionStorage` key `bikon_intro_shown`. On return visits within the same session it is skipped entirely and `onDone()` fires immediately. Clear `sessionStorage` to test the loader again.
- **`BASE_PRODUCTS` wires detail pages via `learnMoreHref`** — `noutbuklar` (`/laptops`) and `monitorlar` (`/monitors`) are set; `monobloklar` and `cases` leave it `undefined` so their "Learn More" button is intentionally inert. `MatrixPage`, `OptimaPage`, and `NovaPage` are separate product pages not tied to `BASE_PRODUCTS` entries.
- **External shop URL** — `ProductSection` always links "Buy Now" to `https://shop.bikon.uz` (hardcoded). It is not driven by translations or CMS.

## Backend (Strapi)

`backend/` is a full **Strapi v5** project. The `express` dependency in the root `package.json` is unused. Run Strapi separately (inside `backend/`) with its own `npm run develop`. The root Vite dev server and the Strapi backend are two independent processes; `VITE_STRAPI_URL` tells the frontend where to reach it.

## Notes

- HMR can be disabled via `DISABLE_HMR=true` env var (for Google AI Studio compatibility)
- Credits footer: "Developed by Avzo.uz"
