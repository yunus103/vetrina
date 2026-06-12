import { getSiteUrl } from "@/lib/utils";
import { urlForImage } from "@/sanity/lib/image";

export function JsonLd({ data }: { data: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationJsonLd(settings: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings?.siteName,
    url: getSiteUrl(),
    ...(settings?.contactInfo?.phone && { telephone: settings.contactInfo.phone }),
    ...(settings?.contactInfo?.email && { email: settings.contactInfo.email }),
    ...(settings?.contactInfo?.address && {
      address: { "@type": "PostalAddress", streetAddress: settings.contactInfo.address },
    }),
    sameAs: settings?.socialLinks?.map((s: any) => s.url).filter(Boolean) || [],
  };
}

export function furnitureStoreJsonLd(settings: any) {
  const logoUrl = settings?.logo?.asset?.url || `${getSiteUrl()}/favicon.ico`;

  return {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "@id": `${getSiteUrl()}/#store`,
    name: settings?.siteName || "Vetrina Design Ofis Mobilyaları",
    url: getSiteUrl(),
    logo: logoUrl,
    image: logoUrl,
    ...(settings?.contactInfo?.phone && { telephone: settings.contactInfo.phone }),
    ...(settings?.contactInfo?.email && { email: settings.contactInfo.email }),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Yukarı Dudullu, 5. Cd. 282A",
      addressLocality: "Ümraniye",
      addressRegion: "İstanbul",
      postalCode: "34775",
      addressCountry: "TR"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.0086,
      longitude: 29.1552
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        opens: "09:00",
        closes: "18:30"
      }
    ],
    sameAs: settings?.socialLinks?.map((s: any) => s.url).filter(Boolean) || [],
    priceRange: "$$"
  };
}

export function articleJsonLd(post: any) {
  const imageUrl = post?.mainImage
    ? urlForImage(post.mainImage)?.width(1200).height(630).url()
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${getSiteUrl()}/${post?.slug?.current || post?.slug || ""}`,
    },
    headline: post?.title,
    ...(imageUrl && { image: [imageUrl] }),
    datePublished: post?.publishedAt,
    dateModified: post?._updatedAt || post?.publishedAt,
    author: {
      "@type": "Organization",
      name: "Vetrina Design",
    },
    publisher: {
      "@type": "Organization",
      name: "Vetrina Design",
      logo: {
        "@type": "ImageObject",
        url: `${getSiteUrl()}/favicon.ico`,
      },
    },
    description: post?.excerpt || post?.seo?.metaDescription,
    ...(post?.tags?.length > 0 && { keywords: post.tags.join(', ') }),
  };
}
