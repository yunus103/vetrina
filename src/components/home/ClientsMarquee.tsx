import { SanityImage } from '@/components/ui/SanityImage';
import React from 'react';

interface TestimonialItem {
  ad: string;
  logo?: any;
}

interface TestimonialsProps {
  data: {
    baslik: string;
    liste: TestimonialItem[];
  } | null;
}

export function ClientsMarquee({ data }: TestimonialsProps) {
  if (!data || !data.liste) return null;

  const renderItem = (item: TestimonialItem, index: number, prefix: string) => {
    if (item.logo) {
      return (
        <div key={`${prefix}-${index}`} className="relative h-14 md:h-20 w-36 md:w-56 transition-all opacity-80 hover:opacity-100 duration-500">
           <SanityImage 
             image={item.logo}
             fill={true}
             objectFit="contain"
             className="object-contain"
           />
        </div>
      );
    }
    return (
      <span key={`${prefix}-${index}`} className="text-2xl md:text-5xl font-display uppercase tracking-[0.2em] opacity-30 hover:opacity-100 transition-opacity cursor-default">
        {item.ad}
      </span>
    );
  };

  return (
    <section className="py-16 md:py-32 bg-backgroundLight border-y border-gray-200 overflow-hidden">
      <div className="px-6 md:px-24 mb-12">
        <h2 className="font-display text-4xl uppercase tracking-widest">{data.baslik}</h2>
      </div>
      <div className="relative overflow-hidden py-12 flex">
        <div className="flex whitespace-nowrap animate-marquee">
            {/* 
              To make it perfectly seamless:
              Inner containers must have a right padding equal to the gap.
              This way translateX(-50%) lands exactly on the start of the next set.
            */}
            <div className="flex items-center gap-12 md:gap-20 pr-12 md:pr-20 shrink-0">
                {data.liste.map((item, index) => renderItem(item, index, '1'))}
            </div>
             <div className="flex items-center gap-12 md:gap-20 pr-12 md:pr-20 shrink-0">
                {data.liste.map((item, index) => renderItem(item, index, '2'))}
            </div>
        </div>
      </div>
    </section>
  );
}
