import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const NAV_COLUMNS = [
  {
    title: 'Atelier',
    links: [
      { label: 'The Process', href: '#atelier' },
      { label: 'The Muses', href: '#musas' },
      { label: 'The Archive', href: '#archivo' },
      { label: 'Manifesto', href: '#manifiesto' },
      { label: 'Heritage', href: '#heritage' },
    ],
  },
  {
    title: 'Collections',
    links: [
      { label: 'Spring SS26', href: '#colecciones' },
      { label: 'Couture Atelier', href: '#couture' },
      { label: 'Essential Wardrobe', href: '#essential' },
      { label: '2025 Archive', href: '#archivo-25' },
      { label: 'Accessories', href: '#accesorios' },
    ],
  },
  {
    title: 'Experience',
    links: [
      { label: 'Private Atelier', href: '#privado' },
      { label: 'Sur Mesure', href: '#medida' },
      { label: 'Personal Styling', href: '#stylist' },
      { label: 'Archive Access', href: '#archive' },
      { label: 'Press & Press Kit', href: '#prensa' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '#privacy' },
      { label: 'Terms', href: '#terms' },
      { label: 'Cookies', href: '#cookies' },
      { label: 'Shipping', href: '#shipping' },
      { label: 'Returns', href: '#returns' },
    ],
  },
];

const SOCIAL = [
  {
    name: 'Instagram',
    handle: '@stelar.atelier',
    href: 'https://instagram.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: 'Pinterest',
    handle: 'stelar_atelier',
    href: 'https://pinterest.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 11.5a4 4 0 118 0c0 3-2 5-4 5-1 0-1.5-.5-1.5-1" />
        <path d="M11 15l-1.5 6" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    handle: '@stelar',
    href: 'https://tiktok.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" />
      </svg>
    ),
  },
  {
    name: 'Spotify',
    handle: 'Atelier Playlist',
    href: 'https://spotify.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M7 9c3.5-1 8-.5 11 1.5" />
        <path d="M7 13c3-1 7-.5 9.5 1" />
        <path d="M8 17c2.5-.8 5-.5 7 .5" />
      </svg>
    ),
  },
];

const LANGS = ['EN', 'ES', 'FR', 'IT'];

