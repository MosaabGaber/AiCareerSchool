'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useVelocity,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface WebCreationHeroProps {
  onCheckout: () => void;
}

const ALL_IMAGES = Array.from({ length: 11 }, (_, i) => `/images/site-${String(i + 1).padStart(2, '0')}.webp`);

// Deterministic (hydration-safe) per-row shuffle: walking ALL_IMAGES with a
// step coprime to its length visits every image exactly once in a different
// order each time, so neighboring rows never show the same image in sync.
function deterministicShuffle(step: number, offset: number) {
  const n = ALL_IMAGES.length;
  const order: number[] = [];
  for (let i = 0; i < n; i++) {
    order.push((i * step + offset) % n);
  }
  return order.map((idx) => ALL_IMAGES[idx]);
}

const ROW_LEFT_TOP = deterministicShuffle(3, 0);
const ROW_LEFT_BOTTOM = deterministicShuffle(5, 2);
const ROW_RIGHT_TOP = deterministicShuffle(7, 4);
const ROW_RIGHT_BOTTOM = deterministicShuffle(9, 6);
const MOBILE_ROW = deterministicShuffle(2, 1);

const WIDTH_BASE = [220, 270, 240, 300, 210, 260];

function rotateArray<T>(arr: T[], by: number) {
  return [...arr.slice(by), ...arr.slice(0, by)];
}

