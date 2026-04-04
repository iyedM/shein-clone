"use client";

import { useMemo, useState } from "react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { allProducts, filteredProducts } from "@/lib/catalog";
import { useFilterStore } from "@/store/filterStore";

export function ProductFeed() {
  const [limit, setLimit] = useState(16);

  const activeChip = useFilterStore((state) => state.activeChip);
  const search = useFilterStore((state) => state.search);
  const minPrice = useFilterStore((state) => state.minPrice);
  const maxPrice = useFilterStore((state) => state.maxPrice);
  const sizes = useFilterStore((state) => state.sizes);
  const colors = useFilterStore((state) => state.colors);
  const minRating = useFilterStore((state) => state.minRating);
  const fastDelivery = useFilterStore((state) => state.fastDelivery);

  const products = useMemo(
    () =>
      filteredProducts({
        products: allProducts,
        chip: activeChip,
        search,
        minPrice,
        maxPrice,
        sizes,
        colors,
        minRating,
        fastDelivery,
      }),
    [activeChip, colors, fastDelivery, maxPrice, minPrice, minRating, search, sizes]
  );

  const shown = products.slice(0, limit);

  return (
    <section className="mx-auto mt-14 max-w-[1400px] px-6 py-14">
      <h2 className="mb-10 text-3xl font-bold tracking-tight text-[#111111] uppercase tracking-[0.1em]">Juste pour toi</h2>
      <ProductGrid products={shown} />
      {shown.length < products.length ? (
        <div className="mt-14 text-center">
          <button
            onClick={() => setLimit((prev) => prev + 8)}
            className="group relative inline-flex items-center gap-4 bg-[#111111] px-10 py-4 text-xs font-bold text-white transition-all hover:bg-white hover:text-[#111111] border border-[#111111] uppercase tracking-widest"
          >
            Voir plus de articles
            <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      ) : null}
    </section>
  );
}
