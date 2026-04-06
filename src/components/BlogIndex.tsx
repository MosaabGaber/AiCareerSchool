import { Link } from 'react-router-dom';

import { blogPosts } from '../data/blogData';

export function BlogIndex() {
  return (
    <main className="pt-32 pb-24 min-h-screen relative z-10" dir="rtl">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Navigation & Header */}
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-outfit font-bold text-white mb-6 tracking-tight">
            مدونة <span className="text-transparent bg-clip-text bg-gradient-to-r from-neongreen to-softcyan glow-text">AI Career School</span>
            <br className="hidden md:block" /> دليلك لاحتراف الذكاء الاصطناعي
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-inter max-w-2xl mx-auto">
            أحدث شروحات وأدوات توليد الصور والفيديو لتطوير مسارك المهني.
          </p>
        </header>

        {/* Featured Post (Top) */}
        <section className="mb-16">
          <Link to="/blog/best-ai-tools-2026" className="block group">
            <article className="glassmorphism rounded-2xl overflow-hidden flex flex-col md:flex-row items-center border border-white/10 hover:border-neongreen/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(1,240,142,0.15)] relative">
              <div className="w-full md:w-1/2 aspect-video overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1684369176140-5a3962b47fc3?q=80&w=1200&auto=format&fit=crop" 
                  alt="أفضل أدوات الذكاء الاصطناعي" 
                  loading="lazy" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="p-8 md:p-12 w-full md:w-1/2 flex flex-col justify-center">
                <div className="text-neongreen font-semibold text-sm mb-3">مقال مميز</div>
                <h2 className="text-2xl md:text-3xl font-bold font-outfit text-white mb-4 leading-tight group-hover:text-neongreen transition-colors">
                  الدليل الشامل: أفضل أدوات الذكاء الاصطناعي لإنشاء الصور والفيديو في 2026
                </h2>
                <p className="text-gray-400 mb-6 font-inter leading-relaxed">
                  جمعنا لك أهم الأدوات اللي محتاجها عشان تبدأ مسيرتك المهنية في إنتاج المحتوى المرئي باستخدام الذكاء الاصطناعي، خطوة بخطوة من الصفر للاحتراف.
                </p>
                <div className="inline-flex items-center gap-2 text-white font-medium hover:text-neongreen transition-colors cursor-pointer">
                  <span>اقرأ المزيد</span>
                  <span className="group-hover:-translate-x-1 transition-transform">←</span>
                </div>
              </div>
            </article>
          </Link>
        </section>

        {/* Article Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link to={`/blog/${post.slug}`} key={post.slug} className="group">
                <article className="glassmorphism rounded-2xl overflow-hidden h-full flex flex-col border border-white/10 hover:border-blue-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                  <div className="aspect-video w-full overflow-hidden relative">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      loading="lazy" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    {/* Dark gradient overlay at bottom of image */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-xl font-bold font-outfit text-white mb-3 group-hover:text-blue-400 transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-400 font-inter mb-6 flex-grow leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="inline-flex items-center gap-2 text-sm text-white font-medium mt-auto group-hover:text-blue-400 transition-colors">
                      <span>اقرأ المزيد</span>
                      <span className="group-hover:-translate-x-1 transition-transform">←</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
