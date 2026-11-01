'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface WebCreationHeroProps {
  onCheckout: () => void;
}

const LEFT_IMAGES = [1, 2, 3, 4, 5].map((n) => `/images/site-${String(n).padStart(2, '0')}.webp`);
const RIGHT_IMAGES = [6, 7, 8, 9, 10].map((n) => `/images/site-${String(n).padStart(2, '0')}.webp`);

function rotate(images: string[], by: number) {
  return [...images.slice(by), ...images.slice(0, by)];
}

function CarouselTrack({
  images,
  direction,
  duration,
}: {
  images: string[];
  direction: 'up' | 'down';
  duration: number;
}) {
  const looped = [...images, ...images];
  return (
    <div
      className={`hero-carousel-track flex flex-col gap-4 ${direction === 'down' ? 'hero-scroll-down' : ''}`}
      style={{ animationDuration: `${duration}s` }}
    >
      {looped.map((src, i) => (
        <div
          key={`${src}-${i}`}
          className="hero-carousel-card relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-lg"
        >
          <Image src={src} alt="" aria-hidden="true" fill sizes="200px" className="object-cover" />
        </div>
      ))}
    </div>
  );
}

export function WebCreationHero({ onCheckout }: WebCreationHeroProps) {
  const mobileRowImages = [...LEFT_IMAGES, ...RIGHT_IMAGES, ...LEFT_IMAGES, ...RIGHT_IMAGES];

  return (
    <section
      className="relative w-full overflow-hidden bg-[#0a0a0a] min-h-[70vh] md:min-h-0 flex items-center justify-center pt-32 pb-12 md:pt-28 md:pb-16"
      style={{ perspective: '1000px' }}
    >
      {/* Left 3D carousel column */}
      <div
        aria-hidden="true"
        className="hero-carousel-col-left hidden lg:flex absolute inset-y-0 left-0 w-[220px] xl:w-[260px] gap-3 px-2 overflow-hidden pointer-events-none"
        style={{ transform: 'rotateY(25deg)' }}
      >
        <div className="flex-1 pointer-events-auto">
          <CarouselTrack images={LEFT_IMAGES} direction="up" duration={22} />
        </div>
        <div className="flex-1 pointer-events-auto">
          <CarouselTrack images={rotate(LEFT_IMAGES, 2)} direction="down" duration={28} />
        </div>
      </div>

      {/* Right 3D carousel column */}
      <div
        aria-hidden="true"
        className="hero-carousel-col-right hidden lg:flex absolute inset-y-0 right-0 w-[220px] xl:w-[260px] gap-3 px-2 overflow-hidden pointer-events-none"
        style={{ transform: 'rotateY(-25deg)' }}
      >
        <div className="flex-1 pointer-events-auto">
          <CarouselTrack images={RIGHT_IMAGES} direction="down" duration={24} />
        </div>
        <div className="flex-1 pointer-events-auto">
          <CarouselTrack images={rotate(RIGHT_IMAGES, 2)} direction="up" duration={30} />
        </div>
      </div>

      {/* Center content */}
      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Top Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-sm font-semibold mb-6">
            <Sparkles size={16} />
            <span>كورس شامل بدون كود • Web Creation Course</span>
          </div>

          {/* Headlines */}
          <h1
            className="text-[2.2rem] md:text-[3.8rem] font-outfit font-extrabold text-white leading-tight mb-4 tracking-tight"
            dir="rtl"
          >
            إنشاء مواقع احترافية بالذكاء الاصطناعي
          </h1>

          <h2 className="text-[1.3rem] md:text-[1.8rem] font-outfit font-semibold text-blue-400 mb-6 tracking-wide">
            Build Professional Websites with AI
          </h2>

          {/* Subtitles */}
          <p
            className="text-lg md:text-2xl font-outfit font-medium text-gray-200 mb-3 max-w-3xl mx-auto leading-relaxed"
            dir="rtl"
          >
            تعلم تبني مواقع ويب مذهلة بدون كود — وتبيعها بآلاف الجنيهات
          </p>

          <p className="text-sm md:text-base text-gray-400 font-inter mb-10 max-w-2xl mx-auto">
            Learn to build stunning websites without code — and sell them for thousands
          </p>

          {/* Quick Jump Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <button
              onClick={() => document.getElementById('highlights')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white/5 border border-white/15 text-gray-200 rounded-full px-5 py-2 font-outfit text-sm hover:bg-white/10 hover:border-white/25 transition-all cursor-pointer"
            >
              مميزات الكورس
            </button>
            <button
              onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white/5 border border-white/15 text-gray-200 rounded-full px-5 py-2 font-outfit text-sm hover:bg-white/10 hover:border-white/25 transition-all cursor-pointer"
            >
              تفاصيل المحتوى
            </button>
            <button
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white/5 border border-white/15 text-gray-200 rounded-full px-5 py-2 font-outfit text-sm hover:bg-white/10 hover:border-white/25 transition-all cursor-pointer"
            >
              الأسعار
            </button>
            <button
              onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white/5 border border-white/15 text-gray-200 rounded-full px-5 py-2 font-outfit text-sm hover:bg-white/10 hover:border-white/25 transition-all cursor-pointer"
            >
              أسئلة شائعة
            </button>
          </div>

          {/* CTA Button */}
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="inline-block">
            <button
              onClick={onCheckout}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-10 py-4 rounded-2xl text-lg md:text-xl font-bold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 transition-all duration-300 flex items-center gap-3 cursor-pointer"
              dir="rtl"
            >
              <span>اشترك الآن بـ 1,200 EGP</span>
              <ArrowRight size={22} className="rtl:rotate-180" />
            </button>
          </motion.div>

          {/* Mobile: horizontal auto-scrolling row (below 1024px, replaces side columns) */}
          <div aria-hidden="true" className="lg:hidden mt-10 -mx-6 overflow-hidden">
            <div className="hero-mobile-row flex gap-4 w-max px-6" style={{ animationDuration: '26s' }}>
              {mobileRowImages.map((src, i) => (
                <div
                  key={`${src}-m-${i}`}
                  className="relative aspect-video w-28 sm:w-32 flex-shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-lg"
                >
                  <Image src={src} alt="" aria-hidden="true" fill sizes="140px" className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Guarantees / Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-gray-400" dir="rtl">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-blue-400" /> وصول فوري ومدى الحياة
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-blue-400" /> بدون أي خبرة برمجة
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-blue-400" /> شهادة إتمام معتمدة
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
