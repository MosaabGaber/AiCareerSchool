import { Metadata } from 'next';
import Link from 'next/link';
import { WebCreationPageClient } from '../../src/components/WebCreationPageClient';

export const metadata: Metadata = {
  title: 'إنشاء مواقع احترافية بالذكاء الاصطناعي | AI Career School',
  description: 'تعلم بناء مواقع ثلاثية الأبعاد ومتاجر إلكترونية واحترف SEO بالذكاء الاصطناعي. كورس عربي بدون خبرة برمجة. أكثر من 1,200 طالب. اشترك الآن بـ 1,200 جنيه.',
  alternates: {
    canonical: 'https://www.aicareerschool.com/web-creation',
  },
  openGraph: {
    title: 'إنشاء مواقع احترافية بالذكاء الاصطناعي | AI Career School',
    description: 'تعلم بناء مواقع ثلاثية الأبعاد ومتاجر إلكترونية واحترف SEO بالذكاء الاصطناعي. كورس عربي بدون خبرة برمجة. أكثر من 1,200 طالب. اشترك الآن بـ 1,200 جنيه.',
    url: 'https://www.aicareerschool.com/web-creation',
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
    title: 'إنشاء مواقع احترافية بالذكاء الاصطناعي | AI Career School',
    description: 'تعلم بناء مواقع ثلاثية الأبعاد ومتاجر إلكترونية واحترف SEO بالذكاء الاصطناعي. كورس عربي بدون خبرة برمجة. أكثر من 1,200 طالب. اشترك الآن بـ 1,200 جنيه.',
    images: ['https://www.aicareerschool.com/og-image.png'],
  },
};

export default function WebCreationPage() {
  return (
    <>
      <WebCreationPageClient />

      {/* Quotable Facts & Source Citations */}
      <section className="max-w-4xl mx-auto px-4 my-10 space-y-4 relative z-10" dir="rtl">
        <p className="bg-blue-50 border-r-4 border-blue-500 p-4 rounded-lg text-lg font-semibold text-right text-gray-900" dir="rtl">
          كورس إنشاء المواقع بالذكاء الاصطناعي يعلمك بناء موقع احترافي ومتجر إلكتروني من الصفر بدون أي خبرة برمجية
        </p>
        <p className="bg-blue-50 border-r-4 border-blue-500 p-4 rounded-lg text-lg font-semibold text-right text-gray-900" dir="rtl">
          وفقاً لـ W3Techs، أكثر من 45% من المواقع عالمياً تستخدم أدوات بناء مواقع مدعومة بالذكاء الاصطناعي
        </p>
        <p className="bg-blue-50 border-r-4 border-blue-500 p-4 rounded-lg text-lg font-semibold text-right text-gray-900" dir="rtl">
          حسب تقرير Gartner 2024، 80% من الشركات الصغيرة ستعتمد على أدوات AI في بناء مواقعها بحلول 2026
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-gray-700 space-y-3 leading-relaxed text-right">
          <p>
            وفقاً لـ W3Techs، أكثر من 45% من المواقع عالمياً تستخدم أدوات بناء مواقع مدعومة بالذكاء الاصطناعي لتسريع زمن الإطلاق وخفض التكاليف.
          </p>
          <p>
            حسب تقرير Gartner 2024، 80% من الشركات الصغيرة ستعتمد على أدوات AI في بناء مواقعها بحلول 2026، مما يجعل مهارة بناء المواقع بالذكاء الاصطناعي فرصة استثنائية لتقديم خدمات الويب للشركات.
          </p>
          <p>
            بحسب Google، المواقع المحسّنة لـ SEO تحصل على 53% من الزيارات العضوية، وهو ما يركز عليه الكورس لضمان تصدر محركات البحث وجذب العملاء باستمرار.
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
