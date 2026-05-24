import { lazy, Suspense, useEffect, useRef, useState, useCallback } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import ProductSection, { ProductProps } from './components/ProductSection';
import TrustSection from './components/TrustSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';

const AboutPage        = lazy(() => import('./components/AboutPage'));
const MonitorsPage     = lazy(() => import('./components/MonitorsPage'));
const LaptopsPage      = lazy(() => import('./components/LaptopsPage'));
const AiosPage         = lazy(() => import('./components/AiosPage'));
const NovaPage         = lazy(() => import('./components/NovaPage'));
const MatrixPage       = lazy(() => import('./components/MatrixPage'));
const OptimaPage       = lazy(() => import('./components/OptimaPage'));
const CasesPage        = lazy(() => import('./components/CasesPage'));
const BlogPage         = lazy(() => import('./components/BlogPage'));
const ServiceCenterPage = lazy(() => import('./components/ServiceCenterPage'));
const CareersPage      = lazy(() => import('./components/CareersPage'));
const HowToBuyPage     = lazy(() => import('./components/HowToBuyPage'));
const B2BPage          = lazy(() => import('./components/B2BPage'));
import { LenisContext } from './context/LenisContext';
import { LanguageProvider, useLang } from './context/LanguageContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import { ShopModalProvider } from './context/ShopModalContext';
import { getProducts, mediaUrl, type StrapiProduct } from './lib/strapi';
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
    learnMoreHref: '/laptops',
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
    id: 'cases',
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
    learnMoreHref: '/monitors',
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   Home — the main landing page
───────────────────────────────────────────────────────────────────────── */
function HomePage() {
  const { tr, lang } = useLang();
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [loaderDone, setLoaderDone] = useState(false);
  const [cmsProducts, setCmsProducts] = useState<StrapiProduct[]>([]);
  const rafId = useRef<number>(0);

  /* ── Fetch CMS products; silently fall back to translations on error ── */
  const fetchProducts = useCallback(() => {
    getProducts(lang)
      .then(setCmsProducts)
      .catch(() => setCmsProducts([]));
  }, [lang]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  /* ── Merge: CMS data takes priority, translations are the fallback ── */
  const products: ProductProps[] = BASE_PRODUCTS.map((base, i) => {
    const cms = cmsProducts.find(p => p.category_id === base.id);
    const coverUrl = mediaUrl(cms?.cover?.url);
    return {
      ...base,
      title:       cms?.title       ?? tr.products.data[i].title,
      description: cms?.description ?? tr.products.data[i].description,
      image:       coverUrl ?? base.image,
      features: base.features.map((f, fi) => ({
        ...f,
        text: (cms?.[`feature_${fi + 1}` as keyof StrapiProduct] as string | null) ?? f.text,
      })),
    };
  });

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
              learnMoreHref={product.learnMoreHref}
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
   AppContent — reads the router and renders the correct page
───────────────────────────────────────────────────────────────────────── */
function AppContent() {
  const { page } = useRouter();

  if (page === '/') return <HomePage />;

  return (
    <Suspense fallback={<div style={{ background: '#000', minHeight: '100vh' }} />}>
      {page === '/about'          && <AboutPage />}
      {page === '/monitors'       && <MonitorsPage />}
      {page === '/laptops'        && <LaptopsPage />}
      {page === '/aios'           && <AiosPage />}
      {page === '/nova'           && <NovaPage />}
      {page === '/matrix'         && <MatrixPage />}
      {page === '/optima'         && <OptimaPage />}
      {page === '/cases'          && <CasesPage />}
      {page === '/blog'           && <BlogPage />}
      {page === '/service-center' && <ServiceCenterPage />}
      {page === '/careers'        && <CareersPage />}
      {page === '/how-to-buy'     && <HowToBuyPage />}
      {page === '/b2b'            && <B2BPage />}
    </Suspense>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   App — language + router providers
───────────────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <LanguageProvider>
      <RouterProvider>
        <ShopModalProvider>
          <AppContent />
        </ShopModalProvider>
      </RouterProvider>
    </LanguageProvider>
  );
}
