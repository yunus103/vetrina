import { groq } from "next-sanity";

// ─── Layout ────────────────────────────────────────────────────────────────────
// Her sayfada bir kez çekilir — header, footer, global ayarlar
export const layoutQuery = groq`{
  "settings": *[_type == "siteSettings"][0] {
    siteName, siteTagline,
    logo { asset->{ _id, url, metadata { lqip, dimensions } }, hotspot, crop },
    footerLogo { asset->{ _id, url, metadata { lqip, dimensions } }, hotspot, crop },
    logoHeight,
    favicon { asset->{ _id, url } },
    contactInfo { phone, email, address, whatsappNumber, mapIframe },
    socialLinks[] { platform, url },
    gaId, gtmId, searchConsole
  },
  "navigation": *[_type == "navigation"][0] {
    headerLinks[] { label, href, openInNewTab, subLinks[] { label, href, openInNewTab } },
    footerLinks[] { label, href, openInNewTab, subLinks[] { label, href, openInNewTab } }
  }
}`;

// ─── Sayfalar ──────────────────────────────────────────────────────────────────

export const homePageQuery = groq`{
  "page": *[_type == "homePage"][0] {
    hero { slider[] { baslik, altBaslik, etiket, aciklama,
      gorsel { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop } } },
    hakkimizda { etiket, baslik, altBaslik, icerik,
      gorsel { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop } },
    hizmetlerimiz { baslik,
      liste[] { baslik, aciklama, butonMetni,
        gorsel { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
        galeri[] { asset->{ _id, url, metadata { lqip, dimensions } }, alt, tasarimAdi, hotspot, crop } } },
    surec { baslik, altBaslik,
      adimlar[] { numara, baslik, ikon, aciklama,
        gorsel { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop } } },
    projelerSection { etiket, baslik,
      liste[]->{ title, "slug": slug.current, category,
        mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop } } },
    referanslar { baslik,
      liste[] { ad,
        logo { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop } } },
    iletisimSection { baslik, etiket,
      gorsel { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop } },
    seo
  },
  "settings": *[_type == "siteSettings"][0] {
    contactInfo { phone, email, address, whatsappNumber }
  }
}`;

export const aboutPageQuery = groq`*[_type == "aboutPage"][0] {
  pageTitle, pageSubtitle,
  mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
  body[] {
    ...,
    _type == "image" => { asset->{ _id, url, metadata { lqip, dimensions } }, alt, alignment, size, hotspot, crop }
  },
  stats[] { deger, etiket },
  seo
}`;

export const contactPageQuery = groq`*[_type == "contactPage"][0] {
  pageTitle, pageSubtitle, formTitle, successMessage,
  heroImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
  seo
}`;

// ─── Blog ──────────────────────────────────────────────────────────────────────

export const blogListQuery = groq`*[_type == "blogPost"] | order(publishedAt desc) {
  title, slug, excerpt, publishedAt,
  mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, objectFit, hotspot, crop }
}`;

export const blogPostBySlugQuery = groq`*[_type == "blogPost" && slug.current == $slug][0] {
  title, slug, publishedAt, _updatedAt, excerpt, category->{title, "slug": slug.current}, tags,
  mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, objectFit, hotspot, crop },
  body[] {
    ...,
    _type == "image" => {
      asset->{ _id, url, metadata { lqip, dimensions } },
      alt, alignment, size, hotspot, crop
    }
  },
  seo
}`;

export const blogPostsByCategoryQuery = groq`*[_type == "blogPost" && category->slug.current == $slug] | order(publishedAt desc) {
  title, slug, excerpt, publishedAt,
  mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, objectFit, hotspot, crop },
  category->{title, "slug": slug.current}
}`;

export const categoryBySlugQuery = groq`*[_type == "blogCategory" && slug.current == $slug][0] {
  title, description, slug
}`;


// ─── Hizmetler ─────────────────────────────────────────────────────────────────

export const serviceListQuery = groq`*[_type == "service"] | order(_createdAt asc) {
  title, slug,
  mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop }
}`;

export const serviceBySlugQuery = groq`*[_type == "service" && slug.current == $slug][0] {
  title, slug,
  mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
  body[] {
    ...,
    _type == "image" => { asset->{ _id, url, metadata { lqip, dimensions } }, alt, alignment, size, hotspot, crop }
  },
  seo
}`;

// ─── Projeler ──────────────────────────────────────────────────────────────────

export const projectListQuery = groq`*[_type == "project"] | order(_createdAt asc) {
  title, "slug": slug.current, category,
  mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop }
}`;

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0] {
  title, "slug": slug.current, category,
  mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
  gallery[] { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
  body[] {
    ...,
    _type == "image" => { asset->{ _id, url, metadata { lqip, dimensions } }, alt, alignment, size, hotspot, crop }
  },
  seo
}`;

// ─── Referanslar ───────────────────────────────────────────────────────────────

export const referansPageQuery = groq`*[_type == "referansPage"][0] {
  pageTitle, pageSubtitle, seo
}`;

export const referansListQuery = groq`*[_type == "referans"] | order(siraNo asc, _createdAt asc) {
  firmaAdi, "slug": slug.current,
  kapakGorsel { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
  firmaLogosu { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop }
}`;

export const referansBySlugQuery = groq`*[_type == "referans" && slug.current == $slug][0] {
  firmaAdi, "slug": slug.current, kisaAciklama,
  firmaLogosu { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
  galeri[] { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop }
}`;

// ─── Yasal Sayfalar ────────────────────────────────────────────────────────────

export const legalPageBySlugQuery = groq`*[_type == "legalPage" && slug.current == $slug][0] {
  title, slug, body, _updatedAt, seo
}`;

// ─── Sitemap ───────────────────────────────────────────────────────────────────

export const allSlugsForSitemapQuery = groq`{
  "blogPosts": *[_type == "blogPost" && defined(slug.current)] { "slug": slug.current, _updatedAt },
  "blogCategories": *[_type == "blogCategory" && defined(slug.current)] { "slug": slug.current },
  "projects": *[_type == "project" && defined(slug.current)] { "slug": slug.current, _updatedAt },
  "legalPages": *[_type == "legalPage" && defined(slug.current)] { "slug": slug.current, _updatedAt }
}`;

// ─── Varsayılan SEO ────────────────────────────────────────────────────────────

export const defaultSeoQuery = groq`*[_type == "siteSettings"][0] {
  "title": defaultSeo.metaTitle,
  "description": defaultSeo.metaDescription,
  "ogImage": defaultOgImage,
  siteName,
  siteTagline,
  searchConsole,
  favicon { asset->{ _id, url } }
}`;
