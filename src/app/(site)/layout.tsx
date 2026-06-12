import { client } from "@/sanity/lib/client";
import { layoutQuery } from "@/sanity/lib/queries";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import SmoothScroll from "@/components/ui/SmoothScroll";
import { JsonLd, furnitureStoreJsonLd } from "@/components/seo/JsonLd";
import { draftMode } from "next/headers";
import Link from "next/link";
import Script from "next/script";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const data = await client.fetch(layoutQuery, {}, { next: { tags: ["layout"] } });
  const isDraft = (await draftMode()).isEnabled;
  const { gaId, gtmId } = data?.settings || {};

  return (
    <>
      {gtmId && (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
      )}
      {gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      )}
      {gtmId && (
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `}
        </Script>
      )}
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} forcedTheme="light">
        <SmoothScroll>
        {isDraft && (
          <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-400 text-yellow-900 text-center text-sm py-2 font-medium">
            Önizleme modu aktif.{" "}
            <Link href="/api/draft/disable" className="underline font-bold">
              Çıkmak için tıkla
            </Link>
          </div>
        )}
        <JsonLd data={furnitureStoreJsonLd(data?.settings)} />
        <Header settings={data?.settings} navigation={data?.navigation} />
        <main>{children}</main>
        <Footer settings={data?.settings} navigation={data?.navigation} />
        {data?.settings?.contactInfo?.whatsappNumber && (
          <WhatsAppButton number={data.settings.contactInfo.whatsappNumber} />
        )}
      </SmoothScroll>
    </ThemeProvider>
    </>
  );
}
