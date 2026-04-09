import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence, MotionValue, useTransform, useSpring } from 'motion/react';

// ─── Config ───────────────────────────────────────────────────────────────────
const TOTAL_FRAMES = 210;
const BATCH_SIZE   = 8;

function frameSrc(i: number): string {
  return `/sequence/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`;
}

interface LaptopScrollProps {
  scrollProgress: MotionValue<number>;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function LaptopScroll({ scrollProgress }: LaptopScrollProps) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const ctxRef       = useRef<CanvasRenderingContext2D | null>(null);
  const dprRef       = useRef(1);
  const framesRef    = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const curIdxRef    = useRef(0);
  const rafRef       = useRef<number>(0);

  const [loadedCount,   setLoadedCount]   = useState(0);
  const [sequenceReady, setSequenceReady] = useState(false);
  const [showFallback,  setShowFallback]  = useState(false);   // true only if /sequence/ missing

  // ── Spring → smooth frame index ──────────────────────────────────────────
  const springProgress = useSpring(scrollProgress, { stiffness: 100, damping: 40, restDelta: 0.0005 });
  const frameMotion    = useTransform(springProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  // ── Canvas: HiDPI setup ───────────────────────────────────────────────────
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    dprRef.current = dpr;

    // Physical pixel resolution
    canvas.width  = Math.round(rect.width  * dpr);
    canvas.height = Math.round(rect.height * dpr);

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctxRef.current = ctx;

    // White fill initial state
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, rect.width, rect.height);

    drawFrame(curIdxRef.current);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setupCanvas();
    const ro = new ResizeObserver(setupCanvas);
    ro.observe(canvas);
    return () => { ro.disconnect(); ctxRef.current = null; };
  }, [setupCanvas]);

  // ── Draw one frame (CSS-pixel coordinates; ctx matrix handles DPR) ────────
  const drawFrame = useCallback((rawIdx: number) => {
    const canvas = canvasRef.current;
    const ctx    = ctxRef.current;
    if (!canvas || !ctx) return;

    const idx = Math.round(Math.min(Math.max(rawIdx, 0), TOTAL_FRAMES - 1));
    const img  = framesRef.current[idx];
    if (!img?.complete || img.naturalWidth === 0) return;

    const dpr  = dprRef.current;
    const cssW = canvas.width  / dpr;
    const cssH = canvas.height / dpr;

    // High-quality smoothing on every draw
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // "Contain + 15% padding" — laptop always fully visible
    const FILL_FACTOR  = 0.85;
    const scale        = Math.min(cssW / img.naturalWidth, cssH / img.naturalHeight) * FILL_FACTOR;
    const drawW        = img.naturalWidth  * scale;
    const drawH        = img.naturalHeight * scale;
    const drawX        = (cssW - drawW) / 2;
    const drawY        = (cssH - drawH) / 2;

    ctx.clearRect(0, 0, cssW, cssH);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, cssW, cssH);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);

    curIdxRef.current = idx;
  }, []);

  // ── Subscribe to spring frame value ──────────────────────────────────────
  useEffect(() => {
    const unsub = frameMotion.on('change', (v) => {
      if (sequenceReady) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => drawFrame(v));
      }
    });
    return () => { unsub(); cancelAnimationFrame(rafRef.current); };
  }, [frameMotion, sequenceReady, drawFrame]);

  // ── Load all frames in batches ────────────────────────────────────────────
  useEffect(() => {
    let mounted = true;
    let total   = 0;

    const loadOne = (i: number) =>
      new Promise<void>((resolve) => {
        const img  = new Image();
        img.decoding = 'async';
        const done = () => {
          total++;
          setLoadedCount(total);
          if (total === TOTAL_FRAMES && mounted) setSequenceReady(true);
          resolve();
        };
        img.onload  = () => { if (mounted) framesRef.current[i] = img; done(); };
        img.onerror = () => done();
        img.src     = frameSrc(i);
      });

    const run = async () => {
      // Probe frame 0 to confirm sequence exists
      const probe = new Image();
      const exists = await new Promise<boolean>((res) => {
        probe.onload  = () => res(true);
        probe.onerror = () => res(false);
        probe.src     = frameSrc(0);
      });

      if (!mounted) return;
      if (!exists) { setShowFallback(true); return; }

      // Load in batches — draw first frame immediately
      for (let i = 0; i < TOTAL_FRAMES && mounted; i += BATCH_SIZE) {
        await Promise.all(
          Array.from({ length: Math.min(BATCH_SIZE, TOTAL_FRAMES - i) }, (_, j) => loadOne(i + j))
        );
        if (i === 0 && mounted) drawFrame(0);
      }
    };

    run();

    return () => {
      mounted = false;
      framesRef.current.forEach((img) => { if (img) img.src = ''; });
      framesRef.current = new Array(TOTAL_FRAMES).fill(null);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Draw first frame once everything is ready
  useEffect(() => {
    if (sequenceReady) drawFrame(curIdxRef.current);
  }, [sequenceReady, drawFrame]);

  const loadProgress = loadedCount / TOTAL_FRAMES;

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="relative w-full h-full">

      {/* ── Fallback static image (if /sequence/ folder is missing) ──────── */}
      {showFallback && (
        <motion.img
          src="laptop.png"
          alt="Bikon Laptop"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="absolute inset-0 w-full h-full object-contain p-10"
        />
      )}

      {/* ── Canvas ───────────────────────────────────────────────────────── */}
      {!showFallback && (
        <motion.canvas
          ref={canvasRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: sequenceReady ? 1 : 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            display:    'block',
            width:      '100%',
            height:     '100%',
            background: '#FFFFFF',
          }}
        />
      )}

      {/* ── Loading progress bar ─────────────────────────────────────────── */}
      <AnimatePresence>
        {!sequenceReady && !showFallback && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white"
          >
            {/* Laptop silhouette placeholder */}
            <div className="w-48 h-32 rounded-2xl bg-[#F5F5F7] mb-8 flex items-center justify-center">
              <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
                <rect x="8" y="4" width="64" height="42" rx="4" fill="#E5E5EA"/>
                <rect x="12" y="8" width="56" height="34" rx="2" fill="#D1D1D6"/>
                <rect x="2" y="46" width="76" height="8" rx="4" fill="#E5E5EA"/>
                <rect x="28" y="46" width="24" height="3" rx="1.5" fill="#C7C7CC"/>
              </svg>
            </div>
            <div className="relative w-40 h-[1px] bg-[#EBEBEB] overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[#0066CC]"
                animate={{ width: `${loadProgress * 100}%` }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
              />
            </div>
            <span className="mt-4 font-mono text-[9px] uppercase tracking-[0.3em] text-[#AAAAAA]">
              {Math.round(loadProgress * 100)}%
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
