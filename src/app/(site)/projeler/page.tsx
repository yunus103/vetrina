import { Metadata } from "next";
import { getClient } from "@/sanity/lib/client";
import { projectListQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/ui/FadeIn";
import Link from "next/link";
import { SanityImage } from "@/components/ui/SanityImage";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Projeler",
    canonicalPath: "/projeler",
  });
}

export default async function ProjectsPage() {
  const projects = await getClient().fetch(projectListQuery, {}, { next: { tags: ["projects"] } });

  return (
    <article className="min-h-screen bg-backgroundLight pb-24">
      <div className="pt-32 pb-16 px-6 md:px-12 text-center max-w-7xl mx-auto">
        <FadeIn direction="up">
          <h1 className="text-4xl md:text-7xl font-display uppercase tracking-wider">Tasarımlarımız</h1>
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 px-6 md:px-24">
        {projects?.map((project: any, index: number) => {
            return (
                <Link 
                  href={`/projeler/${project.slug}`} 
                  key={project.slug || index} 
                  className="group block"
                >
                     <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden mb-6 bg-gray-100">
                        {project.mainImage && (
                            <SanityImage
                              image={project.mainImage}
                              width={800}
                              height={1000}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                        
                        {/* Overlay info that appears on hover for mobile/tablet feel */}
                        <div className="absolute inset-0 flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/60 to-transparent">
                             <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                 <span className="material-symbols-outlined text-4xl mb-2">arrow_outward</span>
                             </div>
                        </div>
                     </div>
                     
                     <div className="space-y-2">
                        {project.category && (
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-[1px] bg-brandRed"></span>
                            <p className="text-[10px] uppercase tracking-[0.3em] text-primary/60">{project.category}</p>
                          </div>
                        )}
                        <h4 className="font-display text-2xl md:text-3xl leading-snug group-hover:text-brandRed transition-colors duration-300">
                          {project.title}
                        </h4>
                     </div>
                </Link>
            )
        })}
      </div>
    </article>
  );
}
