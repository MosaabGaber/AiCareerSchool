'use client';

import { motion } from 'framer-motion';

interface HeroProps {
  onJoinClick: () => void;
  showVideo?: boolean;
}

export function HeroRealEstate({ onJoinClick, showVideo }: HeroProps) {
  return (
    <section className="relative min-h-[70vh] md:min-h-0 flex items-center justify-center pt-32 pb-6 md:pt-28 md:pb-4 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-[2rem] md:text-[3.5rem] font-outfit font-extrabold text-white leading-tight mb-3 tracking-tight">
            Sell More Properties with <span className="text-transparent bg-clip-text bg-gradient-to-r from-neongreen to-softcyan glow-text inline-block">
              AI Image & Video
            </span>
          </h1>

          <h2 className="text-[1.6rem] font-outfit font-semibold text-white mb-4 tracking-wide" dir="rtl">
            بيع أكتر عقارات باستخدام الذكاء الاصطناعي
          </h2>

          {showVideo && (
            <div className="w-full max-w-4xl mx-auto my-12 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(30,80,255,0.2)]">
              <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                <iframe
                  src="https://player.mediadelivery.net/embed/631325/71395d57-c96a-40fe-b62a-c2def1c653a6?autoplay=false&loop=false&muted=false&preload=true&responsive=true"
                  loading="eager"
                  style={{ border: 0, position: 'absolute', top: 0, height: '100%', width: '100%' }}
                  allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
                  allowFullScreen={true}
                ></iframe>
              </div>
            </div>
          )}

          <div className="flex items-center justify-center gap-3 mb-6">
            <button
              onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-transparent border border-blue-500/40 shadow-[0_0_10px_rgba(59,130,246,0.2)] hover:border-blue-400/60 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] text-white rounded-full px-6 py-2 font-outfit text-sm hover:bg-white/10 transition-all duration-300 cursor-pointer"
            >
              تفاصيل الكورس
            </button>
            <button
              onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-transparent border border-blue-500/40 shadow-[0_0_10px_rgba(59,130,246,0.2)] hover:border-blue-400/60 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] text-white rounded-full px-6 py-2 font-outfit text-sm hover:bg-white/10 transition-all duration-300 cursor-pointer"
            >
              أسئلة شائعة
            </button>
          </div>

          <p className="text-[0.85rem] md:text-[0.95rem] text-gray-400 mb-8 md:mb-4 max-w-2xl mx-auto font-inter" dir="rtl">
            حوّل عقاراتك لمحتوى بصري احترافي. صور، فيديوهات، جولات افتراضية، وإعلانات ممولة — كلها بالذكاء الاصطناعي بدون مصور أو مصمم.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button
              onClick={onJoinClick}
              className="bg-transparent border-2 border-neongreen text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-neongreen hover:text-darkspace transition-all duration-300 glow-border group flex items-center gap-2"
              dir="rtl"
            >
              اشترك الآن
              <span className="group-hover:-translate-x-1 transition-transform flex items-center group-hover:rtl:translate-x-0 rtl:rotate-180">→</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
