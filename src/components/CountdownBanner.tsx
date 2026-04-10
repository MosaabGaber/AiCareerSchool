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
        className="w-full py-3 text-center border-b border-white/10 sticky top-0 z-[60]"
        style={{ background: 'rgba(20, 25, 45, 0.95)', backdropFilter: 'blur(12px)' }}
        dir="rtl"
      >
        <span className="text-white font-outfit font-bold text-sm md:text-base">
          انتهى العرض
        </span>
      </div>
    );
  }

  return (
    <div
      className="w-full py-3 text-center border-b border-white/10 sticky top-0 z-[60]"
      style={{ background: 'rgba(20, 25, 45, 0.95)', backdropFilter: 'blur(12px)' }}
      dir="rtl"
    >
      <span className="text-white font-outfit font-medium text-sm md:text-base">
        العرض لأول 200 شخص فقط وينتهي خلال{' '}
      </span>
      <span className="text-neongreen font-outfit font-bold text-sm md:text-base">
        {pad(time.days)} يوم : {pad(time.hours)} ساعة : {pad(time.minutes)} دقيقة : {pad(time.seconds)} ثانية
      </span>
    </div>
  );
}
