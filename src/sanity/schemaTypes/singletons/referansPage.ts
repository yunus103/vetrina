import { defineField, defineType } from "sanity";

export const referansPageType = defineType({
  name: "referansPage",
  title: "Referanslarımız Sayfası",
  type: "document",
  fields: [
    defineField({
      name: "pageTitle",
      title: "Sayfa Başlığı",
      type: "string",
      initialValue: "Referanslarımız",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pageSubtitle",
      title: "Alt Başlık",
      type: "text",
      rows: 2,
      description: "Sayfa başlığının altında görünecek kısa açıklama.",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});
