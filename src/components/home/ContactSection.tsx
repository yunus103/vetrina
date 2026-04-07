'use client';

import { SanityImage } from '@/components/ui/SanityImage';
import { ContactForm } from '@/components/contact/ContactForm';

interface ContactProps {
  data: {
    baslik: string;
    etiket?: string;
    gorsel: any;
  } | null;
  settings: any;
}

export function ContactSection({ data, settings }: ContactProps) {
  if (!data) return null;

  const { address, email, phone } = settings?.contactInfo || {};

  return (
    <section id="iletisim" className="grid grid-cols-1 md:grid-cols-2 min-h-[auto] md:min-h-[500px] scroll-mt-20">
      <div className="relative overflow-hidden flex flex-col justify-center px-6 py-12 md:px-20 md:py-16">
        {data.gorsel && (
             <SanityImage
             image={data.gorsel}
             width={800}
             height={800}
             className="w-full h-full object-cover brightness-[0.9] absolute inset-0"
           />
        )}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-white space-y-8 md:space-y-10">
          <div>
            {data.etiket && <span className="text-[10px] tracking-[0.4em] uppercase opacity-70 mb-2 block">{data.etiket}</span>}
            <h2 className="font-display text-3xl md:text-5xl">{data.baslik}</h2>
          </div>
          <div className="space-y-6 md:space-y-8">
            {address && (
                <div className="flex items-start gap-4 md:gap-6 group">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-all">
                    <span className="material-symbols-outlined text-white text-xl">location_on</span>
                </div>
                <div>
                    <span className="text-[9px] tracking-widest uppercase opacity-50 block mb-1">Stüdyo Adresi</span>
                    <p className="text-base md:text-lg font-medium tracking-wide whitespace-pre-line">{address}</p>
                </div>
                </div>
            )}
            {email && (
                <div className="flex items-start gap-4 md:gap-6 group">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-all">
                    <span className="material-symbols-outlined text-white text-xl">mail</span>
                </div>
                <div>
                    <span className="text-[9px] tracking-widest uppercase opacity-50 block mb-1">E-posta</span>
                    <p className="text-base md:text-lg font-medium tracking-wide">
                        <a href={`mailto:${email}`} className="hover:opacity-80 transition-opacity">{email}</a>
                    </p>
                </div>
                </div>
            )}
            {phone && (
                <div className="flex items-start gap-4 md:gap-6 group">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-all">
                    <span className="material-symbols-outlined text-white text-xl">call</span>
                </div>
                <div>
                    <span className="text-[9px] tracking-widest uppercase opacity-50 block mb-1">Telefon</span>
                    <p className="text-base md:text-lg font-medium tracking-wide">
                        <a href={`tel:${phone}`} className="hover:opacity-80 transition-opacity">{phone}</a>
                    </p>
                </div>
                </div>
            )}
          </div>
        </div>
      </div>
      <div className="bg-white flex items-center px-6 py-12 md:px-20 md:py-16">
        <div className="w-full max-w-md mx-auto">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
