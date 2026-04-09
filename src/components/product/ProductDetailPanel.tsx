"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, ShieldCheck, Truck, RefreshCcw, Info, Heart } from "lucide-react";
import type { Product, ProductColor } from "@/types/product";
import { PriceTag } from "@/components/ui/PriceTag";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { ColorSelector } from "@/components/product/ColorSelector";
import { SizeSelector } from "@/components/product/SizeSelector";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ProductDetailPanelProps = {
  product: Product;
};

export function ProductDetailPanel({ product }: ProductDetailPanelProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [size, setSize] = useState("");
  const [shake, setShake] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const pushToast = useToastStore((state) => state.push);
  const toggleWishlist = useWishlistStore((state) => state.toggle);
  const isWishlisted = useWishlistStore((state) => state.isWishlisted(product.id));

  const addToCart = () => {
    if (!size) {
      setShake(true);
      setTimeout(() => setShake(false), 350);
      return;
    }

    addItem({ product, quantity, color: selectedColor.name, size });
    pushToast("Ajouté au panier avec succès !");
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Product Title & Brand */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-black text-white text-[9px] font-black uppercase tracking-widest rounded-full">SHEIN LUXE</span>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Saison 2026</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tighter uppercase leading-tight italic">
          {product.name}
        </h1>
        <div className="flex items-center gap-4 mt-6">
          <div className="flex items-center gap-1 bg-yellow-400/10 px-3 py-1 rounded-full">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-black text-yellow-700">{product.rating}</span>
          </div>
          <a href="#reviews" className="text-xs font-bold text-gray-400 underline underline-offset-4 hover:text-black transition-colors">
            {product.reviewCount} avis vérifiés
          </a>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="flex items-end gap-6 p-6 bg-white rounded-3xl shadow-premium border border-gray-50">
        <PriceTag price={product.price} originalPrice={product.originalPrice} discountPercent={product.discountPercent} className="text-4xl" />

        {product.badge === "FLASH" && (
          <div className="mb-1 flex flex-col gap-1">
            <span className="text-[9px] font-black text-[#E8393A] uppercase tracking-widest">Offre expire dans :</span>
            <div className="bg-[#E8393A]/10 text-[#E8393A] px-3 py-1 rounded-full text-xs font-black flex items-center gap-2">
              <CountdownTimer mode="midnight" />
            </div>
          </div>
        )}
      </div>

      {/* Selectors */}
      <div className="space-y-8">
        <ColorSelector colors={product.colors} value={selectedColor.name} onChange={setSelectedColor} />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Choisir Taille</h3>
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-[10px] font-black uppercase tracking-widest text-[#E8393A] underline underline-offset-4">Guide des tailles</button>
              </DialogTrigger>
              <DialogContent className="max-w-xl rounded-[2rem]">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-black font-heading uppercase">Guide des Tailles</DialogTitle>
                  <DialogDescription>
                    Mesurez vos mensurations pour trouver la coupe parfaite SHEIN 2026.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase mb-2">Poitrine</p>
                    <p className="text-lg font-bold">88 - 92 cm</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase mb-2">Taille</p>
                    <p className="text-lg font-bold">66 - 70 cm</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <SizeSelector sizes={product.sizes} value={size} onChange={setSize} />
        </div>
      </div>

      {/* Quantity & Actions */}
      <div className="space-y-6">
        <div className="flex items-center gap-4 bg-gray-100 p-2 rounded-2xl w-fit">
          <button
            onClick={() => setQuantity((v) => Math.max(1, v - 1))}
            className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center font-bold hover:bg-[#E8393A] hover:text-white transition-all"
          >
            -
          </button>
          <span className="w-8 text-center text-sm font-black">{quantity}</span>
          <button
            onClick={() => setQuantity((v) => v + 1)}
            className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center font-bold hover:bg-[#E8393A] hover:text-white transition-all"
          >
            +
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[1fr_80px] gap-4">
          <MagneticButton className="w-full">
            <button
              onClick={addToCart}
              className={`w-full py-5 rounded-2xl bg-[#111111] text-white text-[11px] font-black uppercase tracking-[0.3em] shadow-xl transition-all active:scale-95 ${shake ? "animate-shake bg-red-600" : "hover:bg-[#E8393A]"}`}
            >
              Ajouter au Panier
            </button>
          </MagneticButton>

          <button
            onClick={() => toggleWishlist(product.id)}
            className={`w-full h-full aspect-square rounded-2xl border flex items-center justify-center transition-all ${isWishlisted ? "bg-[#E8393A]/10 border-[#E8393A] text-[#E8393A]" : "border-gray-200 hover:border-black"}`}
          >
            <Heart size={24} className={isWishlisted ? "fill-current" : ""} />
          </button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-100 pt-8 mt-4">
        {[
          { icon: <Truck size={18} />, title: "LIVRAISON", desc: "5-8 jours" },
          { icon: <RefreshCcw size={18} />, title: "RETOURS", desc: "30 jours" },
          { icon: <ShieldCheck size={18} />, title: "GARANTIE", desc: "Paiement 100% sécurisé" }
        ].map((badge, i) => (
          <div key={i} className="flex flex-col items-center text-center p-4 bg-[#FAFAF8] rounded-2xl">
            <div className="mb-2 text-[#E8393A]">{badge.icon}</div>
            <p className="text-[9px] font-black uppercase tracking-widest mb-1">{badge.title}</p>
            <p className="text-[10px] text-gray-400 font-bold">{badge.desc}</p>
          </div>
        ))}
      </div>

      {/* Details Accordion */}
      <div className="space-y-3 mt-8">
        {[
          { label: "DESCRIPTION", content: product.description },
          { label: "MATIÈRES & DURABILITÉ", content: product.material },
          { label: "CONSEILS D'ENTRETIEN", content: "Lavage machine à 30°C pour préserver les fibres techniques 2026. Sèche-linge déconseillé." }
        ].map((item, i) => (
          <details key={i} className="group border border-gray-100 rounded-2xl overflow-hidden bg-white">
            <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-gray-50 transition-colors">
              <span className="text-[11px] font-black uppercase tracking-[0.2em]">{item.label}</span>
              <span className="text-gray-300 group-open:rotate-180 transition-transform">↓</span>
            </summary>
            <div className="p-5 pt-0 text-sm text-gray-500 leading-relaxed font-satoshi">
              {item.content}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
