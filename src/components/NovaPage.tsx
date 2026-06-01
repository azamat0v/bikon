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

/* ── Types ──────────────────────────────────────────────────────────────── */
interface NovaTr {
  hero_eyebrow: string;
  hero_title: string;
  hero_subtitle: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;
  lineup_eyebrow: string;
  lineup_title: string;
  lineup_nova_name: string;
  lineup_nova_tag: string;
  lineup_nova_desc: string;
  lineup_nova_specs: string[];
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
  vertical_eyebrow: string;
  vertical_title: string;
  vertical_body: string;
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
export default function NovaPage() {
  const { tr } = useLang();
  const base = (tr as unknown as { nova: NovaTr }).nova;
  const cms = useProductPageCms('nova');
  const cmsSpecs = cmsToSpecCategories(cms);

  const l: NovaTr = {
    ...base,
    hero_eyebrow:       cms?.hero_eyebrow       ?? base.hero_eyebrow,
    hero_title:         cms?.hero_title         ?? base.hero_title,
    hero_subtitle:      cms?.hero_subtitle      ?? base.hero_subtitle,
    hero_cta_primary:   cms?.hero_cta_primary   ?? base.hero_cta_primary,
    hero_cta_secondary: cms?.hero_cta_secondary ?? base.hero_cta_secondary,
    lineup_eyebrow:     cms?.lineup_eyebrow     ?? base.lineup_eyebrow,
    lineup_title:       cms?.lineup_title       ?? base.lineup_title,
    lineup_nova_name:   cms?.models?.[0]?.name        ?? base.lineup_nova_name,
    lineup_nova_tag:    cms?.models?.[0]?.tag         ?? base.lineup_nova_tag,
    lineup_nova_desc:   cms?.models?.[0]?.description ?? base.lineup_nova_desc,
    specs_eyebrow:      cms?.specs_eyebrow ?? base.specs_eyebrow,
    specs_title:        cms?.specs_title   ?? base.specs_title,
    specs_label:        cms?.specs_label   ?? base.specs_label,
    specs_categories:   cmsSpecs           ?? base.specs_categories,
  };

  return (
    <div className="bg-black min-h-screen" style={{ overflowX: 'clip' }}>
      <style>{`
        .nova-sel::selection { background:#fff; color:#000; }
        .nova-sel *::selection { background:#fff; color:#000; }
        @keyframes float-y-n {
          0%,100% { transform: translateY(0px);   opacity:.10; }
          50%      { transform: translateY(-12px); opacity:.28; }
        }
      `}</style>
      <div className="nova-sel">
        <Navbar />
        <HeroSection l={l} />
        <DisplaySection l={l} />
        <BackSection l={l} />
        <CameraAndSoundSection l={l} />
        <ConnectivitySection l={l} />
        <BentoSection l={l} />
        <VerticalSection l={l} />
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
   HeroSection — scroll-driven video animation via currentTime
───────────────────────────────────────────────────────────────────────── */
function HeroSection({ l }: { l: NovaTr }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);
  const scrollRafRef = useRef<number>(0);
  const isMobile     = useIsMobile();
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    // Mobile (Safari): currentTime scrubbing unreliable — video plays in loop instead.
    if (isMobile || !videoReady) return;
    const video = videoRef.current;
    if (!video || video.duration === 0) return;

    const tick = () => {
      const el = containerRef.current;
      if (el && video.duration > 0) {
        const scrolled = -el.getBoundingClientRect().top;
        const max = el.offsetHeight - window.innerHeight;
        if (max > 0) {
          const p = Math.max(0, Math.min(1, scrolled / max));
          video.currentTime = p * video.duration;
        }
      }
      scrollRafRef.current = requestAnimationFrame(tick);
    };

    scrollRafRef.current = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(scrollRafRef.current); };
  }, [videoReady, isMobile]);

  return (
    <div ref={containerRef} style={{ height: isMobile ? '250vh' : '320vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#000' }}>
        {/* Floating paths ambient background */}
        <FloatingPathsBackground
          position={1}
          className="absolute inset-0 w-full h-full z-0" pathClassName="opacity-60"
        />

        {isMobile ? (
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', paddingTop: 72, boxSizing: 'border-box', position: 'relative', zIndex: 1 }}>
            {/* Video first */}
            <video
              ref={videoRef}
              src="/nova/hero.mp4"
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
              style={{ flex: 1, width: '100%', minHeight: 0, objectFit: 'contain', display: 'block' }}
            />
            {/* Text below */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ padding: '20px 24px 32px', flexShrink: 0 }}
            >
              <h1 style={{
                fontSize: 'clamp(28px, 8vw, 48px)', fontWeight: 900,
                letterSpacing: '-0.05em', lineHeight: 1.06,
                color: '#fff', whiteSpace: 'pre-line', marginBottom: 12,
              }}>{l.hero_title}</h1>
              <p style={{
                fontSize: 14, color: 'rgba(255,255,255,0.48)', lineHeight: 1.65, marginBottom: 20,
              }}>{l.hero_subtitle}</p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button
                  onClick={() => document.getElementById('nova-features')?.scrollIntoView({ behavior: 'smooth' })}
                  style={{
                    background: '#fff', color: '#000', padding: '11px 24px',
                    borderRadius: 10, fontSize: 13, fontWeight: 700,
                    border: 'none', cursor: 'pointer', letterSpacing: '-0.01em',
                  }}
                >{l.hero_cta_primary}</button>
                <button
                  onClick={() => document.getElementById('specs')?.scrollIntoView({ behavior: 'smooth' })}
                  style={{
                    background: 'transparent', color: 'rgba(255,255,255,0.6)',
                    padding: '10px 22px', borderRadius: 10, fontSize: 13, fontWeight: 600,
                    border: '1.5px solid rgba(255,255,255,0.14)', cursor: 'pointer', letterSpacing: '-0.01em',
                  }}
                >{l.hero_cta_secondary}</button>
              </div>
            </motion.div>
          </div>
        ) : (
          <div style={{ display: 'flex', width: '100%', height: '100%', position: 'relative', zIndex: 1 }}>
            {/* Left: text */}
            <motion.div
              initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              style={{
                flex: '0 0 45%',
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                padding: '0 5% 0 10%',
              }}
            >
              <h1 style={{
                fontSize: 'clamp(44px, 5.8vw, 82px)', fontWeight: 900,
                letterSpacing: '-0.055em', lineHeight: 1.02,
                color: '#fff', whiteSpace: 'pre-line', marginBottom: 24,
              }}>{l.hero_title}</h1>
              <p style={{
                fontSize: 'clamp(15px, 1.5vw, 19px)',
                color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: 44, maxWidth: 440,
              }}>{l.hero_subtitle}</p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <motion.button
                  onClick={() => document.getElementById('nova-features')?.scrollIntoView({ behavior: 'smooth' })}
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

            {/* Right: video */}
            <div style={{ flex: '0 0 55%', position: 'relative', overflow: 'hidden' }}>
              <video
                ref={videoRef}
                src="/nova/hero.mp4"
                muted
                playsInline
                preload="auto"
                onLoadedMetadata={() => setVideoReady(true)}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center 35%', display: 'block' }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   DisplaySection — scroll-driven 24" → 27" transition
───────────────────────────────────────────────────────────────────────── */
function DisplaySection({ l }: { l: NovaTr }) {
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

  /* smooth 0→1 transition between 30 % and 70 % of scroll */
  const t = Math.max(0, Math.min(1, (progress - 0.30) / 0.40));
  /* ease in-out cubic */
  const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const imageScale = 1 + ease * 0.13;

  return (
    <div ref={containerRef} style={{ height: isMobile ? '220vh' : '280vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', padding: '0 4%' }}>
        <FloatingPathsBackground position={-1} className="absolute inset-0 w-full h-full" pathClassName="opacity-60" />

        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: isMobile ? 0 : '2%', width: '100%', height: isMobile ? '100%' : undefined, position: 'relative', zIndex: 1, padding: isMobile ? '40px 24px 24px' : undefined, boxSizing: 'border-box' }}>

          {/* Image — scales up as we move to 27" */}
          <div style={{ flex: isMobile ? '1 1 auto' : '0 0 68%', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 0, width: '100%' }}>
            <img
              src="/nova/front.png" alt="NOVA Display" draggable={false}
              style={{
                width: '100%', maxWidth: isMobile ? 480 : 1200, height: 'auto', objectFit: 'contain',
                filter: 'drop-shadow(0 32px 64px rgba(0,0,0,0.9))',
                transform: `scale(${imageScale})`,
                transition: 'transform 0.05s linear',
                transformOrigin: 'center center',
              }}
            />
          </div>

          {/* Text block */}
          <div style={{ flex: isMobile ? '0 0 auto' : 1, position: 'relative', textAlign: isMobile ? 'center' : 'left', width: isMobile ? '100%' : undefined }}>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: '#4da3ff', display: 'block', marginBottom: 18 }}>
              {l.display_eyebrow}
            </span>

            {/* Size badge — cross-fades 24 ↔ 27 */}
            <div style={{ position: 'relative', height: 56, marginBottom: 6, overflow: 'hidden' }}>
              {/* 24" badge */}
              <div style={{
                position: 'absolute', inset: 0,
                opacity: 1 - ease,
                transform: `translateY(${ease * -24}px)`,
                transition: 'none',
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <span style={{ fontSize: 44, fontWeight: 900, color: '#fff', letterSpacing: '-0.06em', lineHeight: 1 }}>24"</span>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' as const, lineHeight: 1.4 }}>Full HD<br/>IPS</span>
              </div>
              {/* 27" badge */}
              <div style={{
                position: 'absolute', inset: 0,
                opacity: ease,
                transform: `translateY(${(1 - ease) * 24}px)`,
                transition: 'none',
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <span style={{
                  fontSize: 44, fontWeight: 900, letterSpacing: '-0.06em', lineHeight: 1,
                  background: 'linear-gradient(135deg, #a78bfa, #60d4fa)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>27"</span>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: '#4da3ff', textTransform: 'uppercase' as const, lineHeight: 1.4 }}>QHD<br/>IPS</span>
              </div>
            </div>

            {/* Title — cross-fades */}
            <div style={{ position: 'relative', marginBottom: 20, overflow: 'hidden' }}>
              <h2 style={{
                position: 'absolute', top: 0, left: 0,
                fontSize: 'clamp(28px, 3.6vw, 52px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.06,
                color: '#fff', whiteSpace: 'pre-line', margin: 0,
                opacity: 1 - ease,
                transform: `translateY(${ease * -20}px)`,
                transition: 'none',
              }}>{l.display_title_24}</h2>
              <h2 style={{
                fontSize: 'clamp(28px, 3.6vw, 52px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.06,
                color: '#fff', whiteSpace: 'pre-line', margin: 0,
                opacity: ease,
                transform: `translateY(${(1 - ease) * 20}px)`,
                transition: 'none',
                visibility: ease < 0.01 ? 'hidden' : 'visible',
              }}>{l.display_title}</h2>
            </div>

            {/* Body — cross-fades */}
            <div style={{ position: 'relative', minHeight: 120 }}>
              <p style={{
                position: 'absolute', top: 0, left: 0,
                fontSize: 'clamp(13px, 1.3vw, 16px)', color: 'rgba(255,255,255,0.48)', lineHeight: 1.75, maxWidth: 480, margin: 0,
                opacity: 1 - ease,
                transition: 'none',
              }}>{l.display_body_24}</p>
              <p style={{
                fontSize: 'clamp(13px, 1.3vw, 16px)', color: 'rgba(255,255,255,0.48)', lineHeight: 1.75, maxWidth: 480, margin: 0,
                opacity: ease,
                transition: 'none',
                visibility: ease < 0.01 ? 'hidden' : 'visible',
              }}>{l.display_body}</p>
            </div>

            {/* Scroll progress dots */}
            <div style={{ display: 'flex', gap: 8, marginTop: 32 }}>
              {[0, 1].map((i) => (
                <div key={i} style={{
                  width: i === 0 ? 20 : 8, height: 8, borderRadius: 4,
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
   BackSection — back.png, rear design info
───────────────────────────────────────────────────────────────────────── */
function BackSection({ l }: { l: NovaTr }) {
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
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          style={{ flex: '0 0 55%', display: 'flex', justifyContent: 'center' }}
        >
          <img
            src="/nova/back.png" alt="NOVA Rear Design"
            draggable={false}
            style={{ width: '100%', maxWidth: 700, height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 32px 64px rgba(0,0,0,0.9))' }}
          />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{ flex: 1 }}
        >
          <span style={{
            fontSize: 11, fontWeight: 800, letterSpacing: '0.22em',
            textTransform: 'uppercase' as const, color: '#4da3ff',
            display: 'block', marginBottom: 18,
          }}>{l.back_eyebrow}</span>
          <h2 style={{
            fontSize: 'clamp(32px, 4.5vw, 62px)', fontWeight: 900,
            letterSpacing: '-0.05em', lineHeight: 1.06,
            color: '#fff', whiteSpace: 'pre-line', marginBottom: 22,
          }}>{l.back_title}</h2>
          <p style={{
            fontSize: 'clamp(14px, 1.4vw, 17px)',
            color: 'rgba(255,255,255,0.48)', lineHeight: 1.75, maxWidth: 480,
          }}>{l.back_body}</p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   CameraAndSoundSection — webcam + speakers built-in essentials
───────────────────────────────────────────────────────────────────────── */
function CameraAndSoundSection({ l }: { l: NovaTr }) {
  const isMobile = useIsMobile();

  const featureCard = (
    Icon: React.ElementType,
    title: string,
    spec: string,
  ) => (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 14,
        padding: '18px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: 11, flexShrink: 0,
        background: 'rgba(77,163,255,0.1)',
        border: '1px solid rgba(77,163,255,0.18)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={20} color="#4da3ff" strokeWidth={1.8} />
      </div>
      <div>
        <p style={{ fontSize: 13, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em', margin: 0, marginBottom: 4 }}>{title}</p>
        <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.04em', margin: 0 }}>{spec}</p>
      </div>
    </motion.div>
  );

  return (
    <section style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      padding: isMobile ? '80px 24px' : '0 10%',
      overflow: 'hidden', position: 'relative',
    }}>
      <FloatingPathsBackground position={-1} className="absolute inset-0 w-full h-full" pathClassName="opacity-60" />
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        gap: isMobile ? 48 : '8%',
        position: 'relative', zIndex: 1, width: '100%',
      }}>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          style={{ flex: '0 0 55%', display: 'flex', justifyContent: 'center' }}
        >
          <img
            src="/nova/webcam.png"
            alt="NOVA Webcam"
            draggable={false}
            style={{ width: '100%', maxWidth: 660, height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 32px 64px rgba(0,0,0,0.85))' }}
          />
        </motion.div>

        {/* Text + cards */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{ flex: 1 }}
        >
          <span style={{
            fontSize: 11, fontWeight: 800, letterSpacing: '0.22em',
            textTransform: 'uppercase' as const, color: '#4da3ff',
            display: 'block', marginBottom: 18,
          }}>{l.cam_eyebrow}</span>
          <SplitHeading
            text={l.cam_title}
            style={{ fontSize: 'clamp(32px, 4.5vw, 62px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.05em', lineHeight: 1.06, marginBottom: 20 }}
          />
          <p style={{
            fontSize: 'clamp(14px, 1.4vw, 17px)',
            color: 'rgba(255,255,255,0.48)', lineHeight: 1.75, maxWidth: 460, marginBottom: 32,
          }}>{l.cam_body}</p>

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
   ConnectivitySection — ports & wireless overview
───────────────────────────────────────────────────────────────────────── */
const PORTS: { Icon: React.ElementType | string; label: string; spec: string }[] = [
  { Icon: '/icons/hdmi.png', label: 'HDMI 2.0',     spec: 'Video Output'    },
  { Icon: '/icons/dp.png',   label: 'DisplayPort',  spec: 'DP 1.4 Output'   },
  { Icon: '/icons/usb.png',  label: 'USB-A ×4',    spec: 'USB 3.2 Gen 1'   },
  { Icon: '/icons/aux.png',  label: '3.5mm',     spec: 'Audio Jack'      },
  { Icon: Wifi,              label: 'Wi-Fi 6',   spec: '802.11ax'        },
  { Icon: Bluetooth,         label: 'BT 5.0',    spec: 'Bluetooth'       },
];

function ConnectivitySection({ l }: { l: NovaTr }) {
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
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(4,4,4,0.7) 100%)',
      }} />

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: isMobile ? 48 : 64, position: 'relative', zIndex: 1 }}>
        <motion.span
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: '#4da3ff', display: 'block', marginBottom: 18 }}
        >{l.connectivity_eyebrow}</motion.span>
        <SplitHeading
          text={l.connectivity_title}
          style={{ fontSize: 'clamp(36px, 5vw, 68px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.05em', lineHeight: 1.05, marginBottom: 20 }}
        />
        <motion.p
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
          style={{ fontSize: 'clamp(14px, 1.4vw, 17px)', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, maxWidth: 540, margin: '0 auto' }}
        >{l.connectivity_body}</motion.p>
      </div>

      {/* Port cards */}
      <motion.div
        initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: 'flex', flexWrap: 'wrap', gap: 12,
          justifyContent: 'center', maxWidth: 860, position: 'relative', zIndex: 1,
        }}
      >
        {PORTS.map(({ Icon, label, spec }, i) => {
          const IconEl = Icon as React.ElementType;
          const iconContent = typeof Icon === 'string'
            ? <img src={Icon} alt={label} style={{ width: 36, height: 36, objectFit: 'contain' as const }} />
            : <IconEl size={28} color="#4da3ff" strokeWidth={1.7} />;
          return (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16,
              padding: '22px 28px',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 12,
              minWidth: isMobile ? 130 : 150,
              flex: '1 1 140px',
              maxWidth: 180,
              cursor: 'default',
              transition: 'background 0.25s ease, border-color 0.25s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(77,163,255,0.22)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
            }}
          >
            <div style={{
              width: 60, height: 60, borderRadius: 14,
              background: 'rgba(77,163,255,0.08)',
              border: '1px solid rgba(77,163,255,0.16)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
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
   BentoSection — key features grid (QD-OLED–style bento layout)
───────────────────────────────────────────────────────────────────────── */
function BentoSection({ l }: { l: NovaTr }) {
  const isMobile = useIsMobile();

  const card: React.CSSProperties = {
    background: '#0c0c0f',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  };

  const gt = (g: string): React.CSSProperties => ({
    background: g,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  });

  /* gridColumn helper: desktop (12-col) vs mobile (6-col) */
  const gc = (desk: string, mob: string) => isMobile ? mob : desk;

  const SMALLS_1: { label: string; Icon: LucideIcon }[] = [
    { label: 'Wi-Fi 6',        Icon: Wifi     },
    { label: 'Full HD Webcam', Icon: Camera   },
    { label: 'HDMI 2.1',       Icon: Cable    },
    { label: 'DisplayPort',    Icon: Cable    },
  ];
  const SMALLS_2: { label: string; Icon: LucideIcon }[] = [
    { label: 'Portrait 90°',       Icon: RotateCw },
    { label: 'Stereo Speakers',    Icon: Volume2  },
    { label: 'Made in Uzbekistan', Icon: MapPin   },
    { label: '20mm Slim',          Icon: Layers   },
  ];

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: isMobile ? '60px 16px' : '60px 40px',
    }}>
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: 28 }}
      >
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: '#4da3ff' }}>
          {l.bento_eyebrow}
        </span>
      </motion.div>

      {/* Grid */}
      <motion.div
        initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(6, 1fr)' : 'repeat(12, 1fr)',
          gap: 8,
          maxWidth: 1100,
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* ── Header bar ── */}
        <div style={{
          ...card,
          gridColumn: gc('1 / 13', '1 / 7'),
          padding: '20px 28px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.016) 2px, rgba(255,255,255,0.016) 4px)',
        }}>
          <span style={{ fontSize: isMobile ? 13 : 17, fontWeight: 900, letterSpacing: '0.18em', color: '#fff', textTransform: 'uppercase' as const, textAlign: 'center' }}>
            {l.bento_title}
          </span>
        </div>

        {/* ── Highlight 1: 24/27" IPS ── */}
        <div style={{ ...card, gridColumn: gc('1 / 5', '1 / 7'), padding: '22px 24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minHeight: 96 }}>
          <span style={{ ...gt('linear-gradient(135deg,#a78bfa,#60d4fa)'), fontSize: isMobile ? 20 : 24, fontWeight: 900, letterSpacing: '0.05em', textTransform: 'uppercase' as const, lineHeight: 1.1 }}>24" / 27" IPS</span>
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.36)', marginTop: 8, textTransform: 'uppercase' as const }}>FHD / QHD CRYSTAL CLEAR DISPLAY</span>
        </div>

        {/* ── Highlight 2: 99% sRGB ── */}
        <div style={{ ...card, gridColumn: gc('5 / 9', '1 / 7'), padding: '22px 24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minHeight: 96 }}>
          <span style={{ ...gt('linear-gradient(135deg,#c084fc,#818cf8)'), fontSize: isMobile ? 20 : 24, fontWeight: 900, letterSpacing: '0.05em', textTransform: 'uppercase' as const, lineHeight: 1.1 }}>99% sRGB</span>
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.36)', marginTop: 8, textTransform: 'uppercase' as const }}>TRUE COLOR ACCURACY</span>
        </div>

        {/* ── Highlight 3: Intel Core i3/i5/i7 ── */}
        <div style={{ ...card, gridColumn: gc('9 / 13', '1 / 7'), padding: '22px 24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minHeight: 96 }}>
          <span style={{ ...gt('linear-gradient(135deg,#34d399,#60d4fa)'), fontSize: isMobile ? 20 : 24, fontWeight: 900, letterSpacing: '0.05em', textTransform: 'uppercase' as const, lineHeight: 1.1 }}>INTEL Core i3·i5·i7</span>
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.36)', marginTop: 8, textTransform: 'uppercase' as const }}>12TH–14TH GEN PROCESSOR</span>
        </div>

        {/* ── Stat: 75 Hz ── */}
        <div style={{ ...card, gridColumn: gc('1 / 5', '1 / 3'), padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', minHeight: 120 }}>
          <span style={{ fontSize: isMobile ? 30 : 44, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>75Hz</span>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: '#FFB900', marginTop: 8, textTransform: 'uppercase' as const }}>REFRESH RATE</span>
        </div>

        {/* ── Big center stat: 32 GB ── */}
        <div style={{
          ...card,
          gridColumn: gc('5 / 9', '3 / 5'),
          padding: '20px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          minHeight: 120,
          background: 'linear-gradient(160deg, #0a1628 0%, #0c0c0f 65%)',
        }}>
          <div aria-hidden style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 80% 70% at 50% 60%, rgba(0,100,220,0.2) 0%, transparent 70%)',
          }} />
          <span style={{ fontSize: isMobile ? 34 : 54, fontWeight: 900, color: '#fff', letterSpacing: '-0.05em', lineHeight: 1, position: 'relative', zIndex: 1 }}>16 GB</span>
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.36)', marginTop: 6, textTransform: 'uppercase' as const, position: 'relative', zIndex: 1 }}>DDR4 MEMORY</span>
        </div>

        {/* ── Stat: 20 mm ── */}
        <div style={{ ...card, gridColumn: gc('9 / 13', '5 / 7'), padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', minHeight: 120, textAlign: 'right' }}>
          <span style={{ fontSize: isMobile ? 30 : 44, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>20mm</span>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.36)', marginTop: 8, textTransform: 'uppercase' as const }}>SLIM PROFILE</span>
        </div>

        {/* ── Feature: CNC Aluminum ── */}
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

        {/* ── Feature: Windows 11 Pro ── */}
        <div style={{ ...card, gridColumn: gc('5 / 9', '1 / 7'), padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 16, minHeight: 86 }}>
          <div style={{ width: 42, height: 42, borderRadius: 10, flexShrink: 0, overflow: 'hidden' }}>
            <WinSVG />
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', color: '#fff', textTransform: 'uppercase' as const, margin: 0, marginBottom: 3 }}>WINDOWS 11 PRO</p>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.32)', textTransform: 'uppercase' as const, margin: 0 }}>PRE-INSTALLED & ACTIVATED</p>
          </div>
        </div>

        {/* ── Feature: 3-Year Warranty ── */}
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

        {/* ── Small tags rows 1 & 2 ── */}
        {[...SMALLS_1, ...SMALLS_2].map(({ label, Icon }, i) => {
          const deskCols = ['1 / 4','4 / 7','7 / 10','10 / 13','1 / 4','4 / 7','7 / 10','10 / 13'];
          const mobCols  = ['1 / 4','4 / 7','1 / 4','4 / 7','1 / 4','4 / 7','1 / 4','4 / 7'];
          return (
            <div key={label} style={{
              ...card,
              gridColumn: gc(deskCols[i], mobCols[i]),
              padding: '14px 10px',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 7,
              minHeight: 70,
            }}>
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
   VerticalSection — portrait rotation showcase
───────────────────────────────────────────────────────────────────────── */
function VerticalSection({ l }: { l: NovaTr }) {
  const isMobile = useIsMobile();
  return (
    <section style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      padding: isMobile ? '80px 24px' : '0 24px',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', width: '100%' }}>

        {/* Eyebrow + heading */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 48 : 72 }}>
          <motion.span
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: '#4da3ff', display: 'block', marginBottom: 18 }}
          >{l.vertical_eyebrow}</motion.span>
          <SplitHeading
            text={l.vertical_title}
            style={{ fontSize: 'clamp(36px, 5.5vw, 72px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.05em', lineHeight: 1.05, marginBottom: 20 }}
          />
          <motion.p
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
            style={{ fontSize: 'clamp(14px, 1.4vw, 17px)', color: 'rgba(255,255,255,0.48)', lineHeight: 1.75, maxWidth: 520, margin: '0 auto' }}
          >{l.vertical_body}</motion.p>
        </div>

        {/* vertical.png — shown in portrait crop, centered, large */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <div style={{
            position: 'relative',
            width: isMobile ? '100%' : '52%',
            borderRadius: 24,
            overflow: 'hidden',
            boxShadow: '0 40px 120px rgba(0,0,0,0.7)',
          }}>
            <img
              src="/nova/vertical.png"
              alt="NOVA portrait mode"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
            {/* subtle blue glow overlay */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'linear-gradient(160deg, rgba(77,163,255,0.08) 0%, transparent 60%)',
            }} />
          </div>
        </motion.div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   LineupSection — single NOVA card, monitors-style design
───────────────────────────────────────────────────────────────────────── */
function LineupSection({ l }: { l: NovaTr }) {
  const isMobile = useIsMobile();
  const { open } = useShopModal();
  return (
    <section id="lineup" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      padding: isMobile ? '80px 16px' : '0 24px',
      position: 'relative', overflow: 'hidden',
    }}>
      <FloatingPathsBackground position={1} className="absolute inset-0 w-full h-full" pathClassName="opacity-60" />
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1, width: '100%' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 48 : 72 }}>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: '#0066CC', display: 'block', marginBottom: 20 }}
          >{l.lineup_eyebrow}</motion.span>
          <SplitHeading
            text={l.lineup_title}
            style={{ fontSize: 'clamp(36px, 5.5vw, 68px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.045em', lineHeight: 1.08 }}
          />
        </div>

        {/* Single centered card */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
          style={{
            maxWidth: 520,
            margin: '0 auto',
            borderRadius: 24,
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'linear-gradient(180deg, #0f0f12 0%, #0a0a0c 100%)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            cursor: 'default',
          }}
        >
          {/* Image area */}
          <div style={{ position: 'relative', overflow: 'hidden', height: 280 }}>
            <div aria-hidden style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse 55% 55% at 50% 65%, rgba(0,102,204,0.13) 0%, transparent 70%)',
              pointerEvents: 'none', zIndex: 1,
            }} />
            <img
              src="/nova/front.png"
              alt="Bikon NOVA"
              draggable={false}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))', display: 'block' }}
            />
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '0 32px' }} />

          {/* Info */}
          <div style={{ padding: '28px 32px 40px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: 24, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: 6 }}>
              {l.lineup_nova_name}
            </h3>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.28)', marginBottom: 16 }}>
              {l.lineup_nova_tag}
            </p>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: 26, flex: 1 }}>
              {l.lineup_nova_desc}
            </p>

            {/* Spec chips */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
              {l.lineup_nova_specs.map((spec) => (
                <span key={spec} style={{
                  fontSize: 11, fontWeight: 700,
                  color: 'rgba(255,255,255,0.55)',
                  background: 'rgba(255,255,255,0.07)',
                  padding: '5px 12px', borderRadius: 8,
                  letterSpacing: '0.04em',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}>{spec}</span>
              ))}
            </div>

            {/* Buy button */}
            <a
              href="javascript:void(0)"
              onClick={(e: React.MouseEvent) => { e.preventDefault(); open('Bikon NOVA AiO'); }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#fff', color: '#000',
                padding: '13px 26px', borderRadius: 12,
                fontSize: 13, fontWeight: 700,
                textDecoration: 'none', letterSpacing: '-0.01em',
                alignSelf: 'flex-start',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
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
   AppsSection — Windows 11 "Let your apps fly" — 3D Fluent icons
───────────────────────────────────────────────────────────────────────── */

/* ── Inline SVG icon components (Fluent-style with gradients) ── */
function WinSVG() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect x="4"  y="4"  width="33" height="33" rx="6" fill="#F25022"/>
      <rect x="43" y="4"  width="33" height="33" rx="6" fill="#7FBA00"/>
      <rect x="4"  y="43" width="33" height="33" rx="6" fill="#00A4EF"/>
      <rect x="43" y="43" width="33" height="33" rx="6" fill="#FFB900"/>
      <rect x="0" y="0" width="80" height="32" rx="14" fill="rgba(255,255,255,0.07)"/>
    </svg>
  );
}

function WordSVG() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="word-g" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2B7CD3"/>
          <stop offset="1" stopColor="#185ABD"/>
        </linearGradient>
      </defs>
      <rect width="80" height="80" rx="18" fill="url(#word-g)"/>
      <path d="M11 24 L23 60 L35 37 L47 60 L59 24" stroke="white" strokeWidth="7.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <rect x="0" y="0" width="80" height="30" rx="18" fill="rgba(255,255,255,0.09)"/>
    </svg>
  );
}

