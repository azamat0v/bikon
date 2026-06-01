import { type CSSProperties, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import SplitHeading from './SplitHeading';

export interface SpecsSectionProps {
  id?: string;
  eyebrow: string;
  title: string;
  col1Label: string;
  col2Label: string;
  categories: { name: string; rows: readonly (readonly string[])[] }[];
}

const BLUEPRINT: CSSProperties = {
  backgroundColor: '#080808',
  backgroundImage: [
    'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)',
    'linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
    'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
    'linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
  ].join(', '),
  backgroundSize: '120px 120px, 120px 120px, 24px 24px, 24px 24px',
  backgroundPosition: '-1px -1px, -1px -1px, -1px -1px, -1px -1px',
};

function useIsMobile(bp = 640) {
  const [mob, setMob] = useState(() => window.innerWidth < bp);
  useEffect(() => {
    const h = () => setMob(window.innerWidth < bp);
    window.addEventListener('resize', h, { passive: true });
    return () => window.removeEventListener('resize', h);
  }, [bp]);
  return mob;
}

function SpecCell({ val }: { val: string }) {
  return val === '✓'
    ? <Check size={14} style={{ color: '#22C55E' }} />
    : <>{val}</>;
}

export default function SpecsSection({
  id = 'specs',
  eyebrow,
  title,
  col1Label,
  col2Label,
  categories,
}: SpecsSectionProps) {
  const isMobile = useIsMobile();
  const hasTwo = Boolean(col2Label);

  return (
    <section id={id} style={{ ...BLUEPRINT, minHeight: '100vh', padding: isMobile ? '80px 0 100px' : '110px 0 130px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

      {/* Edge vignette */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 38%, rgba(4,4,4,0.65) 100%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 1, width: '100%', boxSizing: 'border-box' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 40 : 64 }}>
          <motion.span
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: '#0066CC', display: 'block', marginBottom: 20 }}
          >
            {eyebrow}
          </motion.span>
          <SplitHeading
            text={title}
            style={{ fontSize: isMobile ? 'clamp(24px, 7vw, 36px)' : 'clamp(28px, 4.5vw, 56px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.1 }}
          />
        </div>

        {isMobile ? (
          /* ── MOBILE: stacked card layout ── */
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            {categories.map((cat, ci) => (
              <div
                key={cat.name}
                style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
              >
                {/* Category header */}
                <motion.div
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: ci * 0.05 }}
                  style={{ background: 'rgba(255,255,255,0.025)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <motion.div
                    initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{ width: 16, height: 2, background: '#0066CC', borderRadius: 2, transformOrigin: 'left', flexShrink: 0 }}
                  />
                  <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.30)' }}>
                    {cat.name}
                  </span>
                </motion.div>

                {/* Column labels (if two models) */}
                {hasTwo && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '8px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div />
                    {[col1Label, col2Label].map((lbl) => (
                      <div key={lbl} style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '-0.01em' }}>{lbl}</div>
                    ))}
                  </div>
                )}

                {/* Rows */}
                {cat.rows.map((row, ri) => {
                  const v1 = (row as string[])[1] ?? '—';
                  const v2 = (row as string[])[2];
                  const showV2 = hasTwo && v2 && v2 !== '—';

                  return (
                    <motion.div
                      key={ri}
                      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                      viewport={{ once: true }} transition={{ duration: 0.4, delay: ri * 0.03 }}
                      style={{ borderBottom: ri < cat.rows.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', padding: '10px 16px' }}
                    >
                      {hasTwo ? (
                        /* Two-value comparison row */
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', alignItems: 'center', gap: 4 }}>
                          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', fontWeight: 500, lineHeight: 1.3 }}>{row[0]}</span>
                          <div style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.82)', fontWeight: 500 }}>
                            <SpecCell val={v1} />
                          </div>
                          <div style={{ textAlign: 'center', fontSize: 12, color: showV2 ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0.25)', fontWeight: 500 }}>
                            <SpecCell val={v2 ?? '—'} />
                          </div>
                        </div>
                      ) : (
                        /* Single value row */
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', fontWeight: 500 }}>{row[0]}</span>
                          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.82)', fontWeight: 500, textAlign: 'right' }}>
                            <SpecCell val={v1} />
                          </span>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </motion.div>
        ) : (
          /* ── DESKTOP: original table layout ── */
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}>

              {/* Sticky column headers */}
              <div style={{ position: 'sticky', top: 72, zIndex: 10, display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', background: 'rgba(6,6,8,0.97)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ padding: '20px 20px 20px 24px' }} />
                {[col1Label, col2Label].map((label) => (
                  <div key={label} style={{ padding: '20px 16px', borderLeft: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.82)', letterSpacing: '-0.01em' }}>{label}</span>
                  </div>
                ))}
              </div>

              {/* Categories + rows */}
              {categories.map((cat, ci) => (
                <div key={cat.name}>
                  <motion.div
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                    viewport={{ once: true }} transition={{ duration: 0.5 }}
                    style={{ background: 'rgba(255,255,255,0.025)', borderTop: ci === 0 ? 'none' : '1px solid rgba(255,255,255,0.04)', padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 12 }}
                  >
                    <motion.div
                      initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      style={{ width: 20, height: 2, background: '#0066CC', borderRadius: 2, transformOrigin: 'left', flexShrink: 0 }}
                    />
                    <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.30)' }}>{cat.name}</span>
                  </motion.div>

                  {cat.rows.map((row, ri) => {
                    const v1 = (row as string[])[1] ?? '—';
                    const v2 = (row as string[])[2] ?? '—';
                    return (
                      <motion.div
                        key={ri}
                        initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.45, delay: ri * 0.04, ease: [0.16, 1, 0.3, 1] }}
                        style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                      >
                        <div style={{ padding: '14px 20px 14px 24px', fontSize: 13, color: 'rgba(255,255,255,0.36)', fontWeight: 500, letterSpacing: '-0.005em' }}>{row[0]}</div>
                        {[v1, v2].map((val, vi) => (
                          <div key={vi} style={{ padding: '14px 16px', fontSize: 13, color: 'rgba(255,255,255,0.78)', fontWeight: 500, borderLeft: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <SpecCell val={val} />
                          </div>
                        ))}
                      </motion.div>
                    );
                  })}
                </div>
              ))}

              <div style={{ height: 18, background: 'rgba(6,6,8,0.6)', borderTop: '1px solid rgba(255,255,255,0.04)' }} />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
