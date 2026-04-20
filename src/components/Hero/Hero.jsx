import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

// High-fashion editorial imagery (Unsplash). Replace with local assets if preferred.
const HERO_IMG = {
  main:      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&h=1400&fit=crop&q=85&auto=format',
  secondary: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=900&h=900&fit=crop&q=85&auto=format',
  accent:    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&h=900&fit=crop&q=85&auto=format',
  mobile:    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&h=1200&fit=crop&q=85&auto=format',
};

const HERO_ALT = {
  main:      'Model in pleated silk gown — Spring SS26 editorial campaign by Stelar Atelier',
  secondary: 'Hand-stitched couture detail — artisan tailoring at the Stelar atelier in Bucaramanga',
  accent:    'Essential silhouette from the Stelar SS26 capsule — draped neutral fabric study',
  mobile:    'Stelar SS26 campaign portrait — quiet couture editorial, Bucaramanga atelier',
};

const splitLetters = (text) =>
  text.split('').map((char, i) => (
    <span key={i} className="hero__letter" aria-hidden="true">
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

function MouseGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Respect reduced-motion preference — skip mouse-tracked glow
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mql.matches) return;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'power3' });
    const handler = (e) => { xTo(e.clientX - window.innerWidth / 2); yTo(e.clientY - window.innerHeight / 2); };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);
  return <div ref={ref} className="hero__glow" aria-hidden="true" />;
}