function ExcelSVG() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="excel-g" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#21A366"/>
          <stop offset="1" stopColor="#107C41"/>
        </linearGradient>
      </defs>
      <rect width="80" height="80" rx="18" fill="url(#excel-g)"/>
      <line x1="40" y1="14" x2="40" y2="66" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5"/>
      <line x1="14" y1="40" x2="66" y2="40" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5"/>
      <path d="M20 20 L60 60 M60 20 L20 60" stroke="white" strokeWidth="8" strokeLinecap="round"/>
      <rect x="0" y="0" width="80" height="30" rx="18" fill="rgba(255,255,255,0.09)"/>
    </svg>
  );
}

function PptSVG() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="ppt-g" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E35F38"/>
          <stop offset="1" stopColor="#C43E1C"/>
        </linearGradient>
      </defs>
      <rect width="80" height="80" rx="18" fill="url(#ppt-g)"/>
      <path d="M18 58 L18 22 L46 22 Q62 22 62 36 Q62 50 46 50 L18 50" stroke="white" strokeWidth="7.5" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <rect x="0" y="0" width="80" height="30" rx="18" fill="rgba(255,255,255,0.09)"/>
    </svg>
  );
}

function OutlookSVG() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="ol-g" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2F8CE0"/>
          <stop offset="1" stopColor="#0078D4"/>
        </linearGradient>
      </defs>
      <rect width="80" height="80" rx="18" fill="url(#ol-g)"/>
      <rect x="12" y="22" width="56" height="38" rx="8" stroke="white" strokeWidth="5" fill="none"/>
      <path d="M12 28 L40 46 L68 28" stroke="white" strokeWidth="5" strokeLinejoin="round" fill="none"/>
      <rect x="0" y="0" width="80" height="30" rx="18" fill="rgba(255,255,255,0.09)"/>
    </svg>
  );
}

