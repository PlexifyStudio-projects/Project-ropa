import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Placeholders vía picsum.photos (seed-estables, diferentes por musa).
// Reemplaza con imágenes editoriales reales cuando tengas.
const MUSE_IMAGES = {
  romantica:  'https://picsum.photos/seed/stelar-musa-romantica-3/900/1400',
  soberana:   'https://picsum.photos/seed/stelar-musa-soberana-3/900/1400',
  eterea:     'https://picsum.photos/seed/stelar-musa-eterea-3/900/1400',
  insurgente: 'https://picsum.photos/seed/stelar-musa-insurgente-3/900/1400',
};

const MUSAS = [
  {
    number: '01',
    roman: 'I',
    label: 'The',
    name: 'Romantic',
    archetype: 'Archetype · Spring',
    tagline: 'Dawn of silk',
    description:
      'She moves like light on water — choosing the detail before the statement, the gesture before the word. The petals answer her; the wind dresses her before any garment does.',
    quote: 'I do not dress to be seen. I dress to feel the fabric breathe with me.',
    museName: 'Sofía · 28',
    museOrigin: 'Bucaramanga · Private Studio',
    traits: [
      { label: 'Hour', value: 'Dawn' },
      { label: 'Light', value: 'Diffuse · Golden' },
      { label: 'Mood', value: 'Serene · Delicate' },
      { label: 'Geography', value: 'Andes East' },
    ],
    piece: 'Ether Dress · Spring SS26',
    palette: ['#E4B8B0', '#F5E1DB', '#D4AD96', '#FBF6F2'],
    image: MUSE_IMAGES.romantica,
    bg: '#FBF6F2',
    layout: 'right',
  },
  {
    number: '02',
    roman: 'II',
    label: 'The',
    name: 'Sovereign',
    archetype: 'Archetype · Couture',
    tagline: 'Silhouette of authority',
    description:
      'She walks into the room and the geometry shifts. Her presence is measured in centimeters of perfectly cut cloth. She does not ask permission — she grants it. She does not raise her voice: the room lowers itself for her.',
    quote: 'Elegance is never shouted. It is built in every invisible seam.',
    museName: 'Eleonora · 41',
    museOrigin: 'Bucaramanga · Private House',
    traits: [
      { label: 'Hour', value: 'Twilight' },
      { label: 'Light', value: 'Theatrical · Contrast' },
      { label: 'Mood', value: 'Magnetic · Sovereign' },
      { label: 'Geography', value: 'Highland City' },
    ],
    piece: 'Opus Gown · Couture Atelier',
    palette: ['#2E2220', '#C4977B', '#E4B8B0', '#FBF6F2'],
    image: MUSE_IMAGES.soberana,
    bg: '#F3EBE4',
    layout: 'left',
  },
  {
    number: '03',
    roman: 'III',
    label: 'The',
    name: 'Ethereal',
    archetype: 'Archetype · Essential',
    tagline: 'Echo in the mist',
    description:
      'She weighs nothing, asks nothing, begs nothing. She inhabits the garments like a shared secret. Hers is not the visible — it is the absence well-dressed, the silence that lingers after she has gone.',
    quote: 'The true is never noticed. It is intuited.',
    museName: 'Anaïs · 34',
    museOrigin: 'Bucaramanga · Own Studio',
    traits: [
      { label: 'Hour', value: 'Ambiguous afternoon' },
      { label: 'Light', value: 'Silver · Washed' },
      { label: 'Mood', value: 'Introspective · Free' },
      { label: 'Geography', value: 'Mountain Valley' },
    ],
    piece: 'Air Ensemble · Essential Wardrobe',
    palette: ['#E6D5CB', '#B8A9A2', '#C49B98', '#F3EBE4'],
    image: MUSE_IMAGES.eterea,
    bg: '#FFFAF7',
    layout: 'right',
  },
  {
    number: '04',
    roman: 'IV',
    label: 'The',
    name: 'Insurgent',
    archetype: 'Archetype · Transversal',
    tagline: 'Cutting against the current',
    description:
      'She breaks the rule and dresses in its fragments. Tradition is to her one more material — she folds it, tears it, turns it into her own language. Every garment, a silent manifesto.',
    quote: 'Fashion only interests me when I contradict it.',
    museName: 'Yuna · 26',
    museOrigin: 'Bucaramanga · Downtown Atelier',
    traits: [
      { label: 'Hour', value: 'Midnight' },
      { label: 'Light', value: 'Neon · Dissonant' },
      { label: 'Mood', value: 'Rebel · Future' },
      { label: 'Geography', value: 'Urban East' },
    ],
    piece: 'Deconstructed Jacket · Limited Edition',
    palette: ['#2E2220', '#8C6B7A', '#C4977B', '#B8A9A2'],
    image: MUSE_IMAGES.insurgente,
    bg: '#F3EBE4',
    layout: 'left',
  },
];

