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

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "صناعة المحتوى بالذكاء الاصطناعي",
  "description": "تعلم صناعة الصور والفيديوهات والإعلانات بالذكاء الاصطناعي. كورس عربي شامل بأدوات Kling و seedance و Higgsfield و Veo و ElevenLabs و Runway. أكثر من 1,200 طالب. اشترك الآن بـ 1,200 جنيه.",
  "provider": {
    "@type": "Organization",
    "name": "AI Career School",
    "url": "https://www.aicareerschool.com"
  },
  "inLanguage": "ar",
  "offers": {
    "@type": "Offer",
    "price": "1200",
    "priceCurrency": "EGP",
    "availability": "https://schema.org/InStock",
    "url": "https://www.aicareerschool.com/checkout"
  },
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "online",
    "courseWorkload": "PT9H"
  }
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "هل الكورس بالعربي؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "أيوه، الكورس كله بالعربي 100%، شرح ومحتوى وأمثلة."
      }
    },
    {
      "@type": "Question",
      "name": "هل محتاج خبرة سابقة؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "لا خالص. بنبدأ من الصفر تماماً. الكورس مصمم لأي حد حتى لو عمره ما فتح أداة AI قبل كده."
      }
    },
    {
      "@type": "Question",
      "name": "الأدوات بتتغير بسرعة، الكورس ازاي بيتابع التطور؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "الكورس بيتحدث كل 3 لـ 5 أيام بأحدث الأدوات والتقنيات. اشتراكك بيضمنلك كل التحديثات المستقبلية."
      }
    },
    {
      "@type": "Question",
      "name": "الكورس مسجل ولا لايف؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "الكورس مسجل بالكامل وتقدر تتفرج عليه في أي وقت يناسبك. اشتراكك بيديك وصول مدى الحياة, يعني تقدر ترجعله في أي وقت."
      }
    },
    {
      "@type": "Question",
      "name": "هل في شهادة بعد الكورس؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "أيوه، بتاخد شهادة إتمام بعد ما تخلص الكورس تقدر تضيفها على LinkedIn أو البورتفوليو بتاعك."
      }
    },
    {
      "@type": "Question",
      "name": "إيه الأدوات اللي هنتعلمها في الكورس؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "سنستخدم مجموعة من الأدوات المجانية وأخرى توفر مزايا مدفوعة منها: Nanobanan, Veo, Kling, Higgsfield, Freepik, Weavy, Seedance, Canva, ElevenLabs, Heygen"
      }
    }
  ]
};

export default function AiContentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <AiContentPageClient />
    </>
  );
}