function TeamsSVG() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="teams-g" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7B83EB"/>
          <stop offset="1" stopColor="#6264A7"/>
        </linearGradient>
      </defs>
      <rect width="80" height="80" rx="18" fill="url(#teams-g)"/>
      <path d="M18 24 L62 24 M40 24 L40 58" stroke="white" strokeWidth="8" strokeLinecap="round"/>
      <circle cx="26" cy="52" r="6" fill="rgba(255,255,255,0.32)"/>
      <circle cx="54" cy="52" r="6" fill="rgba(255,255,255,0.32)"/>
      <rect x="0" y="0" width="80" height="30" rx="18" fill="rgba(255,255,255,0.09)"/>
    </svg>
  );
}

function EdgeSVG() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="edge-g" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#37BEF0"/>
          <stop offset="1" stopColor="#0F78D4"/>
        </linearGradient>
      </defs>
      <rect width="80" height="80" rx="18" fill="url(#edge-g)"/>
      <path d="M58 30 C58 22 48 14 38 14 C24 14 14 24 14 40 C14 56 26 66 42 66 C54 66 62 60 64 52" stroke="white" strokeWidth="7" fill="none" strokeLinecap="round"/>
      <line x1="14" y1="40" x2="62" y2="40" stroke="white" strokeWidth="7" strokeLinecap="round"/>
      <rect x="0" y="0" width="80" height="30" rx="18" fill="rgba(255,255,255,0.09)"/>
    </svg>
  );
}

