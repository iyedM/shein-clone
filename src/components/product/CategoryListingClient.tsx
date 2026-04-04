"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, Star } from "lucide-react";
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
    <div className="space-y-8 bg-white p-8 rounded-2xl shadow-premium border-none">
      <div>
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#111111]">Prix</p>
        <input
          type="range"
          min={0}
          max={100}
          value={maxPrice}
          onChange={(event) => setMaxPrice(Number(event.target.value))}
          className="w-full accent-[#E8393A]"
        />
        <div className="mt-2 flex items-center justify-between text-xs font-medium text-[#6b6b6b]">
          <span>0€</span>
          <span>{maxPrice}€</span>
        </div>
      </div>

      <div>
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#111111]">Taille</p>
        <div className="flex flex-wrap gap-2">
          {availableSizes.map((size) => {
            const isSelected = sizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => setSizes((prev) => (prev.includes(size) ? prev.filter((it) => it !== size) : [...prev, size]))}
                className={`min-w-[44px] h-11 border text-xs font-bold transition-all duration-300 ${isSelected
                    ? "border-[#E8393A] bg-[#E8393A] text-white"
                    : "border-[#e8e8e8] bg-white text-[#6b6b6b] hover:border-[#111111] hover:text-[#111111]"
                  }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#111111]">Couleur</p>
        <div className="grid grid-cols-5 gap-3">
          {allColors.slice(0, 10).map(([name, hex]) => {
            const isSelected = colors.includes(name);
            return (
              <button
                key={name}
                onClick={() => setColors((prev) => (prev.includes(name) ? prev.filter((it) => it !== name) : [...prev, name]))}
                className={`h-7 w-7 rounded-full ring-offset-2 transition-all ${isSelected ? "ring-2 ring-[#E8393A]" : "hover:ring-1 hover:ring-[#e8e8e8]"
                  }`}
                style={{ backgroundColor: hex }}
                aria-label={name}
              />
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#111111]">Note</p>
        <div className="space-y-3">
          {[4, 3, 2].map((item) => (
            <button
              key={item}
              onClick={() => setRating(item)}
              className={`flex items-center gap-2 text-xs transition-colors ${rating === item ? "font-bold text-[#E8393A]" : "font-medium text-[#6b6b6b] hover:text-[#111111]"}`}
            >
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} className={i < item ? "fill-current" : "text-[#d9d9d9]"} />
                ))}
              </div>
              & plus
            </button>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-[#f2f2f2]">
        <button
          onClick={clearAll}
          className="w-full py-4 text-xs font-bold uppercase tracking-widest text-[#111111] bg-[#f8f8f8] hover:bg-[#111111] hover:text-white transition-all rounded-xl"
        >
          Réinitialiser tout
        </button>
      </div>
    </div>
  );

  return (
    <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-14 md:grid-cols-[280px_1fr]">
      <aside className="hidden md:block">
        <div className="sticky top-44">{sidebar}</div>
      </aside>

      <div className="space-y-8">
        <div className="sticky top-[112px] md:top-28 z-20 flex items-center justify-between glass px-8 py-5 rounded-2xl shadow-premium">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#111111]">{result.length} Produits</p>
          <div className="flex items-center gap-6">
            <Sheet>
              <SheetTrigger asChild>
                <button className="inline-flex items-center gap-2 border border-[#e8e8e8] px-5 py-2.5 text-[10px] font-bold uppercase md:hidden tracking-widest hover:border-[#111111] transition-all">
                  <SlidersHorizontal className="h-4 w-4" /> Filtres
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-[340px] overflow-y-auto pt-16">
                <SheetTitle className="text-xl font-bold uppercase tracking-widest mb-10 px-4">Filtrer par</SheetTitle>
                <div className="px-4">{sidebar}</div>
              </SheetContent>
            </Sheet>

            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#6b6b6b] hidden sm:block">Trier par:</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="bg-transparent text-[10px] font-bold uppercase tracking-widest cursor-pointer focus:outline-none appearance-none pr-4"
              >
                {sorts.map((sort) => (
                  <option key={sort} className="bg-white text-black">{sort}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <ProductGrid products={shown} />

        {shown.length < result.length ? (
          <div className="mt-14 text-center">
            <button
              onClick={() => setLimit((prev) => prev + 12)}
              className="group relative inline-flex items-center gap-4 bg-[#111111] px-14 py-5 text-xs font-bold text-white transition-all hover:bg-white hover:text-[#111111] border border-[#111111] uppercase tracking-widest shadow-premium hover:shadow-hover"
            >
              Plus d'articles
              <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
