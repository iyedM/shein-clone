import Link from "next/link";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { allProducts } from "@/lib/catalog";
import { ProductGrid } from "@/components/product/ProductGrid";

export function FlashSaleSection() {
  const products = allProducts.filter((item) => item.badge === "FLASH").slice(0, 4);

  return (
    <section className="mx-auto mt-6 max-w-7xl px-3 md:px-4">
      <div className="flex items-center justify-between bg-[#E8393A] px-3 py-2 text-white">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-black">VENTE FLASH</h2>
          <CountdownTimer mode="hours4" />
        </div>
        <Link href="/products/prix-de-ouf" className="text-xs font-bold underline">Voir tout</Link>
      </div>
      <div className="mt-3">
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
