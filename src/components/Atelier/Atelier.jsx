import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

import img1 from '../../assets/images/hero-main.jpg';
import img2 from '../../assets/images/hero-02.jpg';
import img3 from '../../assets/images/hero-03.jpg';

// Placeholders deterministas vía picsum.photos (cambian por seed, estables entre reloads).
// TIP: reemplaza estas URLs con imágenes editoriales reales — p.ej. de Unsplash/Pexels
// (descárgalas a /assets/images/atelier/ e importa como los imgs de arriba).
const SCENE_IMAGES = {
  boceto:  'https://picsum.photos/seed/stelar-atelier-boceto/900/1100',
  hilos:   'https://picsum.photos/seed/stelar-atelier-hilos/900/1100',
  corte:   'https://picsum.photos/seed/stelar-atelier-corte/900/1100',
  costura: 'https://picsum.photos/seed/stelar-atelier-costura/900/1100',
  alma:    'https://picsum.photos/seed/stelar-atelier-alma/900/1100',
};

const SCENES = [
  {
    number: '01',
    roman: 'I',
    act: 'Act One',
    word: 'Sketch',
    subtitle: 'The first gesture',
    duration: 'iii weeks',
    timeMark: '08:47 · North Atelier',
    quote:
      'A well-drawn line contains a thousand possible garments. The sketch is not a plan — it is a conversation with what does not yet exist.',
    quoteAuthor: 'Isabel Stelar',
    quoteRole: 'Creative Director',
    description:
      'Everything is born on paper. A stroke, a line, the silhouette that does not yet exist. Here patience becomes possibility, and every idea finds its first form on the absolute whiteness.',
    stages: [
      { n: '01', label: 'Silhouette research' },
      { n: '02', label: 'Palette and inspiring material' },
      { n: '03', label: 'Exploratory sketches' },
      { n: '04', label: 'Final numbered drawings' },
    ],
    meta: [
      { label: 'Duration', value: '3 weeks' },
      { label: 'Studio', value: 'Atelier · Bucaramanga' },
      { label: 'Tools', value: 'Graphite · Watercolor' },
      { label: 'Volume', value: '~40 sketches' },
    ],
    tags: ['research', 'palette', 'silhouette', 'composition'],
    bg: '#FBF6F2',
    svg: 'sketch',
    image: SCENE_IMAGES.boceto,
    imageCaption: 'Studio · Bucaramanga North',
    icon: 'pencil',
    tint: 'rgba(180, 140, 110, 0.12)',
    filter: 'sepia(0.2) saturate(0.85) contrast(1.05)',
  },
  {
    number: '02',
    roman: 'II',
    act: 'Act Two',
    word: 'Threads',
    subtitle: 'The raw material',
    duration: 'ii weeks',
    timeMark: '10:22 · Material Table',
    quote:
      'Italian silk sings when you touch it. Belgian linen keeps silent. Choosing a fabric is choosing a voice that will live on the skin.',
    quoteAuthor: 'Marie Dubois',
    quoteRole: 'Fabric Director',
    description:
      'We select only the noblest fibers. Italian silk, Belgian linen, Mongolian cashmere. Each texture is chosen for its ability to tell a story on the skin that will wear it.',
    stages: [
      { n: '01', label: 'Origin selection' },
      { n: '02', label: 'Drape and weight tests' },
      { n: '03', label: 'Chromatic approval' },
      { n: '04', label: 'Final material catalog' },
    ],
    meta: [
      { label: 'Origin', value: 'Como · Brussels · Ulaanbaatar' },
      { label: 'Suppliers', value: '12 exclusive mills' },
      { label: 'Traceability', value: 'Certified · 100%' },
      { label: 'Swatches', value: '~120 variants' },
    ],
    tags: ['silk', 'linen', 'cashmere', 'traceability'],
    bg: '#F5E1DB',
    svg: 'threads',
    image: SCENE_IMAGES.hilos,
    imageCaption: 'Material Table · Como',
    icon: 'spool',
    tint: 'rgba(196, 151, 123, 0.14)',
    filter: 'saturate(1.12) contrast(1.02) brightness(1.02)',
  },
  {
    number: '03',
    roman: 'III',
    act: 'Act Three',
    word: 'Cut',
    subtitle: 'The precision',
    duration: 'i week',
    timeMark: '14:03 · Pattern Table',
    quote:
      'In the pattern there are no second chances. One line, one scissor stroke, one destiny. That is why we measure seven times before cutting once.',
    quoteAuthor: 'Rafael Mendoza',
    quoteRole: 'Master Patternmaker',
    description:
      'The most irreversible moment. Each pattern is drawn by hand, fitted to the body, perfected a thousand times before the first cut. No margin for error, no space for doubt.',
    stages: [
      { n: '01', label: 'Patternmaking on kraft paper' },
      { n: '02', label: 'Moulage on mannequin' },
      { n: '03', label: 'First fitting and adjustment' },
      { n: '04', label: 'Final cut on fabric' },
    ],
    meta: [
      { label: 'Technique', value: 'Hand patternmaking · Moulage' },
      { label: 'Fittings', value: '7 tests per model' },
      { label: 'Tolerance', value: '1 millimeter' },
      { label: 'Experience', value: '42 years of craft' },
    ],
    tags: ['pattern', 'moulage', 'precision', 'geometry'],
    bg: '#E6D5CB',
    svg: 'cut',
    image: SCENE_IMAGES.corte,
    imageCaption: 'Pattern Table',
    icon: 'scissors',
    tint: 'rgba(46, 34, 32, 0.22)',
    filter: 'contrast(1.15) grayscale(0.3) brightness(0.95)',
  },
  {
    number: '04',
    roman: 'IV',
    act: 'Act Four',
    word: 'Stitch',
    subtitle: 'The hands that transform',
    duration: 'viii weeks',
    timeMark: '16:38 · Needle Room',
    quote:
      'An invisible stitch is an act of faith. No one will see it, but the garment will always know it is there. Heritage is passed down in silence.',
    quoteAuthor: 'Celeste Ayala',
    quoteRole: 'Head of Atelier',
    description:
      'Fourteen artisans dedicate hundreds of hours to each piece. Invisible stitches, embroideries measured in months, centuries of heritage contained in every silent, exact gesture.',
    stages: [
      { n: '01', label: 'Inner assembly' },
      { n: '02', label: 'Luneville embroidery' },
      { n: '03', label: 'Invisible finishings' },
      { n: '04', label: 'Final fitting on body' },
    ],
    meta: [
      { label: 'Masters', value: '14 artisans' },
      { label: 'Hours', value: '80 — 1,200 per piece' },
      { label: 'Techniques', value: 'Haute couture · Luneville' },
      { label: 'Threads', value: '~2 km per gown' },
    ],
    tags: ['stitching', 'embroidery', 'luneville', 'craft'],
    bg: '#EFE2D9',
    svg: 'stitch',
    image: SCENE_IMAGES.costura,
    imageCaption: 'Needle Room · Atelier',
    icon: 'needle',
    tint: 'rgba(176, 122, 106, 0.18)',
    filter: 'sepia(0.25) saturate(0.9) contrast(1.06)',
  },
  {
    number: '05',
    roman: 'V',
    act: 'Final Act',
    word: 'Soul',
    subtitle: 'The final instant',
    duration: 'an instant',
    timeMark: '18:56 · Delivery Salon',
    quote:
      'When I sign a piece, it no longer belongs to me. It becomes another woman, another story. And that is what I always dreamed of.',
    quoteAuthor: 'Isabel Stelar',
    quoteRole: 'Creative Director',
    description:
      'When the garment is finally born, it is no longer just fabric. It is a silent conversation between the one who created it and the one who will wear it. Living art waiting for its moment, numbered and signed by hand.',
    stages: [
      { n: '01', label: 'Final quality control' },
      { n: '02', label: 'Hand signature and numbering' },
      { n: '03', label: 'Origin box packaging' },
      { n: '04', label: 'Ceremonial delivery' },
    ],
    meta: [
      { label: 'Signature', value: 'Numbered · Ink-signed' },
      { label: 'Delivery', value: 'Origin box · Handwritten' },
      { label: 'Warranty', value: 'Lifetime' },
      { label: 'Certificate', value: 'Unique authenticity' },
    ],
    tags: ['signature', 'delivery', 'origin', 'legacy'],
    bg: '#FBF6F2',
    svg: 'soul',
    image: SCENE_IMAGES.alma,
    imageCaption: 'Delivery Salon',
    icon: 'seal',
    tint: 'rgba(196, 151, 123, 0.10)',
    filter: 'brightness(1.06) saturate(1.1) contrast(1.02)',
  },
];

