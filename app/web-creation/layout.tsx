export default function WebCreationLayout({ children }: { children: React.ReactNode }) {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "إنشاء مواقع احترافية بالذكاء الاصطناعي",
    "description": "تعلم بناء مواقع ثلاثية الأبعاد ومتاجر إلكترونية واحترف SEO بالذكاء الاصطناعي. كورس عربي بدون خبرة برمجة.",
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
      "courseWorkload": "PT5H"
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
        "name": "هل محتاج خبرة في البرمجة؟",
        "acceptedAnswer": { "@type": "Answer", "text": "لا مش محتاج أي خبرة برمجة. الكورس مصمم للمبتدئين تماماً وبنستخدم أدوات AI بتعمل كل حاجة." }
      },
      {
        "@type": "Question",
        "name": "الأدوات اللي هنستخدمها مجانية؟",
        "acceptedAnswer": { "@type": "Answer", "text": "أغلب الأدوات فيها خطط مجانية كافية للبداية. الكورس بيعلمك تشتغل بأقل تكلفة ممكنة." }
      },
      {
        "@type": "Question",
        "name": "هل أقدر أبيع المواقع اللي هعملها؟",
        "acceptedAnswer": { "@type": "Answer", "text": "أيوه طبعاً. الكورس فيه مرحلة كاملة عن بيع المواقع والحصول على عملاء." }
      },
      {
        "@type": "Question",
        "name": "الكورس بيتحدث؟",
        "acceptedAnswer": { "@type": "Answer", "text": "أيوه، الكورس بيتحدث باستمرار بأحدث الأدوات والتقنيات." }
      },
      {
        "@type": "Question",
        "name": "الكورس مسجل ولا لايف؟",
        "acceptedAnswer": { "@type": "Answer", "text": "الكورس مسجل بالكامل. تقدر تتفرج في أي وقت يناسبك." }
      },
      {
        "@type": "Question",
        "name": "هل في شهادة بعد الكورس؟",
        "acceptedAnswer": { "@type": "Answer", "text": "أيوه، بتاخد شهادة إتمام بعد ما تخلص الكورس." }
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
        "name": "إنشاء مواقع احترافية بالذكاء الاصطناعي",
        "item": "https://www.aicareerschool.com/web-creation"
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
