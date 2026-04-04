import Link from "next/link";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { allProducts } from "@/lib/catalog";
import { ProductGrid } from "@/components/product/ProductGrid";

export function FlashSaleSection() {
  const products = allProducts.filter((item) => item.badge === "FLASH").slice(0, 4);

  return (
    <section className="mx-auto mt-8 max-w-7xl px-3 md:px-4">
      <div className="flex items-center justify-between bg-gradient-to-r from-[#E8393A] to-[#ff6b6b] px-6 py-4 text-white rounded-t-xl shadow-md">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-black">⚡ VENTE FLASH</h2>
          <CountdownTimer mode="hours4" />
        </div>
        <Link href="/products/prix-de-ouf" className="text-sm font-bold hover:underline transition-all">Voir tout →</Link>
      </div>
      <div className="rounded-b-xl overflow-hidden">
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
