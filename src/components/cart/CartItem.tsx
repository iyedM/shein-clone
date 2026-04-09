"use client";

import Image from "next/image";
import { Trash2, Heart, Plus, Minus } from "lucide-react";
import type { CartItem as CartItemType } from "@/types/cart";
import { useCartStore } from "@/store/cartStore";
import { PriceTag } from "@/components/ui/PriceTag";
import { motion } from "framer-motion";

type CartItemProps = {
  item: CartItemType;
};

export function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <article className="group bg-white rounded-[2.5rem] p-5 md:p-6 grid grid-cols-[120px_1fr] md:grid-cols-[160px_1fr] gap-6 md:gap-8 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 border border-transparent hover:border-gray-100">
      {/* Product Image */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-gray-50">
        <Image
          src={item.product.images[0]}
          alt={item.product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 120px, 160px"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col py-1">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="text-sm md:text-xl font-black uppercase tracking-tight italic font-heading mb-1">
              {item.product.name}
            </h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Couleur: <span className="text-black">{item.color}</span></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Taille: <span className="text-black">{item.size}</span></span>
            </div>
          </div>
          <PriceTag price={item.product.price} originalPrice={item.product.originalPrice} className="text-lg md:text-xl" />
        </div>

        <div className="mt-auto flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6">
          {/* Quantity Controls */}
          <div className="flex items-center gap-1 bg-[#FAFAF8] p-1.5 rounded-2xl w-fit border border-gray-100">
            <button
              onClick={() => updateQuantity(item.id, item.color, item.size, Math.max(1, item.quantity - 1))}
              className="h-10 w-10 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-xl transition-all text-gray-400 hover:text-[#111111]"
            >
              <Minus size={16} />
            </button>
            <span className="w-10 text-center text-xs font-black">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)}
              className="h-10 w-10 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-xl transition-all text-gray-400 hover:text-[#111111]"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Secondary Actions */}
          <div className="flex items-center gap-6">
            <button
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-300 hover:text-[#E8393A] transition-colors"
              onClick={() => {/* To Implement */ }}
            >
              <Heart size={14} /> Wishlist
            </button>
            <button
              onClick={() => removeItem(item.id, item.color, item.size)}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#E8393A]/50 hover:text-[#E8393A] transition-colors"
            >
              <Trash2 size={14} /> Supprimer
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