const splitLetters = (text) =>
  text.split('').map((char, i) => (
    <span key={i} className="atl-letter">
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

function SceneIcon({ type }) {
  const common = {
    viewBox: '0 0 32 32',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };
  switch (type) {
    case 'pencil':
      return (
        <svg {...common} aria-hidden="true">
          <path d="M4 28l1.2-4.2L22 7l3 3L8.2 26.8 4 28z" />
          <path d="M18.5 10.5l3 3" />
          <path d="M5.2 23.8l3 3" />
          <path d="M24 6l-3-3" />
        </svg>
      );
    case 'spool':
      return (
        <svg {...common} aria-hidden="true">
          <rect x="9" y="4" width="14" height="24" rx="2" />
          <line x1="9" y1="10" x2="23" y2="10" />
          <line x1="9" y1="22" x2="23" y2="22" />
          <path d="M16 11c-2.6 2.4-2.6 8.6 0 10" />
          <path d="M16 11c2.6 2.4 2.6 8.6 0 10" />
          <circle cx="26" cy="6" r="1.2" />
        </svg>
      );
    case 'scissors':
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="8" cy="22" r="4" />
          <circle cx="24" cy="22" r="4" />
          <line x1="10.8" y1="19.2" x2="28" y2="2" />
          <line x1="21.2" y1="19.2" x2="4" y2="2" />
          <line x1="16" y1="14" x2="16" y2="18" />
        </svg>
      );
    case 'needle':
      return (
        <svg {...common} aria-hidden="true">
          <path d="M4 28L22 10" />
          <path d="M22 10l6-6" />
          <circle cx="24" cy="8" r="1.6" />
          <path d="M28 4c-4 3-7 5-8 7" />
          <path d="M8 26q2-1 4 0" />
        </svg>
      );
    case 'seal':
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="16" cy="16" r="12" />
          <circle cx="16" cy="16" r="8" />
          <path d="M10 16l4 4 8-9" />
          <circle cx="16" cy="16" r="1.2" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}

function SceneVisual({ type }) {
  switch (type) {
    case 'sketch':
      return (
        <svg viewBox="0 0 400 400" className="atl-scene__svg" aria-hidden="true">
          <path className="atl-svg-draw" d="M40 220 Q 120 120 220 180 T 380 200" />
          <path className="atl-svg-draw" d="M60 260 Q 150 170 260 240 T 380 250" />
          <path className="atl-svg-draw" d="M90 160 Q 170 90 260 150" />
          <path className="atl-svg-draw" d="M130 300 Q 200 220 300 280" />
          <circle className="atl-svg-draw" cx="340" cy="120" r="18" />
          <circle className="atl-svg-draw" cx="340" cy="120" r="28" />
        </svg>
      );
    case 'threads':
      return (
        <svg viewBox="0 0 400 400" className="atl-scene__svg" aria-hidden="true">
          {Array.from({ length: 10 }).map((_, i) => {
            const x = 40 + i * 36;
            const topY = 40 + ((i * 17) % 50);
            const botY = 360 - ((i * 11) % 40);
            return (
              <line
                key={i}
                className="atl-svg-draw"
                x1={x}
                y1={topY}
                x2={x}
                y2={botY}
              />
            );
          })}
          <line className="atl-svg-draw atl-svg-draw--weft" x1="30" y1="200" x2="370" y2="210" />
        </svg>
      );
    case 'cut':
      return (
        <svg viewBox="0 0 400 400" className="atl-scene__svg" aria-hidden="true">
          <line className="atl-svg-draw" x1="40" y1="40" x2="360" y2="360" />
          <line className="atl-svg-draw" x1="360" y1="40" x2="40" y2="360" />
          <rect className="atl-svg-draw" x="120" y="120" width="160" height="160" />
          <line className="atl-svg-draw" x1="40" y1="200" x2="120" y2="200" />
          <line className="atl-svg-draw" x1="280" y1="200" x2="360" y2="200" />
          <line className="atl-svg-draw" x1="200" y1="40" x2="200" y2="120" />
          <line className="atl-svg-draw" x1="200" y1="280" x2="200" y2="360" />
        </svg>
      );
    case 'stitch':
      return (
        <svg viewBox="0 0 400 400" className="atl-scene__svg" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, row) => {
            const y = 80 + row * 60;
            return (
              <g key={row}>
                {Array.from({ length: 10 }).map((_, i) => {
                  const x = 40 + i * 36;
                  return (
                    <line
                      key={i}
                      className="atl-svg-draw"
                      x1={x}
                      y1={y}
                      x2={x + 20}
                      y2={y}
                    />
                  );
                })}
              </g>
            );
          })}
          <path className="atl-svg-draw atl-svg-draw--thread" d="M40 60 Q 100 20 200 60 T 360 60" />
        </svg>
      );
    case 'soul':
      return (
        <svg viewBox="0 0 400 400" className="atl-scene__svg" aria-hidden="true">
          <path
            className="atl-svg-draw atl-svg-draw--signature"
            d="M60 240 C 100 120, 180 360, 240 200 S 340 100, 320 280 Q 290 340, 240 320"
          />
          <circle className="atl-svg-draw" cx="340" cy="290" r="3" />
          <circle className="atl-svg-draw" cx="200" cy="140" r="60" />
          <circle className="atl-svg-draw" cx="200" cy="140" r="90" />
        </svg>
      );
    default:
      return null;
  }
}

