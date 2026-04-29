import { defineField, defineType, defineArrayMember } from "sanity";

export const referansType = defineType({
  name: "referans",
  title: "Referans",
  type: "document",
  fields: [
    defineField({
      name: "firmaAdi",
      title: "Firma Adı",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "firmaAdi" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "firmaLogosu",
      title: "Firma Logosu",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt Metni", type: "string" }),
      ],
    }),
    defineField({
      name: "kapakGorsel",
      title: "Kapak Görseli",
      description: "Kart üzerinde görünecek ana fotoğraf (kurulumdan bir kare).",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Metni",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "kisaAciklama",
      title: "Kısa Açıklama",
      type: "text",
      rows: 3,
      description: "Modalda gösterilecek kısa açıklama. Ne yapıldığını özetler.",
    }),
    defineField({
      name: "galeri",
      title: "Fotoğraf Galerisi",
      description: "Modalda gösterilecek kurulum fotoğrafları.",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt Metni", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "siraNo",
      title: "Sıra No",
      type: "number",
      description: "Sayfada görünme sırası. Küçük sayı önce görünür.",
      initialValue: 10,
    }),
  ],
  orderings: [
    {
      title: "Sıra Numarası",
      name: "siraNo",
      by: [{ field: "siraNo", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "firmaAdi",
      subtitle: "kisaAciklama",
      media: "kapakGorsel",
    },
  },
});
