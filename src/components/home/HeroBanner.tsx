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
    <section className="mx-auto mt-3 grid max-w-7xl gap-3 px-3 md:grid-cols-3 md:px-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.3 }}
          className={`relative col-span-2 min-h-64 overflow-hidden bg-gradient-to-br ${active.gradient} p-6 text-white`}
        >
          <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }}>
            <p className="text-xs uppercase tracking-widest">Promo SHEIN</p>
            <h1 className="mt-2 text-3xl font-black md:text-5xl">{active.title}</h1>
            <p className="mt-2 text-sm md:text-base">{active.subtitle}</p>
            <button className="mt-4 bg-white px-5 py-2 text-xs font-black text-[#111111]">{active.cta}</button>
          </motion.div>
          <div className="absolute bottom-3 left-6 flex gap-1">
            {heroBanners.map((banner, dotIndex) => (
              <button
                key={banner.id}
                className={`h-1.5 w-6 ${dotIndex === index ? "bg-white" : "bg-white/40"}`}
                onClick={() => setIndex(dotIndex)}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="grid gap-3 md:grid-rows-2">
        <div className="bg-gradient-to-br from-[#111111] to-[#353535] p-4 text-white">
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
