import { useState, useRef } from 'react';
import { CheckCircle, Upload, AlertCircle } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLang } from '../context/LanguageContext';
import SplitHeading from './SplitHeading';

const TG_TOKEN = import.meta.env.VITE_TG_TOKEN as string;
const TG_CHAT  = import.meta.env.VITE_TG_CHAT as string;

interface CareersTr {
  eyebrow: string;
  title: string;
  subtitle: string;
  first_name: string;
  last_name: string;
  phone: string;
  position: string;
  position_placeholder: string;
  position_other: string;
  position_other_placeholder: string;
  cv: string;
  cv_hint: string;
  cv_chosen: string;
  submit: string;
  sending: string;
  success_title: string;
  success_desc: string;
  error: string;
  positions: readonly string[];
}

const inputClass =
  'w-full bg-[#F5F5F7] rounded-xl px-4 py-3 text-[15px] text-[#1D1D1F] ' +
  'border border-transparent focus:border-[#0066CC] focus:bg-white ' +
  'outline-none transition-all duration-200 placeholder:text-[#AEAEB2]';

export default function CareersPage() {
  const { tr } = useLang();
  const cr = (tr as unknown as { careers: CareersTr }).careers;

  const [firstName, setFirstName]     = useState('');
  const [lastName,  setLastName]      = useState('');
  const [phone,     setPhone]         = useState('');
  const [position,  setPosition]      = useState('');
  const [otherPos,  setOtherPos]      = useState('');
  const [cvFile,    setCvFile]        = useState<File | null>(null);
  const [status,    setStatus]        = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const fileRef = useRef<HTMLInputElement>(null);

  const isOther   = position === '__other__';
  const finalPos  = isOther ? otherPos : position;
  const canSubmit = firstName && lastName && phone && finalPos && cvFile && status !== 'loading';

  const handleFile = (file: File | null) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) return;
    setCvFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus('loading');
    try {
      const caption =
        `💼 Vakansiya — Bikon.uz\n\n` +
        `👤 ${firstName} ${lastName}\n` +
        `📞 ${phone}\n` +
        `💼 ${finalPos}`;

      const fd = new FormData();
      fd.append('chat_id', TG_CHAT);
      fd.append('document', cvFile!);
      fd.append('caption', caption);

      const res = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendDocument`, {
        method: 'POST',
        body: fd,
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.description ?? 'failed');
      setStatus('success');
    } catch (err) {
      console.error('Telegram sendDocument failed:', err);
      setStatus('error');
    }
  };

  return (
    <div className="bg-white min-h-screen selection:bg-black selection:text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="accent-label mb-8 mx-auto" style={{ width: 'fit-content' }}>
            {cr.eyebrow}
          </div>
          <SplitHeading
            text={cr.title}
            style={{
              fontSize: 'clamp(36px, 10vw, 112px)',
              fontWeight: 300,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              color: '#1D1D1F',
            }}
          />
          <p className="mt-8 text-[17px] text-[#6E6E73] leading-relaxed max-w-lg mx-auto">
            {cr.subtitle}
          </p>
          <div
            className="mx-auto mt-10"
            style={{ width: 48, height: 2, background: 'linear-gradient(90deg, #007AFF, #60a5fa)', borderRadius: 2 }}
          />
        </div>
      </section>

      {/* Form */}
      <section className="pb-28 px-6">
        <div className="max-w-xl mx-auto">
          {status === 'success' ? (
            <div className="bg-[#F5F5F7] rounded-3xl p-12 text-center flex flex-col items-center gap-4">
              <CheckCircle size={48} strokeWidth={1.5} className="text-[#34C759]" />
              <h2 className="text-[22px] font-semibold text-[#1D1D1F]">{cr.success_title}</h2>
              <p className="text-[15px] text-[#6E6E73]">{cr.success_desc}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-[#F5F5F7] rounded-3xl p-8 flex flex-col gap-5">

              {/* Name row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6E6E73]">
                    {cr.first_name}
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    className={inputClass}
                    placeholder="Ali"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6E6E73]">
                    {cr.last_name}
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    className={inputClass}
                    placeholder="Karimov"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6E6E73]">
                  {cr.phone}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className={inputClass}
                  placeholder="+998 90 123 45 67"
                />
              </div>

              {/* Position */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6E6E73]">
                  {cr.position}
                </label>
                <select
                  required
                  value={position}
                  onChange={e => setPosition(e.target.value)}
                  className={inputClass}
                  style={{ appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236E6E73' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }}
                >
                  <option value="" disabled>{cr.position_placeholder}</option>
                  {cr.positions.map(pos => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                  <option value="__other__">{cr.position_other}</option>
                </select>
                {isOther && (
                  <input
                    type="text"
                    required
                    value={otherPos}
                    onChange={e => setOtherPos(e.target.value)}
                    className={inputClass}
                    placeholder={cr.position_other_placeholder}
                  />
                )}
              </div>

              {/* CV upload */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6E6E73]">
                  {cr.cv}
                </label>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="hidden"
                  onChange={e => handleFile(e.target.files?.[0] ?? null)}
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="flex items-center gap-3 bg-white border-2 border-dashed border-[#D1D1D6] rounded-xl px-4 py-4 text-left hover:border-[#0066CC] hover:bg-blue-50/20 transition-all duration-200"
                >
                  <Upload size={18} strokeWidth={1.8} className="text-[#6E6E73] flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[14px] text-[#1D1D1F] font-medium leading-tight">
                      {cvFile ? `${cr.cv_chosen}: ${cvFile.name}` : cr.cv_hint}
                    </span>
                  </div>
                </button>
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-[#FF3B30] text-[13px]">
                  <AlertCircle size={15} strokeWidth={2} />
                  {cr.error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full py-4 rounded-xl text-[15px] font-semibold text-white transition-all duration-200"
                style={{
                  background: canSubmit ? '#111' : '#D1D1D6',
                  cursor: canSubmit ? 'pointer' : 'not-allowed',
                  boxShadow: canSubmit ? '0 4px 16px rgba(0,0,0,0.18)' : 'none',
                }}
              >
                {status === 'loading' ? cr.sending : cr.submit}
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
