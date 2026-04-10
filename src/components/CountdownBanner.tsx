'use client';

import { useState, useEffect } from 'react';

const TARGET_DATE = new Date('2026-04-13T23:59:59+02:00').getTime();

function getTimeLeft() {
  const now = Date.now();
  const diff = TARGET_DATE - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  };
}

function pad(n: number) {
  return n.toString().padStart(2, '0');
}

function TimeBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="rounded-md font-bold text-white text-sm md:text-base px-2 py-0.5 min-w-[32px] md:min-w-[36px] text-center"
        style={{ background: 'rgba(1, 240, 142, 0.4)', border: '1px solid rgba(1, 240, 142, 0.6)' }}
      >
        {value}
      </div>
      <span className="text-[9px] md:text-[10px] text-white/50 mt-0.5">{label}</span>
    </div>
  );
}

export function CountdownBanner() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (time.expired) {
    return (
      <div
        className="w-full py-2 text-center fixed top-0 z-[90]"
        style={{
          background: 'hsla(160, 100%, 47%, 0.85)',
          borderBottom: '1px solid hsla(160, 100%, 47%, 0.95)',
        }}
      >
        <span className="text-white font-outfit font-bold text-sm">
          انتهى العرض
        </span>
      </div>
    );
  }

  return (
    <div
      className="w-full py-2 fixed top-0 z-[90] overflow-hidden"
      style={{
        background: 'hsla(160, 100%, 47%, 0.85)',
        borderBottom: '1px solid hsla(160, 100%, 47%, 0.95)',
      }}
    >
      {/* Desktop */}
      <div className="hidden md:flex items-center justify-center gap-4" dir="rtl">
        <span className="text-white font-outfit font-bold text-sm">
          ⏳ العرض لأول 200 شخص فقط وينتهي خلال
        </span>
        <div className="flex items-center gap-1.5" dir="ltr">
          <TimeBox value={pad(time.days)} label="Days" />
          <span className="text-neongreen font-bold text-sm mt-[-10px]">:</span>
          <TimeBox value={pad(time.hours)} label="Hours" />
          <span className="text-neongreen font-bold text-sm mt-[-10px]">:</span>
          <TimeBox value={pad(time.minutes)} label="Min" />
          <span className="text-neongreen font-bold text-sm mt-[-10px]">:</span>
          <TimeBox value={pad(time.seconds)} label="Sec" />
        </div>
      </div>

      {/* Mobile - scrolling text with timer */}
      <div className="md:hidden flex items-center justify-center gap-3 px-2">
        <div className="flex-shrink-0 flex items-center gap-1" dir="ltr">
          <TimeBox value={pad(time.days)} label="D" />
          <span className="text-neongreen font-bold text-xs mt-[-10px]">:</span>
          <TimeBox value={pad(time.hours)} label="H" />
          <span className="text-neongreen font-bold text-xs mt-[-10px]">:</span>
          <TimeBox value={pad(time.minutes)} label="M" />
          <span className="text-neongreen font-bold text-xs mt-[-10px]">:</span>
          <TimeBox value={pad(time.seconds)} label="S" />
        </div>
        <div className="overflow-hidden flex-1 min-w-0">
          <div
            className="whitespace-nowrap inline-block"
            style={{ animation: 'marquee 12s linear infinite' }}
            dir="rtl"
          >
            <span className="text-white font-outfit font-bold text-xs mx-4">
              ⏳ العرض لأول 200 شخص فقط
            </span>
            <span className="text-white font-outfit font-bold text-xs mx-4">
              ⏳ العرض لأول 200 شخص فقط
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
