import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, ShoppingCart } from 'lucide-react';

import Navbar from './Navbar';
import Footer from './Footer';
import SplitHeading from './SplitHeading';
import SpecsSection from './SpecsSection';
import { useLang } from '../context/LanguageContext';

/* ─────────────────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────────────────── */
interface LaptopsTr {
  hero_eyebrow: string;
  hero_title: string;
  hero_subtitle: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;
  hero_scroll: string;
  built_eyebrow: string;
  built_title: string;
  built_body: string;
  built_stats: { value: string; label: string }[];
  features_eyebrow: string;
  features_title: string;
  features: { label: string; title: string; desc: string }[];
  lineup_eyebrow: string;
  lineup_title: string;
  lineup_smartbook_name: string;
  lineup_smartbook_tag: string;
  lineup_smartbook_desc: string;
  lineup_workbook_name: string;
  lineup_workbook_tag: string;
  lineup_workbook_desc: string;
  lineup_badge_pro: string;
  lineup_learn: string;
  specs_eyebrow: string;
  specs_title: string;
  specs_smartbook_label: string;
  specs_workbook_label: string;
  specs_categories: { name: string; rows: readonly (readonly string[])[] }[];
  cta_title: string;
  cta_body: string;
  cta_shop: string;
  cta_catalog: string;
}

function useIsMobile(bp = 768) {
  const [mob, setMob] = useState(() => window.innerWidth < bp);
  useEffect(() => {
    const h = () => setMob(window.innerWidth < bp);
    window.addEventListener('resize', h, { passive: true });
    return () => window.removeEventListener('resize', h);
  }, [bp]);
  return mob;
}

