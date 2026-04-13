import Link from 'next/link';
import React from 'react';
import { SanityImage } from '@/components/ui/SanityImage';
import { Instagram, Twitter, Linkedin, Facebook, Link2 } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  openInNewTab?: boolean;
}

interface SocialLink {
  platform: string;
  url: string;
}

function getSocialIcon(platform: string) {
  const p = platform.toLowerCase();
  if (p.includes('instagram')) return <Instagram size={20} />;
  if (p.includes('twitter') || p.includes('x')) return <Twitter size={20} />;
  if (p.includes('linkedin')) return <Linkedin size={20} />;
  if (p.includes('facebook')) return <Facebook size={20} />;
  return <Link2 size={20} />;
}

function resolveHref(item: NavItem): string {
  return item.href || "#";
}

export function Footer({ settings, navigation }: { settings: any; navigation: any }) {
  const socialLinks: SocialLink[] = settings?.socialLinks || [];
  const footerLinks: NavItem[] = navigation?.footerLinks || [];
  
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white py-12 md:py-16 px-6 md:px-12 border-t border-white/10">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 md:gap-12">
        
        {/* Brand & Description */}
        <div className="flex flex-col items-center md:items-start gap-6 text-center md:text-left w-full md:basis-1/3">
          {(settings?.footerLogo || settings?.logo) ? (
             <div className="relative w-48 h-20 md:w-60 md:h-24 flex items-center justify-center md:justify-start">
               <SanityImage 
                 image={settings.footerLogo || settings.logo}
                 fill={true}
                 sizes="(max-width: 768px) 192px, 240px"
                 className="object-contain object-center md:object-left"
               />
             </div>
          ) : (
             <span className="text-3xl font-display tracking-tighter block text-white font-extrabold">{settings?.siteName || 'Vetrina'}</span>
          )}
          
          {settings?.siteTagline && (
            <p className="text-xs text-white/80 max-w-xs md:max-w-sm leading-relaxed mx-auto md:mx-0">
              {settings.siteTagline}
            </p>
          )}
        </div>

        {/* Middle Section: Follow Us */}
        <div className="flex flex-col items-center md:items-start gap-4 w-full md:basis-1/3">
          <h4 className="text-[10px] tracking-[0.3em] uppercase font-bold text-white/50">Bizi takip edin</h4>
          <div className="flex flex-col items-center md:items-start gap-3 w-full">
            {socialLinks.map((item, index) => (
              <a 
                key={index} 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-4 group transition-all w-fit"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all shrink-0">
                  <span className="text-white/60 group-hover:text-white transition-colors">
                    {getSocialIcon(item.platform)}
                  </span>
                </div>
                <span className="text-sm font-medium tracking-wide text-white/70 group-hover:text-white transition-colors">
                  {item.platform.charAt(0).toUpperCase() + item.platform.slice(1)}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col items-center md:items-end gap-6 w-full md:basis-1/3">
          <h4 className="text-[10px] tracking-[0.3em] uppercase font-bold text-white/50">Hızlı Menü</h4>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-[10px] tracking-[0.2em] uppercase text-white/70 font-medium text-center md:text-right min-w-max">
             {footerLinks.map((item, i) => (
                <Link
                   key={i}
                   href={resolveHref(item)}
                   target={item.openInNewTab ? "_blank" : undefined}
                   rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                   className="hover:text-brandRed transition-colors whitespace-nowrap"
                >
                   {item.label}
                </Link>
             ))}
          </div>
        </div>

      </div>

      <div className="mt-12 md:mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 text-[10px] text-white/40 uppercase tracking-widest text-center md:text-left">
        <p>© {currentYear} {settings?.siteName}. Tüm hakları saklıdır.</p>
        <div className="flex gap-6">
           <Link href="/yasal/gizlilik-politikasi" className="hover:text-white transition-colors">Gizlilik Politikası</Link>
           <Link href="/yasal/kullanim-kosullari" className="hover:text-white transition-colors">Kullanım Koşulları</Link>
        </div>
      </div>
    </footer>
  );
}
