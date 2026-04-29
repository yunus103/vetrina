"use client";

import { useRouter } from "next/navigation";
import { SanityImage } from "@/components/ui/SanityImage";

interface ReferansCardProps {
  referans: {
    firmaAdi: string;
    slug: string;
    kapakGorsel?: any;
    firmaLogosu?: any;
  };
}

export function ReferansCard({ referans }: ReferansCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/referanslarimiz?ref=${referans.slug}`, { scroll: false });
  };

  return (
    <button
      onClick={handleClick}
      className="group block w-full text-left cursor-pointer"
      aria-label={`${referans.firmaAdi} referansını görüntüle`}
    >
      {/* ── Cover image ───────────────────────────────────────── */}
      <div className="relative aspect-[4/3] overflow-hidden bg-primary/5 mb-5">
        {referans.kapakGorsel && (
          <SanityImage
            image={referans.kapakGorsel}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
      </div>

      {/* ── Footer: logo + name ───────────────────────────────── */}
      <div className="flex items-center gap-4">
        {/* Logo pill */}
        {referans.firmaLogosu && (
          <div className="flex-shrink-0 h-8 w-16 relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100">
            <SanityImage
              image={referans.firmaLogosu}
              width={128}
              height={64}
              sizes="64px"
              className="h-8 w-full object-contain object-left"
            />
          </div>
        )}

        {/* Vertical separator */}
        {referans.firmaLogosu && (
          <span className="w-px h-5 bg-primary/20 flex-shrink-0" />
        )}

        {/* Firma adı */}
        <span className="font-body text-sm tracking-wide text-primary/80 group-hover:text-primary transition-colors duration-300 leading-tight">
          {referans.firmaAdi}
        </span>
      </div>
    </button>
  );
}
