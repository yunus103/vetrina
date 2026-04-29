import { Metadata } from "next";
import { getClient } from "@/sanity/lib/client";
import {
  referansPageQuery,
  referansListQuery,
  referansBySlugQuery,
} from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/ui/FadeIn";
import { ReferansCard } from "@/components/referanslar/ReferansCard";
import { ReferansModal } from "@/components/referanslar/ReferansModal";

interface Props {
  searchParams: Promise<{ ref?: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getClient().fetch(
    referansPageQuery,
    {},
    { next: { tags: ["referanslar"] } }
  );
  return buildMetadata({
    title: page?.pageTitle ?? "Referanslarımız",
    description: page?.pageSubtitle,
    canonicalPath: "/referanslarimiz",
    pageSeo: page?.seo,
  });
}

export default async function ReferanslarimizPage({ searchParams }: Props) {
  const { ref } = await searchParams;

  // Parallel fetch: page meta + card list (always needed)
  // Modal detail fetched only when ?ref param is present
  const [page, referanslar, activeReferans] = await Promise.all([
    getClient().fetch(referansPageQuery, {}, { next: { tags: ["referanslar"] } }),
    getClient().fetch(referansListQuery, {}, { next: { tags: ["referanslar"] } }),
    ref
      ? getClient().fetch(
          referansBySlugQuery,
          { slug: ref },
          { next: { tags: ["referanslar"] } }
        )
      : Promise.resolve(null),
  ]);

  return (
    <>
      <article className="min-h-screen bg-backgroundLight pb-24">
        {/* ── Page header ─────────────────────────────────────────── */}
        <div className="pt-32 pb-16 px-6 md:px-12 text-center max-w-7xl mx-auto">
          <FadeIn direction="up">
            <h1 className="text-4xl md:text-7xl font-display uppercase tracking-wider">
              {page?.pageTitle ?? "Referanslarımız"}
            </h1>
          </FadeIn>

          {page?.pageSubtitle && (
            <FadeIn direction="up" delay={0.1}>
              <p className="mt-6 text-base md:text-lg text-primary/60 font-body max-w-xl mx-auto leading-relaxed">
                {page.pageSubtitle}
              </p>
            </FadeIn>
          )}
        </div>

        {/* ── Card grid ────────────────────────────────────────────── */}
        {referanslar && referanslar.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 px-6 md:px-24">
            {referanslar.map((referans: any, index: number) => (
              <FadeIn key={referans.slug ?? index} direction="up" delay={index * 0.05}>
                <ReferansCard referans={referans} />
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-32">
            <p className="text-primary/30 font-body tracking-widest uppercase text-sm">
              Henüz referans eklenmemiş.
            </p>
          </div>
        )}
      </article>

      {/* ── Modal (data comes from server, UI is client) ─────────── */}
      <ReferansModal referans={activeReferans} />
    </>
  );
}
