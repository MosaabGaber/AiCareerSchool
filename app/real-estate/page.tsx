import { Metadata } from 'next';
import Link from 'next/link';
import { RealEstatePageClient } from '../../src/components/RealEstatePageClient';

export const metadata: Metadata = {
  title: 'الذكاء الاصطناعي للعقارات والتصميم الداخلي | AI Career School',
  description: 'تعلم تصميم صور وفيديوهات عقارية احترافية بالذكاء الاصطناعي. كورس عربي متخصص للمسوقين العقاريين والمصممين. اشترك الآن بـ 1,500 جنيه.',
  alternates: {
    canonical: 'https://www.aicareerschool.com/real-estate',
  },
  openGraph: {
    title: 'الذكاء الاصطناعي للعقارات والتصميم الداخلي | AI Career School',
    description: 'تعلم تصميم صور وفيديوهات عقارية احترافية بالذكاء الاصطناعي. كورس عربي متخصص للمسوقين العقاريين والمصممين. اشترك الآن بـ 1,500 جنيه.',
    url: 'https://www.aicareerschool.com/real-estate',
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
    alternateLocale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'الذكاء الاصطناعي للعقارات والتصميم الداخلي | AI Career School',
    description: 'تعلم تصميم صور وفيديوهات عقارية احترافية بالذكاء الاصطناعي. كورس عربي متخصص للمسوقين العقاريين والمصممين. اشترك الآن بـ 1,500 جنيه.',
    images: ['https://www.aicareerschool.com/og-image.png'],
  },
};

export default function RealEstatePage() {
  return (
    <>
      <RealEstatePageClient />

      {/* Quotable Facts & Source Citations */}
      <section className="max-w-4xl mx-auto px-4 my-10 space-y-4 relative z-10" dir="rtl">
        <p className="bg-blue-50 border-r-4 border-blue-500 p-4 rounded-lg text-lg font-semibold text-right text-gray-900" dir="rtl">
          كورس الذكاء الاصطناعي للعقارات يعلمك إنتاج صور وفيديوهات عقارية احترافية باستخدام أحدث أدوات AI
        </p>
        <p className="bg-blue-50 border-r-4 border-blue-500 p-4 rounded-lg text-lg font-semibold text-right text-gray-900" dir="rtl">
          وفقاً لتقرير NAR 2024، العقارات المعروضة بصور وفيديوهات احترافية تبيع أسرع بنسبة 32%
        </p>
        <p className="bg-blue-50 border-r-4 border-blue-500 p-4 rounded-lg text-lg font-semibold text-right text-gray-900" dir="rtl">
          حسب دراسة من Matterport، الجولات الافتراضية تزيد التفاعل مع العقار بنسبة 300%
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-gray-700 space-y-3 leading-relaxed text-right">
          <p>
            وفقاً لتقرير NAR 2024، العقارات المعروضة بصور وفيديوهات احترافية تبيع أسرع بنسبة 32% وبأسعار أعلى مقارنة بالعروض التقليدية.
          </p>
          <p>
            حسب دراسة من Matterport، الجولات الافتراضية تزيد التفاعل مع العقار بنسبة 300% وتضاعف فرص التواصل مع المشترين الجادين.
          </p>
          <p>
            بحسب JLL، سوق PropTech في الشرق الأوسط ينمو بمعدل 25% سنوياً، مما يمنح المسوقين والوسطاء الذين يتبنون الذكاء الاصطناعي تفوقاً تنافسياً هائلاً.
          </p>
        </div>
      </section>

      {/* Cross-Linking: Other Courses You Might Like */}
      <section className="py-12 px-4 relative z-10 bg-gray-50 border-t border-gray-100" dir="rtl">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">كورسات أخرى قد تهمك</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Link href="/ai-content" className="block p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition border border-gray-100">
            <h3 className="text-xl font-bold mb-2 text-gray-900">صناعة المحتوى بالذكاء الاصطناعي</h3>
            <p className="text-gray-600">تعلم إنشاء صور وفيديوهات وإعلانات احترافية بأدوات AI</p>
            <span className="text-blue-600 mt-3 inline-block font-semibold">اعرف أكثر ←</span>
          </Link>
          <Link href="/web-creation" className="block p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition border border-gray-100">
            <h3 className="text-xl font-bold mb-2 text-gray-900">إنشاء مواقع احترافية بالذكاء الاصطناعي</h3>
            <p className="text-gray-600">تعلم بناء مواقع ومتاجر إلكترونية من الصفر بدون برمجة</p>
            <span className="text-blue-600 mt-3 inline-block font-semibold">اعرف أكثر ←</span>
          </Link>
        </div>
      </section>
    </>
  );
}
