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

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.aicareerschool.com/blog/${params.slug}`,
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
    "inLanguage": "ar",
    "mainEntityOfPage": `https://www.aicareerschool.com/blog/${post.slug}`
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <BlogPost />
    </>
  );
}
