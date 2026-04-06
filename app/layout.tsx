import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { ModalProvider } from '../src/context/ModalContext';
import { FloatingNav } from '../src/components/FloatingNav';

export const metadata: Metadata = {
  title: 'كورس الذكاء الاصطناعي للصور والفيديو | AI Career School',
  description: 'تعلم إنشاء صور وفيديوهات احترافية بالذكاء الاصطناعي. كورس عربي شامل بأدوات Kling و Veo و ElevenLabs. محتوى يتحدث كل 3-5 أيام. ابدأ بـ 950 جنيه.',
  keywords: 'كورس ذكاء اصطناعي, تعلم الذكاء الاصطناعي, AI course Arabic, كورس إنشاء صور بالذكاء الاصطناعي, كورس فيديو بالذكاء الاصطناعي, Kling, Veo, ElevenLabs, AI image generation, AI video generation, AI Career School',
  authors: [{ name: 'AI Career School' }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://aicareerschool.com/',
    languages: {
      'ar': 'https://aicareerschool.com/',
      'en': 'https://aicareerschool.com/',
      'x-default': 'https://aicareerschool.com/',
    },
  },
  openGraph: {
    title: 'كورس الذكاء الاصطناعي للصور والفيديو | AI Career School',
    description: 'تعلم إنشاء صور وفيديوهات احترافية بالذكاء الاصطناعي. كورس عربي شامل بأدوات Kling و Veo و ElevenLabs. محتوى يتحدث كل 3-5 أيام.',
    url: 'https://aicareerschool.com/',
    siteName: 'AI Career School',
    images: [
      {
        url: 'https://aicareerschool.com/og-image.png',
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
    title: 'كورس الذكاء الاصطناعي للصور والفيديو | AI Career School',
    description: 'تعلم إنشاء صور وفيديوهات احترافية بالذكاء الاصطناعي. كورس عربي شامل بأدوات Kling و Veo و ElevenLabs.',
    images: ['https://aicareerschool.com/og-image.png'],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://aicareerschool.com/#organization",
      "name": "AI Career School",
      "alternateName": "أكاديمية AI Career School",
      "url": "https://aicareerschool.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://aicareerschool.com/logo.png"
      },
      "description": "أكاديمية عربية متخصصة في تعليم إنشاء الصور والفيديوهات الاحترافية باستخدام أدوات الذكاء الاصطناعي مثل Kling 3.0 و Veo 3.1 و ElevenLabs. المحتوى يتحدث كل 3-5 أيام لمواكبة أحدث التطورات.",
      "foundingDate": "2024",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": ["Arabic", "English"]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://aicareerschool.com/#website",
      "name": "AI Career School",
      "url": "https://aicareerschool.com",
      "publisher": { "@id": "https://aicareerschool.com/#organization" },
      "inLanguage": ["ar", "en"]
    },
    {
      "@type": "Course",
      "@id": "https://aicareerschool.com/#course-basic",
      "name": "كورس الذكاء الاصطناعي للصور والفيديو - الباقة الأساسية",
      "description": "كورس عربي شامل لتعلم إنشاء صور وفيديوهات احترافية باستخدام أحدث أدوات الذكاء الاصطناعي مثل Kling 3.0 و Veo 3.1 و ElevenLabs و Nano Banana Pro.",
      "provider": { "@id": "https://aicareerschool.com/#organization" },
      "educationalLevel": "Beginner",
      "inLanguage": "ar",
      "offers": {
        "@type": "Offer",
        "price": "950",
        "priceCurrency": "EGP",
        "url": "https://aicareerschool.com/checkout"
      }
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar">
      <head>
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '916550307848753');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }} src="https://www.facebook.com/tr?id=916550307848753&ev=PageView&noscript=1" alt="" />
        </noscript>

        <Script
          id="tiktok-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
                ttq.load('D74QTDJC77UD6SV8NRG0');
                ttq.page();
              }(window, document, 'ttq');
            `,
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-inter bg-darkspace min-h-screen text-white selection:bg-neongreen selection:text-darkspace">
        <ModalProvider>
          {/* Global Background Gradient Blobs */}
          <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Top-center: large purple/pink — behind hero headline */}
            <div style={{ position: 'absolute', top: '-15%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '900px', background: 'radial-gradient(circle, rgba(140,40,220,0.38) 0%, rgba(180,30,140,0.18) 40%, transparent 68%)', filter: 'blur(70px)' }} />
            {/* Top-right: blue */}
            <div style={{ position: 'absolute', top: '-5%', right: '-10%', width: '650px', height: '650px', background: 'radial-gradient(circle, rgba(30,80,255,0.30) 0%, transparent 65%)', filter: 'blur(80px)' }} />
            {/* Top-left: deep teal */}
            <div style={{ position: 'absolute', top: '10%', left: '-8%', width: '580px', height: '580px', background: 'radial-gradient(circle, rgba(0,190,190,0.22) 0%, transparent 65%)', filter: 'blur(80px)' }} />
            {/* Mid-center: blue wash */}
            <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '600px', background: 'radial-gradient(ellipse, rgba(20,60,220,0.18) 0%, transparent 65%)', filter: 'blur(100px)' }} />
            {/* LearnToCreate bottom-left: teal/cyan */}
            <div style={{ position: 'absolute', top: '60%', left: '-5%', width: '650px', height: '650px', background: 'radial-gradient(circle, rgba(0,200,180,0.28) 0%, transparent 65%)', filter: 'blur(80px)' }} />
            {/* CoursePhases bottom-right: purple */}
            <div style={{ position: 'absolute', top: '70%', right: '-5%', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(120,30,210,0.32) 0%, transparent 65%)', filter: 'blur(80px)' }} />
            {/* Bottom-left: indigo */}
            <div style={{ position: 'absolute', bottom: '0%', left: '10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(70,30,200,0.25) 0%, transparent 65%)', filter: 'blur(80px)' }} />
            {/* Bottom-right: pink accent */}
            <div style={{ position: 'absolute', bottom: '-5%', right: '10%', width: '550px', height: '550px', background: 'radial-gradient(circle, rgba(200,40,130,0.22) 0%, transparent 65%)', filter: 'blur(80px)' }} />
          </div>

          <FloatingNav />
          
          <div className="relative z-10 w-full h-full flex flex-col pt-20">
            {children}
          </div>
        </ModalProvider>
      </body>
    </html>
  );
}
