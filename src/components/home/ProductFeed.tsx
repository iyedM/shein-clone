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
    <section className="mx-auto mt-6 max-w-7xl px-3 md:px-4">
      <h2 className="mb-3 text-base font-black">JUSTE POUR TOI</h2>
      <ProductGrid products={shown} />
      {shown.length < products.length ? (
        <div className="mt-5 text-center">
          <button onClick={() => setLimit((prev) => prev + 8)} className="border border-[#111111] px-5 py-2 text-xs font-bold">
            Load more
          </button>
        </div>
      ) : null}
    </section>
  );
}
