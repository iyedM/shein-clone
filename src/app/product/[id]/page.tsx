import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Star, Sparkles, ArrowRight } from "lucide-react";
import { allProducts, getProductById } from "@/lib/catalog";
import { ProductDetailPanel } from "@/components/product/ProductDetailPanel";
import { RecentlyViewedTracker } from "@/components/product/RecentlyViewedTracker";
import { ProductCard } from "@/components/product/ProductCard";
import Link from "next/link";

const ProductGallery = dynamic(() => import("@/components/product/ProductGallery").then((mod) => mod.ProductGallery));
const ReviewSection = dynamic(() => import("@/components/product/ReviewSection").then((mod) => mod.ReviewSection));

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Produit introuvable" };

  return {
    title: `${product.name} | SHINE AI 2026`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const related = allProducts.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 8);

  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      <RecentlyViewedTracker product={product} />

      {/* Immersive Main Section */}
      <div className="mx-auto max-w-[1600px] lg:px-10 py-6 md:py-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_520px]">
          {/* Gallery with Parallax Feel */}
          <div className="relative">
            <Suspense fallback={<div className="h-[80vh] w-full animate-pulse bg-white rounded-[3rem]" />}>
              <ProductGallery product={product} />
            </Suspense>
          </div>

          {/* Sticky Details Panel */}
          <div className="px-6 lg:px-0 lg:sticky lg:top-32 lg:h-fit">
            <ProductDetailPanel product={product} />

            {/* Real-time Trust Signals */}
            <div className="mt-10 p-6 bg-white rounded-3xl shadow-premium border border-gray-100 flex items-center justify-between">
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                  <Sparkles className="text-green-600" size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Tendance Forte</p>
                  <p className="text-xs font-bold text-gray-900">124 personnes regardent cet article</p>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products: Kinetic Scroll */}
      <section className="py-24 overflow-hidden">
        <div className="px-6 md:px-10 mb-12 flex items-center justify-between">
          <div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#E8393A] mb-4">RECOMMMANDATIONS</h2>
            <h3 className="text-4xl md:text-5xl font-black font-heading italic uppercase leading-none">VOUS AIMEREZ <span className="text-gray-300">AUSSI</span></h3>
          </div>
          <Link href="/products/all" className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest hover:gap-5 transition-all text-gray-400 hover:text-[#111111]">
            Voir tout <ArrowRight size={16} />
          </Link>
        </div>

        <div className="flex overflow-x-auto no-scrollbar gap-6 px-6 md:px-10 snap-x snap-mandatory pb-10">
          {related.map((item) => (
            <div key={item.id} className="min-w-[300px] md:min-w-[350px] snap-start">
              <ProductCard product={item} />
            </div>
          ))}
        </div>
      </section>

      {/* Reviews Deep Dive */}
      <section className="bg-white py-24 rounded-[4rem] shadow-premium mt-12 mb-24 mx-4">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-4">AVIS CLIENTS</h2>
            <h3 className="text-4xl font-black font-heading italic uppercase">EXPÉRIENCES <span className="text-[#E8393A]">VÉCUES</span></h3>
          </div>
          <Suspense fallback={<div className="h-48 animate-pulse bg-gray-100 rounded-3xl" />}>
            <ReviewSection />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
