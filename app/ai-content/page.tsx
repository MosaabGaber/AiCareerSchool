import { Metadata } from 'next';
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
  return <AiContentPageClient />;
}
