import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import Navbar from './Navbar';
import Footer from './Footer';
import SplitHeading from './SplitHeading';
import SpecsSection from './SpecsSection';
import { FloatingPathsBackground } from './ui/floating-paths';
import { useLang } from '../context/LanguageContext';
import { useShopModal } from '../context/ShopModalContext';
import { useProductPageCms, cmsToSpecCategories } from '../lib/useProductPageCms';

interface CasesTr {
  hero_eyebrow: string;
  hero_title: string;
  hero_subtitle: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;
  models_eyebrow: string;
  models_title: string;
  models: { name: string; tag: string; desc: string; specs: string[] }[];
  models_cta: string;
  image_eyebrow: string;
  image_title: string;
  image_body: string;
  ports_eyebrow: string;
  ports_title: string;
  ports_body: string;
  specs_eyebrow: string;
  specs_title: string;
  specs_label: string;
  specs_categories: { name: string; rows: readonly (readonly string[])[] }[];
  cta_title: string;
  cta_body: string;
  cta_shop: string;
  cta_catalog: string;
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
export default function CasesPage() {
  const { tr } = useLang();
  const base = (tr as unknown as { cases: CasesTr }).cases;
  const cms = useProductPageCms('cases');
  const cmsSpecs = cmsToSpecCategories(cms);

  const l: CasesTr = {
    ...base,
    hero_eyebrow:     cms?.hero_eyebrow     ?? base.hero_eyebrow,
    hero_title:       cms?.hero_title       ?? base.hero_title,
    hero_subtitle:    cms?.hero_subtitle    ?? base.hero_subtitle,
    hero_cta_primary: cms?.hero_cta_primary ?? base.hero_cta_primary,
    hero_cta_secondary: cms?.hero_cta_secondary ?? base.hero_cta_secondary,
    models_eyebrow:   cms?.lineup_eyebrow   ?? base.models_eyebrow,
    models_title:     cms?.lineup_title     ?? base.models_title,
    models: cms?.models?.length
      ? cms.models.map((m, i) => ({
          name:  m.name  ?? base.models[i]?.name  ?? '',
          tag:   m.tag   ?? base.models[i]?.tag   ?? '',
          desc:  m.description ?? base.models[i]?.desc ?? '',
          specs: (m.specs as string[] | null) ?? base.models[i]?.specs ?? [],
        }))
      : base.models,
    specs_eyebrow:     cms?.specs_eyebrow ?? base.specs_eyebrow,
    specs_title:       cms?.specs_title   ?? base.specs_title,
    specs_label:       cms?.specs_label   ?? base.specs_label,
    specs_categories:  cmsSpecs           ?? base.specs_categories,
  };

  return (
    <div className="bg-black min-h-screen" style={{ overflowX: 'clip' }}>
      <style>{`
        .cases-sel::selection { background: #a855f7; color: #fff; }
        .cases-sel *::selection { background: #a855f7; color: #fff; }
        @keyframes rgb-pulse {
          0%,100% { color: #fff; }
          40%      { color: #c084fc; }
          80%      { color: #60a5fa; }
        }
        @keyframes border-glow {
          0%,100% { border-color: rgba(168,85,247,0.4); box-shadow: 0 0 20px rgba(168,85,247,0.15); }
          50%      { border-color: rgba(96,165,250,0.4); box-shadow: 0 0 20px rgba(96,165,250,0.15); }
        }
      `}</style>
      <div className="cases-sel">
        <Navbar />
        <HeroSection l={l} />
        <ModelsSection l={l} />
        <ModelLineupSection l={l} />
        <ModelVideosSection l={l} />
        <ImageSection l={l} />
        <PortsSection l={l} />
        <SpecsSection
          eyebrow={l.specs_eyebrow}
          title={l.specs_title}
          col1Label={l.specs_label}
          col2Label=""
          categories={l.specs_categories}
        />
        <CTASection l={l} />
        <Footer />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   HeroSection — full-screen video background
───────────────────────────────────────────────────────────────────────── */
function HeroSection({ l }: { l: CasesTr }) {
  const isMobile = useIsMobile();

  return (
    <section style={{
      minHeight: '100vh', position: 'relative',
      display: 'flex', alignItems: 'center',
      overflow: 'hidden', background: '#000',
    }}>
      <video
        autoPlay muted loop playsInline
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', opacity: 0.5, zIndex: 0,
        }}
        src="/cases/herobackground.mp4"
      />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(135deg, rgba(0,0,0,0.88) 40%, rgba(168,85,247,0.10) 100%)',
      }} />
      <FloatingPathsBackground
        position={1}
        className="absolute inset-0 w-full h-full"
        pathClassName="opacity-20 z-[2]"
      />
      <div style={{
        position: 'relative', zIndex: 3,
        maxWidth: isMobile ? 'calc(100vw - 0px)' : 820,
        width: isMobile ? '100vw' : '100%',
        boxSizing: 'border-box' as const,
        padding: isMobile ? '120px 24px 80px' : '0 10%',
        display: 'flex', flexDirection: 'column',
      }}>
        <motion.span
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 11, fontWeight: 800, letterSpacing: '0.22em',
            textTransform: 'uppercase' as const, color: '#a855f7',
            display: 'block', marginBottom: 20,
          }}
        >{l.hero_eyebrow}</motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{
            fontSize: isMobile ? 'clamp(48px, 14vw, 84px)' : 'clamp(64px, 8.5vw, 114px)',
            fontWeight: 900, letterSpacing: '-0.06em', lineHeight: 1.0,
            color: '#fff', whiteSpace: 'pre-line', marginBottom: 28,
            animation: 'rgb-pulse 8s ease-in-out infinite',
          }}
        >{l.hero_title}</motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
          style={{
            fontSize: isMobile ? 15 : 17,
            color: 'rgba(255,255,255,0.50)', lineHeight: 1.7,
            width: '100%', maxWidth: 520, marginBottom: 48,
            overflowWrap: 'break-word' as const,
          }}
        >{l.hero_subtitle}</motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.34 }}
          style={{ display: 'flex', gap: 14, flexWrap: 'wrap' as const }}
        >
          <motion.button
            onClick={() => document.getElementById('specs')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            style={{
              background: '#a855f7', color: '#fff', padding: '14px 32px',
              borderRadius: 13, fontSize: 14, fontWeight: 700,
              border: 'none', cursor: 'pointer', letterSpacing: '-0.01em',
              boxShadow: '0 8px 32px rgba(168,85,247,0.4)',
            }}
          >{l.hero_cta_primary}</motion.button>
          <motion.button
            onClick={() => document.getElementById('specs')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            style={{
              background: 'transparent', color: 'rgba(255,255,255,0.65)',
              padding: '13px 30px', borderRadius: 13, fontSize: 14, fontWeight: 600,
              border: '1.5px solid rgba(255,255,255,0.18)', cursor: 'pointer', letterSpacing: '-0.01em',
            }}
          >{l.hero_cta_secondary}</motion.button>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   ModelCard — static image card
───────────────────────────────────────────────────────────────────────── */
function ModelCard({
  model,
  idx,
  cta,
}: {
  model: CasesTr['models'][0];
  idx: number;
  cta: string;
}) {
  const { open } = useShopModal();
  const [hovered, setHovered] = useState(false);
  const slug = model.name.toLowerCase().replace('bikon ', '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: '1 1 280px', maxWidth: 380,
        background: 'rgba(255,255,255,0.03)',
        borderRadius: 20,
        border: `1.5px solid ${hovered ? 'rgba(168,85,247,0.55)' : 'rgba(255,255,255,0.08)'}`,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.35s, box-shadow 0.35s',
        boxShadow: hovered ? '0 0 48px rgba(168,85,247,0.22)' : 'none',
        display: 'flex', flexDirection: 'column',
      }}
    >
      <div style={{ position: 'relative', aspectRatio: '4/3', background: '#080808', overflow: 'hidden' }}>
        <img
          src={`/cases/${slug}.png`}
          alt={model.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.5s ease',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
          }}
        />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
        }} />
      </div>

      <div style={{ padding: '24px 28px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <span style={{
          fontSize: 10, fontWeight: 800, letterSpacing: '0.18em',
          textTransform: 'uppercase' as const, color: '#a855f7', marginBottom: 8, display: 'block',
        }}>{model.tag}</span>
        <h3 style={{ fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', marginBottom: 12 }}>{model.name}</h3>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, marginBottom: 20, flex: 1 }}>{model.desc}</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 7 }}>
          {model.specs.map((spec, i) => (
            <li key={i} style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#a855f7', flexShrink: 0, display: 'inline-block' }} />
              {spec}
            </li>
          ))}
        </ul>
        <a
          href="javascript:void(0)"
          onClick={(e: React.MouseEvent) => { e.preventDefault(); open(model.name); }}
          style={{
            display: 'block', textAlign: 'center',
            background: hovered ? '#a855f7' : 'rgba(255,255,255,0.06)',
            color: '#fff', padding: '12px 20px',
            borderRadius: 10, fontSize: 13, fontWeight: 700,
            border: `1px solid ${hovered ? '#a855f7' : 'rgba(255,255,255,0.1)'}`,
            textDecoration: 'none',
            transition: 'background 0.35s, border-color 0.35s',
          }}
        >{cta}</a>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   ModelsSection — three case models
───────────────────────────────────────────────────────────────────────── */
function ModelsSection({ l }: { l: CasesTr }) {
  const isMobile = useIsMobile();

  return (
    <section style={{ background: '#000', padding: isMobile ? '80px 24px' : '120px 10%', position: 'relative' }}>
      <motion.span
        initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}
        style={{
          fontSize: 11, fontWeight: 800, letterSpacing: '0.22em',
          textTransform: 'uppercase' as const, color: '#a855f7',
          display: 'block', marginBottom: 16, textAlign: 'center',
        }}
      >{l.models_eyebrow}</motion.span>
      <SplitHeading
        text={l.models_title}
        style={{
          fontSize: isMobile ? 'clamp(32px,10vw,52px)' : 'clamp(40px,5.5vw,68px)',
          fontWeight: 900, letterSpacing: '-0.055em',
          color: '#fff', textAlign: 'center', marginBottom: 64,
        }}
      />
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' as const, justifyContent: 'center' }}>
        {l.models.map((model, idx) => (
          <ModelCard key={model.name} model={model} idx={idx} cta={l.models_cta} />
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   ModelLineupSection — alternating image + text rows per model
───────────────────────────────────────────────────────────────────────── */
function ModelLineupSection({ l }: { l: CasesTr }) {
  const { open } = useShopModal();
  const isMobile = useIsMobile();

  return (
    <section style={{ background: '#000' }}>
      {l.models.map((model, idx) => {
        const slug = model.name.toLowerCase().replace('bikon ', '');
        const reverse = idx % 2 === 1;

        return (
          <div
            key={model.name}
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : reverse ? 'row-reverse' : 'row',
              minHeight: isMobile ? 'auto' : '75vh',
              borderTop: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            {/* Image side */}
            <motion.div
              initial={{ opacity: 0, x: reverse ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{
                flex: isMobile ? 'none' : '0 0 58%',
                position: 'relative',
                overflow: 'hidden',
                minHeight: isMobile ? '60vw' : undefined,
                background: '#080808',
              }}
            >
              <img
                src={`/cases/${slug}line.png`}
                alt={model.name}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              {/* Subtle edge fade towards text side */}
              <div style={{
                position: 'absolute', inset: 0,
                background: reverse
                  ? 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 40%)'
                  : 'linear-gradient(to left,  rgba(0,0,0,0.55) 0%, transparent 40%)',
              }} />
            </motion.div>

            {/* Text side */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: isMobile ? '40px 24px 48px' : reverse ? '0 10% 0 6%' : '0 6% 0 10%',
                background: '#000',
              }}
            >
              <span style={{
                fontSize: 11, fontWeight: 800, letterSpacing: '0.22em',
                textTransform: 'uppercase' as const,
                color: '#a855f7', display: 'block', marginBottom: 16,
              }}>{model.tag}</span>

              <h2 style={{
                fontSize: isMobile ? 'clamp(36px,11vw,56px)' : 'clamp(40px,4.5vw,64px)',
                fontWeight: 900, letterSpacing: '-0.055em', lineHeight: 1.0,
                color: '#fff', marginBottom: 20,
              }}>{model.name}</h2>

              <p style={{
                fontSize: isMobile ? 14 : 16,
                color: 'rgba(255,255,255,0.5)', lineHeight: 1.75,
                marginBottom: 32, maxWidth: 400,
              }}>{model.desc}</p>

              <ul style={{
                listStyle: 'none', padding: 0, margin: '0 0 40px',
                display: 'flex', flexDirection: 'column', gap: 10,
              }}>
                {model.specs.map((spec, si) => (
                  <li key={si} style={{
                    fontSize: 13, color: 'rgba(255,255,255,0.65)',
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}>
                    <span style={{
                      width: 5, height: 5, borderRadius: '50%',
                      background: '#a855f7', flexShrink: 0, display: 'inline-block',
                    }} />
                    {spec}
                  </li>
                ))}
              </ul>

              <motion.a
                href="javascript:void(0)" onClick={(e: React.MouseEvent) => { e.preventDefault(); open(model.name); }}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-block', alignSelf: 'flex-start',
                  background: '#a855f7', color: '#fff',
                  padding: '13px 30px', borderRadius: 12,
                  fontSize: 13, fontWeight: 700,
                  textDecoration: 'none', letterSpacing: '-0.01em',
                  boxShadow: '0 6px 24px rgba(168,85,247,0.38)',
                }}
              >{l.models_cta}</motion.a>
            </motion.div>
          </div>
        );
      })}
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   ModelVideosSection — 3 uniquely designed video panels
───────────────────────────────────────────────────────────────────────── */
function ModelVideosSection({ l }: { l: CasesTr }) {
  const phantom = l.models[0];
  const prisma  = l.models[1];
  const compact = l.models[2];
  return (
    <section style={{ background: '#000' }}>
      <PhantomPanel model={phantom} cta={l.models_cta} />
      <PrismaPanel  model={prisma}  cta={l.models_cta} />
      <CompactPanel model={compact} cta={l.models_cta} />
    </section>
  );
}

/* ── Panel 1: Phantom — cinematic full-screen, text anchored to bottom-left ── */
function PhantomPanel({ model, cta }: { model: CasesTr['models'][0]; cta: string }) {
  const { open } = useShopModal();
  const isMobile = useIsMobile();
  return (
    <div style={{ position: 'relative', height: isMobile ? '100vw' : '100vh', overflow: 'hidden' }}>
      <video autoPlay muted loop playsInline style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: 'cover', zIndex: 0,
      }} src="/cases/phantom.mp4" />

      {/* Bottom vignette + purple glow */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 45%, transparent 100%)',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', zIndex: 1,
        background: 'radial-gradient(ellipse 60% 80% at 20% 100%, rgba(168,85,247,0.18) 0%, transparent 70%)',
      }} />

      {/* "01" watermark top-right */}
      <span style={{
        position: 'absolute', top: isMobile ? 80 : 40, right: isMobile ? 20 : 48,
        fontSize: isMobile ? 80 : 160, fontWeight: 900,
        color: 'rgba(168,85,247,0.08)', letterSpacing: '-0.07em', lineHeight: 1,
        zIndex: 2, userSelect: 'none',
      }}>01</span>

      {/* Bottom-left text */}
      <motion.div
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', bottom: 0, left: 0, zIndex: 3,
          padding: isMobile ? '0 24px 40px' : '0 8% 64px',
          maxWidth: isMobile ? '100%' : '60%',
        }}
      >
        <span style={{
          fontSize: 10, fontWeight: 800, letterSpacing: '0.22em',
          textTransform: 'uppercase' as const, color: '#a855f7',
          display: 'block', marginBottom: 12,
        }}>{model.tag}</span>
        <h2 style={{
          fontSize: isMobile ? 'clamp(52px,16vw,80px)' : 'clamp(72px,9vw,128px)',
          fontWeight: 900, letterSpacing: '-0.06em', lineHeight: 0.95,
          color: '#fff', marginBottom: 20,
        }}>{model.name}</h2>
        <p style={{
          fontSize: isMobile ? 13 : 15,
          color: 'rgba(255,255,255,0.5)', lineHeight: 1.7,
          marginBottom: 28, maxWidth: 480,
        }}>{model.desc}</p>
        {/* Specs as inline chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8, marginBottom: 32 }}>
          {model.specs.map((s, i) => (
            <span key={i} style={{
              fontSize: 11, fontWeight: 700,
              color: 'rgba(255,255,255,0.7)',
              background: 'rgba(168,85,247,0.15)',
              border: '1px solid rgba(168,85,247,0.3)',
              padding: '5px 12px', borderRadius: 20,
            }}>{s}</span>
          ))}
        </div>
        <motion.a href="javascript:void(0)" onClick={(e: React.MouseEvent) => { e.preventDefault(); open(model.name); }}
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          style={{
            display: 'inline-block', background: '#a855f7', color: '#fff',
            padding: '13px 32px', borderRadius: 12, fontSize: 13, fontWeight: 700,
            textDecoration: 'none', letterSpacing: '-0.01em',
            boxShadow: '0 6px 28px rgba(168,85,247,0.45)',
          }}
        >{cta}</motion.a>
      </motion.div>
    </div>
  );
}

/* ── Panel 2: Prisma — split layout, video right, dark panel left with spec grid ── */
function PrismaPanel({ model, cta }: { model: CasesTr['models'][0]; cta: string }) {
  const { open } = useShopModal();
  const isMobile = useIsMobile();
  return (
    <div style={{
      display: 'flex', flexDirection: isMobile ? 'column' : 'row',
      minHeight: isMobile ? 'auto' : '100vh', background: '#000',
    }}>
      {/* Left: dark info panel */}
      <motion.div
        initial={{ opacity: 0, x: -48 }} whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
        style={{
          flex: isMobile ? 'none' : '0 0 42%',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: isMobile ? '48px 24px' : '0 6% 0 8%',
          background: 'linear-gradient(135deg, #05051a 0%, #000 60%)',
          borderRight: isMobile ? 'none' : '1px solid rgba(59,130,246,0.15)',
          position: 'relative', zIndex: 1,
        }}
      >
        {/* "02" watermark */}
        <span style={{
          fontSize: isMobile ? 64 : 110, fontWeight: 900,
          color: 'rgba(59,130,246,0.06)', letterSpacing: '-0.07em', lineHeight: 1,
          display: 'block', marginBottom: isMobile ? 12 : 20,
        }}>02</span>

        <span style={{
          fontSize: 10, fontWeight: 800, letterSpacing: '0.22em',
          textTransform: 'uppercase' as const, color: '#3b82f6',
          display: 'block', marginBottom: 12,
        }}>{model.tag}</span>
        <h2 style={{
          fontSize: isMobile ? 'clamp(36px,11vw,52px)' : 'clamp(44px,4.8vw,68px)',
          fontWeight: 900, letterSpacing: '-0.055em', lineHeight: 1.0,
          color: '#fff', marginBottom: 18,
        }}>{model.name}</h2>
        <p style={{
          fontSize: isMobile ? 13 : 15, color: 'rgba(255,255,255,0.45)',
          lineHeight: 1.75, marginBottom: 32, maxWidth: 360,
        }}>{model.desc}</p>

        {/* Specs as 2×2 grid cards */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 10, marginBottom: 36,
        }}>
          {model.specs.map((s, i) => (
            <div key={i} style={{
              background: 'rgba(59,130,246,0.07)',
              border: '1px solid rgba(59,130,246,0.2)',
              borderRadius: 10, padding: '12px 14px',
            }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#93c5fd', lineHeight: 1.4, display: 'block' }}>{s}</span>
            </div>
          ))}
        </div>

        <motion.a href="javascript:void(0)" onClick={(e: React.MouseEvent) => { e.preventDefault(); open(model.name); }}
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          style={{
            display: 'inline-block', alignSelf: 'flex-start',
            background: '#3b82f6', color: '#fff',
            padding: '13px 30px', borderRadius: 12, fontSize: 13, fontWeight: 700,
            textDecoration: 'none', letterSpacing: '-0.01em',
            boxShadow: '0 6px 28px rgba(59,130,246,0.4)',
          }}
        >{cta}</motion.a>
      </motion.div>

      {/* Right: video */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }} whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          flex: 1, position: 'relative', overflow: 'hidden',
          minHeight: isMobile ? '65vw' : undefined,
        }}
      >
        <video autoPlay muted loop playsInline style={{
          width: '100%', height: '100%', objectFit: 'cover', display: 'block',
        }} src="/cases/prisma.mp4" />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(5,5,26,0.6) 0%, transparent 40%)',
        }} />
      </motion.div>
    </div>
  );
}

