import { useEffect, useRef, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLang } from '../context/LanguageContext';

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

/* ════════════════════════════════════════════════════════════════════════════
   About Page
═══════════════════════════════════════════════════════════════════════════ */
export default function AboutPage() {
  const { tr } = useLang();
  const ab = tr.about;

  /* hero */
  const heroRef      = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef   = useRef<HTMLParagraphElement>(null);

  /* section refs */
  const storyRef  = useRef<HTMLElement>(null);
  const whatRef   = useRef<HTMLElement>(null);
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

  /* ── What We Do cards stagger ── */
  useEffect(() => {
    if (!whatRef.current) return;
    revealChildren(whatRef.current, '.what-card');
  }, []);

  /* ── Why choose BIKON — slide from left ── */
  useEffect(() => {
    if (!whyRef.current) return;
    const items = gsap.utils.toArray<HTMLElement>(whyRef.current.querySelectorAll('.why-item'));
    items.forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, x: -56 }, {
        opacity: 1, x: 0, duration: 0.7, delay: i * 0.09, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      });
    });
  }, []);

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
          WHAT WE DO
      ══════════════════════════════════════════════════════════════════ */}
      <section ref={whatRef as RefObject<HTMLElement>} className="py-28 px-6" style={{ background: '#F5F5F7' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <div className="accent-label mb-5 mx-auto" style={{ width: 'fit-content' }}>{ab.what_label}</div>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#111' }}>
              {ab.what_title}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
                  opacity: 0,
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

          <p style={{ marginTop: 40, textAlign: 'center', fontSize: 15, color: '#888', maxWidth: 640, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.75 }}>
            {ab.what_summary}
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          WHY CHOOSE BIKON?
      ══════════════════════════════════════════════════════════════════ */}
      <section ref={whyRef as RefObject<HTMLElement>} className="py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <div className="accent-label mb-5">{ab.why_label}</div>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#111' }}>
              {ab.why_title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ab.why_items.map((item, i) => (
              <div
                key={i}
                className="why-item"
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 16,
                  padding: '22px 24px', borderRadius: 16,
                  border: '1px solid rgba(0,0,0,0.06)', background: '#FAFAFA',
                  opacity: 0,
                }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, color: '#fff', fontSize: 16,
                }}>✓</div>
                <p style={{ fontSize: 15, color: '#333', lineHeight: 1.6, fontWeight: 500, margin: 0, paddingTop: 7 }}>
                  {item}
                </p>
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
