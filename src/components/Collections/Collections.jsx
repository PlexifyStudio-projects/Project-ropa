import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

import img1 from '../../assets/images/hero-main.jpg';
import img2 from '../../assets/images/hero-02.jpg';
import img3 from '../../assets/images/hero-03.jpg';

const COLLECTIONS = [
  {
    index: '01',
    title: 'Spring',
    subtitle: 'Collection SS26',
    tag: 'New Season',
    img: img3,
    imgAlt: 'Model in flowing silk dress at dawn — Spring SS26 campaign, light florals and ethereal silhouettes',
    description: 'Delicate florals, ethereal silks and silhouettes that dance with the morning breeze. An ode to light femininity and the natural movement of fabrics.',
    pieces: '42',
    materials: 'Silk · Linen · Organza',
    mood: 'Light · Floral · Serene',
    launch: 'March 2026',
    priceFrom: 'From COP $2,500,000',
    availability: 'Available · 42 of 42',
    availabilityState: 'available',
    ctaHref: '#contacto',
    palette: ['#E4B8B0', '#F5E1DB', '#C5CEBF', '#D4AD96'],
    bg: '#FBF6F2',
  },
  {
    index: '02',
    title: 'Couture',
    subtitle: 'Atelier Edition 01',
    tag: 'Exclusive',
    img: img2,
    imgAlt: 'Hand-embroidered couture gown in atelier light — Couture Atelier Edition 01, dramatic and opulent',
    description: 'Haute couture redefined for the contemporary woman. Unique pieces crafted by hand with ancestral techniques and avant-garde vision — each garment, an unrepeatable work.',
    pieces: '18',
    materials: 'Tulle · Mikado Silk · Embroidery',
    mood: 'Dramatic · Opulent · Unique',
    launch: 'Atelier Exclusive',
    priceFrom: 'From COP $12,000,000',
    availability: 'Atelier only · 18 pieces',
    availabilityState: 'exclusive',
    ctaHref: '#contacto',
    palette: ['#2E2220', '#C4977B', '#E4B8B0', '#FBF6F2'],
    bg: '#F3EBE4',
  },
  {
    index: '03',
    title: 'Essential',
    subtitle: 'Wardrobe 2026',
    tag: 'Timeless',
    img: img1,
    imgAlt: 'Refined cashmere knit in natural daylight — Essential Wardrobe 2026, timeless and versatile',
    description: 'The basics elevated to everyday luxury. Impeccable cuts, noble materials and a timeless palette designed to accompany every moment of your life with silent elegance.',
    pieces: '36',
    materials: 'Cashmere · Merino · Pima Cotton',
    mood: 'Timeless · Versatile · Refined',
    launch: 'Available Now',
    priceFrom: 'From COP $1,800,000',
    availability: 'Available · 36 of 36',
    availabilityState: 'available',
    ctaHref: '#atelier',
    palette: ['#E6D5CB', '#B8A9A2', '#C49B98', '#F3EBE4'],
    bg: '#FFFAF7',
  },
];

const ASIDE_META = [
  { label: 'Origin', value: 'Atelier · Bucaramanga' },
  { label: 'Technique', value: 'Haute Couture · Hand Embroidery' },
  { label: 'Production', value: 'Limited · Numbered' },
  { label: 'Director', value: 'Isabel Stelar' },
];