function OneDriveSVG() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="od-g" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#51A7F9"/>
          <stop offset="1" stopColor="#0078D4"/>
        </linearGradient>
      </defs>
      <rect width="80" height="80" rx="18" fill="url(#od-g)"/>
      <path d="M20 55 C10 55 8 42 17 37 C16 20 36 15 45 28 C50 20 64 20 66 33 C74 35 74 55 64 55 Z" stroke="white" strokeWidth="5" fill="none" strokeLinejoin="round"/>
      <rect x="0" y="0" width="80" height="30" rx="18" fill="rgba(255,255,255,0.09)"/>
    </svg>
  );
}

function NotepadSVG() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="np-g" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD324"/>
          <stop offset="1" stopColor="#FFB900"/>
        </linearGradient>
      </defs>
      <rect width="80" height="80" rx="18" fill="url(#np-g)"/>
      <line x1="18" y1="32" x2="62" y2="32" stroke="rgba(0,0,0,0.28)" strokeWidth="4" strokeLinecap="round"/>
      <line x1="18" y1="44" x2="62" y2="44" stroke="rgba(0,0,0,0.28)" strokeWidth="4" strokeLinecap="round"/>
      <line x1="18" y1="56" x2="46" y2="56" stroke="rgba(0,0,0,0.28)" strokeWidth="4" strokeLinecap="round"/>
      <path d="M54 22 L64 32 L42 54 L32 54 L32 44 Z" fill="rgba(0,0,0,0.32)"/>
      <rect x="0" y="0" width="80" height="30" rx="18" fill="rgba(255,255,255,0.22)"/>
    </svg>
  );
}