/* ─────────────────────────────────────────────────────────────────────────
   Root
───────────────────────────────────────────────────────────────────────── */
export default function LaptopsPage() {
  const { tr } = useLang();
  const l = tr.laptops as LaptopsTr;

  return (
    <div className="bg-black min-h-screen" style={{ overflowX: 'clip' }}>
      <style>{`
        .laptops-sel::selection { background:#fff; color:#000; }
        .laptops-sel *::selection { background:#fff; color:#000; }
        @keyframes float-y-l {
          0%,100% { transform: translateY(0px);   opacity:.18; }
          50%      { transform: translateY(-14px); opacity:.45; }
        }
      `}</style>
      <div className="laptops-sel">
        <Navbar />
        <HeroSection l={l} />
        <BuiltDifferentSection l={l} />
        <FeaturesSection l={l} />
        <ModelLineupSection l={l} />
        <SpecsSection
          eyebrow={l.specs_eyebrow}
          title={l.specs_title}
          col1Label={l.specs_smartbook_label}
          col2Label={l.specs_workbook_label}
          categories={l.specs_categories}
        />
        <CTASectionLaptops l={l} />
        <Footer />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   HeroSection — Canvas scroll animation (40 frames)
───────────────────────────────────────────────────────────────────────── */
const FRAME_COUNT = 40;
const BATCH_SIZE  = 8;

function frameSrc(i: number): string {
  return `/laptops/ezgif-frame-${String(i + 1).padStart(3, '0')}.png`;
}

const PARTICLES = [
  { top: '18%', left: '9%',  size: 2, dur: '8s',   delay: '0s'   },
  { top: '72%', left: '8%',  size: 3, dur: '10s',  delay: '1.2s' },
  { top: '22%', left: '88%', size: 2, dur: '7s',   delay: '0.5s' },
  { top: '64%', left: '84%', size: 3, dur: '9s',   delay: '2s'   },
  { top: '46%', left: '4%',  size: 2, dur: '11s',  delay: '1.5s' },
  { top: '82%', left: '92%', size: 2, dur: '7.5s', delay: '0.8s' },
];

function HeroSection({ l }: { l: LaptopsTr }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const ctxRef       = useRef<CanvasRenderingContext2D | null>(null);
  const dprRef       = useRef(1);
  const framesRef    = useRef<(HTMLImageElement | null)[]>(new Array(FRAME_COUNT).fill(null));
  const curIdxRef    = useRef(0);
  const rafScrollRef = useRef<number>(0);
  const rafDrawRef   = useRef<number>(0);

  const [prog, setProg]           = useState(0);
  const [loadedCount, setLoaded]  = useState(0);
  const [seqReady, setSeqReady]   = useState(false);
  const [showFallback, setFb]     = useState(false);

  /* ── Canvas HiDPI setup ─────────────────────────────────────────── */
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    dprRef.current = dpr;
    canvas.width  = Math.round(rect.width  * dpr);
    canvas.height = Math.round(rect.height * dpr);
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctxRef.current = ctx;
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, rect.width, rect.height);
    drawFrame(curIdxRef.current);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!canvasRef.current) return;
    setupCanvas();
    const ro = new ResizeObserver(setupCanvas);
    ro.observe(canvasRef.current);
    return () => { ro.disconnect(); ctxRef.current = null; };
  }, [setupCanvas]);

  /* ── Draw one frame ─────────────────────────────────────────────── */
  const drawFrame = useCallback((rawIdx: number) => {
    const canvas = canvasRef.current;
    const ctx    = ctxRef.current;
    if (!canvas || !ctx) return;
    const idx = Math.round(Math.min(Math.max(rawIdx, 0), FRAME_COUNT - 1));
    const img  = framesRef.current[idx];
    if (!img?.complete || !img.naturalWidth) return;
    const dpr  = dprRef.current;
    const cssW = canvas.width  / dpr;
    const cssH = canvas.height / dpr;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    const scale = Math.min(cssW / img.naturalWidth, cssH / img.naturalHeight) * 0.82;
    const drawW = img.naturalWidth  * scale;
    const drawH = img.naturalHeight * scale;
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, cssW, cssH);
    ctx.drawImage(img, (cssW - drawW) / 2, (cssH - drawH) / 2, drawW, drawH);
    curIdxRef.current = idx;
  }, []);

  /* ── Scroll → frame drive ───────────────────────────────────────── */
  useEffect(() => {
    const tick = () => {
      const el = containerRef.current;
      if (el) {
        const scrolled = -el.getBoundingClientRect().top;
        const max = el.offsetHeight - window.innerHeight;
        if (max > 0) {
          const next = Math.max(0, Math.min(1, scrolled / max));
          setProg(p => Math.abs(next - p) > 0.001 ? next : p);
          if (seqReady) {
            const fi = Math.min(FRAME_COUNT - 1, Math.round(next * (FRAME_COUNT - 1)));
            cancelAnimationFrame(rafDrawRef.current);
            rafDrawRef.current = requestAnimationFrame(() => drawFrame(fi));
          }
        }
      }
      rafScrollRef.current = requestAnimationFrame(tick);
    };
    rafScrollRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafScrollRef.current);
      cancelAnimationFrame(rafDrawRef.current);
    };
  }, [seqReady, drawFrame]);

  /* ── Load frames in batches ─────────────────────────────────────── */
  useEffect(() => {
    let mounted = true;
    let total   = 0;
    const loadOne = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = 'async';
        const done = () => {
          total++;
          setLoaded(total);
          if (total === FRAME_COUNT && mounted) setSeqReady(true);
          resolve();
        };
        img.onload  = () => { if (mounted) framesRef.current[i] = img; done(); };
        img.onerror = () => done();
        img.src     = frameSrc(i);
      });

    const run = async () => {
      const probe = new Image();
      const exists = await new Promise<boolean>(res => {
        probe.onload  = () => res(true);
        probe.onerror = () => res(false);
        probe.src     = frameSrc(0);
      });
      if (!mounted) return;
      if (!exists) { setFb(true); return; }
      for (let i = 0; i < FRAME_COUNT && mounted; i += BATCH_SIZE) {
        await Promise.all(
          Array.from({ length: Math.min(BATCH_SIZE, FRAME_COUNT - i) }, (_, j) => loadOne(i + j))
        );
        if (i === 0 && mounted) drawFrame(0);
      }
    };
    run();
    return () => {
      mounted = false;
      framesRef.current = new Array(FRAME_COUNT).fill(null);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { if (seqReady) drawFrame(curIdxRef.current); }, [seqReady, drawFrame]);

  /* ── Smoothstep helper ──────────────────────────────────────────── */
  const ci = (x0: number, x1: number, y0: number, y1: number) => {
    const t = Math.max(0, Math.min(1, (prog - x0) / (x1 - x0)));
    const s = t * t * (3 - 2 * t);
    return y0 + (y1 - y0) * s;
  };

  const textOp  = ci(0.70, 0.82, 0, 1);
  const textYpx = ci(0.70, 0.82, 28, 0);
  const hintOp  = ci(0, 0.07, 1, 0);
  const loadPct = loadedCount / FRAME_COUNT;

  return (
    <div ref={containerRef} style={{ height: '300vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#050505' }}>

        {/* Ambient glow */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 55% at 50% 55%, rgba(0,102,204,0.10) 0%, transparent 70%)',
        }} />

        {/* Floating particles */}
        {PARTICLES.map((p, i) => (
          <div key={i} aria-hidden style={{
            position: 'absolute', top: p.top, left: p.left,
            width: p.size, height: p.size, borderRadius: '50%',
            background: '#0066CC', pointerEvents: 'none',
            animation: `float-y-l ${p.dur} ease-in-out ${p.delay} infinite`,
          }} />
        ))}

        {/* Canvas */}
        {!showFallback && (
          <canvas
            ref={canvasRef}
            style={{
              display: 'block', position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              opacity: seqReady ? 1 : 0,
              transition: 'opacity 0.8s ease',
            }}
          />
        )}

        {/* Fallback */}
        {showFallback && (
          <img
            src="/laptop.png"
            alt="Bikon Laptop"
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'contain', padding: '10%',
            }}
          />
        )}

        {/* Loading screen */}
        <AnimatePresence>
          {!seqReady && !showFallback && (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
              style={{
                position: 'absolute', inset: 0, zIndex: 20,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                background: '#050505',
              }}
            >
              <div style={{
                width: 192, height: 128, borderRadius: 16, marginBottom: 32,
                background: 'rgba(255,255,255,0.04)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
                  <rect x="8" y="4" width="64" height="42" rx="4" fill="rgba(255,255,255,0.08)"/>
                  <rect x="12" y="8" width="56" height="34" rx="2" fill="rgba(255,255,255,0.05)"/>
                  <rect x="2" y="46" width="76" height="8" rx="4" fill="rgba(255,255,255,0.06)"/>
                  <rect x="28" y="46" width="24" height="3" rx="1.5" fill="rgba(255,255,255,0.04)"/>
                </svg>
              </div>
              <div style={{ position: 'relative', width: 160, height: 1, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                <motion.div
                  style={{ position: 'absolute', inset: 0, background: '#0066CC', transformOrigin: 'left' }}
                  animate={{ scaleX: loadPct }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                />
              </div>
              <span style={{ marginTop: 16, fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>
                {Math.round(loadPct * 100)}%
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Text overlay */}
        <div style={{
          position: 'absolute', bottom: '9%', left: '50%', zIndex: 10,
          transform: `translateX(-50%) translateY(${textYpx}px)`,
          textAlign: 'center', opacity: textOp,
          width: '100%', maxWidth: 680, padding: '0 24px',
          pointerEvents: textOp > 0.1 ? undefined : 'none',
        }}>
          <span style={{
            fontSize: 11, fontWeight: 800, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#0066CC', display: 'block', marginBottom: 14,
          }}>{l.hero_eyebrow}</span>
          <h1 style={{
            fontSize: 'clamp(36px, 5.5vw, 72px)', fontWeight: 900,
            letterSpacing: '-0.05em', lineHeight: 1.04,
            color: '#fff', whiteSpace: 'pre-line', marginBottom: 18,
          }}>{l.hero_title}</h1>
          <p style={{
            fontSize: 'clamp(14px, 1.6vw, 18px)',
            color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, marginBottom: 36,
          }}>{l.hero_subtitle}</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => document.getElementById('lineup')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: '#fff', color: '#000', padding: '13px 28px',
                borderRadius: 12, fontSize: 13, fontWeight: 700,
                border: 'none', cursor: 'pointer', letterSpacing: '-0.01em',
              }}
            >{l.hero_cta_primary}</button>
            <button
              onClick={() => document.getElementById('specs')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'transparent', color: 'rgba(255,255,255,0.65)',
                padding: '12px 26px', borderRadius: 12, fontSize: 13, fontWeight: 600,
                border: '1.5px solid rgba(255,255,255,0.14)', cursor: 'pointer', letterSpacing: '-0.01em',
              }}
            >{l.hero_cta_secondary}</button>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: 'absolute', bottom: 32, left: '50%',
          transform: 'translateX(-50%)', zIndex: 20, opacity: hintOp,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          pointerEvents: 'none',
        }}>
          <span style={{
            fontSize: 10, fontWeight: 600, letterSpacing: '0.15em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
          }}>{l.hero_scroll}</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown size={18} style={{ color: 'rgba(255,255,255,0.25)' }} />
          </motion.div>
        </div>

      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   BuiltDifferentSection — Design highlight with scroll-driven canvas
───────────────────────────────────────────────────────────────────────── */
function BuiltDifferentSection({ l }: { l: LaptopsTr }) {
  const isMobile  = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      style={{ background: '#000', position: 'relative', height: isMobile ? 'auto' : '300vh' }}
    >
      {isMobile ? (
        /* ── Mobile: static layout ── */
        <div style={{ padding: '80px 20px' }}>
          <div style={{ marginBottom: 40 }}>
            <span style={{
              fontSize: 11, fontWeight: 800, letterSpacing: '0.2em',
              textTransform: 'uppercase' as const, color: '#0066CC',
              display: 'block', marginBottom: 16,
            }}>{l.built_eyebrow}</span>
            <h2 style={{
              fontSize: 'clamp(36px, 9vw, 60px)', fontWeight: 900,
              letterSpacing: '-0.05em', lineHeight: 1.04, color: '#fff', marginBottom: 18,
            }}>{l.built_title}</h2>
            <p style={{
              fontSize: 16, color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, marginBottom: 32,
            }}>{l.built_body}</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {l.built_stats.map(stat => (
                <div key={stat.label} style={{
                  padding: '12px 18px', borderRadius: 12, textAlign: 'center',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.06)',
                }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em' }}>{stat.value}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <div aria-hidden style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse 65% 65% at 50% 50%, rgba(0,102,204,0.13) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <img src="/laptop.png" alt="Bikon Laptop" draggable={false} style={{
              width: '100%', height: 'auto', display: 'block',
              filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.7))',
              position: 'relative', zIndex: 1,
            }} />
          </div>
        </div>
      ) : (
        /* ── Desktop: sticky split + scroll canvas ── */
        <div style={{
          position: 'sticky', top: 0,
          height: '100vh', overflow: 'hidden',
          display: 'flex',
        }}>
          {/* LEFT: text content */}
          <div style={{
            width: '42%', flexShrink: 0,
            background: '#000',
            display: 'flex', alignItems: 'center',
            padding: '0 56px 0 72px',
          }}>
            <div>
              <motion.span
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6 }}
                style={{
                  fontSize: 11, fontWeight: 800, letterSpacing: '0.2em',
                  textTransform: 'uppercase' as const, color: '#0066CC',
                  display: 'block', marginBottom: 20,
                }}
              >{l.built_eyebrow}</motion.span>
              <h2 style={{
                fontSize: 'clamp(36px, 3.8vw, 68px)', fontWeight: 900,
                letterSpacing: '-0.05em', lineHeight: 1.04,
                color: '#fff', marginBottom: 22,
              }}>{l.built_title}</h2>
              <p style={{
                fontSize: 16, color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.75, marginBottom: 40, maxWidth: 400,
              }}>{l.built_body}</p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {l.built_stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.25 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      padding: '14px 20px', borderRadius: 14, textAlign: 'center', minWidth: 80,
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: 'rgba(255,255,255,0.06)',
                      backdropFilter: 'blur(12px)',
                    }}
                  >
                    <div style={{ fontSize: 24, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>{stat.value}</div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 5 }}>{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: scroll-driven canvas */}
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <DesignCanvas sectionRef={sectionRef} />
          </div>
        </div>
      )}
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   DesignCanvas — scroll-driven canvas for BuiltDifferentSection
───────────────────────────────────────────────────────────────────────── */
const HD_FRAME_COUNT = 35;
const HD_BATCH       = 8;

