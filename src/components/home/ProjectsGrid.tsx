import { SanityImage } from '@/components/ui/SanityImage';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import React from 'react';

interface ProjectItem {
  title: string;
  slug: string;
  category?: string;
  mainImage: any;
}

interface ProjectsProps {
  data: {
    etiket?: string;
    baslik: string;
    liste: ProjectItem[];
  } | null;
}

export function ProjectsGrid({ data }: ProjectsProps) {
  if (!data || !data.liste) return null;

  return (
    <section id="projeler" className="py-16 md:py-24 bg-backgroundLight border-t border-gray-100">
      <div className="px-6 md:px-24 mb-12 md:mb-16 flex justify-between items-end">
        <div>
          {data.etiket && <span className="text-[10px] tracking-[0.3em] uppercase opacity-60 mb-4 block">{data.etiket}</span>}
          <h2 className="font-display text-4xl md:text-5xl">{data.baslik}</h2>
        </div>
      </div>
      
      <div className="masonry-grid px-6 md:px-24">
        {data.liste.map((project, index) => {
            // Mobile: Always full width and consistent height
            // Desktop: Masonry layout
            let spanClass = "col-span-12 h-[400px] md:h-[500px] md:col-span-6"; // default mobile/desktop base

            // Desktop-specific changes (md: prefix)
            if (index === 0) spanClass = "col-span-12 h-[400px] md:col-span-7 md:h-[600px]";
            if (index === 1) spanClass = "col-span-12 h-[400px] md:col-span-5 md:h-[400px] md:mt-12";
            if (index === 2) spanClass = "col-span-12 h-[400px] md:col-span-4 md:h-[500px]";
            if (index === 3) spanClass = "col-span-12 h-[400px] md:col-span-8 md:h-[700px] md:-mt-24";
            
            return (
                <Link href={`/projeler/${project.slug}`} key={project.slug || index} className={`${spanClass} relative overflow-hidden group block`}>
                     {project.mainImage && (
                        <SanityImage
                          image={project.mainImage}
                          width={800}
                          height={800}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                     )}
                     <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                     <div className="absolute bottom-8 left-8 text-white opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity z-10 drop-shadow-md">
                        {project.category && <p className="text-xs uppercase tracking-widest mb-1 opacity-90">{project.category}</p>}
                        <h4 className="font-display text-2xl">{project.title}</h4>
                     </div>
                </Link>
            )
        })}
      </div>

      <div className="mt-16 md:mt-32 flex justify-center">
        <Link 
          href="/projeler"
          className="group relative overflow-hidden bg-primary text-white px-10 py-4 rounded-full font-display text-sm uppercase tracking-[0.2em] transition-all duration-500 hover:pr-14 hover:bg-brandRed"
        >
          <span className="relative z-10 transition-colors">Tüm Tasarımlarımız</span>
          <ArrowRight
            size={16}
            className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0"
          />
        </Link>
      </div>
    </section>
  );
}
