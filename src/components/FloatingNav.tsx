'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export function FloatingNav() {
  const router = useRouter();
  const pathname = usePathname();

  const handleJoinNow = () => {
    if (pathname === '/v2') {
      window.dispatchEvent(new CustomEvent('open-v2-payment'));
    } else {
      router.push('/checkout');
    }
  };
  
  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center pt-4 px-4">
      <nav
        className="w-full max-w-4xl flex items-center justify-between gap-4 pl-4 pr-3 py-3 rounded-full border border-white/10"
        style={{
          background: 'rgba(10, 15, 35, 0.92)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: '0 4px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)',
        }}
      >
        {/* Left: Logo + name */}
        <Link href="/" className="shrink-0 flex items-center gap-2 cursor-pointer">
          <div className="flex items-center justify-center">
            <img src="/logo.png" alt="AI Career School" className="object-contain drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]" style={{ width: '48px', height: '48px' }} />
          </div>
          <span className="hidden sm:block font-outfit font-bold text-sm text-white/80 tracking-tight whitespace-nowrap">AI Career School</span>
        </Link>
        
        {/* Center: scrolling marquee */}
        <div className="flex-1 overflow-hidden mx-3 min-w-0" style={{ direction: 'ltr' }}>
          <motion.div
            className="flex whitespace-nowrap font-inter text-[13px] font-medium uppercase tracking-widest w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 18,
                ease: "linear",
              },
            }}
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex">
                <span className="text-white/70 mx-3">Join</span>
                <span className="text-blue-400 font-bold mx-1">1,200+</span>
                <span className="text-white/70 mx-1">students</span>
                <span className="text-white/30 mx-3">•</span>
                <span className="text-neongreen mx-3">اهم مهارة في 2026</span>
                <span className="text-white/30 mx-3">•</span>
                <span className="text-white/70 mx-3">ENROLLMENT NOW OPEN</span>
                <span className="text-white/30 mx-3">•</span>
                <span className="text-blue-400 font-bold mx-1">اكثر من 1,200 طالب</span>
                <span className="text-white/30 mx-3">•</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: JOIN NOW button */}
        <button
          onClick={handleJoinNow}
          className="shrink-0 bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-2.5 rounded-full text-sm tracking-widest uppercase transition-all duration-200 shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_28px_rgba(59,130,246,0.7)] active:scale-95 font-inter"
        >
          JOIN NOW
        </button>
      </nav>
    </div>
  );
}
