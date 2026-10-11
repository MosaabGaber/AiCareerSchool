export default function RealEstateLayout({ children }: { children: React.ReactNode }) {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "الذكاء الاصطناعي للعقارات والتصميم الداخلي",
    "description": "تعلم تصميم صور وفيديوهات عقارية احترافية بالذكاء الاصطناعي. كورس عربي متخصص للمسوقين العقاريين والمصممين.",
    "provider": {
      "@type": "Organization",
      "name": "AI Career School",
      "url": "https://www.aicareerschool.com"
    },
    "inLanguage": "ar",
    "offers": {
      "@type": "Offer",
      "price": "1500",
      "priceCurrency": "EGP",
      "availability": "https://schema.org/InStock",
      "url": "https://www.aicareerschool.com/checkout"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online"
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
        "name": "الذكاء الاصطناعي للعقارات والتصميم الداخلي",
        "item": "https://www.aicareerschool.com/real-estate"
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