const splitLetters = (text) =>
  text.split('').map((char, i) => (
    <span key={i} className="col-heading__letter">
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

function Collections() {
  const ref = useRef(null);

  useGSAP(
    () => {
      const scope = ref.current;

      // ── Header reveals ──
      gsap.fromTo(
        '.col-heading__letter',
        { yPercent: 110, rotate: 8 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.035,
          scrollTrigger: { trigger: '.collections__header', start: 'top 82%' },
        }
      );

      gsap.fromTo(
        '.col-header__label, .col-header__year, .col-header__eyebrow, .col-header__lead, .col-header__signature',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.collections__header', start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.col-header__meta-row',
        { x: 20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.col-header__aside', start: 'top 85%' },
        }
      );

      gsap.fromTo(
        '.col-header__stat',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.col-header__stats', start: 'top 88%' },
        }
      );

      // ── Desktop pinned scroll sequence ──
      const mm = gsap.matchMedia();

      mm.add('(min-width: 900px)', () => {
        const panels = gsap.utils.toArray('.pin-panel', scope);
        const imgWraps = gsap.utils.toArray('.pin-image-wrap', scope);
        const numbers = gsap.utils.toArray('.pin-number', scope);
        const navItems = gsap.utils.toArray('.pin-nav-item', scope);

        if (!panels.length) return;

        // Initial states — only first visible
        gsap.set(panels.slice(1), { opacity: 0, y: 50, pointerEvents: 'none' });

        // Z-index stacking — later images layer on top of earlier
        imgWraps.forEach((w, i) => gsap.set(w, { zIndex: i + 1 }));
        gsap.set(imgWraps.slice(1), { opacity: 0 });

        gsap.set(numbers.slice(1), { opacity: 0, y: 40 });
        gsap.set(navItems, { opacity: 0.35 });
        gsap.set(navItems[0], { opacity: 1 });
        gsap.set('.pin-nav-item__line', { scaleX: 0 });
        if (navItems[0])
          gsap.set(navItems[0].querySelector('.pin-nav-item__line'), { scaleX: 1 });

        const holdTime = 0.65;
        const transTime = 0.5;
        const totalSteps = panels.length - 1;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.pin-wrap',
            start: 'top top',
            end: `+=${panels.length * 85}%`,
            scrub: 0.8,
            pin: '.pin-stage',
            anticipatePin: 1,
          },
        });

        // Progress bar animates for full timeline
        tl.fromTo(
          '.pin-progress__fill',
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            duration: holdTime + (transTime + holdTime) * totalSteps,
          },
          0
        );

        let pos = holdTime;

        for (let i = 0; i < totalSteps; i++) {
          const next = i + 1;
          const curLine = navItems[i].querySelector('.pin-nav-item__line');
          const nextLine = navItems[next].querySelector('.pin-nav-item__line');

          tl
            // Incoming image wipes in on top (z-index stacking ensures it covers)
            .fromTo(
              imgWraps[next],
              { opacity: 0, scale: 1.08, filter: 'blur(8px)' },
              {
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)',
                duration: transTime,
                ease: 'power2.out',
              },
              pos
            )
            // Outgoing subtly scales down for depth (stays fully opaque behind)
            .to(
              imgWraps[i],
              { scale: 0.96, duration: transTime, ease: 'power2.inOut' },
              pos
            )
            // Soft flash overlay during transition
            .fromTo(
              '.pin-visual__flash',
              { opacity: 0 },
              { opacity: 0.12, duration: transTime * 0.4, yoyo: true, repeat: 1, ease: 'power2.inOut' },
              pos
            )
            // Panel text swap
            .to(
              panels[i],
              {
                opacity: 0,
                y: -50,
                pointerEvents: 'none',
                duration: transTime * 0.55,
                ease: 'power2.in',
              },
              pos
            )
            .to(
              panels[next],
              {
                opacity: 1,
                y: 0,
                pointerEvents: 'auto',
                duration: transTime * 0.7,
                ease: 'power3.out',
              },
              pos + transTime * 0.35
            )
            // Big number swap
            .to(numbers[i], { opacity: 0, y: -40, duration: transTime * 0.5 }, pos)
            .to(
              numbers[next],
              { opacity: 1, y: 0, duration: transTime * 0.55 },
              pos + transTime * 0.3
            )
            // Progress nav: outgoing item fades, incoming becomes full
            .to(navItems[i], { opacity: 0.35, duration: 0.35 }, pos)
            .to(navItems[next], { opacity: 1, duration: 0.35 }, pos)
            .to(curLine, { scaleX: 0, duration: 0.35, ease: 'power2.in' }, pos)
            .to(nextLine, { scaleX: 1, duration: 0.5, ease: 'power3.out' }, pos + 0.1)
            // Background tint shift
            .to(
              '.pin-stage',
              { backgroundColor: COLLECTIONS[next].bg, duration: transTime },
              pos
            );

          pos += transTime + holdTime;
        }
      });

      // ── Mobile stacked reveals ──
      mm.add('(max-width: 899px)', () => {
        gsap.utils.toArray('.pin-panel-mobile', scope).forEach((panel) => {
          gsap.fromTo(
            panel,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: { trigger: panel, start: 'top 85%' },
            }
          );
        });
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      className="collections"
      id="colecciones"
      aria-labelledby="collections-heading"
    >
      <div className="collections__wrap">
        {/* ── Editorial header ── */}
        <div className="collections__header">
          <div className="col-header__top">
            <span className="col-header__label">
              <span className="col-header__label-dot" />
              Collections · 2026
            </span>
            <span className="col-header__year">Est. MMXXVI</span>
          </div>

          <div className="col-header__main">
            <div className="col-header__text">
              <span className="col-header__eyebrow">
                <span className="col-header__eyebrow-line" />
                Season · SS26 · Atelier
              </span>

              <h2 id="collections-heading" className="col-heading">
                <span className="col-heading__line">
                  <span className="col-heading__inner">{splitLetters('Discover The')}</span>
                </span>
                <span className="col-heading__line">
                  <em className="col-heading__inner col-heading__inner--accent">
                    {splitLetters('Extraordinary.')}
                  </em>
                </span>
              </h2>

              <p className="col-header__lead">
                Three universes, one vision. Every collection is born from an obsession
                with detail, texture, and the gesture that transforms a garment into
                a sensory experience.
              </p>

              <div className="col-header__signature">
                <span className="col-header__signature-line" />
                <div className="col-header__signature-text">
                  <span className="col-header__signature-name">Isabel Stelar</span>
                  <span className="col-header__signature-role">Creative Director · Founder</span>
                </div>
              </div>
            </div>

            <aside className="col-header__aside">
              <span className="col-header__aside-tag">Dossier · SS26</span>
              <dl className="col-header__meta">
                {ASIDE_META.map((item, i) => (
                  <div key={i} className="col-header__meta-row">
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="col-header__aside-mark" aria-hidden="true">
                <span className="col-header__aside-mark-letter">S</span>
                <span className="col-header__aside-mark-dot" />
              </div>
            </aside>
          </div>

          <div className="col-header__stats">
            <div className="col-header__stat">
              <span className="col-header__stat-num">96</span>
              <span className="col-header__stat-label">Unique Pieces</span>
            </div>
            <div className="col-header__stat">
              <span className="col-header__stat-num">03</span>
              <span className="col-header__stat-label">Collections</span>
            </div>
            <div className="col-header__stat">
              <span className="col-header__stat-num">14</span>
              <span className="col-header__stat-label">Artisans</span>
            </div>
            <div className="col-header__stat">
              <span className="col-header__stat-num">∞</span>
              <span className="col-header__stat-label">Details</span>
            </div>
          </div>
        </div>

        {/* ── Desktop: pinned scroll sequence ── */}
        <div className="pin-wrap">
          <div className="pin-stage">
            {/* Visual column */}
            <div className="pin-visual">
              <div className="pin-visual__frame">
                {COLLECTIONS.map((c, i) => (
                  <div key={i} className="pin-image-wrap">
                    <img src={c.img} alt={c.imgAlt} className="pin-image" />
                    <div className="pin-image-grain" />
                  </div>
                ))}

                <div className="pin-visual__flash" aria-hidden="true" />

                <div className="pin-visual__corners" aria-hidden="true">
                  <span /><span /><span /><span />
                </div>

                <div className="pin-visual__label" aria-hidden="true">
                  <span>Stelar</span>
                  <span>·</span>
                  <span>Atelier</span>
                </div>
                {/* intentional English — brand terms */}

                <div className="pin-numbers">
                  {COLLECTIONS.map((c, i) => (
                    <span key={i} className="pin-number">
                      <span className="pin-number__n">{c.index}</span>
                      <span className="pin-number__slash">/</span>
                      <span className="pin-number__total">03</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Info column */}
            <div className="pin-info">
              <div className="pin-panels">
                {COLLECTIONS.map((c, i) => (
                  <article
                    key={i}
                    className="pin-panel"
                    style={{ '--accent': c.palette[0] }}
                  >
                    <div className="pin-panel__head">
                      <span className="pin-panel__tag">{c.tag}</span>
                      <span className="pin-panel__sub">{c.subtitle}</span>
                    </div>
                    <h3 className="pin-panel__title">{c.title}</h3>
                    <p className="pin-panel__price">{c.priceFrom}</p>
                    <p className="pin-panel__desc">{c.description}</p>

                    <dl className="pin-panel__details">
                      <div className="pin-detail">
                        <dt>Pieces</dt>
                        <dd>{c.pieces}</dd>
                      </div>
                      <div className="pin-detail">
                        <dt>Fabric</dt>
                        <dd>{c.materials}</dd>
                      </div>
                      <div className="pin-detail">
                        <dt>Launch</dt>
                        <dd>{c.launch}</dd>
                      </div>
                      <div className="pin-detail">
                        <dt>Mood</dt>
                        <dd>{c.mood}</dd>
                      </div>
                    </dl>

                    <div
                      className={`pin-panel__availability pin-panel__availability--${c.availabilityState}`}
                    >
                      <span className="pin-panel__availability-dot" aria-hidden="true" />
                      <span>{c.availability}</span>
                    </div>

                    <div className="pin-panel__palette">
                      <span className="pin-panel__palette-label">Palette</span>
                      <div className="pin-panel__swatches">
                        {c.palette.map((color, j) => (
                          <span
                            key={j}
                            className="pin-swatch"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>

                    <a href={c.ctaHref} className="pin-panel__cta">
                      <span>Explore {c.title}</span>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </a>
                  </article>
                ))}
              </div>

              {/* Progress nav — clean 3-column layout */}
              <nav className="pin-progress" aria-label="Collection navigation">
                <div className="pin-progress__bar">
                  <div className="pin-progress__fill" />
                </div>
                <div className="pin-progress__nav">
                  {COLLECTIONS.map((c, i) => (
                    <div key={i} className="pin-nav-item">
                      <div className="pin-nav-item__header">
                        <span className="pin-nav-item__num">{c.index}</span>
                        <span className="pin-nav-item__name">{c.title}</span>
                      </div>
                      <span className="pin-nav-item__line" />
                    </div>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        </div>

        {/* ── Mobile: stacked cards ── */}
        <div className="pin-mobile">
          {COLLECTIONS.map((c, i) => (
            <article key={i} className="pin-panel-mobile" style={{ '--accent': c.palette[0] }}>
              <div className="pin-panel-mobile__img">
                <img src={c.img} alt={c.imgAlt} />
                <span className="pin-panel-mobile__idx">
                  {c.index} <span>/ 03</span>
                </span>
              </div>
              <div className="pin-panel-mobile__body">
                <div className="pin-panel__head">
                  <span className="pin-panel__tag">{c.tag}</span>
                  <span className="pin-panel__sub">{c.subtitle}</span>
                </div>
                <h3 className="pin-panel__title">{c.title}</h3>
                <p className="pin-panel__price">{c.priceFrom}</p>
                <p className="pin-panel__desc">{c.description}</p>
                <dl className="pin-panel__details">
                  <div className="pin-detail"><dt>Pieces</dt><dd>{c.pieces}</dd></div>
                  <div className="pin-detail"><dt>Fabric</dt><dd>{c.materials}</dd></div>
                  <div className="pin-detail"><dt>Launch</dt><dd>{c.launch}</dd></div>
                  <div className="pin-detail"><dt>Mood</dt><dd>{c.mood}</dd></div>
                </dl>
                <div
                  className={`pin-panel__availability pin-panel__availability--${c.availabilityState}`}
                >
                  <span className="pin-panel__availability-dot" aria-hidden="true" />
                  <span>{c.availability}</span>
                </div>
                <div className="pin-panel__palette">
                  <span className="pin-panel__palette-label">Palette</span>
                  <div className="pin-panel__swatches">
                    {c.palette.map((color, j) => (
                      <span
                        key={j}
                        className="pin-swatch"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
                <a href={c.ctaHref} className="pin-panel__cta">
                  <span>Explore {c.title}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ── Full-width marquee ticker ── */}
      <div className="col-ticker" aria-hidden="true">
        <div className="col-ticker__track">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="col-ticker__group">
              <span className="col-ticker__item">Spring SS26</span>
              <span className="col-ticker__dot">✦</span>
              <span className="col-ticker__item">Couture Atelier</span>
              <span className="col-ticker__dot">✦</span>
              <span className="col-ticker__item">Essential Wardrobe</span>
              <span className="col-ticker__dot">✦</span>
              <span className="col-ticker__item">Handcrafted</span>
              <span className="col-ticker__dot">✦</span>
              <span className="col-ticker__item">Limited Edition</span>
              <span className="col-ticker__dot">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Collections;