function CalcSVG() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="calc-g" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6A6A6A"/>
          <stop offset="1" stopColor="#3A3A3A"/>
        </linearGradient>
      </defs>
      <rect width="80" height="80" rx="18" fill="url(#calc-g)"/>
      <rect x="14" y="14" width="52" height="18" rx="6" fill="rgba(255,255,255,0.14)"/>
      <line x1="52" y1="51" x2="66" y2="51" stroke="white" strokeWidth="4.5" strokeLinecap="round"/>
      <line x1="59" y1="44" x2="59" y2="58" stroke="white" strokeWidth="4.5" strokeLinecap="round"/>
      <circle cx="22" cy="51" r="3.5" fill="rgba(255,255,255,0.7)"/>
      <circle cx="22" cy="64" r="3.5" fill="rgba(255,255,255,0.7)"/>
      <circle cx="36" cy="51" r="3.5" fill="rgba(255,255,255,0.7)"/>
      <circle cx="36" cy="64" r="3.5" fill="rgba(255,255,255,0.7)"/>
      <rect x="0" y="0" width="80" height="30" rx="18" fill="rgba(255,255,255,0.06)"/>
    </svg>
  );
}

function PaintSVG() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="paint-g" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F0654A"/>
          <stop offset="1" stopColor="#C43E1C"/>
        </linearGradient>
      </defs>
      <rect width="80" height="80" rx="18" fill="url(#paint-g)"/>
      <ellipse cx="38" cy="44" rx="22" ry="17" stroke="white" strokeWidth="5" fill="none"/>
      <circle cx="26" cy="38" r="5" fill="rgba(255,255,255,0.72)"/>
      <circle cx="38" cy="30" r="5" fill="rgba(255,255,255,0.72)"/>
      <circle cx="50" cy="38" r="5" fill="rgba(255,255,255,0.72)"/>
      <line x1="55" y1="55" x2="66" y2="66" stroke="white" strokeWidth="6" strokeLinecap="round"/>
      <rect x="0" y="0" width="80" height="30" rx="18" fill="rgba(255,255,255,0.10)"/>
    </svg>
  );
}

