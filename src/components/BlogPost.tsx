import { Link, useParams, Navigate } from 'react-router-dom';

import { blogPosts } from '../data/blogData';

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  
  const articleInfo = blogPosts.find((post) => post.slug === slug);

  if (!slug || !articleInfo) {
    // If article not found, redirect to blog index (or build a 404)
    return <Navigate to="/blog" replace />;
  }

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
          {articleInfo.videoId && (
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
          )}

          {/* Content Body */}
          <div 
            className="prose prose-invert prose-lg max-w-none font-inter text-gray-300 leading-relaxed mb-12 blog-content-wrapper"
            dangerouslySetInnerHTML={{ __html: articleInfo.content }}
          />

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
