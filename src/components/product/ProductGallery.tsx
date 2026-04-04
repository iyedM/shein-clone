"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/types/product";
import { useWishlistStore } from "@/store/wishlistStore";

type ProductGalleryProps = {
  product: Product;
};

export function ProductGallery({ product }: ProductGalleryProps) {
  const [image, setImage] = useState(product.images[0]);
  const toggle = useWishlistStore((state) => state.toggle);
  const wished = useWishlistStore((state) => state.isWishlisted(product.id));

  return (
    <div className="grid gap-3 md:grid-cols-[88px_1fr]">
      <div className="order-2 flex gap-2 overflow-x-auto md:order-1 md:flex-col">
        {product.images.slice(0, 6).map((img) => (
          <button
            key={img}
            onClick={() => setImage(img)}
            className={`relative h-20 w-16 shrink-0 overflow-hidden border ${image === img ? "border-[#111111]" : "border-[#e8e8e8]"}`}
          >
            <Image src={img} alt={product.name} fill className="object-cover" sizes="64px" />
          </button>
        ))}
      </div>
      <div className="relative order-1 overflow-hidden border border-[#e8e8e8] md:order-2">
        <Image
          src={image}
          alt={product.name}
          width={800}
          height={1000}
          priority
          className="h-auto w-full object-cover transition duration-300 hover:scale-110"
        />
        <button onClick={() => toggle(product.id)} className="absolute top-3 right-3 bg-white p-2" aria-label="Wishlist">
          <Heart className={`h-5 w-5 ${wished ? "fill-[#E8393A] text-[#E8393A]" : "text-[#111111]"}`} />
        </button>
      </div>
    </div>
  );
}
