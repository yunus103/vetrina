import { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { getClient, client } from "@/sanity/lib/client";
import { blogPostBySlugQuery, blogListQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { RichText } from "@/components/ui/RichText";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { JsonLd, articleJsonLd } from "@/components/seo/JsonLd";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await client.fetch(blogListQuery, {}, { next: { tags: ["blog"] } });
  return (posts || []).map((post: any) => ({ slug: post.slug?.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getClient().fetch(blogPostBySlugQuery, { slug }, { next: { tags: ["blog"] } });
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    canonicalPath: `/blog/${slug}`,
    pageSeo: post.seo,
    keywords: post.tags,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const isDraft = (await draftMode()).isEnabled;
  const post = await getClient(isDraft).fetch(
    blogPostBySlugQuery,
    { slug },
    { next: { tags: ["blog"] } }
  );

  if (!post) notFound();

  return (
    <>
      <JsonLd data={articleJsonLd(post)} />

      <article className="container mx-auto px-4 pt-32 pb-16 max-w-3xl break-words overflow-x-hidden">
        <FadeIn direction="up">
          <Button variant="ghost" className="mb-8 -ml-2 text-primary/60 hover:text-brandRed" render={<Link href="/blog" />}>
            ← Blog'a Dön
          </Button>

          {post.category && (
            <div className="inline-block bg-gray-100 text-primary border border-gray-200 uppercase tracking-widest text-[10px] font-bold px-3 py-1 mb-4 rounded-sm">
              {post.category.title}
            </div>
          )}

          {post.publishedAt && (
            <time className="text-[10px] uppercase tracking-widest text-brandRed font-bold block mb-4">
              {formatDate(post.publishedAt)}
            </time>
          )}

          <h1 className="text-4xl md:text-5xl font-display leading-tight mb-8">{post.title}</h1>

          {post.excerpt && (
            <p className="text-xl text-primary/70 mb-10 leading-relaxed font-medium">{post.excerpt}</p>
          )}
        </FadeIn>

        {post.mainImage && (
          <FadeIn delay={0.15}>
            <div className="relative h-72 md:h-[450px] overflow-hidden mb-16 rounded-sm shadow-sm">
              <SanityImage
                image={post.mainImage}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
                priority
              />
            </div>
          </FadeIn>
        )}

        <FadeIn delay={0.25}>
          <div className="prose prose-lg dark:prose-invert prose-headings:font-display max-w-none">
            <RichText value={post.body} />
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-16 pt-8 border-t border-black/10 flex flex-wrap items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary/40 mr-2">
                Etiketler:
              </span>
              {post.tags.map((tag: string) => (
                <span key={tag} className="text-[10px] text-primary/70 bg-black/5 hover:bg-black/10 transition-colors border border-transparent px-3 py-1.5 rounded-sm uppercase tracking-wider font-medium">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </FadeIn>
      </article>
    </>
  );
}
