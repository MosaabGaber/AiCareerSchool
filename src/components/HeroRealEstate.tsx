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
          <h1 className="text-[2rem] md:text-[3.5rem] font-outfit font-extrabold text-gray-900 leading-tight mb-3 tracking-tight" dir="rtl">
            بيع عقارات أكتر باستخدام الذكاء الاصطناعي
          </h1>

          <h2 className="text-[1.6rem] font-outfit font-semibold text-gray-900 mb-4 tracking-wide">
            Sell More Properties with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00944d] to-[#00944d] glow-text inline-block">AI Image & Video</span>
          </h2>

          {showVideo && (
            <div className="w-full max-w-4xl mx-auto my-12 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(30,80,255,0.2)]">
              <div className="relative pt-[177.78%] md:pt-[56.25%]">
                <iframe
                  src="https://player.mediadelivery.net/embed/631325/969c4fa3-19d7-4d88-b745-b7789c98afe5?autoplay=false&loop=false&muted=false&preload=true&responsive=true"
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
              className="bg-white border border-gray-300 shadow-sm hover:border-gray-400 hover:shadow-md text-gray-900 rounded-full px-6 py-2 font-outfit text-sm hover:bg-gray-50 transition-all duration-300 cursor-pointer"
            >
              تفاصيل الكورس
            </button>
            <button
              onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white border border-gray-300 shadow-sm hover:border-gray-400 hover:shadow-md text-gray-900 rounded-full px-6 py-2 font-outfit text-sm hover:bg-gray-50 transition-all duration-300 cursor-pointer"
            >
              أسئلة شائعة
            </button>
          </div>

          <p className="text-[0.85rem] md:text-[0.95rem] text-gray-600 mb-8 md:mb-4 max-w-2xl mx-auto font-inter" dir="rtl">
            حوّل عقاراتك لمحتوى بصري احترافي. صور، فيديوهات، جولات افتراضية، وإعلانات ممولة — كلها بالذكاء الاصطناعي بدون مصور أو مصمم.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button
              onClick={onJoinClick}
              className="bg-transparent border-2 border-[#00944d] text-[#00944d] px-10 py-4 rounded-xl text-lg font-bold hover:bg-[#00944d] hover:text-white transition-all duration-300 group flex items-center gap-2"
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
