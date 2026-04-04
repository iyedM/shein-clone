"use client";

import { useMemo } from "react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { searchProducts } from "@/lib/catalog";

type SearchResultsClientProps = {
  query: string;
};

export function SearchResultsClient({ query }: SearchResultsClientProps) {
  const products = useMemo(() => searchProducts(query), [query]);

  return (
    <div className="mx-auto max-w-7xl px-3 py-4 md:px-4">
      <h1 className="mb-2 text-xl font-black">Recherche</h1>
      <p className="mb-4 text-xs text-[#888888]">{products.length} résultats pour “{query || "tout"}”</p>
      <ProductGrid products={products} />
    </div>
  );
}
