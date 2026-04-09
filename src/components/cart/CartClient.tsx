"use client";

import { useCartStore } from "@/store/cartStore";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { ProductCard } from "@/components/product/ProductCard";
import { allProducts } from "@/lib/catalog";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowLeft, Sparkles, Truck, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function CartClient() {
  const items = useCartStore((state) => state.items);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-[#FAFAF8] min-h-screen pb-20">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100 py-12 md:py-20 mb-10">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Continuer le shopping
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-5xl md:text-7xl font-black font-heading italic uppercase leading-none tracking-tighter">
                VOTRE <span className="text-gray-300">PANIER</span>
              </h1>
              <p className="mt-4 text-gray-400 text-sm font-medium tracking-tight">
                {items.length} articles soigneusement sélectionnés pour votre style.
              </p>
            </div>
            {items.length > 0 && (
              <div className="flex gap-4">
                <div className="flex items-center gap-3 bg-green-50 px-5 py-3 rounded-2xl">
                  <Truck size={18} className="text-green-600" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-green-700">Livraison Express Offerte</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[3rem] p-20 text-center shadow-premium"
          >
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-200">
              <ShoppingBag size={40} />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tight mb-4 italic font-heading">Votre panier est vide</h2>
            <p className="text-gray-400 max-w-sm mx-auto mb-10 text-sm leading-relaxed">
              Il semble que vous n'ayez pas encore trouvé votre coup de cœur. Explorez nos dernières collections pour commencer.
            </p>
            <Link
              href="/"
              className="inline-flex h-16 items-center px-12 bg-[#111111] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#E8393A] transition-all shadow-xl"
            >
              Explorer la boutique
            </Link>
          </motion.div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
            {/* List Section */}
            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {items.map((item, idx) => (
                  <motion.div
                    key={`${item.id}-${item.color}-${item.size}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <CartItem item={item} />
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Trust Badge Bar */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl flex items-center gap-4 border border-white">
                  <ShieldCheck className="text-[#E8393A]" size={24} />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest">Paiement 100% Sécurisé</p>
                    <p className="text-[10px] text-gray-400 font-medium">Protocoles bancaires 2026</p>
                  </div>
                </div>
                <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl flex items-center gap-4 border border-white">
                  <Sparkles className="text-[#E8393A]" size={24} />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest">Qualité SHINE Luxe</p>
                    <p className="text-[10px] text-gray-400 font-medium">Contrôle certifié avant envoi</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Section Sticky */}
            <div className="lg:sticky lg:top-32 h-fit">
              <CartSummary />
            </div>
          </div>
        )}

        {/* Recommendations Section */}
        <section className="mt-32">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#E8393A] mb-4">SUGGESTIONS</h2>
              <h3 className="text-4xl font-black font-heading italic uppercase tracking-tighter">VOUS AIMEREZ <span className="text-gray-300">AUSSI</span></h3>
            </div>
            <Link href="/" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors underline underline-offset-8">
              VOIR TOUT
            </Link>
          </div>

          <div className="relative group">
            <div className="flex gap-6 overflow-x-auto no-scrollbar pb-10 scroll-smooth px-2">
              {allProducts.slice(0, 8).map((product) => (
                <div key={product.id} className="min-w-[280px] md:min-w-[320px]">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