function Atelier() {
  const ref = useRef(null);

  useGSAP(
    () => {
      const scope = ref.current;

      // ── Intro (playbill) reveals ──
      gsap.fromTo(
        '.atl-intro__banner-item, .atl-intro__flourish, .atl-intro__manifest, .atl-intro__program, .atl-intro__cue',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.atl-intro', start: 'top 82%' },
        }
      );

      gsap.fromTo(
        '.atl-intro__title-caps span',
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.04,
          scrollTrigger: { trigger: '.atl-intro__title-block', start: 'top 85%' },
        }
      );

      gsap.fromTo(
        '.atl-intro__title-sub',
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 0.5,
          scrollTrigger: { trigger: '.atl-intro__title-block', start: 'top 85%' },
        }
      );

      gsap.fromTo(
        '.atl-intro__program-row',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.atl-intro__program', start: 'top 80%' },
        }
      );

      // ── Desktop pinned horizontal ──
      const mm = gsap.matchMedia();

      mm.add('(min-width: 900px)', () => {
        const panels = gsap.utils.toArray('.atl-scene', scope);
        const track = scope.querySelector('.atl-track');
        if (!panels.length || !track) return;

        const totalPanels = panels.length;

        const horizTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.atl-stage',
            start: 'top top',
            end: () => `+=${(totalPanels - 1) * window.innerHeight * 1.05}`,
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        horizTl.to(track, {
          xPercent: -100 * ((totalPanels - 1) / totalPanels),
          ease: 'none',
        });

        gsap.to('.atl-ui__progress-fill', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.atl-stage',
            start: 'top top',
            end: () => `+=${(totalPanels - 1) * window.innerHeight * 1.05}`,
            scrub: true,
          },
        });

        panels.forEach((panel, i) => {
          const topbar = panel.querySelector('.atl-scene__topbar');
          const letters = panel.querySelectorAll('.atl-scene__word .atl-letter');
          const eyebrow = panel.querySelector('.atl-scene__eyebrow');
          const subtitle = panel.querySelector('.atl-scene__subtitle');
          const quote = panel.querySelector('.atl-scene__quote');
          const desc = panel.querySelector('.atl-scene__desc');
          const stageItems = panel.querySelectorAll('.atl-scene__stage-row');
          const metaRows = panel.querySelectorAll('.atl-scene__meta-row');
          const tags = panel.querySelectorAll('.atl-scene__tag');
          const cta = panel.querySelector('.atl-scene__cta');
          const roman = panel.querySelector('.atl-scene__frame-roman');
          const visualMeta = panel.querySelectorAll('.atl-scene__visual-meta');
          const svgPaths = panel.querySelectorAll('.atl-svg-draw');
          const frame = panel.querySelector('.atl-scene__frame');
          const frameImage = panel.querySelector('.atl-scene__image');
          const frameIcon = panel.querySelector('.atl-scene__frame-icon');
          const frameTag = panel.querySelector('.atl-scene__frame-tag');

          if (i === 0) {
            // Panel 0 reveals as the stage enters the viewport (before pin engages)
            gsap.timeline({
              scrollTrigger: {
                trigger: '.atl-stage',
                start: 'top 85%',
                end: 'top 15%',
                scrub: 1,
              },
            })
              .from(topbar, { y: -20, opacity: 0 }, 0)
              .from(eyebrow, { y: 24, opacity: 0 }, 0)
              .from(letters, { yPercent: 110, rotate: 6, stagger: 0.03 }, 0.05)
              .from(subtitle, { y: 20, opacity: 0 }, 0.1)
              .from(quote, { y: 24, opacity: 0 }, 0.15)
              .from(desc, { y: 20, opacity: 0 }, 0.2)
              .from(stageItems, { x: -16, opacity: 0, stagger: 0.04 }, 0.25)
              .from(metaRows, { x: 16, opacity: 0, stagger: 0.04 }, 0.28)
              .from(tags, { y: 12, opacity: 0, stagger: 0.03 }, 0.35)
              .from(cta, { x: -16, opacity: 0 }, 0.4)
              .from(frame, { y: 40, opacity: 0, scale: 0.96 }, 0)
              .from(frameImage, { scale: 1.12 }, 0)
              .from(roman, { scale: 0.8, opacity: 0 }, 0.1)
              .from(frameIcon, { scale: 0, rotate: -20, opacity: 0 }, 0.25)
              .from(frameTag, { y: 14, opacity: 0 }, 0.3)
              .from(visualMeta, { y: 16, opacity: 0, stagger: 0.08 }, 0.15);
          } else {
            // Remaining panels reveal via containerAnimation as the track scrolls
            gsap.timeline({
              scrollTrigger: {
                trigger: panel,
                containerAnimation: horizTl,
                start: 'left 90%',
                end: 'left 10%',
                toggleActions: 'play none none reverse',
              },
            })
              .from(topbar, { y: -20, opacity: 0, duration: 0.6, ease: 'power3.out' })
              .from(eyebrow, { y: 24, opacity: 0, duration: 0.6, ease: 'power3.out' }, '<0.1')
              .from(
                letters,
                { yPercent: 110, rotate: 6, duration: 0.9, stagger: 0.035, ease: 'expo.out' },
                '<0.05'
              )
              .from(subtitle, { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' }, '<0.3')
              .from(quote, { y: 24, opacity: 0, duration: 0.7, ease: 'power2.out' }, '<0.1')
              .from(desc, { y: 20, opacity: 0, duration: 0.7, ease: 'power2.out' }, '<0.1')
              .from(
                stageItems,
                { x: -16, opacity: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out' },
                '<0.1'
              )
              .from(
                metaRows,
                { x: 16, opacity: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out' },
                '<0.05'
              )
              .from(
                tags,
                { y: 12, opacity: 0, duration: 0.45, stagger: 0.04, ease: 'power2.out' },
                '<0.15'
              )
              .from(cta, { x: -16, opacity: 0, duration: 0.6, ease: 'power2.out' }, '<0.1')
              .from(roman, { scale: 0.75, opacity: 0, duration: 1.1, ease: 'power3.out' }, 0)
              .from(
                visualMeta,
                { y: 16, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out' },
                '<0.4'
              );
          }

          if (svgPaths.length) {
            svgPaths.forEach((p) => {
              const len = p.getTotalLength ? p.getTotalLength() : 300;
              gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
            });

            const svgTrigger = i === 0
              ? {
                  trigger: '.atl-stage',
                  start: 'top 80%',
                  end: 'top 20%',
                  scrub: 1,
                }
              : {
                  trigger: panel,
                  containerAnimation: horizTl,
                  start: 'left 85%',
                  end: 'left 15%',
                  toggleActions: 'play none none reverse',
                };

            gsap.to(svgPaths, {
              strokeDashoffset: 0,
              duration: 1.4,
              ease: 'power2.out',
              stagger: 0.1,
              scrollTrigger: svgTrigger,
            });
          }

          gsap.to('.atl-stage', {
            backgroundColor: SCENES[i].bg,
            duration: 0.6,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horizTl,
              start: 'left 60%',
              end: 'left 40%',
              toggleActions: 'play none none reverse',
            },
          });

          ScrollTrigger.create({
            trigger: panel,
            containerAnimation: horizTl,
            start: 'left 50%',
            end: 'right 50%',
            onToggle: (self) => {
              if (self.isActive) {
                const counter = scope.querySelector('.atl-ui__counter-current');
                if (counter) counter.textContent = SCENES[i].number;
                const name = scope.querySelector('.atl-ui__counter-name');
                if (name) name.textContent = SCENES[i].word;
              }
            },
          });
        });
      });

      // ── Mobile stacked ──
      mm.add('(max-width: 899px)', () => {
        gsap.utils.toArray('.atl-scene-mobile', scope).forEach((scene) => {
          const letters = scene.querySelectorAll('.atl-letter');
          const others = scene.querySelectorAll(
            '.atl-scene__topbar, .atl-scene__eyebrow, .atl-scene__subtitle, .atl-scene__quote, .atl-scene__desc, .atl-scene__stage-row, .atl-scene__meta-row, .atl-scene__tag'
          );

          gsap.timeline({
            scrollTrigger: {
              trigger: scene,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          })
            .from(letters, {
              yPercent: 110,
              duration: 0.9,
              stagger: 0.03,
              ease: 'expo.out',
            })
            .from(
              others,
              { y: 24, opacity: 0, duration: 0.7, stagger: 0.05, ease: 'power2.out' },
              '<0.15'
            );
        });
      });

      // ── Outro reveal ──
      gsap.fromTo(
        '.atl-outro__quote-letter',
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.025,
          scrollTrigger: { trigger: '.atl-outro', start: 'top 78%' },
        }
      );
      gsap.fromTo(
        '.atl-outro__sign',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.atl-outro', start: 'top 80%' },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="atelier" id="atelier">
      {/* ═══ INTRO — PLAYBILL ═══ */}
      <div className="atl-intro">
        <div className="atl-intro__frame">
          {/* Top banner */}
          <div className="atl-intro__banner atl-intro__banner--top">
            <span className="atl-intro__banner-item">
              <span className="atl-intro__banner-mark">✦</span>
              Official Program · Prima MMXXVI
              <span className="atl-intro__banner-mark">✦</span>
            </span>
            <span className="atl-intro__banner-item atl-intro__banner-item--right">
              Atelier Stelar · Bucaramanga
            </span>
          </div>

          {/* Central title block */}
          <div className="atl-intro__title-block">
            <div className="atl-intro__flourish atl-intro__flourish--top">
              <span className="atl-intro__rule" />
              <span className="atl-intro__asterisk">✦</span>
              <span className="atl-intro__rule" />
            </div>

            <h2 className="atl-intro__heading">
              <span className="atl-intro__title-caps">
                <span>E</span><span>L</span>
                <span className="atl-intro__title-gap">&nbsp;&nbsp;</span>
                <span>A</span><span>T</span><span>E</span><span>L</span><span>I</span><span>E</span><span>R</span>
              </span>
              <em className="atl-intro__title-sub">a play in five acts</em>
            </h2>

            <div className="atl-intro__flourish atl-intro__flourish--bottom">
              <span className="atl-intro__rule" />
              <span className="atl-intro__asterisk">✦</span>
              <span className="atl-intro__rule atl-intro__rule--short" />
              <span className="atl-intro__asterisk atl-intro__asterisk--small">·</span>
              <span className="atl-intro__rule atl-intro__rule--short" />
              <span className="atl-intro__asterisk">✦</span>
              <span className="atl-intro__rule" />
            </div>
          </div>

          {/* Manifest pull quote */}
          <blockquote className="atl-intro__manifest">
            «Five moments where thread and hand conspire to give birth
            to what never was. A silent journey through the craft that
            turns a gesture into a legacy.»
          </blockquote>

          {/* Table of Acts */}
          <div className="atl-intro__program">
            <div className="atl-intro__program-head">
              <span className="atl-intro__program-asterisk">✦</span>
              <span className="atl-intro__program-heading">Table of Acts</span>
              <span className="atl-intro__program-asterisk">✦</span>
            </div>

            <ol className="atl-intro__program-list">
              {SCENES.map((scene, i) => (
                <li key={i} className="atl-intro__program-row">
                  <span className="atl-intro__program-roman">{scene.roman}</span>
                  <div className="atl-intro__program-text">
                    <span className="atl-intro__program-word">{scene.word}</span>
                    <span className="atl-intro__program-sub">{scene.subtitle}</span>
                  </div>
                  <span className="atl-intro__program-dots" aria-hidden="true" />
                  <span className="atl-intro__program-dur">{scene.duration}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Cue */}
          <div className="atl-intro__cue">
            <span className="atl-intro__cue-rule" />
            <span className="atl-intro__cue-text">
              Continuous show · Scroll to begin
            </span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
            <span className="atl-intro__cue-rule" />
          </div>

          {/* Bottom banner */}
          <div className="atl-intro__banner atl-intro__banner--bottom">
            <span className="atl-intro__banner-item">Bucaramanga · MMXXVI</span>
            <span className="atl-intro__banner-sep">·</span>
            <span className="atl-intro__banner-item">Dir. Isabel Stelar</span>
            <span className="atl-intro__banner-sep">·</span>
            <span className="atl-intro__banner-item">Edition · 96 Pieces</span>
          </div>
        </div>
      </div>

      {/* ═══ DESKTOP PINNED HORIZONTAL ═══ */}
      <div className="atl-stage" style={{ backgroundColor: SCENES[0].bg }}>
        <div className="atl-track">
          {SCENES.map((scene, i) => (
            <article key={i} className="atl-scene">
              {/* Top meta bar */}
              <div className="atl-scene__topbar">
                <span className="atl-scene__timestamp">
                  <span className="atl-scene__timestamp-dot" />
                  {scene.timeMark}
                </span>
                <span className="atl-scene__figure">
                  Figure {scene.roman} · Chapter {scene.number}/05
                </span>
              </div>

              <div className="atl-scene__wrap">
                {/* Content column */}
                <div className="atl-scene__content">
                  <div className="atl-scene__eyebrow">
                    <span className="atl-scene__eyebrow-roman">{scene.roman}</span>
                    <span className="atl-scene__eyebrow-line" />
                    <span className="atl-scene__eyebrow-act">{scene.act}</span>
                  </div>

                  <h3 className="atl-scene__word">{splitLetters(scene.word)}</h3>
                  <span className="atl-scene__subtitle">— {scene.subtitle}</span>

                  {/* Pull quote */}
                  <blockquote className="atl-scene__quote">
                    <span className="atl-scene__quote-mark">“</span>
                    <p className="atl-scene__quote-body">{scene.quote}</p>
                    <footer className="atl-scene__quote-foot">
                      <span className="atl-scene__quote-line" />
                      <span className="atl-scene__quote-author">{scene.quoteAuthor}</span>
                      <span className="atl-scene__quote-role">· {scene.quoteRole}</span>
                    </footer>
                  </blockquote>

                  {/* Description */}
                  <p className="atl-scene__desc">{scene.description}</p>

                  {/* Two-column: Etapas & Datos */}
                  <div className="atl-scene__details">
                    <div className="atl-scene__stages">
                      <h4 className="atl-scene__details-title">
                        <span>Stages</span>
                        <span className="atl-scene__details-count">
                          {scene.stages.length} phases
                        </span>
                      </h4>
                      <ol className="atl-scene__stages-list">
                        {scene.stages.map((s, j) => (
                          <li key={j} className="atl-scene__stage-row">
                            <span className="atl-scene__stage-n">{s.n}</span>
                            <span className="atl-scene__stage-label">{s.label}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="atl-scene__data">
                      <h4 className="atl-scene__details-title">
                        <span>Technical Data</span>
                        <span className="atl-scene__details-count">{scene.duration}</span>
                      </h4>
                      <dl className="atl-scene__meta">
                        {scene.meta.map((m, j) => (
                          <div key={j} className="atl-scene__meta-row">
                            <dt>{m.label}</dt>
                            <dd>{m.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>

                  {/* Tags + CTA */}
                  <div className="atl-scene__footer">
                    <div className="atl-scene__tags">
                      {scene.tags.map((t, j) => (
                        <span key={j} className="atl-scene__tag">#{t}</span>
                      ))}
                    </div>
                    <a href="#" className="atl-scene__cta">
                      <span>Enter this act</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Visual column — image frame with icon + roman accent */}
                <div
                  className="atl-scene__visual"
                  style={{ '--scene-tint': scene.tint, '--scene-filter': scene.filter }}
                >
                  <div className="atl-scene__visual-meta atl-scene__visual-meta--top">
                    <span>Fig. {scene.roman}</span>
                    <span className="atl-scene__visual-meta-dot">·</span>
                    <span>{scene.word.toLowerCase()}</span>
                  </div>

                  <div className="atl-scene__frame">
                    <img
                      src={scene.image}
                      alt={scene.word}
                      className="atl-scene__image"
                    />
                    <div className="atl-scene__frame-tint" aria-hidden="true" />
                    <div className="atl-scene__frame-grain" aria-hidden="true" />

                    <div className="atl-scene__frame-svg" aria-hidden="true">
                      <SceneVisual type={scene.svg} />
                    </div>

                    <div className="atl-scene__frame-corners" aria-hidden="true">
                      <span /><span /><span /><span />
                    </div>

                    <span className="atl-scene__frame-roman" aria-hidden="true">
                      {scene.roman}
                    </span>

                    <div className="atl-scene__frame-icon" aria-hidden="true">
                      <SceneIcon type={scene.icon} />
                    </div>

                    <div className="atl-scene__frame-tag">
                      <span className="atl-scene__frame-tag-dot" />
                      <span>{scene.imageCaption}</span>
                    </div>
                  </div>

                  <div className="atl-scene__visual-meta atl-scene__visual-meta--bottom">
                    <span>Scale · 1:1</span>
                    <span className="atl-scene__visual-meta-dot">·</span>
                    <span>MMXXVI</span>
                    <span className="atl-scene__visual-meta-dot">·</span>
                    <span>Process</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Fixed UI overlays */}
        <div className="atl-ui atl-ui--top">
          <span className="atl-ui__brand">
            <span className="atl-ui__brand-star">✦</span>
            Stelar · Atelier
          </span>
          <span className="atl-ui__title">The Process SS26</span>
        </div>

        <div className="atl-ui atl-ui--bottom">
          <div className="atl-ui__counter">
            <span className="atl-ui__counter-current">01</span>
            <span className="atl-ui__counter-sep">/</span>
            <span className="atl-ui__counter-total">05</span>
            <span className="atl-ui__counter-divider">—</span>
            <span className="atl-ui__counter-name">Boceto</span>
          </div>
          <div className="atl-ui__progress">
            <div className="atl-ui__progress-bar">
              <div className="atl-ui__progress-fill" />
            </div>
          </div>
          <div className="atl-ui__hint">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
            <span>Continue</span>
          </div>
        </div>
      </div>

      {/* ═══ MOBILE STACKED ═══ */}
      <div className="atl-mobile">
        {SCENES.map((scene, i) => (
          <article
            key={i}
            className="atl-scene-mobile"
            style={{ '--scene-tint': scene.tint, '--scene-filter': scene.filter }}
          >
            <div className="atl-scene__topbar">
              <span className="atl-scene__timestamp">
                <span className="atl-scene__timestamp-dot" />
                {scene.timeMark}
              </span>
              <span className="atl-scene__figure">Fig. {scene.roman} · {scene.number}/05</span>
            </div>

            <div className="atl-scene__frame">
              <img src={scene.image} alt={scene.word} className="atl-scene__image" />
              <div className="atl-scene__frame-tint" />
              <div className="atl-scene__frame-corners">
                <span /><span /><span /><span />
              </div>
              <span className="atl-scene__frame-roman">{scene.roman}</span>
              <div className="atl-scene__frame-icon">
                <SceneIcon type={scene.icon} />
              </div>
              <div className="atl-scene__frame-tag">
                <span className="atl-scene__frame-tag-dot" />
                <span>{scene.imageCaption}</span>
              </div>
            </div>

            <div className="atl-scene__eyebrow">
              <span className="atl-scene__eyebrow-roman">{scene.roman}</span>
              <span className="atl-scene__eyebrow-line" />
              <span className="atl-scene__eyebrow-act">{scene.act}</span>
            </div>

            <h3 className="atl-scene__word">{splitLetters(scene.word)}</h3>
            <span className="atl-scene__subtitle">— {scene.subtitle}</span>

            <blockquote className="atl-scene__quote">
              <span className="atl-scene__quote-mark">“</span>
              <p className="atl-scene__quote-body">{scene.quote}</p>
              <footer className="atl-scene__quote-foot">
                <span className="atl-scene__quote-line" />
                <span className="atl-scene__quote-author">{scene.quoteAuthor}</span>
                <span className="atl-scene__quote-role">· {scene.quoteRole}</span>
              </footer>
            </blockquote>

            <p className="atl-scene__desc">{scene.description}</p>

            <div className="atl-scene__stages">
              <h4 className="atl-scene__details-title"><span>Stages</span></h4>
              <ol className="atl-scene__stages-list">
                {scene.stages.map((s, j) => (
                  <li key={j} className="atl-scene__stage-row">
                    <span className="atl-scene__stage-n">{s.n}</span>
                    <span className="atl-scene__stage-label">{s.label}</span>
                  </li>
                ))}
              </ol>
            </div>

            <dl className="atl-scene__meta">
              {scene.meta.map((m, j) => (
                <div key={j} className="atl-scene__meta-row">
                  <dt>{m.label}</dt>
                  <dd>{m.value}</dd>
                </div>
              ))}
            </dl>

            <div className="atl-scene__tags">
              {scene.tags.map((t, j) => (
                <span key={j} className="atl-scene__tag">#{t}</span>
              ))}
            </div>
          </article>
        ))}
      </div>

      {/* ═══ OUTRO ═══ */}
      <div className="atl-outro">
        <blockquote className="atl-outro__quote">
          <span className="atl-outro__line">
            <span className="atl-outro__line-inner">
              {'«Every garment, an act'.split('').map((c, i) => (
                <span key={i} className="atl-outro__quote-letter">{c === ' ' ? '\u00A0' : c}</span>
              ))}
            </span>
          </span>
          <span className="atl-outro__line">
            <em className="atl-outro__line-inner">
              {'of love, patience, and precision.»'.split('').map((c, i) => (
                <span key={i} className="atl-outro__quote-letter">{c === ' ' ? '\u00A0' : c}</span>
              ))}
            </em>
          </span>
        </blockquote>
        <div className="atl-outro__sign">
          <span className="atl-outro__sign-line" />
          <div className="atl-outro__sign-text">
            <span className="atl-outro__sign-name">Atelier Stelar</span>
            <span className="atl-outro__sign-place">Bucaramanga · Colombia</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Atelier;
