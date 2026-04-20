# Stelar — Atelier Couture

Editorial website for Stelar, a haute-couture atelier based in Bucaramanga, Colombia.
Built with React 19 · Vite · GSAP · SCSS.

**Live demo:** https://PlexifyStudio-projects.github.io/Project-ropa/

## Sections
- **Hero** — Editorial magazine cover with 3D gallery, parallax, and animated marquee.
- **Collections** — Pinned scroll crossfade between three collections (Spring · Couture · Essential).
- **Atelier** — Horizontal pinned scroll through five acts (Sketch · Threads · Cut · Stitch · Soul).
- **Muses** — Four archetype portraits with clip-path reveals and parallax.
- **Archive** — Bento editorial grid (14 interactive tiles: piece, palette, stats, quote, press, tour, newsletter, Instagram, lookbook).
- **Contact** — Editorial form with subject selector, showrooms, FAQ.
- **Footer** — Giant italic marquee, brand, newsletter, nav columns, social, legal.

## Development

```bash
npm install
npm run dev
```

Opens the dev server at http://localhost:5173/.

## Production build

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

```bash
npm run deploy
```

Runs `vite build` then pushes the `dist/` folder to the `gh-pages` branch via `gh-pages` npm package.

## Configuration

- **Base path** is `/Project-ropa/` — defined in `vite.config.js` and must match the repo name.
- **Images** use Unsplash URLs; swap inside each component for local assets if preferred.

## Stack
- React 19 · Vite 8 · SCSS modules
- GSAP 3.14 with ScrollTrigger (pinned scroll, horizontal scroll, container animations, scrub)
- @gsap/react for React hooks integration

## SEO

The site ships with a production-grade SEO foundation. All signals live in three files:

- `index.html` — `<html lang="en">`, title (~60 chars), meta description (~155 chars), keywords, author, robots, theme-color, canonical, Open Graph (og:type, og:title, og:description, og:image, og:url, og:site_name, og:locale=en_US, image dimensions + alt), Twitter Card (summary_large_image), DNS-prefetch + preconnect for Google Fonts, and two JSON-LD blocks: **Organization** (founder: Isabel Stelar, address in Bucaramanga CO, contactPoint, sameAs Instagram) and **WebSite** with SearchAction.
- `public/robots.txt` — allows all crawlers and points at the sitemap.
- `public/sitemap.xml` — lists the canonical root plus the six hash-anchored sections (`#inicio`, `#colecciones`, `#atelier`, `#musas`, `#archivo`, `#contacto`).

### Manual actions required

1. **Drop `og-image.jpg` at `public/og-image.jpg`** (1200×630, JPG or PNG renamed to `.jpg`). Vite will copy it to `/Project-ropa/og-image.jpg` on build — the path already referenced by `<meta property="og:image">`, Twitter, and the JSON-LD Organization `image`.
2. **Change domain** if you move off GitHub Pages: update the canonical URL, og:url, twitter:url, JSON-LD `url` fields in `index.html`, the `Sitemap:` line in `public/robots.txt`, and every `<loc>` in `public/sitemap.xml`.
3. **Replace the Instagram placeholder** in the Organization JSON-LD `sameAs` array (`https://www.instagram.com/stelar.atelier`) with the real handle, and add any additional profiles (Pinterest, Vogue, press).
4. **Submit** `https://PlexifyStudio-projects.github.io/Project-ropa/sitemap.xml` to Google Search Console and Bing Webmaster Tools after deploy.
