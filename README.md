# KibeWall

Anime wallpaper browsing and downloading gallery. Pulls high-quality wallpapers from the [Wallhaven.cc API](https://wallhaven.cc) with a modern, responsive UI.

## Features

- **Browse & Search** — Filter by category (Anime/General/People), sort by popularity, date, views, favorites
- **Wallpaper Detail** — Full metadata, color palette, tags, download links, social share
- **Dark/Light Mode** — System-aware theming via next-themes
- **Responsive** — Mobile-first layout with sheet-based filters
- **SEO Optimized** — Per-page metadata, Open Graph, Twitter Cards, JSON-LD structured data, sitemap, robots.txt
- **ISR Caching** — 1-hour page revalidation with on-demand purge endpoint

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| UI | React 19, shadcn/ui, Radix UI |
| Styling | Tailwind CSS v3, CSS variables |
| Animations | Framer Motion |
| Icons | Lucide React |
| Forms | react-hook-form + Zod |
| API | Wallhaven.cc API v1 |

## Getting Started

```bash
# Install dependencies
npm install --legacy-peer-deps

# Set up environment
cp .env.example .env.local
# Edit .env.local and add your Wallhaven API key

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|----------|-------------|
| `WALLHAVEN_API_KEY` | Wallhaven.cc API key (get yours at [wallhaven.cc/settings/account](https://wallhaven.cc/settings/account)) |

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── top-wallpapers/route.ts   # Hero background proxy
│   │   └── revalidate/route.ts       # On-demand ISR purge
│   ├── explore/page.tsx              # Browse/search page
│   ├── wallpaper/[id]/page.tsx       # Detail page
│   ├── categories/page.tsx           # Category cards
│   ├── robots.ts                     # robots.txt
│   ├── sitemap.ts                    # sitemap.xml
│   └── layout.tsx                    # Root layout + metadata
├── components/
│   ├── animated-wallpaper-card.tsx   # Grid card with hover effects
│   ├── hero-section.tsx              # Rotating background hero
│   ├── wallpaper-grid.tsx            # Server-rendered grid
│   ├── search-filters.tsx            # Filter form
│   ├── pagination.tsx                # Page navigation
│   └── ui/                           # shadcn/ui components
├── lib/
│   ├── api.ts                        # Wallhaven API client (cached)
│   ├── types.ts                      # TypeScript interfaces
│   └── utils.ts                      # cn() utility
└── public/                           # Static assets + favicons
```
