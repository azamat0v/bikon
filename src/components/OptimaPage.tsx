import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Wifi, Camera, Cable, Zap, RotateCw, Volume2, MapPin, Layers, Monitor, Bluetooth, Headphones, type LucideIcon } from 'lucide-react';

import Navbar from './Navbar';
import Footer from './Footer';
import SplitHeading from './SplitHeading';
import SpecsSection from './SpecsSection';
import { FloatingPathsBackground } from './ui/floating-paths';
import { useLang } from '../context/LanguageContext';

interface OptimaTr {
  hero_eyebrow: string;
  hero_title: string;
  hero_subtitle: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;
  lineup_eyebrow: string;
  lineup_title: string;
  lineup_name: string;
  lineup_tag: string;
  lineup_desc: string;
  lineup_specs: string[];
  lineup_learn: string;
  specs_eyebrow: string;
  specs_title: string;
  specs_label: string;
  specs_categories: { name: string; rows: readonly (readonly string[])[] }[];
  cta_title: string;
  cta_body: string;
  cta_shop: string;
  cta_catalog: string;
  display_eyebrow: string;
  display_title: string;
  display_body: string;
  display_title_24: string;
  display_body_24: string;
  back_eyebrow: string;
  back_title: string;
  back_body: string;
  apps_eyebrow: string;
  apps_title: string;
  apps_body: string;
  bento_eyebrow: string;
  bento_title: string;
  connectivity_eyebrow: string;
  connectivity_title: string;
  connectivity_body: string;
  cam_eyebrow: string;
  cam_title: string;
  cam_body: string;
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
export default function OptimaPage() {
  const { tr } = useLang();
  const l = (tr as unknown as { optima: OptimaTr }).optima;

  return (
    <div className="bg-black min-h-screen" style={{ overflowX: 'clip' }}>
      <style>{`
        .optima-sel::selection { background:#fff; color:#000; }
        .optima-sel *::selection { background:#fff; color:#000; }
        @keyframes float-y-o {
          0%,100% { transform: translateY(0px);   opacity:.10; }
          50%      { transform: translateY(-12px); opacity:.28; }
        }
      `}</style>
      <div className="optima-sel">
        <Navbar />
        <HeroSection l={l} />
        <DisplaySection l={l} />
        <BackSection l={l} />
        <CameraAndSoundSection l={l} />
        <ConnectivitySection l={l} />
        <BentoSection l={l} />
        <AppsSection l={l} />
        <SpecsSection
          eyebrow={l.specs_eyebrow}
          title={l.specs_title}
          col1Label={l.specs_label}
          col2Label=""
          categories={l.specs_categories}
        />
        <LineupSection l={l} />
        <CTASection l={l} />
        <Footer />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   HeroSection — scroll-driven with herobackground.mp4
───────────────────────────────────────────────────────────────────────── */
function HeroSection({ l }: { l: OptimaTr }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [prog, setProg] = useState(0);
  const rafRef = useRef<number>(0);
  const isMobile = useIsMobile();

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

  const textOp  = Math.max(0, Math.min(1, (prog - 0.15) / 0.30));
  const textYpx = 32 * (1 - Math.min(1, (prog - 0.15) / 0.30));
  const hintOp  = Math.max(0, 1 - prog / 0.08);

  return (
    <div ref={containerRef} style={{ height: '160vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#000' }}>
        <video autoPlay loop muted playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          src="/optima/herobackground.mp4"
        />
        <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', pointerEvents: 'none' }} />

        <div style={{
          position: 'absolute', bottom: '9%', left: '50%', zIndex: 10,
          transform: `translateX(-50%) translateY(${textYpx}px)`,
          textAlign: 'center', opacity: textOp,
          width: '100%', maxWidth: 680, padding: '0 24px',
          pointerEvents: textOp > 0.1 ? undefined : 'none',
        }}>
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: '#4da3ff', display: 'block', marginBottom: 14 }}>{l.hero_eyebrow}</span>
          <h1 style={{ fontSize: isMobile ? 'clamp(36px, 10vw, 60px)' : 'clamp(44px, 5.5vw, 72px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.04, color: '#fff', whiteSpace: 'pre-line', marginBottom: 18 }}>{l.hero_title}</h1>
          <p style={{ fontSize: 'clamp(14px, 1.6vw, 18px)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, marginBottom: 36 }}>{l.hero_subtitle}</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => document.getElementById('specs')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ background: '#fff', color: '#000', padding: '13px 28px', borderRadius: 12, fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer', letterSpacing: '-0.01em' }}
            >{l.hero_cta_primary}</button>
            <button
              onClick={() => document.getElementById('specs')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ background: 'transparent', color: 'rgba(255,255,255,0.65)', padding: '12px 26px', borderRadius: 12, fontSize: 13, fontWeight: 600, border: '1.5px solid rgba(255,255,255,0.14)', cursor: 'pointer', letterSpacing: '-0.01em' }}
            >{l.hero_cta_secondary}</button>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 20, opacity: hintOp, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, pointerEvents: 'none' }}>
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.3)' }}>Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   DisplaySection — scroll-driven 24" → 27" transition
───────────────────────────────────────────────────────────────────────── */
function DisplaySection({ l }: { l: OptimaTr }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef       = useRef<number>(0);
  const [progress, setProgress] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const tick = () => {
      const el = containerRef.current;
      if (el) {
        const scrolled = -el.getBoundingClientRect().top;
        const max = el.offsetHeight - window.innerHeight;
        if (max > 0) setProgress(Math.max(0, Math.min(1, scrolled / max)));
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const t = Math.max(0, Math.min(1, (progress - 0.30) / 0.40));
  const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const imageScale = 1 + ease * 0.13;

  if (isMobile) {
    return (
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
        <FloatingPathsBackground position={-1} className="absolute inset-0 w-full h-full" pathClassName="opacity-60" />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40, position: 'relative', zIndex: 1, width: '100%' }}>
          <motion.img
            src="/optima/front.png" alt="Optima Display" draggable={false}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9 }}
            style={{ width: '100%', maxWidth: 340, objectFit: 'contain', filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.85))' }}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
            style={{ textAlign: 'center' }}
          >
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: '#4da3ff', display: 'block', marginBottom: 16 }}>{l.display_eyebrow}</span>
            <h2 style={{ fontSize: 'clamp(30px, 9vw, 48px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.06, color: '#fff', whiteSpace: 'pre-line', marginBottom: 18 }}>{l.display_title}</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.48)', lineHeight: 1.75 }}>{l.display_body}</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <div ref={containerRef} style={{ height: '280vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', padding: '0 10%' }}>
        <FloatingPathsBackground position={-1} className="absolute inset-0 w-full h-full" pathClassName="opacity-60" />
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8%', width: '100%', position: 'relative', zIndex: 1 }}>
          <div style={{ flex: '0 0 46%', display: 'flex', justifyContent: 'center' }}>
            <img
              src="/optima/front.png" alt="Optima Display" draggable={false}
              style={{ width: '100%', maxWidth: 620, height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 32px 64px rgba(0,0,0,0.9))', transform: `scale(${imageScale})`, transition: 'transform 0.05s linear', transformOrigin: 'center center' }}
            />
          </div>
          <div style={{ flex: 1, position: 'relative' }}>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: '#4da3ff', display: 'block', marginBottom: 18 }}>{l.display_eyebrow}</span>
            <div style={{ position: 'relative', height: 56, marginBottom: 6, overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, opacity: 1 - ease, transform: `translateY(${ease * -24}px)`, display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 44, fontWeight: 900, color: '#fff', letterSpacing: '-0.06em', lineHeight: 1 }}>24"</span>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' as const, lineHeight: 1.4 }}>Full HD<br/>IPS</span>
              </div>
              <div style={{ position: 'absolute', inset: 0, opacity: ease, transform: `translateY(${(1 - ease) * 24}px)`, display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 44, fontWeight: 900, letterSpacing: '-0.06em', lineHeight: 1, background: 'linear-gradient(135deg, #a78bfa, #60d4fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>27"</span>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: '#4da3ff', textTransform: 'uppercase' as const, lineHeight: 1.4 }}>QHD<br/>IPS</span>
              </div>
            </div>
            <div style={{ position: 'relative', marginBottom: 20, overflow: 'hidden' }}>
              <h2 style={{ position: 'absolute', top: 0, left: 0, fontSize: 'clamp(28px, 3.6vw, 52px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.06, color: '#fff', whiteSpace: 'pre-line', margin: 0, opacity: 1 - ease, transform: `translateY(${ease * -20}px)`, transition: 'none' }}>{l.display_title_24}</h2>
              <h2 style={{ fontSize: 'clamp(28px, 3.6vw, 52px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.06, color: '#fff', whiteSpace: 'pre-line', margin: 0, opacity: ease, transform: `translateY(${(1 - ease) * 20}px)`, transition: 'none', visibility: ease < 0.01 ? 'hidden' : 'visible' }}>{l.display_title}</h2>
            </div>
            <div style={{ position: 'relative', minHeight: 120 }}>
              <p style={{ position: 'absolute', top: 0, left: 0, fontSize: 'clamp(13px, 1.3vw, 16px)', color: 'rgba(255,255,255,0.48)', lineHeight: 1.75, maxWidth: 480, margin: 0, opacity: 1 - ease, transition: 'none' }}>{l.display_body_24}</p>
              <p style={{ fontSize: 'clamp(13px, 1.3vw, 16px)', color: 'rgba(255,255,255,0.48)', lineHeight: 1.75, maxWidth: 480, margin: 0, opacity: ease, transition: 'none', visibility: ease < 0.01 ? 'hidden' : 'visible' }}>{l.display_body}</p>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 32 }}>
              {[0, 1].map((i) => (
                <div key={i} style={{ height: 8, borderRadius: 4, background: (i === 0 ? ease < 0.5 : ease >= 0.5) ? '#4da3ff' : 'rgba(255,255,255,0.18)', transition: 'background 0.3s ease, width 0.3s ease', ...(i === 1 ? { width: ease >= 0.5 ? 20 : 8 } : { width: ease < 0.5 ? 20 : 8 }) }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   BackSection
───────────────────────────────────────────────────────────────────────── */
function BackSection({ l }: { l: OptimaTr }) {
  const isMobile = useIsMobile();
  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: isMobile ? '80px 24px' : '0 10%', overflow: 'hidden', position: 'relative' }}>
      <FloatingPathsBackground position={1} className="absolute inset-0 w-full h-full" pathClassName="opacity-60" />
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row-reverse', alignItems: 'center', gap: isMobile ? 48 : '8%', position: 'relative', zIndex: 1, width: '100%' }}>
        <motion.div
          initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          style={{ flex: '0 0 46%', display: 'flex', justifyContent: 'center' }}
        >
          <img src="/optima/back.png" alt="Optima Rear Design" draggable={false}
            style={{ width: '100%', maxWidth: 480, height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 32px 64px rgba(0,0,0,0.9))' }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{ flex: 1 }}
        >
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: '#4da3ff', display: 'block', marginBottom: 18 }}>{l.back_eyebrow}</span>
          <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 62px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.06, color: '#fff', whiteSpace: 'pre-line', marginBottom: 22 }}>{l.back_title}</h2>
          <p style={{ fontSize: 'clamp(14px, 1.4vw, 17px)', color: 'rgba(255,255,255,0.48)', lineHeight: 1.75, maxWidth: 480 }}>{l.back_body}</p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   CameraAndSoundSection
───────────────────────────────────────────────────────────────────────── */
function CameraAndSoundSection({ l }: { l: OptimaTr }) {
  const isMobile = useIsMobile();

  const featureCard = (Icon: React.ElementType, title: string, spec: string) => (
    <motion.div
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 16 }}
    >
      <div style={{ width: 44, height: 44, borderRadius: 11, flexShrink: 0, background: 'rgba(77,163,255,0.1)', border: '1px solid rgba(77,163,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={20} color="#4da3ff" strokeWidth={1.8} />
      </div>
      <div>
        <p style={{ fontSize: 13, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em', margin: 0, marginBottom: 4 }}>{title}</p>
        <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.04em', margin: 0 }}>{spec}</p>
      </div>
    </motion.div>
  );

  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: isMobile ? '80px 24px' : '0 10%', overflow: 'hidden', position: 'relative' }}>
      <FloatingPathsBackground position={-1} className="absolute inset-0 w-full h-full" pathClassName="opacity-60" />
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: isMobile ? 48 : '8%', position: 'relative', zIndex: 1, width: '100%' }}>
        <motion.div
          initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          style={{ flex: '0 0 45%', display: 'flex', justifyContent: 'center' }}
        >
          <img src="/optima/camera.png" alt="Optima Camera" draggable={false}
            style={{ width: '100%', maxWidth: 440, height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 32px 64px rgba(0,0,0,0.85))' }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{ flex: 1 }}
        >
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: '#4da3ff', display: 'block', marginBottom: 18 }}>{l.cam_eyebrow}</span>
          <SplitHeading text={l.cam_title} style={{ fontSize: 'clamp(32px, 4.5vw, 62px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.05em', lineHeight: 1.06, marginBottom: 20 }} />
          <p style={{ fontSize: 'clamp(14px, 1.4vw, 17px)', color: 'rgba(255,255,255,0.48)', lineHeight: 1.75, maxWidth: 460, marginBottom: 32 }}>{l.cam_body}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {featureCard(Camera, 'Full HD Webcam', '2MP · 1080p · 30fps')}
            {featureCard(Volume2, 'Stereo Speakers', '2×5W · Crystal Clear Audio')}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   ConnectivitySection — Optima ports (older gen)
───────────────────────────────────────────────────────────────────────── */
const OPTIMA_PORTS: { Icon: React.ElementType; label: string; spec: string }[] = [
  { Icon: Monitor,    label: 'HDMI 1.4',  spec: 'Video Output'  },
  { Icon: Monitor,    label: 'VGA',       spec: 'D-SUB Output'  },
  { Icon: Cable,      label: 'USB-A ×4',  spec: 'USB 2.0/3.0'  },
  { Icon: Headphones, label: '3.5mm',     spec: 'Audio Jack'    },
  { Icon: Wifi,       label: 'Wi-Fi',     spec: '802.11n'       },
  { Icon: Bluetooth,  label: 'BT 4.0',    spec: 'Bluetooth'     },
];

function ConnectivitySection({ l }: { l: OptimaTr }) {
  const isMobile = useIsMobile();
  return (
    <section style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: isMobile ? '80px 24px' : '80px 40px',
      background: '#080808',
      backgroundImage: [
        'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
        'linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
      ].join(', '),
      backgroundSize: '120px 120px, 120px 120px',
      position: 'relative',
    }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(4,4,4,0.7) 100%)' }} />
      <div style={{ textAlign: 'center', marginBottom: isMobile ? 48 : 64, position: 'relative', zIndex: 1 }}>
        <motion.span
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: '#4da3ff', display: 'block', marginBottom: 18 }}
        >{l.connectivity_eyebrow}</motion.span>
        <SplitHeading text={l.connectivity_title} style={{ fontSize: 'clamp(36px, 5vw, 68px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.05em', lineHeight: 1.05, marginBottom: 20 }} />
        <motion.p
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
          style={{ fontSize: 'clamp(14px, 1.4vw, 17px)', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, maxWidth: 540, margin: '0 auto' }}
        >{l.connectivity_body}</motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', maxWidth: 860, position: 'relative', zIndex: 1 }}
      >
        {OPTIMA_PORTS.map(({ Icon, label, spec }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '22px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, minWidth: isMobile ? 130 : 150, flex: '1 1 140px', maxWidth: 180, cursor: 'default', transition: 'background 0.25s ease, border-color 0.25s ease' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(77,163,255,0.22)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'; }}
          >
            <div style={{ width: 44, height: 44, borderRadius: 11, background: 'rgba(77,163,255,0.08)', border: '1px solid rgba(77,163,255,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon size={20} color="#4da3ff" strokeWidth={1.7} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 13, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em', margin: 0, marginBottom: 4 }}>{label}</p>
              <p style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.36)', letterSpacing: '0.06em', textTransform: 'uppercase' as const, margin: 0 }}>{spec}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   BentoSection — Optima-specific specs
───────────────────────────────────────────────────────────────────────── */
function BentoSection({ l }: { l: OptimaTr }) {
  const isMobile = useIsMobile();

  const card: React.CSSProperties = { background: '#0c0c0f', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, overflow: 'hidden', position: 'relative' };
  const gt = (g: string): React.CSSProperties => ({ background: g, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' });
  const gc = (desk: string, mob: string) => isMobile ? mob : desk;

  const SMALLS_1: { label: string; Icon: LucideIcon }[] = [
    { label: 'Wi-Fi',          Icon: Wifi     },
    { label: 'Full HD Webcam', Icon: Camera   },
    { label: 'HDMI 1.4',       Icon: Cable    },
    { label: 'VGA Port',       Icon: Zap      },
  ];
  const SMALLS_2: { label: string; Icon: LucideIcon }[] = [
    { label: 'Portrait 90°',       Icon: RotateCw },
    { label: 'Stereo Speakers',    Icon: Volume2  },
    { label: 'Made in Uzbekistan', Icon: MapPin   },
    { label: 'H61 Chipset',        Icon: Layers   },
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
        <div style={{ ...card, gridColumn: gc('1 / 13', '1 / 7'), padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.016) 2px, rgba(255,255,255,0.016) 4px)' }}>
          <span style={{ fontSize: isMobile ? 13 : 17, fontWeight: 900, letterSpacing: '0.18em', color: '#fff', textTransform: 'uppercase' as const, textAlign: 'center' }}>{l.bento_title}</span>
        </div>

        <div style={{ ...card, gridColumn: gc('1 / 5', '1 / 7'), padding: '22px 24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minHeight: 96 }}>
          <span style={{ ...gt('linear-gradient(135deg,#a78bfa,#60d4fa)'), fontSize: isMobile ? 20 : 24, fontWeight: 900, letterSpacing: '0.05em', textTransform: 'uppercase' as const, lineHeight: 1.1 }}>24" / 27" IPS</span>
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.36)', marginTop: 8, textTransform: 'uppercase' as const }}>FHD / QHD CRYSTAL CLEAR DISPLAY</span>
        </div>
        <div style={{ ...card, gridColumn: gc('5 / 9', '1 / 7'), padding: '22px 24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minHeight: 96 }}>
          <span style={{ ...gt('linear-gradient(135deg,#c084fc,#818cf8)'), fontSize: isMobile ? 20 : 24, fontWeight: 900, letterSpacing: '0.05em', textTransform: 'uppercase' as const, lineHeight: 1.1 }}>99% sRGB</span>
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.36)', marginTop: 8, textTransform: 'uppercase' as const }}>TRUE COLOR ACCURACY</span>
        </div>
        <div style={{ ...card, gridColumn: gc('9 / 13', '1 / 7'), padding: '22px 24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minHeight: 96 }}>
          <span style={{ ...gt('linear-gradient(135deg,#34d399,#60d4fa)'), fontSize: isMobile ? 20 : 24, fontWeight: 900, letterSpacing: '0.05em', textTransform: 'uppercase' as const, lineHeight: 1.1 }}>INTEL Core i3·i5·i7</span>
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.36)', marginTop: 8, textTransform: 'uppercase' as const }}>2ND–3RD GEN PROCESSOR</span>
        </div>

        <div style={{ ...card, gridColumn: gc('1 / 5', '1 / 3'), padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', minHeight: 120 }}>
          <span style={{ fontSize: isMobile ? 30 : 44, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>75Hz</span>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: '#FFB900', marginTop: 8, textTransform: 'uppercase' as const }}>REFRESH RATE</span>
        </div>
        <div style={{ ...card, gridColumn: gc('5 / 9', '3 / 5'), padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 120, background: 'linear-gradient(160deg, #0a1628 0%, #0c0c0f 65%)', position: 'relative' }}>
          <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 80% 70% at 50% 60%, rgba(0,100,220,0.2) 0%, transparent 70%)' }} />
          <span style={{ fontSize: isMobile ? 34 : 54, fontWeight: 900, color: '#fff', letterSpacing: '-0.05em', lineHeight: 1, position: 'relative', zIndex: 1 }}>16 GB</span>
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.36)', marginTop: 6, textTransform: 'uppercase' as const, position: 'relative', zIndex: 1 }}>DDR3 MEMORY</span>
        </div>
        <div style={{ ...card, gridColumn: gc('9 / 13', '5 / 7'), padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', minHeight: 120, textAlign: 'right' }}>
          <span style={{ fontSize: isMobile ? 30 : 44, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>H61</span>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.36)', marginTop: 8, textTransform: 'uppercase' as const }}>LGA 1155</span>
        </div>

        <div style={{ ...card, gridColumn: gc('1 / 5', '1 / 7'), padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 16, minHeight: 86 }}>
          <div style={{ width: 42, height: 42, borderRadius: 10, flexShrink: 0, background: 'rgba(148,163,184,0.1)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', color: '#fff', textTransform: 'uppercase' as const, margin: 0, marginBottom: 3 }}>SLIM CHASSIS</p>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.32)', textTransform: 'uppercase' as const, margin: 0 }}>ALL-IN-ONE DESIGN</p>
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
            <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', color: '#fff', textTransform: 'uppercase' as const, margin: 0, marginBottom: 3 }}>WINDOWS 11 PRO</p>
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

        {[...SMALLS_1, ...SMALLS_2].map(({ label, Icon }, i) => {
          const deskCols = ['1 / 4','4 / 7','7 / 10','10 / 13','1 / 4','4 / 7','7 / 10','10 / 13'];
          const mobCols  = ['1 / 4','4 / 7','1 / 4','4 / 7','1 / 4','4 / 7','1 / 4','4 / 7'];
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
   AppsSection
───────────────────────────────────────────────────────────────────────── */
const WIN_APPS_O = [
  { label: 'Word',     bg: '#2B579A', icon: <svg viewBox="0 0 32 32" width="26" height="26"><rect x="1" y="1" width="30" height="30" rx="4" fill="#2B579A"/><text x="16" y="22" textAnchor="middle" fill="white" fontSize="16" fontWeight="900" fontFamily="Arial">W</text></svg> },
  { label: 'Excel',    bg: '#217346', icon: <svg viewBox="0 0 32 32" width="26" height="26"><rect x="1" y="1" width="30" height="30" rx="4" fill="#217346"/><text x="16" y="22" textAnchor="middle" fill="white" fontSize="16" fontWeight="900" fontFamily="Arial">X</text></svg> },
  { label: 'PowerPoint', bg: '#B7472A', icon: <svg viewBox="0 0 32 32" width="26" height="26"><rect x="1" y="1" width="30" height="30" rx="4" fill="#B7472A"/><text x="16" y="22" textAnchor="middle" fill="white" fontSize="16" fontWeight="900" fontFamily="Arial">P</text></svg> },
  { label: 'Outlook',  bg: '#0078D4', icon: <svg viewBox="0 0 32 32" width="26" height="26"><rect x="1" y="1" width="30" height="30" rx="4" fill="#0078D4"/><text x="16" y="22" textAnchor="middle" fill="white" fontSize="14" fontWeight="900" fontFamily="Arial">O</text></svg> },
  { label: 'Teams',    bg: '#6264A7', icon: <svg viewBox="0 0 32 32" width="26" height="26"><rect x="1" y="1" width="30" height="30" rx="4" fill="#6264A7"/><text x="16" y="22" textAnchor="middle" fill="white" fontSize="14" fontWeight="900" fontFamily="Arial">T</text></svg> },
  { label: 'Edge',     bg: '#0078D4', icon: <svg viewBox="0 0 32 32" width="26" height="26"><rect x="1" y="1" width="30" height="30" rx="4" fill="#0078D4"/><path d="M8 20c0-6 4-10 10-10 2 0 4 .5 5 1.5C21 8 18 6 15 6 9 6 5 11 5 16c0 3 1.5 6 4 8 1 .5 2 .8 3 .8 3 0 5-1 6.5-3H12C9.5 21.8 8 21 8 20z" fill="white"/></svg> },
  { label: 'OneDrive', bg: '#0078D4', icon: <svg viewBox="0 0 32 32" width="26" height="26"><rect x="1" y="1" width="30" height="30" rx="4" fill="#0078D4"/><path d="M6 20c0-3 2-5 5-5 .5 0 1 .1 1.5.2C13 13 15 12 17 12c3 0 5 2 5 5 1.5.5 3 2 3 4H4c0-1 1-2 2-2.5V20z" fill="white"/></svg> },
  { label: 'Notepad',  bg: '#FFD700', icon: <svg viewBox="0 0 32 32" width="26" height="26"><rect x="1" y="1" width="30" height="30" rx="4" fill="#FFF5CC"/><rect x="6" y="9" width="20" height="2" rx="1" fill="#333"/><rect x="6" y="14" width="20" height="2" rx="1" fill="#333"/><rect x="6" y="19" width="14" height="2" rx="1" fill="#333"/></svg> },
];

function AppsSection({ l }: { l: OptimaTr }) {
  const isMobile = useIsMobile();
  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: isMobile ? '80px 24px' : '0 10%', overflow: 'hidden', position: 'relative', background: '#000' }}>
      <FloatingPathsBackground position={1} className="absolute inset-0 w-full h-full" pathClassName="opacity-60" />
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: isMobile ? 48 : '8%', position: 'relative', zIndex: 1, width: '100%' }}>
        <motion.div
          initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          style={{ flex: '0 0 45%' }}
        >
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: '#4da3ff', display: 'block', marginBottom: 18 }}>{l.apps_eyebrow}</span>
          <SplitHeading text={l.apps_title} style={{ fontSize: 'clamp(32px, 4.5vw, 62px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.05em', lineHeight: 1.06, marginBottom: 20 }} />
          <p style={{ fontSize: 'clamp(14px, 1.4vw, 17px)', color: 'rgba(255,255,255,0.48)', lineHeight: 1.75, maxWidth: 460 }}>{l.apps_body}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}
        >
          {WIN_APPS_O.map(({ label, bg, icon }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 56, height: 56, borderRadius: 14, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 16px ${bg}44` }}>
                {icon}
              </div>
              <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em', textAlign: 'center' }}>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   LineupSection
───────────────────────────────────────────────────────────────────────── */
function LineupSection({ l }: { l: OptimaTr }) {
  const isMobile = useIsMobile();
  return (
    <section id="lineup" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: isMobile ? '80px 16px' : '0 24px', position: 'relative', overflow: 'hidden' }}>
      <FloatingPathsBackground position={1} className="absolute inset-0 w-full h-full" pathClassName="opacity-60" />
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 48 : 72 }}>
          <motion.span
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: '#0066CC', display: 'block', marginBottom: 20 }}
          >{l.lineup_eyebrow}</motion.span>
          <SplitHeading text={l.lineup_title} style={{ fontSize: 'clamp(36px, 5.5vw, 68px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.045em', lineHeight: 1.08 }} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
          style={{ maxWidth: 520, margin: '0 auto', borderRadius: 24, border: '1px solid rgba(255,255,255,0.08)', background: 'linear-gradient(180deg, #0f0f12 0%, #0a0a0c 100%)', overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'default' }}
        >
          <div style={{ padding: '52px 40px 28px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 280, position: 'relative' }}>
            <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 70% at 50% 60%, rgba(0,102,204,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <img src="/optima/front.png" alt={l.lineup_name} draggable={false} style={{ width: '80%', maxWidth: 320, height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.9))', position: 'relative', zIndex: 1 }} />
          </div>
          <div style={{ padding: '24px 32px 36px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', margin: 0 }}>{l.lineup_name}</h3>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.32)', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>{l.lineup_tag}</span>
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.48)', lineHeight: 1.7, marginBottom: 20 }}>{l.lineup_desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
              {l.lineup_specs.map(spec => (
                <span key={spec} style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: '4px 10px', letterSpacing: '0.04em' }}>{spec}</span>
              ))}
            </div>
            <a href="https://shop.bikon.uz" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#0066CC', color: '#fff', padding: '12px 24px', borderRadius: 11, fontSize: 13, fontWeight: 700, textDecoration: 'none', letterSpacing: '-0.01em' }}>
              <ShoppingCart size={14} strokeWidth={2.5} />
              {l.lineup_learn}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   CTASection
───────────────────────────────────────────────────────────────────────── */
function CTASection({ l }: { l: OptimaTr }) {
  const isMobile = useIsMobile();
  return (
    <section style={{ background: '#030303', padding: isMobile ? '88px 24px' : '130px 24px', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 65% 75% at 50% 50%, rgba(0,102,204,0.11) 0%, transparent 70%)' }} />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 660, margin: '0 auto', textAlign: 'center' }}>
        <SplitHeading text={l.cta_title} style={{ fontSize: 'clamp(34px, 5.5vw, 70px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.05em', lineHeight: 1.06, marginBottom: 22 }} />
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
          <motion.a href="https://shop.bikon.uz" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: '#000', padding: '14px 30px', borderRadius: 13, fontSize: 13, fontWeight: 700, textDecoration: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.5)', letterSpacing: '-0.01em' }}
          >
            <ShoppingCart size={15} strokeWidth={2.5} />
            {l.cta_shop}
          </motion.a>
          <motion.a href="/Bikon.pdf" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: 'rgba(255,255,255,0.55)', padding: '13px 28px', borderRadius: 13, fontSize: 13, fontWeight: 600, border: '1.5px solid rgba(255,255,255,0.12)', textDecoration: 'none', letterSpacing: '-0.01em' }}
          >{l.cta_catalog}</motion.a>
        </motion.div>
      </div>
    </section>
  );
}
