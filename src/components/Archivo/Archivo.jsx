import { useRef, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Placeholders vía picsum (seed estables). Reemplaza con Unsplash/Pexels/propias.
const ARCHIVO_IMG = {
  featured: 'https://picsum.photos/seed/stelar-archivo-pieza-001-v2/1200/1400',
  tall:     'https://picsum.photos/seed/stelar-archivo-silueta-08/900/1400',
  detail:   'https://picsum.photos/seed/stelar-archivo-detalle-seda/900/900',
  runway:   'https://picsum.photos/seed/stelar-archivo-pasarela/1400/900',
  tour:     'https://picsum.photos/seed/stelar-archivo-tour-atelier/1400/800',
  // Instagram mini grid
  ig1: 'https://picsum.photos/seed/stelar-ig-01/400/400',
  ig2: 'https://picsum.photos/seed/stelar-ig-02/400/400',
  ig3: 'https://picsum.photos/seed/stelar-ig-03/400/400',
  ig4: 'https://picsum.photos/seed/stelar-ig-04/400/400',
};

const PALETTE_SS26 = [
  { color: '#2E2220', name: 'Noche',  hex: '2E2220' },
  { color: '#C4977B', name: 'Ocre',   hex: 'C4977B' },
  { color: '#E4B8B0', name: 'Rosa',   hex: 'E4B8B0' },
  { color: '#C5CEBF', name: 'Salvia', hex: 'C5CEBF' },
  { color: '#E6D5CB', name: 'Arena',  hex: 'E6D5CB' },
  { color: '#FBF6F2', name: 'Marfil', hex: 'FBF6F2' },
];

const splitLetters = (text) =>
  text.split('').map((char, i) => (
    <span key={i} className="arch-letter">
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

function Archivo() {
  const ref = useRef(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useGSAP(
    () => {
      const scope = ref.current;

      // ── Header reveals ──
      gsap.fromTo(
        '.arch-header__label, .arch-header__tag',
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.arch-header', start: 'top 82%' },
        }
      );

      gsap.fromTo(
        '.arch-header__heading .arch-letter',
        { yPercent: 110, rotate: 6 },
        {
          yPercent: 0, rotate: 0, duration: 1.1, stagger: 0.035,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.arch-header', start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.arch-header__lead, .arch-header__index-item',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.arch-header', start: 'top 78%' },
        }
      );

      // ── Tile stagger reveal ──
      gsap.utils.toArray('.bento', scope).forEach((tile, i) => {
        gsap.fromTo(
          tile,
          { y: 60, opacity: 0, scale: 0.96 },
          {
            y: 0, opacity: 1, scale: 1, duration: 1,
            ease: 'power3.out',
            delay: (i % 4) * 0.06,
            scrollTrigger: { trigger: tile, start: 'top 90%' },
          }
        );
      });

      // Number count-ups
      gsap.utils.toArray('.bento__stat-num[data-count]', scope).forEach((el) => {
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' },
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toLocaleString('es') + suffix;
          },
        });
      });

      // Palette swatches pop-in
      gsap.utils.toArray('.bento--palette', scope).forEach((tile) => {
        gsap.fromTo(
          tile.querySelectorAll('.bento__palette-swatch'),
          { scale: 0, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: 0.55, stagger: 0.06,
            ease: 'back.out(1.8)',
            scrollTrigger: { trigger: tile, start: 'top 85%' },
          }
        );
      });

      // IG mini grid pop-in
      gsap.utils.toArray('.bento--ig').forEach((tile) => {
        gsap.fromTo(
          tile.querySelectorAll('.bento__ig-cell'),
          { scale: 0.6, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: 0.6, stagger: 0.08,
            ease: 'back.out(1.6)',
            scrollTrigger: { trigger: tile, start: 'top 88%' },
          }
        );
      });

      // Image parallax
      gsap.utils.toArray('.bento--image .bento__img').forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.12, yPercent: -4 },
          {
            scale: 1, yPercent: 4, ease: 'none',
            scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );
      });

      // Outro
      gsap.fromTo(
        '.arch-outro__letter',
        { yPercent: 110 },
        {
          yPercent: 0, duration: 1, stagger: 0.025, ease: 'expo.out',
          scrollTrigger: { trigger: '.arch-outro', start: 'top 82%' },
        }
      );
    },
    { scope: ref }
  );

  // 3D tilt + shine on hover
  const handleTilt = useCallback((e) => {
    const tile = e.currentTarget;
    const rect = tile.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(tile, { rotateY: x * 6, rotateX: -y * 5, duration: 0.5, ease: 'power2.out' });
    const shine = tile.querySelector('.bento__shine');
    if (shine) {
      gsap.to(shine, {
        background: `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.2) 0%, transparent 55%)`,
        opacity: 1,
        duration: 0.3,
      });
    }
  }, []);

  const handleTiltLeave = useCallback((e) => {
    const tile = e.currentTarget;
    gsap.to(tile, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' });
    const shine = tile.querySelector('.bento__shine');
    if (shine) gsap.to(shine, { opacity: 0, duration: 0.4 });
  }, []);

  const tiltProps = {
    onMouseMove: handleTilt,
    onMouseLeave: handleTiltLeave,
    style: { transformStyle: 'preserve-3d', perspective: '1000px' },
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 4000);
    setEmail('');
  };

  return (
    <section ref={ref} className="archivo" id="archivo" aria-labelledby="archivo-heading">
      {/* ═══ HEADER ═══ */}
      <header className="arch-header">
        <div className="arch-header__wrap">
          <div className="arch-header__top">
            <span className="arch-header__label">
              <span className="arch-header__dot" />
              Fragments · SS26 Archive
            </span>
            <span className="arch-header__tag">Chapter V · Visual Essay</span>
          </div>

          <h2 id="archivo-heading" className="arch-header__heading">
            <span className="arch-header__line">
              <span className="arch-header__line-inner">{splitLetters('The')}</span>
            </span>
            <span className="arch-header__line">
              <em className="arch-header__line-inner arch-header__line-inner--accent">
                {splitLetters('Archive.')}
              </em>
            </span>
          </h2>

          <div className="arch-header__body">
            <p className="arch-header__lead">
              A visual essay in layers. Fragments, gestures, confidences. The atelier
              unfolded into small universes that coexist in silence — the piece, the
              hand, the color, the number, the instant.
            </p>

            <div className="arch-header__index">
              <div className="arch-header__index-item">
                <span>01</span><span>The Piece</span>
              </div>
              <div className="arch-header__index-item">
                <span>02</span><span>The Palette</span>
              </div>
              <div className="arch-header__index-item">
                <span>03</span><span>The Number</span>
              </div>
              <div className="arch-header__index-item">
                <span>04</span><span>The Voice</span>
              </div>
              <div className="arch-header__index-item">
                <span>05</span><span>The Privilege</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ═══ BENTO GRID ═══ */}
      <div className="arch-grid">
        {/* ── A · Pieza destacada ── */}
        <a href="#colecciones" className="bento bento--a bento--image bento--link" {...tiltProps}>
          <img
            src={ARCHIVO_IMG.featured}
            alt="Opus Gown — featured limited-edition SS26 couture piece, full-length atelier portrait"
            className="bento__img"
            loading="lazy"
          />
          <div className="bento__tint" />
          <div className="bento__shine" />
          <div className="bento__corners" aria-hidden="true">
            <span /><span /><span /><span />
          </div>
          <div className="bento__ribbon bento__ribbon--top">
            <span className="bento__ribbon-dot" />
            Piece 001 / 018
          </div>
          <div className="bento__ribbon bento__ribbon--bottom">
            <div className="bento__ribbon-text">
              <span>Limited Edition</span>
              <em>Opus Gown</em>
            </div>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </div>
          <div className="bento__hover-cta">
            <span>View the piece</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </div>
        </a>

        {/* ── B · Paleta ── */}
        <a href="#paleta" className="bento bento--b bento--palette bento--link" {...tiltProps}>
          <div className="bento__shine" />
          <div className="bento__label-row">
            <span className="bento__label">SS26 Palette</span>
            <span className="bento__label-count">06</span>
          </div>
          <div className="bento__palette-swatches">
            {PALETTE_SS26.map((c, i) => (
              <div key={i} className="bento__palette-tile">
                <span className="bento__palette-swatch" style={{ backgroundColor: c.color }}>
                  <span className="bento__palette-hex">#{c.hex}</span>
                </span>
                <span className="bento__palette-name">{c.name}</span>
              </div>
            ))}
          </div>
          <span className="bento__tile-link">
            View full palette
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </span>
        </a>

        {/* ── C · Stat 14 artisans ── */}
        <a href="#atelier" className="bento bento--c bento--stat bento--link" {...tiltProps} aria-label="14 active artisans in the Bucaramanga atelier">
          <div className="bento__shine" />
          <span className="bento__stat-eyebrow">Living Atelier</span>
          <span className="bento__stat-num" data-count="14" aria-hidden="true">0</span>
          <span className="bento__stat-label">Active artisans</span>
          <span className="bento__stat-foot">Bucaramanga · Colombia</span>
          <span className="bento__tile-link bento__tile-link--sm">
            Meet them
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </span>
        </a>

        {/* ── D · Manifesto quote ── */}
        <a href="#atelier" className="bento bento--d bento--quote bento--link" {...tiltProps}>
          <div className="bento__shine" />
          <span className="bento__quote-mark" aria-hidden="true">“</span>
          <blockquote className="bento__quote-body">
            Obsession with detail is the only thing that separates the good
            from the <em>extraordinary</em>. Everything else — excuses.
          </blockquote>
          <footer className="bento__quote-foot">
            <div className="bento__quote-author-block">
              <span className="bento__quote-line" />
              <div>
                <span className="bento__quote-author">Isabel Stelar</span>
                <span className="bento__quote-role">· Creative Director</span>
              </div>
            </div>
            <span className="bento__tile-link bento__tile-link--inline">
              Read manifesto
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </footer>
        </a>

        {/* ── E · Pleated silhouette ── */}
        <a href="#archivo" className="bento bento--e bento--image bento--link" {...tiltProps}>
          <img
            src={ARCHIVO_IMG.tall}
            alt="Archive piece 08 — pleated spring silhouette photographed on runway"
            className="bento__img"
            loading="lazy"
          />
          <div className="bento__tint" />
          <div className="bento__shine" />
          <div className="bento__corners" aria-hidden="true">
            <span /><span /><span /><span />
          </div>
          <div className="bento__ribbon bento__ribbon--top">
            <span className="bento__ribbon-dot" />
            Archive · 08
          </div>
          <div className="bento__ribbon bento__ribbon--bottom bento__ribbon--small">
            <em>Pleated Silhouette</em>
            <span>Spring</span>
          </div>
          <div className="bento__hover-cta">
            <span>Explore archive</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </div>
        </a>

        {/* ── F · Stat hours ── */}
        <a href="#atelier" className="bento bento--f bento--stat bento--link" {...tiltProps} aria-label="Over 1,200 hours of handwork per couture piece on average">
          <div className="bento__shine" />
          <span className="bento__stat-eyebrow">Time</span>
          <span className="bento__stat-num" data-count="1200" data-suffix="+" aria-hidden="true">0</span>
          <span className="bento__stat-label">Hours per piece</span>
          <span className="bento__stat-foot">couture average</span>
          <span className="bento__tile-link bento__tile-link--sm">
            See process
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </span>
        </a>

        {/* ── G · The Privilege (big CTA) ── */}
        <article className="bento bento--g bento--cta" {...tiltProps} aria-labelledby="bento-cta-title">
          <img
            src={ARCHIVO_IMG.runway}
            alt="Private Atelier — backstage view of the Stelar Bucaramanga couture runway"
            className="bento__img bento__img--cta"
            loading="lazy"
          />
          <div className="bento__cta-overlay" />
          <div className="bento__shine" />
          <div className="bento__corners" aria-hidden="true">
            <span /><span /><span /><span />
          </div>

          <div className="bento__cta-inner">
            <span className="bento__cta-eyebrow">
              <span className="bento__cta-dot" />
              The Privilege · By Invitation Only
            </span>

            <h3 id="bento-cta-title" className="bento__cta-title">
              <span>Private</span>
              <em>Atelier.</em>
            </h3>

            <p className="bento__cta-desc">
              A guided visit to the Bucaramanga atelier, a conversation with
              Isabel, a dreamt piece crafted to your measure. Three hours, one
              garment, an entire lifetime.
            </p>

            <dl className="bento__cta-meta">
              <div>
                <dt>Location</dt>
                <dd>Bucaramanga</dd>
              </div>
              <div>
                <dt>Duration</dt>
                <dd>3 hours · by appt</dd>
              </div>
              <div>
                <dt>Slots</dt>
                <dd>12 per year</dd>
              </div>
            </dl>

            <div className="bento__cta-actions">
              <a href="#contacto" className="bento__cta-button">
                <span className="bento__cta-button-bg" />
                <span className="bento__cta-button-text">Request access</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
              <a href="#contacto" className="bento__cta-button bento__cta-button--ghost">
                <span>View calendar</span>
              </a>
            </div>
          </div>
        </article>

        {/* ── H · Press ── */}
        <a href="#contacto" className="bento bento--h bento--press bento--link" {...tiltProps}>
          <div className="bento__shine" />
          <span className="bento__press-eyebrow">Featured in</span>
          <ul className="bento__press-list">
            <li><em>Vogue</em> <span>Italia · 26</span></li>
            <li><em>Elle</em> <span>France · 25</span></li>
            <li><em>Harper's</em> <span>Bazaar · 25</span></li>
            <li><em>L'Officiel</em> <span>Colombia · 26</span></li>
          </ul>
          <span className="bento__press-foot">
            <span className="bento__press-dot" />
            28 publications
          </span>
          <span className="bento__tile-link bento__tile-link--dark">
            View press archive
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </span>
        </a>

        {/* ── I · Stat showroom ── */}
        <a href="#contacto" className="bento bento--i bento--stat bento--link" {...tiltProps} aria-label="One flagship atelier in Bucaramanga, Colombia">
          <div className="bento__shine" />
          <span className="bento__stat-eyebrow">Presence</span>
          <span className="bento__stat-num" data-count="1" aria-hidden="true">0</span>
          <span className="bento__stat-label">Flagship atelier</span>
          <span className="bento__stat-foot">Bucaramanga · Colombia</span>
          <span className="bento__tile-link bento__tile-link--sm">
            Book visit
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </span>
        </a>

        {/* ── J · Virtual Tour ── */}
        <a href="#atelier" className="bento bento--j bento--tour bento--link" {...tiltProps}>
          <img
            src={ARCHIVO_IMG.tour}
            alt="Virtual tour — immersive 360-degree view of the Bucaramanga couture workshop"
            className="bento__img bento__img--tour"
            loading="lazy"
          />
          <div className="bento__tour-overlay" />
          <div className="bento__shine" />
          <div className="bento__tour-inner">
            <div className="bento__tour-play">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <polygon points="6 4 20 12 6 20" />
              </svg>
            </div>
            <div className="bento__tour-text">
              <span className="bento__tour-label">
                <span className="bento__tour-label-dot" />
                Tour · 360°
              </span>
              <h3 className="bento__tour-title">
                Behind the <em>Atelier</em>
              </h3>
              <p className="bento__tour-desc">
                Walk through the Bucaramanga workshop · 4 min immersive tour
              </p>
            </div>
            <svg className="bento__tour-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </div>
        </a>

        {/* ── K · Newsletter ── */}
        <article className="bento bento--k bento--newsletter" {...tiltProps} aria-labelledby="bento-news-title">
          <div className="bento__shine" />
          <div className="bento__news-top">
            <span className="bento__news-eyebrow">
              <span className="bento__news-dot" />
              Private list · SS26
            </span>
            <span className="bento__news-count">+ 2,400 subscribers</span>
          </div>

          <h3 id="bento-news-title" className="bento__news-title">
            Receive the <em>looks</em> first.
          </h3>

          <p className="bento__news-desc">
            Priority access to launches, lookbooks, and atelier appointments.
            No spam — only the essential.
          </p>

          <form className="bento__news-form" onSubmit={handleSubscribe} noValidate={false}>
            <label htmlFor="archivo-news-email" className="visually-hidden">Email address</label>
            <input
              id="archivo-news-email"
              type="email"
              name="email"
              className="bento__news-input"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              aria-required="true"
              aria-describedby="archivo-news-legal"
            />
            <button type="submit" className="bento__news-btn">
              <span>{subscribed ? 'Thank you' : 'Subscribe'}</span>
              {!subscribed && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true" focusable="false">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              )}
            </button>
          </form>

          <span
            className="bento__news-status"
            role="status"
            aria-live="polite"
          >
            {subscribed ? 'Subscription confirmed — thank you.' : ''}
          </span>

          <span id="archivo-news-legal" className="bento__news-legal">
            By subscribing you accept our privacy policy.
          </span>
        </article>

        {/* ── L · Instagram ── */}
        <a
          href="https://instagram.com/stelar.atelier"
          target="_blank"
          rel="noopener noreferrer"
          className="bento bento--l bento--ig bento--link"
          aria-label="Follow Stelar Atelier on Instagram (opens in new tab)"
          {...tiltProps}
        >
          <div className="bento__shine" />
          <div className="bento__ig-head">
            <span className="bento__ig-handle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              @stelar.atelier
            </span>
            <span className="bento__ig-count">48.2K</span>
          </div>
          <div className="bento__ig-grid" aria-hidden="true">
            <div className="bento__ig-cell">
              <img src={ARCHIVO_IMG.ig1} alt="" loading="lazy" />
            </div>
            <div className="bento__ig-cell">
              <img src={ARCHIVO_IMG.ig2} alt="" loading="lazy" />
            </div>
            <div className="bento__ig-cell">
              <img src={ARCHIVO_IMG.ig3} alt="" loading="lazy" />
            </div>
            <div className="bento__ig-cell">
              <img src={ARCHIVO_IMG.ig4} alt="" loading="lazy" />
            </div>
          </div>
          <span className="bento__tile-link bento__tile-link--sm">
            Follow
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </span>
        </a>

        {/* ── M · Lookbook PDF ── */}
        <a href="#contacto" className="bento bento--m bento--download bento--link" {...tiltProps} aria-label="Download SS26 Lookbook PDF, 68 pages, 24 megabytes">
          <div className="bento__shine" />
          <div className="bento__dl-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </div>
          <span className="bento__dl-eyebrow">SS26 Lookbook</span>
          <span className="bento__dl-title">Download PDF</span>
          <span className="bento__dl-meta">68 pages · 24 MB</span>
          <span className="bento__tile-link bento__tile-link--sm">
            Download
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </span>
        </a>

        {/* ── N · Made in Bucaramanga (signature tile) ── */}
        <article className="bento bento--n bento--signature" {...tiltProps}>
          <div className="bento__shine" />
          <div className="bento__sig-ornament">✦</div>
          <span className="bento__sig-eyebrow">Made in</span>
          <span className="bento__sig-place">Bucaramanga</span>
          <span className="bento__sig-sub">MMXXVI</span>
          <div className="bento__sig-line" />
          <span className="bento__sig-meta">Atelier Stelar</span>
        </article>
      </div>

      {/* ═══ OUTRO ═══ */}
      <div className="arch-outro">
        <blockquote className="arch-outro__quote">
          <span className="arch-outro__line">
            <span className="arch-outro__inner">
              {'«The archive keeps no garments —'.split('').map((c, i) => (
                <span key={i} className="arch-outro__letter">{c === ' ' ? '\u00A0' : c}</span>
              ))}
            </span>
          </span>
          <span className="arch-outro__line">
            <em className="arch-outro__inner">
              {'it keeps memory of the gesture.»'.split('').map((c, i) => (
                <span key={i} className="arch-outro__letter">{c === ' ' ? '\u00A0' : c}</span>
              ))}
            </em>
          </span>
        </blockquote>
        <div className="arch-outro__sign">
          <span className="arch-outro__sign-line" />
          <span>SS26 Archive · Atelier Stelar</span>
          <span className="arch-outro__sign-line" />
        </div>
      </div>
    </section>
  );
}

export default Archivo;
