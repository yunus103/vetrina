'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, ContactFormData } from '@/lib/schemas/contact';
import { sendContactEmail } from '@/app/actions/contact';
import { toast } from 'sonner';
import { ArrowRight } from 'lucide-react';

export function SidebarContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (formData: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const result = await sendContactEmail(formData);
      
      if (result.success) {
        toast.success("Talebiniz alınmıştır! Sizinle en kısa sürede iletişime geçeceğiz.");
        reset();
      } else {
        toast.error(result.error || "Talebiniz gönderilemedi. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      toast.error("Beklenmedik bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-backgroundLight p-6 border border-gray-100 rounded-sm shadow-sm">
      <h3 className="font-display text-lg text-primary mb-2 uppercase tracking-wide">
        Ofisinizi Birlikte Tasarlayalım
      </h3>
      <p className="text-xs text-gray-500 mb-6 leading-relaxed">
        Ücretsiz iç mimari destek ve özel tasarım ofis mobilyaları için hemen bilgi alın.
      </p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="relative">
          <input 
            type="text" 
            placeholder="ADINIZ" 
            {...register("name")}
            className="w-full bg-transparent border-0 border-b border-gray-200 py-2 px-0 focus:ring-0 focus:border-brandRed transition-colors placeholder:text-gray-400 placeholder:text-[9px] placeholder:tracking-widest uppercase text-xs"
          />
          {errors.name && <span className="text-[9px] text-red-500 mt-1 uppercase block tracking-tighter italic">{errors.name.message}</span>}
        </div>

        <div className="relative">
          <input 
            type="text" 
            placeholder="SOYADINIZ" 
            {...register("surname")}
            className="w-full bg-transparent border-0 border-b border-gray-200 py-2 px-0 focus:ring-0 focus:border-brandRed transition-colors placeholder:text-gray-400 placeholder:text-[9px] placeholder:tracking-widest uppercase text-xs"
          />
          {errors.surname && <span className="text-[9px] text-red-500 mt-1 uppercase block tracking-tighter italic">{errors.surname.message}</span>}
        </div>

        <div className="relative">
          <input 
            type="email" 
            placeholder="E-POSTA ADRESİNİZ" 
            {...register("email")}
            className="w-full bg-transparent border-0 border-b border-gray-200 py-2 px-0 focus:ring-0 focus:border-brandRed transition-colors placeholder:text-gray-400 placeholder:text-[9px] placeholder:tracking-widest uppercase text-xs"
          />
          {errors.email && <span className="text-[9px] text-red-500 mt-1 uppercase block tracking-tighter italic">{errors.email.message}</span>}
        </div>

        <div className="relative">
          <textarea 
            rows={3} 
            placeholder="TALEBİNİZ VEYA MESAJINIZ" 
            {...register("message")}
            className="w-full bg-transparent border-0 border-b border-gray-200 py-2 px-0 focus:ring-0 focus:border-brandRed transition-colors placeholder:text-gray-400 placeholder:text-[9px] placeholder:tracking-widest uppercase text-xs resize-none"
          ></textarea>
          {errors.message && <span className="text-[9px] text-red-500 mt-1 uppercase block tracking-tighter italic">{errors.message.message}</span>}
        </div>

        <div className="pt-2">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full group flex items-center justify-between bg-primary text-white px-4 py-3 uppercase text-[9px] tracking-[0.25em] font-medium hover:bg-brandRed transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{isSubmitting ? 'GÖNDERİLİYOR...' : 'TEKLİF TALEBİ GÖNDER'}</span>
            {!isSubmitting && <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </div>
      </form>
    </div>
  );
}
