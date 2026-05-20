import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
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
            <a href="/" className="text-[32px] font-black tracking-[-0.08em] text-[#1D1D1F] flex items-center gap-0.5 hover:opacity-80 transition-opacity duration-200">
              Bikon<span className="text-[#0066CC]">.</span>
            </a>
            <p className="text-[15px] text-[#6E6E73] leading-[1.65] max-w-[260px]">
              {tr.footer.tagline}
            </p>
            <div className="flex gap-5">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#6E6E73]
                             border border-black/[0.06] card-shadow
                             hover:text-[#1D1D1F] hover:scale-105 hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.15)]
                             transition-all duration-200 ease-out"
                >
                  <Icon size={16} strokeWidth={1.5} />
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
                    const isAboutLink = ci === 1 && i === 0;
                    const isBlogLink  = ci === 1 && i === 2;
                    const href =
                      ci === 0
                        ? ['#noutbuklar','#monobloklar','#pc','#monitorlar'][i] ?? '#'
                        : isAboutLink
                        ? '/about'
                        : isBlogLink
                        ? '/blog'
                        : '#';
                    return (
                      <li key={i}>
                        <a
                          href={href}
                          onClick={
                            isAboutLink ? (e) => { e.preventDefault(); navigate('/about'); }
                            : isBlogLink ? (e) => { e.preventDefault(); navigate('/blog'); }
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
