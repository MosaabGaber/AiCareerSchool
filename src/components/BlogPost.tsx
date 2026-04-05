import { Link, useParams, Navigate } from 'react-router-dom';

// We share this dummy data loosely across the blog components. In a real app, this comes from an API.
const dummyContent: Record<string, { title: string; date: string; readTime: string; videoId: string }> = {
  'best-ai-tools-2026': {
    title: 'الدليل الشامل: أفضل أدوات الذكاء الاصطناعي لإنشاء الصور والفيديو في 2026',
    date: '10 أبريل 2026',
    readTime: '10 دقائق قراءة',
    videoId: 'dQw4w9WgXcQ' // placeholder standard YT ID
  },
  'ai-video-tools-kling-veo': {
    title: 'إزاي تعمل فيديو بالذكاء الاصطناعي بـ Kling و Veo',
    date: '5 أبريل 2026',
    readTime: '7 دقائق قراءة',
    videoId: 'dQw4w9WgXcQ'
  },
  'midjourney-prompt-engineering-guide': {
    title: 'هندسة الأوامر في Midjourney: دليل احترافي',
    date: '1 أبريل 2026',
    readTime: '12 دقيقة قراءة',
    videoId: 'dQw4w9WgXcQ'
  },
  'elevenlabs-voice-cloning': {
    title: 'أفضل طرق انتاج محتوى صوتي باستخدام ElevenLabs',
    date: '28 مارس 2026',
    readTime: '5 دقائق قراءة',
    videoId: 'dQw4w9WgXcQ'
  }
};

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug || !dummyContent[slug]) {
    // If article not found, redirect to blog index (or build a 404)
    return <Navigate to="/blog" replace />;
  }

  const articleInfo = dummyContent[slug];

  return (
    <main className="pt-32 pb-24 min-h-screen relative z-10" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        
        {/* SEO Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-400 font-inter">
            <li>
              <Link to="/" className="hover:text-neongreen transition-colors">الرئيسية</Link>
            </li>
            <li className="text-gray-600">/</li>
            <li>
              <Link to="/blog" className="hover:text-neongreen transition-colors">المدونة</Link>
            </li>
            <li className="text-gray-600">/</li>
            <li className="text-gray-200" aria-current="page">
              {articleInfo.title.substring(0, 30)}...
            </li>
          </ol>
        </nav>

        <article>
          {/* Article Header */}
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-outfit font-bold text-white mb-6 leading-tight">
              {articleInfo.title}
            </h1>
            
            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm font-inter">
              <div className="flex items-center gap-2">
                {/* Author Avatar Placeholder */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neongreen to-blue-500 flex items-center justify-center">
                  <span className="text-darkspace font-bold uppercase text-xs">AI</span>
                </div>
                <span className="font-semibold text-white">AI Career School</span>
              </div>
              <span className="hidden sm:inline text-gray-600">•</span>
              <span>تاريخ النشر: {articleInfo.date}</span>
              <span className="hidden sm:inline text-gray-600">•</span>
              <span>{articleInfo.readTime}</span>
            </div>
          </header>

          {/* Top Video Embed */}
          <div className="w-full aspect-video rounded-2xl overflow-hidden mb-12 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/5">
            <iframe 
              src={`https://www.youtube.com/embed/${articleInfo.videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
              loading="lazy"
            ></iframe>
          </div>

          {/* Content Body */}
          <div className="prose prose-invert prose-lg max-w-none font-inter text-gray-300 leading-relaxed mb-12">
            <p>
              أهلاً بك في هذا الدليل الشامل. في عالم الذكاء الاصطناعي سريع التطور، أصبح من الضروري جداً تعلم الأدوات اللي بتساعدك تنتج محتوى قوي واحترافي بأقل مجهود وبأعلى جودة تجارية.
            </p>
            
            <h2 className="text-2xl font-bold font-outfit text-white mt-12 mb-6">ليه لازم تتعلم أدوات الذكاء الاصطناعي؟</h2>
            <p>
              الأدوات القديمة بتاخد وقت كبير وأحياناً بتحتاج لفرق عمل كاملة وتكاليف إنتاج ضخمة. هنا بييجي دور الذكاء الاصطناعي لتوفير ده كله.
            </p>
            <ul className="list-disc list-inside mt-4 mb-8 space-y-2 marker:text-neongreen">
              <li>توفير وقت التصميم والمونتاج بشكل ملحوظ جداً.</li>
              <li>تقليل التكاليف عن طريق الاستغناء عن الإنتاج الفعلي للصور.</li>
              <li>إمكانات غير محدودة للإبداع وتنفيذ الأفكار اللي كان صعب تنفيذها زمان.</li>
            </ul>

            {/* Middle CTA Banner */}
            <aside className="my-12 relative p-1 rounded-2xl bg-gradient-to-r from-neongreen/40 to-blue-500/40">
              <div className="glassmorphism p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-neongreen/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="flex-1 relative z-10">
                  <h3 className="text-xl font-bold text-white mb-2 font-outfit">تعبت من التجربة العشوائية؟</h3>
                  <p className="text-gray-300 text-sm">
                    جاهز تحترف أدوات الذكاء الاصطناعي وتنتج محتوى تجاري؟ اشترك في الكورس الشامل اللي بيتحدث كل 3-5 أيام بـ 950 جنيه بس.
                  </p>
                </div>
                <Link to="/checkout" className="shrink-0 bg-white text-black font-bold px-6 py-3 rounded-full text-sm hover:bg-gray-200 transition-colors shadow-lg relative z-10 flex items-center justify-center gap-2">
                  انضم للكورس الآن <span className="mr-1">←</span>
                </Link>
              </div>
            </aside>

            <h2 className="text-2xl font-bold font-outfit text-white mt-12 mb-6">إزاي تبدأ وتعمل أول تصميم؟</h2>
            <p>
              الخطوة الأولى دايماً بتكون اختيار الأداة الصح. لو هدفك صور فوتوريالستيك ممكن تستخدم Midjourney أو Runway. أما لو فيديوهات، فممكن تستعين بـ Kling 3.0 القادر على تخيل مشاهد كاملة بناء على الـ prompts اللي بتكتبها.
            </p>
            <h3 className="text-xl font-bold font-outfit text-white mt-8 mb-4">هندسة الأوامر (Prompt Engineering)</h3>
            <p>
              سر اللعبة كلها في إزاي بتكتب الأمر. الوصف الدقيق للإضاءة، الزاوية، والأسلوب الفني بيغير نتيجة الصورة أو الفيديو 180 درجة.
            </p>
            <ol className="list-decimal list-inside mt-4 mb-8 space-y-2 marker:text-neongreen">
              <li>حدد المادة الأساسية (الشخص أو الشيء المطولب).</li>
              <li>حدد بيئة العمل والخلفية.</li>
              <li>اكتب ستايل الإضاءة ونوع الكاميرا.</li>
            </ol>
            
            <p>
              وأخيراً، الأهم من تعلم الأدوات هو متابعة التحديثات المستمرة اللي بتنزل بشكل يومي لتطوير مهاراتك خطوة بخطوة.
            </p>
          </div>
          
          {/* Bottom Call To Action */}
          <div className="border-t border-white/10 pt-10 pb-4">
            <div className="glassmorphism p-8 md:p-10 rounded-2xl flex flex-col items-center text-center border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-500/5 pointer-events-none"></div>
              <h3 className="text-2xl md:text-3xl font-bold font-outfit text-white mb-4 relative z-10">ارفع من قيمة شغلك النهارده</h3>
              <p className="text-gray-300 md:text-lg mb-8 max-w-xl mx-auto relative z-10">
                جاهز تحترف أدوات الذكاء الاصطناعي وتنتج محتوى تجاري؟ اشترك في الكورس الشامل اللي بيتحدث كل 3-5 أيام بـ 950 جنيه بس.
              </p>
              <Link 
                to="/checkout" 
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg px-8 py-4 rounded-full transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:-translate-y-1 relative z-10 w-full sm:w-auto"
              >
                انضم للكورس الآن
              </Link>
            </div>
          </div>
        </article>

      </div>
    </main>
  );
}
