"use client";

import { useMemo, useState } from "react";
import { useCartStore } from "@/store/cartStore";

export function CartSummary() {
  const [coupon, setCoupon] = useState("");
  const totalPrice = useCartStore((state) => state.totalPrice());

  const shipping = useMemo(() => (totalPrice >= 39 ? 0 : 4.99), [totalPrice]);
  const total = useMemo(() => totalPrice + shipping, [shipping, totalPrice]);

  return (
    <aside className="sticky top-24 border border-[#e8e8e8] bg-[#fafafa] p-4">
      <h2 className="text-sm font-black">Résumé de commande</h2>
      <div className="mt-4 space-y-2 text-xs">
        <div className="flex justify-between">
          <span>Sous-total</span>
          <span>{totalPrice.toFixed(2)}€</span>
        </div>
        <div className="flex justify-between">
          <span>Livraison</span>
          <span>{shipping === 0 ? "Gratuite" : `${shipping.toFixed(2)}€`}</span>
        </div>
        <div className="flex justify-between border-t border-[#e8e8e8] pt-2 text-sm font-black">
          <span>Total</span>
          <span>{total.toFixed(2)}€</span>
        </div>
      </div>

      <div className="mt-4">
        <input
          value={coupon}
          onChange={(event) => setCoupon(event.target.value)}
          placeholder="Code promo"
          className="w-full border border-[#e8e8e8] bg-white px-3 py-2 text-xs outline-none"
        />
      </div>

      <button className="mt-3 w-full bg-[#E8393A] py-2 text-xs font-black text-white">Commander</button>

      <div className="mt-3 flex flex-wrap gap-2 text-[10px] font-bold">
        {[
          "VISA",
          "MC",
          "PayPal",
          "Apple Pay",
        ].map((pay) => (
          <span key={pay} className="border border-[#e8e8e8] bg-white px-2 py-1">
            {pay}
          </span>
        ))}
      </div>
    </aside>
  );
}
