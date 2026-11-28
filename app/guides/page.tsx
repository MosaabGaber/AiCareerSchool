import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { allGuides } from '../../src/data/leadMagnets';
import { Footer } from '../../src/components/Footer';

const TITLE = 'جايدز مجانية بالذكاء الاصطناعي | AI Career School';
const DESCRIPTION =
  'جايدز مجانية بالعربي: اعمل مواقع وفيديوهات بالذكاء الاصطناعي خطوة بخطوة، من غير خبرة.';
const CANONICAL = 'https://www.aicareerschool.com/guides';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: 'AI Career School',
    images: [
      {
        url: 'https://www.aicareerschool.com/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ar_EG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['https://www.aicareerschool.com/og-image.png'],
  },
};

export default function GuidesIndexPage() {
  return (
    <>
      <main
        className="min-h-screen pt-28 sm:pt-32 pb-16 px-4 sm:px-6 relative z-10 bg-white text-[#111111]"
        dir="rtl"
      >
        <div className="max-w-3xl mx-auto space-y-8">
          <header className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8FBF2] border border-[#067A4E]/30 text-[#067A4E] text-xs sm:text-sm font-medium">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>من AI Career School</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-outfit font-extrabold text-[#111111] leading-snug tracking-tight">
              الجايدز المجانية
            </h1>
            <p className="text-base sm:text-lg text-[#111111] max-w-2xl mx-auto leading-relaxed">
              {DESCRIPTION}
            </p>
          </header>

          <ul className="grid gap-4 sm:grid-cols-2">
            {allGuides.map((guide) => (
              <li key={guide.slug}>
                <Link
                  href={`/guides/${guide.slug}`}
                  className="group flex h-full flex-col gap-3 rounded-2xl border border-[#E5E5E5] bg-[#F5F5F7] p-5 shadow-sm hover:border-[#067A4E]/50 hover:shadow-md transition-all"
                >
                  <div className="flex flex-wrap gap-2">
                    {guide.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full bg-white border border-[#E5E5E5] text-[#067A4E] text-xs font-bold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-lg font-outfit font-bold text-[#111111] leading-snug">
                    {guide.title}
                  </h2>
                  <p className="text-sm text-[#555555] leading-relaxed flex-1">
                    {guide.subtitle}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#067A4E] group-hover:text-[#04593A]">
                    اقرأ الجايد
                    <ArrowLeft className="w-4 h-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
