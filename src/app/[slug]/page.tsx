import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ViewBlog } from '../../Web-Page/Blogs/View Blog';
import { getWpPostBySlug, buildArticleSchema } from '../blogs/[slug]/page';

interface RootSlugPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: RootSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cleanSlug = slug ? slug.replace(/\/$/, '') : '';
  const blog = await getWpPostBySlug(cleanSlug);

  if (!blog) {
    return { title: 'Not Found' };
  }

  const url = blog.canonical_url;

  return {
    title: blog.title,
    description: blog.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url,
      type: 'article',
      publishedTime: blog.publish_date,
      images: blog.cover_image_url ? [{ url: blog.cover_image_url }] : [],
    },
  };
}

export default async function RootSlugPage({ params }: RootSlugPageProps) {
  const { slug } = await params;
  const cleanSlug = slug ? slug.replace(/\/$/, '') : '';
  const blog = await getWpPostBySlug(cleanSlug);

  if (!blog) {
    notFound();
  }

  const articleSchema = buildArticleSchema(blog);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <ViewBlog blog={blog} />
    </>
  );
}
