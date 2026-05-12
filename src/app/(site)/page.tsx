import { Metadata } from "next";
import { draftMode } from "next/headers";
import { getClient } from "@/sanity/lib/client";
import { homePageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";

import dynamic from "next/dynamic";
import { HeroSlider } from "@/components/home/HeroSlider";

const AboutSection = dynamic(() => import("@/components/home/AboutSection").then((mod) => mod.AboutSection));
const ServicesSection = dynamic(() => import("@/components/home/ServicesSection").then((mod) => mod.ServicesSection));
const ProcessSection = dynamic(() => import("@/components/home/ProcessSection").then((mod) => mod.ProcessSection));
const ProjectsGrid = dynamic(() => import("@/components/home/ProjectsGrid").then((mod) => mod.ProjectsGrid));
const ClientsMarquee = dynamic(() => import("@/components/home/ClientsMarquee").then((mod) => mod.ClientsMarquee));
const ContactSection = dynamic(() => import("@/components/home/ContactSection").then((mod) => mod.ContactSection));

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
