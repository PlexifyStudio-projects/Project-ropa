import { useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const SUBJECTS = [
  {
    id: 'atelier',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-6 9 6v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: 'Private Atelier',
    desc: 'Guided visit to the workshop · By invitation only',
    duration: '3 hours',
  },
  {
    id: 'couture',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="18" r="3" />
        <line x1="8.12" y1="15.88" x2="20" y2="4" />
        <line x1="15.88" y1="15.88" x2="4" y2="4" />
      </svg>
    ),
    title: 'Made to Measure',
    desc: 'Sur mesure couture · One-of-a-kind piece',
    duration: '8 – 14 weeks',
  },
  {
    id: 'prensa',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2" />
        <path d="M18 14h-8M15 18h-5M10 6h8v4h-8z" />
      </svg>
    ),
    title: 'Press & Editorial',
    desc: 'Collaborations · Loans · Press kit',
    duration: 'Reply within 48h',
  },
  {
    id: 'general',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    title: 'General Inquiry',
    desc: 'Any other conversation',
    duration: 'Reply within 24h',
  },
];

const SHOWROOMS = [
  {
    city: 'Bucaramanga · Flagship',
    status: 'By private appointment',
    address: 'Cabecera del Llano, Cra. 35 · Bucaramanga, Colombia',
    hours: 'Mon–Sat · 10:00 – 19:00',
    contact: 'Isabel Stelar',
    phone: '+57 312 555 01 26',
    phoneHref: 'tel:+573125550126',
    timezone: 'COT',
    tag: 'Main Atelier',
  },
  {
    city: 'Bucaramanga · Atelier Norte',
    status: 'By appointment only',
    address: 'Floridablanca · Cañaveral, Cra. 27',
    hours: 'Tue–Fri · Appointment only',
    contact: 'Marie Dubois',
    phone: '+57 312 555 02 26',
    phoneHref: 'tel:+573125550226',
    timezone: 'COT',
    tag: 'Production Studio',
  },
  {
    city: 'Bucaramanga · Salon',
    status: 'Seasonal showroom',
    address: 'Cabecera · Carrera 33 con Calle 48',
    hours: 'Wed–Sat · 11:00 – 20:00',
    contact: 'Celeste Ayala',
    phone: '+57 312 555 03 26',
    phoneHref: 'tel:+573125550326',
    timezone: 'COT',
    tag: 'SS26 Pop-up',
  },
];

