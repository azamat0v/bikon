import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, animate } from 'motion/react';

const SESSION_KEY = 'bikon_intro_shown';

interface PageLoaderProps {
  /** Called once the exit animation fully completes */
  onDone: () => void;
}

export default function PageLoader({ onDone }: PageLoaderProps) {
  /* ── Skip if already shown this session ────────────────────────────────── */
  const alreadySeen = false; // TEMP: always show — sessionStorage.getItem(SESSION_KEY) === '1';

  const [visible, setVisible]     = useState(!alreadySeen);
  const [exiting, setExiting]     = useState(false);
  const [progress, setProgress]   = useState(0);
  const [logoReady, setLogoReady] = useState(false);

  const doneCalledRef = useRef(false);

  /* ── If already seen, bail immediately ─────────────────────────────────── */
  useEffect(() => {
    if (alreadySeen) { onDone(); return; }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Body scroll lock while loader is active ───────────────────────────── */
  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [visible]);

  /* ── Progress bar + page-load detection ────────────────────────────────── */
  useEffect(() => {
    if (!visible) return;

    // Phase 1 — rush to 65% in 400ms
    const phase1 = setTimeout(() => {
      setProgress(65);
    }, 80);

    // Logo entrance after a brief moment
    const logoTimer = setTimeout(() => setLogoReady(true), 200);

    // Phase 2 — finish to 100% on window load (or after max 2.5s)
    const finish = () => {
      setProgress(100);
      // Small delay so the bar visually hits 100 before slide-up
      setTimeout(startExit, 320);
    };

    let fallback: ReturnType<typeof setTimeout>;

    if (document.readyState === 'complete') {
      fallback = setTimeout(finish, 500);
    } else {
      window.addEventListener('load', finish, { once: true });
      fallback = setTimeout(finish, 2800); // max wait
    }

    return () => {
      clearTimeout(phase1);
      clearTimeout(logoTimer);
      clearTimeout(fallback);
      window.removeEventListener('load', finish);
    };
  }, [visible]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Kick off the exit curtain ─────────────────────────────────────────── */
  const startExit = () => setExiting(true);

  /* ── Called when exit animation finishes ───────────────────────────────── */
  const handleExitComplete = () => {
    if (doneCalledRef.current) return;
    doneCalledRef.current = true;
    sessionStorage.setItem(SESSION_KEY, '1');
    setVisible(false);
    onDone();
  };

  if (!visible) return null;

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!exiting && (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
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
          {/* ── Progress bar ─────────────────────────────────────── */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: 'rgba(0,113,227,0.12)',
            }}
          >
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #0071E3, #60a5fa)',
                borderRadius: '0 2px 2px 0',
                willChange: 'width',
              }}
            />
          </div>

          {/* ── Logo ─────────────────────────────────────────────── */}
          <AnimatePresence>
            {logoReady && (
              <motion.div
                key="logo"
                initial={{ opacity: 0, scale: 0.88, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}
              >
                {/* Clip wrapper compensates for SVG 2000×2000 viewBox whitespace */}
                <motion.div
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
                  style={{
                    height: 72,
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
                    style={{
                      height: 188,
                      width: 'auto',
                      display: 'block',
                      flexShrink: 0,
                    }}
                  />
                </motion.div>

                {/* Subtle tagline */}
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: '#AAAAAA',
                    fontFamily: '"Inter", var(--font-sans), sans-serif',
                  }}
                >
                  Engineered for the Future
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Bottom percentage counter ─────────────────────────── */}
          <motion.span
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
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Animated counter ────────────────────────────────────────────────────── */
function ProgressCounter({ target }: { target: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(display, target, {
      duration: 0.5,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [target]); // eslint-disable-line react-hooks/exhaustive-deps

  return <>{display}%</>;
}
