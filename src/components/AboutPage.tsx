import { useEffect, useRef, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Factory, Users, TrendingUp, Boxes, Wrench } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLang } from '../context/LanguageContext';
import { useAboutPageCms } from '../lib/useProductPageCms';
import { mediaUrl } from '../lib/strapi';

gsap.registerPlugin(ScrollTrigger);

/* ─── tiny hook: fade-up + blur into view ───────────────────────────────── */
function useFadeUp(ref: RefObject<HTMLElement | null>, opts?: { delay?: number; duration?: number }) {
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    gsap.fromTo(
      el,
      { opacity: 0, y: 48, filter: 'blur(6px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: opts?.duration ?? 0.9,
        delay: opts?.delay ?? 0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);
}

/* ─── Reveal wrapper used ad-hoc with gsap.utils.toArray ────────────────── */
function revealChildren(container: HTMLElement, selector: string, extra?: gsap.TweenVars) {
  gsap.fromTo(
    gsap.utils.toArray<HTMLElement>(container.querySelectorAll(selector)),
    { opacity: 0, y: 40, filter: 'blur(4px)' },
    {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.75,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      ...extra,
    }
  );
}



/* ─── Revenue chart data ─────────────────────────────────────────────────── */
const REVENUE_DATA = [
  { year: '2021', usd: '336 364',    growth: '2x',   employees: '5+',  pct: 18, final: false },
  { year: '2022', usd: '727 273',    growth: '2x',   employees: '10+', pct: 27, final: false },
  { year: '2023', usd: '1 545 455',  growth: '2x',   employees: '15+', pct: 40, final: false },
  { year: '2024', usd: '2 181 818',  growth: '1.5x', employees: '20+', pct: 53, final: false },
  { year: '2025', usd: '5 272 727',  growth: '2.4x', employees: '30+', pct: 73, final: false },
  { year: '2026', usd: '12 000 000', growth: '$12M', employees: '40+', pct: 100, final: true  },
];

/* Bar tops in a 260-unit high SVG (y = 260 * (1 - pct/100)), center X at 50,150…550 */
const CURVE_DOTS: [number, number][] = [
  [50, 213], [150, 190], [250, 156], [350, 122], [450, 70], [550, 0],
];
const CURVE_PATH =
  'M 50,213 C 67,209 117,200 150,190 C 183,181 217,167 250,156 C 283,145 317,136 350,122 C 383,108 417,90 450,70 C 483,50 533,12 550,0';

/* ════════════════════════════════════════════════════════════════════════════
   About Page
═══════════════════════════════════════════════════════════════════════════ */
export default function AboutPage() {
  const { tr, lang } = useLang();
  const base = tr.about as any;
  const cms = useAboutPageCms();

  const cmsStats = cms?.stats as { number: string; label: string }[] | null;
  const ab = {
    ...base,
    ...(cms?.hero_eyebrow  && { badge:       cms.hero_eyebrow }),
    ...(cms?.hero_subtitle && { hero_sub:    cms.hero_subtitle }),
    ...(cms?.story_eyebrow && { story_label: cms.story_eyebrow }),
    ...(cms?.story_title   && { story_title: cms.story_title }),
    ...(cms?.story_body    && { story_body:  cms.story_body }),
    ...(cmsStats?.[0] && { stat1_n: cmsStats[0].number, stat1_label: cmsStats[0].label }),
    ...(cmsStats?.[1] && { stat2_n: cmsStats[1].number, stat2_label: cmsStats[1].label }),
    ...(cmsStats?.[2] && { stat3_n: cmsStats[2].number, stat3_label: cmsStats[2].label }),
    ...(cms?.values    && { values:              cms.values }),
    ...(cms?.milestones && { history_milestones: cms.milestones }),
    ...(cms?.final_quote && { final_quote:       cms.final_quote }),
    ...(cms?.founder_image && { founder_image:   mediaUrl(cms.founder_image.url) }),
  };

  /* hero */
  const heroRef      = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef   = useRef<HTMLParagraphElement>(null);

  /* section refs */
  const storyRef   = useRef<HTMLElement>(null);
  const founderRef = useRef<HTMLElement>(null);
  const historyRef = useRef<HTMLElement>(null);
  const revenueRef = useRef<HTMLElement>(null);
  const whatRef    = useRef<HTMLElement>(null);
  const whyRef    = useRef<HTMLElement>(null);
  const valuesRef = useRef<HTMLElement>(null);
  const finalRef  = useRef<HTMLElement>(null);

  /* ── Hero animation (immediate, no scroll trigger) ── */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(heroTitleRef.current, { opacity: 0, y: 60, filter: 'blur(12px)' },
              { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.15 })
      .fromTo(heroSubRef.current,   { opacity: 0, y: 32, filter: 'blur(6px)' },
              { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9 }, '-=0.55');
  }, []);

  /* ── Story + Mission ── */
  useFadeUp(storyRef as RefObject<HTMLElement>);

  /* ── Founder ── */
  useFadeUp(founderRef as RefObject<HTMLElement>, { duration: 1.0 });

  /* ── Company History — stagger milestone cards ── */
  useEffect(() => {
    if (!historyRef.current) return;
    revealChildren(historyRef.current, '.history-item', { stagger: 0.10 });
  }, []);

  /* ── Revenue Growth ── */
  useEffect(() => {
    if (!revenueRef.current) return;
    const section = revenueRef.current;
    const bars = section.querySelectorAll<HTMLElement>('.revenue-bar');
    const curve = section.querySelector<SVGPathElement>('.revenue-curve');

    gsap.set(bars, { scaleY: 0, transformOrigin: 'center bottom' });
    if (curve) {
      const len = curve.getTotalLength();
      gsap.set(curve, { strokeDasharray: len, strokeDashoffset: len });
    }

    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: 'top 82%', toggleActions: 'play none none none' },
    });
    tl.to(section, { opacity: 1, duration: 0.5, ease: 'power2.out' })
      .to(bars, { scaleY: 1, stagger: 0.09, duration: 0.85, ease: 'power3.out' }, '-=0.1');
    if (curve) {
      tl.to(curve, { strokeDashoffset: 0, duration: 1.3, ease: 'power2.inOut' }, '-=0.7');
    }
  }, []);


  /* ── What We Do cards stagger ── */
  useEffect(() => {
    if (!whatRef.current) return;
    // Kill any existing ScrollTriggers for this section so re-render on lang change re-fires
    ScrollTrigger.getAll()
      .filter(t => t.vars.trigger === whatRef.current)
      .forEach(t => t.kill());
    gsap.set(whatRef.current.querySelectorAll('.what-card'), { clearProps: 'all' });
    revealChildren(whatRef.current, '.what-card');
  }, [lang]);

  /* ── Why choose BIKON — slide from left ── */
  useEffect(() => {
    if (!whyRef.current) return;
    // Kill any existing ScrollTriggers for these items
    ScrollTrigger.getAll()
      .filter(t => whyRef.current!.contains(t.vars.trigger as Node))
      .forEach(t => t.kill());
    const items = gsap.utils.toArray<HTMLElement>(whyRef.current.querySelectorAll('.why-item'));
    gsap.set(items, { clearProps: 'all' });
    items.forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, x: -56 }, {
        opacity: 1, x: 0, duration: 0.7, delay: i * 0.09, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      });
    });
  }, [lang]);

  /* ── Values ── */
  useEffect(() => {
    if (!valuesRef.current) return;
    revealChildren(valuesRef.current, '.value-pill');
  }, []);

  /* ── Final statement ── */
  useFadeUp(finalRef as RefObject<HTMLElement>, { duration: 1.1 });

  /* Kill all ScrollTriggers on unmount */
  useEffect(() => {
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div className="bg-white min-h-screen selection:bg-black selection:text-white">
      <Navbar />

      {/* ══════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
      >
        {/* Background aura */}
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 72% 60% at 50% 40%, rgba(0,122,255,0.08) 0%, transparent 70%), radial-gradient(ellipse 48% 48% at 80% 70%, rgba(0,122,255,0.05) 0%, transparent 70%)',
        }} />

        {/* Subtle grid lines */}
        <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{
          backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="accent-label mb-8 mx-auto" style={{ width: 'fit-content' }}>
            {ab.badge}
          </div>

          <h1
            ref={heroTitleRef}
            style={{
              opacity: 0,
              fontSize: 'clamp(72px, 14vw, 180px)',
              fontWeight: 300,
              letterSpacing: '-0.05em',
              lineHeight: 1,
              color: '#111',
              fontFamily: '"Inter", "Outfit", sans-serif',
            }}
          >
            BIKON
          </h1>

          <p
            ref={heroSubRef}
            style={{
              opacity: 0,
              fontSize: 'clamp(16px, 2.2vw, 22px)',
              color: '#6E6E73',
              marginTop: 28,
              lineHeight: 1.6,
              fontWeight: 400,
              maxWidth: 560,
              marginLeft: 'auto',
              marginRight: 'auto',
              fontFamily: '"Inter", "Outfit", sans-serif',
            }}
          >
            {ab.hero_sub}
          </p>

          <div className="mx-auto mt-14" style={{ width: 48, height: 2, background: 'linear-gradient(90deg, #007AFF, #60a5fa)', borderRadius: 2 }} />
        </div>

        {/* Bottom fade */}
        <div aria-hidden className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #fff)' }} />
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          QUICK FACTS BAR
      ══════════════════════════════════════════════════════════════════ */}
      <section className="px-6 py-14" style={{ background: '#F5F5F7', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-black/[0.08]">
            {(ab.facts as { label: string; value: string; sub: string }[]).map(({ label, value, sub }) => (
              <div
                key={label}
                style={{
                  display: 'flex', flexDirection: 'column', gap: 6,
                  padding: '0 0 0 0',
                }}
                className="lg:px-10 first:lg:pl-0 last:lg:pr-0"
              >
                <p style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: '#007AFF', margin: 0,
                }}>
                  {label}
                </p>
                <p style={{
                  fontSize: 'clamp(18px, 2vw, 24px)', fontWeight: 800,
                  letterSpacing: '-0.04em', color: '#111', margin: 0, lineHeight: 1.1,
                }}>
                  {value}
                </p>
                <p style={{ fontSize: 13, color: '#999', margin: 0, fontWeight: 400 }}>
                  {sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          STORY & MISSION
      ══════════════════════════════════════════════════════════════════ */}
      <section ref={storyRef as RefObject<HTMLElement>} className="py-28 px-6" style={{ opacity: 0 }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Story */}
          <div>
            <div className="accent-label mb-6">{ab.story_label}</div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.12, color: '#111', marginBottom: 20 }}>
              {ab.story_title}
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.75, color: '#555', fontWeight: 400 }}>
              {ab.story_body}
            </p>

            {/* Stats row */}
            <div className="mt-10 flex gap-10 flex-wrap">
              {[
                { n: ab.stat1_n, label: ab.stat1_label },
                { n: ab.stat2_n, label: ab.stat2_label },
                { n: ab.stat3_n, label: ab.stat3_label },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.04em', color: '#007AFF' }}>{s.n}</div>
                  <div style={{ fontSize: 12, color: '#999', marginTop: 2, letterSpacing: '0.02em' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mission pull-quote */}
          <div style={{ borderLeft: '3px solid #007AFF', paddingLeft: 32 }}>
            <div className="accent-label mb-6">{ab.mission_label}</div>
            <blockquote style={{
              fontSize: 'clamp(18px, 2.2vw, 24px)',
              fontWeight: 500,
              lineHeight: 1.6,
              letterSpacing: '-0.02em',
              color: '#1D1D1F',
              fontStyle: 'normal',
              margin: 0,
            }}>
              {ab.mission_quote}
            </blockquote>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FOUNDER & VISION
      ══════════════════════════════════════════════════════════════════ */}
      <section
        ref={founderRef as RefObject<HTMLElement>}
        className="py-14 px-6 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #2275C4 0%, #155DA0 100%)', opacity: 0, position: 'relative' }}
      >
        {/* Ambient depth overlay */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 65% 90% at 80% 50%, rgba(255,255,255,0.07) 0%, transparent 70%)' }} />
        {/* Top hairline */}
        <div aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)' }} />

        <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 items-center">

          {/* LEFT — text */}
          <div>
            {/* Eyebrow pill */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28,
              fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' as const,
              padding: '6px 14px', borderRadius: 999,
              background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.22)', color: 'rgba(255,255,255,0.9)',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', opacity: 0.75, display: 'inline-block', flexShrink: 0 }} />
              {ab.founder_eyebrow}
            </div>

            {/* Founder label + name */}
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.48)', marginBottom: 10 }}>Founder</p>
            <h2 style={{
              fontSize: 'clamp(32px, 4vw, 54px)', fontWeight: 800,
              letterSpacing: '-0.045em', lineHeight: 1.06,
              color: '#fff', marginBottom: 20,
              fontFamily: '"Inter", sans-serif',
            }}>
              Golib Obiddinovich<br />Avezov
            </h2>

            {/* Meta pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }}>
              {['37 years old', 'Businessman', 'Engineer', '11+ yrs computer industry', '15+ yrs engineering'].map(tag => (
                <span key={tag} style={{
                  fontSize: 12, fontWeight: 600, padding: '5px 13px', borderRadius: 999,
                  background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.14)',
                  color: 'rgba(255,255,255,0.8)',
                }}>{tag}</span>
              ))}
            </div>

            {/* Mission — left-border quote style */}
            <div style={{ borderLeft: '3px solid rgba(255,255,255,0.45)', paddingLeft: 22, marginBottom: 36 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.48)', marginBottom: 10 }}>{ab.founder_mission_label}</p>
              <p style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.7, letterSpacing: '-0.01em', color: 'rgba(255,255,255,0.88)', margin: 0 }}>
                {ab.founder_mission}
              </p>
            </div>

            {/* Strategic Goals */}
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.48)', marginBottom: 14 }}>{ab.founder_goals_label}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {([Factory, Users, TrendingUp] as const).map((Icon, idx) => {
                const { title, desc } = ab.founder_goals[idx] as { title: string; desc: string };
                return (
                <div key={idx} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 18px', borderRadius: 14,
                  background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.11)',
                }}>
                  <div style={{ width: 40, height: 40, borderRadius: 11, flexShrink: 0, background: 'rgba(255,255,255,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={19} strokeWidth={1.8} color="#fff" />
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 15, color: '#fff', margin: 0, letterSpacing: '-0.015em' }}>{title}</p>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', margin: 0, marginTop: 2 }}>{desc}</p>
                  </div>
                </div>
                );
              })}
            </div>

            {/* Footer statement */}
            <p style={{ fontSize: 15, lineHeight: 1.7, marginTop: 28, color: 'rgba(255,255,255,0.6)', letterSpacing: '-0.01em', fontStyle: 'italic' }}>
              {ab.founder_footer}
            </p>
          </div>

          {/* RIGHT — circular photo */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
            {/* Decorative arcs */}
            <svg aria-hidden viewBox="0 0 380 380"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
            >
              <circle cx="190" cy="190" r="178" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
              <path d="M 190 12 A 178 178 0 0 1 368 190" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="2" strokeLinecap="round" />
              <path d="M 190 368 A 178 178 0 0 1 12 190" fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>

            {/* Glow */}
            <div aria-hidden style={{ position: 'absolute', width: 320, height: 320, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', filter: 'blur(40px)' }} />

            {/* Photo */}
            <div style={{
              width: 300, height: 300, borderRadius: '50%', overflow: 'hidden',
              border: '2px solid rgba(255,255,255,0.22)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.28), 0 0 0 8px rgba(255,255,255,0.05)',
              position: 'relative', zIndex: 1, flexShrink: 0,
            }}>
              <img
                src="/about/founder.png"
                alt="Golib Obiddinovich Avezov"
                draggable={false}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
              />
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          COMPANY HISTORY & DEVELOPMENT
      ══════════════════════════════════════════════════════════════════ */}
      <section
        ref={historyRef as RefObject<HTMLElement>}
        className="py-24 px-6"
        style={{ background: '#F5F5F7' }}
      >
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div style={{ marginBottom: 64 }}>
            <div className="accent-label mb-5">{ab.history_label}</div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.1, color: '#111', marginBottom: 16 }}>
              {ab.history_title}
            </h2>
            <p style={{ fontSize: 16, color: '#6E6E73', lineHeight: 1.7, maxWidth: '58ch', margin: 0 }}>
              {ab.history_subtitle}
            </p>
          </div>

          {/* Timeline — horizontally scrollable on mobile */}
          <div style={{ overflowX: 'auto', paddingBottom: 8 }}>
            <div style={{ minWidth: 680, position: 'relative' }}>

              {/* Connecting line */}
              <div style={{
                position: 'absolute', top: 28, left: '9%', right: '9%', height: 2,
                background: 'linear-gradient(90deg, rgba(0,122,255,0.15) 0%, rgba(0,122,255,0.5) 50%, rgba(0,122,255,0.15) 100%)',
              }} />

              {/* Milestones */}
              <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                {(ab.history_milestones as { year: string; title: string; desc: string }[]).map((m, i) => (
                  <div
                    key={m.year}
                    className="history-item"
                    style={{
                      flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                      padding: '0 8px', opacity: 0,
                    }}
                  >
                    {/* Year node */}
                    <div style={{
                      width: 56, height: 56, borderRadius: '50%', flexShrink: 0,
                      background: '#fff',
                      border: '2px solid #007AFF',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 800, fontSize: 13, letterSpacing: '-0.03em', color: '#007AFF',
                      boxShadow: '0 4px 18px -4px rgba(0,122,255,0.28)',
                      position: 'relative', zIndex: 1, marginBottom: 22,
                    }}>
                      {m.year}
                    </div>


                    {/* Card */}
                    <div style={{
                      background: '#fff', borderRadius: 18, padding: '18px 14px',
                      border: '1px solid rgba(0,0,0,0.06)',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px -8px rgba(0,0,0,0.08)',
                      textAlign: 'center', width: '100%',
                    }}>
                      <p style={{
                        fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
                        textTransform: 'uppercase', color: '#007AFF', marginBottom: 7, margin: '0 0 7px',
                      }}>
                        {m.title}
                      </p>
                      <p style={{ fontSize: 13, color: '#555', lineHeight: 1.65, margin: 0 }}>
                        {m.desc}
                      </p>
                    </div>

                    {/* Subtle step number */}
                    <div style={{
                      marginTop: 12, fontSize: 10, fontWeight: 700,
                      color: 'rgba(0,0,0,0.18)', letterSpacing: '0.06em',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* "Today" banner */}
          <div style={{
            marginTop: 52, borderRadius: 24,
            background: 'linear-gradient(135deg, #007AFF 0%, #0055D4 100%)',
            padding: 'clamp(28px,4vw,40px) clamp(24px,5vw,48px)',
            display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 28,
            boxShadow: '0 24px 64px -16px rgba(0,0,0,0.22)',
          }}>
            <p style={{
              flex: '1 1 280px', fontSize: 'clamp(16px,2vw,20px)',
              fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.55,
              color: '#fff', margin: 0,
            }}>
              {ab.history_today}
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {([
                { Icon: Boxes,   label: ab.history_trade      },
                { Icon: Wrench,  label: ab.history_service    },
                { Icon: Factory, label: ab.history_production },
              ] as const).map(({ Icon, label }) => (
                <div key={label} style={{
                  display: 'flex', alignItems: 'center', gap: 9,
                  padding: '11px 20px', borderRadius: 12,
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.09)',
                }}>
                  <Icon size={17} strokeWidth={1.6} color="rgba(255,255,255,0.75)" />
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#fff', letterSpacing: '-0.01em' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          REVENUE GROWTH
      ══════════════════════════════════════════════════════════════════ */}
      <section
        ref={revenueRef as RefObject<HTMLElement>}
        className="py-24 px-6"
        style={{ background: '#fff', opacity: 0 }}
      >
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="accent-label mb-5 mx-auto" style={{ width: 'fit-content' }}>{ab.revenue_label}</div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.1, color: '#111', marginBottom: 10 }}>
              {ab.revenue_title}
            </h2>
            <p style={{ fontSize: 16, color: '#6E6E73', fontWeight: 400 }}>{ab.revenue_subtitle}</p>
          </div>

          {/* Chart — horizontally scrollable on small screens */}
          <div style={{ overflowX: 'auto', overflowY: 'visible', paddingBottom: 4 }}>
            <div style={{ minWidth: 500 }}>

              {/* Growth multiplier pills row */}
              <div style={{ display: 'flex', height: 36, alignItems: 'flex-end', marginBottom: 10 }}>
                {REVENUE_DATA.map(d => (
                  <div key={d.year} style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    {!d.final && (
                      <span style={{
                        display: 'inline-block',
                        fontSize: 11, fontWeight: 700,
                        padding: '3px 10px', borderRadius: 999,
                        letterSpacing: '-0.01em',
                        background: 'rgba(22,163,74,0.07)',
                        color: '#16a34a',
                        border: '1px solid rgba(22,163,74,0.18)',
                      }}>{d.growth}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Bar area */}
              <div style={{ position: 'relative', height: 260 }}>

                {/* Subtle horizontal reference lines */}
                {[25, 50, 75].map(pct => (
                  <div key={pct} style={{
                    position: 'absolute', left: 0, right: 0,
                    bottom: `${pct}%`, height: 1,
                    background: 'rgba(0,0,0,0.05)',
                    borderTop: '1px dashed rgba(0,0,0,0.07)',
                  }} />
                ))}

                {/* SVG curve + dots overlay */}
                <svg
                  viewBox="0 0 600 260"
                  preserveAspectRatio="none"
                  aria-hidden
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', zIndex: 2, pointerEvents: 'none' }}
                >
                  <defs>
                    <marker id="rev-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                      <polygon points="0,0 8,3 0,6" fill="#007AFF" />
                    </marker>
                    <filter id="curve-glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                  {/* Glow copy behind the curve */}
                  <path
                    d={CURVE_PATH}
                    fill="none"
                    stroke="#007AFF"
                    strokeWidth="6"
                    strokeLinecap="round"
                    opacity={0.12}
                  />
                  {/* Growth curve */}
                  <path
                    className="revenue-curve"
                    d={CURVE_PATH}
                    fill="none"
                    stroke="#007AFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Arrow beyond last bar */}
                  <line x1="550" y1="0" x2="562" y2="-18" stroke="#007AFF" strokeWidth="2" strokeLinecap="round" markerEnd="url(#rev-arrow)" />
                  {/* Data dots */}
                  {CURVE_DOTS.map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r={4} fill="#fff" stroke="#007AFF" strokeWidth="2" />
                  ))}
                </svg>

                {/* Bars */}
                <div style={{ display: 'flex', alignItems: 'flex-end', height: '100%' }}>
                  {REVENUE_DATA.map(d => (
                    <div key={d.year} style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 6px' }}>
                      <div
                        className="revenue-bar"
                        style={{
                          height: `${d.pct}%`,
                          borderRadius: '10px 10px 0 0',
                          background: d.final
                            ? 'linear-gradient(180deg, #007AFF 0%, #0050C8 100%)'
                            : 'linear-gradient(180deg, #3B9EFF 0%, #0070E8 100%)',
                          display: 'flex', flexDirection: 'column',
                          alignItems: 'center', justifyContent: 'center',
                          gap: 2, padding: '8px 4px', minHeight: 44,
                          boxShadow: '0 8px 24px -6px rgba(0,122,255,0.35)',
                        }}
                      >
                        {!d.final && (
                          <span style={{ fontSize: 13, fontWeight: 800, color: '#fff', textAlign: 'center', lineHeight: 1.3, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
                            {d.growth}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Baseline */}
              <div style={{ height: 2, background: '#1D1D1F', margin: '0 6px 18px', borderRadius: 1 }} />

              {/* Year + employee labels */}
              <div style={{ display: 'flex' }}>
                {REVENUE_DATA.map(d => (
                  <div key={d.year} style={{ flex: 1, textAlign: 'center', padding: '0 4px' }}>
                    <p style={{
                      fontSize: 14, fontWeight: 700, letterSpacing: '-0.02em',
                      color: d.final ? '#007AFF' : '#1D1D1F',
                      marginBottom: 8,
                    }}>{d.year}</p>
                    <div style={{
                      width: 28, height: 28, borderRadius: 8, margin: '0 auto 6px',
                      background: 'rgba(0,122,255,0.07)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Users size={14} color="#007AFF" />
                    </div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: '#007AFF', letterSpacing: '-0.01em' }}>{d.employees}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          WHAT WE DO
      ══════════════════════════════════════════════════════════════════ */}
      <section ref={whatRef as RefObject<HTMLElement>} className="py-28 px-6" style={{ background: '#F5F5F7' }}>
        <div className="max-w-6xl mx-auto">

          {/* Header + intro */}
          <div className="mb-12">
            <div className="accent-label mb-5">{ab.what_label}</div>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#111', marginBottom: 16 }}>
              {ab.what_title}
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: '#555', maxWidth: '64ch', margin: 0 }}>
              {ab.what_summary}
            </p>
          </div>

          {/* Core Activities subheading */}
          <div className="accent-label mb-6">{ab.what_activities}</div>

          {/* Cards — 3 cols wraps 5 items into 3+2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ab.what_cards.map((c) => (
              <div
                key={c.title}
                className="what-card"
                style={{
                  background: '#fff',
                  borderRadius: 20,
                  padding: '28px 24px',
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 32px -8px rgba(0,0,0,0.08)',
                }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(0,122,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 16 }}>
                  {c.icon}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.02em', color: '#111', marginBottom: 8 }}>{c.title}</h3>
                <p style={{ fontSize: 13.5, color: '#777', lineHeight: 1.65, margin: 0 }}>{c.body}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          WHY CHOOSE BIKON?
      ══════════════════════════════════════════════════════════════════ */}
      <section ref={whyRef as RefObject<HTMLElement>} className="py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <div className="accent-label mb-5">{ab.why_label}</div>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#111', marginBottom: 16 }}>
              {ab.why_title}
            </h2>
            <p style={{ fontSize: 17, color: '#555', lineHeight: 1.7, fontWeight: 500, maxWidth: '56ch' }}>
              {ab.why_subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(ab.why_items as unknown as { title: string; body: string }[]).map((item, i) => (
              <div
                key={i}
                className="why-item"
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 16,
                  padding: '22px 24px', borderRadius: 16,
                  border: '1px solid rgba(0,0,0,0.06)', background: '#FAFAFA',
                }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, color: '#fff', fontSize: 16,
                }}>✓</div>
                <div style={{ paddingTop: 4 }}>
                  <p style={{ fontSize: 15, color: '#111', fontWeight: 700, margin: '0 0 4px', letterSpacing: '-0.01em' }}>
                    {item.title}
                  </p>
                  <p style={{ fontSize: 14, color: '#666', lineHeight: 1.65, margin: 0 }}>
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          VALUES & FUTURE
      ══════════════════════════════════════════════════════════════════ */}
      <section ref={valuesRef as RefObject<HTMLElement>} className="py-28 px-6" style={{ background: '#F5F5F7' }}>
        <div className="max-w-6xl mx-auto">

          {/* Values */}
          <div className="mb-20 text-center">
            <div className="accent-label mb-6 mx-auto" style={{ width: 'fit-content' }}>{ab.values_label}</div>
            <div className="flex flex-wrap gap-4 justify-center">
              {ab.values.map((v) => (
                <span
                  key={v}
                  className="value-pill"
                  style={{
                    fontSize: 13, fontWeight: 700, letterSpacing: '0.18em',
                    textTransform: 'uppercase', padding: '12px 24px', borderRadius: 100,
                    border: '1.5px solid rgba(0,122,255,0.25)', color: '#007AFF',
                    background: 'rgba(0,122,255,0.05)', opacity: 0,
                  }}
                >
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* Future goals */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="accent-label mb-5">{ab.future_label}</div>
              <h2 style={{ fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#111', marginBottom: 24 }}>
                {ab.future_title}
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                {ab.future_goals.map((g, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, fontSize: 15, color: '#444', lineHeight: 1.6 }}>
                    <span style={{
                      width: 24, height: 24, borderRadius: 6, background: '#007AFF',
                      color: '#fff', fontSize: 11, fontWeight: 800,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, marginTop: 1,
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {g}
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual card */}
            <div style={{ borderRadius: 24, background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)', padding: '40px 36px', color: '#fff', boxShadow: '0 24px 80px -16px rgba(0,122,255,0.35)' }}>
              <div style={{ fontSize: 36, marginBottom: 20 }}>🌏</div>
              <h3 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 12 }}>
                {ab.global_title}
              </h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.75, color: 'rgba(255,255,255,0.82)', margin: 0 }}>
                {ab.global_body}
              </p>
              <div style={{ marginTop: 28, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {ab.global_tags.map((tag) => (
                  <span key={tag} style={{ fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 100, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          MARKETPLACE PRESENCE
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto mb-12 text-center">
          <div className="accent-label mb-4 mx-auto" style={{ width: 'fit-content' }}>{ab.marketplace_label}</div>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#111' }}>
            {ab.marketplace_title}
          </h2>
        </div>

        {/* Marquee strip */}
        <div style={{ overflow: 'hidden', position: 'relative' }}>
          {/* Left fade */}
          <div aria-hidden style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
            background: 'linear-gradient(to right, #fff 0%, transparent 100%)',
            pointerEvents: 'none',
          }} />
          {/* Right fade */}
          <div aria-hidden style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
            background: 'linear-gradient(to left, #fff 0%, transparent 100%)',
            pointerEvents: 'none',
          }} />

          <div style={{
            display: 'flex',
            width: 'max-content',
            animation: 'marquee 22s linear infinite',
          }}>
            {[...Array(2)].flatMap(() => [
              { src: '/icons/alif.png',     name: 'Alif'        },
              { src: '/icons/ozon.png',     name: 'Ozon'        },
              { src: '/icons/uzum.png',     name: 'Uzum'        },
              { src: '/icons/wb.png',       name: 'Wildberries' },
              { src: '/icons/yandex.png',   name: 'Yandex'      },
              { src: '/icons/zoodmall.png', name: 'Zoodmall'    },
            ]).map((logo, i) => (
              <div
                key={i}
                style={{
                  flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 400, height: 200,
                  margin: '0 16px',
                }}
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  draggable={false}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                    filter: 'grayscale(1)',
                    opacity: 0.55,
                    transition: 'filter 0.3s, opacity 0.3s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLImageElement).style.filter = 'grayscale(0)';
                    (e.currentTarget as HTMLImageElement).style.opacity = '1';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLImageElement).style.filter = 'grayscale(1)';
                    (e.currentTarget as HTMLImageElement).style.opacity = '0.55';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FINAL STATEMENT
      ══════════════════════════════════════════════════════════════════ */}
      <section ref={finalRef as RefObject<HTMLElement>} className="py-36 px-6 bg-white text-center" style={{ opacity: 0 }}>
        <div className="max-w-4xl mx-auto">
          <div style={{ width: 48, height: 2, background: 'linear-gradient(90deg, #007AFF, #5856D6)', borderRadius: 2, margin: '0 auto 40px' }} />
          <p style={{ fontSize: 'clamp(20px, 3vw, 36px)', fontWeight: 500, lineHeight: 1.55, letterSpacing: '-0.02em', color: '#1D1D1F', margin: 0 }}>
            {ab.final_quote}
          </p>
          <div style={{ width: 48, height: 2, background: 'linear-gradient(90deg, #5856D6, #007AFF)', borderRadius: 2, margin: '40px auto 0' }} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
