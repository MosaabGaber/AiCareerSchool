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

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "إنشاء مواقع احترافية بالذكاء الاصطناعي",
  "description": "تعلم بناء مواقع ثلاثية الأبعاد ومتاجر إلكترونية واحترف SEO بالذكاء الاصطناعي. كورس عربي بدون خبرة برمجة. أكثر من 1,200 طالب. اشترك الآن بـ 1,200 جنيه.",
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
    "url": "https://www.aicareerschool.com/web-creation-checkout"
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
      "name": "هل محتاج خبرة في البرمجة؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "لا خالص، الكورس مصمم للمبتدئين بالكامل بدون أي كود. بنعلمك تبني مواقع احترافية خطوة بخطوة باستخدام أحدث أدوات الذكاء الاصطناعي والبناء البصري."
      }
    },
    {
      "@type": "Question",
      "name": "الأدوات المستخدمة مجانية؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "بنغطي أدوات مجانية ومدفوعة وبنوريك أرخص البدائل وكيفية الاستفادة القصوى من الخطط المجانية في كل أداة لبدء عملك بأقل تكلفة ممكنة."
      }
    },
    {
      "@type": "Question",
      "name": "هقدر أبيع المواقع فعلاً؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "أيوه، بنعلمك استراتيجيات إيجاد العملاء، تسعير شغلك بآلاف الجنيهات، تقديم عروض الأسعار، وإبرام الاتفاقيات مع أصحاب الأعمال والشركات."
      }
    },
    {
      "@type": "Question",
      "name": "الكورس بيتحدث؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "أيوه، بيتحدث باستمرار بأحدث الأدوات والتقنيات في عالم الذكاء الاصطناعي وتطوير الويب لضمان بقائك دايماً متقدماً على السوق."
      }
    },
    {
      "@type": "Question",
      "name": "الكورس مسجل ولا لايف؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "الكورس مسجل بالكامل بجودة عالية وتقدر تتفرج عليه في أي وقت يناسبك، مع وصول مدى الحياة وتحديثات مستمرة."
      }
    },
    {
      "@type": "Question",
      "name": "هل بحصل على شهادة إتمام؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "أيوه، بعد إتمام الكورس ستحصل على شهادة إتمام معتمدة من AI Career School يمكنك إضافتها إلى لينكد إن وبورتفوليو أعمالك."
      }
    }
  ]
};

export default function WebCreationPage() {
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
      <WebCreationPageClient />
    </>
  );
}
