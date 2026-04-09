import { useState } from 'react';
import { motion } from 'motion/react';
import { Download, FileText } from 'lucide-react';

export default function CatalogSection() {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      aria-label="Download Catalog"
      style={{
        background: 'linear-gradient(160deg, #F8F8FC 0%, #F2F4F8 100%)',
        paddingTop: 96,
        paddingBottom: 96,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* ── Ambient aura — top-right lavender ────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '55%',
          height: '120%',
          background:
            'radial-gradient(ellipse 70% 60% at 65% 40%, rgba(232,219,252,0.38) 0%, rgba(212,239,255,0.20) 50%, transparent 80%)',
          pointerEvents: 'none',
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ══════════════════════════════════════════════════════════════════
              LEFT — Text & CTA  (order-2 on mobile so image shows first)
          ══════════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 lg:order-1 flex flex-col items-start"
          >
            {/* Eyebrow */}
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.20em',
                textTransform: 'uppercase',
                color: '#2563EB',
                marginBottom: 20,
              }}
            >
              <FileText size={13} strokeWidth={2.5} />
              Resources
            </span>

            {/* Headline */}
            <h2
              style={{
                fontSize: 'clamp(28px, 4vw, 52px)',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                lineHeight: 1.06,
                color: '#111827',
                fontFamily: '"Inter", var(--font-sans), sans-serif',
                marginBottom: 20,
              }}
            >
              <span style={{ fontWeight: 300, color: '#9CA3AF' }}>Download our </span>
              2026 Catalog
            </h2>

            {/* Body */}
            <p
              style={{
                fontSize: 16,
                color: '#6B7280',
                lineHeight: 1.7,
                maxWidth: '44ch',
                marginBottom: 44,
                fontFamily: '"Inter", var(--font-sans), sans-serif',
              }}
            >
              Explore the full Bikon product line — detailed specifications,
              pricing, and configuration options for every device we make.
            </p>

            {/* Download button */}
            <motion.a
              href="/Bikon.pdf"
              download="Bikon_Catalog_2026.pdf"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: '#111',
                color: '#fff',
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: '-0.01em',
                padding: '14px 28px',
                borderRadius: 12,
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 32px rgba(0,0,0,0.28)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.18)';
              }}
            >
              <Download size={16} strokeWidth={2.5} />
              Download PDF
            </motion.a>
          </motion.div>

          {/* ══════════════════════════════════════════════════════════════════
              RIGHT — Catalog image  (order-1 on mobile so it shows first)
          ══════════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 48, rotateY: -6 }}
            whileInView={{ opacity: 1, x: 0, rotateY: -4 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="order-1 lg:order-2"
            style={{
              perspective: 1000,
              perspectiveOrigin: 'center center',
            }}
          >
            {/* Aura glow behind the image */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: '-12%',
                background:
                  'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(232,219,252,0.55) 0%, rgba(212,239,255,0.35) 50%, transparent 80%)',
                filter: 'blur(32px)',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            />

            <motion.div
              animate={{
                rotateY: hovered ? 0 : -4,
                scale: hovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                zIndex: 1,
                transformStyle: 'preserve-3d',
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: hovered
                  ? '0 40px 80px -12px rgba(0,0,0,0.22), 0 12px 32px -8px rgba(0,0,0,0.12)'
                  : '0 24px 60px -10px rgba(0,0,0,0.16), 0 8px 24px -6px rgba(0,0,0,0.09)',
                transition: 'box-shadow 0.4s ease',
              }}
            >
              <img
                src="/katalog.jpg"
                alt="Bikon 2026 Product Catalog"
                draggable={false}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'cover',
                }}
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
