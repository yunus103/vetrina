"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useDragControls, PanInfo } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { SanityImage } from "@/components/ui/SanityImage";

interface ReferansModalProps {
  referans: {
    firmaAdi: string;
    slug: string;
    kisaAciklama?: string;
    firmaLogosu?: any;
    galeri?: any[];
  } | null;
}

export function ReferansModal({ referans }: ReferansModalProps) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const touchStartX = useRef<number>(0);
  const dragControls = useDragControls();
  const isOpen = referans !== null;
  const images = referans?.galeri ?? [];

  // ── Lenis scroll lock ──────────────────────────────────────────────────────
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lenis = (window as any).lenis;
    if (isOpen) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).lenis?.start();
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  // Reset gallery index when modal opens
  useEffect(() => {
    if (isOpen) setActiveIndex(0);
  }, [referans?.slug, isOpen]);

  // ── Close modal ────────────────────────────────────────────────────────────
  const close = useCallback(() => {
    router.push("/referanslarimiz", { scroll: false });
  }, [router]);

  // ── Keyboard navigation ────────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, close, images.length]);

  // ── Paginate ───────────────────────────────────────────────────────────────
  const paginate = (dir: number) => {
    setDirection(dir);
    setActiveIndex((prev) => {
      if (dir === 1) return prev < images.length - 1 ? prev + 1 : 0;
      return prev > 0 ? prev - 1 : images.length - 1;
    });
  };

  // ── Touch swipe (mobile) ──────────────────────────────────────────────────
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) paginate(delta > 0 ? 1 : -1);
  };

  // ── Framer drag (desktop) ─────────────────────────────────────────────────
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    if (offset.x > 80 || (offset.x > 20 && velocity.x > 300)) {
      paginate(-1);
    } else if (offset.x < -80 || (offset.x < -20 && velocity.x < -300)) {
      paginate(1);
    }
  };

  // ── Slide variants ─────────────────────────────────────────────────────────
  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <AnimatePresence>
      {isOpen && referans && (
        <>
          {/* ── Backdrop ──────────────────────────────────────────────── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          {/* ── Modal panel ───────────────────────────────────────────── */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-label={referans.firmaAdi}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4 md:p-8 pointer-events-none"
          >
            <div
              className="relative w-full max-w-5xl max-h-[90vh] bg-backgroundLight flex flex-col md:flex-row overflow-hidden pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Close button ──────────────────────────────────────── */}
              <button
                onClick={close}
                aria-label="Kapat"
                className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center text-primary/50 hover:text-primary transition-colors cursor-pointer group"
              >
                <X
                  size={24}
                  className="transform group-hover:rotate-90 transition-transform duration-300"
                />
              </button>

              {/* ══ LEFT — Gallery ════════════════════════════════════════ */}
              <div
                className="relative w-full md:w-[58%] aspect-[4/3] md:aspect-auto md:min-h-[480px] bg-black overflow-hidden flex-shrink-0 select-none"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {images.length > 0 ? (
                  <>
                    <AnimatePresence initial={false} custom={direction}>
                      <motion.div
                        key={activeIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        /* ── Desktop drag-to-swipe ─────────────────────── */
                        drag={images.length > 1 ? "x" : false}
                        dragControls={dragControls}
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={handleDragEnd}
                        className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
                      >
                        {/* object-contain so full image is always visible */}
                        <SanityImage
                          image={images[activeIndex]}
                          fill
                          sizes="(max-width: 768px) 100vw, 58vw"
                          objectFit="contain"
                          className="pointer-events-none"
                          quality={85}
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Arrow buttons — multiple images only */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={() => paginate(-1)}
                          aria-label="Önceki fotoğraf"
                          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-black/40 hover:bg-black/70 text-white transition-colors cursor-pointer"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          onClick={() => paginate(1)}
                          aria-label="Sonraki fotoğraf"
                          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-black/40 hover:bg-black/70 text-white transition-colors cursor-pointer"
                        >
                          <ChevronRight size={20} />
                        </button>

                        {/* Dot indicators */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                          {images.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                setDirection(i > activeIndex ? 1 : -1);
                                setActiveIndex(i);
                              }}
                              aria-label={`Fotoğraf ${i + 1}`}
                              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                                i === activeIndex
                                  ? "bg-white scale-125"
                                  : "bg-white/50 hover:bg-white/80"
                              }`}
                            />
                          ))}
                        </div>

                        {/* Counter */}
                        <div className="absolute top-3 left-3 z-10 text-white/60 text-xs font-body tracking-widest">
                          {activeIndex + 1} / {images.length}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/20">
                    <span className="text-sm font-body tracking-widest uppercase">Görsel Yok</span>
                  </div>
                )}
              </div>

              {/* ══ RIGHT — Info ══════════════════════════════════════════ */}
              <div className="flex flex-col justify-center p-8 md:p-10 gap-6 md:w-[42%] overflow-y-auto">

                {/* Logo — fill+contain inside a constrained box, never clipped */}
                {referans.firmaLogosu && (
                  <div className="relative w-36 h-10">
                    <SanityImage
                      image={referans.firmaLogosu}
                      fill
                      sizes="144px"
                      objectFit="contain"
                      className="!object-left !object-contain"
                    />
                  </div>
                )}

                {/* Red line divider — no label */}
                <span className="w-8 h-[1px] bg-brandRed flex-shrink-0" />

                {/* Firma adı */}
                <h2 className="font-display text-2xl md:text-3xl leading-snug">
                  {referans.firmaAdi}
                </h2>

                {/* Açıklama */}
                {referans.kisaAciklama && (
                  <p className="font-body text-sm leading-relaxed text-primary/70">
                    {referans.kisaAciklama}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
