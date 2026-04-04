import type { Product } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";

type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 bg-white p-4 rounded-lg">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