function SnipSVG() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="snip-g" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00CDB0"/>
          <stop offset="1" stopColor="#00897B"/>
        </linearGradient>
      </defs>
      <rect width="80" height="80" rx="18" fill="url(#snip-g)"/>
      <circle cx="24" cy="56" r="9" stroke="white" strokeWidth="5" fill="none"/>
      <circle cx="24" cy="24" r="9" stroke="white" strokeWidth="5" fill="none"/>
      <path d="M30 50 L66 18" stroke="white" strokeWidth="5" strokeLinecap="round"/>
      <path d="M30 30 L66 62" stroke="white" strokeWidth="5" strokeLinecap="round"/>
      <rect x="0" y="0" width="80" height="30" rx="18" fill="rgba(255,255,255,0.10)"/>
    </svg>
  );
}

function PhotosSVG() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="photos-g" x1="0" y1="80" x2="80" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00B7C3"/>
          <stop offset="1" stopColor="#00BCF2"/>
        </linearGradient>
      </defs>
      <rect width="80" height="80" rx="18" fill="url(#photos-g)"/>
      <path d="M8 64 L26 38 L40 54 L52 42 L72 64 Z" fill="rgba(255,255,255,0.88)"/>
      <circle cx="57" cy="25" r="10" fill="rgba(255,230,50,0.95)"/>
      <rect x="0" y="0" width="80" height="30" rx="18" fill="rgba(255,255,255,0.10)"/>
    </svg>
  );
}

