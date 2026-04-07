import { defineField, defineType, defineArrayMember } from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Ana Sayfa",
  type: "document",
  groups: [
    { name: 'hero', title: 'Hero Slider' },
    { name: 'hizmetlerimiz', title: 'Hizmetlerimiz' },
    { name: 'surec', title: 'Tasarım Süreci' },
    { name: 'projeler', title: 'Projeler' },
    { name: 'referanslar', title: 'Referanslar' },
    { name: 'hakkimizda', title: 'Hakkımızda' },
    { name: 'iletisim', title: 'İletişim CTA' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // Hero Slider
    defineField({
      name: "hero",
      title: "Hero Bölümü",
      type: "object",
      group: "hero",
      fields: [{
        name: "slider", title: "Slider", type: "array",
        of: [defineArrayMember({ type: "object", fields: [
          { name: "baslik", title: "Başlık", type: "string" },
          { name: "altBaslik", title: "Alt Başlık (Outline Text)", type: "string" },
          { name: "etiket", title: "Etiket", type: "string" },
          { name: "aciklama", title: "Açıklama", type: "text", rows: 3 },
          { name: "gorsel", title: "Görsel", type: "image", options: { hotspot: true },
            fields: [{ name: "alt", type: "string" }] }
        ]})]
      }]
    }),

    // Hakkımızda
    defineField({
      name: "hakkimizda",
      title: "Hakkımızda Bölümü",
      type: "object",
      group: "hakkimizda",
      fields: [
        { name: "etiket", title: "Etiket", type: "string" },
        { name: "baslik", title: "Başlık", type: "string" },
        { name: "altBaslik", title: "Alt Başlık (İtalik)", type: "string" },
        { name: "icerik", title: "İçerik", type: "array", 
          of: [defineArrayMember({ type: "block" })] 
        },
        { name: "gorsel", title: "Görsel", type: "image", options: { hotspot: true },
          fields: [{ name: "alt", title: "Alternatif Metin", type: "string" }] }
      ]
    }),

    // Hizmetlerimiz
    defineField({
      name: "hizmetlerimiz",
      title: "Hizmetlerimiz Bölümü",
      type: "object",
      group: "hizmetlerimiz",
      fields: [
        { name: "baslik", title: "Bölüm Başlığı", type: "string" },
        { name: "liste", title: "Hizmetler", type: "array",
          of: [defineArrayMember({ type: "object", fields: [
            { name: "baslik", title: "Başlık", type: "string" },
            { name: "aciklama", title: "Açıklama", type: "text", rows: 3 },
            { name: "gorsel", title: "Görsel", type: "image", options: { hotspot: true },
              fields: [{ name: "alt", title: "Alternatif Metin", type: "string" }] }
          ]})]
        }
      ]
    }),

    // Tasarım Süreci
    defineField({
      name: "surec",
      title: "Süreç Bölümü",
      type: "object",
      group: "surec",
      fields: [
        { name: "baslik", title: "Başlık", type: "string" },
        { name: "altBaslik", title: "Alt Başlık", type: "text", rows: 2 },
        { name: "adimlar", title: "Adımlar", type: "array",
          of: [defineArrayMember({ type: "object", fields: [
            { name: "numara", title: "Numara", type: "string" },
            { name: "baslik", title: "Başlık", type: "string" },
            { name: "ikon", title: "İkon (Material Symbol)", type: "string", description: "Örn: search, palette" },
            { name: "aciklama", title: "Açıklama", type: "text", rows: 3 },
            { name: "gorsel", title: "Görsel (Opsiyonel)", type: "image", options: { hotspot: true },
              fields: [{ name: "alt", title: "Alternatif Metin", type: "string" }] }
          ]})]
        }
      ]
    }),

    // Projeler Bölümü
    defineField({
      name: "projelerSection",
      title: "Projeler Bölümü",
      type: "object",
      group: "projeler",
      fields: [
        { name: "etiket", title: "Etiket", type: "string" },
        { name: "baslik", title: "Başlık", type: "string" },
        { name: "liste", title: "Projeler (Tam olarak 4 adet seçin)", type: "array",
          of: [defineArrayMember({ type: "reference", to: [{ type: "project" }] })],
          validation: Rule => Rule.max(4)
        }
      ]
    }),

    // Referanslar / Müşteriler (Marquee)
    defineField({
      name: "referanslar",
      title: "Referanslar (Marquee)",
      type: "object",
      group: "referanslar",
      fields: [
        { name: "baslik", title: "Başlık", type: "string" },
        { name: "liste", title: "Logo Listesi", type: "array",
          of: [defineArrayMember({ type: "object", fields: [
            { name: "ad", title: "Firma Adı", type: "string" },
            { name: "logo", title: "Logo", type: "image", options: { hotspot: true },
              fields: [{ name: "alt", title: "Alternatif Metin", type: "string" }] }
          ]})]
        }
      ]
    }),

    // İletişim Bölümü Ek Görseli
    defineField({
      name: "iletisimSection",
      title: "İletişim Bölümü",
      type: "object",
      group: "iletisim",
      fields: [
        { name: "baslik", title: "Başlık", type: "string" },
        { name: "etiket", title: "Etiket", type: "string" },
        { name: "gorsel", title: "Görsel", type: "image", options: { hotspot: true },
          fields: [{ name: "alt", title: "Alternatif Metin", type: "string" }] }
      ]
    }),

    // SEO
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" })
  ]
});
