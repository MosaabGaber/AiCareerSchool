'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ITEMS = [
  { text: 'Property Ads' },
  { text: 'Social Media Content' },
  { text: 'Property Tours' },
  { text: 'Interior Design' },
  { text: 'Floor Plans' },
];

export function LearnToCreateRealEstate() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ITEMS.length);
    }, 2800);

    return () => {
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
                  initial={{ y: 40, opacity: 1, scale: 0.95 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -40, opacity: 1, scale: 0.95 }}
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


    </section>
  );
}
