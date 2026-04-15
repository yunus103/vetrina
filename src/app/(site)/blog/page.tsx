import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { blogListQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { AnimateGroup, fadeUpItem } from "@/components/ui/AnimateGroup";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { formatDate } from "@/lib/utils";
import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Blog",
    canonicalPath: "/blog",
  });
}

export default async function BlogListPage() {
  const posts = await client.fetch(blogListQuery, {}, { next: { tags: ["blog"] } });

  return (
    <div className="min-h-screen bg-backgroundLight pb-24">
      {/* Header Area */}
      <div className="pt-32 pb-16 px-6 md:px-12 text-center max-w-7xl mx-auto">
        <FadeIn direction="up">
          <h1 className="text-4xl md:text-7xl font-display uppercase tracking-wider mb-4">Blog</h1>
          <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] opacity-50 px-4">
            Projelerimiz hakkında haberler, sektörel fikirler ve duyurular
          </p>
        </FadeIn>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-24">
        {posts?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-x-10 md:gap-y-20">
            {posts.map((post: any, index: number) => (
              <FadeIn key={post.slug?.current || index} delay={index * 0.05 + 0.1}>
                <Link href={`/${post.slug?.current}`} className="group block">
                  <article className="space-y-6">
                    {/* Image Container */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 rounded-sm">
                      {post.mainImage && (
                        <SanityImage
                          image={post.mainImage}
                          width={800}
                          height={500}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 blur-0"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="w-8 h-[1px] bg-brandRed"></span>
                        {post.publishedAt && (
                          <time className="text-[10px] uppercase tracking-[0.2em] text-primary/60 font-medium">
                            {formatDate(post.publishedAt)}
                          </time>
                        )}
                      </div>

                      <h2 className="font-display text-2xl md:text-3xl leading-snug group-hover:text-brandRed transition-colors duration-300">
                        {post.title}
                      </h2>

                      {post.excerpt && (
                        <p className="text-sm text-primary/70 leading-relaxed line-clamp-2 font-medium">
                          {post.excerpt}
                        </p>
                      )}

                      <div className="pt-2 flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-primary group-hover:translate-x-2 transition-transform duration-300">
                        Devamını Oku
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </article>
                </Link>
              </FadeIn>
            ))}
          </div>
        ) : (
          <FadeIn>
            <div className="flex flex-col items-center justify-center py-32 border border-dashed border-gray-200 rounded-lg">
                <FileText size={48} className="opacity-20 mb-4" />
                <p className="text-primary/40 uppercase tracking-[0.2em] text-xs">Henüz yayınlanmış bir yazı bulunmuyor.</p>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
}
