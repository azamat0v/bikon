import { useState, type FormEvent } from 'react';
import { Building2, Phone, Package, Hash, CheckCircle, AlertCircle, ChevronDown } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLang } from '../context/LanguageContext';
import SplitHeading from './SplitHeading';

interface B2BTr {
  eyebrow: string;
  title: string;
  subtitle: string;
  org_label: string;
  org_placeholder: string;
  phone_label: string;
  phone_placeholder: string;
  product_label: string;
  product_placeholder: string;
  qty_label: string;
  qty_placeholder: string;
  submit: string;
  submitting: string;
  success_title: string;
  success_desc: string;
  error: string;
  retry: string;
  products: string[];
}

const TG_TOKEN = '8713033309:AAGYWE99sTRdPxr9iOsbA8rmgqxPjbEb7xE';
const TG_CHAT  = '-1003949797911';

type Step = 'form' | 'success' | 'error';

export default function B2BPage() {
  const { tr } = useLang();
  const b2b = (tr as unknown as { b2b: B2BTr }).b2b;

  const [step,    setStep]    = useState<Step>('form');
  const [org,     setOrg]     = useState('');
  const [phone,   setPhone]   = useState('');
  const [product, setProduct] = useState('');
  const [qty,     setQty]     = useState('');
  const [loading, setLoading] = useState(false);

  const reset = () => { setOrg(''); setPhone(''); setProduct(''); setQty(''); setStep('form'); };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const text = [
      '🏢 Yangi B2B Mijoz — Bikon.uz',
      '',
      `🏢 Tashkilot: ${org}`,
      `📱 Telefon: ${phone}`,
      `📦 Mahsulot: ${product}`,
      `🔢 Miqdor: ${qty}`,
    ].join('\n');
    try {
      const fd = new FormData();
      fd.append('chat_id', TG_CHAT);
      fd.append('text', text);
      const res  = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, { method: 'POST', body: fd });
      const json = await res.json();
      if (!json.ok) throw new Error(json.description ?? 'api error');
      setStep('success');
    } catch (err) {
      console.error('Telegram B2B sendMessage failed:', err);
      setStep('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen selection:bg-black selection:text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="accent-label mb-8 mx-auto" style={{ width: 'fit-content' }}>
            {b2b.eyebrow}
          </div>
          <SplitHeading
            text={b2b.title}
            style={{
              fontSize: 'clamp(56px, 10vw, 112px)',
              fontWeight: 300,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              color: '#1D1D1F',
            }}
          />
          <p className="mt-8 text-[18px] text-[#6E6E73] max-w-xl mx-auto leading-relaxed">
            {b2b.subtitle}
          </p>
          <div
            className="mx-auto mt-12"
            style={{ width: 48, height: 2, background: 'linear-gradient(90deg, #1D1D1F, #6E6E73)', borderRadius: 2 }}
          />
        </div>
      </section>

      {/* Form / Success / Error */}
      <section className="pb-24 px-6">
        <div className="max-w-xl mx-auto">

          {step === 'form' && (
            <form onSubmit={handleSubmit} className="bg-[#F5F5F7] rounded-3xl p-10 flex flex-col gap-6">

              {/* Org */}
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-[13px] font-semibold text-[#1D1D1F] uppercase tracking-[0.1em]">
                  <Building2 size={14} strokeWidth={2.5} className="text-[#6E6E73]" />
                  {b2b.org_label}
                </label>
                <input
                  type="text"
                  value={org}
                  onChange={e => setOrg(e.target.value)}
                  placeholder={b2b.org_placeholder}
                  required
                  className="w-full px-5 py-3.5 rounded-2xl border border-[#E5E5EA] bg-white text-[15px] text-[#1D1D1F] placeholder:text-[#AEAEB2] focus:outline-none focus:border-[#1D1D1F] transition-colors duration-150"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-[13px] font-semibold text-[#1D1D1F] uppercase tracking-[0.1em]">
                  <Phone size={14} strokeWidth={2.5} className="text-[#6E6E73]" />
                  {b2b.phone_label}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder={b2b.phone_placeholder}
                  required
                  className="w-full px-5 py-3.5 rounded-2xl border border-[#E5E5EA] bg-white text-[15px] text-[#1D1D1F] placeholder:text-[#AEAEB2] focus:outline-none focus:border-[#1D1D1F] transition-colors duration-150"
                />
              </div>

              {/* Product */}
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-[13px] font-semibold text-[#1D1D1F] uppercase tracking-[0.1em]">
                  <Package size={14} strokeWidth={2.5} className="text-[#6E6E73]" />
                  {b2b.product_label}
                </label>
                <div className="relative">
                  <select
                    value={product}
                    onChange={e => setProduct(e.target.value)}
                    required
                    className="w-full px-5 py-3.5 rounded-2xl border border-[#E5E5EA] bg-white text-[15px] text-[#1D1D1F] focus:outline-none focus:border-[#1D1D1F] transition-colors duration-150 appearance-none cursor-pointer"
                  >
                    <option value="" disabled>{b2b.product_placeholder}</option>
                    {b2b.products.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    strokeWidth={2}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6E6E73] pointer-events-none"
                  />
                </div>
              </div>

              {/* Quantity */}
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-[13px] font-semibold text-[#1D1D1F] uppercase tracking-[0.1em]">
                  <Hash size={14} strokeWidth={2.5} className="text-[#6E6E73]" />
                  {b2b.qty_label}
                </label>
                <input
                  type="number"
                  min={1}
                  value={qty}
                  onChange={e => setQty(e.target.value)}
                  placeholder={b2b.qty_placeholder}
                  required
                  className="w-full px-5 py-3.5 rounded-2xl border border-[#E5E5EA] bg-white text-[15px] text-[#1D1D1F] placeholder:text-[#AEAEB2] focus:outline-none focus:border-[#1D1D1F] transition-colors duration-150"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !org.trim() || !phone.trim() || !product || !qty}
                className="w-full py-4 rounded-2xl bg-[#1D1D1F] text-white text-[14px] font-semibold tracking-wide transition-opacity duration-150 disabled:opacity-40 mt-2"
              >
                {loading ? b2b.submitting : b2b.submit}
              </button>
            </form>
          )}

          {step === 'success' && (
            <div className="bg-[#F5F5F7] rounded-3xl p-14 flex flex-col items-center text-center gap-5">
              <div className="w-16 h-16 bg-[#34C759]/10 rounded-full flex items-center justify-center">
                <CheckCircle size={32} strokeWidth={1.5} className="text-[#34C759]" />
              </div>
              <h2 className="text-[24px] font-semibold text-[#1D1D1F]">{b2b.success_title}</h2>
              <p className="text-[15px] text-[#6E6E73] leading-relaxed max-w-sm">{b2b.success_desc}</p>
              <button
                onClick={reset}
                className="mt-2 px-8 py-3.5 rounded-2xl bg-[#1D1D1F] text-white text-[14px] font-semibold"
              >
                OK
              </button>
            </div>
          )}

          {step === 'error' && (
            <div className="bg-[#F5F5F7] rounded-3xl p-14 flex flex-col items-center text-center gap-5">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
                <AlertCircle size={32} strokeWidth={1.5} className="text-red-500" />
              </div>
              <p className="text-[15px] text-[#6E6E73] leading-relaxed max-w-sm">{b2b.error}</p>
              <button
                onClick={() => setStep('form')}
                className="mt-2 px-8 py-3.5 rounded-2xl bg-[#1D1D1F] text-white text-[14px] font-semibold"
              >
                {b2b.retry}
              </button>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </div>
  );
}
