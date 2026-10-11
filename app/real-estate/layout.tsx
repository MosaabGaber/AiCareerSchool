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
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      {children}
    </>
  );
}
