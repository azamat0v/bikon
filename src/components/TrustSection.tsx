import { useState } from 'react';
import { motion } from 'motion/react';
import { Wrench, Award, ShieldCheck, Truck, type LucideIcon } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { useHomePageCms } from '../lib/useProductPageCms';

/* ── Icons only — text comes from trust.features at render time ────────── */
const ICONS = [Wrench, Award, ShieldCheck, Truck];


/* ── Single card ─────────────────────────────────────────────────────────── */
function AdvantageCard({
  icon: Icon,
  title,
  desc,
  index,
}: {
  key?:   string | number;
  icon:   LucideIcon;
  title:  string;
  desc:   string;
  index:  number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-56px' }}
      transition={{
        duration: 0.68,
        delay: index * 0.10,
        ease: [0.16, 1, 0.3, 1],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{ y: hovered ? -12 : 0 }}
      style={{
        background: '#FFFFFF',
        borderRadius: 24,
        padding: '36px 32px 32px',
        border: hovered
          ? '1px solid rgba(200,200,220,0.35)'
          : '1px solid #F3F4F6',
        boxShadow: hovered
          ? '0 20px 60px -10px rgba(0,0,0,0.09), 0 4px 16px -4px rgba(0,0,0,0.05)'
          : '0 1px 4px rgba(0,0,0,0.03)',
        cursor: 'default',
        transition: 'border 0.3s ease, box-shadow 0.35s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Ambient aura — Lavender + Sky-Blue bleed, top-left ────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-30%',
          left: '-15%',
          width: '80%',
          height: '80%',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 40% 40%, #E8DBFC 0%, #D4EFFF 55%, rgba(255,255,255,0) 80%)',
          filter: 'blur(40px)',
          opacity: hovered ? 0.35 : 0.22,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
        }}
      />

      {/* ── Icon ─────────────────────────────────────────────────────── */}
      <div style={{ position: 'relative', display: 'inline-block', marginBottom: 28 }}>
        {/* Soft halo ring around icon */}
        <motion.div
          animate={{ scale: hovered ? 1.35 : 1, opacity: hovered ? 0.7 : 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          style={{
            position: 'absolute',
            inset: -10,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, #E8DBFC 0%, #D4EFFF 60%, rgba(255,255,255,0) 100%)',
            filter: 'blur(14px)',
          }}
        />

        {/* Icon pill */}
        <motion.div
          animate={{
            scale: hovered ? 1.10 : 1,
            rotate: hovered ? 8 : 0,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          style={{
            position: 'relative',
            width: 52,
            height: 52,
            borderRadius: 14,
            background: hovered
              ? 'linear-gradient(135deg, rgba(232,219,252,0.55) 0%, rgba(212,239,255,0.55) 100%)'
              : 'linear-gradient(135deg, rgba(232,219,252,0.28) 0%, rgba(212,239,255,0.28) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.3s ease',
          }}
        >
          <Icon
            size={22}
            strokeWidth={1.8}
            style={{
              color: hovered ? '#6b21a8' : '#7c3aed',
              transition: 'color 0.2s ease',
            }}
          />
        </motion.div>
      </div>

      {/* ── Text ─────────────────────────────────────────────────────── */}
      <h3
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: '#111827',
          letterSpacing: '-0.025em',
          lineHeight: 1.3,
          marginBottom: 10,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: 14,
          color: '#6B7280',
          lineHeight: 1.65,
          fontWeight: 400,
          letterSpacing: '-0.005em',
        }}
      >
        {desc}
      </p>
    </motion.article>
  );
}

/* ── Section ─────────────────────────────────────────────────────────────── */
export default function TrustSection() {
  const { tr } = useLang();
  const cms = useHomePageCms();
  const trust = { ...tr.trust, ...((cms?.trust as Partial<typeof tr.trust>) ?? {}) };
  const feats = trust.features;
  return (
    <section
      style={{ background: '#FFFFFF', paddingTop: 96, paddingBottom: 112 }}
      className="relative overflow-hidden"
    >
      {/* Very faint ambient gradient — maintains visual continuity with Hero */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 50% 60% at 8% 50%,  rgba(232,219,252,0.18) 0%, rgba(255,255,255,0) 68%),
            radial-gradient(ellipse 45% 55% at 92% 40%, rgba(212,239,255,0.18) 0%, rgba(255,255,255,0) 68%)
          `,
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-16">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="mb-14 md:mb-16">

          {/* Eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5"
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
                background: 'rgba(255,255,255,0.70)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(0,0,0,0.07)',
                color: '#666',
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg,#a78bfa,#60a5fa)',
                  flexShrink: 0,
                  display: 'inline-block',
                }}
              />
              {trust.eyebrow}
            </span>
          </motion.div>

          {/* Split-weight headline */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.07 }}
            style={{
              fontSize: 'clamp(30px, 4.8vw, 60px)',
              letterSpacing: '-0.04em',
              lineHeight: 1.07,
              marginBottom: 18,
              fontFamily: '"Inter", var(--font-sans), sans-serif',
            }}
          >
            <span style={{ fontWeight: 300, color: '#9CA3AF' }}>{trust.title_light}</span>
            <span style={{ fontWeight: 800, color: '#111827' }}>{trust.title_bold}</span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.14 }}
            style={{
              fontSize: 'clamp(14px, 1.3vw, 17px)',
              color: '#6B7280',
              lineHeight: 1.65,
              fontWeight: 400,
              maxWidth: '50ch',
              letterSpacing: '-0.01em',
            }}
          >
            {trust.subtitle}
          </motion.p>
        </div>

        {/* ── 4-column card grid ───────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ICONS.map((Icon, i) => (
            <AdvantageCard
              key={i}
              icon={Icon}
              title={feats[i].title}
              desc={feats[i].desc}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
