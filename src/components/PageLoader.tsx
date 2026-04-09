import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, animate } from 'motion/react';

const SESSION_KEY = 'bikon_intro_shown';

interface PageLoaderProps {
  onDone: () => void;
}

export default function PageLoader({ onDone }: PageLoaderProps) {
  /* ── Skip on return visits (currently forced to show always for testing) ── */
  const alreadySeen = sessionStorage.getItem(SESSION_KEY) === '1';

  /* visible = the overlay is mounted in the DOM */
  const [visible,  setVisible]  = useState(!alreadySeen);
  const [progress, setProgress] = useState(0);
  const [logoIn,   setLogoIn]   = useState(false);

  const doneRef = useRef(false);

  /* Bail immediately if already seen */
  useEffect(() => {
    if (alreadySeen) { onDone(); }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* Body scroll lock */
  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [visible]);

  /* Progress + page-load detection */
  useEffect(() => {
    if (!visible) return;

    // Logo fades in almost immediately
    const t0 = setTimeout(() => setLogoIn(true), 180);

    // Rush to 60% right away
    const t1 = setTimeout(() => setProgress(60), 100);

    const finish = () => {
      setProgress(100);
      // Give the bar a moment to visually reach 100 %
      setTimeout(() => {
        // unmount triggers the exit animation via AnimatePresence
        setVisible(false);
      }, 420);
    };

    let fallback: ReturnType<typeof setTimeout>;
    if (document.readyState === 'complete') {
      fallback = setTimeout(finish, 600);
    } else {
      window.addEventListener('load', finish, { once: true });
      fallback = setTimeout(finish, 3000); // hard cap
    }

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(fallback);
      window.removeEventListener('load', finish);
    };
  }, [visible]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Called after the curtain slides fully off-screen */
  const handleExitComplete = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    sessionStorage.setItem(SESSION_KEY, '1');
    onDone();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          key="page-loader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
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

          {/* ── Logo ─────────────────────────────────────────────────── */}
          <AnimatePresence>
            {logoIn && (
              <motion.div
                key="logo-block"
                initial={{ opacity: 0, scale: 0.88, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}
              >
                {/* Pulse wrapper — clip compensates for SVG 2000×2000 whitespace */}
                <motion.div
                  animate={{ opacity: [1, 0.65, 1] }}
                  transition={{
                    duration: 1.9,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    repeatType: 'mirror',
                  }}
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
                    style={{ height: 188, width: 'auto', display: 'block', flexShrink: 0 }}
                  />
                </motion.div>

                {/* Tagline */}
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.22 }}
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: '#BBBBBB',
                    fontFamily: '"Inter", var(--font-sans), sans-serif',
                  }}
                >
                  Engineered for the Future
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

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
        </motion.div>
      )}
    </AnimatePresence>
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