function Hero() {
  const heroRef = useRef(null);
  const prefersReducedMotion = useRef(false);

  useGSAP(() => {
    // Entrance timeline runs for everyone (tiny reveal), but continuous loops
    // and mouse parallax are gated via gsap.matchMedia below.
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.4 });

    tl.fromTo('.hero__issue-item',
      { y: -14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 }
    );

    tl.fromTo('.hero__mobile-img',
      { y: 40, opacity: 0, scale: 0.94 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out' },
      '-=0.2'
    );

    tl.fromTo('.hero__badge',
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8 },
      '-=0.5'
    );

    tl.fromTo('.hero__title-line',
      { yPercent: 110, rotate: 6 },
      { yPercent: 0, rotate: 0, duration: 1.1, stagger: 0.08, ease: 'expo.out' },
      '-=0.4'
    );

    tl.fromTo('.hero__letter',
      { yPercent: 110 },
      { yPercent: 0, duration: 1, stagger: 0.025, ease: 'expo.out' },
      '-=0.9'
    );

    tl.fromTo('.hero__subtitle',
      { y: 20, opacity: 0, clipPath: 'inset(0 100% 0 0)' },
      { y: 0, opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: 1 },
      '-=0.6'
    );

    tl.fromTo('.hero__btn',
      { y: 20, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: 'back.out(1.2)' },
      '-=0.5'
    );

    tl.fromTo('.hero__meta-row',
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.06 },
      '-=0.5'
    );

    tl.fromTo('.hero__stat',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 },
      '-=0.4'
    );

    tl.fromTo('.hero__card',
      { y: 80, opacity: 0, rotateY: -15, rotateX: 8, scale: 0.88, transformPerspective: 1000 },
      { y: 0, opacity: 1, rotateY: 0, rotateX: 0, scale: 1, duration: 1.4, stagger: 0.2, ease: 'power3.out' },
      '-=1.4'
    );

    tl.fromTo('.hero__float',
      { y: 30, opacity: 0, scale: 0.85 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.12, ease: 'back.out(1.4)' },
      '-=0.8'
    );

    tl.fromTo('.hero__ring, .hero__scroll, .hero__side',
      { opacity: 0 },
      { opacity: 1, duration: 0.6, stagger: 0.1 },
      '-=0.4'
    );

    // Continuous loops — only for users who are OK with motion.
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      prefersReducedMotion.current = false;
      const cardFloat = gsap.to('.hero__card', {
        y: -8,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.5, from: 'random' },
      });
      const ringSpin = gsap.to('.hero__ring', { rotate: 360, duration: 120, ease: 'none', repeat: -1 });
      return () => {
        cardFloat.kill();
        ringSpin.kill();
      };
    });
    mm.add('(prefers-reduced-motion: reduce)', () => {
      prefersReducedMotion.current = true;
    });

    return () => mm.revert();
  }, { scope: heroRef });

  const handleMouseMove = useCallback((e) => {
    // Gate parallax — skip entirely if the user prefers reduced motion.
    if (prefersReducedMotion.current) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    gsap.to('.hero__gallery', { x: x * 10, y: y * 6, duration: 1.2, ease: 'power3.out' });
    gsap.to('.hero__card--main', { rotateY: x * 3, rotateX: -y * 2, duration: 1, ease: 'power2.out' });
    gsap.to('.hero__card--secondary', { rotateY: x * 5, rotateX: -y * 3, duration: 1.2, ease: 'power2.out' });
    gsap.to('.hero__card--accent', { rotateY: x * 4, rotateX: -y * 2.5, duration: 1.1, ease: 'power2.out' });
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero"
      id="inicio"
      onMouseMove={handleMouseMove}
      aria-label="Stelar Atelier — Spring Summer 2026 collection introduction"
    >
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__orb hero__orb--1" aria-hidden="true" />
      <div className="hero__orb hero__orb--2" aria-hidden="true" />
      <div className="hero__orb hero__orb--3" aria-hidden="true" />
      <MouseGlow />

      {/* ═══ EDITORIAL ISSUE BAR ═══ */}
      <div className="hero__issue" role="group" aria-label="Issue details">
        <span className="hero__issue-item">
          <span className="hero__issue-star" aria-hidden="true">✦</span>
          Issue N° 01
        </span>
        <span className="hero__issue-item">Spring / Summer MMXXVI</span>
        <span className="hero__issue-item hero__issue-item--right">Bucaramanga — Colombia</span>
      </div>

      {/* ═══ CONTENT ═══ */}
      <div className="hero__content">
        {/* Mobile featured image */}
        <div className="hero__mobile-img">
          <img
            src={HERO_IMG.mobile}
            alt={HERO_ALT.mobile}
            loading="eager"
            decoding="async"
            fetchpriority="high"
          />
          <div className="hero__mobile-img-overlay" aria-hidden="true" />
          <div className="hero__mobile-img-badge" aria-label="Spring Summer 2026 season">
            <span className="hero__mobile-img-dot" aria-hidden="true" />
            SS 26
          </div>
        </div>

        <div className="hero__badge" aria-label="New Season Spring Summer 2026 — 96 pieces">
          <span className="hero__badge-dot" aria-hidden="true" />
          <span>New Season · SS26</span>
          <span className="hero__badge-line" aria-hidden="true" />
          <span className="hero__badge-count">96 Pieces</span>
        </div>

        <h1 className="hero__title">
          <span className="sr-only">The Art of Quiet Couture.</span>
          <span className="hero__title-line" aria-hidden="true">{splitLetters('The Art of')}</span>
          <span className="hero__title-line" aria-hidden="true">
            <em className="hero__title-accent">{splitLetters('Quiet')}</em>
          </span>
          <span className="hero__title-line" aria-hidden="true">{splitLetters('Couture.')}</span>
        </h1>

        <p className="hero__subtitle">
          Exclusive pieces crafted at the atelier — each a quiet conversation
          between hand, material, and time. Numbered, signed, made to last
          a lifetime.
        </p>

        <div className="hero__actions">
          <a
            href="#colecciones"
            className="hero__btn hero__btn--primary"
            aria-label="Explore Stelar collections"
          >
            <span className="hero__btn-bg" aria-hidden="true" />
            <span className="hero__btn-text">Explore Collections</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="hero__btn-icon" aria-hidden="true" focusable="false">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <div className="hero__secondary">
            <a
              href="#contacto"
              className="hero__btn hero__btn--outline"
              aria-label="Book a private fitting at the Stelar atelier"
            >
              <span className="hero__btn-text">Book a Fitting</span>
            </a>
            <span className="hero__reassurance">
              <span className="hero__reassurance-dot" aria-hidden="true" />
              Confidential · By invitation
            </span>
          </div>
        </div>

        <div className="hero__assurance" role="note" aria-label="Purchase guarantees">
          <span className="hero__assurance-mark" aria-hidden="true">✦</span>
          <span>Signed + Numbered · Lifetime warranty</span>
        </div>

        <div className="hero__meta">
          <div className="hero__meta-row">
            <span className="hero__meta-label">Heritage</span>
            <span className="hero__meta-value">Est. MMXXVI · Bucaramanga</span>
          </div>
          <div className="hero__meta-row">
            <span className="hero__meta-label">Directed by</span>
            <span className="hero__meta-value">Isabel Stelar</span>
          </div>
          <div className="hero__meta-row">
            <span className="hero__meta-label">This Season</span>
            <span className="hero__meta-value">96 Pieces · 03 Collections</span>
          </div>
        </div>

        <dl className="hero__stats" aria-label="Atelier at a glance">
          <div className="hero__stat">
            <dt className="hero__stat-label">Master Artisans</dt>
            <dd className="hero__stat-num">14</dd>
          </div>
          <div className="hero__stat-div" aria-hidden="true" />
          <div className="hero__stat">
            <dt className="hero__stat-label">Hours per piece</dt>
            <dd className="hero__stat-num">1,200</dd>
          </div>
          <div className="hero__stat-div" aria-hidden="true" />
          <div className="hero__stat">
            <dt className="hero__stat-label">Private ateliers</dt>
            <dd className="hero__stat-num">03</dd>
          </div>
        </dl>
      </div>

      {/* ═══ GALLERY ═══ */}
      <div className="hero__gallery" aria-label="Spring Summer 2026 editorial imagery" role="group">
        <figure className="hero__card hero__card--main">
          <img
            src={HERO_IMG.main}
            alt={HERO_ALT.main}
            loading="eager"
            decoding="async"
            fetchpriority="high"
          />
          <div className="hero__card-shine" aria-hidden="true" />
          <div className="hero__card-overlay" aria-hidden="true" />
          <figcaption className="hero__card-tag">
            <span className="hero__card-tag-dot" aria-hidden="true" />
            Editorial · 01
          </figcaption>
          <span className="hero__card-caption" aria-hidden="true">
            <em>Silhouette</em>
            <span>Pleated · Spring</span>
          </span>
        </figure>

        <figure className="hero__card hero__card--secondary">
          <img
            src={HERO_IMG.secondary}
            alt={HERO_ALT.secondary}
            loading="lazy"
            decoding="async"
          />
          <div className="hero__card-shine" aria-hidden="true" />
          <div className="hero__card-overlay" aria-hidden="true" />
          <figcaption className="hero__card-tag">Couture · 02</figcaption>
        </figure>

        <figure className="hero__card hero__card--accent">
          <img
            src={HERO_IMG.accent}
            alt={HERO_ALT.accent}
            loading="lazy"
            decoding="async"
          />
          <div className="hero__card-shine" aria-hidden="true" />
          <div className="hero__card-overlay" aria-hidden="true" />
          <figcaption className="hero__card-tag">Essential · 03</figcaption>
        </figure>

        <div className="hero__float hero__float--price" aria-label="Starting price, three point eight million Colombian pesos per piece">
          <span className="hero__float-small">From</span>
          <span className="hero__float-big">COP $3.8M</span>
          <span className="hero__float-tiny">per piece</span>
        </div>

        <svg className="hero__ring" viewBox="0 0 300 300" fill="none" aria-hidden="true" focusable="false">
          <circle cx="150" cy="150" r="145" stroke="rgba(196,151,123,0.1)" strokeWidth="0.8" />
          <circle cx="150" cy="150" r="125" stroke="rgba(228,184,176,0.08)" strokeWidth="0.5" strokeDasharray="6 10" />
          <circle cx="150" cy="150" r="105" stroke="rgba(196,151,123,0.06)" strokeWidth="0.4" strokeDasharray="3 8" />
        </svg>
      </div>

      <div className="hero__side" aria-hidden="true">
        <span>COUTURE</span>
        <span className="hero__side-dot" />
        <span>MMXXVI</span>
        <span className="hero__side-dot" />
        <span>BUCARAMANGA</span>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span className="hero__scroll-label">Scroll to discover</span>
        <div className="hero__scroll-track">
          <div className="hero__scroll-thumb" />
        </div>
      </div>

      {/* ═══ BOTTOM MARQUEE ═══ */}
      <div className="hero__marquee" aria-hidden="true">
        <div className="hero__marquee-track">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="hero__marquee-group">
              <span className="hero__marquee-item">Spring/Summer 2026</span>
              <span className="hero__marquee-dot">✦</span>
              <span className="hero__marquee-item hero__marquee-item--italic">Stelar Atelier</span>
              <span className="hero__marquee-dot">·</span>
              <span className="hero__marquee-item">Handmade in Bucaramanga</span>
              <span className="hero__marquee-dot">✦</span>
              <span className="hero__marquee-item hero__marquee-item--italic">Numbered Edition</span>
              <span className="hero__marquee-dot">·</span>
              <span className="hero__marquee-item">By Appointment Only</span>
              <span className="hero__marquee-dot">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
