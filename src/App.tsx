import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Hero } from './components/Hero';
import { PaymentModal } from './components/PaymentModal';
import { CoursePhases } from './components/CoursePhases';
import { ReviewsCarousel } from './components/ReviewsCarousel';
import { LearnToCreate } from './components/LearnToCreate';
import { ShieldCheck } from 'lucide-react';
import { PromptsModal } from './components/PromptsModal';
import { Routes, Route, Link } from 'react-router-dom';
import { ContactPage } from './components/ContactPage';
import { InfoModal } from './components/InfoModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPromptsModalOpen, setIsPromptsModalOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);


  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.08
    });
    return () => lenis.destroy();
  }, []);

  return (
    <div className="font-inter bg-darkspace min-h-screen text-white selection:bg-neongreen selection:text-darkspace">

      {/* ── Global Background Gradient Blobs ── */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Top-center: large purple/pink — behind hero headline */}
        <div style={{
          position: 'absolute', top: '-15%', left: '50%', transform: 'translateX(-50%)',
          width: '900px', height: '900px',
          background: 'radial-gradient(circle, rgba(140,40,220,0.38) 0%, rgba(180,30,140,0.18) 40%, transparent 68%)',
          filter: 'blur(70px)',
        }} />
        {/* Top-right: blue */}
        <div style={{
          position: 'absolute', top: '-5%', right: '-10%',
          width: '650px', height: '650px',
          background: 'radial-gradient(circle, rgba(30,80,255,0.30) 0%, transparent 65%)',
          filter: 'blur(80px)',
        }} />
        {/* Top-left: deep teal */}
        <div style={{
          position: 'absolute', top: '10%', left: '-8%',
          width: '580px', height: '580px',
          background: 'radial-gradient(circle, rgba(0,190,190,0.22) 0%, transparent 65%)',
          filter: 'blur(80px)',
        }} />
        {/* Mid-center: blue wash */}
        <div style={{
          position: 'absolute', top: '40%', left: '50%', transform: 'translateX(-50%)',
          width: '800px', height: '600px',
          background: 'radial-gradient(ellipse, rgba(20,60,220,0.18) 0%, transparent 65%)',
          filter: 'blur(100px)',
        }} />
        {/* LearnToCreate bottom-left: teal/cyan */}
        <div style={{
          position: 'absolute', top: '60%', left: '-5%',
          width: '650px', height: '650px',
          background: 'radial-gradient(circle, rgba(0,200,180,0.28) 0%, transparent 65%)',
          filter: 'blur(80px)',
        }} />
        {/* CoursePhases bottom-right: purple */}
        <div style={{
          position: 'absolute', top: '70%', right: '-5%',
          width: '700px', height: '700px',
          background: 'radial-gradient(circle, rgba(120,30,210,0.32) 0%, transparent 65%)',
          filter: 'blur(80px)',
        }} />
        {/* Bottom-left: indigo */}
        <div style={{
          position: 'absolute', bottom: '0%', left: '10%',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(70,30,200,0.25) 0%, transparent 65%)',
          filter: 'blur(80px)',
        }} />
        {/* Bottom-right: pink accent */}
        <div style={{
          position: 'absolute', bottom: '-5%', right: '10%',
          width: '550px', height: '550px',
          background: 'radial-gradient(circle, rgba(200,40,130,0.22) 0%, transparent 65%)',
          filter: 'blur(80px)',
        }} />
      </div>


      {/* Floating Pill Navigation */}
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
          <div className="shrink-0 flex items-center gap-2">
            <div className="flex items-center justify-center">
              <img src="/logo.png" alt="AI Career School" className="object-contain drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]" style={{ width: '48px', height: '48px' }} />
            </div>
            <span className="hidden sm:block font-outfit font-bold text-sm text-white/80 tracking-tight whitespace-nowrap">AI Career School</span>
          </div>

          {/* Center: scrolling marquee */}
          <div className="flex-1 overflow-hidden mx-3 min-w-0">
            <div
              className="inline-block whitespace-nowrap font-inter text-[13px] font-medium uppercase tracking-widest"
              style={{ animation: 'marquee 18s linear infinite' }}
            >
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
          </div>

          {/* Right: JOIN NOW button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="shrink-0 bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-2.5 rounded-full text-sm tracking-widest uppercase transition-all duration-200 shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_28px_rgba(59,130,246,0.7)] active:scale-95 font-inter"
          >
            JOIN NOW
          </button>
        </nav>
      </div>




      <Routes>
        <Route path="/" element={
          <>
            <main>
              <Hero onJoinClick={() => setIsModalOpen(true)} />
              <LearnToCreate />

              {/* Pricing Section */}
              <section className="py-8 flex flex-col items-center justify-center text-center px-4 relative z-10">
                <span className="text-gray-400 font-medium tracking-widest uppercase mb-4 text-sm mt-8">Course Price:</span>
                <div className="flex flex-col md:flex-row items-center justify-center gap-x-6 gap-y-2 mb-3 mt-2">
                  <span className="text-5xl md:text-6xl font-outfit font-bold text-white tracking-tight">Pay LE 950</span>
                  <span className="text-2xl md:text-3xl font-outfit text-gray-500 line-through decoration-gray-600">instead of LE 2,500</span>
                </div>
                <span className="text-neongreen font-medium text-lg tracking-wide mb-8">for a limited time</span>
              </section>

              <CoursePhases />
              <ReviewsCarousel />
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
          </div>

          {/* Bottom row */}
          <div className="flex items-center text-sm text-gray-500 gap-6">
            <span className="flex items-center gap-1"><ShieldCheck size={16} /> SSL Secured</span>
            <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-white transition-colors cursor-pointer">Privacy</button>
            <button onClick={() => setIsTermsOpen(true)} className="hover:text-white transition-colors cursor-pointer">Terms</button>
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
        } />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <PromptsModal
        isOpen={isPromptsModalOpen}
        onClose={() => setIsPromptsModalOpen(false)}
      />

      <InfoModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        title="Privacy Policy"
        content="AI Career School respects your privacy. We collect basic information such as your name and email when you enroll in our courses. This information is used solely to provide you with course access and updates. We do not sell or share your personal data with third parties. We may use cookies to improve your browsing experience on our website. By using our website, you consent to our privacy practices. If you have any questions, contact us at theaicareerschoo@gmail.com."
      />

      <InfoModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        title="Terms of Service"
        content="By enrolling in AI Career School courses, you agree to the following terms. All course content is for personal use only and may not be shared, resold, or distributed without written permission. Course access is granted to the individual purchaser only. We reserve the right to update course content at any time. Refunds are handled on a case-by-case basis — contact us within 7 days of purchase. AI Career School is not responsible for any outcomes or results from applying course knowledge. For questions contact us at theaicareerschoo@gmail.com."
      />
    </div>
  );
}

export default App;
