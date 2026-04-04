import Link from "next/link";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { allProducts } from "@/lib/catalog";
import { ProductGrid } from "@/components/product/ProductGrid";

export function FlashSaleSection() {
  const products = allProducts.filter((item) => item.badge === "FLASH").slice(0, 4);

  return (
    <section className="mt-14 w-full bg-[#111111] py-14">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 border-b border-white/10 pb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <h2 className="text-3xl font-bold tracking-tight text-white uppercase italic">⚡ Vente Flash</h2>
            <div className="h-8 w-[1px] bg-white/20 hidden md:block" />
            <CountdownTimer mode="hours4" className="text-xl font-mono text-white" />
          </div>
          <Link href="/products/prix-de-ouf" className="group flex items-center gap-2 text-sm font-bold text-white transition-all">
            <span className="border-b border-white/0 group-hover:border-white transition-all uppercase tracking-widest">Voir toute la collection</span>
            <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
        <ProductGrid products={products} columns={4} />
      </div>
    </section>
  );
}
