import { motion } from 'motion/react';
import { ChevronRight, LucideIcon } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

export interface ProductFeature {
  icon: LucideIcon;
  text: string;
}

export interface ProductProps {
  key?: string;
  id: string;
  title: string;
  description: string;
  features: ProductFeature[];
  image: string;
  reverse?: boolean;
}

export default function ProductSection({ id, title, description, features, image, reverse = false }: ProductProps) {
  const { tr } = useLang();
  const p = tr.products;
  return (
    <section id={id} className="py-24 md:py-36 overflow-hidden bg-white">
      <div className="max-w-[1400px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

        {/* ── Content column ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`lg:col-span-5 ${reverse ? 'lg:order-2 lg:pl-10' : 'lg:order-1 lg:pr-10'}`}
        >
          <div className="mb-5">
            <span className="accent-label">{p.eyebrow}</span>
          </div>

          <h2 className="text-[38px] md:text-[56px] font-black tracking-[-0.04em] text-[#1D1D1F] mb-5 leading-[1.08]">
            {title}
          </h2>

          <p className="text-[17px] text-[#6E6E73] leading-[1.65] mb-9 max-w-[400px]">
            {description}
          </p>

          {/* Feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 mb-9">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col gap-3 group cursor-default"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center
                                transition-all duration-250 ease-out
                                group-hover:scale-[1.06]"
                     style={{
                       background: 'linear-gradient(135deg, rgba(232,219,252,0.45) 0%, rgba(212,239,255,0.45) 100%)',
                       color: '#6d28d9',
                     }}
                     onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 16px -4px rgba(109,40,217,0.22)')}
                     onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}>
                  <feature.icon size={20} strokeWidth={1.8} />
                </div>
                <p className="text-[14px] font-semibold text-[#1D1D1F] leading-[1.4] tracking-[-0.01em]">
                  {feature.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Button group — row on desktop, stack on mobile */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

            {/* Buy Now — primary black */}
            <a
              href="https://shop.bikon.uz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-semibold text-[14px]
                         tracking-[-0.01em] text-white no-underline
                         transition-all duration-200 ease-out
                         hover:scale-[1.02] hover:shadow-[0_8px_28px_-6px_rgba(0,0,0,0.35)]
                         active:scale-[0.97]"
              style={{
                background: '#111',
                padding: '13px 26px',
                borderRadius: 12,
              }}
            >
              {p.buy_now}
            </a>

            {/* Learn More — outline ghost */}
            <button
              className="inline-flex items-center justify-center gap-2 font-semibold text-[14px]
                         tracking-[-0.01em] text-[#1D1D1F]
                         transition-all duration-200 ease-out
                         hover:bg-gray-50 active:scale-[0.97] group"
              style={{
                background: 'transparent',
                padding: '12px 24px',
                borderRadius: 12,
                border: '1.5px solid #E5E7EB',
                cursor: 'pointer',
              }}
            >
              {p.learn_more}
              <ChevronRight
                size={15}
                strokeWidth={2.5}
                className="group-hover:translate-x-0.5 transition-transform duration-200"
              />
            </button>
          </div>
        </motion.div>

        {/* ── Image column ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className={`lg:col-span-7 relative ${reverse ? 'lg:order-1' : 'lg:order-2'}`}
        >
          <div
            className={`relative rounded-[56px] overflow-hidden organic-shadow group bg-[#F5F5F7] p-7
                        transition-all duration-700 ease-out
                        ${reverse ? 'rotate-[-0.8deg]' : 'rotate-[0.8deg]'}
                        hover:rotate-0 hover:shadow-[0_32px_80px_-20px_rgba(0,0,0,0.12)]`}
          >
            {/* Subtle inner glow */}
            <div className={`absolute top-0 ${reverse ? 'right-0' : 'left-0'} w-48 h-48 bg-blue-400/5 rounded-full blur-2xl pointer-events-none`} />

            <div className="relative rounded-[40px] overflow-hidden bg-[#F0F0F5]
                           flex items-center justify-center"
                 style={{ minHeight: 320 }}>
              <img
                src={image}
                alt={title}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
                style={{ maxHeight: 480 }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
