export default function AiContentLayout({ children }: { children: React.ReactNode }) {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "صناعة المحتوى بالذكاء الاصطناعي",
    "description": "تعلم صناعة الصور والفيديوهات والإعلانات بالذكاء الاصطناعي. كورس عربي شامل بأدوات Kling و Veo و ElevenLabs و Runway. أكثر من 1,200 طالب.",
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
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "1200"
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", ".course-description", ".faq-section"]
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "هل الكورس بالعربي؟",
        "acceptedAnswer": { "@type": "Answer", "text": "أيوه، الكورس كله بالعربي 100% شرح ومحتوى وأمثلة." }
      },
      {
        "@type": "Question",
        "name": "هل محتاج خبرة سابقة؟",
        "acceptedAnswer": { "@type": "Answer", "text": "لا خالص. بنبدأ من الصفر تماماً. الكورس مصمم لأي حد حتى لو عمره ما فتح أداة AI قبل كده." }
      },
      {
        "@type": "Question",
        "name": "الأدوات بتتغير بسرعة، الكورس ازاي بيتابع التطور؟",
        "acceptedAnswer": { "@type": "Answer", "text": "الكورس بيتحدث كل 3 لـ 5 أيام بأحدث الأدوات والتقنيات. اشتراكك بيضمنلك كل التحديثات المستقبلية." }
      },
      {
        "@type": "Question",
        "name": "الكورس مسجل ولا لايف؟",
        "acceptedAnswer": { "@type": "Answer", "text": "الكورس مسجل بالكامل. تقدر تتفرج في أي وقت يناسبك وتعيد أي درس عدد لا نهائي من المرات." }
      },
      {
        "@type": "Question",
        "name": "هل في شهادة بعد الكورس؟",
        "acceptedAnswer": { "@type": "Answer", "text": "أيوه، بتاخد شهادة إتمام بعد ما تخلص الكورس." }
      },
      {
        "@type": "Question",
        "name": "إيه الأدوات اللي هنتعلمها في الكورس؟",
        "acceptedAnswer": { "@type": "Answer", "text": "هنتعلم أدوات زي Kling, Veo, Runway, ElevenLabs, Midjourney, Seedance, Higgsfield وغيرهم." }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "الرئيسية",
        "item": "https://www.aicareerschool.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "صناعة المحتوى بالذكاء الاصطناعي",
        "item": "https://www.aicareerschool.com/ai-content"
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
