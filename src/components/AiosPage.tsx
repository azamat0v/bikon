import { useSeo } from '../lib/useSeo';
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

import Navbar from './Navbar';
import Footer from './Footer';
import SplitHeading from './SplitHeading';
import { useLang } from '../context/LanguageContext';
import { useProductPageCms } from '../lib/useProductPageCms';
import { useRouter } from '../context/RouterContext';

interface AiosTr {
  hero_eyebrow: string;
  hero_title: string;
  hero_subtitle: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;
  hero_scroll: string;
  built_title: string;
  compare_matrix_name: string;
  compare_matrix_tag: string;
  compare_optima_name: string;
  compare_optima_tag: string;
  nova_teaser_title: string;
  nova_teaser_body: string;
  models_eyebrow: string;
  models_title: string;
  models_matrix_name: string;
  models_matrix_tag: string;
  models_matrix_desc: string;
  models_optima_name: string;
  models_optima_tag: string;
  models_optima_desc: string;
  models_nova_name: string;
  models_nova_tag: string;
  models_nova_desc: string;
  models_explore: string;
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
export default function AiosPage() {
  const { tr } = useLang();
  const base = (tr as unknown as { aios: AiosTr }).aios;
  const cms = useProductPageCms('aios');

  const l: AiosTr = {
    ...base,
    hero_eyebrow:       cms?.hero_eyebrow       ?? base.hero_eyebrow,
    hero_title:         cms?.hero_title         ?? base.hero_title,
    hero_subtitle:      cms?.hero_subtitle      ?? base.hero_subtitle,
    hero_cta_primary:   cms?.hero_cta_primary   ?? base.hero_cta_primary,
    hero_cta_secondary: cms?.hero_cta_secondary ?? base.hero_cta_secondary,
    models_eyebrow:     cms?.lineup_eyebrow     ?? base.models_eyebrow,
    models_title:       cms?.lineup_title       ?? base.models_title,
    models_matrix_name: cms?.models?.[0]?.name        ?? base.models_matrix_name,
    models_matrix_tag:  cms?.models?.[0]?.tag         ?? base.models_matrix_tag,
    models_matrix_desc: cms?.models?.[0]?.description ?? base.models_matrix_desc,
    models_optima_name: cms?.models?.[1]?.name        ?? base.models_optima_name,
    models_optima_tag:  cms?.models?.[1]?.tag         ?? base.models_optima_tag,
    models_optima_desc: cms?.models?.[1]?.description ?? base.models_optima_desc,
    models_nova_name:   cms?.models?.[2]?.name        ?? base.models_nova_name,
    models_nova_tag:    cms?.models?.[2]?.tag         ?? base.models_nova_tag,
    models_nova_desc:   cms?.models?.[2]?.description ?? base.models_nova_desc,
  };

  useSeo({
    title: "Matrix va Optima AiO — Monoblock taqqoslash | Bikon",
    description: "Bikon Matrix va Optima monoblocklarini solishtiring. 24\" va 27\" ekranli, Intel protsessorli hamyonbop all-in-one kompyuterlar.",
    url: 'https://bikon.uz/aios',
  });

  return (
    <div className="bg-white min-h-screen" style={{ overflowX: 'clip' }}>
      <style>{`
        .aios-sel::selection { background:#fff; color:#000; }
        .aios-sel *::selection { background:#fff; color:#000; }
      `}</style>
      <div className="aios-sel">
        <Navbar />
        <HeroSection l={l} />
        <VideoZoomSection l={l} />
        <ModelNavigationSection l={l} />
        <Footer />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   VideoZoomSection
───────────────────────────────────────────────────────────────────────── */
function VideoZoomSection({ l }: { l: AiosTr }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const rafRef       = useRef<number>(0);
  const progRef      = useRef(0);
  const [prog, setProg] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const sync = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = Math.round(canvas.offsetWidth  * dpr);
      canvas.height = Math.round(canvas.offsetHeight * dpr);
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const lines = l.built_title.split('\n');

    const ci = (x0: number, x1: number, y0: number, y1: number, p: number) => {
      const t = Math.max(0, Math.min(1, (p - x0) / (x1 - x0)));
      return y0 + (y1 - y0) * t * t * (3 - 2 * t);
    };

    const draw = (p: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const dpr  = Math.min(window.devicePixelRatio || 1, 2);
      const cssW = canvas.width  / dpr;
      const cssH = canvas.height / dpr;

      ctx.save();
      ctx.scale(dpr, dpr);

      ctx.font = `900 100px "Outfit", sans-serif`;
      const longest = lines.reduce((a, b) =>
        ctx.measureText(a).width > ctx.measureText(b).width ? a : b
      );
      const fitSize  = (cssW * 0.82) / (ctx.measureText(longest).width / 100);
      const fontSize = fitSize;
      const lineH    = fontSize * 1.08;
      const textY = ci(0.40, 0.54, 0, -cssH * 0.22, p);
      const alpha = ci(0.05, 0.55, 0, 1, p);

      ctx.clearRect(0, 0, cssW, cssH);
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = `rgba(0,0,0,${alpha})`;
      ctx.fillRect(0, 0, cssW, cssH);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.font = `900 ${fontSize}px "Outfit", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;

      const totalH = lines.length * lineH;
      lines.forEach((line, i) => {
        ctx.fillText(line, cssW / 2, cssH / 2 + textY - totalH / 2 + lineH * (i + 0.5));
      });
      ctx.restore();
    };

    const tick = () => {
      const el = containerRef.current;
      if (el) {
        const scrolled = -el.getBoundingClientRect().top;
        const max = el.offsetHeight - window.innerHeight;
        if (max > 0) {
          const next = Math.max(0, Math.min(1, scrolled / max));
          progRef.current = next;
          setProg(p => Math.abs(next - p) > 0.002 ? next : p);
        }
      }
      draw(progRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [l.built_title]);

  const ci = (x0: number, x1: number, y0: number, y1: number) => {
    const t = Math.max(0, Math.min(1, (prog - x0) / (x1 - x0)));
    return y0 + (y1 - y0) * t * t * (3 - 2 * t);
  };

  const optimaOp = Math.min(ci(0.50, 0.60, 0, 1), ci(0.63, 0.70, 1, 0));
  const optimaY  = ci(0.50, 0.60, 28, 0);
  const matrixOp = Math.min(ci(0.68, 0.76, 0, 1), ci(0.79, 0.87, 1, 0));
  const matrixY  = ci(0.68, 0.76, 28, 0);
  const novaOp   = ci(0.84, 0.93, 0, 1);
  const novaY    = ci(0.84, 0.93, 28, 0);

  const overlay = (op: number, y: number): React.CSSProperties => ({
    position: 'absolute', bottom: '10%', left: 0, right: 0, zIndex: 3,
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', textAlign: 'center',
    padding: '0 clamp(24px, 8vw, 120px)',
    opacity: op, transform: `translateY(${y}px)`, pointerEvents: 'none',
  });

  const heading: React.CSSProperties = {
    fontSize: 'clamp(40px, 6.5vw, 92px)', fontWeight: 900,
    letterSpacing: '-0.05em', lineHeight: 1.04, color: '#fff', margin: '0 0 20px',
  };

  const body: React.CSSProperties = {
    fontSize: 'clamp(14px, 1.5vw, 18px)',
    color: 'rgba(255,255,255,0.52)', maxWidth: 560, lineHeight: 1.68,
  };

  return (
    <div ref={containerRef} style={{ height: '620vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#000' }}>
        <video autoPlay loop muted playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          src="/aio/2nd.mp4"
        />
        <canvas ref={canvasRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', opacity: 1 }}
        />
        <div style={overlay(optimaOp, optimaY)}>
          <h2 style={heading}>{l.compare_optima_name}</h2>
          <p style={body}>{l.compare_optima_tag}</p>
        </div>
        <div style={overlay(matrixOp, matrixY)}>
          <h2 style={heading}>{l.compare_matrix_name}</h2>
          <p style={body}>{l.compare_matrix_tag}</p>
        </div>
        <div style={overlay(novaOp, novaY)}>
          <h2 style={heading}>{l.nova_teaser_title}</h2>
          <p style={body}>{l.nova_teaser_body}</p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   HeroSection
───────────────────────────────────────────────────────────────────────── */
function HeroSection({ l }: { l: AiosTr }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [prog, setProg] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const tick = () => {
      const el = containerRef.current;
      if (el) {
        const scrolled = -el.getBoundingClientRect().top;
        const max = el.offsetHeight - window.innerHeight;
        if (max > 0) {
          const next = Math.max(0, Math.min(1, scrolled / max));
          setProg(p => Math.abs(next - p) > 0.001 ? next : p);
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const ci = (x0: number, x1: number, y0: number, y1: number) => {
    const t = Math.max(0, Math.min(1, (prog - x0) / (x1 - x0)));
    const s = t * t * (3 - 2 * t);
    return y0 + (y1 - y0) * s;
  };

  const textOp   = ci(0.20, 0.45, 0, 1);
  const textYpx  = ci(0.20, 0.45, 32, 0);
  const hintOp   = ci(0, 0.08, 1, 0);

  return (
    <div ref={containerRef} style={{ height: '160vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#000' }}>
        <video autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
          <source src="/aio/aiohero.mp4" type="video/mp4" />
        </video>
        <div style={{
          position: 'absolute', bottom: '9%', left: '50%', zIndex: 10,
          transform: `translateX(-50%) translateY(${textYpx}px)`,
          textAlign: 'center', opacity: textOp,
          width: '100%', maxWidth: 680, padding: '0 24px',
          pointerEvents: textOp > 0.1 ? undefined : 'none',
        }}>
          <h1 style={{ fontSize: 'clamp(36px, 5.5vw, 72px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.04, color: '#fff', whiteSpace: 'pre-line', marginBottom: 18 }}>{l.hero_title}</h1>
          <p style={{ fontSize: 'clamp(14px, 1.6vw, 18px)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, marginBottom: 36 }}>{l.hero_subtitle}</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => document.getElementById('models')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ background: '#fff', color: '#000', padding: '13px 28px', borderRadius: 12, fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer', letterSpacing: '-0.01em' }}
            >{l.hero_cta_primary}</button>
            <button
              onClick={() => document.getElementById('models')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ background: 'transparent', color: 'rgba(255,255,255,0.65)', padding: '12px 26px', borderRadius: 12, fontSize: 13, fontWeight: 600, border: '1.5px solid rgba(255,255,255,0.14)', cursor: 'pointer', letterSpacing: '-0.01em' }}
            >{l.hero_cta_secondary}</button>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 20, opacity: hintOp, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, pointerEvents: 'none' }}>
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.3)' }}>{l.hero_scroll}</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown size={18} style={{ color: 'rgba(255,255,255,0.25)' }} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   ModelNavigationSection — 3 cards to Matrix / Optima / Nova pages
───────────────────────────────────────────────────────────────────────── */
function ModelNavigationSection({ l }: { l: AiosTr }) {
  const { navigate } = useRouter();
  const isMobile = useIsMobile();

  const MODELS = [
    {
      name: l.models_matrix_name,
      tag:  l.models_matrix_tag,
      desc: l.models_matrix_desc,
      img:  '/matrix/front.png',
      href: '/matrix' as const,
      accent: '#0066CC',
    },
    {
      name: l.models_optima_name,
      tag:  l.models_optima_tag,
      desc: l.models_optima_desc,
      img:  '/optima/front.png',
      href: '/optima' as const,
      accent: '#4da3ff',
    },
    {
      name: l.models_nova_name,
      tag:  l.models_nova_tag,
      desc: l.models_nova_desc,
      img:  '/nova/front.png',
      href: '/nova' as const,
      accent: '#a78bfa',
    },
  ];

  return (
    <section id="models" style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: isMobile ? '80px 20px' : '100px 40px',
      background: '#030306', position: 'relative', overflow: 'hidden',
    }}>
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(0,102,204,0.07) 0%, transparent 70%)',
      }} />

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: isMobile ? 48 : 72, position: 'relative', zIndex: 1 }}>
        <motion.span
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: '#0066CC', display: 'block', marginBottom: 20 }}
        >{l.models_eyebrow}</motion.span>
        <SplitHeading
          text={l.models_title}
          style={{ fontSize: 'clamp(36px, 5.5vw, 68px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.045em', lineHeight: 1.08 }}
        />
      </div>

      {/* Cards */}
      <motion.div
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: 'flex', flexDirection: isMobile ? 'column' : 'row',
          gap: 16, maxWidth: 1100, margin: '0 auto', width: '100%',
          position: 'relative', zIndex: 1,
        }}
      >
        {MODELS.map(({ name, tag, desc, img, href, accent }, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
            style={{
              flex: 1,
              borderRadius: 24,
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'linear-gradient(180deg, #0f0f12 0%, #0a0a0c 100%)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
            }}
            onClick={() => navigate(href)}
          >
            {/* Image area */}
            <div style={{
              position: 'relative', overflow: 'hidden',
              height: 280,
            }}>
              <div aria-hidden style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: `radial-gradient(ellipse 70% 65% at 50% 55%, ${accent}20 0%, transparent 70%)`,
              }} />
              <img
                src={img} alt={name} draggable={false}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.9))', position: 'relative', zIndex: 1, display: 'block' }}
              />
            </div>

            {/* Content */}
            <div style={{ padding: '20px 28px 32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: 10 }}>
                <span style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
                  textTransform: 'uppercase' as const, color: accent,
                  background: `${accent}18`, border: `1px solid ${accent}30`,
                  padding: '3px 10px', borderRadius: 6, display: 'inline-block', marginBottom: 10,
                }}>{tag}</span>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', margin: 0 }}>{name}</h3>
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: 24, flex: 1 }}>{desc}</p>
              <button
                onClick={(e) => { e.stopPropagation(); navigate(href); }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: accent, color: accent === '#0066CC' ? '#fff' : '#000',
                  padding: '11px 22px', borderRadius: 11, fontSize: 13, fontWeight: 700,
                  border: 'none', cursor: 'pointer', letterSpacing: '-0.01em',
                  width: 'fit-content',
                }}
              >
                {l.models_explore} →
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
