"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import type { CartItem as CartItemType } from "@/types/cart";
import { useCartStore } from "@/store/cartStore";

type CartItemProps = {
  item: CartItemType;
};

export function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <article className="grid grid-cols-[92px_1fr] gap-3 border border-[#e8e8e8] p-3">
      <div className="relative h-28 w-[92px] overflow-hidden">
        <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="92px" />
      </div>
      <div>
        <h3 className="text-sm font-bold">{item.product.name}</h3>
        <p className="mt-1 text-xs text-[#888888]">Couleur: {item.color} · Taille: {item.size}</p>

        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity - 1)}
            className="h-6 w-6 border border-[#e8e8e8] text-xs"
          >
            -
          </button>
          <span className="text-sm font-bold">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)}
            className="h-6 w-6 border border-[#e8e8e8] text-xs"
          >
            +
          </button>
        </div>

        <div className="mt-3 flex items-center gap-4 text-xs">
          <button
            onClick={() => removeItem(item.id, item.color, item.size)}
            className="flex items-center gap-1 text-[#888888] hover:text-[#E8393A]"
          >
            <Trash2 className="h-3 w-3" /> Remove item
          </button>
          <button className="text-[#888888] underline">Sauvegarder pour plus tard</button>
        </div>
      </div>
    </article>
  );
}
