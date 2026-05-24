import { Instagram, Youtube } from 'lucide-react';

const TikTokIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
  </svg>
);

const TelegramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);
import { useLang } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';

export default function Footer() {
  const { tr } = useLang();
  const { navigate } = useRouter();
  return (
    <footer className="bg-[#F5F5F7] text-[#6E6E73] text-[13px] font-normal overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8 py-16">

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-10 border-b border-black/[0.06]">

          {/* Brand column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <a href="/" className="flex items-center hover:opacity-75 transition-opacity duration-200">
              <div style={{ height: 46, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
                <img
                  src="/bikon.svg"
                  alt="Bikon"
                  draggable={false}
                  style={{ height: 120, width: 'auto', display: 'block' }}
                />
              </div>
            </a>
            <p className="text-[15px] text-[#6E6E73] leading-[1.65] max-w-[260px]">
              {tr.footer.tagline}
            </p>
            <div className="flex gap-5">
              {([
                { icon: <Instagram size={16} strokeWidth={1.5} />, href: 'https://www.instagram.com/bikon.uz' },
                { icon: <TikTokIcon />, href: 'https://www.tiktok.com/@bikon.uz' },
                { icon: <Youtube size={16} strokeWidth={1.5} />, href: 'https://youtube.com/@bikon_uz' },
                { icon: <TelegramIcon />, href: 'https://t.me/bikon_uz' },
              ] as const).map(({ icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#6E6E73]
                             border border-black/[0.06] card-shadow
                             hover:text-[#1D1D1F] hover:scale-105 hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.15)]
                             transition-all duration-200 ease-out"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-10">
            {tr.footer.cols.map((col, ci) => (
              <div key={ci} className="space-y-4">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1D1D1F]">
                  {col.heading}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((label, i) => {
                    // Products col (ci=0) → scroll anchors; About col (ci=1, i=0) → /about page
                    const isAboutLink         = ci === 1 && i === 0;
                    const isCareersLink       = ci === 1 && i === 1;
                    const isBlogLink          = ci === 1 && i === 2;
                    const isContactLink       = ci === 1 && i === 3;
                    const isHowToBuyLink      = ci === 2 && i === 0;
                    const isB2bLink           = ci === 2 && i === 1;
                    const isWarrantyLink      = ci === 2 && i === 2;
                    const isServiceCenterLink = ci === 2 && i === 3;
                    const href =
                      ci === 0
                        ? ['/laptops','/aios','/cases','/monitors'][i] ?? '#'
                        : isAboutLink
                        ? '/about'
                        : isCareersLink
                        ? '/careers'
                        : isBlogLink
                        ? '/blog'
                        : isContactLink
                        ? 'tel:+998783338085'
                        : isHowToBuyLink
                        ? '/how-to-buy'
                        : isB2bLink
                        ? '/b2b'
                        : isWarrantyLink
                        ? '/service-center#warranty'
                        : isServiceCenterLink
                        ? '/service-center'
                        : '#';
                    return (
                      <li key={i}>
                        <a
                          href={href}
                          onClick={
                            ci === 0 ? (e) => { e.preventDefault(); navigate((['/laptops','/aios','/cases','/monitors'][i] ?? '/')); }
                            : isAboutLink ? (e) => { e.preventDefault(); navigate('/about'); }
                            : isCareersLink ? (e) => { e.preventDefault(); navigate('/careers'); }
                            : isBlogLink ? (e) => { e.preventDefault(); navigate('/blog'); }
                            : isHowToBuyLink ? (e) => { e.preventDefault(); navigate('/how-to-buy'); }
                            : isB2bLink ? (e) => { e.preventDefault(); navigate('/b2b'); }
                            : isWarrantyLink ? (e) => { e.preventDefault(); navigate('/service-center'); setTimeout(() => document.getElementById('warranty')?.scrollIntoView({ behavior: 'smooth' }), 100); }
                            : isServiceCenterLink ? (e) => { e.preventDefault(); navigate('/service-center'); }
                            : undefined
                          }
                          className="text-[13px] text-[#6E6E73] hover:text-[#1D1D1F] transition-colors duration-150"
                        >
                          {label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-5">
          <p className="text-[12px] text-[#8E8E93] tracking-[-0.01em]">
            {tr.footer.copyright}
          </p>
          <a
            href="https://avzo.uz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] text-[#8E8E93] hover:text-[#1D1D1F] transition-colors duration-150 tracking-[-0.01em]"
          >
            Developed by{' '}
            <span className="font-semibold text-[#6E6E73]">Avzo.uz</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
