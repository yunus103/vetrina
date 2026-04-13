import { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { getClient, client } from "@/sanity/lib/client";
import { projectBySlugQuery, projectListQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { RichText } from "@/components/ui/RichText";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { LightboxGallery } from "@/components/ui/LightboxGallery";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await client.fetch(projectListQuery, {}, { next: { tags: ["projects"] } });
  return (projects || []).map((p: any) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getClient().fetch(projectBySlugQuery, { slug }, { next: { tags: ["projects"] } });
  if (!project) return {};
  return buildMetadata({
    title: project.title,
    canonicalPath: `/projeler/${slug}`,
    pageSeo: project.seo,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const isDraft = (await draftMode()).isEnabled;
  const project = await getClient(isDraft).fetch(
    projectBySlugQuery,
    { slug },
    { next: { tags: ["projects"] } }
  );

  if (!project) notFound();

  return (
    <article className="min-h-screen bg-backgroundLight pb-24">
      {/* Hero Header */}
      <div className="pt-32 pb-16 px-6 md:px-12 text-center md:text-left max-w-7xl mx-auto">
        <FadeIn direction="up">
          <Link href="/projeler" className="inline-flex items-center gap-2 text-[10px] tracking-widest uppercase mb-12 hover:text-brandRed transition-colors opacity-60">
            <ArrowLeft size={14} />
            Projeler
          </Link>
          
          <div className="flex justify-between items-end">
             <div>
                {project.category && <span className="text-[10px] tracking-[0.3em] uppercase opacity-60 mb-4 block">{project.category}</span>}
                <h1 className="text-4xl md:text-7xl font-display uppercase">{project.title}</h1>
             </div>
          </div>
        </FadeIn>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {project.mainImage && (
            <FadeIn delay={0.15}>
            <div className="relative h-[400px] md:h-[600px] w-full overflow-hidden mb-16 rounded-sm">
                <SanityImage
                image={project.mainImage}
                width={1920}
                height={1080}
                className="w-full h-full object-cover"
                priority
                />
            </div>
            </FadeIn>
        )}

        {project.body && (
            <FadeIn delay={0.25}>
              <div className="max-w-3xl mx-auto my-16 md:my-24 prose prose-zinc prose-p:text-gray-500 prose-p:font-medium prose-p:leading-relaxed prose-headings:font-display prose-headings:uppercase prose-a:text-brandRed hover:prose-a:underline">
                  <RichText value={project.body} />
              </div>
            </FadeIn>
        )}

        {project.gallery && project.gallery.length > 0 && (
            <FadeIn delay={0.3}>
              <LightboxGallery images={project.gallery} />
            </FadeIn>
        )}
      </div>
    </article>
  );
}