function hdSrc(i: number) {
  return `/laptops/hd/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`;
}

function DesignCanvas({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const ctxRef       = useRef<CanvasRenderingContext2D | null>(null);
  const dprRef       = useRef(1);
  const framesRef    = useRef<(HTMLImageElement | null)[]>(new Array(HD_FRAME_COUNT).fill(null));
  const rafScrollRef = useRef<number>(0);
  const rafDrawRef   = useRef<number>(0);
  const progRef      = useRef(0);

  const [loaded,   setLoaded]   = useState(0);
  const [seqReady, setSeqReady] = useState(false);

  /* ── canvas HiDPI setup ─────────────────────────────────────────── */
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    dprRef.current = dpr;
    canvas.width  = Math.round(rect.width  * dpr);
    canvas.height = Math.round(rect.height * dpr);
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctxRef.current = ctx;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, rect.width, rect.height);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    setupCanvas();
    const ro = new ResizeObserver(setupCanvas);
    ro.observe(canvasRef.current);
    return () => { ro.disconnect(); ctxRef.current = null; };
  }, [setupCanvas]);

  /* ── draw one frame ─────────────────────────────────────────────── */
  const drawFrame = useCallback((rawIdx: number) => {
    const canvas = canvasRef.current;
    const ctx    = ctxRef.current;
    if (!canvas || !ctx) return;
    const idx = Math.round(Math.min(Math.max(rawIdx, 0), HD_FRAME_COUNT - 1));
    const img  = framesRef.current[idx];
    if (!img?.complete || !img.naturalWidth) return;
    const dpr  = dprRef.current;
    const cssW = canvas.width  / dpr;
    const cssH = canvas.height / dpr;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    const scale = Math.min(cssW / img.naturalWidth, cssH / img.naturalHeight);
    const drawW = img.naturalWidth  * scale;
    const drawH = img.naturalHeight * scale;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, cssW, cssH);
    ctx.drawImage(img, (cssW - drawW) / 2, (cssH - drawH) / 2, drawW, drawH);
  }, []);

  /* ── scroll → frame drive ───────────────────────────────────────── */
  useEffect(() => {
    const tick = () => {
      const section = sectionRef.current;
      if (section) {
        const scrolled = -section.getBoundingClientRect().top;
        const max      = section.offsetHeight - window.innerHeight;
        if (max > 0) {
          const p = Math.max(0, Math.min(1, scrolled / max));
          if (Math.abs(p - progRef.current) > 0.0005) {
            progRef.current = p;
            if (seqReady) {
              const fi = Math.min(HD_FRAME_COUNT - 1, Math.round(p * (HD_FRAME_COUNT - 1)));
              cancelAnimationFrame(rafDrawRef.current);
              rafDrawRef.current = requestAnimationFrame(() => drawFrame(fi));
            }
          }
        }
      }
      rafScrollRef.current = requestAnimationFrame(tick);
    };
    rafScrollRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafScrollRef.current);
      cancelAnimationFrame(rafDrawRef.current);
    };
  }, [seqReady, drawFrame, sectionRef]);

  /* ── batch-load frames ──────────────────────────────────────────── */
  useEffect(() => {
    let mounted = true;
    let total   = 0;
    const loadOne = (i: number) =>
      new Promise<void>(resolve => {
        const img  = new Image();
        img.decoding = 'async';
        const done = () => {
          total++;
          setLoaded(total);
          if (total === HD_FRAME_COUNT && mounted) setSeqReady(true);
          resolve();
        };
        img.onload  = () => { if (mounted) framesRef.current[i] = img; done(); };
        img.onerror = () => done();
        img.src     = hdSrc(i);
      });

    const run = async () => {
      for (let i = 0; i < HD_FRAME_COUNT && mounted; i += HD_BATCH) {
        await Promise.all(
          Array.from({ length: Math.min(HD_BATCH, HD_FRAME_COUNT - i) }, (_, j) => loadOne(i + j))
        );
        if (i === 0 && mounted) drawFrame(0);
      }
    };
    run();
    return () => {
      mounted = false;
      framesRef.current = new Array(HD_FRAME_COUNT).fill(null);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { if (seqReady) drawFrame(0); }, [seqReady, drawFrame]);

  const loadPct = loaded / HD_FRAME_COUNT;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#000' }}>
      <canvas
        ref={canvasRef}
        style={{
          display: 'block', position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          opacity: seqReady ? 1 : 0,
          transition: 'opacity 0.7s ease',
        }}
      />

      {/* Loading bar */}
      <AnimatePresence>
        {!seqReady && (
          <motion.div
            key="dc-loader"
            initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
            style={{
              position: 'absolute', inset: 0, zIndex: 5,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              background: '#000',
            }}
          >
            <div style={{ position: 'relative', width: 100, height: 1, background: 'rgba(255,255,255,0.08)', overflow: 'hidden', marginBottom: 10 }}>
              <motion.div
                style={{ position: 'absolute', inset: 0, background: '#0066CC', transformOrigin: 'left' }}
                animate={{ scaleX: loadPct }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
              />
            </div>
            <span style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.2)' }}>
              {Math.round(loadPct * 100)}%
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left-edge fade blending into text column */}
      <div aria-hidden style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: 60,
        pointerEvents: 'none', zIndex: 3,
        background: 'linear-gradient(to right, #000, transparent)',
      }} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   FeaturesSection — Apple "Take a closer look" side-by-side layout
───────────────────────────────────────────────────────────────────────── */
function FeaturePill({
  f, i, active, onSelect,
}: {
  key?: React.Key;
  f: { label: string; desc: string };
  i: number;
  active: number;
  onSelect: (i: number) => void;
}) {
  const isActive = i === active;
  return (
    <div>
      <motion.button
        onClick={() => onSelect(i)}
        whileTap={{ scale: 0.97 }}
        style={{
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '12px 22px 12px 12px',
          borderRadius: 100, width: '100%',
          background: isActive ? 'rgba(80,80,86,0.92)' : 'rgba(38,38,42,0.80)',
          backdropFilter: 'blur(30px) saturate(180%)',
          WebkitBackdropFilter: 'blur(30px) saturate(180%)',
          border: `1px solid ${isActive ? 'rgba(255,255,255,0.32)' : 'rgba(255,255,255,0.11)'}`,
          boxShadow: isActive
            ? '0 2px 24px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.18)'
            : '0 1px 4px rgba(0,0,0,0.4)',
          cursor: 'pointer', textAlign: 'left' as const,
          transition: 'background 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease',
        }}
      >
        <div style={{
          width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
          background: isActive ? 'rgba(255,255,255,0.20)' : 'rgba(255,255,255,0.07)',
          border: `1.5px solid ${isActive ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.20)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.22s ease, border-color 0.22s ease',
        }}>
          {isActive
            ? <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#fff' }} />
            : <span style={{ fontSize: 20, fontWeight: 300, color: 'rgba(255,255,255,0.65)', lineHeight: 1, marginTop: -1 }}>+</span>
          }
        </div>
        <span style={{
          fontSize: 16, fontWeight: 600, letterSpacing: '-0.015em',
          color: isActive ? '#fff' : 'rgba(255,255,255,0.72)',
          transition: 'color 0.22s ease',
        }}>{f.label}</span>
      </motion.button>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="desc"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              margin: '6px 0 4px',
              padding: '18px 22px 20px',
              borderRadius: 18,
              background: 'rgba(20,20,24,0.94)',
              backdropFilter: 'blur(36px) saturate(180%)',
              WebkitBackdropFilter: 'blur(36px) saturate(180%)',
              border: '1px solid rgba(255,255,255,0.10)',
              boxShadow: '0 6px 32px rgba(0,0,0,0.65)',
            }}>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.70)', lineHeight: 1.75, margin: 0 }}>
                <strong style={{ color: '#f5f5f7', fontWeight: 700 }}>{f.label}.</strong>{' '}{f.desc}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FeaturesSection({ l }: { l: LaptopsTr }) {
  const [active, setActive] = useState(0);
  const isMobile = useIsMobile();
  const count    = l.features.length;

  return (
    <section id="features" style={{ background: '#000', overflow: 'hidden' }}>
      {isMobile ? (
        /* ── Mobile ── */
        <div>
          <div style={{ padding: '52px 24px 32px' }}>
            <span style={{
              fontSize: 11, fontWeight: 800, letterSpacing: '0.2em',
              textTransform: 'uppercase' as const, color: '#0066CC',
              display: 'block', marginBottom: 16,
            }}>{l.features_eyebrow}</span>
            <SplitHeading
              text={l.features_title}
              style={{ fontSize: 'clamp(32px, 9vw, 52px)', fontWeight: 900, color: '#f5f5f7', letterSpacing: '-0.045em', lineHeight: 1.06 }}
            />
          </div>
          <div style={{ position: 'relative', width: '100%', height: '56vw', minHeight: 200, overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src="/laptop.png"
                alt={l.features[active]?.label ?? 'Bikon Laptop'}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                draggable={false}
                style={{
                  position: 'absolute', inset: 0, width: '100%', height: '100%',
                  objectFit: 'contain', padding: '4%',
                  filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.8))',
                }}
              />
            </AnimatePresence>
          </div>
          <div style={{ padding: '24px 20px 60px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {l.features.map((f, i) => (
              <FeaturePill key={i} f={f} i={i} active={active} onSelect={setActive} />
            ))}
          </div>
        </div>
      ) : (
        /* ── Desktop: side-by-side split ── */
        <div style={{ display: 'flex', height: '100vh', minHeight: 640, maxHeight: 900 }}>

          {/* LEFT: nav arrows + heading + pills */}
          <div style={{ width: 420, flexShrink: 0, background: '#000', display: 'flex', alignItems: 'stretch' }}>
            <div style={{
              width: 68, flexShrink: 0,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 10,
              borderRight: '1px solid rgba(255,255,255,0.05)',
            }}>
              {([
                { Icon: ChevronUp,   fn: () => setActive(a => Math.max(0, a - 1)),         off: active === 0 },
                { Icon: ChevronDown, fn: () => setActive(a => Math.min(count - 1, a + 1)), off: active === count - 1 },
              ] as const).map(({ Icon, fn, off }, idx) => (
                <button key={idx} onClick={fn} disabled={off} style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: off ? 'default' : 'pointer',
                  opacity: off ? 0.22 : 0.78, transition: 'opacity 0.18s ease',
                }}>
                  <Icon size={18} color="#fff" />
                </button>
              ))}
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 32px 40px 24px' }}>
              <div style={{ marginBottom: 32 }}>
                <span style={{
                  fontSize: 10, fontWeight: 800, letterSpacing: '0.22em',
                  textTransform: 'uppercase' as const, color: '#0066CC',
                  display: 'block', marginBottom: 14,
                }}>{l.features_eyebrow}</span>
                <SplitHeading
                  text={l.features_title}
                  style={{ fontSize: 'clamp(28px, 2.8vw, 44px)', fontWeight: 900, color: '#f5f5f7', letterSpacing: '-0.04em', lineHeight: 1.08 }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {l.features.map((f, i) => (
                  <FeaturePill key={i} f={f} i={i} active={active} onSelect={setActive} />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: static laptop image */}
          <div style={{ flex: 1, position: 'relative', background: '#060608', overflow: 'hidden' }}>
            <div aria-hidden style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'radial-gradient(ellipse 70% 65% at 52% 50%, rgba(0,80,220,0.13) 0%, transparent 62%)',
            }} />
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src="/laptop.png"
                alt={l.features[active]?.label ?? 'Bikon Laptop'}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                draggable={false}
                style={{
                  position: 'absolute', inset: 0, width: '100%', height: '100%',
                  objectFit: 'contain', padding: '8% 10%',
                  filter: 'drop-shadow(0 48px 96px rgba(0,0,0,0.9))',
                  userSelect: 'none',
                }}
              />
            </AnimatePresence>
            <div aria-hidden style={{
              position: 'absolute', top: 0, left: 0, bottom: 0, width: 56,
              pointerEvents: 'none',
              background: 'linear-gradient(to right, #060608, transparent)',
            }} />
          </div>

        </div>
      )}
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   ModelLineupSection — Smartbook vs Workbook
───────────────────────────────────────────────────────────────────────── */
function ModelLineupSection({ l }: { l: LaptopsTr }) {
  const isMobile = useIsMobile();
  const models = [
    {
      name:  l.lineup_smartbook_name,
      tag:   l.lineup_smartbook_tag,
      desc:  l.lineup_smartbook_desc,
      image: '/laptop.png',
      specs: ['15.6" IPS', 'Intel Celeron', '8GB / 256GB', 'Windows 11'],
      badge: null as string | null,
    },
    {
      name:  l.lineup_workbook_name,
      tag:   l.lineup_workbook_tag,
      desc:  l.lineup_workbook_desc,
      image: '/laptop.png',
      specs: ['15.6" IPS', 'Intel Core i5/i7', '16GB / 512GB NVMe', 'Win 11 Pro'],
      badge: l.lineup_badge_pro,
    },
  ];

  return (
    <section id="lineup" style={{ padding: isMobile ? '80px 16px' : '120px 24px', background: '#000' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 48 : 72 }}>
          <motion.span
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: '#0066CC', display: 'block', marginBottom: 20 }}
          >{l.lineup_eyebrow}</motion.span>
          <SplitHeading
            text={l.lineup_title}
            style={{ fontSize: 'clamp(36px, 5.5vw, 68px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.045em', lineHeight: 1.08 }}
          />
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, alignItems: 'stretch' }}>
          {models.map((model, i) => (
            <motion.div
              key={model.name}
              initial={{ opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.14, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
              style={{
                borderRadius: 24, border: '1px solid rgba(255,255,255,0.08)',
                background: 'linear-gradient(180deg, #0f0f12 0%, #0a0a0c 100%)',
                overflow: 'hidden', display: 'flex', flexDirection: 'column',
                position: 'relative',
              }}
            >
              {/* PRO badge */}
              {model.badge && (
                <div style={{
                  position: 'absolute', top: 20, right: 20, zIndex: 2,
                  background: '#0066CC', color: '#fff',
                  fontSize: 10, fontWeight: 800, letterSpacing: '0.1em',
                  padding: '4px 10px', borderRadius: 7,
                }}>{model.badge}</div>
              )}

              {/* Image area */}
              <div style={{ padding: '52px 40px 28px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 280, position: 'relative', overflow: 'hidden' }}>
                <div aria-hidden style={{
                  position: 'absolute', inset: 0,
                  background: 'radial-gradient(ellipse 55% 55% at 50% 65%, rgba(0,102,204,0.13) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }} />
                <motion.img
                  whileHover={{ scale: 1.05, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
                  src={model.image}
                  alt={model.name}
                  style={{ maxHeight: 220, maxWidth: '100%', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))', position: 'relative', zIndex: 1 }}
                />
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '0 32px' }} />

              {/* Info */}
              <div style={{ padding: '28px 32px 40px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: 24, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: 6 }}>{model.name}</h3>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.28)', marginBottom: 16 }}>{model.tag}</p>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: 26, flex: 1 }}>{model.desc}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
                  {model.specs.map(spec => (
                    <span key={spec} style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.55)', background: 'rgba(255,255,255,0.07)', padding: '5px 12px', borderRadius: 8, letterSpacing: '0.04em', border: '1px solid rgba(255,255,255,0.06)' }}>
                      {spec}
                    </span>
                  ))}
                </div>
                <a
                  href="https://shop.bikon.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: '#000', padding: '13px 26px', borderRadius: 12, fontSize: 13, fontWeight: 700, textDecoration: 'none', letterSpacing: '-0.01em', alignSelf: 'flex-start', transition: 'opacity 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  <ShoppingCart size={14} strokeWidth={2.5} />
                  {l.lineup_learn}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   CTASectionLaptops
───────────────────────────────────────────────────────────────────────── */
function CTASectionLaptops({ l }: { l: LaptopsTr }) {
  const isMobile = useIsMobile();
  return (
    <section style={{ background: '#030303', padding: isMobile ? '88px 24px' : '130px 24px', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 65% 75% at 50% 50%, rgba(0,102,204,0.11) 0%, transparent 70%)',
      }} />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 660, margin: '0 auto', textAlign: 'center' }}>
        <SplitHeading
          text={l.cta_title}
          style={{ fontSize: 'clamp(34px, 5.5vw, 70px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.05em', lineHeight: 1.06, marginBottom: 22 }}
        />
        <motion.p
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
          style={{ fontSize: 17, color: 'rgba(255,255,255,0.38)', lineHeight: 1.65, marginBottom: 52 }}
        >{l.cta_body}</motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.25 }}
          style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <motion.a
            href="https://shop.bikon.uz" target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: '#000', padding: '14px 30px', borderRadius: 13, fontSize: 13, fontWeight: 700, textDecoration: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.5)', letterSpacing: '-0.01em' }}
          >
            <ShoppingCart size={15} strokeWidth={2.5} />
            {l.cta_shop}
          </motion.a>
          <motion.a
            href="/Bikon.pdf" target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: 'rgba(255,255,255,0.55)', padding: '13px 28px', borderRadius: 13, fontSize: 13, fontWeight: 600, border: '1.5px solid rgba(255,255,255,0.12)', textDecoration: 'none', letterSpacing: '-0.01em' }}
          >{l.cta_catalog}</motion.a>
        </motion.div>
      </div>
    </section>
  );
}
