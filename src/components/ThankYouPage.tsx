'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get('success') === 'true';

  useEffect(() => {
    if (isSuccess && typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'Purchase', { currency: 'EGP', value: 950 });
    }
  }, [isSuccess]);

  if (!isSuccess) {
    /* ── Payment failed / no success param ── */
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4 py-16"
        dir="rtl"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className="relative w-full max-w-lg text-center rounded-2xl overflow-hidden p-8 sm:p-12"
          style={{
            background:
              'linear-gradient(145deg, rgba(18,22,45,0.98) 0%, rgba(12,16,32,0.99) 100%)',
            border: '1px solid rgba(239,68,68,0.25)',
            boxShadow:
              '0 0 80px rgba(239,68,68,0.08), 0 25px 60px rgba(0,0,0,0.5)',
          }}
        >
          {/* Decorative glow */}
          <div
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(239,68,68,0.15) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />

          {/* Error icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.2 }}
            className="relative mx-auto mb-6 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(239,68,68,0.12)',
              border: '2px solid rgba(239,68,68,0.35)',
            }}
          >
            <svg
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative text-2xl sm:text-3xl font-outfit font-bold mb-4 text-red-400"
          >
            حدث خطأ في الدفع
          </motion.h1>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="relative text-gray-400 text-base sm:text-lg leading-relaxed mb-8"
          >
            للأسف لم تتم عملية الدفع بنجاح. ممكن تحاول تاني أو تتواصل معانا لو
            محتاج مساعدة.
          </motion.p>

          {/* Retry CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link
              href="/checkout"
              className="relative inline-flex items-center justify-center gap-2 font-bold text-base sm:text-lg px-8 py-4 rounded-xl transition-all duration-200 no-underline hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #ef4444, #f97316)',
                color: '#fff',
                boxShadow: '0 0 30px rgba(239,68,68,0.3)',
                textDecoration: 'none',
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
              حاول مرة أخرى
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  /* ── Payment succeeded ── */
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-16"
      dir="rtl"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        className="relative w-full max-w-lg text-center rounded-2xl overflow-hidden p-8 sm:p-12"
        style={{
          background:
            'linear-gradient(145deg, rgba(18,22,45,0.98) 0%, rgba(12,16,32,0.99) 100%)',
          border: '1px solid rgba(1,240,142,0.2)',
          boxShadow:
            '0 0 80px rgba(1,240,142,0.1), 0 25px 60px rgba(0,0,0,0.5)',
        }}
      >
        {/* Decorative glow */}
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(1,240,142,0.18) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.2 }}
          className="relative mx-auto mb-6 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(1,240,142,0.12)',
            border: '2px solid rgba(1,240,142,0.35)',
          }}
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#01F08E"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative text-2xl sm:text-3xl font-outfit font-bold mb-4"
        >
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: 'linear-gradient(90deg, #01F08E, #00c6ff)',
            }}
          >
            تم الدفع بنجاح! 🎉
          </span>
        </motion.h1>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="relative text-gray-300 text-base sm:text-lg leading-relaxed mb-8"
        >
          مبروك، أنت رسمياً من طلاب AI Career School! ابعتلنا رسالة على الواتساب
          عشان نبعتلك لينك الدخول للكورس فوراً.
        </motion.p>

        {/* WhatsApp CTA */}
        <motion.a
          href="https://wa.me/201065716446?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D9%86%D8%A7%20%D8%AF%D9%81%D8%B9%D8%AA%20%D8%A7%D9%84%D8%A7%D8%B4%D8%AA%D8%B1%D8%A7%D9%83%20%D9%81%D9%8A%20AI%20Career%20School%20%D9%88%D9%85%D8%AD%D8%AA%D8%A7%D8%AC%20%D9%84%D9%8A%D9%86%D9%83%20%D8%A7%D9%84%D8%AF%D8%AE%D9%88%D9%84%20%D9%84%D9%84%D9%83%D9%88%D8%B1%D8%B3."
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="relative inline-flex items-center justify-center gap-3 font-bold text-base sm:text-lg px-8 py-4 rounded-xl transition-shadow duration-200 no-underline"
          style={{
            background: '#25D366',
            color: '#fff',
            boxShadow: '0 0 30px rgba(37,211,102,0.4)',
            textDecoration: 'none',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
          </svg>
          تواصل معنا على واتساب
        </motion.a>

        {/* Subtle confetti-like particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                background: i % 2 === 0 ? '#01F08E' : '#00c6ff',
                left: `${15 + i * 14}%`,
                top: '-4px',
              }}
              initial={{ y: 0, opacity: 1 }}
              animate={{
                y: [0, 120 + i * 30],
                opacity: [1, 0],
                x: [0, (i % 2 === 0 ? 1 : -1) * (10 + i * 5)],
              }}
              transition={{
                duration: 1.8 + i * 0.2,
                delay: 0.4 + i * 0.1,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
