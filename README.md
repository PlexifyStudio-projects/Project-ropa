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
