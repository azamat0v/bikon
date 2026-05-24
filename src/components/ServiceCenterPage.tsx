import Navbar from './Navbar';
import Footer from './Footer';
import { useLang } from '../context/LanguageContext';
import SplitHeading from './SplitHeading';

interface ServiceCenterTr {
  eyebrow: string;
  title: string;
  phone_label: string;
  address_label: string;
  address: string;
  map_label: string;
  warranty_eyebrow: string;
  warranty_period: string;
  warranty_period_label: string;
  warranty_desc: string;
  w1_title: string; w1_desc: string;
  w2_title: string; w2_desc: string;
  w3_title: string; w3_desc: string;
}

export default function ServiceCenterPage() {
  const { tr } = useLang();
  const sc = (tr as unknown as { servicecenter: ServiceCenterTr }).servicecenter;

  return (
    <div className="bg-white min-h-screen selection:bg-black selection:text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="accent-label mb-8 mx-auto" style={{ width: 'fit-content' }}>
            {sc.eyebrow}
          </div>
          <SplitHeading
            text={sc.title}
            style={{
              fontSize: 'clamp(56px, 10vw, 120px)',
              fontWeight: 300,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              color: '#1D1D1F',
            }}
          />
          <div
            className="mx-auto mt-12"
            style={{ width: 48, height: 2, background: 'linear-gradient(90deg, #007AFF, #60a5fa)', borderRadius: 2 }}
          />
        </div>
      </section>

      {/* Contact card */}
      <section className="pb-16 px-6">
        <div className="max-w-xl mx-auto bg-[#F5F5F7] rounded-3xl p-10 flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6E6E73]">
              {sc.phone_label}
            </span>
            <a
              href="tel:+998793338085"
              className="text-[28px] font-semibold text-[#1D1D1F] tracking-tight hover:text-[#0066CC] transition-colors duration-200"
            >
              +998 79 333 80 85
            </a>
          </div>

          <div className="border-t border-black/[0.06]" />

          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6E6E73]">
              {sc.address_label}
            </span>
            <p className="text-[17px] text-[#1D1D1F] leading-snug">
              {sc.address}
            </p>
          </div>
        </div>
      </section>

      {/* Warranty */}
      <section id="warranty" className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="accent-label mb-6 mx-auto" style={{ width: 'fit-content' }}>
              {sc.warranty_eyebrow}
            </div>
            <div className="flex items-end justify-center gap-2 mb-4">
              <span style={{ fontSize: 'clamp(72px, 12vw, 120px)', fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 1, color: '#1D1D1F' }}>
                {sc.warranty_period}
              </span>
              <span className="text-[22px] font-light text-[#6E6E73] mb-3">{sc.warranty_period_label}</span>
            </div>
            <p className="text-[17px] text-[#6E6E73] leading-relaxed max-w-lg mx-auto">
              {sc.warranty_desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {([
              { title: sc.w1_title, desc: sc.w1_desc },
              { title: sc.w2_title, desc: sc.w2_desc },
              { title: sc.w3_title, desc: sc.w3_desc },
            ] as { title: string; desc: string }[]).map((item, i) => (
              <div key={i} className="bg-[#F5F5F7] rounded-2xl p-8 flex flex-col gap-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0066CC]">
                  0{i + 1}
                </span>
                <h3 className="text-[17px] font-semibold text-[#1D1D1F] leading-snug">{item.title}</h3>
                <p className="text-[14px] text-[#6E6E73] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6E6E73] text-center mb-6">
            {sc.map_label}
          </p>
          <div className="overflow-hidden rounded-3xl" style={{ aspectRatio: '16/9' }}>
            <iframe
              title="Bikon Service Center"
              src="https://yandex.uz/map-widget/v1/?ll=69.194404%2C41.206810&z=17&pt=69.194404%2C41.206810%2Cpm2rdm&lang=uz_UZ"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
