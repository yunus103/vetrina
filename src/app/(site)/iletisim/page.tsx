import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { contactPageQuery, layoutQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { ContactForm } from "@/components/contact/ContactForm";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaLink } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(contactPageQuery, {}, { next: { tags: ["contact"] } });
  return buildMetadata({
    title: data?.pageTitle || "İletişim",
    canonicalPath: "/iletisim",
    pageSeo: data?.seo,
  });
}

const getSocialIcon = (platform: string) => {
  const p = platform.toLowerCase();
  if (p.includes('instagram')) return <FaInstagram />;
  if (p.includes('twitter') || p.includes('x')) return <FaXTwitter />;
  if (p.includes('linkedin')) return <FaLinkedinIn />;
  if (p.includes('facebook')) return <FaFacebookF />;
  return <FaLink />;
};

export default async function ContactPage() {
  const data = await client.fetch(contactPageQuery, {}, { next: { tags: ["contact"] } });
  const layoutData = await client.fetch(layoutQuery, {}, { next: { tags: ["layout"] } });
  const settings = layoutData?.settings;
  const contact = settings?.contactInfo;
  const socialLinks = settings?.socialLinks || [];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Header */}
      <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        {data?.heroImage && (
          <SanityImage 
            image={data.heroImage} 
            fill 
            className="object-cover brightness-50"
            priority 
          />
        )}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center px-6">
          <FadeIn direction="up">
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/70 mb-4 block">
              {data?.pageSubtitle || "İletişim"}
            </span>
            <h1 className="font-display text-5xl md:text-7xl text-white">
              {data?.pageTitle || "Bizimle İletişime Geçin"}
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 px-6 md:px-24">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* Info Side */}
          <div className="w-full lg:w-1/2 space-y-12">
            <FadeIn direction="up">
              <div className="space-y-6">
                 <h2 className="font-display text-4xl text-primary">İletişim Bilgilerimiz</h2>
                 <p className="text-gray-500 max-w-md leading-relaxed">
                   Projeleriniz hakkında konuşmak veya sadece bir kahve içmek için bizi ziyaret edebilirsiniz.
                 </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <FadeIn delay={0.1}>
                  <div className="space-y-3">
                     <span className="text-[10px] tracking-widest uppercase text-brandRed font-bold">Adres</span>
                     <p className="text-primary font-medium leading-relaxed whitespace-pre-line">
                        {contact?.address || "Adres bilgisi girilmemiş."}
                     </p>
                  </div>
               </FadeIn>
               
               <FadeIn delay={0.2}>
                  <div className="space-y-3">
                     <span className="text-[10px] tracking-widest uppercase text-brandRed font-bold">E-posta & Telefon</span>
                     <div className="space-y-1">
                        <a href={`mailto:${contact?.email}`} className="block text-primary font-medium hover:text-brandRed transition-colors">
                           {contact?.email}
                        </a>
                        <a href={`tel:${contact?.phone}`} className="block text-primary font-medium hover:text-brandRed transition-colors">
                           {contact?.phone}
                        </a>
                     </div>
                  </div>
               </FadeIn>

               {socialLinks.length > 0 && (
                  <FadeIn delay={0.3} className="md:col-span-2">
                     <div className="space-y-4 pt-6 border-t border-gray-100">
                        <span className="text-[10px] tracking-widest uppercase text-brandRed font-bold">Sosyal Medyada Biz</span>
                        <div className="flex flex-wrap gap-4">
                           {socialLinks.map((item: any, i: number) => (
                              <a 
                                 key={i} 
                                 href={item.url} 
                                 target="_blank" 
                                 rel="noopener noreferrer"
                                 className="flex items-center gap-3 bg-backgroundLight hover:bg-primary hover:text-white transition-all px-5 py-3 rounded-sm group"
                              >
                                 <span className="text-lg opacity-70 group-hover:opacity-100">
                                    {getSocialIcon(item.platform)}
                                 </span>
                                 <span className="text-xs font-bold tracking-widest uppercase">
                                    {item.platform.charAt(0).toUpperCase() + item.platform.slice(1)}
                                 </span>
                              </a>
                           ))}
                        </div>
                     </div>
                  </FadeIn>
               )}
            </div>
          </div>

          {/* Form Side */}
          <div className="w-full lg:w-1/2">
            <FadeIn delay={0.4}>
              <div className="bg-backgroundLight p-8 md:p-12">
                 <h3 className="font-display text-2xl text-primary mb-8 underline decoration-brandRed underline-offset-8">Bize Mesaj Gönderin</h3>
                 <ContactForm />
              </div>
            </FadeIn>
          </div>

        </div>
      </section>

      {/* Map Section */}
      {contact?.mapIframe && (
        <section className="w-full h-[500px] border-t border-gray-100">
          <div 
            className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0"
            dangerouslySetInnerHTML={{ __html: contact.mapIframe }}
          />
        </section>
      )}
    </main>
  );
}
