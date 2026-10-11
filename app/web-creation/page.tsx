import { Metadata } from 'next';
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
  return <WebCreationPageClient />;
}
