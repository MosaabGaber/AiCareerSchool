import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLeadMagnetBySlug, leadMagnets } from '../../../src/data/leadMagnets';
import { LeadMagnetPageClient } from '../../../src/components/LeadMagnetPageClient';

interface GuidePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return leadMagnets.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getLeadMagnetBySlug(slug);

  if (!guide) {
    return {
      title: 'الجايد غير موجود | AI Career School',
    };
  }

  const canonicalUrl = `https://www.aicareerschool.com/guides/${guide.slug}`;

  return {
    title: guide.seoTitle,
    description: guide.seoDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: guide.seoTitle,
      description: guide.seoDescription,
      url: canonicalUrl,
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
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.seoTitle,
      description: guide.seoDescription,
      images: ['https://www.aicareerschool.com/og-image.png'],
    },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getLeadMagnetBySlug(slug);

  if (!guide) {
    notFound();
  }

  return <LeadMagnetPageClient guide={guide} />;
}