function Footer() {
  const ref = useRef(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [year] = useState(new Date().getFullYear());
  const [lang, setLang] = useState('EN');

  useGSAP(
    () => {
      gsap.fromTo(
        '.foot-marquee__item',
        { yPercent: 30, opacity: 0 },
        {
          yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.04,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.foot-marquee', start: 'top 95%' },
        }
      );

      gsap.fromTo(
        '.foot-top__col',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.foot-top', start: 'top 85%' },
        }
      );

      gsap.fromTo(
        '.foot-col',
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.foot-nav', start: 'top 88%' },
        }
      );

      gsap.fromTo(
        '.foot-social__item',
        { scale: 0.6, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.6, stagger: 0.08,
          ease: 'back.out(1.6)',
          scrollTrigger: { trigger: '.foot-social', start: 'top 90%' },
        }
      );
    },
    { scope: ref }
  );

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 4000);
  };

  return (
    <footer ref={ref} className="footer" id="footer">
      {/* ═══ MARQUEE ═══ */}
      <div className="foot-marquee" aria-hidden="true">
        <div className="foot-marquee__track">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="foot-marquee__group">
              <span className="foot-marquee__item">Stelar</span>
              <span className="foot-marquee__dot">✦</span>
              <span className="foot-marquee__item foot-marquee__item--small">Haute Couture</span>
              <span className="foot-marquee__dot">·</span>
              <span className="foot-marquee__item">Stelar</span>
              <span className="foot-marquee__dot">✦</span>
              <span className="foot-marquee__item foot-marquee__item--small">Atelier MMXXVI</span>
              <span className="foot-marquee__dot">·</span>
              <span className="foot-marquee__item">Stelar</span>
              <span className="foot-marquee__dot">✦</span>
              <span className="foot-marquee__item foot-marquee__item--small">Limited Edition</span>
              <span className="foot-marquee__dot">·</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ TOP — Brand + Newsletter ═══ */}
      <div className="foot-top">
        <div className="foot-top__wrap">
          {/* Brand */}
          <div className="foot-top__col foot-brand">
            <div className="foot-brand__mark">
              <span className="foot-brand__star">✦</span>
              <h3 className="foot-brand__name">Stelar</h3>
            </div>
            <span className="foot-brand__tag">Haute Couture · Atelier · MMXXVI</span>
            <p className="foot-brand__desc">
              Haute couture atelier founded in 2026 in Bucaramanga, Colombia.
              Every garment is born in the dialogue between hand and material —
              a unique work, signed and numbered.
            </p>
            <div className="foot-brand__sign">
              <span className="foot-brand__sign-line" />
              <div>
                <span className="foot-brand__sign-name">Isabel Stelar</span>
                <span className="foot-brand__sign-role">Creative Director · Founder</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="foot-top__col foot-news">
            <span className="foot-news__eyebrow">
              <span className="foot-news__dot" />
              The Private List · SS26
            </span>

            <h3 className="foot-news__title">
              Receive the <em>looks</em> first.
            </h3>

            <p className="foot-news__desc">
              Priority access to launches, exclusive lookbooks and atelier
              appointments. Only the essential — never spam.
            </p>

            <form className="foot-news__form" onSubmit={handleSubscribe} aria-describedby="foot-news-hint">
              <label htmlFor="foot-news-email" className="visually-hidden">Email address for newsletter</label>
              <input
                id="foot-news-email"
                type="email"
                name="email"
                className="foot-news__input"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                aria-required="true"
              />
              <button type="submit" className="foot-news__btn">
                <span>{subscribed ? 'Subscribed' : 'Join'}</span>
                {!subscribed && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true" focusable="false">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                )}
              </button>
            </form>

            <span
              className="foot-news__status"
              role="status"
              aria-live="polite"
            >
              {subscribed ? 'Subscription confirmed — thank you.' : ''}
            </span>

            <div id="foot-news-hint" className="foot-news__meta">
              <span>+2,400 subscribers</span>
              <span className="foot-news__meta-dot" aria-hidden="true">·</span>
              <span>No spam</span>
              <span className="foot-news__meta-dot" aria-hidden="true">·</span>
              <span>Unsubscribe anytime</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ NAV ═══ */}
      <div className="foot-nav">
        <div className="foot-nav__wrap">
          {NAV_COLUMNS.map((col, i) => (
            <div key={i} className="foot-col">
              <h4 className="foot-col__title">
                <span className="foot-col__num">0{i + 1}</span>
                <span>{col.title}</span>
              </h4>
              <ul className="foot-col__list">
                {col.links.map((l, j) => (
                  <li key={j}>
                    <a href={l.href} className="foot-col__link">
                      <span>{l.label}</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ SOCIAL ═══ */}
      <nav className="foot-social" aria-label="Social media">
        <div className="foot-social__wrap">
          <span className="foot-social__eyebrow" id="foot-social-label">Follow us</span>
          <ul className="foot-social__list" aria-labelledby="foot-social-label">
            {SOCIAL.map((s, i) => (
              <li key={i} className="foot-social__li">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="foot-social__item"
                  aria-label={`${s.name} — ${s.handle} (opens in new tab)`}
                >
                  <span className="foot-social__icon" aria-hidden="true">{s.icon}</span>
                  <div className="foot-social__text">
                    <span className="foot-social__name">{s.name}</span>
                    <span className="foot-social__handle">{s.handle}</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ═══ BOTTOM BAR ═══ */}
      <div className="foot-bottom">
        <small className="foot-bottom__wrap">
          <div className="foot-bottom__left">
            <span>© {year} Atelier Stelar.</span>
            <span className="foot-bottom__sep" aria-hidden="true">·</span>
            <span>All rights reserved.</span>
          </div>

          <div className="foot-bottom__center">
            <span className="foot-bottom__heart" aria-hidden="true">✦</span>
            <span>Made with obsession in</span>
            <em>Bucaramanga · Colombia</em>
          </div>

          <div className="foot-bottom__right">
            <div
              className="foot-bottom__lang"
              role="group"
              aria-label="Language"
            >
              {LANGS.map((code, i) => {
                const isActive = lang === code;
                return (
                  <span key={code} className="foot-bottom__lang-item">
                    <button
                      type="button"
                      className={isActive ? 'is-active' : ''}
                      onClick={() => setLang(code)}
                      aria-pressed={isActive}
                      aria-label={`Switch language to ${code}`}
                    >
                      {code}
                    </button>
                    {i < LANGS.length - 1 && <span aria-hidden="true">·</span>}
                  </span>
                );
              })}
            </div>
          </div>
        </small>
      </div>

      {/* ═══ BACK TO TOP (floating) ═══ */}
      <button
        className={`foot-top-btn ${showTop ? 'is-visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="19" x2="12" y2="5" />
          <polyline points="5 12 12 5 19 12" />
        </svg>
        <span>Top</span>
      </button>
    </footer>
  );
}

export default Footer;
