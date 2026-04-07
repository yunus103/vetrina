'use client';

import { motion } from 'framer-motion';
import { SanityImage } from '@/components/ui/SanityImage';
import React, { useState } from 'react';

interface ProcessStep {
  numara: string;
  baslik: string;
  ikon?: string;
  aciklama: string;
  gorsel?: any;
}

interface ProcessProps {
  data: {
    baslik: string;
    altBaslik?: string;
    adimlar: ProcessStep[];
  } | null;
}

const mockData: { baslik: string; altBaslik: string; adimlar: ProcessStep[] } = {
  baslik: "Tasarım Yolculuğumuz",
  altBaslik: "Fikir aşamasından mükemmel sonuca giden yol. Her adımda titizlikle çalışıyoruz.",
  adimlar: [
    { numara: "01", baslik: "Keşif ve Analiz", ikon: "search", aciklama: "Mekanınızı ve ihtiyaçlarınızı anlamak için detaylı bir analiz yapıyoruz.", gorsel: null },
    { numara: "02", baslik: "Konsept Tasarımı", ikon: "architecture", aciklama: "Hayalinizdeki mekanı görselleştiren özgün konseptler geliştiriyoruz.", gorsel: null },
    { numara: "03", baslik: "Malzeme Seçimi", ikon: "palette", aciklama: "Kalite ve estetiği bir araya getiren en iyi malzemeleri seçiyoruz.", gorsel: null },
    { numara: "04", baslik: "Uygulama", ikon: "verified", aciklama: "Tasarımlarımızı profesyonel ekibimizle hayata geçiriyoruz.", gorsel: null },
  ]
};

export function ProcessSection({ data }: ProcessProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const displayData = data?.adimlar && data.adimlar.length > 0 ? data : mockData;

  if (!displayData) return null;

  return (
    <section id="surec" className="py-32 px-6 md:px-24 bg-zinc-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] tracking-[0.3em] uppercase text-brandRed font-medium block mb-4"
          >
            Metodolojimiz
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-7xl text-primary leading-tight mb-6"
          >
            {displayData.baslik}
          </motion.h2>
          {displayData.altBaslik && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="max-w-xl text-gray-500 font-display text-lg"
            >
              {displayData.altBaslik}
            </motion.p>
          )}
        </div>

        <div className="relative">
          {/* Animated Line */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute top-[4.5rem] left-0 w-full h-[1px] bg-zinc-200 origin-left hidden md:block"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
            {displayData.adimlar.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative cursor-default"
              >
                <div className="mb-8 flex items-end justify-between">
                  <span className="font-display text-6xl text-zinc-200 transition-colors group-hover:text-brandRed duration-500 block leading-none">
                    {step.numara}
                  </span>
                  {step.ikon && (
                    <span className="material-symbols-outlined text-3xl text-brandRed opacity-40 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110 group-hover:-rotate-12">
                      {step.ikon}
                    </span>
                  )}
                </div>
                
                <h3 className="font-display text-2xl text-primary mb-4 group-hover:translate-x-2 transition-transform duration-500">
                  {step.baslik}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-8 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                  {step.aciklama}
                </p>

                {/* Reveal Image/Sketch on Hover */}
                {step.gorsel && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ 
                      opacity: hoveredIndex === index ? 1 : 0,
                      scale: hoveredIndex === index ? 1 : 0.8,
                      y: hoveredIndex === index ? 0 : 20
                    }}
                    className="absolute -top-20 right-0 w-32 h-32 pointer-events-none z-20"
                  >
                    <div className="relative w-full h-full overflow-hidden rounded-full border border-brandRed/20 p-2 bg-white shadow-xl">
                      <SanityImage
                        image={step.gorsel}
                        width={200}
                        height={200}
                        className="object-cover w-full h-full rounded-full transition-all duration-700"
                      />
                    </div>
                  </motion.div>
                )}
                
                {/* Mobile Line */}
                <div className="w-full h-[1px] bg-zinc-200 md:hidden mt-8" />
              </motion.div>
            ))}
          </div>
          
          {/* CTA Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-24 flex justify-center"
          >
            <a 
              href="#iletisim"
              className="group relative overflow-hidden bg-primary text-white px-10 py-4 rounded-full font-display text-sm uppercase tracking-[0.2em] transition-all duration-500 hover:pr-14 hover:bg-brandRed"
            >
              <span className="relative z-10 transition-colors">Hayalinizdeki Ofisi Tasarlayalım</span>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                arrow_downward
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