/* ── Panel 3: Compact — video left, minimal text top-right, spec badges row ── */
function CompactPanel({ model, cta }: { model: CasesTr['models'][0]; cta: string }) {
  const { open } = useShopModal();
  const isMobile = useIsMobile();
  return (
    <div style={{
      display: 'flex', flexDirection: isMobile ? 'column-reverse' : 'row',
      minHeight: isMobile ? 'auto' : '88vh', background: '#000',
      borderTop: '1px solid rgba(16,185,129,0.1)',
    }}>
      {/* Left: video */}
      <motion.div
        initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }} transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        style={{
          flex: isMobile ? 'none' : '0 0 55%', position: 'relative',
          overflow: 'hidden', minHeight: isMobile ? '60vw' : undefined,
        }}
      >
        <video autoPlay muted loop playsInline style={{
          width: '100%', height: '100%', objectFit: 'cover', display: 'block',
        }} src="/cases/compact.mp4" />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to left, rgba(0,0,0,0.5) 0%, transparent 50%)',
        }} />
      </motion.div>

      {/* Right: text — anchored to top */}
      <motion.div
        initial={{ opacity: 0, y: -32 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          justifyContent: isMobile ? 'center' : 'flex-start',
          padding: isMobile ? '40px 24px 48px' : '72px 8% 0 6%',
        }}
      >
        {/* "03" top accent */}
        <span style={{
          fontSize: isMobile ? 56 : 96, fontWeight: 900,
          color: 'rgba(16,185,129,0.08)', letterSpacing: '-0.07em', lineHeight: 1,
          display: 'block', marginBottom: isMobile ? 12 : 16,
        }}>03</span>

        <span style={{
          fontSize: 10, fontWeight: 800, letterSpacing: '0.22em',
          textTransform: 'uppercase' as const, color: '#10b981',
          display: 'block', marginBottom: 12,
        }}>{model.tag}</span>
        <h2 style={{
          fontSize: isMobile ? 'clamp(34px,10vw,50px)' : 'clamp(40px,4.2vw,60px)',
          fontWeight: 900, letterSpacing: '-0.055em', lineHeight: 1.0,
          color: '#fff', marginBottom: 16,
        }}>{model.name}</h2>
        <p style={{
          fontSize: isMobile ? 13 : 15, color: 'rgba(255,255,255,0.45)',
          lineHeight: 1.75, marginBottom: 28, maxWidth: 340,
        }}>{model.desc}</p>

        {/* Specs as vertical list with teal accent */}
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 36px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {model.specs.map((s, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{
                width: 24, height: 24, borderRadius: 6,
                background: 'rgba(16,185,129,0.12)',
                border: '1px solid rgba(16,185,129,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'block' }} />
              </span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>{s}</span>
            </li>
          ))}
        </ul>

        <motion.a href="javascript:void(0)" onClick={(e: React.MouseEvent) => { e.preventDefault(); open(model.name); }}
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          style={{
            display: 'inline-block', alignSelf: 'flex-start',
            background: 'transparent', color: '#10b981',
            padding: '12px 28px', borderRadius: 12, fontSize: 13, fontWeight: 700,
            textDecoration: 'none', letterSpacing: '-0.01em',
            border: '1.5px solid #10b981',
          }}
        >{cta}</motion.a>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   ImageSection — full-bleed showcase image
───────────────────────────────────────────────────────────────────────── */
function ImageSection({ l }: { l: CasesTr }) {
  const isMobile = useIsMobile();

  return (
    <section style={{
      position: 'relative',
      minHeight: isMobile ? '70vw' : '75vh',
      overflow: 'hidden',
      display: 'flex', alignItems: 'flex-end',
    }}>
      <img
        src="/cases/imagesection.png"
        alt="Bikon Cases"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.35) 50%, transparent 100%)',
      }} />
      <div style={{
        position: 'relative', zIndex: 2,
        padding: isMobile ? '40px 24px 48px' : '80px 10%',
        maxWidth: 740,
      }}>
        <motion.span
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{
            fontSize: 11, fontWeight: 800, letterSpacing: '0.22em',
            textTransform: 'uppercase' as const, color: '#a855f7',
            display: 'block', marginBottom: 16,
          }}
        >{l.image_eyebrow}</motion.span>
        <SplitHeading
          text={l.image_title}
          style={{
            fontSize: isMobile ? 'clamp(30px,10vw,56px)' : 'clamp(38px,5.2vw,72px)',
            fontWeight: 900, letterSpacing: '-0.055em',
            color: '#fff', marginBottom: 20,
          }}
        />
        <motion.p
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
          style={{ fontSize: isMobile ? 14 : 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, maxWidth: 540 }}
        >{l.image_body}</motion.p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   PortsSection — front I/O port grid
