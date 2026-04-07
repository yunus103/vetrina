import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { aboutPageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { RichText } from "@/components/ui/RichText";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(aboutPageQuery, {}, { next: { tags: ["about"] } });
  return buildMetadata({
    title: data?.pageTitle || "Hakkımızda",
    canonicalPath: "/hakkimizda",
    pageSeo: data?.seo,
  });
}

export default async function AboutPage() {
  const data = await client.fetch(aboutPageQuery, {}, { next: { tags: ["about"] } });

  return (
    <article className="min-h-screen bg-white pb-24">
      <div className="pt-32 pb-16 px-6 md:px-24">
        <div className="flex flex-col md:flex-row gap-20 items-center">
          <div className="w-full md:w-5/12 relative h-[500px] md:h-[600px]">
            <div className="absolute inset-0 bg-backgroundLight -translate-x-4 translate-y-4"></div>
            {data?.mainImage && (
              <FadeIn delay={0.1} className="w-full h-full">
                <SanityImage
                  image={data.mainImage}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover relative z-10"
                  priority
                />
              </FadeIn>
            )}
          </div>
          <div className="w-full md:w-7/12 space-y-8">
            <FadeIn direction="up">
              <h1 className="font-display text-5xl md:text-6xl text-primary leading-tight">
                {data?.pageTitle} <br />
                {data?.pageSubtitle && <span className="italic font-light opacity-90">{data.pageSubtitle}</span>}
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <div className="space-y-6 max-w-xl text-gray-600 font-display text-lg leading-relaxed prose prose-zinc prose-a:text-brandRed">
                  <RichText value={data?.body} />
              </div>
            </FadeIn>

            {data?.stats && data.stats.length > 0 && (
              <FadeIn delay={0.3}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-gray-100 mt-12">
                  {data.stats.map((stat: any, i: number) => (
                    <div key={i}>
                      <span className="block font-display text-4xl text-primary mb-2">{stat.deger}</span>
                      <span className="block text-xs tracking-widest uppercase opacity-60">{stat.etiket}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 md:px-24 mt-12">
        <FadeIn direction="up">
          <div className="bg-primary p-12 md:p-24 text-center rounded-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-brandRed/10 translate-y-full group-hover:translate-y-0 transition-transform duration-1000"></div>
            <div className="relative z-10">
              <h2 className="font-display text-4xl md:text-6xl text-white mb-8">
                Projeniz İçin <br /> <span className="italic font-light">Bizimle İletişime Geçin</span>
              </h2>
              <p className="text-white/70 max-w-lg mx-auto mb-10 text-sm md:text-base tracking-wide">
                Hayalinizdeki ofis veya kurumsal çalışma alanını tasarlamak için uzman ekibimizle tanışın.
              </p>
              <Link 
                href="/iletisim" 
                className="inline-block bg-brandRed text-white px-10 py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-primary transition-all rounded-full"
              >
                Hemen İletişime Geç
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </article>
  );
}
