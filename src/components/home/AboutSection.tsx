import React from 'react';
import Link from 'next/link';
import { SanityImage } from '@/components/ui/SanityImage';
import { RichText } from '@/components/ui/RichText';
import { FadeIn } from '@/components/ui/FadeIn';

interface AboutProps {
  data: {
    etiket?: string;
    baslik: string;
    altBaslik?: string;
    icerik: any;
    gorsel: any;
  } | null;
}

export function AboutSection({ data }: AboutProps) {
  if (!data) return null;

  return (
    <section id="hakkimizda" className="py-32 px-6 md:px-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-center">
        {/* Görsel Alanı */}
        <div className="w-full md:w-5/12 relative aspect-[3/4] md:h-[600px]">
          <div className="absolute inset-0 bg-backgroundLight -translate-x-4 translate-y-4 -z-10"></div>
          {data.gorsel && (
            <FadeIn direction="right" className="w-full h-full">
              <div className="relative w-full h-full overflow-hidden rounded-sm group">
                <SanityImage
                  image={data.gorsel}
                  fill={true}
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover relative z-10"
                  priority
                />
              </div>
            </FadeIn>
          )}
        </div>

        {/* Metin Alanı */}
        <div className="w-full md:w-7/12 space-y-8">
          <FadeIn direction="up">
            {data.etiket && (
              <span className="text-[10px] tracking-[0.4em] uppercase text-brandRed font-medium block mb-4">
                {data.etiket}
              </span>
            )}
            <h2 className="font-display text-4xl md:text-7xl text-primary leading-tight lowercase first-letter:uppercase">
              {data.baslik} <br />
              {data.altBaslik && (
                <span className="italic font-light opacity-90 block mt-2 text-3xl md:text-5xl">
                  {data.altBaslik}
                </span>
              )}
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.2} direction="up">
            <div className="max-w-xl text-gray-500 font-display text-lg leading-relaxed">
               <RichText value={data.icerik} className="prose-p:text-gray-500 prose-p:leading-relaxed" />
            </div>
          </FadeIn>

          <FadeIn delay={0.3} direction="up" className="pt-6">
            <Link 
              href="/hakkimizda" 
              className="inline-block border-b-2 border-primary pb-2 text-[10px] uppercase tracking-[0.3em] font-bold hover:text-brandRed hover:border-brandRed transition-all"
            >
              Hikayemizi Keşfedin
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
