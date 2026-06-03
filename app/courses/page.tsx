import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'منصة الكورسات | AI Career School',
  description: 'أقوى منصة عربية لتعلم الذكاء الاصطناعي',
};

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center pb-20 pt-24 px-4 md:px-8 relative z-10 selection:bg-blue-600 selection:text-white">
      
      {/* Header Section */}
      <div className="w-full max-w-6xl mx-auto text-center mb-16 flex flex-col items-center mt-8">
        {/* Logo at the top centered */}
        <div className="bg-darkspace rounded-3xl p-4 mb-8 shadow-sm">
          <img src="/logo.png" alt="AI Career School" className="w-20 md:w-28 h-auto" />
        </div>
        
        {/* Big Arabic headline */}
        <h1 className="text-[2.2rem] md:text-[4rem] font-outfit font-extrabold text-[#0f172a] leading-tight mb-6 tracking-tight" dir="rtl">
          أقوى منصة عربية لتعلم الذكاء الاصطناعي
        </h1>
        
        {/* Subtitle in Arabic */}
        <h2 className="text-[1.2rem] md:text-[1.6rem] font-outfit font-medium text-gray-600 mb-4 max-w-3xl leading-relaxed" dir="rtl">
          كن دايماً متقدم على الكل — تعلم أحدث أدوات AI وطبقها في شغلك فوراً
        </h2>
        
        {/* Small English subtitle */}
        <p className="text-gray-500 font-inter text-sm md:text-base tracking-[0.2em] uppercase mt-2 font-semibold">
          The #1 Arabic AI Learning Platform
        </p>
      </div>

      {/* Courses Grid */}
      <div className="w-full max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-24" dir="rtl">
        
        {/* Course 1 (Available) */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col group relative">
          
          <div className="h-56 bg-[#eff6ff] flex flex-col items-center justify-center border-b border-gray-100 relative overflow-hidden">
            <span className="text-[#1e3a5f] font-outfit font-bold text-xl md:text-2xl relative z-10 tracking-wide uppercase">AI Content Creation</span>
            <div className="absolute top-4 right-4 bg-[#00944d] text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide z-10">
              متاح الآن
            </div>
          </div>
          
          <div className="p-8 flex flex-col flex-grow relative z-10">
            <h3 className="text-[1.4rem] font-outfit font-bold text-[#0f172a] mb-2 leading-snug">
              صناعة المحتوى بالذكاء الاصطناعي
            </h3>
            <p className="text-[#2563eb] text-sm font-semibold mb-5 tracking-wide">
              صور، فيديوهات، إعلانات، UGC، براندينج
            </p>
            <p className="text-gray-600 text-sm mb-8 flex-grow leading-relaxed font-inter">
              إتعلم تعمل محتوى بصري احترافي بالذكاء الاصطناعي من الصفر. صور، فيديوهات، إعلانات ممولة، وأكتر.
            </p>
            <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
              <span className="text-2xl font-bold text-[#0f172a] font-outfit tracking-tight">1,200 EGP</span>
              <Link href="/v2" className="bg-[#2563eb] text-white px-6 md:px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-[#1d4ed8] transition-all duration-300">
                اشترك الآن
              </Link>
            </div>
          </div>
        </div>

        {/* Course 2 (Available) */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col group relative">
          
          <div className="h-56 bg-[#eff6ff] flex flex-col items-center justify-center border-b border-gray-100 relative overflow-hidden">
            <span className="text-[#1e3a5f] font-outfit font-bold text-xl md:text-2xl relative z-10 tracking-wide uppercase">AI for Real Estate</span>
            <div className="absolute top-4 right-4 bg-[#00944d] text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide z-10">
              متاح الآن
            </div>
          </div>
          
          <div className="p-8 flex flex-col flex-grow relative z-10">
            <h3 className="text-[1.4rem] font-outfit font-bold text-[#0f172a] mb-2 leading-snug">
              الذكاء الاصطناعي للعقارات والتصميم الداخلي
            </h3>
            <p className="text-[#2563eb] text-sm font-semibold mb-5 tracking-wide">
              صور عقارية، جولات افتراضية، فيديوهات تسويقية
            </p>
            <p className="text-gray-600 text-sm mb-8 flex-grow leading-relaxed font-inter">
              حوّل عقاراتك ومشاريعك لمحتوى بصري احترافي بالذكاء الاصطناعي بدون مصور أو مصمم.
            </p>
            <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
              <span className="text-2xl font-bold text-[#0f172a] font-outfit tracking-tight">1,500 EGP</span>
              <Link href="/real-estate" className="bg-[#2563eb] text-white px-6 md:px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-[#1d4ed8] transition-all duration-300">
                اشترك الآن
              </Link>
            </div>
          </div>
        </div>

        {/* Course 3 (Coming Soon) */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md transition-all duration-300 flex flex-col relative opacity-90">
          <div className="h-56 bg-gray-50 flex flex-col items-center justify-center border-b border-gray-100 relative overflow-hidden">
            <span className="text-gray-400 font-outfit font-bold text-xl md:text-2xl relative z-10 tracking-wide uppercase">AI Automation</span>
            <div className="absolute top-4 right-4 bg-amber-500 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide z-10">
              قريباً
            </div>
          </div>
          
          <div className="p-8 flex flex-col flex-grow relative z-10">
            <h3 className="text-[1.4rem] font-outfit font-bold text-gray-500 mb-2 leading-snug">
              الأتمتة بالذكاء الاصطناعي
            </h3>
            <p className="text-amber-600 text-sm font-semibold mb-5 tracking-wide">
              أتمتة المهام، الـ workflows، وتوفير الوقت
            </p>
            <p className="text-gray-500 text-sm mb-8 flex-grow leading-relaxed font-inter">
              إتعلم تأتمت شغلك بالكامل بالذكاء الاصطناعي وتوفر ساعات من العمل اليومي.
            </p>
            <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
              <span className="text-2xl font-bold text-gray-400 font-outfit tracking-tight">---</span>
              <button disabled className="bg-gray-200 text-gray-500 px-6 md:px-8 py-2.5 rounded-xl text-sm font-bold cursor-not-allowed">
                قريباً
              </button>
            </div>
          </div>
        </div>

        {/* Course 4 (Coming Soon) */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md transition-all duration-300 flex flex-col relative opacity-90">
          <div className="h-56 bg-gray-50 flex flex-col items-center justify-center border-b border-gray-100 relative overflow-hidden">
            <span className="text-gray-400 font-outfit font-bold text-xl md:text-2xl relative z-10 tracking-wide uppercase">General AI</span>
            <div className="absolute top-4 right-4 bg-amber-500 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide z-10">
              قريباً
            </div>
          </div>
          
          <div className="p-8 flex flex-col flex-grow relative z-10">
            <h3 className="text-[1.4rem] font-outfit font-bold text-gray-500 mb-2 leading-snug">
              الذكاء الاصطناعي العام — كن في المقدمة دايماً
            </h3>
            <p className="text-amber-600 text-sm font-semibold mb-5 tracking-wide">
              كل جديد في عالم AI في مكان واحد
            </p>
            <p className="text-gray-500 text-sm mb-8 flex-grow leading-relaxed font-inter">
              كورس شامل يغطي كل أدوات وتطورات الذكاء الاصطناعي عشان تفضل دايماً متقدم على الكل.
            </p>
            <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
              <span className="text-2xl font-bold text-gray-400 font-outfit tracking-tight">---</span>
              <button disabled className="bg-gray-200 text-gray-500 px-6 md:px-8 py-2.5 rounded-xl text-sm font-bold cursor-not-allowed">
                قريباً
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="w-full bg-[#eff6ff] rounded-2xl max-w-6xl mx-auto py-12 px-8 flex flex-col items-center mb-10 shadow-sm border border-blue-100">
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 mb-6" dir="rtl">
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-outfit font-extrabold text-[#1d4ed8] mb-2">+1,200</span>
            <span className="text-gray-600 text-sm font-outfit font-semibold tracking-wide">طالب</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-outfit font-extrabold text-[#1d4ed8] mb-2">4.9/5</span>
            <span className="text-gray-600 text-sm font-outfit font-semibold tracking-wide">تقييم</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-outfit font-extrabold text-[#1d4ed8] mb-2">+10</span>
            <span className="text-gray-600 text-sm font-outfit font-semibold tracking-wide">أدوات AI</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-outfit font-extrabold text-[#1d4ed8] mb-2">4</span>
            <span className="text-gray-600 text-sm font-outfit font-semibold tracking-wide">كورسات متخصصة</span>
          </div>
        </div>
        <p className="text-gray-500 text-sm font-outfit font-medium tracking-wide px-4 text-center mt-2" dir="rtl">
          بيتحدث كل 3-5 أيام بأحدث الأدوات
        </p>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.link/hc7cmh"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:shadow-[0_4px_28px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-95 transition-all duration-200"
        style={{ width: '56px', height: '56px', background: '#25D366' }}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
      </a>

    </main>
  );
}
