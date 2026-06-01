import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, ShoppingCart, Wifi, Camera, Cable, MapPin, Bluetooth, Fingerprint, type LucideIcon } from 'lucide-react';

import Navbar from './Navbar';
import Footer from './Footer';
import SplitHeading from './SplitHeading';
import SpecsSection from './SpecsSection';
import { useLang } from '../context/LanguageContext';
import { useProductPageCms, cmsToSpecCategories } from '../lib/useProductPageCms';
import { useShopModal } from '../context/ShopModalContext';

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
  showcase_eyebrow: string;
  showcase_title: string;
  showcase_body: string;
  image_subtitle: string;
  image_feat1: string;
  image_feat2: string;
  image_feat3: string;
  bento_eyebrow: string;
  bento_title: string;
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
  const base = tr.laptops as LaptopsTr;
  const cms = useProductPageCms('laptops');
  const cmsSpecs = cmsToSpecCategories(cms);

  const l: LaptopsTr = {
    ...base,
    hero_eyebrow:         cms?.hero_eyebrow       ?? base.hero_eyebrow,
    hero_title:           cms?.hero_title         ?? base.hero_title,
    hero_subtitle:        cms?.hero_subtitle      ?? base.hero_subtitle,
    hero_cta_primary:     cms?.hero_cta_primary   ?? base.hero_cta_primary,
    hero_cta_secondary:   cms?.hero_cta_secondary ?? base.hero_cta_secondary,
    lineup_eyebrow:       cms?.lineup_eyebrow     ?? base.lineup_eyebrow,
    lineup_title:         cms?.lineup_title       ?? base.lineup_title,
    lineup_smartbook_name: cms?.models?.[0]?.name        ?? base.lineup_smartbook_name,
    lineup_smartbook_tag:  cms?.models?.[0]?.tag         ?? base.lineup_smartbook_tag,
    lineup_smartbook_desc: cms?.models?.[0]?.description ?? base.lineup_smartbook_desc,
    lineup_workbook_name:  cms?.models?.[1]?.name        ?? base.lineup_workbook_name,
    lineup_workbook_tag:   cms?.models?.[1]?.tag         ?? base.lineup_workbook_tag,
    lineup_workbook_desc:  cms?.models?.[1]?.description ?? base.lineup_workbook_desc,
    specs_eyebrow:   cms?.specs_eyebrow ?? base.specs_eyebrow,
    specs_title:     cms?.specs_title   ?? base.specs_title,
    specs_categories: cmsSpecs          ?? base.specs_categories,
  };

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
        <ImageSection l={l} />
        <BentoSection l={l} />
        <FeaturesSection l={l} />
        <ShowcaseSection l={l} />
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
    ctx.fillStyle = '#000';
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
    ctx.fillStyle = '#000';
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
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#000' }}>

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
                background: '#000',
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
      style={{ background: '#000', position: 'relative', height: isMobile ? '200vh' : '300vh' }}
    >
      {isMobile ? (
        /* ── Mobile: scroll-driven canvas + text overlay ── */
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
          {/* Canvas fills full screen */}
          <DesignCanvas sectionRef={sectionRef} />

          {/* Text overlay at bottom */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
            padding: '0 20px 36px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.6) 60%, transparent 100%)',
          }}>
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: '#0066CC', display: 'block', marginBottom: 10 }}>
              {l.built_eyebrow}
            </span>
            <h2 style={{ fontSize: 'clamp(28px, 7vw, 40px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.06, color: '#fff', marginBottom: 10 }}>
              {l.built_title}
            </h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, marginBottom: 16 }}>
              {l.built_body}
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {l.built_stats.map(stat => (
                <div key={stat.label} style={{ padding: '8px 14px', borderRadius: 10, textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(8px)' }}>
                  <div style={{ fontSize: 18, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em' }}>{stat.value}</div>
                  <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 3 }}>{stat.label}</div>
                </div>
              ))}
            </div>
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
      <AnimatePresence mode="popLayout" initial={false}>
        {isActive ? (
          /* Active: only description text, no pill */
          <motion.div
            key="desc"
            initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
            transition={{ duration: 0.55, ease: [0.25, 1, 0.3, 1] }}
            style={{
              padding: '14px 18px 16px',
              borderRadius: 18,
              background: 'rgba(20,20,24,0.45)',
              backdropFilter: 'blur(24px) saturate(160%)',
              WebkitBackdropFilter: 'blur(24px) saturate(160%)',
            }}
          >
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.70)', lineHeight: 1.75, margin: 0 }}>
              <strong style={{ color: '#f5f5f7', fontWeight: 700 }}>{f.label}.</strong>{' '}{f.desc}
            </p>
          </motion.div>
        ) : (
          /* Inactive: pill button */
          <motion.button
            key="pill"
            onClick={() => onSelect(i)}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
            transition={{ duration: 0.55, ease: [0.25, 1, 0.3, 1] }}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '12px 22px 12px 12px',
              borderRadius: 100, width: '100%',
              background: 'rgba(20,20,22,0.45)',
              backdropFilter: 'blur(24px) saturate(160%)',
              WebkitBackdropFilter: 'blur(24px) saturate(160%)',
              border: 'none',
              cursor: 'pointer', textAlign: 'left' as const,
            }}
          >
            <div style={{
              width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
              background: 'rgba(255,255,255,0.07)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 20, fontWeight: 300, color: 'rgba(255,255,255,0.65)', lineHeight: 1, marginTop: -1 }}>+</span>
            </div>
            <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.015em', color: 'rgba(255,255,255,0.72)' }}>
              {f.label}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

const FEATURE_IMGS = [
  '/laptops/future1.png',
  '/laptops/future2.png',
  '/laptops/future3.png',
  '/laptops/future4.png',
];

function FeaturesSection({ l }: { l: LaptopsTr }) {
  const [active, setActive] = useState(0);
  const isMobile = useIsMobile();
  const count    = l.features.length;

  return (
    <section id="features" style={{ background: '#000', overflow: 'hidden' }}>
      {isMobile ? (
        /* ── Mobile: full-screen image + overlaid pills ── */
        <div style={{ position: 'relative', height: '100vh', minHeight: 600 }}>
          {/* Full-screen image */}
          <AnimatePresence mode="wait">
            <motion.img
              key={active}
              src={FEATURE_IMGS[active]}
              alt={l.features[active]?.label ?? 'Bikon Laptop'}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              draggable={false}
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                objectFit: 'contain',
              }}
            />
          </AnimatePresence>

          {/* Bottom gradient */}
          <div aria-hidden style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.6) 55%, transparent 100%)',
            pointerEvents: 'none', zIndex: 1,
          }} />

          {/* Eyebrow + title top */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '40px 24px 0', zIndex: 2 }}>
            <div style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)', padding: '24px 0 32px' }}>
              <span style={{
                fontSize: 11, fontWeight: 800, letterSpacing: '0.2em',
                textTransform: 'uppercase' as const, color: '#0066CC',
                display: 'block', marginBottom: 10,
              }}>{l.features_eyebrow}</span>
              <SplitHeading
                text={l.features_title}
                style={{ fontSize: 'clamp(28px, 8vw, 44px)', fontWeight: 900, color: '#f5f5f7', letterSpacing: '-0.045em', lineHeight: 1.06 }}
              />
            </div>
          </div>

          {/* Pills bottom */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2,
            padding: '0 20px 32px',
            display: 'flex', flexDirection: 'column', gap: 8,
          }}>
            {l.features.map((f, i) => (
              <FeaturePill key={i} f={f} i={i} active={active} onSelect={setActive} />
            ))}
          </div>
        </div>
      ) : (
        /* ── Desktop: full-screen image + left overlay panel ── */
        <div style={{ position: 'relative', height: '100vh', minHeight: 640, overflow: 'hidden' }}>

          {/* Full-screen image */}
          <AnimatePresence mode="wait">
            <motion.img
              key={active}
              src={FEATURE_IMGS[active]}
              alt={l.features[active]?.label ?? 'Bikon Laptop'}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              draggable={false}
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                objectFit: 'contain', userSelect: 'none',
              }}
            />
          </AnimatePresence>

          {/* Left gradient overlay */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.75) 30%, rgba(0,0,0,0.2) 60%, transparent 100%)',
          }} />

          {/* Left panel: arrows + heading + pills */}
          <div style={{
            position: 'absolute', top: 0, left: 0, bottom: 0,
            width: 420, display: 'flex', alignItems: 'stretch',
          }}>
            {/* Arrow column */}
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

            {/* Heading + pills */}
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

        </div>
      )}
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   ShowcaseSection — full-bleed showcase image before model lineup
───────────────────────────────────────────────────────────────────────── */
function ShowcaseSection({ l }: { l: LaptopsTr }) {
  const isMobile = useIsMobile();

  return (
    <section style={{
      position: 'relative',
      minHeight: isMobile ? '70vw' : '80vh',
      display: 'flex', alignItems: 'flex-end',
    }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <img
          src="/laptops/showcase.png"
          alt="Bikon Laptops Showcase"
          draggable={false}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.75) 40%, rgba(0,0,0,0.35) 70%, transparent 100%)',
      }} />
      <div style={{
        position: 'relative', zIndex: 2,
        padding: isMobile ? '40px 24px 56px' : '100px 10%',
        maxWidth: 720,
      }}>
        <motion.span
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px' }} transition={{ duration: 0.6 }}
          style={{
            fontSize: 11, fontWeight: 800, letterSpacing: '0.22em',
            textTransform: 'uppercase' as const, color: '#4da3ff',
            display: 'block', marginBottom: 16,
          }}
        >{l.showcase_eyebrow}</motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px' }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: isMobile ? 'clamp(36px,11vw,60px)' : 'clamp(44px,6vw,80px)',
            fontWeight: 900, letterSpacing: '-0.055em', lineHeight: 1.06,
            color: '#fff', marginBottom: 20, whiteSpace: 'pre-line',
          }}
        >{l.showcase_title}</motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px' }} transition={{ duration: 0.7, delay: 0.2 }}
          style={{ fontSize: isMobile ? 14 : 17, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, maxWidth: 480 }}
        >{l.showcase_body}</motion.p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   ModelLineupSection — Smartbook vs Workbook
