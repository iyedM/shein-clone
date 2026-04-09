"use client";

import Link from "next/link";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { allProducts } from "@/lib/catalog";
import { ProductGrid } from "@/components/product/ProductGrid";
import { motion } from "framer-motion";
import { Zap, TrendingUp } from "lucide-react";

export function FlashSaleSection() {
  const products = allProducts.filter((item) => item.badge === "FLASH").slice(0, 4);

  return (
    <section className="relative mt-20 w-full bg-[#0a0a0a] py-20 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E8393A] rounded-full blur-[150px] opacity-10 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white rounded-full blur-[120px] opacity-5 translate-y-1/2 -translate-x-1/2" />

      <div className="mx-auto max-w-[1400px] px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 px-3 py-1 bg-[#E8393A] text-white text-[10px] font-black uppercase tracking-[0.2em]">
                <Zap size={12} fill="white" />
                Vente Limitée
              </span>
              <span className="flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">
                <TrendingUp size={12} />
                +2.5k vendus aujourd'hui
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic leading-none">
                VENTE <span className="text-[#E8393A]">FLASH</span>
              </h2>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Fin de l'offre dans :</span>
                <CountdownTimer mode="hours4" className="text-4xl md:text-5xl font-black font-heading text-white tabular-nums tracking-tighter" />
              </div>
            </div>
          </div>

          <Link href="/products/prix-de-ouf" className="group flex items-center gap-4 text-xs font-black text-white transition-all bg-white/5 border border-white/10 px-8 py-5 hover:bg-[#E8393A] hover:border-[#E8393A]">
            <span className="uppercase tracking-[0.2em]">Voir toute l'offre</span>
            <div className="w-8 h-[1px] bg-white/30 group-hover:w-12 transition-all group-hover:bg-white" />
            <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <ProductGrid products={products} columns={4} />
        </motion.div>
      </div>
    </section>
  );
}
