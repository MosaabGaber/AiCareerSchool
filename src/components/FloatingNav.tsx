'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export function FloatingNav() {
  const router = useRouter();
  const pathname = usePathname();

  const handleJoinNow = () => {
    if (pathname === '/real-estate') {
      window.location.href = '/real-estate-checkout';
    } else if (pathname === '/v2') {
      window.location.href = '/checkout';
    } else {
      router.push('/checkout');
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center pt-14 px-4">
      <nav
        className={`w-full max-w-4xl flex items-center justify-between gap-4 pl-4 pr-3 py-3 rounded-full border ${pathname === '/real-estate' ? 'border-gray-200' : 'border-white/10'}`}
        style={{
          background: pathname === '/real-estate' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(10, 15, 35, 0.92)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: pathname === '/real-estate' ? '0 4px 20px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)' : '0 4px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)',
        }}
      >
        {/* Left: Logo + name */}
        <Link href="/" className="shrink-0 flex items-center gap-2 cursor-pointer">
          <div className="flex items-center justify-center">
            <img src="/logo.png" alt="AI Career School" className={`object-contain ${pathname === '/real-estate' ? '' : 'drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]'}`} style={{ width: '48px', height: '48px' }} />
          </div>
          <span className={`hidden sm:block font-outfit font-bold text-sm tracking-tight whitespace-nowrap ${pathname === '/real-estate' ? 'text-gray-900' : 'text-white/80'}`}>AI Career School</span>
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
                <span className={`mx-3 ${pathname === '/real-estate' ? 'text-gray-600' : 'text-white/70'}`}>Join</span>
                <span className={`font-bold mx-1 ${pathname === '/real-estate' ? 'text-[#00944d]' : 'text-blue-400'}`}>1,200+</span>
                <span className={`mx-1 ${pathname === '/real-estate' ? 'text-gray-600' : 'text-white/70'}`}>{pathname === '/real-estate' ? 'AGENTS' : 'students'}</span>
                <span className={`mx-3 ${pathname === '/real-estate' ? 'text-gray-300' : 'text-white/30'}`}>•</span>
                <span className={`mx-3 ${pathname === '/real-estate' ? 'text-[#00944d]' : 'text-neongreen'}`}>{pathname === '/real-estate' ? 'اهم أداة للسمسار في 2026' : 'اهم مهارة في 2026'}</span>
                <span className={`mx-3 ${pathname === '/real-estate' ? 'text-gray-300' : 'text-white/30'}`}>•</span>
                <span className={`mx-3 ${pathname === '/real-estate' ? 'text-gray-600' : 'text-white/70'}`}>ENROLLMENT NOW OPEN</span>
                <span className={`mx-3 ${pathname === '/real-estate' ? 'text-gray-300' : 'text-white/30'}`}>•</span>
                <span className={`font-bold mx-1 ${pathname === '/real-estate' ? 'text-[#00944d]' : 'text-blue-400'}`}>{pathname === '/real-estate' ? 'اكثر من 1,200 سمسار' : 'اكثر من 1,200 طالب'}</span>
                <span className={`mx-3 ${pathname === '/real-estate' ? 'text-gray-300' : 'text-white/30'}`}>•</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: JOIN NOW button */}
        <button
          onClick={handleJoinNow}
          className={`shrink-0 text-white font-bold px-6 py-2.5 rounded-full text-sm tracking-widest uppercase transition-all duration-200 active:scale-95 font-inter ${
            pathname === '/real-estate'
              ? 'bg-[#00944d] hover:bg-[#007a3e] shadow-[0_0_20px_rgba(0,148,77,0.3)] hover:shadow-[0_0_28px_rgba(0,148,77,0.5)]'
              : 'bg-blue-500 hover:bg-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_28px_rgba(59,130,246,0.7)]'
          }`}
        >
          {pathname === '/v2' || pathname === '/' || pathname === '/real-estate' ? 'إشترك الآن' : 'JOIN NOW'}
        </button>
      </nav>
    </div>
  );
}
