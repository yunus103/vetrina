import { defineField, defineType } from "sanity";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "Hakkımızda",
  type: "document",
  fields: [
    defineField({ name: "pageTitle", title: "Sayfa Başlığı", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "pageSubtitle", title: "Alt Başlık", type: "text", rows: 2 }),
    defineField({
      name: "body",
      title: "İçerik",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt Metni", type: "string" }),
            defineField({
              name: "alignment",
              title: "Hizalama",
              type: "string",
              options: { list: [{ title: "Sol", value: "left" }, { title: "Orta", value: "center" }, { title: "Sağ", value: "right" }, { title: "Tam Genişlik", value: "full" }] },
              initialValue: "center",
            }),
            defineField({
              name: "size",
              title: "Boyut",
              type: "string",
              options: { list: [{ title: "Küçük (%33)", value: "33" }, { title: "Orta (%50)", value: "50" }, { title: "Tam Genişlik (%100)", value: "100" }] },
              initialValue: "100",
            }),
          ]
        }
      ]
    }),
    defineField({
      name: "stats",
      title: "İstatistikler",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "deger", title: "Değer (örn: 27)", type: "string" },
            { name: "etiket", title: "Etiket (örn: Yıl Deneyim)", type: "string" }
          ]
        }
      ]
    }),
    defineField({
      name: "mainImage",
      title: "Ana Görsel",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string", validation: (Rule) => Rule.required() })],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});
