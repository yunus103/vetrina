import { Metadata } from "next";
import { draftMode } from "next/headers";
import { getClient } from "@/sanity/lib/client";
import { homePageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";

import { HeroSlider } from "@/components/home/HeroSlider";
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ProjectsGrid } from "@/components/home/ProjectsGrid";
import { ClientsMarquee } from "@/components/home/ClientsMarquee";
import { ContactSection } from "@/components/home/ContactSection";

export async function generateMetadata(): Promise<Metadata> {
  const result = await getClient().fetch(homePageQuery, {}, { next: { tags: ["home"] } });
  return buildMetadata({
    canonicalPath: "/",
    pageSeo: result?.page?.seo,
  });
}

export default async function HomePage() {
  const isDraft = (await draftMode()).isEnabled;
  const client = getClient(isDraft);
  const result = await client.fetch(homePageQuery, {}, { next: { tags: ["home"] } });

  const data = result?.page;
  const settings = result?.settings;

  return (
    <>
      <HeroSlider data={data?.hero} />
      <AboutSection data={data?.hakkimizda} />
      <ServicesSection data={data?.hizmetlerimiz} />
      <ProcessSection data={data?.surec} />
      <ProjectsGrid data={data?.projelerSection} />
      <ClientsMarquee data={data?.referanslar} />
      <ContactSection data={data?.iletisimSection} settings={settings} />
    </>
  );
}
