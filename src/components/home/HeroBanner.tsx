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
    <section className="mx-auto mt-4 grid max-w-7xl gap-4 px-3 md:grid-cols-3 md:px-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.3 }}
          className={`relative col-span-2 min-h-72 overflow-hidden bg-gradient-to-br ${active.gradient} p-8 text-white rounded-xl shadow-lg`}
        >
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
            <p className="text-xs uppercase tracking-widest font-bold">Promo SHEIN</p>
            <h1 className="mt-3 text-4xl font-black md:text-6xl leading-tight">{active.title}</h1>
            <p className="mt-3 text-base md:text-lg font-medium">{active.subtitle}</p>
            <button className="mt-6 bg-white px-6 py-3 text-sm font-black text-[#E8393A] hover:shadow-lg transition-all duration-300 rounded-lg">{active.cta}</button>
          </motion.div>
          <div className="absolute bottom-5 left-8 flex gap-2">
            {heroBanners.map((banner, dotIndex) => (
              <button
                key={banner.id}
                className={`h-2 transition-all duration-300 ${dotIndex === index ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/70"}`}
                onClick={() => setIndex(dotIndex)}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="grid gap-4 md:grid-rows-2">
        <div className="bg-gradient-to-br from-[#111111] to-[#353535] p-6 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <p className="text-xs font-bold">Top ventes</p>
          <p className="mt-1 text-xl font-black">-70%</p>
          <button className="mt-3 border border-white px-3 py-1 text-xs">Shop now</button>
        </div>
        <div className="bg-gradient-to-br from-[#ff6b00] to-[#e8393a] p-4 text-white">
          <p className="text-xs font-bold">Nouveautés</p>
          <p className="mt-1 text-xl font-black">Dès 4.99€</p>
          <button className="mt-3 border border-white px-3 py-1 text-xs">Voir</button>
        </div>
      </div>
    </section>
  );
}
