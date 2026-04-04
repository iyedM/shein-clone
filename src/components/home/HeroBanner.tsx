"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { heroBanners } from "@/lib/catalog";

export function HeroBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % heroBanners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const active = heroBanners[index];

  return (
    <section className="relative w-full overflow-hidden bg-[#111111] h-[500px] md:h-[650px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Background Gradient & Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${active.gradient} opacity-90`} />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(232,57,58,0.15)_0%,transparent_60%)]" />

          <div className="relative mx-auto flex h-full max-w-[1400px] items-center px-6 md:px-12">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="max-w-2xl text-white"
            >
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">Premium Collection</p>
              <h1 className="hero-title mt-4 text-white">{active.title}</h1>
              <p className="mt-6 text-lg md:text-xl font-medium text-white/90 max-w-lg leading-relaxed">{active.subtitle}</p>
              <div className="mt-10 flex items-center gap-6">
                <button className="btn-pulse bg-[#E8393A] px-8 py-4 text-sm font-bold text-white transition-all hover:bg-[#d12e2f] active:scale-95 rounded-none uppercase tracking-widest">
                  {active.cta}
                </button>
                <button className="px-8 py-4 text-sm font-bold text-white border border-white/30 hover:bg-white hover:text-[#111111] transition-all rounded-none uppercase tracking-widest">
                  View Lookbook
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-10 left-0 right-0 z-10 flex justify-center gap-3">
        {heroBanners.map((banner, dotIndex) => (
          <button
            key={banner.id}
            className={`h-1 transition-all duration-500 ease-out ${dotIndex === index ? "w-12 bg-[#E8393A]" : "w-6 bg-white/30 hover:bg-white/50"}`}
            onClick={() => setIndex(dotIndex)}
            aria-label={`Go to slide ${dotIndex + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
