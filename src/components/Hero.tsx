'use client';

import { motion } from 'framer-motion';

interface HeroProps {
  onJoinClick: () => void;
  showVideo?: boolean;
}

export function Hero({ onJoinClick, showVideo }: HeroProps) {
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
            Learn AI Image & <span className="text-transparent bg-clip-text bg-gradient-to-r from-neongreen to-softcyan glow-text inline-block">
              Video Creation
            </span>
          </h1>

          <h2 className="text-[1.6rem] font-outfit font-semibold text-white mb-4 tracking-wide" dir="rtl">
            إتعلم صناعة الصور و الفيديوهات بالذكاء الاصطناعي
          </h2>

          {showVideo && (
            <div className="w-full max-w-4xl mx-auto my-12 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(30,80,255,0.2)]">
              <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                <iframe
                  src="https://player.mediadelivery.net/embed/631325/71395d57-c96a-40fe-b62a-c2def1c653a6?autoplay=false&loop=false&muted=false&preload=true&responsive=true"
                  loading="lazy"
                  style={{ border: 0, position: 'absolute', top: 0, height: '100%', width: '100%' }}
                  allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
                  allowFullScreen={true}
                ></iframe>
              </div>
            </div>
          )}

          <p className="text-[0.85rem] md:text-[0.95rem] text-gray-400 mb-8 md:mb-4 max-w-2xl mx-auto font-inter">
            Turn your imagination into stunning visuals. Learn the latest AI tools, prompt engineering, and production workflows to stay ahead of the curve.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button
              onClick={onJoinClick}
              className="bg-transparent border-2 border-neongreen text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-neongreen hover:text-darkspace transition-all duration-300 glow-border group flex items-center gap-2"
            >
              Join now
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
