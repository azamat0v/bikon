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
import CatalogSection from './components/CatalogSection';
import { LenisContext } from './context/LenisContext';
import { LanguageProvider } from './context/LanguageContext';
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
  Zap
} from 'lucide-react';

const products: ProductProps[] = [
  {
    id: "noutbuklar",
    title: "Laptops",
    description: "Bikon SMARTBOOK — light, fast, and reliable. Ready for any task with a long-lasting battery that keeps up with your day.",
    features: [
      { icon: Monitor, text: '15.6" Full HD IPS Display' },
      { icon: Cpu, text: "Intel Celeron N5095 Processor" },
      { icon: HardDrive, text: "8GB DDR4 / 256GB SSD" },
      { icon: Wifi, text: "Wi-Fi, Bluetooth, USB-C" },
    ],
    image: "laptop.png"
  },
  {
    id: "monobloklar",
    title: "Monoblocks",
    description: "Bikon MATRIX — the modern workstation solution. 12th–14th Gen Intel processors with a wide display for peak productivity.",
    features: [
      { icon: Tv, text: '24" / 27" Full HD IPS Screen' },
      { icon: Cpu, text: "12–14th Gen Intel Core i5/i7" },
      { icon: MemoryStick, text: "DDR4 8GB → 32GB RAM" },
      { icon: CircuitBoard, text: "H610 / B760 LGA1700 Motherboard" },
    ],
    image: "monoblock.png",
    reverse: true
  },
  {
    id: "pc",
    title: "Cases",
    description: "Bikon PHANTOM — built for powerful gaming and professional work. 12th–14th Gen Intel with DDR5 support for uncompromising performance.",
    features: [
      { icon: Cpu, text: "12–14th Gen Intel Core i5/i7/i9" },
      { icon: Thermometer, text: "Liquid Cooling System" },
      { icon: Lightbulb, text: "RGB Lighting System" },
      { icon: HardDrive, text: "DDR4/DDR5, NVMe SSD" },
    ],
    image: "pc.png"
  },
  {
    id: "monitorlar",
    title: "Monitors",
    description: "Bikon VISION PRO — 27-inch 100Hz IPS panel. Precise, vivid imagery for designers and professionals who demand the best.",
    features: [
      { icon: Zap, text: "100Hz Refresh Rate" },
      { icon: Monitor, text: "Full HD 1920×1080 IPS" },
      { icon: Cable, text: "HDMI / VGA / DisplayPort" },
      { icon: Timer, text: "0.5ms–1ms Response Time" },
    ],
    image: "monitor.png",
    reverse: true
  }
];

export default function App() {
  const [lenis, setLenis]       = useState<Lenis | null>(null);
  const [loaderDone, setLoaderDone] = useState(false);
  const rafId = useRef<number>(0);

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
    <LanguageProvider>
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
          <CatalogSection />
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
    </LanguageProvider>
  );
}
