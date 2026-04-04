"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import type { Product } from "@/types/product";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import { PriceTag } from "@/components/ui/PriceTag";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name ?? "");
  const [selectedSize, setSelectedSize] = useState("");
  const [shake, setShake] = useState(false);
  const baseWatching = useMemo(
    () => ((product.id.charCodeAt(1) + product.id.charCodeAt(2)) % 40) + 8,
    [product.id]
  );
  const [watching, setWatching] = useState(baseWatching);

  const toggleWishlist = useWishlistStore((state) => state.toggle);
  const isWishlisted = useWishlistStore((state) => state.isWishlisted(product.id));
  const addItem = useCartStore((state) => state.addItem);
  const pushToast = useToastStore((state) => state.push);

  const stockLeft = useMemo(() => {
    const value = (product.id.charCodeAt(product.id.length - 1) * 3) % 12;
    return value;
  }, [product.id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWatching(Math.floor(Math.random() * 40) + 8);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const imageToShow = hovered && product.images[1] ? product.images[1] : selectedImage;

  return (
    <article
      className="group rounded-xl border border-[#e8e8e8] bg-white hover:shadow-xl transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f5f5]">
        <Link href={`/product/${product.id}`} aria-label={product.name}>
          <Image
            src={imageToShow}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition duration-300"
          />
        </Link>

        <span className="absolute top-2 left-2 rounded-[2px] bg-[#E8393A] px-1.5 py-0.5 text-[10px] font-bold text-white">
          -{product.discountPercent}%
        </span>

        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-3 right-3 rounded-full bg-white p-2 shadow-md hover:shadow-lg transition-all"
          aria-label="Ajouter à la wishlist"
        >
          <motion.div whileTap={{ scale: 0.88 }} animate={isWishlisted ? { scale: [1, 1.25, 1] } : { scale: 1 }}>
            <Heart className={`h-5 w-5 ${isWishlisted ? "fill-[#E8393A] text-[#E8393A]" : "text-[#111111]"}`} />
          </motion.div>
        </button>

        {product.badge ? (
          <span className="absolute top-2 left-16 rounded-[2px] bg-[#FF6B00] px-1.5 py-0.5 text-[10px] font-bold text-white">
            {product.badge === "FLASH" ? "Livraison rapide" : product.badge}
          </span>
        ) : null}

        <AnimatePresence>
          {hovered ? (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              onClick={() => {
                if (!selectedSize) {
                  setShake(true);
                  setTimeout(() => setShake(false), 350);
                  return;
                }

                addItem({
                  product,
                  color: selectedColor || product.colors[0]?.name || "Unique",
                  size: selectedSize,
                });
                pushToast("Ajouté au panier");
              }}
              className={`absolute right-2 bottom-2 left-2 bg-[#111111] py-2 text-xs font-bold text-white ${shake ? "animate-pulse" : ""}`}
            >
              Ajouter rapidement
            </motion.button>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="space-y-2 p-2">
        <PriceTag price={product.price} originalPrice={product.originalPrice} />

        <Link href={`/product/${product.id}`}>
          <h3 className="line-clamp-2 text-[11px] leading-4 text-[#888888]">{product.name}</h3>
        </Link>

        <div className="flex items-center gap-1 text-[11px] text-[#888888]">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} className={`h-3 w-3 ${index < Math.round(product.rating) ? "fill-[#111111] text-[#111111]" : "text-[#d9d9d9]"}`} />
          ))}
          <span>({product.reviewCount})</span>
        </div>

        <div className="flex items-center gap-1">
          {product.colors.slice(0, 5).map((color) => (
            <button
              key={color.name}
              aria-label={color.name}
              onClick={() => {
                setSelectedColor(color.name);
                setSelectedImage(color.image || product.images[0]);
              }}
              className={`h-4 w-4 border ${selectedColor === color.name ? "border-[#111111]" : "border-[#e8e8e8]"}`}
              style={{ backgroundColor: color.hex }}
            />
          ))}
          {product.colors.length > 5 ? (
            <span className="text-[10px] text-[#888888]">+{product.colors.length - 5} more</span>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-1">
          {product.sizes.slice(0, 3).map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`border px-1.5 py-0.5 text-[10px] ${selectedSize === size ? "border-[#111111] bg-[#111111] text-white" : "border-[#e8e8e8]"}`}
            >
              {size}
            </button>
          ))}
        </div>

        <p className="text-[10px] font-bold text-[#FF6B00]">Livraison gratuite sous 5-8j</p>
        {product.isTrending ? <p className="text-[10px] text-[#888888]">{watching} personnes regardent</p> : null}
        {stockLeft > 0 && stockLeft < 10 ? <p className="text-[10px] text-[#FF6B00]">Plus que {stockLeft} en stock</p> : null}
      </div>
    </article>
  );
}
