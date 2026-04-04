"use client";

import { useMemo } from "react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { allProducts } from "@/lib/catalog";
import { useWishlistStore } from "@/store/wishlistStore";

export function WishlistClient() {
  const ids = useWishlistStore((state) => state.ids);

  const products = useMemo(() => allProducts.filter((product) => ids.includes(product.id)), [ids]);

  return (
    <div className="mx-auto max-w-7xl px-3 py-4 md:px-4">
      <h1 className="mb-3 text-xl font-black">Wishlist</h1>
      {products.length === 0 ? (
        <p className="text-sm text-[#888888]">Aucun article pour le moment.</p>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}
