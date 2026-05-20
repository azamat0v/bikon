import { useRef, useEffect, useState } from 'react';
import {
  motion,
  useInView,
  AnimatePresence,
} from 'motion/react';
import { ArrowRight, ShoppingCart, ChevronDown, Monitor, Cable, Headphones, Zap, Eye, Shield, Sun, RotateCw, Maximize2, Award, Layers, type LucideIcon } from 'lucide-react';

import Navbar from './Navbar';
import Footer from './Footer';
import { useLang } from '../context/LanguageContext';
import SplitHeading from './SplitHeading';
import SpecsSection from './SpecsSection';

/* ─────────────────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────────────────── */
interface MonitorsTr {
  hero_eyebrow: string;
  hero_title: string;
  hero_subtitle: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;
  hero_scroll: string;
  lineup_eyebrow: string;
  lineup_title: string;
  lineup_vision_name: string;
  lineup_vision_tag: string;
  lineup_vision_desc: string;
  lineup_pro_name: string;
  lineup_pro_tag: string;
  lineup_pro_desc: string;
  lineup_badge_pro: string;
  lineup_learn: string;
  features_eyebrow: string;
  features_title: string;
  features: { label: string; title: string; desc: string }[];
  specs_eyebrow: string;
  specs_title: string;
  specs_vision_label: string;
  specs_pro_label: string;
  specs_categories: { name: string; rows: readonly (readonly string[])[] }[];
  color_eyebrow: string;
  color_title: string;
  color_body: string;
  color_stats: { value: string; label: string }[];
  stand_eyebrow: string;
  stand_title: string;
  stand_body: string;
  stand_pills: string[];
  cta_title: string;
  cta_body: string;
  cta_shop: string;
  cta_catalog: string;
  bento_eyebrow: string;
  bento_title: string;
  ports_eyebrow: string;
  ports_title: string;
  ports_body: string;
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
export default function MonitorsPage() {
  const { tr } = useLang();
  const m = tr.monitors as MonitorsTr;

  return (
    <div className="bg-black min-h-screen" style={{ overflowX: 'clip' }}>
      <style>{`
        .monitors-sel::selection { background:#fff; color:#000; }
        .monitors-sel *::selection { background:#fff; color:#000; }
        @keyframes spin-grad {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float-y {
          0%,100% { transform: translateY(0px);   opacity:.18; }
          50%      { transform: translateY(-14px); opacity:.45; }
        }
      `}</style>
      <div className="monitors-sel">
        <Navbar />
        <HeroSection m={m} />
        <InfiniteColorSection m={m} />
        <VStandSection m={m} />
        <BentoSectionMonitors m={m} />
        <FeaturesSection m={m} />
        <PortsSectionMonitors m={m} />
        <SpecsSection
          eyebrow={m.specs_eyebrow}
          title={m.specs_title}
          col1Label={m.specs_vision_label}
          col2Label={m.specs_pro_label}
          categories={m.specs_categories}
        />
        <ModelLineupSection m={m} />
        <CTASectionMonitors m={m} />
        <Footer />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   HeroSection — scroll-driven video reveal
───────────────────────────────────────────────────────────────────────── */
const PARTICLES = [
  { top: '16%', left: '11%',  size: 3, animDur: '7s',   animDelay: '0s'   },
  { top: '74%', left: '7%',   size: 2, animDur: '9.5s', animDelay: '1.3s' },
  { top: '26%', left: '86%',  size: 4, animDur: '6.5s', animDelay: '0.4s' },
  { top: '62%', left: '80%',  size: 2, animDur: '8s',   animDelay: '2.1s' },
  { top: '44%', left: '5%',   size: 2, animDur: '11s',  animDelay: '1.6s' },
  { top: '84%', left: '91%',  size: 3, animDur: '7.5s', animDelay: '0.7s' },
];

function HeroSection({ m }: { m: MonitorsTr }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [prog, setProg] = useState(0);

  useEffect(() => {
    let rafId: number;
    const tick = () => {
      const el = containerRef.current;
      if (el) {
        const scrolled = -el.getBoundingClientRect().top;
        const max = el.offsetHeight - window.innerHeight;
        if (max > 0) setProg(p => {
          const next = Math.max(0, Math.min(1, scrolled / max));
          return Math.abs(next - p) > 0.001 ? next : p; // avoid unnecessary re-renders
        });
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Smoothstep easing — eliminates the mechanical linear feel
  const ci = (x0: number, x1: number, y0: number, y1: number) => {
    const t = Math.max(0, Math.min(1, (prog - x0) / (x1 - x0)));
    const s = t * t * (3 - 2 * t); // smoothstep curve
    return y0 + (y1 - y0) * s;
  };

  // Container is 300vh → max sticky progress = 200/300 = 0.667
  const videoScale = ci(0,    1,    1.0,  0.60);  // slow cinematic pull-back
  const videoOp    = ci(0.25, 0.60, 1,    0   );  // long gradual fade
  const vigOp      = prog < 0.42 ? ci(0.15, 0.42, 0, 0.15) : ci(0.42, 0.60, 0.15, 0);
  const imageScale = ci(0,    0.62, 2.4,  1.0 );  // monitor reveals from screen-size
  const imageOp    = ci(0.30, 0.62, 0,    1   );  // slightly later than video starts fading
  const textOp     = ci(0.60, 0.65, 0,    1   );
  const textYpx    = ci(0.60, 0.65, 28,   0   );
  const hintOp     = ci(0,    0.07, 1,    0   );

  return (
    <div ref={containerRef} style={{ height: '300vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#000' }}>

        {/* Ambient glow */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,102,204,0.09) 0%, transparent 70%)',
        }} />

        {/* Floating particles */}
        {PARTICLES.map((p, i) => (
          <div key={i} aria-hidden style={{
            position: 'absolute', top: p.top, left: p.left,
            width: p.size, height: p.size, borderRadius: '50%',
            background: '#0066CC', pointerEvents: 'none', zIndex: 0,
            animation: `float-y ${p.animDur} ease-in-out ${p.animDelay} infinite`,
          }} />
        ))}

        {/* Video */}
        <video autoPlay muted playsInline loop src="/monitors/hero.mp4" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', transformOrigin: 'center center', zIndex: 1,
          transform: `scale(${videoScale})`, opacity: videoOp,
        }} />

        {/* Vignette */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
          opacity: vigOp,
          background: 'radial-gradient(ellipse 75% 75% at 50% 50%, transparent 35%, rgba(0,0,0,0.92) 100%)',
        }} />

        {/* Product image — starts zoomed into screen area, pulls back to reveal full monitor */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: `scale(${imageScale})`, transformOrigin: 'center center',
          opacity: imageOp,
        }}>
          <img
            src="/monitors/heroimg.png"
            alt="Bikon Vision Pro"
            draggable={false}
            style={{ width: 'min(88vw, 1100px)', height: 'auto', display: 'block' }}
          />
        </div>

        {/* Text overlay */}
        <div style={{
          position: 'absolute', bottom: '9%', left: '50%', zIndex: 10,
          transform: `translateX(-50%) translateY(${textYpx}px)`,
          textAlign: 'center', opacity: textOp,
          width: '100%', maxWidth: 680, padding: '0 24px',
          pointerEvents: textOp > 0.1 ? undefined : 'none',
        }}>
          <span style={{
            fontSize: 11, fontWeight: 800, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#0066CC', display: 'block', marginBottom: 14,
          }}>{m.hero_eyebrow}</span>
          <h1 style={{
            fontSize: 'clamp(36px, 5.5vw, 72px)', fontWeight: 900,
            letterSpacing: '-0.05em', lineHeight: 1.04, color: '#fff',
            whiteSpace: 'pre-line', marginBottom: 18,
          }}>{m.hero_title}</h1>
          <p style={{
            fontSize: 'clamp(14px, 1.6vw, 18px)', color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.65, marginBottom: 36,
          }}>{m.hero_subtitle}</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => document.getElementById('lineup')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: '#fff', color: '#000', padding: '13px 28px',
                borderRadius: 12, fontSize: 13, fontWeight: 700,
                border: 'none', cursor: 'pointer', letterSpacing: '-0.01em',
              }}
            >{m.hero_cta_primary}</button>
            <button
              onClick={() => document.getElementById('specs')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'transparent', color: 'rgba(255,255,255,0.65)',
                padding: '12px 26px', borderRadius: 12, fontSize: 13, fontWeight: 600,
                border: '1.5px solid rgba(255,255,255,0.14)', cursor: 'pointer', letterSpacing: '-0.01em',
              }}
            >{m.hero_cta_secondary}</button>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: 'absolute', bottom: 32, left: '50%',
          transform: 'translateX(-50%)', zIndex: 20, opacity: hintOp,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        }}>
          <span style={{
            fontSize: 10, fontWeight: 600, letterSpacing: '0.15em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
          }}>{m.hero_scroll}</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown size={18} style={{ color: 'rgba(255,255,255,0.25)' }} />
          </motion.div>
        </div>

      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   InfiniteColorSection — Display quality / color storytelling
