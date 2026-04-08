'use client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare function fbq(...args: any[]): void;

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CreditCard } from 'lucide-react';

type Step = 'choose' | 'instapay' | 'vodafone';

interface V2PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function V2PaymentModal({ isOpen, onClose }: V2PaymentModalProps) {
  const [step, setStep] = useState<Step>('choose');

  // Reset to choose step whenever modal opens
  useEffect(() => {
    if (isOpen) setStep('choose');
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          key="v2-payment-modal"
          className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            key="v2-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0"
            style={{ background: 'rgba(5, 8, 20, 0.85)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
          />

          {/* Modal panel */}
          <motion.div
            key="v2-modal-panel"
            initial={{ scale: 0.92, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 24 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="relative z-10 w-full max-w-md rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(18,22,45,0.98) 0%, rgba(12,16,32,0.99) 100%)',
              border: '1px solid rgba(1,240,142,0.18)',
              boxShadow: '0 0 60px rgba(1,240,142,0.12), 0 25px 50px rgba(0,0,0,0.6)',
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="إغلاق"
              className="absolute top-4 right-4 z-20 text-gray-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10"
            >
              <X size={22} />
            </button>

            {/* Content container */}
            <div className="p-7 pt-6" dir="rtl">
              {/* === STEP 1: Choose === */}
              <AnimatePresence mode="wait">
                {step === 'choose' && (
                  <motion.div
                    key="choose"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.22 }}
                  >
                    <div className="text-center mb-7">
                      <p className="text-sm text-gray-400 mb-1 tracking-wide uppercase font-medium">
                        اختار طريقة الدفع
                      </p>
                      <h2 className="text-2xl font-outfit font-bold text-white">
                        إدفع{' '}
                        <span
                          className="text-transparent bg-clip-text"
                          style={{ backgroundImage: 'linear-gradient(90deg, #01F08E, #00c6ff)' }}
                        >
                          LE 950
                        </span>{' '}
                        دلوقتي
                      </h2>
                      <p className="text-gray-500 line-through text-sm mt-1">بدلاً من LE 2,500</p>
                    </div>

                    <div className="flex flex-col gap-4">
                      {/* Visa / Mastercard option (LemonSqueezy) */}
                      <a
                        href="https://aicareerschool.lemonsqueezy.com/checkout/buy/b2ae09ba-a9a8-4649-bbcf-fde6c76092da?embed=1"
                        className="lemonsqueezy-button group w-full flex items-center gap-4 p-5 rounded-xl border transition-all duration-200 cursor-pointer text-right no-underline"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          borderColor: 'rgba(99,102,241,0.25)',
                          textDecoration: 'none',
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(99,102,241,0.08)';
                          (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(99,102,241,0.55)';
                          (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 20px rgba(99,102,241,0.15)';
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.04)';
                          (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(99,102,241,0.25)';
                          (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
                        }}
                      >
                        {/* Credit card icon */}
                        <div
                          className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center"
                          style={{ background: 'rgba(99,102,241,0.12)', border: '1.5px solid rgba(99,102,241,0.35)' }}
                        >
                          <CreditCard size={26} style={{ color: '#818cf8' }} />
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-bold text-lg font-outfit">ادفع بالفيزا أو الماستركارد</p>
                          <p className="text-gray-400 text-sm mt-0.5">Visa / Mastercard / Debit Card</p>
                        </div>
                        <ArrowRight size={18} className="text-gray-500 group-hover:text-indigo-400 transition-colors flex-shrink-0" style={{ transform: 'scaleX(-1)' }} />
                      </a>

                      {/* Instapay option */}
                      <button
                        onClick={() => setStep('instapay')}
                        className="group w-full flex items-center gap-4 p-5 rounded-xl border transition-all duration-200 cursor-pointer text-right"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          borderColor: 'rgba(1,240,142,0.25)',
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(1,240,142,0.08)';
                          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(1,240,142,0.55)';
                          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 20px rgba(1,240,142,0.12)';
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)';
                          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(1,240,142,0.25)';
                          (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
                        }}
                      >
                        {/* InstaPay logo */}
                        <div
                          className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center"
                          style={{ background: 'rgba(1,240,142,0.1)', border: '1.5px solid rgba(1,240,142,0.3)' }}
                        >
                          <img
                            src="/payment/insta.png"
                            alt="Instapay"
                            className="w-10 h-10 object-contain"
                            onError={e => {
                              (e.target as HTMLImageElement).style.display = 'none';
                              (e.target as HTMLImageElement).nextElementSibling!.classList.remove('hidden');
                            }}
                          />
                          <span className="hidden text-neongreen text-xs font-bold">IP</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-bold text-lg font-outfit">Instapay</p>
                          <p className="text-gray-400 text-sm mt-0.5">ادفع عن طريق تطبيق Instapay</p>
                        </div>
                        <ArrowRight size={18} className="text-gray-500 group-hover:text-neongreen transition-colors flex-shrink-0" style={{ transform: 'scaleX(-1)' }} />
                      </button>

                      {/* Vodafone Cash option */}
                      <button
                        onClick={() => setStep('vodafone')}
                        className="group w-full flex items-center gap-4 p-5 rounded-xl border transition-all duration-200 cursor-pointer text-right"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          borderColor: 'rgba(230,0,0,0.25)',
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(230,0,0,0.07)';
                          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(230,0,0,0.5)';
                          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 20px rgba(230,0,0,0.1)';
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)';
                          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(230,0,0,0.25)';
                          (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
                        }}
                      >
                        {/* Vodafone Cash logo */}
                        <div
                          className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center"
                          style={{ background: 'rgba(230,0,0,0.1)', border: '1.5px solid rgba(230,0,0,0.3)' }}
                        >
                          <img
                            src="/payment/voda.png"
                            alt="Vodafone Cash"
                            className="w-10 h-10 object-contain"
                            onError={e => {
                              (e.target as HTMLImageElement).style.display = 'none';
                              (e.target as HTMLImageElement).nextElementSibling!.classList.remove('hidden');
                            }}
                          />
                          <span className="hidden text-red-500 text-xs font-bold">VC</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-bold text-lg font-outfit">فودافون كاش</p>
                          <p className="text-gray-400 text-sm mt-0.5">ادفع عن طريق فودافون كاش</p>
                        </div>
                        <ArrowRight size={18} className="text-gray-500 group-hover:text-red-400 transition-colors flex-shrink-0" style={{ transform: 'scaleX(-1)' }} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* === STEP 2: Instapay === */}
                {step === 'instapay' && (
                  <motion.div
                    key="instapay"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.22 }}
                    className="flex flex-col gap-5"
                  >
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <img src="/payment/insta.png" alt="Instapay" className="h-8 w-auto object-contain" />
                      </div>
                      <h2 className="text-xl font-outfit font-bold text-white">ادفع عن طريق Instapay</h2>
                    </div>

                    {/* Step 1 card */}
                    <div
                      className="rounded-xl p-5 text-center flex flex-col items-center gap-3"
                      style={{ background: 'rgba(1,240,142,0.06)', border: '1px solid rgba(1,240,142,0.2)' }}
                    >
                      <div
                        className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                        style={{ background: 'rgba(1,240,142,0.15)', color: '#01F08E' }}
                      >
                        الخطوة ١
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        اضغط على الرابط وهيودّيك على تطبيق Instapay تدفع على طول
                      </p>
                      <a
                        href="https://ipn.eg/S/mosaabgaber/instapay/5MzMB3"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => fbq('track', 'AddToCart', {currency: 'EGP', value: 950})}
                        className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-xl text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                        style={{
                          background: 'linear-gradient(135deg, #01F08E, #00c6ff)',
                          color: '#050814',
                          boxShadow: '0 0 20px rgba(1,240,142,0.3)',
                        }}
                      >
                        <img src="/payment/insta.png" alt="" className="h-5 w-auto object-contain" />
                        افتح رابط Instapay
                      </a>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-px bg-white/10" />
                      <span className="text-gray-500 text-sm">ثم</span>
                      <div className="flex-1 h-px bg-white/10" />
                    </div>

                    {/* Step 2 card */}
                    <div
                      className="rounded-xl p-5 text-center flex flex-col items-center gap-3"
                      style={{ background: 'rgba(37,211,102,0.05)', border: '1px solid rgba(37,211,102,0.2)' }}
                    >
                      <div
                        className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                        style={{ background: 'rgba(37,211,102,0.15)', color: '#25D366' }}
                      >
                        الخطوة ٢
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        بعد الدفع، ابعت السكرين شوت على واتساب
                      </p>
                      <a
                        href="https://wa.link/hc7cmh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-xl text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                        style={{
                          background: '#25D366',
                          color: '#fff',
                          boxShadow: '0 0 20px rgba(37,211,102,0.35)',
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                        </svg>
                        ابعت السكرين شوت على واتساب
                      </a>
                    </div>

                    {/* Back button */}
                    <button
                      onClick={() => setStep('choose')}
                      className="flex items-center gap-1.5 text-gray-500 hover:text-gray-300 transition-colors text-sm mx-auto mt-1"
                    >
                      <ArrowRight size={15} />
                      رجوع لاختيار طريقة الدفع
                    </button>
                  </motion.div>
                )}

                {/* === STEP 3: Vodafone Cash === */}
                {step === 'vodafone' && (
                  <motion.div
                    key="vodafone"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.22 }}
                    className="flex flex-col gap-5"
                  >
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <img src="/payment/voda.png" alt="Vodafone Cash" className="h-8 w-auto object-contain" />
                      </div>
                      <h2 className="text-xl font-outfit font-bold text-white">ادفع عن طريق فودافون كاش</h2>
                    </div>

                    {/* Step 1 card */}
                    <div
                      className="rounded-xl p-5 text-center flex flex-col items-center gap-3"
                      style={{ background: 'rgba(230,0,0,0.06)', border: '1px solid rgba(230,0,0,0.2)' }}
                    >
                      <div
                        className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                        style={{ background: 'rgba(230,0,0,0.15)', color: '#e60000' }}
                      >
                        الخطوة ١
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        ابعت المبلغ على الرقم:
                      </p>
                      <div
                        className="text-3xl font-outfit font-black tracking-widest"
                        style={{ color: '#e60000', letterSpacing: '0.1em' }}
                      >
                        01008176408
                      </div>
                      <p className="text-gray-400 text-sm">
                        افتح تطبيق فودافون كاش وابعت المبلغ على الرقم ده
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-px bg-white/10" />
                      <span className="text-gray-500 text-sm">ثم</span>
                      <div className="flex-1 h-px bg-white/10" />
                    </div>

                    {/* Step 2 card */}
                    <div
                      className="rounded-xl p-5 text-center flex flex-col items-center gap-3"
                      style={{ background: 'rgba(37,211,102,0.05)', border: '1px solid rgba(37,211,102,0.2)' }}
                    >
                      <div
                        className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                        style={{ background: 'rgba(37,211,102,0.15)', color: '#25D366' }}
                      >
                        الخطوة ٢
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        بعد الدفع، ابعت السكرين شوت على واتساب
                      </p>
                      <a
                        href="https://wa.link/hc7cmh"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => fbq('track', 'AddToCart', {currency: 'EGP', value: 950})}
                        className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-xl text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                        style={{
                          background: '#25D366',
                          color: '#fff',
                          boxShadow: '0 0 20px rgba(37,211,102,0.35)',
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                        </svg>
                        ابعت السكرين شوت على واتساب
                      </a>
                    </div>

                    {/* Back button */}
                    <button
                      onClick={() => setStep('choose')}
                      className="flex items-center gap-1.5 text-gray-500 hover:text-gray-300 transition-colors text-sm mx-auto mt-1"
                    >
                      <ArrowRight size={15} />
                      رجوع لاختيار طريقة الدفع
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
