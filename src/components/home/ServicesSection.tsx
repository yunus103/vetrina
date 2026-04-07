import { SanityImage } from '@/components/ui/SanityImage';
import React from 'react';

interface ServiceItem {
  baslik: string;
  gorsel?: any;
  aciklama: string;
}

interface ServicesProps {
  data: {
    baslik: string;
    liste: ServiceItem[];
  } | null;
}

export function ServicesSection({ data }: ServicesProps) {
  if (!data || !data.liste) return null;

  return (
    <section id="hizmetlerimiz" className="py-16 md:py-32 px-6 md:px-24 bg-backgroundLight border-t border-gray-100 dark:border-zinc-800">
      <div className="mb-12 md:mb-24 text-center md:text-left">
        <h2 className="font-display text-4xl md:text-8xl tracking-tight">{data.baslik}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
        {data.liste.map((service, index) => (
          <div key={index} className="space-y-6 group">
            <div className="relative w-full h-64 mb-6 overflow-hidden rounded-sm group-hover:shadow-lg transition-all duration-500 bg-gray-100">
              {service.gorsel && (
                <SanityImage 
                  image={service.gorsel}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-700 transform group-hover:scale-105"
                />
              )}
            </div>
            <h3 className="font-display text-2xl uppercase tracking-wider">{service.baslik}</h3>
            <p className="text-gray-500 text-sm leading-relaxed border-l border-gray-200 pl-6">
              {service.aciklama}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