const splitLetters = (text) =>
  text.split('').map((char, i) => (
    <span key={i} className="musas-letter">
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

function Musas() {
  const ref = useRef(null);

  useGSAP(
    () => {
      const scope = ref.current;

      // ── Intro reveals ──
      gsap.fromTo(
        '.musas-intro__label, .musas-intro__tag',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.musas-intro', start: 'top 82%' },
        }
      );

      gsap.fromTo(
        '.musas-intro__heading .musas-letter',
        { yPercent: 110, rotate: 6 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 1.1,
          stagger: 0.035,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.musas-intro', start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.musas-intro__lead, .musas-intro__meta-row',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.musas-intro', start: 'top 78%' },
        }
      );

      // ── Per-muse reveals ──
      gsap.utils.toArray('.musa', scope).forEach((muse, i) => {
        const img = muse.querySelector('.musa__image');
        const imgFrame = muse.querySelector('.musa__image-frame');
        const number = muse.querySelector('.musa__number');
        const label = muse.querySelector('.musa__label');
        const nameLetters = muse.querySelectorAll('.musa__name .musas-letter');
        const eyebrow = muse.querySelector('.musa__eyebrow');
        const tagline = muse.querySelector('.musa__tagline');
        const desc = muse.querySelector('.musa__description');
        const quote = muse.querySelector('.musa__quote');
        const traits = muse.querySelectorAll('.musa__trait');
        const swatches = muse.querySelectorAll('.musa__palette-swatch');
        const piece = muse.querySelector('.musa__piece');

        // Image clip-path reveal (scrubbed as muse enters)
        gsap.fromTo(
          imgFrame,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'power2.out',
            scrollTrigger: {
              trigger: muse,
              start: 'top 85%',
              end: 'top 30%',
              scrub: 1,
            },
          }
        );

        // Continuous image parallax
        gsap.fromTo(
          img,
          { yPercent: -8, scale: 1.1 },
          {
            yPercent: 8,
            scale: 1.02,
            ease: 'none',
            scrollTrigger: {
              trigger: muse,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );

        // Number floats
        gsap.fromTo(
          number,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: muse, start: 'top 75%' },
          }
        );

        // Eyebrow + label stagger
        gsap.fromTo(
          [eyebrow, label].filter(Boolean),
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: muse, start: 'top 75%' },
          }
        );

        // Huge italic name — split-letter reveal
        gsap.fromTo(
          nameLetters,
          { yPercent: 110, rotate: 8 },
          {
            yPercent: 0,
            rotate: 0,
            duration: 1.2,
            stagger: 0.04,
            ease: 'expo.out',
            scrollTrigger: { trigger: muse, start: 'top 70%' },
          }
        );

        // Tagline + description
        gsap.fromTo(
          [tagline, desc].filter(Boolean),
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: muse, start: 'top 65%' },
          }
        );

        // Quote
        gsap.fromTo(
          quote,
          { y: 30, opacity: 0, clipPath: 'inset(0% 100% 0% 0%)' },
          {
            y: 0,
            opacity: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: muse, start: 'top 60%' },
          }
        );

        // Traits stagger
        gsap.fromTo(
          traits,
          { x: 20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: { trigger: muse, start: 'top 60%' },
          }
        );

        // Palette swatches pop in
        gsap.fromTo(
          swatches,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.07,
            ease: 'back.out(1.8)',
            scrollTrigger: { trigger: muse, start: 'top 60%' },
          }
        );

        // Piece reveal
        gsap.fromTo(
          piece,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: muse, start: 'top 55%' },
          }
        );

        // Background color morph on the root section
        gsap.to(scope, {
          backgroundColor: MUSAS[i].bg,
          ease: 'none',
          scrollTrigger: {
            trigger: muse,
            start: 'top 50%',
            end: 'bottom 50%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // ── Outro ──
      gsap.fromTo(
        '.musas-outro__letter',
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          stagger: 0.025,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.musas-outro', start: 'top 80%' },
        }
      );
      gsap.fromTo(
        '.musas-outro__names span',
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.07,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.musas-outro__names', start: 'top 85%' },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="musas" id="musas">
      {/* ── Intro ── */}
      <div className="musas-intro">
        <div className="musas-intro__wrap">
          <div className="musas-intro__top">
            <span className="musas-intro__label">
              <span className="musas-intro__dot" />
              The Muses · Portraits
            </span>
            <span className="musas-intro__tag">Chapter IV · SS26</span>
          </div>

          <h2 className="musas-intro__heading">
            <span className="musas-intro__line">
              <span className="musas-intro__line-inner">{splitLetters('Four')}</span>
            </span>
            <span className="musas-intro__line">
              <em className="musas-intro__line-inner musas-intro__line-inner--accent">
                {splitLetters('Destinies.')}
              </em>
            </span>
          </h2>

          <p className="musas-intro__lead">
            Because the atelier doesn't live until a woman inhabits it. Four
            archetypes, four lights, a single conversation with material —
            portraits of the ones who make each stitch breathe.
          </p>

          <dl className="musas-intro__meta">
            <div className="musas-intro__meta-row">
              <dt>Cast</dt>
              <dd>Romantic · Sovereign · Ethereal · Insurgent</dd>
            </div>
            <div className="musas-intro__meta-row">
              <dt>Direction</dt>
              <dd>Isabel Stelar</dd>
            </div>
            <div className="musas-intro__meta-row">
              <dt>Published</dt>
              <dd>March 2026 · Spring Edition</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* ── Muses (stacked 100vh) ── */}
      {MUSAS.map((muse, i) => (
        <article
          key={i}
          className={`musa musa--${muse.layout}`}
          style={{ '--muse-bg': muse.bg }}
        >
          <div className="musa__inner">
            {/* Image column */}
            <div className="musa__image-col">
              <div className="musa__image-frame">
                <img src={muse.image} alt={muse.name} className="musa__image" />
                <div className="musa__image-grain" />
                <div className="musa__image-corners" aria-hidden="true">
                  <span /><span /><span /><span />
                </div>
                <div className="musa__image-label">
                  <span className="musa__image-label-dot" />
                  <span>Fig. {muse.roman}</span>
                  <span>·</span>
                  <span>{muse.name}</span>
                </div>
              </div>

              <span className="musa__number" aria-hidden="true">
                {muse.number}
              </span>

              <div className="musa__muse-card">
                <span className="musa__muse-line" />
                <div className="musa__muse-text">
                  <span className="musa__muse-name">{muse.museName}</span>
                  <span className="musa__muse-origin">{muse.museOrigin}</span>
                </div>
              </div>
            </div>

            {/* Content column */}
            <div className="musa__content-col">
              <span className="musa__eyebrow">
                <span className="musa__eyebrow-line" />
                {muse.archetype}
              </span>

              <h3 className="musa__name">
                <span className="musa__label">{muse.label}</span>
                <em className="musa__name-main">{splitLetters(muse.name)}</em>
              </h3>

              <span className="musa__tagline">— {muse.tagline}</span>

              <p className="musa__description">{muse.description}</p>

              <blockquote className="musa__quote">
                <span className="musa__quote-mark" aria-hidden="true">“</span>
                <p className="musa__quote-body">{muse.quote}</p>
              </blockquote>

              <dl className="musa__traits">
                {muse.traits.map((t, j) => (
                  <div key={j} className="musa__trait">
                    <dt>{t.label}</dt>
                    <dd>{t.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="musa__palette">
                <span className="musa__palette-label">Palette</span>
                <div className="musa__palette-swatches">
                  {muse.palette.map((c, j) => (
                    <span
                      key={j}
                      className="musa__palette-swatch"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              <a href="#" className="musa__piece">
                <span className="musa__piece-label">She wears</span>
                <span className="musa__piece-name">{muse.piece}</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>
          </div>
        </article>
      ))}

      {/* ── Outro — four names unite ── */}
      <div className="musas-outro">
        <div className="musas-outro__wrap">
          <span className="musas-outro__eyebrow">
            <span className="musas-outro__rule" />
            Four · One
            <span className="musas-outro__rule" />
          </span>

          <h3 className="musas-outro__heading">
            {'Four women, one vision.'.split('').map((c, i) => (
              <span key={i} className="musas-outro__letter">
                {c === ' ' ? '\u00A0' : c}
              </span>
            ))}
          </h3>

          <div className="musas-outro__names">
            <span>Romántica</span>
            <span className="musas-outro__dot">✦</span>
            <span>Soberana</span>
            <span className="musas-outro__dot">✦</span>
            <span>Etérea</span>
            <span className="musas-outro__dot">✦</span>
            <span>Insurgente</span>
          </div>

          <p className="musas-outro__sign">Atelier Stelar · SS26 Portraits</p>
        </div>
      </div>
    </section>
  );
}

export default Musas;
