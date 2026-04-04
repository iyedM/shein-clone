"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star } from "lucide-react";
import type { Product, ProductColor } from "@/types/product";
import { PriceTag } from "@/components/ui/PriceTag";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { ColorSelector } from "@/components/product/ColorSelector";
import { SizeSelector } from "@/components/product/SizeSelector";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import {
  Dialog,
  DialogContent,
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
  const baseWatching = useMemo(
    () => ((product.id.charCodeAt(1) + product.id.charCodeAt(2)) % 40) + 8,
    [product.id]
  );
  const [watching, setWatching] = useState(baseWatching);

  const addItem = useCartStore((state) => state.addItem);
  const pushToast = useToastStore((state) => state.push);

  useEffect(() => {
    const interval = setInterval(() => {
      setWatching(Math.floor(Math.random() * 40) + 8);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const addToCart = () => {
    if (!size) {
      setShake(true);
      setTimeout(() => setShake(false), 350);
      return;
    }

    addItem({ product, quantity, color: selectedColor.name, size });
    pushToast("Ajouté au panier");
  };

  return (
    <section className="space-y-4">
      <h1 className="text-lg font-bold">{product.name}</h1>

      <a href="#reviews" className="inline-flex items-center gap-1 text-xs text-[#888888]">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} className={`h-3 w-3 ${index < Math.round(product.rating) ? "fill-[#111111] text-[#111111]" : "text-[#d9d9d9]"}`} />
        ))}
        <span>({product.reviewCount})</span>
      </a>

      <AnimatePresence mode="wait">
        <motion.p
          key={watching}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="text-xs font-bold text-[#FF6B00]"
        >
          {watching} personnes regardent cet article en ce moment
        </motion.p>
      </AnimatePresence>

      <PriceTag price={product.price} originalPrice={product.originalPrice} discountPercent={product.discountPercent} large />

      {product.badge === "FLASH" ? (
        <div className="inline-flex items-center gap-2 bg-[#E8393A] px-2 py-1 text-xs font-bold text-white">
          Vente flash <CountdownTimer mode="midnight" />
        </div>
      ) : null}

      <ColorSelector colors={product.colors} value={selectedColor.name} onChange={setSelectedColor} />
      <SizeSelector sizes={product.sizes} value={size} onChange={setSize} />

      <Dialog>
        <DialogTrigger asChild>
          <button className="text-xs underline">Guide des tailles</button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Guide des tailles</DialogTitle>
          </DialogHeader>
          <p className="text-xs text-[#888888]">Mesure ta poitrine, ta taille et tes hanches puis compare avec le tableau produit.</p>
        </DialogContent>
      </Dialog>

      <div className="flex items-center gap-2">
        <button onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="h-8 w-8 border border-[#e8e8e8]">-</button>
        <span className="w-6 text-center text-sm font-bold">{quantity}</span>
        <button onClick={() => setQuantity((value) => value + 1)} className="h-8 w-8 border border-[#e8e8e8]">+</button>
      </div>

      <button onClick={addToCart} className={`w-full bg-[#111111] py-3 text-xs font-black text-white ${shake ? "animate-pulse" : ""}`}>
        Ajouter au panier
      </button>
      <button className="w-full bg-[#E8393A] py-3 text-xs font-black text-white">Acheter maintenant</button>

      <div className="space-y-1 text-xs text-[#888888]">
        <p>Livraison estimée entre 5 et 8 jours — offerte dès 39€</p>
        <p>Retours gratuits 30 jours</p>
      </div>

      <div className="space-y-2 border-t border-[#e8e8e8] pt-3">
        <details className="border border-[#e8e8e8] p-2">
          <summary className="cursor-pointer text-xs font-bold">Description</summary>
          <p className="mt-2 text-xs text-[#888888]">{product.description}</p>
        </details>
        <details className="border border-[#e8e8e8] p-2">
          <summary className="cursor-pointer text-xs font-bold">Matières</summary>
          <p className="mt-2 text-xs text-[#888888]">{product.material}</p>
        </details>
        <details className="border border-[#e8e8e8] p-2">
          <summary className="cursor-pointer text-xs font-bold">Entretien</summary>
          <p className="mt-2 text-xs text-[#888888]">Lavage machine à 30°C, ne pas blanchir.</p>
        </details>
      </div>
    </section>
  );
}
