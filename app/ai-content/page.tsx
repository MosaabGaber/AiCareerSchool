import { Metadata } from 'next';
import Link from 'next/link';
import { AiContentPageClient } from '../../src/components/AiContentPageClient';

export const metadata: Metadata = {
  title: 'صناعة المحتوى بالذكاء الاصطناعي | AI Career School',
  description: 'تعلم صناعة الصور والفيديوهات والإعلانات بالذكاء الاصطناعي. كورس عربي شامل بأدوات Kling و seedance و Higgsfield و Veo و ElevenLabs و Runway. أكثر من 1,200 طالب. اشترك الآن بـ 1,200 جنيه.',
  alternates: {
    canonical: 'https://www.aicareerschool.com/ai-content',
  },
  openGraph: {
    title: 'صناعة المحتوى بالذكاء الاصطناعي | AI Career School',
    description: 'تعلم صناعة الصور والفيديوهات والإعلانات بالذكاء الاصطناعي. كورس عربي شامل بأدوات Kling و seedance و Higgsfield و Veo و ElevenLabs و Runway. أكثر من 1,200 طالب. اشترك الآن بـ 1,200 جنيه.',
    url: 'https://www.aicareerschool.com/ai-content',
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
    title: 'صناعة المحتوى بالذكاء الاصطناعي | AI Career School',
    description: 'تعلم صناعة الصور والفيديوهات والإعلانات بالذكاء الاصطناعي. كورس عربي شامل بأدوات Kling و seedance و Higgsfield و Veo و ElevenLabs و Runway. أكثر من 1,200 طالب. اشترك الآن بـ 1,200 جنيه.',
    images: ['https://www.aicareerschool.com/og-image.png'],
  },
};

export default function AiContentPage() {
  return (
    <>
      <AiContentPageClient />

      {/* Quotable Facts & Source Citations */}
      <section className="max-w-4xl mx-auto px-4 my-10 space-y-4 relative z-10" dir="rtl">
        <p className="bg-blue-50 border-r-4 border-blue-500 p-4 rounded-lg text-lg font-semibold text-right text-gray-900" dir="rtl">
          أكثر من 1,200 طالب أتموا كورس صناعة المحتوى بالذكاء الاصطناعي في AI Career School بتقييم 4.9 من 5
        </p>
        <p className="bg-blue-50 border-r-4 border-blue-500 p-4 rounded-lg text-lg font-semibold text-right text-gray-900" dir="rtl">
          وفقاً لتقرير McKinsey 2024، الشركات التي تستخدم الذكاء الاصطناعي في إنتاج المحتوى تحقق زيادة إنتاجية بنسبة 40%
        </p>
        <p className="bg-blue-50 border-r-4 border-blue-500 p-4 rounded-lg text-lg font-semibold text-right text-gray-900" dir="rtl">
          بحسب تقرير Statista 2024، سوق المحتوى المرئي بالذكاء الاصطناعي وصل إلى 3.2 مليار دولار
        </p>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-gray-300 space-y-3 leading-relaxed text-right">
          <p>
            تتعلم في هذا البرنامج التدريبي كيفية استخدام الذكاء الاصطناعي التوليدي في إنتاج الصور، الفيديوهات، الإعلانات التجارية والمحتوى الرقمي الاحترافي. وفقاً لتقرير McKinsey 2024، الشركات التي تستخدم الذكاء الاصطناعي في إنتاج المحتوى تحقق زيادة إنتاجية بنسبة 40% مقارنة بالأساليب التقليدية.
          </p>
          <p>
            حسب دراسة من MIT Technology Review، أدوات مثل Runway و Kling تُستخدم في أكثر من 60% من إنتاج الفيديو الرقمي عالمياً وتعتمد عليها كبرى الوكالات الإبداعية.
          </p>
          <p>
            بحسب تقرير Statista 2024، سوق المحتوى المرئي بالذكاء الاصطناعي وصل إلى 3.2 مليار دولار مع توقعات بمضاعفة هذا الحجم في السنوات القادمة، مما يوفر عوائد مجزية للمحترفين في العالم العربي.
          </p>
        </div>
      </section>

      {/* Cross-Linking: Other Courses You Might Like */}
      <section className="py-12 px-4 relative z-10" dir="rtl">
        <h2 className="text-2xl font-bold text-center mb-8 text-white">كورسات أخرى قد تهمك</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Link href="/web-creation" className="block p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition border border-gray-100">
            <h3 className="text-xl font-bold mb-2 text-gray-900">إنشاء مواقع احترافية بالذكاء الاصطناعي</h3>
            <p className="text-gray-600">تعلم بناء مواقع ومتاجر إلكترونية من الصفر بدون برمجة</p>
            <span className="text-blue-600 mt-3 inline-block font-semibold">اعرف أكثر ←</span>
          </Link>
          <Link href="/real-estate" className="block p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition border border-gray-100">
            <h3 className="text-xl font-bold mb-2 text-gray-900">الذكاء الاصطناعي للعقارات والتصميم الداخلي</h3>
            <p className="text-gray-600">إنتاج صور وفيديوهات عقارية احترافية بأدوات AI</p>
            <span className="text-blue-600 mt-3 inline-block font-semibold">اعرف أكثر ←</span>
          </Link>
        </div>
      </section>
    </>
  );
}
