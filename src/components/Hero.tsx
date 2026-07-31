import React, { useRef, useCallback } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
} from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { useHomePageCms } from '../lib/useProductPageCms';



/* ─── Hero ───────────────────────────────────────────────────────────────── */
export default function Hero() {
  const { tr } = useLang();
  const cms = useHomePageCms();
  const h = { ...tr.hero, ...((cms?.hero as Partial<typeof tr.hero>) ?? {}) };
  const imageRef = useRef<HTMLDivElement>(null);

  // Mouse-driven 3-D tilt tracked as raw motion values
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rawZ = useMotionValue(0); // subtle Z-translate for parallax depth

  // Spring-smoothed values so the motion feels organic
  const rotateX = useSpring(rawRotateX, { stiffness: 80, damping: 22, mass: 0.8 });
  const rotateY = useSpring(rawRotateY, { stiffness: 80, damping: 22, mass: 0.8 });
  const z = useSpring(rawZ, { stiffness: 80, damping: 22, mass: 0.8 });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2); // -1 … +1
    const dy = (e.clientY - cy) / (rect.height / 2);

    rawRotateY.set(dx * 10);   // tilt left/right up to 10°
    rawRotateX.set(-dy * 8);   // tilt up/down up to 8°
    rawZ.set(8);                 // subtle lift
  }, [rawRotateX, rawRotateY, rawZ]);

  const onMouseLeave = useCallback(() => {
    rawRotateX.set(0);
    rawRotateY.set(0);
    rawZ.set(0);
  }, [rawRotateX, rawRotateY, rawZ]);

  const scrollToProducts = () => {
    const el = document.getElementById('noutbuklar');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative w-full overflow-hidden"
      style={{ background: '#FFFFFF', minHeight: '100svh' }}
    >
      {/* ── Very subtle page tint — barely perceptible, fully transparent at edges */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 65% 50% at 72% 44%, rgba(232,219,252,0.22) 0%, rgba(255,240,224,0.14) 50%, rgba(255,255,255,0) 80%)',
        }}
      />

      {/* ── Main grid ────────────────────────────────────────────────────── */}
      <div
        className="relative z-10 w-full max-w-[1280px] mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center"
        style={{ minHeight: '100svh', paddingTop: 88, paddingBottom: 60, gap: 0 }}
      >

        {/* ════════════════════════════════════════════════════════════════
            LEFT — Text column
        ════════════════════════════════════════════════════════════════ */}
        <div className="w-full lg:w-[46%] flex flex-col justify-center order-2 lg:order-1 pt-10 lg:pt-0 pb-8 lg:pb-0 text-center lg:text-left">

          {/* Eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="flex justify-center lg:justify-start mb-7"
          >
            <span
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em]"
              style={{
                padding: '7px 16px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(0,0,0,0.07)',
                color: '#666',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'linear-gradient(135deg,#a78bfa,#60a5fa)', display: 'inline-block', flexShrink: 0 }} />
              {h.eyebrow}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.20 }}
            className="text-black font-black leading-[1.05] tracking-[-0.04em] mb-6"
            style={{
              fontSize: 'clamp(36px, 5.5vw, 72px)',
              fontFamily: '"Inter", "SF Pro Display", var(--font-sans), sans-serif',
            }}
          >
            {h.title1}{' '}
            <br className="hidden lg:block" />
            <span style={{ fontWeight: 300, color: '#555', letterSpacing: '-0.02em' }}>
              {h.title2}
            </span>
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 50%, #0891b2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontWeight: 900,
              }}
            >
              {h.title3}
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.32 }}
            className="leading-[1.7] mb-10 mx-auto lg:mx-0"
            style={{
              fontSize: 'clamp(15px, 1.5vw, 18px)',
              color: '#6E6E73',
              maxWidth: '40ch',
              fontWeight: 400,
            }}
          >
            {h.subtitle}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.42 }}
            className="flex flex-wrap items-center gap-4 justify-center lg:justify-start"
          >
            {/* Primary */}
            <motion.button
              id="hero-learn-more-btn"
              onClick={scrollToProducts}
              whileHover={{ scale: 1.04, boxShadow: '0 12px 36px -8px rgba(0,0,0,0.3)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 24 }}
              className="flex items-center gap-2 text-white font-semibold"
              style={{
                background: '#111',
                padding: '14px 30px',
                borderRadius: 14,
                fontSize: 14,
                letterSpacing: '-0.01em',
                border: 'none',
                cursor: 'pointer',
                outline: 'none',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              }}
            >
              {h.cta_primary}
              <ArrowRight size={15} strokeWidth={2.5} />
            </motion.button>

            {/* Ghost */}
            <motion.button
              onClick={() => {
                const el = document.getElementById('kategoriyalar');
                el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 24 }}
              className="flex items-center gap-2 text-[#1D1D1F] font-semibold"
              style={{
                background: 'transparent',
                padding: '13px 26px',
                borderRadius: 14,
                fontSize: 14,
                letterSpacing: '-0.01em',
                border: '1.5px solid rgba(0,0,0,0.12)',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              {h.cta_secondary}
              <ArrowRight size={15} strokeWidth={2.5} style={{ opacity: 0.6 }} />
            </motion.button>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="hidden lg:flex items-center gap-6 mt-12 text-[11px] font-semibold text-[#AAAAAA] uppercase tracking-[0.12em]"
          >
            <span>{h.badge1}</span>
            <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#DDD', display: 'inline-block' }} />
            <span>{h.badge2}</span>
            <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#DDD', display: 'inline-block' }} />
            <span>{h.badge3}</span>
          </motion.div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            RIGHT — Image + Aura background
        ════════════════════════════════════════════════════════════════ */}
        <div
          ref={imageRef}
          className="w-full lg:w-[54%] order-1 lg:order-2 relative flex items-center justify-center"
          style={{
            minHeight: 'clamp(320px, 52vw, 640px)',
            perspective: 1200,
          }}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        >

          {/* ── Aura glow — three brand colors, radial fade to full transparent ── */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{ overflow: 'hidden' }}
          >
            {/* Lavender blob — top-left */}
            <div style={{
              position: 'absolute', top: '5%', left: '8%',
              width: '55%', height: '55%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #E8DBFC 0%, rgba(232,219,252,0.5) 40%, rgba(255,255,255,0) 72%)',
              filter: 'blur(36px)',
              opacity: 0.95,
            }} />
            {/* Soft Peach blob — top-right */}
            <div style={{
              position: 'absolute', top: '0%', right: '-5%',
              width: '60%', height: '60%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #FFF0E0 0%, rgba(255,240,224,0.5) 40%, rgba(255,255,255,0) 72%)',
              filter: 'blur(40px)',
              opacity: 0.90,
            }} />
            {/* Sky Blue blob — bottom-center */}
            <div style={{
              position: 'absolute', bottom: '5%', left: '25%',
              width: '55%', height: '55%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #D4EFFF 0%, rgba(212,239,255,0.5) 40%, rgba(255,255,255,0) 72%)',
              filter: 'blur(38px)',
              opacity: 0.85,
            }} />
          </div>

          {/* 3-D Tilt container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0 }}
            style={{
              rotateX,
              rotateY,
              z,
              transformStyle: 'preserve-3d',
              position: 'relative',
              zIndex: 10,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/*
              Image wrapper — CSS mask creates a smooth radial fade at the
              edges so the product merges seamlessly with #FFFFFF.
              mix-blend-mode: multiply drops the neutral light parts of the
              PNG background, keeping only the vivid device colours.
            */}
            <div
              style={{
                width: '100%',
                maxWidth: 760,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // Smooth radial fade — center opaque, edges fully transparent
                maskImage: 'radial-gradient(ellipse 88% 80% at 50% 50%, black 45%, transparent 80%)',
                WebkitMaskImage: 'radial-gradient(ellipse 88% 80% at 50% 50%, black 45%, transparent 80%)',
                // mix-blend-mode merges the image with parent white bg
                mixBlendMode: 'multiply',
              }}
            >
              <motion.img
                src="/main.png"
                alt="Bikon quality devices — laptop, monitor and PC"
                loading="eager"
                fetchPriority="high"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                draggable={false}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  filter: 'drop-shadow(0 40px 50px rgba(0,0,0,0.08))',
                  userSelect: 'none',
                  WebkitUserDrag: 'none',
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} strokeWidth={1.5} style={{ color: '#CCC' }} />
        </motion.div>
      </motion.div>

      {/* ── Clean fade into next section ──────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.95))' }}
      />
    </section>
  );
}