───────────────────────────────────────────────────────────────────────── */
function InfiniteColorSection({ m }: { m: MonitorsTr }) {
  const vidRef = useRef<HTMLDivElement>(null);
  const isVidInView = useInView(vidRef, { once: true, margin: '-80px' });
  const isMobile = useIsMobile();

  const words = m.color_title.split(' ');
  const firstWord = words[0];
  const gradWord  = words.slice(1).join(' ');

  return (
    <section style={{ background: '#000', padding: isMobile ? '80px 0' : '120px 0', overflow: 'hidden' }}>

      {/* ── Content ── */}
      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: 1320, margin: '0 auto', padding: isMobile ? '0 20px' : '0 40px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: isMobile ? 36 : 72, alignItems: 'center',
      }}>

        {/* Text column */}
        <motion.div
          initial={{ opacity: 0, x: -36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
          style={{ order: 1 }}
        >
          <span style={{
            fontSize: 11, fontWeight: 800, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#0066CC', display: 'block', marginBottom: 20,
          }}>
            {m.color_eyebrow}
          </span>

          <h2 style={{
            fontSize: 'clamp(38px, 5.5vw, 72px)', fontWeight: 900,
            letterSpacing: '-0.05em', lineHeight: 1.04, color: '#fff', marginBottom: 24,
          }}>
            {firstWord}{' '}
            <span style={{
              background: 'linear-gradient(135deg, #ff006e 0%, #8338ec 35%, #06d6a0 70%, #ffbe0b 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              {gradWord}
            </span>
          </h2>

          <p style={{
            fontSize: 17, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, marginBottom: 44, maxWidth: 440,
          }}>
            {m.color_body}
          </p>

          {/* Stat chips */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {m.color_stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.28 + i * 0.08 }}
                style={{
                  padding: '14px 22px', borderRadius: 14, textAlign: 'center', minWidth: 90,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div style={{ fontSize: 26, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 5 }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Video column */}
        <div ref={vidRef} style={{ order: 2 }}>
          <motion.div
            animate={isVidInView
              ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
              : { opacity: 0, scale: 0.93, filter: 'blur(14px)' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              // Fade all edges into the background — no hard border
              WebkitMaskImage: 'radial-gradient(ellipse 82% 80% at 50% 50%, black 40%, transparent 100%)',
              maskImage:        'radial-gradient(ellipse 82% 80% at 50% 50%, black 40%, transparent 100%)',
            }}
          >
            <video
              autoPlay muted playsInline loop
              src="/monitors/colors.mp4"
              style={{ width: '100%', height: isMobile ? 260 : 520, objectFit: 'cover', display: 'block' }}
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   VStandSection — V-shaped aluminum stand design story
───────────────────────────────────────────────────────────────────────── */
function VStandSection({ m }: { m: MonitorsTr }) {
  const isMobile = useIsMobile();
  const imgRef = useRef<HTMLDivElement>(null);
  const isImgInView = useInView(imgRef, { once: true, margin: '-60px' });

  return (
    <section style={{
      background: '#050505',
      padding: isMobile ? '80px 0 100px' : '120px 0 140px',
      borderTop: '1px solid rgba(255,255,255,0.04)',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '0 20px' : '0 40px', textAlign: 'center' }}>

        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'inline-block',
            fontSize: 11, fontWeight: 800, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#0066CC', marginBottom: 48,
          }}
        >
          {m.stand_eyebrow}
        </motion.span>

        {/* Image */}
        <div ref={imgRef}>
          <motion.div
            animate={isImgInView
              ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
              : { opacity: 0, scale: 0.96, filter: 'blur(10px)' }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              borderRadius: 28,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.06)',
              marginBottom: 64,
              position: 'relative',
            }}
          >
            <img
              src="/monitors/v_stand.jpg"
              alt="V-Stand Design"
              onError={e => { (e.currentTarget as HTMLImageElement).src = '/monitors/vision_standard_angle.png'; }}
              style={{ width: '100%', height: isMobile ? '45vh' : '70vh', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(5,5,5,0.7) 0%, transparent 55%)',
              pointerEvents: 'none',
            }} />
          </motion.div>
        </div>

        {/* Headline */}
        <SplitHeading
          text={m.stand_title}
          delay={0.1}
          style={{
            fontSize: 'clamp(40px, 6vw, 80px)',
            fontWeight: 900,
            letterSpacing: '-0.05em',
            lineHeight: 1.04,
            color: '#fff',
            marginBottom: 22,
          }}
        />

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{
            fontSize: 18,
            color: 'rgba(255,255,255,0.4)',
            lineHeight: 1.65,
            maxWidth: 560,
            margin: '0 auto 44px',
          }}
        >
          {m.stand_body}
        </motion.p>

        {/* Feature pills */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          {m.stand_pills.map((pill, i) => (
            <motion.span
              key={pill}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.25 + i * 0.08 }}
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                borderRadius: 100,
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.05)',
                fontSize: 13,
                fontWeight: 600,
                color: 'rgba(255,255,255,0.7)',
                letterSpacing: '-0.01em',
              }}
            >
              {pill}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   BentoSectionMonitors — key specs grid (dark bento layout)
───────────────────────────────────────────────────────────────────────── */
function BentoSectionMonitors({ m }: { m: MonitorsTr }) {
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

  const gc = (desk: string, mob: string) => isMobile ? mob : desk;

  const SMALLS_1: { label: string; Icon: LucideIcon }[] = [
    { label: 'FreeSync',       Icon: Zap      },
    { label: 'Low Blue Light', Icon: Eye      },
    { label: 'Flicker-Free',   Icon: Shield   },
    { label: 'Anti-Glare',     Icon: Sun      },
  ];
  const SMALLS_2: { label: string; Icon: LucideIcon }[] = [
    { label: '178° View',      Icon: Layers   },
    { label: '-5°/+20° Tilt',  Icon: RotateCw },
    { label: '16:9 Aspect',    Icon: Maximize2 },
    { label: '12M Warranty',   Icon: Award    },
  ];

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: isMobile ? '60px 16px' : '60px 40px',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: 28 }}
      >
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: '#0066CC' }}>
          {m.bento_eyebrow}
        </span>
      </motion.div>

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
        {/* Header bar */}
        <div style={{
          ...card,
          gridColumn: gc('1 / 13', '1 / 7'),
          padding: '20px 28px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.016) 2px, rgba(255,255,255,0.016) 4px)',
        }}>
          <span style={{ fontSize: isMobile ? 13 : 17, fontWeight: 900, letterSpacing: '0.18em', color: '#fff', textTransform: 'uppercase' as const, textAlign: 'center' }}>
            {m.bento_title}
          </span>
        </div>

        {/* Highlight 1: Vision 22"/24" */}
        <div style={{ ...card, gridColumn: gc('1 / 5', '1 / 7'), padding: '22px 24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minHeight: 96 }}>
          <span style={{ ...gt('linear-gradient(135deg,#a78bfa,#60d4fa)'), fontSize: isMobile ? 20 : 24, fontWeight: 900, letterSpacing: '0.05em', textTransform: 'uppercase' as const, lineHeight: 1.1 }}>22" / 24" IPS</span>
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.36)', marginTop: 8, textTransform: 'uppercase' as const }}>VISION — FULL HD IPS DISPLAY</span>
        </div>

        {/* Highlight 2: 99% sRGB */}
        <div style={{ ...card, gridColumn: gc('5 / 9', '1 / 7'), padding: '22px 24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minHeight: 96 }}>
          <span style={{ ...gt('linear-gradient(135deg,#c084fc,#818cf8)'), fontSize: isMobile ? 20 : 24, fontWeight: 900, letterSpacing: '0.05em', textTransform: 'uppercase' as const, lineHeight: 1.1 }}>99% sRGB</span>
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.36)', marginTop: 8, textTransform: 'uppercase' as const }}>FACTORY-CALIBRATED COLOR</span>
        </div>

        {/* Highlight 3: Vision Pro 27" */}
        <div style={{ ...card, gridColumn: gc('9 / 13', '1 / 7'), padding: '22px 24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minHeight: 96 }}>
          <span style={{ ...gt('linear-gradient(135deg,#34d399,#60d4fa)'), fontSize: isMobile ? 20 : 24, fontWeight: 900, letterSpacing: '0.05em', textTransform: 'uppercase' as const, lineHeight: 1.1 }}>27" IPS PRO</span>
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.36)', marginTop: 8, textTransform: 'uppercase' as const }}>VISION PRO — QHD PANEL</span>
        </div>

        {/* Stat: 75Hz */}
        <div style={{ ...card, gridColumn: gc('1 / 5', '1 / 3'), padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', minHeight: 120 }}>
          <span style={{ fontSize: isMobile ? 30 : 44, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>75Hz</span>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: '#0066CC', marginTop: 8, textTransform: 'uppercase' as const }}>REFRESH RATE</span>
        </div>

        {/* Big center stat: 0.5ms */}
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
            background: 'radial-gradient(ellipse 80% 70% at 50% 60%, rgba(0,100,220,0.18) 0%, transparent 70%)',
          }} />
          <span style={{ fontSize: isMobile ? 34 : 54, fontWeight: 900, color: '#fff', letterSpacing: '-0.05em', lineHeight: 1, position: 'relative', zIndex: 1 }}>0.5ms</span>
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.36)', marginTop: 6, textTransform: 'uppercase' as const, position: 'relative', zIndex: 1 }}>RESPONSE TIME</span>
        </div>

        {/* Stat: 250 nits */}
        <div style={{ ...card, gridColumn: gc('9 / 13', '5 / 7'), padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', minHeight: 120, textAlign: 'right' }}>
          <span style={{ fontSize: isMobile ? 30 : 44, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>250</span>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.36)', marginTop: 8, textTransform: 'uppercase' as const }}>cd/m² BRIGHTNESS</span>
        </div>

        {/* Feature: IPS Panel */}
        <div style={{ ...card, gridColumn: gc('1 / 5', '1 / 7'), padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 16, minHeight: 86 }}>
          <div style={{ width: 42, height: 42, borderRadius: 10, flexShrink: 0, background: 'rgba(0,102,204,0.12)', border: '1px solid rgba(0,102,204,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Monitor size={20} color="#0066CC" strokeWidth={1.8} />
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', color: '#fff', textTransform: 'uppercase' as const, margin: 0, marginBottom: 3 }}>IPS PANEL</p>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.32)', textTransform: 'uppercase' as const, margin: 0 }}>FACTORY CALIBRATED</p>
          </div>
        </div>

        {/* Feature: V-Stand */}
        <div style={{ ...card, gridColumn: gc('5 / 9', '1 / 7'), padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 16, minHeight: 86 }}>
          <div style={{ width: 42, height: 42, borderRadius: 10, flexShrink: 0, background: 'rgba(148,163,184,0.1)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', color: '#fff', textTransform: 'uppercase' as const, margin: 0, marginBottom: 3 }}>V-STAND</p>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.32)', textTransform: 'uppercase' as const, margin: 0 }}>ALUMINUM ALLOY</p>
          </div>
        </div>

        {/* Feature: 2.3mm Bezels */}
        <div style={{ ...card, gridColumn: gc('9 / 13', '1 / 7'), padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 16, minHeight: 86 }}>
          <div style={{ width: 42, height: 42, borderRadius: 10, flexShrink: 0, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', color: '#fff', textTransform: 'uppercase' as const, margin: 0, marginBottom: 3 }}>2.3mm BEZELS</p>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.32)', textTransform: 'uppercase' as const, margin: 0 }}>VISION PRO ULTRA-THIN</p>
          </div>
        </div>

        {/* Small tags */}
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
              gap: 7, minHeight: 70,
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
   PortsSectionMonitors — D-SUB · HDMI · AUX connectivity
───────────────────────────────────────────────────────────────────────── */
const MONITOR_PORTS = [
  { Icon: Monitor,    label: 'D-SUB',  spec: 'VGA Input'     },
  { Icon: Cable,      label: 'HDMI',   spec: 'HDMI 1.4 In'  },
  { Icon: Headphones, label: 'AUX',    spec: '3.5mm Audio Out' },
];

function PortsSectionMonitors({ m }: { m: MonitorsTr }) {
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
      <div style={{ textAlign: 'center', marginBottom: isMobile ? 52 : 72, position: 'relative', zIndex: 1 }}>
        <motion.span
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: '#0066CC', display: 'block', marginBottom: 18 }}
        >{m.ports_eyebrow}</motion.span>
        <SplitHeading
          text={m.ports_title}
          style={{ fontSize: 'clamp(36px, 5vw, 68px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.05em', lineHeight: 1.05, marginBottom: 20 }}
        />
        <motion.p
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
          style={{ fontSize: 'clamp(14px, 1.4vw, 17px)', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, maxWidth: 520, margin: '0 auto' }}
        >{m.ports_body}</motion.p>
      </div>

      {/* Port cards — 3 large cards */}
      <motion.div
        initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 16,
          justifyContent: 'center',
          position: 'relative', zIndex: 1,
          width: '100%',
          maxWidth: 720,
        }}
      >
        {MONITOR_PORTS.map(({ Icon, label, spec }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 20,
              padding: isMobile ? '28px 24px' : '36px 40px',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 16,
              flex: '1 1 180px',
              maxWidth: 220,
              cursor: 'default',
              transition: 'background 0.25s ease, border-color 0.25s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,102,204,0.3)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
            }}
          >
            <div style={{
              width: 56, height: 56, borderRadius: 14,
              background: 'rgba(0,102,204,0.1)',
              border: '1px solid rgba(0,102,204,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon size={24} color="#0066CC" strokeWidth={1.6} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 18, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', margin: 0, marginBottom: 6 }}>{label}</p>
              <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, margin: 0 }}>{spec}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   ModelLineupSection — Two equal product cards
───────────────────────────────────────────────────────────────────────── */
function ModelLineupSection({ m }: { m: MonitorsTr }) {
  const isMobile = useIsMobile();
  const models = [
    {
      name: m.lineup_vision_name,
      tag: m.lineup_vision_tag,
      desc: m.lineup_vision_desc,
      image: '/monitors/vision_standard_angle.png',
      specs: ['22" / 24"', '75Hz', '0.5ms', 'IPS Panel'],
    },
    {
      name: m.lineup_pro_name,
      tag: m.lineup_pro_tag,
      desc: m.lineup_pro_desc,
      image: '/monitors/vision_pro_angle.png',
      specs: ['24" / 27"', '75Hz', '2.3mm Bezels', 'IPS Panel'],
    },
  ];

  return (
    <section id="lineup" style={{ padding: isMobile ? '80px 16px' : '120px 24px', background: '#000' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 48 : 72 }}>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '0.2em',
              textTransform: 'uppercase' as const,
              color: '#0066CC',
              display: 'block',
              marginBottom: 20,
            }}
          >
            {m.lineup_eyebrow}
          </motion.span>
          <SplitHeading
            text={m.lineup_title}
            style={{
              fontSize: 'clamp(36px, 5.5vw, 68px)',
              fontWeight: 900,
              color: '#fff',
              letterSpacing: '-0.045em',
              lineHeight: 1.08,
            }}
          />
        </div>

        {/* Cards — identical treatment, no hierarchy */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 20,
            alignItems: 'stretch',
          }}
        >
          {models.map((model, i) => (
            <motion.div
              key={model.name}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.14, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
              style={{
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
              <div
                style={{
                  padding: '52px 40px 28px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: 280,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Soft radial glow */}
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse 55% 55% at 50% 65%, rgba(0,102,204,0.13) 0%, transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />

                <motion.img
                  whileHover={{ scale: 1.05, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
                  src={model.image}
                  alt={model.name}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/monitor.png'; }}
                  style={{
                    maxHeight: 220,
                    maxWidth: '100%',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))',
                    position: 'relative',
                    zIndex: 1,
                  }}
                />
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '0 32px' }} />

              {/* Info */}
              <div style={{ padding: '28px 32px 40px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3
                  style={{
                    fontSize: 24,
                    fontWeight: 800,
                    color: '#fff',
                    letterSpacing: '-0.03em',
                    marginBottom: 6,
                  }}
                >
                  {model.name}
                </h3>

                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase' as const,
                    color: 'rgba(255,255,255,0.28)',
                    marginBottom: 16,
                  }}
                >
                  {model.tag}
                </p>

                <p
                  style={{
                    fontSize: 15,
                    color: 'rgba(255,255,255,0.45)',
                    lineHeight: 1.7,
                    marginBottom: 26,
                    flex: 1,
                  }}
                >
                  {model.desc}
                </p>

                {/* Spec chips — same style for both */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
                  {model.specs.map((spec) => (
                    <span
                      key={spec}
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: 'rgba(255,255,255,0.55)',
                        background: 'rgba(255,255,255,0.07)',
                        padding: '5px 12px',
                        borderRadius: 8,
                        letterSpacing: '0.04em',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Buy button — same for both */}
                <a
                  href="https://shop.bikon.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    background: '#fff',
                    color: '#000',
                    padding: '13px 26px',
                    borderRadius: 12,
                    fontSize: 13,
                    fontWeight: 700,
                    textDecoration: 'none',
                    letterSpacing: '-0.01em',
                    alignSelf: 'flex-start',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  <ShoppingCart size={14} strokeWidth={2.5} />
                  {m.cta_shop}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   FeaturesSection — Sticky Scroll Showcase
───────────────────────────────────────────────────────────────────────── */
const STICKY_FEATURE_IMAGES = [
  '/monitors/future1.png',
  '/monitors/future2.png',
  '/monitors/future3.png',
  '/monitors/future4.png',
];

function FeaturesSection({ m }: { m: MonitorsTr }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [prog, setProg] = useState(0);
  const TOTAL = 4;
  const isMobile = useIsMobile();

  useEffect(() => {
    let rafId: number;
    const tick = () => {
      const el = containerRef.current;
      if (el) {
        const scrolled = -el.getBoundingClientRect().top;
        const max = el.offsetHeight - window.innerHeight;
        if (max > 0) {
          setProg(p => {
            const next = Math.max(0, Math.min(1, scrolled / max));
            return Math.abs(next - p) > 0.001 ? next : p;
          });
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const activeIndex = Math.min(TOTAL - 1, Math.floor(prog * TOTAL));
  const subProg = (prog * TOTAL) % 1;

  return (
    <section id="features" style={{ background: '#060606' }}>
      {/* Section header — non-sticky */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '110px 24px 64px', textAlign: 'center' }}>
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: '0.2em',
            textTransform: 'uppercase' as const,
            color: '#0066CC',
            display: 'block',
            marginBottom: 20,
          }}
        >
          {m.features_eyebrow}
        </motion.span>
        <SplitHeading
          text={m.features_title}
          style={{
            fontSize: 'clamp(30px, 5.5vw, 64px)',
            fontWeight: 900,
            color: '#fff',
            letterSpacing: '-0.045em',
            lineHeight: 1.06,
          }}
        />
      </div>

      {/* 500vh scroll container */}
      <div ref={containerRef} style={{ height: '500vh', position: 'relative' }}>
        {/* Sticky shell */}
        {isMobile ? (
          /* Mobile: full-bleed image background + text overlay at bottom */
          <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
            {/* Background image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                src={STICKY_FEATURE_IMAGES[activeIndex]}
                alt={m.features[activeIndex]?.title ?? ''}
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/monitor.png'; }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover', display: 'block',
                }}
              />
            </AnimatePresence>

            {/* Gradient overlay — bottom heavy for text readability */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(6,6,6,0.95) 0%, rgba(6,6,6,0.55) 45%, rgba(6,6,6,0.08) 100%)',
              pointerEvents: 'none',
            }} />

            {/* Text + progress at bottom */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 24px 52px', zIndex: 1 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span style={{
                    fontSize: 10, fontWeight: 800, letterSpacing: '0.2em',
                    textTransform: 'uppercase' as const, color: '#0066CC',
                    display: 'block', marginBottom: 12,
                  }}>
                    {m.features[activeIndex]?.label}
                  </span>
                  <SplitHeading
                    text={m.features[activeIndex]?.title ?? ''}
                    delay={0}
                    style={{
                      fontSize: 'clamp(26px, 7vw, 40px)',
                      fontWeight: 900, color: '#fff',
                      letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 14,
                    }}
                  />
                  <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65 }}>
                    {m.features[activeIndex]?.desc}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Progress bar */}
              <div style={{ display: 'flex', gap: 6, marginTop: 28 }}>
                {Array.from({ length: TOTAL }).map((_, i) => {
                  const fillRatio = i < activeIndex ? 1 : i === activeIndex ? subProg : 0;
                  return (
                    <div key={i} style={{ flex: 1, height: 2, background: 'rgba(255,255,255,0.15)', borderRadius: 1, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: fillRatio * 100 + '%', background: '#0066CC', borderRadius: 1 }} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* Desktop: 45/55 split */
          <div
            style={{
              position: 'sticky',
              top: 0,
              height: '100vh',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: '45% 55%',
            }}
          >
            {/* Left — text + progress bar */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '0 48px 0 64px',
                overflow: 'hidden',
              }}
            >
              {/* Huge dim background number */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: 40,
                  transform: 'translateY(-60%)',
                  fontSize: 300,
                  fontWeight: 900,
                  color: 'rgba(255,255,255,0.03)',
                  lineHeight: 1,
                  letterSpacing: '-0.06em',
                  userSelect: 'none',
                  pointerEvents: 'none',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {String(activeIndex + 1).padStart(2, '0')}
              </div>

              {/* Feature text */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  style={{ position: 'relative', zIndex: 1 }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase' as const,
                      color: '#0066CC',
                      display: 'block',
                      marginBottom: 24,
                    }}
                  >
                    {m.features[activeIndex]?.label}
                  </span>
                  <SplitHeading
                    text={m.features[activeIndex]?.title ?? ''}
                    delay={0}
                    style={{
                      fontSize: 'clamp(28px, 3.5vw, 52px)',
                      fontWeight: 900,
                      color: '#fff',
                      letterSpacing: '-0.04em',
                      lineHeight: 1.1,
                      marginBottom: 24,
                    }}
                  />
                  <p
                    style={{
                      fontSize: 17,
                      color: 'rgba(255,255,255,0.4)',
                      lineHeight: 1.75,
                      maxWidth: 380,
                    }}
                  >
                    {m.features[activeIndex]?.desc}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Progress bar — 4 segments, no CSS transition */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 52,
                  left: 64,
                  right: 48,
                  display: 'flex',
                  gap: 6,
                }}
              >
                {Array.from({ length: TOTAL }).map((_, i) => {
                  const fillRatio =
                    i < activeIndex ? 1 :
                    i === activeIndex ? subProg :
                    0;
                  return (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: 2,
                        background: 'rgba(255,255,255,0.12)',
                        borderRadius: 1,
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: fillRatio * 100 + '%',
                          background: '#0066CC',
                          borderRadius: 1,
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right — image */}
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.04, filter: 'blur(0px)' }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  style={{ position: 'absolute', inset: 0 }}
                >
                  <img
                    src={STICKY_FEATURE_IMAGES[activeIndex]}
                    alt={m.features[activeIndex]?.title ?? ''}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/monitor.png'; }}
                    style={{
                      width: '100%',
                      height: '100vh',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   CTA
───────────────────────────────────────────────────────────────────────── */
function CTASectionMonitors({ m }: { m: MonitorsTr }) {
  const isMobile = useIsMobile();
  return (
    <section
      style={{
        background: '#030303',
        padding: isMobile ? '88px 24px' : '130px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient aura */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 65% 75% at 50% 50%, rgba(0,102,204,0.11) 0%, transparent 70%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 660,
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <SplitHeading
          text={m.cta_title}
          style={{
            fontSize: 'clamp(34px, 5.5vw, 70px)',
            fontWeight: 900,
            color: '#fff',
            letterSpacing: '-0.05em',
            lineHeight: 1.06,
            marginBottom: 22,
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            fontSize: 17,
            color: 'rgba(255,255,255,0.38)',
            lineHeight: 1.65,
            marginBottom: 52,
          }}
        >
          {m.cta_body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{
            display: 'flex',
            gap: 12,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <motion.a
            href="https://shop.bikon.uz"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#fff',
              color: '#000',
              padding: '14px 30px',
              borderRadius: 13,
              fontSize: 13,
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              letterSpacing: '-0.01em',
            }}
          >
            <ShoppingCart size={15} strokeWidth={2.5} />
            {m.cta_shop}
          </motion.a>

          <motion.a
            href="/Bikon.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'transparent',
              color: 'rgba(255,255,255,0.55)',
              padding: '13px 28px',
              borderRadius: 13,
              fontSize: 13,
              fontWeight: 600,
              border: '1.5px solid rgba(255,255,255,0.12)',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
            }}
          >
            {m.cta_catalog}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
