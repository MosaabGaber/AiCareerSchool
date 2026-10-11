import { Metadata } from 'next';
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
  return <RealEstatePageClient />;
}
