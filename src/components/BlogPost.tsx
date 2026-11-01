'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { redirect } from 'next/navigation';




import { blogPosts } from '../data/blogData';

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  
  const articleInfo = blogPosts.find((post) => post.slug === slug);

  if (!slug || !articleInfo) {
    // If article not found, `app/blog/[slug]/page.tsx` handles 404.
    return null;
  }

  return (
    <main className="pt-32 pb-24 min-h-screen relative z-10 bg-white" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">

        {/* SEO Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-[#555555] font-inter">
            <li>
              <Link href="/" className="hover:text-[#067A4E] transition-colors">الرئيسية</Link>
            </li>
            <li className="text-[#BBBBBB]">/</li>
            <li>
              <Link href="/blog" className="hover:text-[#067A4E] transition-colors">المدونة</Link>
            </li>
            <li className="text-[#BBBBBB]">/</li>
            <li className="text-[#111111]" aria-current="page">
              {articleInfo.title.substring(0, 30)}...
            </li>
          </ol>
        </nav>

        <article>
          {/* Article Header */}
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-outfit font-bold text-[#111111] mb-6 leading-tight">
              {articleInfo.title}
            </h1>

            {articleInfo.lastUpdated && (
              <p className="text-sm text-[#555555] font-inter mb-4">آخر تحديث: {articleInfo.lastUpdated}</p>
            )}

            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-4 text-[#555555] text-sm font-inter">
              <div className="flex items-center gap-2">
                {/* Author Avatar Placeholder */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neongreen to-blue-500 flex items-center justify-center">
                  <span className="text-darkspace font-bold uppercase text-xs">AI</span>
                </div>
                <span className="font-semibold text-[#111111]">AI Career School</span>
              </div>
              <span className="hidden sm:inline text-[#BBBBBB]">•</span>
              <span>تاريخ النشر: {articleInfo.date}</span>
              <span className="hidden sm:inline text-[#BBBBBB]">•</span>
              <span>{articleInfo.readTime}</span>
            </div>
          </header>

          {/* Top Video Embed */}
          {articleInfo.videoId && (
            <div className="w-full aspect-video rounded-2xl overflow-hidden mb-12 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-[#E5E5E5]">
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

          {/* Sources */}
          {articleInfo.sources && articleInfo.sources.length > 0 && (
            <div className="border-t border-[#E5E5E5] pt-8 mb-4">
              <h2 className="text-sm font-bold text-[#555555] font-outfit mb-3">المصادر</h2>
              <ul className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-[#555555] font-inter">
                {articleInfo.sources.map((source, index) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener nofollow"
                      className="hover:text-[#067A4E] transition-colors underline"
                    >
                      {source.label}
                    </a>
                    {index < articleInfo.sources!.length - 1 && <span className="mx-1 text-[#BBBBBB]">·</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Bottom Call To Action */}
          <div className="border-t border-[#E5E5E5] pt-10 pb-4">
            <div className="blog-card-light p-8 md:p-10 rounded-2xl flex flex-col items-center text-center border border-[#E5E5E5] relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-500/5 pointer-events-none"></div>
              <h3 className="text-2xl md:text-3xl font-bold font-outfit text-[#111111] mb-4 relative z-10">ارفع من قيمة شغلك النهارده</h3>
              <p className="text-[#111111] md:text-lg mb-8 max-w-xl mx-auto relative z-10">
                جاهز تحترف أدوات الذكاء الاصطناعي وتنتج محتوى تجاري؟ اشترك في الكورس الشامل اللي بيتحدث كل 3-5 أيام بـ 950 جنيه بس.
              </p>
              <Link href="/checkout" 
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
