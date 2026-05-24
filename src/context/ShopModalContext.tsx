import {
  createContext, useContext, useState, useCallback, useMemo, type ReactNode, type FormEvent,
} from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, X, Send, ArrowLeft, CheckCircle, AlertCircle, Building2 } from 'lucide-react';
import { useLang } from './LanguageContext';
import { useRouter } from './RouterContext';

interface Ctx { open: (product?: string) => void; }
const ShopModalCtx = createContext<Ctx>({ open: () => {} });
export const useShopModal = () => useContext(ShopModalCtx);

interface ShopModalTr {
  title: string;
  call: string;
  call_sub: string;
  telegram: string;
  telegram_sub: string;
  tg_title: string;
  name_label: string;
  tg_label: string;
  name_placeholder: string;
  tg_placeholder: string;
  submit: string;
  sending: string;
  success_title: string;
  success_desc: string;
  back: string;
  error: string;
  b2b: string;
  b2b_sub: string;
}

type Step = 'main' | 'telegram' | 'success' | 'error';

const TG_TOKEN = '8713033309:AAGYWE99sTRdPxr9iOsbA8rmgqxPjbEb7xE';
const TG_CHAT  = '-1003949797911';

export function ShopModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen]       = useState(false);
  const [step, setStep]           = useState<Step>('main');
  const [productName, setProduct] = useState('');
  const [name, setName]           = useState('');
  const [tgHandle, setHandle]     = useState('');
  const [loading, setLoading]     = useState(false);

  const { tr } = useLang();
  const { navigate } = useRouter();
  const sm = (tr as unknown as { shopmodal: ShopModalTr }).shopmodal;

  const close = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => { setStep('main'); setName(''); setHandle(''); setProduct(''); }, 300);
  }, []);

  const open = useCallback((product?: string) => {
    setProduct(product ?? '');
    setIsOpen(true);
    setStep('main');
  }, []);
  const ctx  = useMemo(() => ({ open }), [open]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const productLine = productName ? `\n📦 Mahsulot: ${productName}` : '';
    const text = `🆕 New Lead — Bikon.uz\n\n👤 Ism: ${name}\n📱 Telefon / Telegram: ${tgHandle}${productLine}`;
    try {
      const fd = new FormData();
      fd.append('chat_id', TG_CHAT);
      fd.append('text', text);
      const res = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
        method: 'POST',
        body: fd,
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.description ?? 'api error');
      setStep('success');
    } catch (err) {
      console.error('Telegram sendMessage failed:', err);
      setStep('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ShopModalCtx.Provider value={ctx}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[500] bg-black/50 backdrop-blur-sm"
              onClick={close}
            />
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-[501] flex items-center justify-center p-6 pointer-events-none"
            >
              <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl pointer-events-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    {step === 'telegram' && (
                      <button
                        type="button"
                        onClick={() => setStep('main')}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5F5F7] hover:bg-[#E5E5EA] transition-colors duration-150 mr-1"
                      >
                        <ArrowLeft size={15} strokeWidth={2} className="text-[#6E6E73]" />
                      </button>
                    )}
                    <h2 className="text-[19px] font-semibold text-[#1D1D1F]">
                      {step === 'main' ? sm.title
                        : step === 'telegram' ? sm.tg_title
                        : ' '}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={close}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5F5F7] hover:bg-[#E5E5EA] transition-colors duration-150"
                  >
                    <X size={16} strokeWidth={2} className="text-[#6E6E73]" />
                  </button>
                </div>

                {/* Step: main — choose channel */}
                {step === 'main' && (
                  <div className="flex flex-col gap-3">
                    <a
                      href="tel:+998783338085"
                      className="flex items-center gap-4 bg-[#F5F5F7] rounded-2xl px-5 py-4 hover:bg-[#E5E5EA] transition-colors duration-150 no-underline"
                      onClick={close}
                    >
                      <div className="w-10 h-10 bg-[#34C759] rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone size={18} strokeWidth={2} className="text-white" />
                      </div>
                      <div>
                        <div className="text-[15px] font-semibold text-[#1D1D1F]">{sm.call}</div>
                        <div className="text-[13px] text-[#6E6E73]">{sm.call_sub}</div>
                      </div>
                    </a>

                    <button
                      type="button"
                      onClick={() => setStep('telegram')}
                      className="flex items-center gap-4 bg-[#F5F5F7] rounded-2xl px-5 py-4 hover:bg-[#E5E5EA] transition-colors duration-150 text-left w-full"
                    >
                      <div className="w-10 h-10 bg-[#0088cc] rounded-xl flex items-center justify-center flex-shrink-0">
                        <Send size={18} strokeWidth={2} className="text-white" />
                      </div>
                      <div>
                        <div className="text-[15px] font-semibold text-[#1D1D1F]">{sm.telegram}</div>
                        <div className="text-[13px] text-[#6E6E73]">{sm.telegram_sub}</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => { close(); navigate('/b2b'); }}
                      className="flex items-center gap-4 bg-[#F5F5F7] rounded-2xl px-5 py-4 hover:bg-[#E5E5EA] transition-colors duration-150 text-left w-full"
                    >
                      <div className="w-10 h-10 bg-[#1D1D1F] rounded-xl flex items-center justify-center flex-shrink-0">
                        <Building2 size={18} strokeWidth={2} className="text-white" />
                      </div>
                      <div>
                        <div className="text-[15px] font-semibold text-[#1D1D1F]">{sm.b2b}</div>
                        <div className="text-[13px] text-[#6E6E73]">{sm.b2b_sub}</div>
                      </div>
                    </button>
                  </div>
                )}

                {/* Step: telegram — contact form */}
                {step === 'telegram' && (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <label className="block text-[13px] font-semibold text-[#1D1D1F] mb-1.5">
                        {sm.name_label}
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder={sm.name_placeholder}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[#E5E5EA] text-[14px] text-[#1D1D1F] placeholder:text-[#AEAEB2] focus:outline-none focus:border-[#0066CC] transition-colors duration-150"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-[#1D1D1F] mb-1.5">
                        {sm.tg_label}
                      </label>
                      <input
                        type="text"
                        value={tgHandle}
                        onChange={e => setHandle(e.target.value)}
                        placeholder={sm.tg_placeholder}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[#E5E5EA] text-[14px] text-[#1D1D1F] placeholder:text-[#AEAEB2] focus:outline-none focus:border-[#0066CC] transition-colors duration-150"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading || !name.trim() || !tgHandle.trim()}
                      className="w-full py-3.5 rounded-xl bg-[#0088cc] text-white text-[14px] font-semibold transition-opacity duration-150 disabled:opacity-50 mt-1"
                    >
                      {loading ? sm.sending : sm.submit}
                    </button>
                  </form>
                )}

                {/* Step: success */}
                {step === 'success' && (
                  <div className="flex flex-col items-center text-center py-2">
                    <div className="w-14 h-14 bg-[#34C759]/10 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle size={28} strokeWidth={1.5} className="text-[#34C759]" />
                    </div>
                    <div className="text-[17px] font-semibold text-[#1D1D1F] mb-2">{sm.success_title}</div>
                    <div className="text-[14px] text-[#6E6E73] leading-relaxed">{sm.success_desc}</div>
                    <button
                      type="button"
                      onClick={close}
                      className="mt-6 w-full py-3 rounded-xl bg-[#F5F5F7] hover:bg-[#E5E5EA] text-[14px] font-semibold text-[#1D1D1F] transition-colors duration-150"
                    >
                      OK
                    </button>
                  </div>
                )}

                {/* Step: error */}
                {step === 'error' && (
                  <div className="flex flex-col items-center text-center py-2">
                    <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mb-4">
                      <AlertCircle size={28} strokeWidth={1.5} className="text-red-500" />
                    </div>
                    <div className="text-[14px] text-[#6E6E73] mb-4 leading-relaxed">{sm.error}</div>
                    <button
                      type="button"
                      onClick={() => setStep('telegram')}
                      className="w-full py-3 rounded-xl bg-[#F5F5F7] hover:bg-[#E5E5EA] text-[14px] font-semibold text-[#1D1D1F] transition-colors duration-150"
                    >
                      {sm.back}
                    </button>
                  </div>
                )}

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </ShopModalCtx.Provider>
  );
}