function XboxSVG() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="xbox-g" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1E7B1E"/>
          <stop offset="1" stopColor="#107C10"/>
        </linearGradient>
      </defs>
      <rect width="80" height="80" rx="18" fill="url(#xbox-g)"/>
      <circle cx="40" cy="40" r="26" stroke="rgba(255,255,255,0.75)" strokeWidth="3.5" fill="none"/>
      <path d="M26 26 L54 54 M54 26 L26 54" stroke="white" strokeWidth="7" strokeLinecap="round"/>
      <rect x="0" y="0" width="80" height="30" rx="18" fill="rgba(255,255,255,0.07)"/>
    </svg>
  );
}

function StoreSVG() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="store-g" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2CA7F8"/>
          <stop offset="1" stopColor="#0078D4"/>
        </linearGradient>
      </defs>
      <rect width="80" height="80" rx="18" fill="url(#store-g)"/>
      <rect x="18" y="33" width="44" height="30" rx="7" stroke="white" strokeWidth="5" fill="none"/>
      <path d="M28 33 C28 21 52 21 52 33" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round"/>
      <line x1="40" y1="43" x2="40" y2="53" stroke="rgba(255,255,255,0.55)" strokeWidth="3.5" strokeLinecap="round"/>
      <line x1="34" y1="48" x2="46" y2="48" stroke="rgba(255,255,255,0.55)" strokeWidth="3.5" strokeLinecap="round"/>
      <rect x="0" y="0" width="80" height="30" rx="18" fill="rgba(255,255,255,0.10)"/>
    </svg>
  );
}

function WeatherSVG() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="weather-g" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#55C4FC"/>
          <stop offset="1" stopColor="#1B93D1"/>
        </linearGradient>
      </defs>
      <rect width="80" height="80" rx="18" fill="url(#weather-g)"/>
      <circle cx="30" cy="28" r="11" fill="rgba(255,230,50,0.96)"/>
      <line x1="30" y1="12" x2="30" y2="8"  stroke="rgba(255,230,50,0.8)" strokeWidth="3" strokeLinecap="round"/>
      <line x1="30" y1="44" x2="30" y2="48" stroke="rgba(255,230,50,0.8)" strokeWidth="3" strokeLinecap="round"/>
      <line x1="14" y1="28" x2="10" y2="28" stroke="rgba(255,230,50,0.8)" strokeWidth="3" strokeLinecap="round"/>
      <line x1="46" y1="28" x2="50" y2="28" stroke="rgba(255,230,50,0.8)" strokeWidth="3" strokeLinecap="round"/>
      <path d="M16 62 C8 62 6 50 15 46 C14 33 32 28 39 40 C44 32 56 32 58 43 C65 44 65 62 56 62 Z" fill="white"/>
      <rect x="0" y="0" width="80" height="30" rx="18" fill="rgba(255,255,255,0.10)"/>
    </svg>
  );
}

function MapsSVG() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="maps-g" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#34A853"/>
          <stop offset="1" stopColor="#188038"/>
        </linearGradient>
      </defs>
      <rect width="80" height="80" rx="18" fill="url(#maps-g)"/>
      <path d="M40 12 C27 12 18 22 18 33 C18 49 40 68 40 68 C40 68 62 49 62 33 C62 22 53 12 40 12 Z" fill="white"/>
      <circle cx="40" cy="33" r="8" fill="url(#maps-g)"/>
      <rect x="0" y="0" width="80" height="30" rx="18" fill="rgba(255,255,255,0.10)"/>
    </svg>
  );
}

function TodoSVG() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="todo-g" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2B7CD3"/>
          <stop offset="1" stopColor="#1A5DAD"/>
        </linearGradient>
      </defs>
      <rect width="80" height="80" rx="18" fill="url(#todo-g)"/>
      <circle cx="40" cy="40" r="23" stroke="rgba(255,255,255,0.28)" strokeWidth="3.5" fill="none"/>
      <path d="M27 40 L36 50 L54 29" stroke="white" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <rect x="0" y="0" width="80" height="30" rx="18" fill="rgba(255,255,255,0.09)"/>
    </svg>
  );
}

function ClipchampSVG() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="clip-g" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9B59F5"/>
          <stop offset="1" stopColor="#6D28D9"/>
        </linearGradient>
      </defs>
      <rect width="80" height="80" rx="18" fill="url(#clip-g)"/>
      <path d="M26 20 L26 60 L64 40 Z" fill="white"/>
      <rect x="0" y="0" width="80" height="30" rx="18" fill="rgba(255,255,255,0.10)"/>
    </svg>
  );
}

function ClockSVG() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="clock-g" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#253348"/>
          <stop offset="1" stopColor="#0D1B2A"/>
        </linearGradient>
      </defs>
      <rect width="80" height="80" rx="18" fill="url(#clock-g)"/>
      <circle cx="40" cy="40" r="26" stroke="rgba(255,255,255,0.45)" strokeWidth="3" fill="none"/>
      <line x1="40" y1="18" x2="40" y2="24" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="40" y1="56" x2="40" y2="62" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="18" y1="40" x2="24" y2="40" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="56" y1="40" x2="62" y2="40" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="40" y1="40" x2="40" y2="25" stroke="white" strokeWidth="4" strokeLinecap="round"/>
      <line x1="40" y1="40" x2="53" y2="33" stroke="white" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="40" cy="40" r="3.5" fill="#4da3ff"/>
      <rect x="0" y="0" width="80" height="30" rx="18" fill="rgba(255,255,255,0.04)"/>
    </svg>
  );
}

