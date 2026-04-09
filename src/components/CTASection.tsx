import { motion, useMotionValue, useSpring, useTransform, animate } from 'motion/react';
import { useEffect, useRef } from 'react';
import { ArrowRight, Star } from 'lucide-react';

export default function CTASection() {
  const imgRef = useRef<HTMLImageElement>(null);

  /* ── Continuous float animation on the product image ──────────────────── */
  useEffect(() => {
    let controls: ReturnType<typeof animate>;
    let running = true;

    function loop() {
      if (!running || !imgRef.current) return;
      controls = animate(imgRef.current, { y: [0, -10, 0] }, {
        duration: 3.8,
        ease: 'easeInOut',
        onComplete: loop,
      });
    }

    // Small delay so the entrance animation finishes first
    const t = setTimeout(loop, 900);
    return () => {
      running = false;
      clearTimeout(t);
      controls?.stop();
    };
  }, []);

  return (
    <section
      aria-label="Shop bestsellers"
      style={{
        background: '#0A0A0B',
        paddingTop: 128,
        paddingBottom: 128,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* ── Smooth mesh auras — all fade to transparent, no hard edges ───── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 60% 80% at 15% 50%,  rgba(59,130,246,0.14) 0%, transparent 70%),
            radial-gradient(ellipse 50% 65% at 55% 25%,  rgba(139,92,246,0.12) 0%, transparent 70%),
            radial-gradient(ellipse 70% 80% at 75% 60%,  rgba(99,102,241,0.18) 0%, transparent 70%),
            radial-gradient(ellipse 45% 55% at 65% 85%,  rgba(59,130,246,0.10) 0%, transparent 65%)
          `,
          pointerEvents: 'none',
        }}
      />
      {/* Subtle 1px top shimmer — visual separator from white sections above */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.25) 40%, rgba(59,130,246,0.25) 60%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Content (max-w constrains text/image, bg fills full width) ─── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">

            {/* LEFT — text block */}
            <motion.div
              initial={{ opacity: 0, x: -36 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.80, ease: [0.16, 1, 0.3, 1] }}
              className="px-10 md:px-16 py-16 lg:py-20 flex flex-col items-start"
            >
              {/* Pill badge */}
              <motion.span
                initial={{ opacity: 0, y: -8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.55)',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  padding: '7px 14px',
                  borderRadius: 999,
                  marginBottom: 28,
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                <Star size={10} strokeWidth={2.5} fill="currentColor" style={{ color: '#FACC15' }} />
                Top Rated
              </motion.span>

              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontSize: 'clamp(36px, 5vw, 68px)',
                  fontWeight: 900,
                  letterSpacing: '-0.045em',
                  lineHeight: 1.04,
                  color: '#FFFFFF',
                  fontFamily: '"Inter", var(--font-sans), sans-serif',
                  marginBottom: 22,
                }}
              >
                Discover our<br />
                <span style={{ color: 'rgba(255,255,255,0.22)', fontWeight: 500, fontStyle: 'italic' }}>
                  Bestsellers.
                </span>
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.20 }}
                style={{
                  fontSize: 16,
                  color: 'rgba(255,255,255,0.46)',
                  lineHeight: 1.68,
                  maxWidth: '38ch',
                  marginBottom: 40,
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                Join thousands of users who have upgraded to Bikon.
                Professional power, engineered for Uzbekistan.
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.26 }}
                style={{ display: 'flex', alignItems: 'center', gap: 16 }}
              >
                <motion.a
                  href="https://shop.bikon.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    background: '#FFFFFF',
                    color: '#0A0A0B',
                    fontSize: 14,
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                    padding: '13px 26px',
                    borderRadius: 12,
                    textDecoration: 'none',
                    boxShadow: '0 0 0 1px rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.4)',
                  }}
                >
                  Shop Now
                  <ArrowRight size={15} strokeWidth={2.5} />
                </motion.a>

                <a
                  href="https://shop.bikon.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.40)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.40)')}
                >
                  View all →
                </a>
              </motion.div>
            </motion.div>

            {/* RIGHT — product image */}
            <motion.div
              initial={{ opacity: 0, x: 48, scale: 0.90 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="relative flex items-center justify-center
                         px-6 py-12 lg:py-0
                         lg:translate-x-[5%]"
              style={{ overflow: 'visible' }}
            >
              {/* Product halo glow */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: '-20%',
                  background: 'radial-gradient(ellipse 75% 65% at 50% 55%, rgba(99,102,241,0.35) 0%, rgba(139,92,246,0.25) 35%, transparent 70%)',
                  filter: 'blur(28px)',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              />

              <img
                ref={imgRef}
                src="/bestseller.png"
                alt="Bikon Bestseller"
                draggable={false}
                style={{
                  position: 'relative',
                  zIndex: 1,
                  width: '100%',
                  maxWidth: 580,
                  height: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 32px 64px rgba(59,130,246,0.25)) drop-shadow(0 8px 24px rgba(0,0,0,0.55))',
                  willChange: 'transform',
                }}
              />
            </motion.div>

        </div>
      </div>
    </section>

  );
}
