import { blogPosts } from '../../../src/data/blogData';
import { BlogPost } from '../../../src/components/BlogPost';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface Props {
  params: {
    slug: string;
  };
}

// Generate static params for SSG
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate unique metadata for each blog post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | AI Career School'
    };
  }

  const title = post.metaTitle ? `${post.metaTitle} | AI Career School` : `${post.title} | AI Career School`;
  const description = post.metaDescription || post.excerpt;
  const canonicalUrl = `https://www.aicareerschool.com/blog/${params.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'ar': canonicalUrl,
        'en': canonicalUrl,
        'x-default': canonicalUrl,
      },
    },
    openGraph: {
      title: post.metaTitle || post.title,
      description,
      url: `https://www.aicareerschool.com/blog/${params.slug}`,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle || post.title,
      description,
      images: [post.image],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const canonicalUrl = `https://www.aicareerschool.com/blog/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.metaDescription || post.excerpt,
    "author": {
      "@type": "Organization",
      "name": "AI Career School",
      "url": "https://www.aicareerschool.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AI Career School"
    },
    "datePublished": post.datePublished || "2026-10-18",
    "dateModified": post.dateModified || post.datePublished || "2026-10-18",
    "inLanguage": "ar",
    "mainEntityOfPage": canonicalUrl
  };

  const faqSchema = post.faqs && post.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "الرئيسية",
        "item": "https://www.aicareerschool.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "المدونة",
        "item": "https://www.aicareerschool.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": canonicalUrl
      }
    ]
  };

  const itemListSchema = post.itemList && post.itemList.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": post.itemList.map((entry, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Course",
        "name": entry.name,
        ...(entry.url ? { "url": entry.url } : {})
      }
    }))
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {itemListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}
      <BlogPost />
    </>
  );
}