/* ── 3D icon wrapper with perspective tilt + hover flatten ── */
interface IconDef {
  label: string;
  src: string;
  delay: string;
  pos: React.CSSProperties;
}

const ICONS_3D: IconDef[] = [
  /* ── Top band ── */
  { label: 'Word',       src: '/icons/windows/Word.png',        delay: '0s',   pos: { top: '4%',               left: '1.5%'  } },
  { label: 'Excel',      src: '/icons/windows/Excel.png',       delay: '0.4s', pos: { top: '2%',               left: '13%'   } },
  { label: 'PowerPoint', src: '/icons/windows/Power point.png', delay: '0.9s', pos: { top: '1%',               left: '25%'   } },
  { label: 'Outlook',    src: '/icons/windows/Outlook.png',     delay: '1.5s', pos: { top: '1%',               right: '25%'  } },
  { label: 'Teams',      src: '/icons/windows/Teamss.png',      delay: '0.2s', pos: { top: '2%',               right: '13%'  } },
  { label: 'Edge',       src: '/icons/windows/Edge.png',        delay: '1.1s', pos: { top: '4%',               right: '1.5%' } },
  /* ── Left column ── */
  { label: 'Notepad',    src: '/icons/windows/Notepad.png',     delay: '0.8s', pos: { top: '23%',              left: '1.5%'  } },
  { label: 'OneDrive',   src: '/icons/windows/One drive.png',   delay: '0.7s', pos: { top: 'calc(50% - 50px)', left: '0.8%'  } },
  /* ── Right column ── */
  { label: 'Zoom',       src: '/icons/windows/zoom.png',        delay: '1.2s', pos: { top: '23%',              right: '1.5%' } },
  /* ── Mid-inner ── */
  { label: 'Telegram',   src: '/icons/windows/telegram.png',    delay: '1.1s', pos: { top: '37%',              left: '10%'   } },
  { label: 'Chrome',     src: '/icons/windows/chroma.png',      delay: '0.6s', pos: { top: '37%',              right: '10%'  } },
];

function Icon3D({ icon }: { icon: IconDef }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      aria-label={icon.label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'absolute',
        ...icon.pos,
        width: 82,
        height: 82,
        borderRadius: 20,
        overflow: 'hidden',
        animation: `float-y-n 3.5s ease-in-out ${icon.delay} infinite`,
        transform: hovered
          ? 'perspective(500px) rotateX(3deg) rotateY(-2deg) scale(1.12)'
          : 'perspective(500px) rotateX(14deg) rotateY(-10deg)',
        boxShadow: hovered
          ? '0 24px 56px rgba(0,0,0,0.75), 0 8px 16px rgba(0,0,0,0.5)'
          : '8px 16px 40px rgba(0,0,0,0.65), 3px 5px 10px rgba(0,0,0,0.45)',
        transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease',
        cursor: 'default',
        userSelect: 'none',
        flexShrink: 0,
      }}
    >
      <img src={icon.src} alt={icon.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </div>
  );
}

function AppsSection({ l }: { l: NovaTr }) {
  const isMobile = useIsMobile();

  /* ── Mobile: icons grid above text, full-screen centered ── */
  if (isMobile) {
    return (
      <section style={{
        minHeight: '100vh', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '60px 24px',
        gap: 40,
      }}>
        {/* 3 rows of icons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
          {[ICONS_3D.slice(0, 4), ICONS_3D.slice(4, 8), ICONS_3D.slice(8, 11)].map((row, ri) => (
            <div key={ri} style={{ display: 'flex', gap: 12 }}>
              {row.map(({ label, src, delay }) => (
                <div
                  key={label}
                  style={{
                    width: 60, height: 60, borderRadius: 15, overflow: 'hidden',
                    boxShadow: '6px 10px 28px rgba(0,0,0,0.6)',
                    animation: `float-y-n 3.5s ease-in-out ${delay} infinite`,
                    transform: 'perspective(400px) rotateX(12deg) rotateY(-8deg)',
                    flexShrink: 0,
                  }}
                >
                  <img src={src} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Text */}
        <div style={{ textAlign: 'center' }}>
          <motion.span
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: '#4da3ff', display: 'block', marginBottom: 16 }}
          >{l.apps_eyebrow}</motion.span>
          <SplitHeading
            text={l.apps_title}
            style={{ fontSize: 'clamp(34px, 10vw, 52px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.05em', lineHeight: 1.06, marginBottom: 18 }}
          />
          <motion.p
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, maxWidth: 380, margin: '0 auto' }}
          >{l.apps_body}</motion.p>
        </div>
      </section>
    );
  }

  /* ── Desktop: full-screen, icons absolutely positioned ── */
  return (
    <section style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {ICONS_3D.map((icon) => (
        <Icon3D key={icon.label} icon={icon} />
      ))}

      {/* Center text — absolutely centered */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        width: 500,
        zIndex: 1,
      }}>
        <motion.span
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: '#4da3ff', display: 'block', marginBottom: 18 }}
        >{l.apps_eyebrow}</motion.span>
        <SplitHeading
          text={l.apps_title}
          style={{ fontSize: 'clamp(38px, 5vw, 68px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.05em', lineHeight: 1.05, marginBottom: 22 }}
        />
        <motion.p
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
          style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, maxWidth: 460, margin: '0 auto' }}
        >{l.apps_body}</motion.p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   CTASection
───────────────────────────────────────────────────────────────────────── */
function CTASection({ l }: { l: NovaTr }) {
  const isMobile = useIsMobile();
  const { open } = useShopModal();
  return (
    <section style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: isMobile ? '80px 24px' : '0 24px',
      position: 'relative', overflow: 'hidden',
    }}>
      <FloatingPathsBackground position={1} className="absolute inset-0 w-full h-full" pathClassName="opacity-60" />
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 65% 75% at 50% 50%, rgba(40,80,200,0.09) 0%, transparent 70%)',
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
            href="javascript:void(0)" onClick={(e: React.MouseEvent) => { e.preventDefault(); open('Bikon NOVA AiO'); }}
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
