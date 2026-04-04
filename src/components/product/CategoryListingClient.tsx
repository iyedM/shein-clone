"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import type { Product } from "@/types/product";
import { ProductGrid } from "@/components/product/ProductGrid";
import { filteredProducts, sortProducts } from "@/lib/catalog";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

type CategoryListingClientProps = {
  products: Product[];
};

const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];
const sorts = ["Pertinence", "Prix croissant", "Prix décroissant", "Nouveautés", "Meilleures ventes"];

export function CategoryListingClient({ products }: CategoryListingClientProps) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [rating, setRating] = useState(0);
  const [fastDelivery, setFastDelivery] = useState(false);
  const [sortBy, setSortBy] = useState("Pertinence");
  const [limit, setLimit] = useState(16);

  const allColors = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach((product) => {
      product.colors.forEach((color) => {
        map.set(color.name, color.hex);
      });
    });
    return Array.from(map.entries());
  }, [products]);

  const result = useMemo(() => {
    const filtered = filteredProducts({
      products,
      minPrice,
      maxPrice,
      sizes,
      colors,
      minRating: rating,
      fastDelivery,
    });

    return sortProducts(filtered, sortBy);
  }, [colors, fastDelivery, maxPrice, minPrice, products, rating, sizes, sortBy]);

  const shown = result.slice(0, limit);

  const clearAll = () => {
    setMinPrice(0);
    setMaxPrice(100);
    setSizes([]);
    setColors([]);
    setRating(0);
    setFastDelivery(false);
  };

  const sidebar = (
    <div className="space-y-5 border border-[#e8e8e8] p-4">
      <div>
        <p className="mb-2 text-xs font-black">Prix</p>
        <input type="range" min={0} max={100} value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} className="w-full" />
        <p className="text-xs text-[#888888]">0€ - {maxPrice}€</p>
      </div>

      <div>
        <p className="mb-2 text-xs font-black">Taille</p>
        <div className="flex flex-wrap gap-2">
          {availableSizes.map((size) => (
            <button
              key={size}
              onClick={() => setSizes((prev) => (prev.includes(size) ? prev.filter((it) => it !== size) : [...prev, size]))}
              className={`border px-2 py-1 text-xs ${sizes.includes(size) ? "border-[#111111] bg-[#111111] text-white" : "border-[#e8e8e8]"}`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-black">Couleur</p>
        <div className="flex flex-wrap gap-2">
          {allColors.slice(0, 8).map(([name, hex]) => (
            <button
              key={name}
              onClick={() => setColors((prev) => (prev.includes(name) ? prev.filter((it) => it !== name) : [...prev, name]))}
              className={`h-6 w-6 border-2 ${colors.includes(name) ? "border-[#111111]" : "border-[#e8e8e8]"}`}
              style={{ backgroundColor: hex }}
              aria-label={name}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-black">Note</p>
        <div className="space-y-1">
          {[4, 3, 2].map((item) => (
            <button
              key={item}
              onClick={() => setRating(item)}
              className={`block text-xs ${rating === item ? "font-black text-[#111111]" : "text-[#888888]"}`}
            >
              {item}★ et plus
            </button>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-2 text-xs">
        <input type="checkbox" checked={fastDelivery} onChange={(event) => setFastDelivery(event.target.checked)} />
        Livraison rapide
      </label>

      <button onClick={clearAll} className="text-xs font-bold underline">Clear all filters</button>
    </div>
  );

  return (
    <div className="mx-auto grid max-w-7xl gap-4 px-3 py-4 md:grid-cols-[260px_1fr] md:px-4">
      <aside className="hidden md:block">{sidebar}</aside>

      <div>
        <div className="sticky top-[98px] z-20 mb-3 flex items-center justify-between border border-[#e8e8e8] bg-white px-3 py-2 text-xs">
          <p>{result.length} résultats</p>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <button className="inline-flex items-center gap-1 border border-[#e8e8e8] px-2 py-1 md:hidden">
                  <SlidersHorizontal className="h-3 w-3" /> Filtres
                </button>
              </SheetTrigger>
              <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto">
                <SheetTitle>Filtres</SheetTitle>
                {sidebar}
              </SheetContent>
            </Sheet>

            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="border border-[#e8e8e8] px-2 py-1 text-xs">
              {sorts.map((sort) => (
                <option key={sort}>{sort}</option>
              ))}
            </select>
          </div>
        </div>

        <ProductGrid products={shown} />

        {shown.length < result.length ? (
          <div className="mt-4 text-center">
            <button onClick={() => setLimit((prev) => prev + 8)} className="border border-[#111111] px-4 py-2 text-xs font-bold">
              Charger plus
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
