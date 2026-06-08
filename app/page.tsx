'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const VIDEOS = [
  "https://player.mediadelivery.net/embed/631325/5ed1633b-2b53-466b-adcd-c47bbf4079cb?autoplay=false&loop=false&muted=false&preload=true&responsive=true",
  "https://player.mediadelivery.net/embed/631325/3010c6f6-3ec2-4ff3-8b44-40bff2951bd8?autoplay=false&loop=false&muted=false&preload=true&responsive=true",
  "https://player.mediadelivery.net/embed/631325/74663dce-354a-43f0-be2e-7387416bda57?autoplay=false&loop=false&muted=false&preload=true&responsive=true",
  "https://player.mediadelivery.net/embed/631325/8faa0a23-d62b-45cc-88a1-9fe656532e8f?autoplay=false&loop=false&muted=false&preload=true&responsive=true",
  "https://player.mediadelivery.net/embed/631325/b0bc555e-ff1f-496e-a577-67fa605b8644?autoplay=false&loop=false&muted=false&preload=true&responsive=true",
  "https://player.mediadelivery.net/embed/631325/f035ddc9-c48e-4cea-b2a0-6fc0f16d8e17?autoplay=false&loop=false&muted=false&preload=true&responsive=true",
  "https://player.mediadelivery.net/embed/631325/d1d7092f-674b-4053-b3cf-d75e0191eae8?autoplay=false&loop=false&muted=false&preload=true&responsive=true",
  "https://player.mediadelivery.net/embed/631325/3ca5cc9d-3958-4e2a-be93-15cc09ec9fd1?autoplay=false&loop=false&muted=false&preload=true&responsive=true",
];
import { Hero } from '../src/components/Hero';
import { CoursePhases } from '../src/components/CoursePhases';
import { ReviewsCarousel } from '../src/components/ReviewsCarousel';
import { LearnToCreate } from '../src/components/LearnToCreate';
import { FAQ } from '../src/components/FAQ';
import { Footer } from '../src/components/Footer';
import { CountdownBanner } from '../src/components/CountdownBanner';
import { CourseContentSection } from '../src/components/CourseContentSection';


export default function HomePage() {
  const router = useRouter();
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current && carouselRef.current.children.length > 0) {
      const cardWidth = (carouselRef.current.children[0] as HTMLElement).offsetWidth;
      const gap = window.innerWidth < 768 ? 16 : 24;
      carouselRef.current.scrollBy({ left: -(cardWidth + gap) * 2, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current && carouselRef.current.children.length > 0) {
      const cardWidth = (carouselRef.current.children[0] as HTMLElement).offsetWidth;
      const gap = window.innerWidth < 768 ? 16 : 24;
      carouselRef.current.scrollBy({ left: (cardWidth + gap) * 2, behavior: 'smooth' });
    }
  };

  return (
    <>
      <CountdownBanner />
      <main>
        <Hero onJoinClick={() => router.push('/checkout')} showVideo={true} />
        <CourseContentSection />
        <LearnToCreate />

        {/* Pricing Section */}
        <section className="py-8 flex flex-col items-center justify-center text-center px-4 relative z-10">
          <span className="text-gray-400 font-medium tracking-widest uppercase mb-4 text-sm mt-8">Course Price:</span>
          <div className="flex flex-col md:flex-row items-center justify-center gap-x-6 gap-y-2 mb-3 mt-2">
            <span className="text-5xl md:text-6xl font-outfit font-bold text-white tracking-tight">Pay 1,200 EGP</span>
            <span className="text-2xl md:text-3xl font-outfit text-gray-500 line-through decoration-gray-600">instead of LE 2,500</span>
          </div>
          <span className="text-neongreen font-medium text-lg tracking-wide mb-8">for a limited time</span>
        </section>
        {/* Student Results Section */}
        <section className="py-12 px-6 container mx-auto relative z-10 max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-outfit font-bold text-white tracking-tight" dir="rtl">
              نتائج الطلاب
            </h2>
          </div>

          <div className="relative group">
            <button 
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 z-20 w-8 h-8 bg-orange-500 hover:bg-orange-400 border border-white/20 rounded-full flex items-center justify-center text-white transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer hover:scale-110"
              aria-label="Previous"
            >
              <ChevronLeft size={16} />
            </button>
            
            <button 
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 z-20 w-8 h-8 bg-orange-500 hover:bg-orange-400 border border-white/20 rounded-full flex items-center justify-center text-white transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer hover:scale-110"
              aria-label="Next"
            >
              <ChevronRight size={16} />
            </button>

            <div 
              ref={carouselRef}
              className="flex gap-4 md:gap-6 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              dir="ltr"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {VIDEOS.map((src, idx) => (
                <div key={idx} className="min-w-[42%] md:min-w-[calc(33.333%-1rem)] shrink-0 rounded-xl overflow-hidden bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
                  <div style={{ position: 'relative', paddingTop: '177.78%' }}>
                    <iframe
                      src={src}
                      loading="lazy"
                      style={{ border: 0, position: 'absolute', top: 0, height: '100%', width: '100%' }}
                      allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
                      allowFullScreen={true}
                    ></iframe>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CoursePhases />
        <ReviewsCarousel />
        <FAQ />
      </main>

      <Footer />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.link/hc7cmh"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.5)] hover:shadow-[0_4px_28px_rgba(37,211,102,0.8)] hover:scale-110 active:scale-95 transition-all duration-200"
        style={{ width: '56px', height: '56px', background: '#25D366' }}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
      </a>
    </>
  );
}
