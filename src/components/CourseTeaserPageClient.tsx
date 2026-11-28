'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import type { CourseTeaserGuide } from '../data/leadMagnets';
import { Footer } from './Footer';

interface CourseTeaserPageClientProps {
  guide: CourseTeaserGuide;
}

const makeEventId = () =>
  'event_' + Date.now() + '_' + Math.random().toString(36).slice(2, 11);

export function CourseTeaserPageClient({ guide }: CourseTeaserPageClientProps) {
  const viewTrackedRef = useRef(false);

  // ViewContent / view_item once per page load
  useEffect(() => {
    if (viewTrackedRef.current) return;
    viewTrackedRef.current = true;
    try {
      (window as any).fbq?.(
        'track',
        'ViewContent',
        { content_name: guide.slug, content_type: 'guide' },
        { eventID: makeEventId() }
      );
      (window as any).gtag?.('event', 'view_item', {
        guide_slug: guide.slug,
      });
    } catch (err) {
      console.error('Tracking error:', err);
    }
  }, [guide.slug]);

  const handleCourseClick = () => {
    try {
      (window as any).fbq?.(
        'track',
        'InitiateCheckout',
        {
          value: guide.coursePrice,
          currency: 'EGP',
          content_name: guide.courseName,
          guide_slug: guide.slug,
        },
        { eventID: makeEventId() }
      );
      (window as any).gtag?.('event', 'begin_checkout', {
        guide_slug: guide.slug,
        value: guide.coursePrice,
        currency: 'EGP',
      });
    } catch (err) {
      console.error('Tracking error:', err);
    }
  };

  return (
    <>
      <main
        className="min-h-screen pt-28 sm:pt-32 pb-16 px-4 sm:px-6 relative z-10 bg-white text-[#111111]"
        dir="rtl"
      >
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <header className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8FBF2] border border-[#067A4E]/30 text-[#067A4E] text-xs sm:text-sm font-medium">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>{guide.badgeLabel}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-[2.6rem] font-outfit font-extrabold text-[#111111] leading-snug tracking-tight">
              {guide.title}
            </h1>

            <p className="text-base sm:text-lg text-[#111111] max-w-2xl mx-auto leading-relaxed">
              {guide.subtitle}
            </p>
          </header>

          {/* How it's built */}
          <section
            aria-labelledby="parts-heading"
            className="rounded-2xl sm:rounded-3xl border border-[#E5E5E5] bg-[#F5F5F7] p-5 sm:p-8 shadow-sm space-y-5"
          >
            <h2
              id="parts-heading"
              className="text-xl sm:text-2xl font-outfit font-bold text-[#111111] leading-snug"
            >
              {guide.partsHeading}
            </h2>

            <ol className="space-y-4">
              {guide.parts.map((part, idx) => (
                <li
                  key={part.title}
                  className="flex items-start gap-3 rounded-2xl border border-[#E5E5E5] bg-white p-4 sm:p-5"
                >
                  <span className="w-8 h-8 rounded-xl bg-[#E8FBF2] border border-[#067A4E]/30 text-[#067A4E] font-outfit font-extrabold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-[#111111] text-sm sm:text-base leading-relaxed">
                    <span className="font-bold">{part.title}:</span>{' '}
                    {part.body}
                  </p>
                </li>
              ))}
            </ol>

            <p className="text-base sm:text-lg font-semibold text-[#111111] leading-relaxed">
              {guide.partsOutro}
            </p>
          </section>

          {/* Course CTA */}
          <section className="rounded-2xl sm:rounded-3xl border-2 border-[#067A4E]/40 bg-[#E8FBF2] p-6 sm:p-8 shadow-[0_12px_40px_rgba(6,122,78,0.12)] space-y-4 text-center">
            <h2 className="text-xl sm:text-2xl font-outfit font-bold text-[#111111] leading-snug">
              {guide.ctaHeading}
            </h2>
            <p className="text-[#111111] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              {guide.ctaBody}
            </p>
            <div className="pt-1">
              <Link
                href={guide.ctaHref}
                onClick={handleCourseClick}
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-outfit font-extrabold text-base sm:text-lg transition-all shadow-md hover:shadow-lg"
              >
                <span>{guide.ctaButtonLabel}</span>
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </div>
            <p className="text-xs sm:text-sm text-[#555555]">{guide.ctaNote}</p>
          </section>

          <p className="text-center">
            <Link
              href={guide.footerLinkHref}
              className="text-sm sm:text-base font-bold text-[#067A4E] underline underline-offset-4 decoration-2 hover:text-[#04593A] transition-colors"
            >
              {guide.footerLinkText}
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
