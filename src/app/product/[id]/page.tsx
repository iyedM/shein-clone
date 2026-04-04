import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Star } from "lucide-react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { allProducts, getProductById } from "@/lib/catalog";
import { ProductDetailPanel } from "../../../components/product/ProductDetailPanel";

const ProductGallery = dynamic(() => import("@/components/product/ProductGallery").then((mod) => mod.ProductGallery));
const ReviewSection = dynamic(() => import("@/components/product/ReviewSection").then((mod) => mod.ReviewSection));

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return { title: "Produit introuvable" };
  }

  return {
    title: product.name,
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

  const related = allProducts.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.description,
    brand: { "@type": "Brand", name: "SHEIN" },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: product.price,
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-3 py-4 md:px-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="grid gap-6 lg:grid-cols-[1fr_430px]">
        <Suspense fallback={<div className="h-[600px] animate-pulse bg-[#f5f5f5]" />}>
          <ProductGallery product={product} />
        </Suspense>
        <ProductDetailPanel product={product} />
      </div>

      <section>
        <h2 className="mb-3 text-lg font-black">Vous aimerez aussi</h2>
        <div className="overflow-x-auto">
          <div className="min-w-[920px]">
            <ProductGrid products={related} />
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-black">Complétez le look</h2>
        <ProductGrid products={allProducts.slice(8, 12)} />
      </section>

      <Suspense fallback={<div className="h-48 animate-pulse bg-[#f5f5f5]" />}>
        <ReviewSection />
      </Suspense>

      <a href="#reviews" className="inline-flex items-center gap-1 text-xs text-[#888888]">
        <Star className="h-3 w-3 fill-[#111111] text-[#111111]" /> Voir les avis
      </a>
    </div>
  );
}
