import { Link, useNavigate } from 'react-router-dom';
import { Hero } from './Hero';
import { LearnToCreate } from './LearnToCreate';
import { CoursePhases } from './CoursePhases';
import { ReviewsCarousel } from './ReviewsCarousel';
import { FAQ } from './FAQ';
import { ShieldCheck } from 'lucide-react';

interface HomeV2Props {
  setIsPromptsModalOpen: (val: boolean) => void;
  setIsPrivacyOpen: (val: boolean) => void;
  setIsTermsOpen: (val: boolean) => void;
  setIsRefundOpen: (val: boolean) => void;
}

export function HomeV2({
  setIsPromptsModalOpen,
  setIsPrivacyOpen,
  setIsTermsOpen,
  setIsRefundOpen
}: HomeV2Props) {
  const navigate = useNavigate();

  return (
    <>
      <main>
        <Hero onJoinClick={() => navigate('/checkout')} showVideo={true} />
        <LearnToCreate />

        {/* Pricing Section */}
        <section className="py-8 flex flex-col items-center justify-center text-center px-4 relative z-10">
          <span className="text-gray-400 font-medium tracking-widest uppercase mb-4 text-sm mt-8">Course Price:</span>
          <div className="flex flex-col md:flex-row items-center justify-center gap-x-6 gap-y-2 mb-3 mt-2">
            <span className="text-5xl md:text-6xl font-outfit font-bold text-white tracking-tight">Pay LE 950</span>
            <span className="text-2xl md:text-3xl font-outfit text-gray-500 line-through decoration-gray-600">instead of LE 2,500</span>
          </div>
          <span className="text-neongreen font-medium text-lg tracking-wide mb-8">for a limited time</span>
          
          <div className="mt-2 flex flex-col items-center gap-3">
            <span className="text-gray-500 font-medium text-sm" dir="rtl">طرق الدفع المتاحة</span>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <img src="/payment/insta.png" alt="Instapay" className="h-[50px] w-auto object-contain" />
              <img src="/payment/voda.png" alt="Vodafone Cash" className="h-[50px] w-auto object-contain" />
              <img src="/payment/telda.png" alt="Telda" className="h-[50px] w-auto object-contain" />
              <img src="/payment/visa.png" alt="Visa" className="h-[50px] w-auto object-contain" />
              <img src="/payment/master.png" alt="Mastercard" className="h-[50px] w-auto object-contain" />
            </div>
          </div>
        </section>

        {/* Student Results Section */}
        <section className="py-12 px-6 container mx-auto relative z-10 max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-outfit font-bold text-white tracking-tight" dir="rtl">
              نتائج الطلاب
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="rounded-xl overflow-hidden bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
              <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                <iframe 
                  src="https://player.mediadelivery.net/embed/631325/5ed1633b-2b53-466b-adcd-c47bbf4079cb?autoplay=false&loop=false&muted=false&preload=true&responsive=true" 
                  loading="lazy" 
                  style={{ border: 0, position: 'absolute', top: 0, height: '100%', width: '100%' }} 
                  allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" 
                  allowFullScreen={true}
                ></iframe>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
              <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                <iframe 
                  src="https://player.mediadelivery.net/embed/631325/3010c6f6-3ec2-4ff3-8b44-40bff2951bd8?autoplay=false&loop=false&muted=false&preload=true&responsive=true" 
                  loading="lazy" 
                  style={{ border: 0, position: 'absolute', top: 0, height: '100%', width: '100%' }} 
                  allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" 
                  allowFullScreen={true}
                ></iframe>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
              <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                <iframe 
                  src="https://player.mediadelivery.net/embed/631325/74663dce-354a-43f0-be2e-7387416bda57?autoplay=false&loop=false&muted=false&preload=true&responsive=true" 
                  loading="lazy" 
                  style={{ border: 0, position: 'absolute', top: 0, height: '100%', width: '100%' }} 
                  allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" 
                  allowFullScreen={true}
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        <CoursePhases />
        <ReviewsCarousel />
        <FAQ />
      </main>

      <footer className="border-t border-white/10 py-10 mt-12 relative z-10">
        <div className="container mx-auto px-6 flex flex-col items-center gap-6">
          {/* Logo + copyright */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 flex items-center justify-center opacity-80">
              <img src="/logo.png" alt="AI Career School Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-outfit font-bold text-gray-300">AI Career School &copy; {new Date().getFullYear()}</span>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-6">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/aicareer.school?igsh=MXFoY3doNTk4NG9jaw%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-all duration-200 hover:scale-110"
              aria-label="Instagram"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@ai.career.school?_r=1&_t=ZS-94iXhQRgBtg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-all duration-200 hover:scale-110"
              aria-label="TikTok"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
              </svg>
            </a>

            {/* Prompts Button */}
            <button
              onClick={() => setIsPromptsModalOpen(true)}
              className="ml-4 px-5 py-1.5 rounded-full border border-white/30 bg-white/5 text-white hover:bg-white/10 transition-all duration-300 text-sm font-medium tracking-wide flex items-center justify-center"
            >
              Prompts
            </button>

            {/* Checkout Button */}
            <Link
              to="/checkout"
              className="ml-2 px-5 py-1.5 rounded-full border border-white/30 bg-white/5 text-white hover:bg-white/10 transition-all duration-300 text-sm font-medium tracking-wide flex items-center justify-center"
            >
              Checkout
            </Link>
          </div>

          {/* Bottom row */}
          <div className="flex items-center text-sm text-gray-500 gap-6">
            <span className="flex items-center gap-1"><ShieldCheck size={16} /> SSL Secured</span>
            <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-white transition-colors cursor-pointer">Privacy</button>
            <button onClick={() => setIsTermsOpen(true)} className="hover:text-white transition-colors cursor-pointer">Terms</button>
            <button onClick={() => setIsRefundOpen(true)} className="hover:text-white transition-colors cursor-pointer">Refund Policy</button>
            <Link to="/contact" className="hover:text-white transition-colors text-white/80">Contact</Link>
          </div>
        </div>
      </footer>

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
