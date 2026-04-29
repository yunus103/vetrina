"use client";

import { SanityImage } from "@/components/ui/SanityImage";
import { LightboxGallery } from "@/components/ui/LightboxGallery";
import { urlForImage } from "@/sanity/lib/image";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Images, X } from "lucide-react";

/**
 * Buton hover edildiğinde galeri thumbnail'lerini (800px) önceden yükler.
 * Overlay açıldığında resimler zaten browser cache'inde olur.
 */
function prefetchGalleryThumbnails(images: any[]) {
  if (typeof window === "undefined" || !images?.length) return;
  images.forEach((image) => {
    if (!image?.asset) return;
    try {
      const url = urlForImage(image)
        ?.auto("format")
        .width(800)
        .height(600)
        .fit("crop")
        .quality(75)
        .url();
      if (!url || document.querySelector(`link[href="${url}"]`)) return;
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.as = "image";
      link.href = url;
      document.head.appendChild(link);
    } catch {
      // prefetch başarısız olursa sessizce geç
    }
  });
}

interface ServiceItem {
  baslik: string;
  gorsel?: any;
  aciklama: string;
  galeri?: any[];
  butonMetni?: string;
}

interface ServicesProps {
  data: {
    baslik: string;
    liste: ServiceItem[];
  } | null;
}

interface GalleryState {
  images: any[];
  title: string;
  aciklama: string;
}

export function ServicesSection({ data }: ServicesProps) {
  const [activeGallery, setActiveGallery] = useState<GalleryState | null>(null);

  if (!data || !data.liste) return null;

  const openGallery = (service: ServiceItem) => {
    if (service.galeri && service.galeri.length > 0) {
      setActiveGallery({ images: service.galeri, title: service.baslik, aciklama: service.aciklama });
    }
  };

  const closeGallery = () => setActiveGallery(null);

  return (
    <>
      <section
        id="hizmetlerimiz"
        className="py-16 md:py-32 px-6 md:px-24 bg-backgroundLight border-t border-gray-100 dark:border-zinc-800"
      >
        <div className="mb-12 md:mb-24 text-center md:text-left">
          <h2 className="font-display text-4xl md:text-8xl tracking-tight">
            {data.baslik}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {data.liste.map((service, index) => {
            const hasGallery = service.galeri && service.galeri.length > 0;
            const buttonLabel =
              service.butonMetni?.trim() || "Örnek Çalışmalar";

            return (
              <div key={index} className="space-y-6 group flex flex-col">
                <div
                  className={`relative w-full h-64 mb-6 overflow-hidden rounded-sm group-hover:shadow-lg transition-all duration-500 bg-gray-100${hasGallery ? " cursor-pointer" : ""}`}
                  onClick={() => hasGallery && openGallery(service)}
                  onMouseEnter={() => hasGallery && prefetchGalleryThumbnails(service.galeri ?? [])}
                >
                  {service.gorsel && (
                    <SanityImage
                      image={service.gorsel}
                      width={800}
                      height={600}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="w-full h-full object-cover transition-transform duration-700 transform group-hover:scale-105"
                    />
                  )}
                </div>
                <h3 className="font-display text-2xl uppercase tracking-wider">
                  {service.baslik}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed border-l border-gray-200 pl-6 flex-1">
                  {service.aciklama}
                </p>

                {/* Gallery Button — only shown when galeri array has items */}
                {hasGallery && (
                  <button
                    onClick={() => openGallery(service)}
                    onMouseEnter={() => prefetchGalleryThumbnails(service.galeri ?? [])}
                    className="mt-2 inline-flex items-center gap-2 self-start text-xs uppercase tracking-[0.18em] font-medium text-brandRed hover:text-brandRed/80 transition-colors duration-300 group/btn border-b border-brandRed/40 hover:border-brandRed pb-0.5 cursor-pointer"
                  >
                    <Images
                      size={14}
                      className="transition-transform duration-300 group-hover/btn:scale-110"
                    />
                    {buttonLabel}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {activeGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-sm overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={closeGallery}
              className="fixed top-6 right-6 md:top-10 md:right-10 z-[101] w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer group"
              aria-label="Kapat"
            >
              <X
                size={36}
                className="transform group-hover:rotate-90 transition-transform duration-300"
              />
            </button>

            {/* Title */}
            <div className="pt-16 md:pt-20 px-6 md:px-24 pb-8">
              <p className="text-white/40 font-display text-xs tracking-[0.25em] uppercase mb-2">
                Örnek Çalışmalar
              </p>
              <h3 className="text-white font-display text-3xl md:text-5xl tracking-tight">
                {activeGallery.title}
              </h3>
              {activeGallery.aciklama && (
                <p className="mt-4 text-white/50 text-sm leading-relaxed max-w-2xl border-l border-white/20 pl-6">
                  {activeGallery.aciklama}
                </p>
              )}
            </div>

            {/* Gallery Grid — reuse LightboxGallery but without standalone title (it's above) */}
            <div className="px-6 md:px-24 pb-24">
              <LightboxGallery images={activeGallery.images} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