const CHANNELS = [
  {
    label: 'Correspondence',
    value: 'atelier@stelar.com',
    href: 'mailto:atelier@stelar.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: 'Phone · Bucaramanga',
    value: '+57 7 634 22 26',
    href: 'tel:+5776342226',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp · Concierge',
    value: '+57 312 555 00 26',
    href: 'https://wa.me/573125550026',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    value: '@stelar.atelier',
    href: 'https://instagram.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
];

const FAQS = [
  {
    q: 'How long does it take to produce a piece?',
    a: 'Between 8 and 14 weeks from sketch approval, depending on complexity. Luneville embroidery and pieces requiring over 600 hours of handwork can extend up to 20 weeks.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes. Every piece travels in its origin box with full traceability and insurance, to over 40 countries worldwide.',
  },
  {
    q: 'Can you fit me outside of Bucaramanga?',
    a: 'We offer private at-home fittings in Bogotá, Medellín, Cartagena, Miami, and New York by prior appointment, subject to a service fee.',
  },
  {
    q: 'What is the made-to-measure process?',
    a: 'Initial consultation (1h) → Sketches and proposals (2 weeks) → Mannequin fittings (3 sessions) → Delivery with signing ceremony. We accompany every step.',
  },
];

const splitLetters = (text) =>
  text.split('').map((char, i) => (
    <span key={i} className="cont-letter">
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

function Contacto() {
  const ref = useRef(null);
  const [subject, setSubject] = useState('atelier');
  const [form, setForm] = useState({
    name: '', email: '', phone: '', city: '', message: '', budget: '',
  });
  const [status, setStatus] = useState('idle');
  const [openFaq, setOpenFaq] = useState(0);

  useGSAP(
    () => {
      gsap.fromTo(
        '.cont-header__label, .cont-header__tag',
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.cont-header', start: 'top 82%' },
        }
      );

      gsap.fromTo(
        '.cont-header__heading .cont-letter',
        { yPercent: 110, rotate: 6 },
        {
          yPercent: 0, rotate: 0, duration: 1.1, stagger: 0.035,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.cont-header', start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.cont-header__lead, .cont-header__meta-item',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.cont-header', start: 'top 78%' },
        }
      );

      gsap.fromTo(
        '.cont-subject',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.cont-subjects', start: 'top 85%' },
        }
      );

      gsap.fromTo(
        '.cont-field',
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.cont-form', start: 'top 82%' },
        }
      );

      gsap.fromTo(
        '.cont-channel',
        { x: 20, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.7, stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.cont-channels', start: 'top 85%' },
        }
      );

      gsap.fromTo(
        '.cont-showroom',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.cont-showrooms', start: 'top 85%' },
        }
      );

      gsap.fromTo(
        '.cont-faq-item',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.cont-faq', start: 'top 88%' },
        }
      );
    },
    { scope: ref }
  );

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setTimeout(() => {
        setStatus('idle');
        setForm({ name: '', email: '', phone: '', city: '', message: '', budget: '' });
      }, 3200);
    }, 1100);
  };

  return (
    <section ref={ref} className="contacto" id="contacto" aria-labelledby="contacto-heading">
      {/* ═══ HEADER ═══ */}
      <header className="cont-header">
        <div className="cont-header__wrap">
          <div className="cont-header__top">
            <span className="cont-header__label">
              <span className="cont-header__dot" />
              Contact · Private Conversation
            </span>
            <span className="cont-header__tag">Chapter VI · Your Turn</span>
          </div>

          <h2 id="contacto-heading" className="cont-header__heading">
            <span className="cont-header__line">
              <span className="cont-header__line-inner">{splitLetters('Let\u2019s Speak')}</span>
            </span>
            <span className="cont-header__line">
              <em className="cont-header__line-inner cont-header__line-inner--accent">
                {splitLetters('of Destiny.')}
              </em>
            </span>
          </h2>

          <div className="cont-header__body">
            <p className="cont-header__lead">
              Every garment is born of a conversation. Tell us where in life you
              are, what you dream of wearing, what you want to say with fabric.
              We reply within 24 hours — with patience, with detail, with a
              name of our own.
            </p>

            <div className="cont-header__meta">
              <div className="cont-header__meta-item">
                <span>Reply</span>
                <em>24 hours · business</em>
              </div>
              <div className="cont-header__meta-item">
                <span>Languages</span>
                <em>ES · EN · FR · IT</em>
              </div>
              <div className="cont-header__meta-item">
                <span>Confidentiality</span>
                <em>Absolute · NDA optional</em>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ═══ MAIN GRID ═══ */}
      <div className="cont-main">
        <div className="cont-main__wrap">
          {/* ── LEFT: Form ── */}
          <div className="cont-form-col">
            <form className="cont-form" onSubmit={handleSubmit}>
              <div className="cont-form__head">
                <span className="cont-form__head-title">
                  <span className="cont-form__head-mark">✦</span>
                  Private Form
                </span>
                <span className="cont-form__head-step">
                  <span className="cont-form__head-num">01</span>
                  <span className="cont-form__head-sep">/</span>
                  <span>Intentions</span>
                </span>
              </div>

              {/* Subject selector */}
              <div className="cont-field cont-field--full">
                <label className="cont-field__label">
                  <span>Reason</span>
                  <span className="cont-field__hint">· pick one</span>
                </label>
                <div className="cont-subjects">
                  {SUBJECTS.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      className={`cont-subject ${subject === s.id ? 'is-active' : ''}`}
                      onClick={() => setSubject(s.id)}
                    >
                      <span className="cont-subject__icon">{s.icon}</span>
                      <div className="cont-subject__text">
                        <span className="cont-subject__title">{s.title}</span>
                        <span className="cont-subject__desc">{s.desc}</span>
                      </div>
                      <span className="cont-subject__duration">{s.duration}</span>
                      <span className="cont-subject__check" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="cont-form__divider">
                <span className="cont-form__divider-mark">02</span>
                <span className="cont-form__divider-label">Who you are</span>
                <span className="cont-form__divider-line" />
              </div>

              <div className="cont-form__row">
                <div className="cont-field">
                  <label className="cont-field__label" htmlFor="name">
                    <span>Full name</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="cont-field__input"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Isabel Stelar"
                    autoComplete="name"
                    required
                    aria-required="true"
                  />
                </div>

                <div className="cont-field">
                  <label className="cont-field__label" htmlFor="email">
                    <span>Email</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="cont-field__input"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                    autoComplete="email"
                    required
                    aria-required="true"
                  />
                </div>
              </div>

              <div className="cont-form__row">
                <div className="cont-field">
                  <label className="cont-field__label" htmlFor="phone">
                    <span>Phone / WhatsApp</span>
                    <span className="cont-field__hint">optional</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="cont-field__input"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+57 312 555 01 26"
                    autoComplete="tel"
                    pattern="[+0-9\s\-()]{7,}"
                    inputMode="tel"
                  />
                </div>

                <div className="cont-field">
                  <label className="cont-field__label" htmlFor="city">
                    <span>City</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="cont-field__input"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Bogotá"
                    autoComplete="address-level2"
                  />
                </div>
              </div>

              {subject === 'couture' && (
                <div className="cont-field cont-field--budget">
                  <label className="cont-field__label">
                    <span>Estimated budget range</span>
                    <span className="cont-field__hint">confidential</span>
                  </label>
                  <div className="cont-budget">
                    {['COP 3M – 8M', 'COP 8M – 20M', 'COP 20M – 50M', 'COP 50M+'].map((b) => (
                      <button
                        key={b}
                        type="button"
                        className={`cont-budget__opt ${form.budget === b ? 'is-active' : ''}`}
                        onClick={() => setForm((p) => ({ ...p, budget: b }))}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="cont-form__divider">
                <span className="cont-form__divider-mark">03</span>
                <span className="cont-form__divider-label">Your story</span>
                <span className="cont-form__divider-line" />
              </div>

              <div className="cont-field cont-field--full">
                <label className="cont-field__label" htmlFor="message">
                  <span>Tell us the moment</span>
                  <span className="cont-field__hint">· in detail · no rush</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className="cont-field__textarea"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="The occasion, the silhouette you imagine, what you feel this piece should tell..."
                  required
                  aria-required="true"
                  aria-describedby="cont-privacy-note"
                />
                <span className="cont-field__count" aria-live="polite">
                  {form.message.length} characters
                </span>
                <span id="cont-privacy-note" className="cont-field__privacy">
                  We&rsquo;ll never share your email. See our <a href="#privacy">Privacy policy</a>.
                </span>
              </div>

              <div className="cont-form__foot">
                <div className="cont-form__foot-info">
                  <div className="cont-form__foot-item">
                    <span className="cont-form__foot-dot" />
                    <span>Reply in 24 h · confidential</span>
                  </div>
                  <div className="cont-form__foot-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                    <span>GDPR · Encrypted data</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className={`cont-submit cont-submit--${status}`}
                  disabled={status !== 'idle'}
                  aria-describedby="cont-submit-status"
                >
                  <span className="cont-submit__bg" />
                  <span className="cont-submit__text">
                    {status === 'idle' && 'Send message'}
                    {status === 'sending' && 'Sending...'}
                    {status === 'sent' && 'Received — thank you'}
                  </span>
                  {status === 'idle' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  )}
                </button>
              </div>

              <div
                id="cont-submit-status"
                className="cont-form__live"
                role="status"
                aria-live="polite"
                aria-atomic="true"
              >
                {status === 'sending' && 'Sending your message, please wait.'}
                {status === 'sent' && 'Message received. We will reply within 24 hours.'}
              </div>
            </form>
          </div>

          {/* ── RIGHT: Sidebar ── */}
          <aside className="cont-side-col">
            {/* Direct channels */}
            <div className="cont-channels">
              <header className="cont-block__head">
                <span className="cont-block__eyebrow">Direct Channels</span>
                <span className="cont-block__count">04</span>
              </header>

              <div className="cont-channels__list">
                {CHANNELS.map((c, i) => (
                  <a
                    key={i}
                    href={c.href}
                    className="cont-channel"
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    <span className="cont-channel__icon">{c.icon}</span>
                    <div className="cont-channel__text">
                      <span className="cont-channel__label">{c.label}</span>
                      <span className="cont-channel__value">{c.value}</span>
                    </div>
                    <svg className="cont-channel__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Showrooms */}
            <div className="cont-showrooms">
              <header className="cont-block__head">
                <span className="cont-block__eyebrow">Ateliers · Bucaramanga</span>
                <span className="cont-block__count">03</span>
              </header>

              <div className="cont-showrooms__list">
                {SHOWROOMS.map((s, i) => (
                  <article key={i} className="cont-showroom">
                    <header className="cont-showroom__head">
                      <div className="cont-showroom__titles">
                        <span className="cont-showroom__tag">{s.tag}</span>
                        <h3 className="cont-showroom__city">{s.city}</h3>
                        <span className="cont-showroom__status">{s.status}</span>
                      </div>
                      <span className="cont-showroom__tz">{s.timezone}</span>
                    </header>

                    <dl className="cont-showroom__meta">
                      <div>
                        <dt>Address</dt>
                        <dd>{s.address}</dd>
                      </div>
                      <div>
                        <dt>Hours</dt>
                        <dd>{s.hours}</dd>
                      </div>
                      <div>
                        <dt>Concierge</dt>
                        <dd>{s.contact}</dd>
                      </div>
                      <div>
                        <dt>Phone</dt>
                        <dd>
                          <a href={s.phoneHref} className="cont-showroom__phone">{s.phone}</a>
                        </dd>
                      </div>
                    </dl>

                    <a href="#contacto" className="cont-showroom__cta">
                      <span>Book private visit</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </a>
                  </article>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="cont-faq">
              <header className="cont-block__head">
                <span className="cont-block__eyebrow">Frequently Asked</span>
                <span className="cont-block__count">04</span>
              </header>

              <div className="cont-faq__list">
                {FAQS.map((f, i) => (
                  <div
                    key={i}
                    className={`cont-faq-item ${openFaq === i ? 'is-open' : ''}`}
                  >
                    <button
                      className="cont-faq-item__head"
                      onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                      aria-expanded={openFaq === i}
                    >
                      <span className="cont-faq-item__num">0{i + 1}</span>
                      <span className="cont-faq-item__q">{f.q}</span>
                      <span className="cont-faq-item__toggle" aria-hidden="true">
                        <span />
                        <span />
                      </span>
                    </button>
                    <div className="cont-faq-item__body">
                      <p>{f.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ═══ BOTTOM BANNER ═══ */}
      <aside className="cont-bottom" aria-label="Privacy and service commitments">
        <small className="cont-bottom__wrap">
          <span className="cont-bottom__item">
            <span className="cont-bottom__dot" aria-hidden="true" />
            Private · Confidential
          </span>
          <span className="cont-bottom__sep" aria-hidden="true">·</span>
          <span className="cont-bottom__item">Reply within 24 hours</span>
          <span className="cont-bottom__sep" aria-hidden="true">·</span>
          <span className="cont-bottom__item">GDPR & data protected</span>
          <span className="cont-bottom__sep" aria-hidden="true">·</span>
          <span className="cont-bottom__item">Atelier Stelar · MMXXVI</span>
        </small>
      </aside>
    </section>
  );
}

export default Contacto;
