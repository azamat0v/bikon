import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone } from 'lucide-react';
import { useLenis } from '../context/LenisContext';
import { useLang } from '../context/LanguageContext';
import type { Lang } from '../i18n/translations';

const NAV_HEIGHT = 72;

const LANG_OPTIONS: { code: Lang; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
  { code: 'uz', label: 'UZ' },
];

export default function Navbar() {
  const { lang, setLang, tr } = useLang();
  const [isScrolled, setIsScrolled]       = useState(false);
  const [isMenuOpen, setIsMenuOpen]       = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef  = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();

  const navLinks = [
    { name: tr.nav.home,     id: 'home'       },
    { name: tr.nav.laptops,  id: 'noutbuklar' },
    { name: tr.nav.cases,    id: 'pc'         },
    { name: tr.nav.monitors, id: 'monitorlar' },
  ];

  // ── Scroll-spy ────────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const bias = window.scrollY + NAV_HEIGHT + 80;
      if (bias < 300) { setActiveSection('home'); return; }

      for (let i = navLinks.length - 1; i >= 1; i--) {
        const el = document.getElementById(navLinks[i].id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (bias >= top) { setActiveSection(navLinks[i].id); return; }
        }
      }
      setActiveSection('home');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Close menu on outside click ────────────────────────────────────────────
  useEffect(() => {
    if (!isMenuOpen) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      const t = e.target as Node;
      if (
        mobileMenuRef.current && !mobileMenuRef.current.contains(t) &&
        hamburgerRef.current  && !hamburgerRef.current.contains(t)
      ) setIsMenuOpen(false);
    };
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handler);
      document.addEventListener('touchstart', handler);
    }, 10);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [isMenuOpen]);

  // ── Body scroll lock ───────────────────────────────────────────────────────
  useEffect(() => {
    if (isMenuOpen) { document.body.style.overflow = 'hidden'; lenis?.stop(); }
    else            { document.body.style.overflow = '';       lenis?.start(); }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen, lenis]);

  // ── Smooth scroll ──────────────────────────────────────────────────────────
  const scrollTo = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
      e.preventDefault();
      const go = () => {
        if (id === 'home') {
          lenis ? lenis.scrollTo(0, { duration: 1.2 }) : window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.getElementById(id);
          if (!el) return;
          lenis
            ? lenis.scrollTo(el, { offset: -NAV_HEIGHT, duration: 1.2 })
            : window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT, behavior: 'smooth' });
        }
      };
      if (isMenuOpen) { lenis?.start(); document.body.style.overflow = ''; setIsMenuOpen(false); setTimeout(go, 100); }
      else go();
    },
    [lenis, isMenuOpen],
  );

  const isActive = (id: string) => activeSection === id;

  return (
    <>
      {/* ── Desktop Floating Navbar ──────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0,    opacity: 1 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center"
        style={{ paddingTop: isScrolled ? 10 : 18, paddingBottom: isScrolled ? 10 : 0, transition: 'padding 0.3s ease' }}
      >
        <nav
          style={{
            width: '100%',
            maxWidth: 1200,
            marginLeft: 24,
            marginRight: 24,
            borderRadius: isScrolled || isMenuOpen ? 20 : 0,
            background: isScrolled || isMenuOpen ? 'rgba(255,255,255,0.95)' : 'transparent',
            backdropFilter: isScrolled || isMenuOpen ? 'blur(24px) saturate(180%)' : 'none',
            WebkitBackdropFilter: isScrolled || isMenuOpen ? 'blur(24px) saturate(180%)' : 'none',
            border: isScrolled || isMenuOpen ? '1px solid rgba(255,255,255,0.55)' : '1px solid transparent',
            boxShadow: isScrolled || isMenuOpen ? '0 8px 40px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.8) inset' : 'none',
            transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <div className="h-[68px] flex items-center justify-between px-8">

            {/* Logo — SVG has a large 2000×2000 viewBox with whitespace margin,
                so we clip to just the artwork using overflow:hidden */}
            <a
              href="#"
              onClick={(e) => scrollTo(e, 'home')}
              className="flex-shrink-0 select-none transition-all duration-300 hover:scale-105 hover:opacity-75"
              aria-label="Bikon home"
            >
              <div
                style={{
                  height: 46,
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
                    height: 120,
                    width: 'auto',
                    display: 'block',
                    imageRendering: 'auto',
                    flexShrink: 0,
                  }}
                />
              </div>
            </a>

            {/* Center links — pushed right with gap from logo */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.id === 'home' ? '#' : `#${link.id}`}
                  onClick={(e) => scrollTo(e, link.id)}
                  className="relative group"
                  style={{ textDecoration: 'none' }}
                >
                  <span
                    className="text-[12px] font-bold uppercase tracking-[0.14em] transition-colors duration-200"
                    style={{ color: isActive(link.id) ? '#0071E3' : '#555' }}
                  >
                    {link.name}
                  </span>
                  <span
                    className="absolute -bottom-1 left-0 w-full h-[1.5px] rounded-full bg-[#0071E3] origin-left transition-transform duration-300"
                    style={{ transform: isActive(link.id) ? 'scaleX(1)' : 'scaleX(0)' }}
                  />
                </a>
              ))}
            </div>

            {/* Right — Contact + hamburger */}
            <div className="flex items-center gap-4">
              {/* Language switcher */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  background: 'rgba(0,0,0,0.05)',
                  borderRadius: 10,
                  padding: '3px',
                }}
              >
                {LANG_OPTIONS.map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => setLang(code)}
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      padding: '5px 9px',
                      borderRadius: 7,
                      border: 'none',
                      cursor: 'pointer',
                      background: lang === code ? '#111' : 'transparent',
                      color: lang === code ? '#fff' : '#888',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <a
                href="tel:+998783338085"
                className="hidden sm:flex items-center gap-2 text-white text-[12px] font-bold uppercase tracking-[0.12em] no-underline transition-all duration-200 active:scale-95"
                style={{
                  background: '#111',
                  padding: '10px 22px',
                  borderRadius: 14,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#000'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.28)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#111'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.18)'; }}
              >
                <Phone size={13} strokeWidth={2.5} />
                {tr.nav.contact}
              </a>

              <button
                ref={hamburgerRef}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-black p-2 hover:bg-black/5 rounded-xl transition-colors duration-200"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile Menu ───────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 left-0 w-full z-[110] bg-white/98 backdrop-blur-2xl px-8 pt-8 pb-10 lg:hidden"
              style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.14)', minHeight: '100dvh' }}
            >
              {/* Mobile header */}
              <div className="flex items-center justify-between mb-8">
                <img
                  src="/bikon.svg"
                  alt="Bikon"
                  className="h-7 w-auto"
                  draggable={false}
                />
                <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-black/5 rounded-xl transition-colors">
                  <X size={22} />
                </button>
              </div>
              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.id}
                    href={link.id === 'home' ? '#' : `#${link.id}`}
                    onClick={(e) => scrollTo(e, link.id)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.22, delay: i * 0.04 }}
                    className="text-[28px] font-black tracking-tight no-underline transition-colors duration-200 py-1"
                    style={{ color: isActive(link.id) ? '#0071E3' : '#888' }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-black/[0.06]">
                <a
                  href="tel:+998783338085"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-black text-white text-[14px] font-bold uppercase tracking-widest no-underline"
                >
                  <Phone size={15} strokeWidth={2.5} />
                  +998 78 333 80 85
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
