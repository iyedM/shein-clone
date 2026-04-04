"use client";

import { useCartStore } from "@/store/cartStore";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { ProductGrid } from "@/components/product/ProductGrid";
import { allProducts } from "@/lib/catalog";

export function CartClient() {
  const items = useCartStore((state) => state.items);

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-3 py-4 md:px-4">
      <h1 className="text-xl font-black">Panier</h1>
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="space-y-3">
          {items.length === 0 ? <p className="text-sm text-[#888888]">Ton panier est vide.</p> : null}
          {items.map((item) => (
            <CartItem key={`${item.id}-${item.color}-${item.size}`} item={item} />
          ))}
        </div>
        <CartSummary />
      </div>

      <section>
        <h2 className="mb-3 text-lg font-black">Vous avez aussi regardé</h2>
        <div className="overflow-x-auto">
          <div className="min-w-[920px]">
            <ProductGrid products={allProducts.slice(0, 8)} />
          </div>
        </div>
      </section>
    </div>
  );
}
