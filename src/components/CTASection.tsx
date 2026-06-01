import { motion } from 'motion/react';
import { useState, type FormEvent } from 'react';
import { Cpu, Phone, Wallet, Target, CheckCircle, AlertCircle, Send } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

const TG_TOKEN = import.meta.env.VITE_TG_TOKEN as string;
const TG_CHAT  = import.meta.env.VITE_TG_CHAT as string;

interface BuildPcTr {
  badge: string;
  title1: string;
  title2: string;
  body: string;
  name_label: string;
  name_placeholder: string;
  phone_label: string;
  phone_placeholder: string;
  budget_label: string;
  budget_placeholder: string;
  purpose_label: string;
  purpose_placeholder: string;
  purposes: string[];
  notes_label: string;
  notes_placeholder: string;
  submit: string;
  submitting: string;
  success_title: string;
  success_desc: string;
  error: string;
  retry: string;
}

type Step = 'form' | 'success' | 'error';

export default function CTASection() {
  const { tr } = useLang();
  const c = (tr as unknown as { buildpc: BuildPcTr }).buildpc;

  const [step,    setStep]    = useState<Step>('form');
  const [name,    setName]    = useState('');
  const [phone,   setPhone]   = useState('');
  const [budget,  setBudget]  = useState('');
  const [purpose, setPurpose] = useState('');
  const [notes,   setNotes]   = useState('');
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setName(''); setPhone(''); setBudget(''); setPurpose(''); setNotes('');
    setStep('form');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const text = [
      '🖥️ Yangi PC Build So\'rovi — Bikon.uz',
      '',
      `👤 Ism: ${name}`,
      `📱 Telefon: ${phone}`,
      `💰 Byudjet: ${budget}`,
      `🎯 Maqsad: ${purpose}`,
      notes ? `📝 Izoh: ${notes}` : null,
    ].filter(Boolean).join('\n');

    try {
      const fd = new FormData();
      fd.append('chat_id', TG_CHAT);
      fd.append('text', text);
      const res  = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, { method: 'POST', body: fd });
      const json = await res.json();
      if (!json.ok) throw new Error(json.description ?? 'api error');
      setStep('success');
    } catch (err) {
      console.error('Telegram BuildPC sendMessage failed:', err);
      setStep('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      aria-label="Build your PC"
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: 1040,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Background image */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/buildpc.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />

      {/* Dark overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.78) 100%)',
        }}
      />

      {/* Accent glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 55% 70% at 20% 50%, rgba(59,130,246,0.15) 0%, transparent 65%),
            radial-gradient(ellipse 45% 60% at 80% 60%, rgba(139,92,246,0.12) 0%, transparent 65%)
          `,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* LEFT — text block */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.80, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start"
          >
            {/* Badge */}
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.55)',
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.13)',
                padding: '7px 14px',
                borderRadius: 999,
                marginBottom: 28,
              }}
            >
              <Cpu size={10} strokeWidth={2.5} style={{ color: '#60A5FA' }} />
              {c.badge}
            </motion.span>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: 'clamp(36px, 5vw, 68px)',
                fontWeight: 900,
                letterSpacing: '-0.045em',
                lineHeight: 1.04,
                color: '#FFFFFF',
                fontFamily: '"Inter", var(--font-sans), sans-serif',
                marginBottom: 22,
              }}
            >
              {c.title1}<br />
              <span style={{ color: '#ffffff', fontWeight: 800 }}>
                {c.title2}
              </span>
            </motion.h2>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.20 }}
              style={{
                fontSize: 16,
                color: 'rgba(255,255,255,0.48)',
                lineHeight: 1.7,
                maxWidth: '40ch',
              }}
            >
              {c.body}
            </motion.p>
          </motion.div>

          {/* RIGHT — form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            {step === 'form' && (
              <form
                onSubmit={handleSubmit}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: 24,
                  padding: '36px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 18,
                }}
              >
                {/* Name */}
                <Field icon={<Phone size={13} strokeWidth={2.5} />} label={c.name_label}>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder={c.name_placeholder}
                    required
                    style={inputStyle}
                  />
                </Field>

                {/* Phone */}
                <Field icon={<Phone size={13} strokeWidth={2.5} />} label={c.phone_label}>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder={c.phone_placeholder}
                    required
                    style={inputStyle}
                  />
                </Field>

                {/* Budget */}
                <Field icon={<Wallet size={13} strokeWidth={2.5} />} label={c.budget_label}>
                  <input
                    type="text"
                    value={budget}
                    onChange={e => setBudget(e.target.value)}
                    placeholder={c.budget_placeholder}
                    required
                    style={inputStyle}
                  />
                </Field>

                {/* Purpose */}
                <Field icon={<Target size={13} strokeWidth={2.5} />} label={c.purpose_label}>
                  <select
                    value={purpose}
                    onChange={e => setPurpose(e.target.value)}
                    required
                    style={{ ...inputStyle, cursor: 'pointer' }}
                  >
                    <option value="" disabled style={{ background: '#1a1a1a' }}>{c.purpose_placeholder}</option>
                    {c.purposes.map(p => (
                      <option key={p} value={p} style={{ background: '#1a1a1a' }}>{p}</option>
                    ))}
                  </select>
                </Field>

                {/* Notes */}
                <Field icon={<Send size={13} strokeWidth={2.5} />} label={c.notes_label}>
                  <textarea
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder={c.notes_placeholder}
                    rows={2}
                    style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }}
                  />
                </Field>

                <motion.button
                  type="submit"
                  disabled={loading || !name.trim() || !phone.trim() || !budget.trim() || !purpose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: 14,
                    background: '#FFFFFF',
                    color: '#0A0A0B',
                    fontSize: 14,
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: (loading || !name.trim() || !phone.trim() || !budget.trim() || !purpose) ? 0.45 : 1,
                    transition: 'opacity 0.15s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    marginTop: 4,
                  }}
                >
                  <Send size={14} strokeWidth={2.5} />
                  {loading ? c.submitting : c.submit}
                </motion.button>
              </form>
            )}

            {step === 'success' && (
              <div
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: 24,
                  padding: '56px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: 18,
                }}
              >
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(52,199,89,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle size={30} strokeWidth={1.5} style={{ color: '#34C759' }} />
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: 0 }}>{c.success_title}</h3>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.50)', lineHeight: 1.65, maxWidth: '32ch', margin: 0 }}>{c.success_desc}</p>
                <button
                  onClick={reset}
                  style={{
                    marginTop: 8, padding: '12px 32px', borderRadius: 12,
                    background: '#FFFFFF', color: '#0A0A0B',
                    fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer',
                  }}
                >
                  OK
                </button>
              </div>
            )}

            {step === 'error' && (
              <div
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: 24,
                  padding: '56px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: 18,
                }}
              >
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,59,48,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AlertCircle size={30} strokeWidth={1.5} style={{ color: '#FF3B30' }} />
                </div>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.50)', lineHeight: 1.65, maxWidth: '32ch', margin: 0 }}>{c.error}</p>
                <button
                  onClick={() => setStep('form')}
                  style={{
                    marginTop: 8, padding: '12px 32px', borderRadius: 12,
                    background: '#FFFFFF', color: '#0A0A0B',
                    fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer',
                  }}
                >
                  {c.retry}
                </button>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '11px 16px',
  borderRadius: 12,
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.12)',
  color: '#FFFFFF',
  fontSize: 14,
  outline: 'none',
  fontFamily: 'inherit',
};

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      <label style={{
        display: 'flex', alignItems: 'center', gap: 6,
        fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
        textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)',
      }}>
        <span style={{ color: '#60A5FA' }}>{icon}</span>
        {label}
      </label>
      {children}
    </div>
  );
}
