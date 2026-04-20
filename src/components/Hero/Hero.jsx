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

const splitLetters = (text) =>
  text.split('').map((char, i) => (
    <span key={i} className="hero__letter">
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

function MouseGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'power3' });
    const handler = (e) => { xTo(e.clientX - window.innerWidth / 2); yTo(e.clientY - window.innerHeight / 2); };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);
  return <div ref={ref} className="hero__glow" />;
}

function Hero() {
  const heroRef = useRef(null);

  useGSAP(() => {
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

    gsap.to('.hero__card', {
      y: -8,
      duration: 4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      stagger: { each: 0.5, from: 'random' },
    });
    gsap.to('.hero__ring', { rotate: 360, duration: 120, ease: 'none', repeat: -1 });

  }, { scope: heroRef });

  const handleMouseMove = useCallback((e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    gsap.to('.hero__gallery', { x: x * 10, y: y * 6, duration: 1.2, ease: 'power3.out' });
    gsap.to('.hero__card--main', { rotateY: x * 3, rotateX: -y * 2, duration: 1, ease: 'power2.out' });
    gsap.to('.hero__card--secondary', { rotateY: x * 5, rotateX: -y * 3, duration: 1.2, ease: 'power2.out' });
    gsap.to('.hero__card--accent', { rotateY: x * 4, rotateX: -y * 2.5, duration: 1.1, ease: 'power2.out' });
  }, []);

  return (
    <section ref={heroRef} className="hero" id="inicio" onMouseMove={handleMouseMove}>
      <div className="hero__bg" />
      <div className="hero__grid" />
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />
      <div className="hero__orb hero__orb--3" />
      <MouseGlow />

      {/* ═══ EDITORIAL ISSUE BAR ═══ */}
      <div className="hero__issue">
        <span className="hero__issue-item">
          <span className="hero__issue-star">✦</span>
          Issue N° 01
        </span>
        <span className="hero__issue-item">Spring / Summer MMXXVI</span>
        <span className="hero__issue-item hero__issue-item--right">Bucaramanga — Colombia</span>
      </div>

      {/* ═══ CONTENT ═══ */}
      <div className="hero__content">
        {/* Mobile featured image */}
        <div className="hero__mobile-img">
          <img src={HERO_IMG.mobile} alt="Stelar Atelier" />
          <div className="hero__mobile-img-overlay" />
          <div className="hero__mobile-img-badge">
            <span className="hero__mobile-img-dot" />
            SS 26
          </div>
        </div>

        <div className="hero__badge">
          <span className="hero__badge-dot" />
          <span>New Season · SS26</span>
          <span className="hero__badge-line" />
          <span className="hero__badge-count">96 Pieces</span>
        </div>

        <h1 className="hero__title">
          <span className="hero__title-line">{splitLetters('The Art of')}</span>
          <span className="hero__title-line">
            <em className="hero__title-accent">{splitLetters('Quiet')}</em>
          </span>
          <span className="hero__title-line">{splitLetters('Couture.')}</span>
        </h1>

        <p className="hero__subtitle">
          Exclusive pieces crafted at the atelier — each a quiet conversation
          between hand, material, and time. Numbered, signed, made to last
          a lifetime.
        </p>

        <div className="hero__actions">
          <a href="#colecciones" className="hero__btn hero__btn--primary">
            <span className="hero__btn-bg" />
            <span className="hero__btn-text">Explore Collections</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="hero__btn-icon">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#contacto" className="hero__btn hero__btn--outline">
            <span className="hero__btn-text">Book a Fitting</span>
          </a>
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

        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-num">14</span>
            <span className="hero__stat-label">Master Artisans</span>
          </div>
          <div className="hero__stat-div" />
          <div className="hero__stat">
            <span className="hero__stat-num">1,200</span>
            <span className="hero__stat-label">Hours per piece</span>
          </div>
          <div className="hero__stat-div" />
          <div className="hero__stat">
            <span className="hero__stat-num">03</span>
            <span className="hero__stat-label">Private ateliers</span>
          </div>
        </div>
      </div>

      {/* ═══ GALLERY ═══ */}
      <div className="hero__gallery">
        <div className="hero__card hero__card--main">
          <img src={HERO_IMG.main} alt="Stelar editorial" />
          <div className="hero__card-shine" />
          <div className="hero__card-overlay" />
          <span className="hero__card-tag">
            <span className="hero__card-tag-dot" />
            Editorial · 01
          </span>
          <span className="hero__card-caption">
            <em>Silhouette</em>
            <span>Pleated · Spring</span>
          </span>
        </div>

        <div className="hero__card hero__card--secondary">
          <img src={HERO_IMG.secondary} alt="Stelar couture" />
          <div className="hero__card-shine" />
          <div className="hero__card-overlay" />
          <span className="hero__card-tag">Couture · 02</span>
        </div>

        <div className="hero__card hero__card--accent">
          <img src={HERO_IMG.accent} alt="Stelar essential" />
          <div className="hero__card-shine" />
          <div className="hero__card-overlay" />
          <span className="hero__card-tag">Essential · 03</span>
        </div>

        <div className="hero__float hero__float--price">
          <span className="hero__float-small">From</span>
          <span className="hero__float-big">COP $3.8M</span>
          <span className="hero__float-tiny">per piece</span>
        </div>

        <svg className="hero__ring" viewBox="0 0 300 300" fill="none">
          <circle cx="150" cy="150" r="145" stroke="rgba(196,151,123,0.1)" strokeWidth="0.8" />
          <circle cx="150" cy="150" r="125" stroke="rgba(228,184,176,0.08)" strokeWidth="0.5" strokeDasharray="6 10" />
          <circle cx="150" cy="150" r="105" stroke="rgba(196,151,123,0.06)" strokeWidth="0.4" strokeDasharray="3 8" />
        </svg>
      </div>

      <div className="hero__side">
        <span>COUTURE</span>
        <span className="hero__side-dot" />
        <span>MMXXVI</span>
        <span className="hero__side-dot" />
        <span>BUCARAMANGA</span>
      </div>

      <div className="hero__scroll">
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
