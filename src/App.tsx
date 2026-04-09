import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import ProductSection, { ProductProps } from './components/ProductSection';
import TrustSection from './components/TrustSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';
import { LenisContext } from './context/LenisContext';
import { LanguageProvider, useLang } from './context/LanguageContext';
import {
  Monitor,
  Cpu,
  HardDrive,
  Wifi,
  Tv,
  MemoryStick,
  CircuitBoard,
  Thermometer,
  Lightbulb,
  Cable,
  Timer,
  Zap,
} from 'lucide-react';

/* ── Static: icon + asset data that never changes with language ─────────── */
const BASE_PRODUCTS = [
  {
    id: 'noutbuklar',
    features: [
      { icon: Monitor,   text: '15.6" Full HD IPS Display'         },
      { icon: Cpu,       text: 'Intel Celeron N4000 / N5095'        },
      { icon: HardDrive, text: '8GB DDR4 / 256GB SSD'               },
      { icon: Wifi,      text: 'Built-in WebCam · Wi-Fi · BT'       },
    ],
    image: 'laptop.png',
    reverse: false,
  },
  {
    id: 'monobloklar',
    features: [
      { icon: Tv,           text: '24" / 27" Full HD IPS Screen'        },
      { icon: Cpu,          text: 'Intel Core i3/i5/i7 (12–14th Gen)'   },
      { icon: MemoryStick,  text: '4GB–16GB RAM / 128GB–1TB NVMe'        },
      { icon: CircuitBoard, text: 'Built-in Stereo Speakers'             },
    ],
    image: 'monoblock.png',
    reverse: true,
  },
  {
    id: 'pc',
    features: [
      { icon: HardDrive,   text: 'Tempered Glass & Metal Build'   },
      { icon: Lightbulb,   text: 'RGB Support (Phantom series)'   },
      { icon: Thermometer, text: 'Air / Liquid Cooling Support'   },
      { icon: Wifi,        text: 'Optimized Airflow Design'       },
    ],
    image: 'pc.png',
    reverse: false,
  },
  {
    id: 'monitorlar',
    features: [
      { icon: Monitor, text: '22" / 24" / 27" IPS Display'       },
      { icon: Zap,     text: '75Hz Refresh Rate'                  },
      { icon: Cable,   text: 'HDMI / VGA / AUX'                   },
      { icon: Timer,   text: '5ms Response Time'                  },
    ],
    image: 'monitor.png',
    reverse: true,
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   AppContent — lives INSIDE LanguageProvider so useLang() works correctly
───────────────────────────────────────────────────────────────────────── */
function AppContent() {
  const { tr } = useLang();                    // ✅ reads live context
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [loaderDone, setLoaderDone] = useState(false);
  const rafId = useRef<number>(0);

  /* Build translated products on every language-switch render */
  const products: ProductProps[] = BASE_PRODUCTS.map((base, i) => ({
    ...base,
    title: tr.products.data[i].title,
    description: tr.products.data[i].description,
  }));

  /* Lenis smooth-scroll setup */
  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    setLenis(lenisInstance);

    function raf(time: number) {
      lenisInstance.raf(time);
      rafId.current = requestAnimationFrame(raf);
    }
    rafId.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId.current);
      lenisInstance.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {/* Intro preloader — sits above everything, self-removes after reveal */}
      <PageLoader onDone={() => setLoaderDone(true)} />

      <div
        className="min-h-screen selection:bg-black selection:text-white"
        style={{ opacity: loaderDone ? 1 : 0, transition: 'opacity 0.3s ease' }}
      >
        <Navbar />
        <main>
          <Hero />
          <CategoryGrid />
          <TrustSection />
          {products.map((product) => (
            <ProductSection
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              features={product.features}
              image={product.image}
              reverse={product.reverse}
            />
          ))}
          <CTASection />
        </main>
        <Footer />
      </div>
    </LenisContext.Provider>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   App — just provides the language context, nothing else
───────────────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