───────────────────────────────────────────────────────────────────────── */
const PORTS = [
  { icon: '/icons/hdmi.png', label: 'HDMI'       },
  { icon: '/icons/vga.png',  label: 'VGA'        },
  { icon: '/icons/usb.png',  label: 'USB 2.0'    },
  { icon: '/icons/usb.png',  label: 'USB 2.0'    },
  { icon: '/icons/aux.png',  label: 'Audio In'   },
  { icon: '/icons/aux.png',  label: 'Audio Out'  },
];

function PortsSection({ l }: { l: CasesTr }) {
  const isMobile = useIsMobile();

  return (
    <section style={{
      background: '#0a0a0f',
      backgroundImage: [
        'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(168,85,247,0.08) 0%, transparent 70%)',
        'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)',
        'linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
      ].join(', '),
      backgroundSize: 'auto, 80px 80px, 80px 80px',
      padding: isMobile ? '80px 24px' : '120px 10%',
      position: 'relative', overflow: 'hidden',
    }}>
      <FloatingPathsBackground
        position={2}
        className="absolute inset-0 w-full h-full z-0"
        pathClassName="opacity-15"
      />
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 680, margin: '0 auto 64px' }}>
        <motion.span
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{
            fontSize: 11, fontWeight: 800, letterSpacing: '0.22em',
            textTransform: 'uppercase' as const, color: '#a855f7',
            display: 'block', marginBottom: 16,
          }}
        >{l.ports_eyebrow}</motion.span>
        <SplitHeading
          text={l.ports_title}
          style={{
            fontSize: isMobile ? 'clamp(30px,10vw,52px)' : 'clamp(36px,5vw,64px)',
            fontWeight: 900, letterSpacing: '-0.055em',
            color: '#fff', marginBottom: 20,
          }}
        />
        <motion.p
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
          style={{ fontSize: isMobile ? 14 : 16, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}
        >{l.ports_body}</motion.p>
      </div>

      <div style={{
        position: 'relative', zIndex: 1,
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(6, 1fr)',
        gap: 14, maxWidth: 900, margin: '0 auto',
      }}>
        {PORTS.map((port, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16,
              padding: isMobile ? '16px 8px' : '22px 12px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
              textAlign: 'center',
            }}
          >
            <img
              src={port.icon}
              alt={port.label}
              style={{
                width: isMobile ? 28 : 36, height: isMobile ? 28 : 36,
                objectFit: 'contain', filter: 'invert(1) opacity(0.75)',
              }}
            />
            <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.04em' }}>{port.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   CTASection — final call to action
───────────────────────────────────────────────────────────────────────── */
function CTASection({ l }: { l: CasesTr }) {
  const { open } = useShopModal();
  const isMobile = useIsMobile();

  return (
    <section style={{
      background: '#000',
      padding: isMobile ? '80px 24px' : '130px 10%',
      textAlign: 'center', position: 'relative', overflow: 'hidden',
    }}>
      <FloatingPathsBackground
        position={1}
        className="absolute inset-0 w-full h-full z-0"
        pathClassName="opacity-25"
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <SplitHeading
          text={l.cta_title}
          style={{
            fontSize: isMobile ? 'clamp(36px,12vw,64px)' : 'clamp(44px,6.5vw,88px)',
            fontWeight: 900, letterSpacing: '-0.055em',
            color: '#fff', marginBottom: 24,
          }}
        />
        <motion.p
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
          style={{ fontSize: isMobile ? 15 : 17, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: 520, margin: '0 auto 48px' }}
        >{l.cta_body}</motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.35 }}
          style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' as const }}
        >
          <motion.a
            href="javascript:void(0)" onClick={(e: React.MouseEvent) => { e.preventDefault(); open('Bikon PHANTOM Series'); }}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-block', background: '#a855f7', color: '#fff',
              padding: '14px 36px', borderRadius: 13, fontSize: 14, fontWeight: 700,
              textDecoration: 'none', letterSpacing: '-0.01em',
              boxShadow: '0 8px 32px rgba(168,85,247,0.4)',
            }}
          >{l.cta_shop}</motion.a>
          <motion.a
            href="/Bikon.pdf" target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-block',
              background: 'transparent', color: 'rgba(255,255,255,0.65)',
              padding: '13px 34px', borderRadius: 13, fontSize: 14, fontWeight: 600,
              border: '1.5px solid rgba(255,255,255,0.18)', textDecoration: 'none', letterSpacing: '-0.01em',
            }}
          >{l.cta_catalog}</motion.a>
        </motion.div>
      </div>
    </section>
  );
}
