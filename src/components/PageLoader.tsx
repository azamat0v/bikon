import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { animate } from 'motion/react';

const SESSION_KEY = 'bikon_intro_shown';

interface PageLoaderProps {
  onDone: () => void;
}

export default function PageLoader({ onDone }: PageLoaderProps) {
  const alreadySeen = sessionStorage.getItem(SESSION_KEY) === '1';

  const [visible,   setVisible]   = useState(!alreadySeen);
  const [progress,  setProgress]  = useState(0);
  const [logoIn,    setLogoIn]    = useState(false);

  const overlayRef  = useRef<HTMLDivElement>(null);
  const logoRef     = useRef<HTMLDivElement>(null);
  const breathRef   = useRef<gsap.core.Tween | null>(null);
  const doneRef     = useRef(false);

  /* Bail immediately for return visits */
  useEffect(() => {
    if (alreadySeen) { onDone(); }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* Body scroll lock */
  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [visible]);

  /* Logo entrance + breathing pulse (GSAP) */
  useEffect(() => {
    if (!visible || !logoIn || !logoRef.current) return;

    // Entrance: fade + scale up from slightly small
    gsap.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.82, y: 18 },
      { opacity: 1, scale: 1, y: 0, duration: 0.65, ease: 'power3.out' }
    );

    // Breathing pulse: subtle scale oscillation while loading
    breathRef.current = gsap.to(logoRef.current, {
      scale: 1.055,
      duration: 1.7,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 0.65,
    });

    return () => { breathRef.current?.kill(); };
  }, [logoIn]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Progress + page-load detection */
  useEffect(() => {
    if (!visible) return;

    const t0 = setTimeout(() => setLogoIn(true), 160);
    const t1 = setTimeout(() => setProgress(60),  100);

    const finish = () => {
      if (doneRef.current) return;
      setProgress(100);

      setTimeout(() => {
        if (!overlayRef.current || !logoRef.current) {
          // Fallback if refs not ready
          setVisible(false);
          return;
        }

        /* Stop breathing */
        breathRef.current?.kill();

        /* GSAP exit: logo scales down + fades, then overlay fades out */
        const tl = gsap.timeline({
          onComplete: () => {
            doneRef.current = true;
            sessionStorage.setItem(SESSION_KEY, '1');
            onDone();
          },
        });

        tl.to(logoRef.current, {
          scale: 0.78,
          opacity: 0,
          duration: 0.55,
          ease: 'power4.inOut',
        }).to(
          overlayRef.current,
          {
            opacity: 0,
            duration: 0.45,
            ease: 'power4.inOut',
          },
          '-=0.18'
        );
      }, 420);
    };

    let fallback: ReturnType<typeof setTimeout>;
    if (document.readyState === 'complete') {
      fallback = setTimeout(finish, 600);
    } else {
      window.addEventListener('load', finish, { once: true });
      fallback = setTimeout(finish, 3000);
    }

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(fallback);
      window.removeEventListener('load', finish);
    };
  }, [visible]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* ── Progress bar ─────────────────────────────────────────── */}
      <ProgressBar progress={progress} />

      {/* ── Logo + tagline ───────────────────────────────────────── */}
      {logoIn && (
        <div
          ref={logoRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 30,
            /* Initial state set by GSAP fromTo — keep opacity 0 here
               so there's no flash before the animation fires */
            opacity: 0,
          }}
        >
          {/* Clip wrapper: compensates for SVG 2000×2000 whitespace.
              Logo scaled up ~25% vs. original (72 → 90 clip / 188 → 235 img) */}
          <div
            style={{
              height: 90,
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src="/bikon.svg"
              alt="Bikon"
              draggable={false}
              style={{ height: 235, width: 'auto', display: 'block', flexShrink: 0 }}
            />
          </div>

          {/* Tagline */}
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#BBBBBB',
              fontFamily: '"Inter", var(--font-sans), sans-serif',
              margin: 0,
            }}
          >
            Engineered for the Future
          </p>
        </div>
      )}

      {/* ── Percentage counter ───────────────────────────────────── */}
      <span
        style={{
          position: 'absolute',
          bottom: 40,
          right: 48,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.06em',
          color: '#CCCCCC',
          fontFamily: '"Inter", var(--font-sans), sans-serif',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        <ProgressCounter target={progress} />
      </span>
    </div>
  );
}

/* ── Progress bar (pure CSS-driven via inline style) ─────────────────────── */
function ProgressBar({ progress }: { progress: number }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: 'rgba(0,113,227,0.10)',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #0071E3, #60a5fa)',
          borderRadius: '0 2px 2px 0',
          transition: 'width 0.55s cubic-bezier(0.16,1,0.3,1)',
        }}
      />
    </div>
  );
}

/* ── Smooth animated counter ─────────────────────────────────────────────── */
function ProgressCounter({ target }: { target: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const ctrl = animate(display, target, {
      duration: 0.5,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return ctrl.stop;
  }, [target]); // eslint-disable-line react-hooks/exhaustive-deps

  return <>{display}%</>;
}