───────────────────────────────────────────────────────────────────────── */
function ModelLineupSection({ l }: { l: LaptopsTr }) {
  const isMobile = useIsMobile();
  const { open } = useShopModal();
  const models = [
    {
      name:  l.lineup_smartbook_name,
      tag:   l.lineup_smartbook_tag,
      desc:  l.lineup_smartbook_desc,
      image: '/laptops/smartbook.png',
      specs: ['15.6" FHD IPS', 'Celeron N5095', '8GB / 256GB', 'Fingerprint'],
      badge: null as string | null,
    },
    {
      name:  l.lineup_workbook_name,
      tag:   l.lineup_workbook_tag,
      desc:  l.lineup_workbook_desc,
      image: '/laptops/workbook.png',
      specs: ['15.6" FHD IPS', 'Celeron N4000', '8GB / 256GB', 'Win 10 Pro'],
      badge: null as string | null,
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
                  href="javascript:void(0)"
                  onClick={(e) => { e.preventDefault(); open(model.name); }}
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
   ImageSection — split: display photo left, IPS info panel right
───────────────────────────────────────────────────────────────────────── */
function ImageSection({ l }: { l: LaptopsTr }) {
  const isMobile = useIsMobile();

  const feats = [
    { icon: '/icons/wideview.png',    label: l.image_feat1 },
    { icon: '/icons/vividcolors.png', label: l.image_feat2 },
    { icon: '/icons/ips.png',         label: l.image_feat3 },
  ];

  return (
    <section style={{
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      minHeight: isMobile ? 'auto' : '70vh',
      background: '#000',
      overflow: 'hidden',
    }}>
      {/* Left: laptop display photo */}
      <div style={{
        flex: isMobile ? 'none' : '1 1 55%',
        position: 'relative',
        minHeight: isMobile ? '60vw' : '70vh',
        overflow: 'hidden',
      }}>
        <img
          src="/laptops/display.png"
          alt="Bikon Laptop Display"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {!isMobile && (
          <div aria-hidden style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, width: 100,
            background: 'linear-gradient(to right, transparent, #000)',
            zIndex: 1, pointerEvents: 'none',
          }} />
        )}
        {isMobile && (
          <div aria-hidden style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
            background: 'linear-gradient(to top, #000, transparent)',
            zIndex: 1, pointerEvents: 'none',
          }} />
        )}
      </div>

      {/* Right: IPS info panel */}
      <div style={{
        flex: isMobile ? 'none' : '0 0 45%',
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '40px 28px 56px' : '60px 6% 60px 2%',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', maxWidth: 400 }}
        >
          {/* Heading: "IPS DISPLAY" */}
          <div style={{ marginBottom: isMobile ? 10 : 14, lineHeight: 1, whiteSpace: 'nowrap' }}>
            <span style={{
              fontSize: isMobile ? 'clamp(44px,13vw,68px)' : 'clamp(48px,5.5vw,76px)',
              fontWeight: 900, letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #f472b6 0%, #a855f7 45%, #60a5fa 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              marginRight: '0.22em',
            }}>IPS</span>
            <span style={{
              fontSize: isMobile ? 'clamp(44px,13vw,68px)' : 'clamp(48px,5.5vw,76px)',
              fontWeight: 900, letterSpacing: '-0.02em', color: '#fff',
            }}>DISPLAY</span>
          </div>

          {/* Subtitle */}
          <p style={{
            fontSize: isMobile ? 12 : 14,
            fontWeight: 700,
            letterSpacing: '0.14em',
            color: 'rgba(255,255,255,0.4)',
            textTransform: 'uppercase' as const,
            marginBottom: isMobile ? 36 : 52,
            margin: `0 0 ${isMobile ? 36 : 52}px`,
          }}>{l.image_subtitle}</p>

          {/* Three feature icons */}
          <div style={{ display: 'flex', gap: isMobile ? 12 : 20 }}>
            {feats.map(({ icon, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ flex: '1 1 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}
              >
                <div style={{
                  width: '100%', aspectRatio: '1 / 1',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <img src={icon} alt={label} draggable={false} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <span style={{
                  fontSize: isMobile ? 9 : 10, fontWeight: 800, letterSpacing: '0.1em',
                  color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' as const,
                  textAlign: 'center', lineHeight: 1.45,
                }}>{label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   BentoSection — Key features grid
───────────────────────────────────────────────────────────────────────── */
function BentoSection({ l }: { l: LaptopsTr }) {
  const isMobile = useIsMobile();
  const card: React.CSSProperties = { background: '#0c0c0f', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, overflow: 'hidden', position: 'relative' };
  const gt = (g: string): React.CSSProperties => ({ background: g, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' });
  const gc = (desk: string, mob: string) => isMobile ? mob : desk;

  const SMALLS: { label: string; Icon: LucideIcon }[] = [
    { label: 'Wi-Fi 5/6',          Icon: Wifi        },
    { label: 'FHD Webcam',         Icon: Camera      },
    { label: 'Bluetooth 5.0',      Icon: Bluetooth   },
    { label: 'HDMI 1.4',           Icon: Cable       },
    { label: 'Fingerprint ID',     Icon: Fingerprint },
    { label: 'Made in Uzbekistan', Icon: MapPin      },
  ];

  return (
    <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: isMobile ? '60px 16px' : '60px 40px' }}>
      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 28 }}>
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: '#4da3ff' }}>{l.bento_eyebrow}</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(6, 1fr)' : 'repeat(12, 1fr)', gap: 8, maxWidth: 1100, margin: '0 auto', width: '100%' }}
      >
        {/* Title bar */}
        <div style={{ ...card, gridColumn: gc('1 / 13', '1 / 7'), padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.016) 2px, rgba(255,255,255,0.016) 4px)' }}>
          <span style={{ fontSize: isMobile ? 13 : 17, fontWeight: 900, letterSpacing: '0.18em', color: '#fff', textTransform: 'uppercase' as const, textAlign: 'center' }}>{l.bento_title}</span>
        </div>

        {/* Large stat cards */}
        <div style={{ ...card, gridColumn: gc('1 / 5', '1 / 7'), padding: '22px 24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minHeight: 96 }}>
          <span style={{ ...gt('linear-gradient(135deg,#60a5fa,#93c5fd)'), fontSize: isMobile ? 20 : 24, fontWeight: 900, letterSpacing: '0.05em', textTransform: 'uppercase' as const, lineHeight: 1.1 }}>15.6" FHD IPS</span>
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.36)', marginTop: 8, textTransform: 'uppercase' as const }}>FULL HD 1920×1080 DISPLAY</span>
        </div>
        <div style={{ ...card, gridColumn: gc('5 / 9', '1 / 7'), padding: '22px 24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minHeight: 96 }}>
          <span style={{ ...gt('linear-gradient(135deg,#c084fc,#818cf8)'), fontSize: isMobile ? 20 : 24, fontWeight: 900, letterSpacing: '0.05em', textTransform: 'uppercase' as const, lineHeight: 1.1 }}>8 GB DDR4</span>
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.36)', marginTop: 8, textTransform: 'uppercase' as const }}>DUAL-CHANNEL RAM</span>
        </div>
        <div style={{ ...card, gridColumn: gc('9 / 13', '1 / 7'), padding: '22px 24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minHeight: 96 }}>
          <span style={{ ...gt('linear-gradient(135deg,#34d399,#60d4fa)'), fontSize: isMobile ? 20 : 24, fontWeight: 900, letterSpacing: '0.05em', textTransform: 'uppercase' as const, lineHeight: 1.1 }}>256 GB SSD</span>
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.36)', marginTop: 8, textTransform: 'uppercase' as const }}>NVMe HIGH-SPEED STORAGE</span>
        </div>

        {/* Number highlight cards */}
        <div style={{ ...card, gridColumn: gc('1 / 5', '1 / 3'), padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', minHeight: 120 }}>
          <span style={{ fontSize: isMobile ? 22 : 34, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>N5095</span>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: '#4da3ff', marginTop: 8, textTransform: 'uppercase' as const }}>SMARTBOOK CPU</span>
        </div>
        <div style={{ ...card, gridColumn: gc('5 / 9', '3 / 5'), padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 120, background: 'linear-gradient(160deg, #0a1628 0%, #0c0c0f 65%)', position: 'relative' }}>
          <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 80% 70% at 50% 60%, rgba(0,100,220,0.2) 0%, transparent 70%)' }} />
          <span style={{ fontSize: isMobile ? 34 : 54, fontWeight: 900, color: '#fff', letterSpacing: '-0.05em', lineHeight: 1, position: 'relative', zIndex: 1 }}>256 GB</span>
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.36)', marginTop: 6, textTransform: 'uppercase' as const, position: 'relative', zIndex: 1 }}>NVMe SSD</span>
        </div>
        <div style={{ ...card, gridColumn: gc('9 / 13', '5 / 7'), padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', minHeight: 120, textAlign: 'right' }}>
          <span style={{ fontSize: isMobile ? 22 : 34, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>N4000</span>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.36)', marginTop: 8, textTransform: 'uppercase' as const }}>WORKBOOK CPU</span>
        </div>

        {/* Feature cards */}
        <div style={{ ...card, gridColumn: gc('1 / 5', '1 / 7'), padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 16, minHeight: 86 }}>
          <div style={{ width: 42, height: 42, borderRadius: 10, flexShrink: 0, background: 'rgba(148,163,184,0.1)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/>
            </svg>
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', color: '#fff', textTransform: 'uppercase' as const, margin: 0, marginBottom: 3 }}>PLASTIC CHASSIS</p>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.32)', textTransform: 'uppercase' as const, margin: 0 }}>LIGHTWEIGHT DESIGN</p>
          </div>
        </div>
        <div style={{ ...card, gridColumn: gc('5 / 9', '1 / 7'), padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 16, minHeight: 86 }}>
          <div style={{ width: 42, height: 42, borderRadius: 10, flexShrink: 0, overflow: 'hidden' }}>
            <svg viewBox="0 0 88 88" xmlns="http://www.w3.org/2000/svg" width="42" height="42">
              <rect width="88" height="88" fill="#0078D4"/>
              <rect x="6" y="6" width="35" height="35" fill="white"/>
              <rect x="47" y="6" width="35" height="35" fill="white"/>
              <rect x="6" y="47" width="35" height="35" fill="white"/>
              <rect x="47" y="47" width="35" height="35" fill="white"/>
            </svg>
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', color: '#fff', textTransform: 'uppercase' as const, margin: 0, marginBottom: 3 }}>WINDOWS 10 PRO</p>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.32)', textTransform: 'uppercase' as const, margin: 0 }}>PRE-INSTALLED & ACTIVATED</p>
          </div>
        </div>
        <div style={{ ...card, gridColumn: gc('9 / 13', '1 / 7'), padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 16, minHeight: 86 }}>
          <div style={{ width: 42, height: 42, borderRadius: 10, flexShrink: 0, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', color: '#fff', textTransform: 'uppercase' as const, margin: 0, marginBottom: 3 }}>12-MONTH WARRANTY</p>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.32)', textTransform: 'uppercase' as const, margin: 0 }}>FULL COVERAGE</p>
          </div>
        </div>

        {/* Small connectivity chips */}
        {SMALLS.map(({ label, Icon }, i) => {
          const deskCols = ['1/5','5/9','9/13','1/5','5/9','9/13'];
          const mobCols  = ['1/4','4/7','1/4','4/7','1/4','4/7'];
          return (
            <div key={label} style={{ ...card, gridColumn: gc(deskCols[i], mobCols[i]), padding: '14px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 7, minHeight: 70 }}>
              <Icon size={16} strokeWidth={1.8} color="rgba(255,255,255,0.45)" />
              <span style={{ fontSize: isMobile ? 9 : 11, fontWeight: 700, letterSpacing: '0.07em', color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase' as const, textAlign: 'center', lineHeight: 1.3 }}>{label}</span>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   CTASectionLaptops
───────────────────────────────────────────────────────────────────────── */
function CTASectionLaptops({ l }: { l: LaptopsTr }) {
  const isMobile = useIsMobile();
  const { open } = useShopModal();
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
            href="javascript:void(0)" onClick={(e) => { e.preventDefault(); open('Bikon Smartbook'); }}
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
