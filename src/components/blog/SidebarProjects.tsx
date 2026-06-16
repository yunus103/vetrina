'use client';

import React from 'react';
import Link from 'next/link';
import { SanityImage } from '@/components/ui/SanityImage';

type Project = {
  title: string;
  slug: string;
  category?: string;
  mainImage?: any;
};

type SidebarProjectsProps = {
  projects: Project[];
};

export function SidebarProjects({ projects }: SidebarProjectsProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-100 pb-3">
        <h3 className="font-display text-xs tracking-[0.25em] uppercase text-primary/60 font-bold">
          Öne Çıkan Tasarımlarımız
        </h3>
      </div>
      
      <div className="space-y-6">
        {projects.map((project) => (
          <Link 
            key={project.slug} 
            href={`/projeler/${project.slug}`} 
            className="group flex gap-4 items-center focus:outline-none"
          >
            {project.mainImage && (
              <div className="relative w-20 h-16 shrink-0 overflow-hidden bg-gray-100 rounded-sm">
                <SanityImage 
                  image={project.mainImage}
                  width={150}
                  height={120}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="80px"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
              </div>
            )}
            
            <div className="space-y-1 min-w-0">
              {project.category && (
                <span className="block text-[8px] tracking-[0.2em] uppercase text-brandRed font-bold">
                  {project.category}
                </span>
              )}
              <h4 className="font-display text-sm text-primary leading-tight line-clamp-2 group-hover:text-brandRed transition-colors duration-300 uppercase">
                {project.title}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