function MarqueeRow({
  images,
  direction,
  speed,
  widths,
  scrollVelocity,
}: {
  images: string[];
  direction: 1 | -1;
  speed: number;
  widths: number[];
  scrollVelocity: MotionValue<number>;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const widthRef = useRef(0);
  const initializedRef = useRef(false);
  const x = useMotionValue(0);
  const [paused, setPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.scrollWidth / 2;
      widthRef.current = w;
      if (!initializedRef.current && w > 0) {
        x.set(direction === 1 ? -w : 0);
        initializedRef.current = true;
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [direction, x]);

  useAnimationFrame((_, delta) => {
    if (shouldReduceMotion || paused) return;
    const w = widthRef.current;
    if (!w) return;
    const dt = delta / 1000;
    const boost = Math.min(Math.abs(scrollVelocity.get()) * 0.08, 60);
    let next = x.get() + direction * (speed + boost) * dt;
    if (direction === -1 && next <= -w) next += w;
    if (direction === 1 && next >= 0) next -= w;
    x.set(next);
  });

  const looped = [...images, ...images];

  return (
    <motion.div
      ref={trackRef}
      className="flex gap-8 md:gap-10 w-max pointer-events-auto"
      style={{ x }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {looped.map((src, i) => (
        <div
          key={`${src}-${i}`}
          className="hero-carousel-card relative flex-shrink-0 aspect-[16/10] overflow-hidden rounded-xl border border-[#E5E5E5] bg-[#F5F5F7] shadow-lg"
          style={{ width: `${widths[i % widths.length]}px` }}
        >
          <Image src={src} alt="" aria-hidden="true" fill sizes="300px" className="object-cover" />
        </div>
      ))}
    </motion.div>
  );
}

export function WebCreationHero({ onCheckout }: WebCreationHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const shouldReduceMotion = useReducedMotion();
  const parallaxY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 40]);

  return (
    <div className="bg-white" ref={heroRef}>
      <section
        className="relative w-full overflow-hidden min-h-[75vh] md:min-h-[80vh] flex items-center justify-center pt-32 pb-10 md:pt-28"
        style={{ perspective: '1200px' }}
      >
        {/* Left 3D corridor: 2 horizontal rows, tilted to recede toward center */}
        <div
          aria-hidden="true"
          className="hero-corridor-left hidden lg:flex absolute inset-y-0 left-[-8%] w-[43%] flex-col justify-center gap-8 md:gap-10 overflow-hidden pointer-events-none"
          style={{ transform: 'rotateY(55deg)', transformOrigin: '0% 50%' }}
        >
          <MarqueeRow images={ROW_LEFT_TOP} direction={-1} speed={26} widths={WIDTH_BASE} scrollVelocity={scrollVelocity} />
          <MarqueeRow images={ROW_LEFT_BOTTOM} direction={1} speed={20} widths={rotateArray(WIDTH_BASE, 2)} scrollVelocity={scrollVelocity} />
        </div>

        {/* Right 3D corridor */}
        <div
          aria-hidden="true"
          className="hero-corridor-right hidden lg:flex absolute inset-y-0 right-[-8%] w-[43%] flex-col justify-center gap-8 md:gap-10 overflow-hidden pointer-events-none"
          style={{ transform: 'rotateY(-55deg)', transformOrigin: '100% 50%' }}
        >
          <MarqueeRow images={ROW_RIGHT_TOP} direction={1} speed={24} widths={rotateArray(WIDTH_BASE, 4)} scrollVelocity={scrollVelocity} />
          <MarqueeRow images={ROW_RIGHT_BOTTOM} direction={-1} speed={30} widths={rotateArray(WIDTH_BASE, 1)} scrollVelocity={scrollVelocity} />
        </div>

        {/* Center content: headline, one subtitle line, CTA */}
        <motion.div className="container mx-auto px-6 relative z-10 text-center max-w-4xl" style={{ y: parallaxY }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1
              className="text-[2.2rem] md:text-[3.8rem] font-outfit font-extrabold text-[#111111] leading-tight mb-6 tracking-tight"
              dir="rtl"
            >
              إنشاء مواقع احترافية بالذكاء الاصطناعي
            </h1>

            <p
              className="text-lg md:text-2xl font-outfit font-medium text-[#333333] mb-10 max-w-3xl mx-auto leading-relaxed"
              dir="rtl"
            >
              تعلم تبني مواقع ويب مذهلة بدون كود — وتبيعها بآلاف الجنيهات
            </p>

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

            {/* Mobile fallback: single horizontal auto-scrolling row, no tilt */}
            <div aria-hidden="true" className="lg:hidden mt-10 -mx-6 overflow-hidden">
              <div className="hero-mobile-row flex gap-4 w-max px-6">
                {[...MOBILE_ROW, ...MOBILE_ROW].map((src, i) => (
                  <div
                    key={`${src}-m-${i}`}
                    className="relative aspect-[16/10] w-32 sm:w-36 flex-shrink-0 overflow-hidden rounded-xl border border-[#E5E5E5] bg-[#F5F5F7] shadow-lg"
                  >
                    <Image src={src} alt="" aria-hidden="true" fill sizes="150px" className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Secondary hero content: badge, English lines, quick-jump pills, guarantees */}
      <div className="relative z-10 bg-white pb-14 md:pb-20">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-semibold mb-6 shadow-sm">
            <Sparkles size={16} />
            <span>كورس شامل بدون كود • Web Creation Course</span>
          </div>

          <h2 className="text-[1.3rem] md:text-[1.8rem] font-outfit font-semibold text-blue-600 mb-4 tracking-wide">
            Build Professional Websites with AI
          </h2>

          <p className="text-sm md:text-base text-gray-500 font-inter mb-10 max-w-2xl mx-auto">
            Learn to build stunning websites without code — and sell them for thousands
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <button
              onClick={() => document.getElementById('highlights')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white border border-gray-300 shadow-sm hover:border-gray-400 hover:shadow-md text-gray-800 rounded-full px-5 py-2 font-outfit text-sm hover:bg-gray-50 transition-all cursor-pointer"
            >
              مميزات الكورس
            </button>
            <button
              onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white border border-gray-300 shadow-sm hover:border-gray-400 hover:shadow-md text-gray-800 rounded-full px-5 py-2 font-outfit text-sm hover:bg-gray-50 transition-all cursor-pointer"
            >
              تفاصيل المحتوى
            </button>
            <button
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white border border-gray-300 shadow-sm hover:border-gray-400 hover:shadow-md text-gray-800 rounded-full px-5 py-2 font-outfit text-sm hover:bg-gray-50 transition-all cursor-pointer"
            >
              الأسعار
            </button>
            <button
              onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white border border-gray-300 shadow-sm hover:border-gray-400 hover:shadow-md text-gray-800 rounded-full px-5 py-2 font-outfit text-sm hover:bg-gray-50 transition-all cursor-pointer"
            >
              أسئلة شائعة
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500" dir="rtl">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-blue-600" /> وصول فوري ومدى الحياة
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-blue-600" /> بدون أي خبرة برمجة
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-blue-600" /> شهادة إتمام معتمدة
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
