import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

/* ── Config ──────────────────────────────────────────────────────────────── */
const categories = [
  {
    id: 'noutbuklar',
    series: 'SMARTBOOK SERIES',
    title: 'Laptops',
    image: '/categories/laptop_category.jpg',
    light: true,
  },
  {
    id: 'monobloklar',
    series: 'MATRIX SERIES',
    title: 'All-in-Ones',
    image: '/categories/monoblock_category.jpg',
    light: true,
  },
  {
    id: 'monitorlar',
    series: 'VISION PRO SERIES',
    title: 'Monitors',
    image: '/categories/monitor_category.jpg',
    light: true,
  },
  {
    id: 'pc',
    series: 'PHANTOM SERIES',
    title: 'Cases & PCs',
    image: '/categories/case_category.jpg',
    light: false,
  },
];

/* ── Detect pointer device (hover: hover) ────────────────────────────────── */
function useHasHover() {
  const [hasHover, setHasHover] = useState(false);
  useEffect(() => {
    setHasHover(window.matchMedia('(hover: hover)').matches);
  }, []);
  return hasHover;
}

/* ── Card ────────────────────────────────────────────────────────────────── */
function CategoryCard({
  cat,
  index,
  canHover,
}: {
  cat: (typeof categories)[0];
  index: number;
  canHover: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const active = canHover && hovered; // scale only on real pointer devices

  const scrollTo = () => {
    const el = document.getElementById(cat.id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  };

  const labelColor = cat.light ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.65)';
  const titleColor = cat.light ? '#0A0A0A' : '#FFFFFF';

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.68, delay: index * 0.10, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => canHover && setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={scrollTo}
      /* ─── Height breakpoints via Tailwind ─── */
      className="relative overflow-hidden cursor-pointer select-none
                 h-[550px] md:h-[500px] lg:h-[650px]"
      style={{
        borderRadius: 8,
        boxShadow: active
          ? '0 28px 64px -10px rgba(0,0,0,0.22), 0 8px 24px -6px rgba(0,0,0,0.10)'
          : '0 4px 20px -4px rgba(0,0,0,0.08)',
        transition: 'box-shadow 0.4s ease',
      }}
    >
      {/* ── Background image — only this scales ──────────────────── */}
      <motion.div
        aria-hidden="true"
        animate={{ scale: active ? 1.05 : 1 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${cat.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          willChange: 'transform',
        }}
      />

      {/* ── Bottom gradient scrim ─────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: cat.light
            ? 'linear-gradient(to top, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.20) 32%, transparent 60%)'
            : 'linear-gradient(to top, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.22) 32%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Text overlay — absolutely static ─────────────────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '40px 36px 44px',
        }}
      >
        {/* Series eyebrow */}
        <p
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.20em',
            textTransform: 'uppercase',
            color: labelColor,
            marginBottom: 8,
            fontFamily: '"Inter", var(--font-sans), sans-serif',
          }}
        >
          {cat.series}
        </p>

        {/* Title — clamp prevents 3-line wrap on small mobile */}
        <h3
          style={{
            fontSize: 'clamp(22px, 3vw, 38px)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 1.08,
            color: titleColor,
            margin: 0,
            fontFamily: '"Inter", var(--font-sans), sans-serif',
          }}
        >
          {cat.title}
        </h3>

        {/* CTA */}
        <motion.button
          onClick={(e) => { e.stopPropagation(); scrollTo(); }}
          animate={{ x: active ? 4 : 0 }}
          transition={{ type: 'spring', stiffness: 360, damping: 22 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            marginTop: 12,
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            color: '#2563EB',
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '-0.01em',
            fontFamily: '"Inter", var(--font-sans), sans-serif',
            outline: 'none',
          }}
        >
          Learn more
          <motion.span
            animate={{ x: active ? 4 : 0 }}
            transition={{ type: 'spring', stiffness: 360, damping: 22 }}
            style={{ display: 'flex', alignItems: 'center', marginTop: 1 }}
          >
            <ArrowRight size={13} strokeWidth={2.5} />
          </motion.span>
        </motion.button>
      </div>

      {/* ── Hover border highlight ────────────────────────────────── */}
      <motion.div
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 8,
          border: '1px solid rgba(255,255,255,0.25)',
          pointerEvents: 'none',
        }}
      />
    </motion.article>
  );
}

/* ── Section ─────────────────────────────────────────────────────────────── */
export default function CategoryGrid() {
  const canHover = useHasHover();

  return (
    <section
      id="kategoriyalar"
      aria-label="Product Categories"
      style={{ background: '#FFFFFF', paddingTop: 64, paddingBottom: 80 }}
      className="relative overflow-hidden"
    >
      {/* Ambient page gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 50% 40% at 8% 20%,  rgba(232,219,252,0.12) 0%, rgba(255,255,255,0) 70%),
            radial-gradient(ellipse 45% 40% at 92% 80%, rgba(212,239,255,0.12) 0%, rgba(255,255,255,0) 70%)
          `,
        }}
      />

      {/* ── max-w-[1440px], px-4 mobile / px-8 desktop ─────────────── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-8">

        {/* ── Header ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 md:mb-10"
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              padding: '6px 14px',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.72)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0,0,0,0.07)',
              color: '#666',
              marginBottom: 14,
            }}
          >
            <span
              style={{
                width: 6, height: 6, borderRadius: '50%',
                background: 'linear-gradient(135deg,#a78bfa,#60a5fa)',
                display: 'inline-block', flexShrink: 0,
              }}
            />
            Products
          </span>

          <h2
            style={{
              display: 'block',
              fontSize: 'clamp(26px, 3.5vw, 48px)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 1.07,
              color: '#111827',
              fontFamily: '"Inter", var(--font-sans), sans-serif',
            }}
          >
            <span style={{ fontWeight: 300, color: '#9CA3AF' }}>Explore </span>
            Categories
          </h2>
        </motion.div>

        {/* ── Grid: 1-col mobile, 2-col tablet+, gap-4 / gap-6 ────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} cat={cat} index={i} canHover={canHover} />
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-10"
          style={{ fontSize: 12, color: '#BCBCBC', fontWeight: 500, letterSpacing: '0.02em' }}
        >
          All products locally assembled in Uzbekistan · 12 Months Official Warranty
        </motion.p>
      </div>
    </section>
  );
}
