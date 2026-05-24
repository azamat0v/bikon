import { ShoppingCart, Phone, Send, Building2, CheckCircle, ChevronRight, MousePointer } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLang } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import SplitHeading from './SplitHeading';

interface HowToBuyTr {
  eyebrow: string;
  title: string;
  subtitle: string;
  step1_label: string;
  step1_title: string;
  step1_desc: string;
  step2_label: string;
  step2_title: string;
  step2_desc: string;
  channel_call: string;
  channel_call_sub: string;
  channel_tg: string;
  channel_tg_sub: string;
  channel_b2b: string;
  channel_b2b_sub: string;
  step3_label: string;
  step3_title: string;
  step3_desc: string;
  tg_name: string;
  tg_contact: string;
  tg_send: string;
  step4_label: string;
  step4_title: string;
  step4_desc: string;
  b2b_title: string;
  b2b_desc: string;
  b2b_cta: string;
  support_title: string;
  support_desc: string;
  support_cta: string;
}

export default function HowToBuyPage() {
  const { tr } = useLang();
  const { navigate } = useRouter();
  const htb = (tr as unknown as { howtobuy: HowToBuyTr }).howtobuy;

  const steps = [
    {
      num: '01',
      label: htb.step1_label,
      title: htb.step1_title,
      desc: htb.step1_desc,
      icon: MousePointer,
      color: '#007AFF',
    },
    {
      num: '02',
      label: htb.step2_label,
      title: htb.step2_title,
      desc: htb.step2_desc,
      icon: ShoppingCart,
      color: '#007AFF',
    },
  ];

  return (
    <div className="bg-white min-h-screen selection:bg-black selection:text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="accent-label mb-8 mx-auto" style={{ width: 'fit-content' }}>
            {htb.eyebrow}
          </div>
          <SplitHeading
            text={htb.title}
            style={{
              fontSize: 'clamp(56px, 10vw, 112px)',
              fontWeight: 300,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              color: '#1D1D1F',
            }}
          />
          <p className="mt-8 text-[18px] text-[#6E6E73] max-w-xl mx-auto leading-relaxed">
            {htb.subtitle}
          </p>
          <div
            className="mx-auto mt-12"
            style={{ width: 48, height: 2, background: 'linear-gradient(90deg, #007AFF, #60a5fa)', borderRadius: 2 }}
          />
        </div>
      </section>

      {/* Steps 1 & 2 */}
      <section className="pb-6 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          {steps.map(({ num, label, title, desc, icon: Icon }) => (
            <div key={num} className="bg-[#F5F5F7] rounded-3xl p-10 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6E6E73]">{label}</span>
                <span className="text-[42px] font-light text-[#D1D1D6] leading-none">{num}</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#007AFF]/10 flex items-center justify-center">
                <Icon size={22} strokeWidth={1.5} className="text-[#007AFF]" />
              </div>
              <div>
                <h2 className="text-[22px] font-semibold text-[#1D1D1F] mb-2">{title}</h2>
                <p className="text-[15px] text-[#6E6E73] leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Step 3 — Choose channel (modal visual) */}
      <section className="py-6 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="border border-black/[0.07] rounded-3xl p-10 md:p-14">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6E6E73]">{htb.step3_label}</span>
              <span className="text-[42px] font-light text-[#D1D1D6] leading-none">03</span>
            </div>
            <h2 className="text-[22px] font-semibold text-[#1D1D1F] mb-2">{htb.step3_title}</h2>
            <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-10 max-w-lg">{htb.step3_desc}</p>

            {/* Modal preview */}
            <div className="bg-white rounded-2xl shadow-[0_8px_40px_-8px_rgba(0,0,0,0.15)] p-6 max-w-sm mx-auto flex flex-col gap-3">
              {/* Call */}
              <div className="flex items-center gap-4 bg-[#F5F5F7] rounded-2xl px-5 py-4">
                <div className="w-10 h-10 bg-[#34C759] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone size={18} strokeWidth={2} className="text-white" />
                </div>
                <div>
                  <div className="text-[15px] font-semibold text-[#1D1D1F]">{htb.channel_call}</div>
                  <div className="text-[13px] text-[#6E6E73]">{htb.channel_call_sub}</div>
                </div>
              </div>
              {/* Telegram */}
              <div className="flex items-center gap-4 bg-[#F5F5F7] rounded-2xl px-5 py-4">
                <div className="w-10 h-10 bg-[#0088cc] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Send size={18} strokeWidth={2} className="text-white" />
                </div>
                <div>
                  <div className="text-[15px] font-semibold text-[#1D1D1F]">{htb.channel_tg}</div>
                  <div className="text-[13px] text-[#6E6E73]">{htb.channel_tg_sub}</div>
                </div>
              </div>
              {/* B2B */}
              <div className="flex items-center gap-4 bg-[#F5F5F7] rounded-2xl px-5 py-4">
                <div className="w-10 h-10 bg-[#1D1D1F] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building2 size={18} strokeWidth={2} className="text-white" />
                </div>
                <div>
                  <div className="text-[15px] font-semibold text-[#1D1D1F]">{htb.channel_b2b}</div>
                  <div className="text-[13px] text-[#6E6E73]">{htb.channel_b2b_sub}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 4 — Telegram form preview */}
      <section className="py-6 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#F5F5F7] rounded-3xl p-10 md:p-14">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6E6E73]">{htb.step4_label}</span>
              <span className="text-[42px] font-light text-[#D1D1D6] leading-none">04</span>
            </div>
            <h2 className="text-[22px] font-semibold text-[#1D1D1F] mb-2">{htb.step4_title}</h2>
            <p className="text-[15px] text-[#6E6E73] leading-relaxed mb-10 max-w-lg">{htb.step4_desc}</p>

            {/* Form preview */}
            <div className="bg-white rounded-2xl shadow-[0_8px_40px_-8px_rgba(0,0,0,0.12)] p-6 max-w-sm mx-auto flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-[13px] font-semibold text-[#1D1D1F]">{htb.tg_name}</span>
                <div className="w-full px-4 py-3 rounded-xl border border-[#E5E5EA] text-[14px] text-[#AEAEB2] bg-[#F5F5F7]">
                  Abdulloh
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[13px] font-semibold text-[#1D1D1F]">{htb.tg_contact}</span>
                <div className="w-full px-4 py-3 rounded-xl border border-[#E5E5EA] text-[14px] text-[#AEAEB2] bg-[#F5F5F7]">
                  +998 90 123 45 67
                </div>
              </div>
              <div className="w-full py-3.5 rounded-xl bg-[#0088cc] text-white text-[14px] font-semibold text-center flex items-center justify-center gap-2">
                <CheckCircle size={16} strokeWidth={2} />
                {htb.tg_send}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* B2B block */}
      <section className="py-6 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="border border-black/[0.07] rounded-3xl p-10 md:p-14 flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="w-14 h-14 rounded-2xl bg-[#1D1D1F] flex items-center justify-center flex-shrink-0">
              <Building2 size={24} strokeWidth={1.5} className="text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-[22px] font-semibold text-[#1D1D1F] mb-2">{htb.b2b_title}</h2>
              <p className="text-[15px] text-[#6E6E73] leading-relaxed">{htb.b2b_desc}</p>
            </div>
            <a
              href="tel:+998783338085"
              className="inline-flex items-center gap-2 apple-button-secondary text-[14px] flex-shrink-0"
            >
              {htb.b2b_cta}
              <ChevronRight size={16} strokeWidth={2} />
            </a>
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-16 mt-6 px-6 bg-[#F5F5F7]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-[28px] font-semibold text-[#1D1D1F] tracking-tight mb-4">
            {htb.support_title}
          </h2>
          <p className="text-[16px] text-[#6E6E73] leading-relaxed mb-8">
            {htb.support_desc}
          </p>
          <button
            onClick={() => navigate('/service-center')}
            className="inline-flex items-center gap-2 apple-button-primary text-[14px]"
          >
            {htb.support_cta}
            <ChevronRight size={16} strokeWidth={2} />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
