import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ITEMS = [
  { text: 'Ads', images: ['/examples/commercials-1.jpg', '/examples/commercials-2.jpg', '/examples/commercials-3.jpg'] },
  { text: 'UGC', images: ['/examples/ugc-1.jpg', '/examples/ugc-2.jpg', '/examples/ugc-3.jpg'] },
  { text: 'Branding', images: ['/examples/branding-1.jpg', '/examples/branding-2.jpg', '/examples/branding-3.jpg'] },
  { text: 'Social Media Content', images: ['/examples/social-1.jpg', '/examples/social-2.jpg', '/examples/social-3.jpg'] },
  { text: 'Cartoons', images: ['/examples/cartoons-1.jpg', '/examples/cartoons-2.jpg', '/examples/cartoons-3.jpg'] },
  { text: 'Commercials', images: ['/examples/ad-1.jpg', '/examples/ad-2.jpg', '/examples/ad-3.jpg'] },
];

export function LearnToCreate() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [offsetBase, setOffsetBase] = useState(420);

  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + ITEMS.length) % ITEMS.length);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(deltaX) > 40) {
      if (deltaX > 0) goTo(activeIndex + 1);
      else goTo(activeIndex - 1);
    }
    touchStartX.current = null;
  };

  useEffect(() => {
    const handleResize = () => {
      setOffsetBase(window.innerWidth < 768 ? 280 : 450);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ITEMS.length);
    }, 2800);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, []);

  return (
    <section id="showcase" className="pt-0 pb-4 md:pb-32 overflow-hidden relative">


      {/* Heading */}
      <div className="container mx-auto px-6 mb-6 md:mb-20 relative z-10">
        <div className="text-center">
          <h2 className="text-[2rem] md:text-[3rem] font-outfit font-extrabold text-white mb-4 tracking-tight flex flex-col md:flex-row items-center justify-center gap-1 md:gap-6">
            <span>Learn to Create:</span>
            <div className="h-[1.2em] relative flex items-center min-w-full md:min-w-[480px] justify-center md:justify-start">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={activeIndex}
                  initial={{ y: 40, opacity: 0, scale: 0.95 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -40, opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30, duration: 0.5 }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-neongreen to-softcyan glow-text absolute left-0 right-0 md:text-left text-center drop-shadow-[0_0_15px_rgba(1,240,142,0.3)]"
                >
                  {ITEMS[activeIndex].text}
                </motion.span>
              </AnimatePresence>
            </div>
          </h2>
        </div>
      </div>

      {/* ── MOBILE CAROUSEL ── */}
      {/* Each slide is a vertical stack of 3 images; the track slides by 100vw per step */}
      <div
        className="md:hidden relative w-full"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex"
          style={{
            transform: `translateX(calc(-${activeIndex * 100}vw))`,
            transition: 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
            willChange: 'transform',
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.text}
              className="flex-shrink-0 w-screen flex flex-col items-center gap-3 px-5"
              style={{ pointerEvents: 'none' }}
            >
              {item.images.map((imgSrc, imgIndex) => (
                <div
                  key={imgIndex}
                  className="w-[90vw] rounded-2xl overflow-hidden"
                  style={{
                    height: '280px',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                  }}
                >
                  <img
                    src={imgSrc}
                    alt={`${item.text} visual ${imgIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {ITEMS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{ pointerEvents: 'auto' }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-neongreen scale-125' : 'bg-white/30'
                }`}
            />
          ))}
        </div>
      </div>

      {/* ── DESKTOP CAROUSEL ── */}
      <div className="hidden md:flex relative w-full h-[350px] items-center justify-center mt-10">
        {ITEMS.map((item, index) => {
          const offset = index - activeIndex;
          const isCentered = index === activeIndex;
          const xPx = offset * (offsetBase * 2.5);
          const rotateY = offset * -15;

          return (
            <div
              key={item.text}
              className="absolute flex items-center justify-center gap-8"
              style={{
                transform: `translateX(${xPx}px) rotateY(${rotateY}deg) translateZ(0)`,
                transition: 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: isCentered ? 20 : 10 - Math.abs(offset),
                perspective: 1000,
                willChange: 'transform',
                pointerEvents: 'none',
              }}
            >
              {item.images.map((imgSrc, imgIndex) => (
                <div
                  key={`${item.text}-${imgIndex}`}
                  className="relative w-[250px] h-[350px] rounded-[2rem] overflow-hidden"
                  style={{
                    zIndex: imgIndex === 1 ? 2 : 1,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                  }}
                >
                  <img
                    src={imgSrc}
                    alt={`${item.text} visual ${imgIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          );
        })}


      </div>
    </section>
  );
}
