'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, ContactFormData } from '@/lib/schemas/contact';
import { sendContactEmail } from '@/app/actions/contact';
import { toast } from 'sonner';

export function ContactForm() {
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
        toast.success("Mesajınız başarıyla gönderildi! Sizinle en kısa sürede iletişime geçeceğiz.");
        reset();
      } else {
        toast.error(result.error || "Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin.");
      }
    } catch (error) {
      toast.error("Beklenmedik bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <input 
            type="text" 
            placeholder="ADINIZ" 
            {...register("name")}
            className={`w-full bg-transparent border-0 border-b ${errors.name ? 'border-red-500' : 'border-gray-200'} py-3 px-0 focus:ring-0 focus:border-brandRed transition-colors placeholder:text-gray-400 placeholder:text-[10px] placeholder:tracking-widest uppercase text-sm`} 
          />
          {errors.name && <span className="text-[10px] text-red-500 mt-1 uppercase tracking-tighter italic">{errors.name.message}</span>}
        </div>
        <div className="relative">
          <input 
            type="text" 
            placeholder="SOYADINIZ" 
            {...register("surname")}
            className={`w-full bg-transparent border-0 border-b ${errors.surname ? 'border-red-500' : 'border-gray-200'} py-3 px-0 focus:ring-0 focus:border-brandRed transition-colors placeholder:text-gray-400 placeholder:text-[10px] placeholder:tracking-widest uppercase text-sm`} 
          />
          {errors.surname && <span className="text-[10px] text-red-500 mt-1 uppercase tracking-tighter italic">{errors.surname.message}</span>}
        </div>
      </div>
      <div className="relative">
        <input 
          type="email" 
          placeholder="E-POSTA ADRESİNİZ" 
          {...register("email")}
          className={`w-full bg-transparent border-0 border-b ${errors.email ? 'border-red-500' : 'border-gray-200'} py-3 px-0 focus:ring-0 focus:border-brandRed transition-colors placeholder:text-gray-400 placeholder:text-[10px] placeholder:tracking-widest uppercase text-sm`} 
        />
        {errors.email && <span className="text-[10px] text-red-500 mt-1 uppercase tracking-tighter italic">{errors.email.message}</span>}
      </div>
      <div className="relative">
        <textarea 
          rows={3} 
          placeholder="MESAJINIZ" 
          {...register("message")}
          className={`w-full bg-transparent border-0 border-b ${errors.message ? 'border-red-500' : 'border-gray-200'} py-3 px-0 focus:ring-0 focus:border-brandRed transition-colors placeholder:text-gray-400 placeholder:text-[10px] placeholder:tracking-widest uppercase text-sm resize-none`}
        ></textarea>
        {errors.message && <span className="text-[10px] text-red-500 mt-1 uppercase tracking-tighter italic">{errors.message.message}</span>}
      </div>
      <div className="pt-4">
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full group flex items-center justify-between bg-primary text-white px-6 py-4 uppercase text-[10px] tracking-[0.3em] font-medium hover:bg-brandRed transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>{isSubmitting ? 'GÖNDERİLİYOR...' : 'MESAJ GÖNDER'}</span>
          {!isSubmitting && <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">east</span>}
        </button>
      </div>
    </form>
  );
}
