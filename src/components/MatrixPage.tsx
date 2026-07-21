import { useSeo } from '../lib/useSeo';
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Wifi, Camera, Cable, RotateCw, Volume2, MapPin, Layers, Bluetooth, type LucideIcon } from 'lucide-react';

import Navbar from './Navbar';
import Footer from './Footer';
import SplitHeading from './SplitHeading';
import SpecsSection from './SpecsSection';
import { FloatingPathsBackground } from './ui/floating-paths';
import { useLang } from '../context/LanguageContext';
import { useShopModal } from '../context/ShopModalContext';
import { useProductPageCms, cmsToSpecCategories } from '../lib/useProductPageCms';

interface MatrixTr {
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
export default function MatrixPage() {
  const { tr } = useLang();
  const base = (tr as unknown as { matrix: MatrixTr }).matrix;
  const cms = useProductPageCms('matrix');
  const cmsSpecs = cmsToSpecCategories(cms);
  const extra = (cms?.extra as Partial<MatrixTr>) ?? {};

  const l: MatrixTr = {
    ...base,
    ...extra,
    hero_eyebrow:       cms?.hero_eyebrow       ?? base.hero_eyebrow,
    hero_title:         cms?.hero_title         ?? base.hero_title,
    hero_subtitle:      cms?.hero_subtitle      ?? base.hero_subtitle,
    hero_cta_primary:   cms?.hero_cta_primary   ?? base.hero_cta_primary,
    hero_cta_secondary: cms?.hero_cta_secondary ?? base.hero_cta_secondary,
    lineup_eyebrow:     cms?.lineup_eyebrow     ?? base.lineup_eyebrow,
    lineup_title:       cms?.lineup_title       ?? base.lineup_title,
    lineup_name:        cms?.models?.[0]?.name        ?? base.lineup_name,
    lineup_tag:         cms?.models?.[0]?.tag         ?? base.lineup_tag,
    lineup_desc:        cms?.models?.[0]?.description ?? base.lineup_desc,
    lineup_specs:       (cms?.models?.[0]?.specs as string[] | null) ?? base.lineup_specs,
    specs_eyebrow:      cms?.specs_eyebrow ?? base.specs_eyebrow,
    specs_title:        cms?.specs_title   ?? base.specs_title,
    specs_label:        cms?.specs_label   ?? base.specs_label,
    specs_categories:   cmsSpecs           ?? base.specs_categories,
  };

  useSeo({
    title: "Matrix AiO — O'zbekistonning hamyonbop monoblocki | Bikon",
    description: "Bikon Matrix — 24\" yoki 27\" IPS ekranli, Intel 12-14th Gen all-in-one monoblock.",
    url: 'https://bikon.uz/matrix',
  });

  return (
    <div className="bg-black min-h-screen" style={{ overflowX: 'clip' }}>
      <style>{`
        .matrix-sel::selection { background:#fff; color:#000; }
        .matrix-sel *::selection { background:#fff; color:#000; }
        @keyframes float-y-m {
          0%,100% { transform: translateY(0px);   opacity:.10; }
          50%      { transform: translateY(-12px); opacity:.28; }
        }
      `}</style>
      <div className="matrix-sel">
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
   HeroSection — video background hero
───────────────────────────────────────────────────────────────────────── */
function HeroSection({ l }: { l: MatrixTr }) {
  const isMobile = useIsMobile();

  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', background: '#000' }}>
      {/* Background video */}
      <video
        autoPlay muted loop playsInline
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', zIndex: 0,
        }}
      >
        <source src="/matrix/herobackground.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(135deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.3) 100%)',
      }} />
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', width: '100%', height: isMobile ? undefined : '100vh', position: 'relative', zIndex: 2 }}>
        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{
            flex: 1,
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            padding: isMobile ? '100px 24px 40px' : '0 20% 0 10%',
            width: isMobile ? '100vw' : undefined,
            maxWidth: isMobile ? '100vw' : undefined,
            boxSizing: 'border-box' as const,
          }}
        >
          <span style={{
            fontSize: 11, fontWeight: 800, letterSpacing: '0.2em',
            textTransform: 'uppercase' as const, color: '#0066CC',
            display: 'block', marginBottom: 16,
          }}>{l.hero_eyebrow}</span>
          <h1 style={{
            fontSize: isMobile ? 'clamp(40px, 12vw, 72px)' : 'clamp(44px, 5.8vw, 82px)',
            fontWeight: 900, letterSpacing: '-0.055em', lineHeight: 1.02,
            color: '#fff', whiteSpace: 'pre-line', marginBottom: 24,
          }}>{l.hero_title}</h1>
          <p style={{
            fontSize: isMobile ? 15 : 'clamp(15px, 1.5vw, 19px)',
            color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: 44,
            maxWidth: isMobile ? '100%' : 440,
          }}>{l.hero_subtitle}</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <motion.button
              onClick={() => document.getElementById('specs')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              style={{
                background: '#fff', color: '#000', padding: '14px 32px',
                borderRadius: 13, fontSize: 14, fontWeight: 700,
                border: 'none', cursor: 'pointer', letterSpacing: '-0.01em',
                boxShadow: '0 8px 32px rgba(255,255,255,0.12)',
              }}
            >{l.hero_cta_primary}</motion.button>
            <motion.button
              onClick={() => document.getElementById('specs')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              style={{
                background: 'transparent', color: 'rgba(255,255,255,0.58)',
                padding: '13px 30px', borderRadius: 13, fontSize: 14, fontWeight: 600,
                border: '1.5px solid rgba(255,255,255,0.14)', cursor: 'pointer', letterSpacing: '-0.01em',
              }}
            >{l.hero_cta_secondary}</motion.button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   DisplaySection — scroll-driven 24" → 27" transition
───────────────────────────────────────────────────────────────────────── */
function DisplaySection({ l }: { l: MatrixTr }) {
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

  return (
    <div ref={containerRef} style={{ height: isMobile ? '220vh' : '280vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', padding: isMobile ? '0' : '0 4%' }}>
        <FloatingPathsBackground position={-1} className="absolute inset-0 w-full h-full" pathClassName="opacity-60" />
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: isMobile ? 0 : '2%', width: '100%', height: isMobile ? '100%' : undefined, position: 'relative', zIndex: 1, padding: isMobile ? '40px 24px 24px' : undefined, boxSizing: 'border-box' }}>
          <div style={{ flex: isMobile ? '1 1 auto' : '0 0 68%', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 0, width: '100%' }}>
            <img
              src="/matrix/front.png" alt="Matrix Display" draggable={false}
              style={{
                width: '100%', maxWidth: isMobile ? 480 : 1200, height: 'auto', objectFit: 'contain',
                filter: 'drop-shadow(0 32px 64px rgba(0,0,0,0.9))',
                transform: `scale(${imageScale})`,
                transition: 'transform 0.05s linear',
                transformOrigin: 'center center',
              }}
            />
          </div>
          <div style={{ flex: isMobile ? '0 0 auto' : 1, position: 'relative', textAlign: isMobile ? 'center' : 'left', width: isMobile ? '100%' : undefined }}>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: '#4da3ff', display: 'block', marginBottom: 18 }}>
              {l.display_eyebrow}
            </span>
            <div style={{ position: 'relative', height: 56, marginBottom: 6, overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, opacity: 1 - ease, transform: `translateY(${ease * -24}px)`, display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 44, fontWeight: 900, color: '#fff', letterSpacing: '-0.06em', lineHeight: 1 }}>24"</span>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' as const, lineHeight: 1.4 }}>Full HD<br/>IPS</span>
              </div>
              <div style={{ position: 'absolute', inset: 0, opacity: ease, transform: `translateY(${(1 - ease) * 24}px)`, display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{
                  fontSize: 44, fontWeight: 900, letterSpacing: '-0.06em', lineHeight: 1,
                  background: 'linear-gradient(135deg, #a78bfa, #60d4fa)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>27"</span>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: '#4da3ff', textTransform: 'uppercase' as const, lineHeight: 1.4 }}>QHD<br/>IPS</span>
              </div>
            </div>
            <div style={{ position: 'relative', marginBottom: 20, overflow: 'hidden' }}>
              <h2 style={{
                position: 'absolute', top: 0, left: 0,
                fontSize: 'clamp(28px, 3.6vw, 52px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.06,
                color: '#fff', whiteSpace: 'pre-line', margin: 0,
                opacity: 1 - ease, transform: `translateY(${ease * -20}px)`, transition: 'none',
              }}>{l.display_title_24}</h2>
              <h2 style={{
                fontSize: 'clamp(28px, 3.6vw, 52px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.06,
                color: '#fff', whiteSpace: 'pre-line', margin: 0,
                opacity: ease, transform: `translateY(${(1 - ease) * 20}px)`, transition: 'none',
                visibility: ease < 0.01 ? 'hidden' : 'visible',
              }}>{l.display_title}</h2>
            </div>
            <div style={{ position: 'relative', minHeight: 120 }}>
              <p style={{
                position: 'absolute', top: 0, left: 0,
                fontSize: 'clamp(13px, 1.3vw, 16px)', color: 'rgba(255,255,255,0.48)', lineHeight: 1.75, maxWidth: 480, margin: 0,
                opacity: 1 - ease, transition: 'none',
              }}>{l.display_body_24}</p>
              <p style={{
                fontSize: 'clamp(13px, 1.3vw, 16px)', color: 'rgba(255,255,255,0.48)', lineHeight: 1.75, maxWidth: 480, margin: 0,
                opacity: ease, transition: 'none',
                visibility: ease < 0.01 ? 'hidden' : 'visible',
              }}>{l.display_body}</p>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 32 }}>
              {[0, 1].map((i) => (
                <div key={i} style={{
                  height: 8, borderRadius: 4,
                  background: (i === 0 ? ease < 0.5 : ease >= 0.5) ? '#4da3ff' : 'rgba(255,255,255,0.18)',
                  transition: 'background 0.3s ease, width 0.3s ease',
                  ...(i === 1 ? { width: ease >= 0.5 ? 20 : 8 } : { width: ease < 0.5 ? 20 : 8 }),
                }} />
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
function BackSection({ l }: { l: MatrixTr }) {
  const isMobile = useIsMobile();
  return (
    <section style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      padding: isMobile ? '80px 24px' : '0 10%',
      overflow: 'hidden', position: 'relative',
    }}>
      <FloatingPathsBackground position={1} className="absolute inset-0 w-full h-full" pathClassName="opacity-60" />
      <div style={{
        display: 'flex', flexDirection: isMobile ? 'column' : 'row-reverse',
        alignItems: 'center', gap: isMobile ? 48 : '8%',
        position: 'relative', zIndex: 1, width: '100%',
      }}>
        <motion.div
          initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          style={{ flex: '0 0 55%', display: 'flex', justifyContent: 'center' }}
        >
          <img
            src="/matrix/back.png" alt="Matrix Rear Design" draggable={false}
            style={{ width: '100%', maxWidth: 700, height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 32px 64px rgba(0,0,0,0.9))' }}
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
function CameraAndSoundSection({ l }: { l: MatrixTr }) {
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
          style={{ flex: '0 0 55%', display: 'flex', justifyContent: 'center' }}
        >
          <img src="/matrix/camera.png" alt="Matrix Camera" draggable={false}
            style={{ width: '100%', maxWidth: 660, height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 32px 64px rgba(0,0,0,0.85))' }}
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
            {featureCard(Camera, 'Full HD Webcam', '2MP · 1080p · 30fps · Privacy Shutter')}
            {featureCard(Volume2, 'Stereo Speakers', '2×5W · Crystal Clear Audio')}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   ConnectivitySection
───────────────────────────────────────────────────────────────────────── */
const MATRIX_PORTS: { Icon: React.ElementType | string; label: string; spec: string }[] = [
  { Icon: '/icons/hdmi.png', label: 'HDMI 2.0',     spec: 'Video Output'    },
  { Icon: '/icons/dp.png',   label: 'DisplayPort',  spec: 'DP 1.4 Output'   },
  { Icon: '/icons/usb.png',  label: 'USB-A ×4',    spec: 'USB 3.2 Gen 1'   },
  { Icon: '/icons/aux.png',  label: '3.5mm',     spec: 'Audio Jack'      },
  { Icon: Wifi,              label: 'Wi-Fi 6',   spec: '802.11ax'        },
  { Icon: Bluetooth,         label: 'BT 5.0',    spec: 'Bluetooth'       },
];

function ConnectivitySection({ l }: { l: MatrixTr }) {
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
        {MATRIX_PORTS.map(({ Icon, label, spec }, i) => {
          const IconEl = Icon as React.ElementType;
          const iconContent = typeof Icon === 'string'
            ? <img src={Icon} alt={label} style={{ width: 36, height: 36, objectFit: 'contain' as const }} />
            : <IconEl size={28} color="#4da3ff" strokeWidth={1.7} />;
          return (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '22px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, minWidth: isMobile ? 130 : 150, flex: '1 1 140px', maxWidth: 180, cursor: 'default', transition: 'background 0.25s ease, border-color 0.25s ease' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(77,163,255,0.22)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'; }}
          >
            <div style={{ width: 60, height: 60, borderRadius: 14, background: 'rgba(77,163,255,0.08)', border: '1px solid rgba(77,163,255,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {iconContent}
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 13, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em', margin: 0, marginBottom: 4 }}>{label}</p>
              <p style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.36)', letterSpacing: '0.06em', textTransform: 'uppercase' as const, margin: 0 }}>{spec}</p>
            </div>
          </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   BentoSection
───────────────────────────────────────────────────────────────────────── */
function BentoSection({ l }: { l: MatrixTr }) {
  const isMobile = useIsMobile();

  const card: React.CSSProperties = { background: '#0c0c0f', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, overflow: 'hidden', position: 'relative' };
  const gt = (g: string): React.CSSProperties => ({ background: g, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' });
  const gc = (desk: string, mob: string) => isMobile ? mob : desk;

  const SMALLS_1: { label: string; Icon: LucideIcon }[] = [
    { label: 'Wi-Fi 6',        Icon: Wifi     },
    { label: 'Full HD Webcam', Icon: Camera   },
    { label: 'HDMI 2.0',       Icon: Cable    },
    { label: 'DisplayPort',    Icon: Cable    },
  ];
  const SMALLS_2: { label: string; Icon: LucideIcon }[] = [
    { label: 'Portrait 90°',       Icon: RotateCw },
    { label: 'Stereo Speakers',    Icon: Volume2  },
    { label: 'Made in Uzbekistan', Icon: MapPin   },
    { label: 'H610 Chipset',       Icon: Layers   },
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
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.36)', marginTop: 8, textTransform: 'uppercase' as const }}>12TH–14TH GEN PROCESSOR</span>
        </div>

        <div style={{ ...card, gridColumn: gc('1 / 5', '1 / 3'), padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', minHeight: 120 }}>
          <span style={{ fontSize: isMobile ? 30 : 44, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>75Hz</span>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: '#FFB900', marginTop: 8, textTransform: 'uppercase' as const }}>REFRESH RATE</span>
        </div>
        <div style={{ ...card, gridColumn: gc('5 / 9', '3 / 5'), padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 120, background: 'linear-gradient(160deg, #0a1628 0%, #0c0c0f 65%)', position: 'relative' }}>
          <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 80% 70% at 50% 60%, rgba(0,100,220,0.2) 0%, transparent 70%)' }} />
          <span style={{ fontSize: isMobile ? 34 : 54, fontWeight: 900, color: '#fff', letterSpacing: '-0.05em', lineHeight: 1, position: 'relative', zIndex: 1 }}>16 GB</span>
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.36)', marginTop: 6, textTransform: 'uppercase' as const, position: 'relative', zIndex: 1 }}>DDR4 MEMORY</span>
        </div>
        <div style={{ ...card, gridColumn: gc('9 / 13', '5 / 7'), padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', minHeight: 120, textAlign: 'right' }}>
          <span style={{ fontSize: isMobile ? 30 : 44, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>H610</span>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.36)', marginTop: 8, textTransform: 'uppercase' as const }}>LGA 1700</span>
        </div>

        <div style={{ ...card, gridColumn: gc('1 / 5', '1 / 7'), padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 16, minHeight: 86 }}>
          <div style={{ width: 42, height: 42, borderRadius: 10, flexShrink: 0, background: 'rgba(148,163,184,0.1)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', color: '#fff', textTransform: 'uppercase' as const, margin: 0, marginBottom: 3 }}>CNC ALUMINUM</p>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.32)', textTransform: 'uppercase' as const, margin: 0 }}>PRECISION CHASSIS</p>
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
   AppsSection — Windows app icons showcase
───────────────────────────────────────────────────────────────────────── */
const WIN_APPS = [
  { label: 'Chrome',     src: '/icons/windows/chroma.png'      },
  { label: 'Word',       src: '/icons/windows/Word.png'        },
  { label: 'Excel',      src: '/icons/windows/Excel.png'       },
  { label: 'PowerPoint', src: '/icons/windows/Power point.png' },
  { label: 'Telegram',   src: '/icons/windows/telegram.png'    },
  { label: 'Zoom',       src: '/icons/windows/zoom.png'        },
];

function AppsSection({ l }: { l: MatrixTr }) {
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
          style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}
        >
          {WIN_APPS.map(({ label, src }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 60, height: 60, borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
                <img src={src} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
function LineupSection({ l }: { l: MatrixTr }) {
  const isMobile = useIsMobile();
  const { open } = useShopModal();
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
          <div style={{ position: 'relative', overflow: 'hidden', height: 280 }}>
            <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 70% at 50% 60%, rgba(0,102,204,0.15) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 1 }} />
            <img src="/matrix/front.png" alt={l.lineup_name} draggable={false} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.9))', display: 'block' }} />
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
            <a href="javascript:void(0)" onClick={(e: React.MouseEvent) => { e.preventDefault(); open('Bikon Matrix AiO'); }} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#0066CC', color: '#fff', padding: '12px 24px', borderRadius: 11, fontSize: 13, fontWeight: 700, textDecoration: 'none', letterSpacing: '-0.01em' }}>
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
function CTASection({ l }: { l: MatrixTr }) {
  const isMobile = useIsMobile();
  const { open } = useShopModal();
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
          <motion.a href="javascript:void(0)" onClick={(e: React.MouseEvent) => { e.preventDefault(); open('Bikon Matrix AiO'); }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
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
