"use client";

import { useMemo, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { CreditCard, Tag, ArrowRight, ShieldCheck, Info } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { motion } from "framer-motion";

export function CartSummary() {
  const [coupon, setCoupon] = useState("");
  const totalPrice = useCartStore((state) => state.totalPrice());

  const shipping = useMemo(() => (totalPrice >= 39 ? 0 : 4.99), [totalPrice]);
  const savings = useMemo(() => totalPrice * 0.15, [totalPrice]); // Example savings
  const total = useMemo(() => totalPrice + shipping, [shipping, totalPrice]);

  return (
    <aside className="bg-white rounded-[3rem] p-8 md:p-10 shadow-premium border border-gray-50 overflow-hidden relative group">
      {/* Decorative background flare */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#E8393A] rounded-full blur-[100px] opacity-[0.03] group-hover:opacity-[0.05] transition-opacity" />

      <h2 className="text-xl font-black uppercase tracking-tight italic font-heading mb-8">
        Résumé <span className="text-gray-300">Commande</span>
      </h2>

      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Sous-total</span>
          <span className="text-sm font-bold">{totalPrice.toFixed(2)}€</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Livraison</span>
            <button className="text-gray-300 hover:text-black transition-colors"><Info size={12} /></button>
          </div>
          <span className={`text-sm font-bold ${shipping === 0 ? "text-green-500" : ""}`}>
            {shipping === 0 ? "Gratuite" : `${shipping.toFixed(2)}€`}
          </span>
        </div>

        {savings > 0 && (
          <div className="flex justify-between items-center text-green-500">
            <span className="text-[10px] font-black uppercase tracking-widest">Économies (Club SHINE)</span>
            <span className="text-sm font-bold">-{savings.toFixed(2)}€</span>
          </div>
        )}

        <div className="pt-6 mt-6 border-t border-dashed border-gray-100">
          <div className="flex justify-between items-end">
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Total TTC</span>
            <div className="text-right">
              <p className="text-3xl font-black font-heading tracking-tighter italic leading-none">{total.toFixed(2)}€</p>
              <p className="text-[9px] font-bold text-gray-300 uppercase mt-1">ou 3x sans frais de {(total / 3).toFixed(2)}€</p>
            </div>
          </div>
        </div>
      </div>

      {/* Coupon section */}
      <div className="mt-10 relative">
        <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
        <input
          value={coupon}
          onChange={(event) => setCoupon(event.target.value)}
          placeholder="CODE PROMO"
          className="w-full bg-[#FAFAF8] border border-gray-100 rounded-2xl px-12 py-4 text-[10px] font-black uppercase tracking-widest outline-none focus:border-black transition-all placeholder:text-gray-300"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-black uppercase text-[#E8393A] hover:text-[#111111] transition-colors">
          Appliquer
        </button>
      </div>

      <div className="mt-8 space-y-4">
        <MagneticButton className="w-full">
          <button className="w-full bg-[#111111] text-white py-6 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-3 shadow-2xl transition-all hover:bg-[#E8393A]">
            Paiement Sécurisé <ArrowRight size={16} />
          </button>
        </MagneticButton>

        <p className="flex items-center justify-center gap-2 text-[9px] font-black text-gray-300 uppercase tracking-widest">
          <ShieldCheck size={14} className="text-green-500" /> Garantie protection acheteur 2026
        </p>
      </div>

      {/* Payment methods */}
      <div className="mt-10 pt-8 border-t border-gray-50 flex items-center justify-center gap-6">
        {["VISA", "PAYPAL", "APPLE"].map((pay) => (
          <div key={pay} className="grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all cursor-crosshair">
            <span className="text-[10px] font-black italic font-heading tracking-widest">{pay}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
