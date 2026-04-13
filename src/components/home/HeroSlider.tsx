'use client';

import { SanityImage } from '@/components/ui/SanityImage';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface Slide {
  baslik: string;
  altBaslik?: string;
  etiket?: string;
  aciklama?: string;
  gorsel: any;
}

interface HeroProps {
  data: {
    slider: Slide[];
  } | null;
}

export function HeroSlider({ data }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = data?.slider || [];

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  if (!slides || slides.length === 0) return null;

  const current = slides[currentSlide];
 
  return (
    <section id="ana-sayfa" className="relative h-[100dvh] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          {/* 
            position:relative is required for Next.js fill mode. 
            The SanityImage renders as absolute inset-0 inside this wrapper.
          */}
          {slide.gorsel && (
            <div className="absolute inset-0">
              <SanityImage
                image={slide.gorsel}
                fill={true}
                sizes="100vw"
                className="object-cover"
                priority={index === 0}
                noBlur={index === 0}
              />
            </div>
          )}

          {/* Subtle left-side vignette — keeps center bright, darkens edges where text lives */}
          <div className="absolute inset-0 z-[1] pointer-events-none"
            style={{background: "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0) 100%), linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 40%)"}}
          ></div>
          
          {/* Title text — above overlay */}
          <div className="absolute inset-0 z-[2] flex flex-col justify-center px-6 md:px-24">
            {slide.baslik && (
              <h1 className="font-display text-4xl md:text-8xl text-white max-w-4xl leading-[1.1] uppercase tracking-tight"
                style={{textShadow: "0 2px 12px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.5)"}}>
                {slide.baslik} <br /> 
                {slide.altBaslik && (
                  <span className="text-outline block mt-2 opacity-90 transition-all duration-700">
                    {slide.altBaslik}
                  </span>
                )}
              </h1>
            )}
          </div>
        </div>
      ))}

      {/* Bottom bar — always above all slides */}
      <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-24 md:right-24 flex flex-col md:flex-row justify-between items-start md:items-end border-t border-white/20 pt-6 md:pt-8 z-20 gap-6 md:gap-0">
        <div className="max-w-md">
          {current.etiket && <h3 className="text-white font-display text-lg md:text-xl mb-2">{current.etiket}</h3>}
          <p className="text-white/90 text-xs md:text-sm leading-relaxed line-clamp-3 md:line-clamp-none drop-shadow-md">
             {current.aciklama || "27 yıllık tecrübemizle hayalinizdeki çalışma alanlarını gerçeğe dönüştürüyoruz."}
          </p>
        </div>
        <div className="flex gap-4 self-start md:self-auto">
          <button 
            onClick={prevSlide}
            aria-label="Önceki Slayt"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/50 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          </button>
          <button 
            onClick={nextSlide}
            aria-label="Sonraki Slayt"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center text-black hover:bg-opacity-80 transition-all group"
          >
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
