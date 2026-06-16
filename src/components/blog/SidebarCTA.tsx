import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function SidebarCTA() {
  return (
    <div className="bg-backgroundLight p-6 border border-gray-100 dark:border-white/5 rounded-sm shadow-sm">
      <h3 className="font-display text-lg text-primary mb-2 uppercase tracking-wide">
        Ofisinizi Birlikte Tasarlayalım
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
        Ücretsiz iç mimari destek ve özel tasarım ofis mobilyaları projelerimiz için bizimle iletişime geçin.
      </p>
      
      <Link 
        href="/iletisim"
        className="w-full group flex items-center justify-between bg-primary text-white dark:bg-white dark:text-black dark:hover:bg-brandRed dark:hover:text-white px-4 py-3 uppercase text-[9px] tracking-[0.25em] font-medium hover:bg-brandRed transition-all duration-300"
      >
        <span>İLETİŞİME GEÇ & TEKLİF AL</span>
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
