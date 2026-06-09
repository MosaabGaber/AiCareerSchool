'use client';

import { motion } from 'framer-motion';
import { CourseContentSection } from './CourseContentSection';

interface HeroProps {
  onJoinClick: () => void;
  showVideo?: boolean;
}

export function Hero({ onJoinClick }: HeroProps) {
  return (
    <section className="relative min-h-[70vh] md:min-h-0 flex items-center justify-center pt-32 pb-6 md:pt-28 md:pb-4 overflow-hidden">


      <div className="container mx-auto px-6 relative z-10 text-center max-w-full">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0 }}
          className="w-full"
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="text-[2rem] md:text-[3.5rem] font-outfit font-extrabold text-white leading-tight mb-3 tracking-tight">
              Learn AI Image & <span className="text-transparent bg-clip-text bg-gradient-to-r from-neongreen to-softcyan glow-text inline-block">
                Video Creation
              </span>
            </h1>

            <h2 className="text-[1.6rem] font-outfit font-semibold text-white mb-4 tracking-wide" dir="rtl">
              إتعلم صناعة الصور و الفيديوهات بالذكاء الاصطناعي
            </h2>
          </div>

          <CourseContentSection />

          <div className="max-w-4xl mx-auto mt-8">
            <p className="text-[0.85rem] md:text-[0.95rem] text-gray-400 mb-8 md:mb-4 max-w-2xl mx-auto font-inter">
              Turn your imagination into stunning visuals. Learn the latest AI tools, prompt engineering, and production workflows to stay ahead of the curve.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block mb-6 mt-2"
            >
              <button
                onClick={onJoinClick}
                className="bg-transparent border-2 border-neongreen text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-neongreen hover:text-darkspace transition-all duration-300 glow-border group flex items-center gap-2"
              >
                Join now
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </motion.div>

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
          </div>
        </motion.div>
      </div>
    </section>
  );
}

