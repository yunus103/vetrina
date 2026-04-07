"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SanityImage } from "@/components/ui/SanityImage";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
  openInNewTab?: boolean;
  subLinks?: NavItem[];
};

function resolveHref(item: NavItem): string {
  return item.href || "#";
}

export function Header({ settings, navigation }: { settings: any; navigation: any }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const links: NavItem[] = navigation?.headerLinks || [];

  // Sayfa değiştiğinde menüyü kapat
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

  const navBaseClass = "fixed top-0 left-0 w-full z-50 px-6 md:px-8 flex justify-between items-center transition-all duration-500 ease-in-out";
  
  const isTransparent = pathname === "/" && !isScrolled;

  const scrolledClass = isTransparent 
    ? "bg-transparent py-4 md:py-6" 
    : "bg-white/95 backdrop-blur-md py-3 md:py-4 shadow-sm";

  const textClass = isTransparent
    ? "text-white"
    : "text-primary"; 

  const isActive = (item: NavItem) => {
    const href = resolveHref(item);
    if (href === "/" && pathname !== "/") return false;
    return pathname.startsWith(href);
  };

  return (
    <header className={cn(navBaseClass, scrolledClass)}>
      <div className="flex items-center relative z-[70]">
        <Link href="/" onClick={() => setMenuOpen(false)}>
          {settings?.logo ? (
             <div className="relative w-28 h-8 md:w-40 md:h-12 flex items-center">
                <SanityImage
                  image={settings.logo}
                  width={400}
                  height={120}
                  fit="max"
                  className="h-full w-auto object-contain object-left"
                  priority
                />
             </div>
          ) : (
             <span className={cn(
               "text-2xl md:text-3xl font-display tracking-tighter font-extrabold hover:opacity-80 transition-opacity",
               menuOpen ? "text-primary" : "text-brandRed"
             )}>
               {settings?.siteName || 'Vetrina'}
             </span>
          )}
        </Link>
      </div>

      {/* Desktop Menu */}
      <nav className={cn(
        "hidden md:flex items-center gap-10 text-[10px] tracking-[0.2em] uppercase font-medium transition-colors duration-300",
        textClass
      )}>
        {links.map((item, i) => (
          <DesktopNavItem key={i} item={item} active={isActive(item)} scrolled={isScrolled} />
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden relative z-[70] w-10 h-10 flex items-center justify-center"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className={cn(
          "material-symbols-outlined text-3xl transition-colors duration-300",
          menuOpen ? 'text-primary' : textClass.split(' ')[0]
        )}>
          {menuOpen ? 'close' : 'menu'}
        </span>
      </button>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 h-[100dvh] bg-backgroundLight z-[60] flex flex-col items-center justify-center transition-transform duration-500 ease-in-out",
        menuOpen ? 'translate-x-0' : 'translate-x-full'
      )}>
        <div className="flex flex-col gap-8 text-center text-2xl tracking-[0.1em] uppercase font-display font-medium text-primary w-full px-6">
          {links.map((item, i) => (
            <div key={i} className="flex flex-col gap-4">
              <Link 
                href={resolveHref(item)} 
                onClick={() => setMenuOpen(false)} 
                className={cn(
                  "hover:text-brandRed transition-colors",
                  isActive(item) ? "text-brandRed" : ""
                )}
              >
                {item.label}
              </Link>
              {item.subLinks && item.subLinks.length > 0 && (
                <div className="flex flex-col gap-4 mb-4 text-xl opacity-70">
                   {item.subLinks.map((sub, j) => (
                     <Link
                        key={j}
                        href={resolveHref(sub)}
                        onClick={() => setMenuOpen(false)}
                        className={cn(
                           "hover:text-brandRed transition-colors",
                           pathname === resolveHref(sub) ? "text-brandRed" : ""
                        )}
                     >
                        - {sub.label}
                     </Link>
                   ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

function DesktopNavItem({ item, active, scrolled }: { item: NavItem; active: boolean; scrolled: boolean }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isSubActive = item.subLinks?.some(sub => pathname === resolveHref(sub));
  const reallyActive = active || isSubActive;

  if (!item.subLinks || item.subLinks.length === 0) {
    return (
      <Link
        href={resolveHref(item)}
        target={item.openInNewTab ? "_blank" : undefined}
        rel={item.openInNewTab ? "noopener noreferrer" : undefined}
        className={cn(
          "hover:text-brandRed transition-colors",
          reallyActive ? "text-brandRed" : ""
        )}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div 
      className="relative group py-4"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={resolveHref(item)}
        className={cn(
          "flex items-center gap-1 hover:text-brandRed transition-colors",
          reallyActive ? "text-brandRed" : ""
        )}
      >
        {item.label}
        <span className="material-symbols-outlined text-[10px] leading-none transition-transform duration-200" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}}>
          expand_more
        </span>
      </Link>
      
      {/* Dropdown Menu */}
      <div 
        className={cn(
          "absolute left-0 top-[100%] min-w-[200px] transition-all duration-300 origin-top-left",
          isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        <div className="bg-white border rounded-sm shadow-xl p-2 overflow-hidden flex flex-col gap-1 text-primary">
          {item.subLinks.map((sub, j) => {
             const subActive = pathname === resolveHref(sub);
             return (
                <Link
                  key={j}
                  href={resolveHref(sub)}
                  target={sub.openInNewTab ? "_blank" : undefined}
                  rel={sub.openInNewTab ? "noopener noreferrer" : undefined}
                  className={cn(
                    "px-4 py-3 hover:bg-backgroundLight hover:text-brandRed transition-colors tracking-widest",
                    subActive ? "text-brandRed bg-backgroundLight/50" : ""
                  )}
                >
                  {sub.label}
                </Link>
             );
          })}
        </div>
      </div>
    </div>
  );
}
