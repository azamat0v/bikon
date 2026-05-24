# bikon.uz — Premium Technology

Official marketing and product showcase website for **Bikon**, an Uzbek computer hardware manufacturer founded in 2015 in Tashkent.

## Product Lines

| Series | Type |
|---|---|
| SMARTBOOK | Laptops |
| MATRIX | All-in-One Desktops |
| VISION PRO | Monitors |
| PHANTOM | PC Cases |

## Tech Stack

| | |
|---|---|
| Framework | React 19 + TypeScript 5.8 |
| Build | Vite 6.2 |
| Styling | Tailwind CSS 4.1 |
| Animation | Motion (Framer Motion 12), GSAP 3.14 |
| Scroll | Lenis 1.3 |
| Icons | Lucide React |
| Routing | Custom (History API) |
| i18n | Custom — EN / RU / UZ |
| CMS | Strapi v5 |
| AI | Google Gemini API |

## Getting Started

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Fill in GEMINI_API_KEY and VITE_STRAPI_URL

# Start dev server (http://localhost:3000)
npm run dev
```

## Environment Variables

```env
GEMINI_API_KEY=        # Google Gemini API key
VITE_STRAPI_URL=       # Strapi v5 base URL (default: http://localhost:1337)
APP_URL=               # Deployed app URL (e.g. https://bikon.uz)
```

## Commands

```bash
npm run dev       # Dev server
npm run build     # Production build → /dist
npm run preview   # Preview production build
npm run lint      # TypeScript type-check
```

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, product catalog, CTA |
| `/about` | Company info, history, revenue, team |
| `/laptops` | SMARTBOOK series |
| `/monitors` | VISION PRO series |
| `/aios` | MATRIX All-in-One series |
| `/cases` | PHANTOM PC cases |
| `/nova` | NOVA product page |
| `/matrix` | MATRIX desktop page |
| `/optima` | OPTIMA product page |
| `/blog` | Blog listing + article detail (Strapi) |
| `/b2b` | B2B wholesale inquiry |
| `/careers` | Job application with CV upload |
| `/how-to-buy` | Purchasing guide |
| `/service-center` | Service center info |

## Project Structure

```
src/
├── components/     # Page and UI components
├── context/        # Router, Language, ShopModal providers
├── i18n/           # EN / RU / UZ translations
├── lib/            # Strapi client, utils
public/
├── cases/          # PHANTOM case assets
├── laptops/        # SMARTBOOK assets
├── monitors/       # VISION PRO assets
├── matrix/         # MATRIX assets
├── nova/           # NOVA assets
├── icons/          # Marketplace logos, UI icons
└── sequence/       # 210 frames for scroll animation
backend/            # Strapi v5 CMS (run separately)
```

## i18n

Three languages supported: English, Russian, Uzbek.  
All strings live in `src/i18n/translations.ts`.

Language is detected from `localStorage` → URL prefix → defaults to `en`.

---

Developed by [Avzo.uz](https://avzo.uz)
