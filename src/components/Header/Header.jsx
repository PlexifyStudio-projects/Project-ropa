import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const NAV_LINKS = [
  { label: 'Collections', href: '#colecciones' },
  { label: 'Atelier', href: '#atelier' },
  { label: 'Muses', href: '#musas' },
  { label: 'Archive', href: '#archivo' },
  { label: 'Contact', href: '#contacto' },
];

function MagneticLink({ label, href, index }) {
  const ref = useRef(null);
  const fillRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.22, y: y * 0.18, duration: 0.4, ease: 'power3.out' });
  }, []);

  const handleMouseEnter = useCallback(() => {
    gsap.to(fillRef.current, { scaleX: 1, duration: 0.5, ease: 'power3.out' });
  }, []);

  const handleMouseLeave = useCallback(() => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.35)' });
    gsap.to(fillRef.current, { scaleX: 0, duration: 0.4, ease: 'power2.in' });
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      className="header__link"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span ref={fillRef} className="header__link-fill" />
      <span className="header__link-index">{String(index + 1).padStart(2, '0')}</span>
      <span className="header__link-label">{label}</span>
      <span className="header__link-underline" />
    </a>
  );
}

const WISHLIST_COUNT = 3;

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef(null);
  const mobileRef = useRef(null);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 900 && mobileOpen) setMobileOpen(false); };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useGSAP(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });

    const tl = gsap.timeline({ delay: 0.15 });
    tl.fromTo('.header__logo', { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power4.out' });
    tl.fromTo('.header__link', { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.05 }, '-=0.5');
    tl.fromTo('.header__icon-btn', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'back.out(1.6)' }, '-=0.4');
    tl.fromTo('.header__cta', { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.5)' }, '-=0.3');

    return () => window.removeEventListener('scroll', onScroll);
  }, { scope: headerRef });

  useEffect(() => {
    if (!mobileRef.current) return;
    const links = mobileRef.current.querySelectorAll('.header__mob-link');
    if (mobileOpen) {
      gsap.fromTo(mobileRef.current, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.6, ease: 'power4.inOut' });
      gsap.fromTo(links, { x: -30, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.04, duration: 0.4, delay: 0.15, ease: 'power3.out' });
    } else {
      gsap.to(mobileRef.current, { clipPath: 'inset(0 0 100% 0)', duration: 0.35, ease: 'power2.in' });
    }
  }, [mobileOpen]);

  return (
    <header ref={headerRef} className={`header${scrolled ? ' header--scrolled' : ''}`}>
      {/* Skip link — visible only on focus */}
      <a className="header__skip-link" href="#inicio">Skip to content</a>

      {/* ═══ MAIN HEADER ═══ */}
      <div className="header__main">
        <div className="header__wrap">
          {/* Logo */}
          <a href="#inicio" className="header__logo">
            <div className="header__logo-star">
              <svg viewBox="0 0 40 40" fill="none">
                <path d="M20 2L24 14L36 14L26 22L30 36L20 28L10 36L14 22L4 14L16 14Z" stroke="url(#lgr)" strokeWidth="1.2" fill="none" />
                <path d="M20 8L22.5 15.5L30 15.5L24 20.5L26.5 28.5L20 23.5L13.5 28.5L16 20.5L10 15.5L17.5 15.5Z" fill="url(#lgr)" opacity="0.1" />
                <circle cx="20" cy="18" r="1.5" fill="url(#lgr)" opacity="0.5" />
                <defs>
                  <linearGradient id="lgr" x1="4" y1="2" x2="36" y2="36">
                    <stop stopColor="#D4AD96" />
                    <stop offset="0.5" stopColor="#C4977B" />
                    <stop offset="1" stopColor="#A87B61" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="header__logo-text-wrap">
              <span className="header__logo-text">STELAR</span>
              <span className="header__logo-sub">Atelier · Couture</span>
            </div>
          </a>

          {/* Nav */}
          <nav className="header__nav" aria-label="Primary">
            {NAV_LINKS.map(({ label, href }, i) => (
              <MagneticLink key={href} label={label} href={href} index={i} />
            ))}
          </nav>

          {/* Actions */}
          <div className="header__actions">
            <button type="button" className="header__icon-btn" aria-label="Search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>
            <button type="button" className="header__icon-btn" aria-label={`Saved items (${WISHLIST_COUNT})`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.29 1.51 4.04 3 5.5l7 7z" />
              </svg>
              <span className="header__icon-badge" aria-hidden="true">{WISHLIST_COUNT}</span>
            </button>

            <a href="#contacto" className="header__cta">
              <span className="header__cta-label">Discover</span>
              <span className="header__cta-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </a>

            {/* Burger */}
            <button
              type="button"
              className="header__burger"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              <span className={`header__burger-bar${mobileOpen ? ' header__burger-bar--open' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <nav
        ref={mobileRef}
        id="mobile-nav"
        aria-label="Mobile primary"
        aria-hidden={!mobileOpen}
        className={`header__mob${mobileOpen ? ' header__mob--open' : ''}`}
      >
        <div className="header__mob-head">
          <span className="header__mob-label">Menu</span>
          <span className="header__mob-count">{NAV_LINKS.length} destinations</span>
        </div>
        {NAV_LINKS.map(({ label, href }, i) => (
          <a key={href} href={href} className="header__mob-link" onClick={() => setMobileOpen(false)}>
            <span className="header__mob-index">{String(i + 1).padStart(2, '0')}</span>
            <span>{label}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="header__mob-arrow">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        ))}
        <div className="header__mob-foot">
          <a href="#appointment" className="header__mob-cta">
            Book a Fitting
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <div className="header__mob-meta">
            <span>Paris · Milan · CDMX</span>
            <span>MMXXVI</span>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
