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
      className="group relative flex flex-col h-full bg-white rounded-2xl shadow-premium hover:shadow-hover hover:-translate-y-[6px] transition-all duration-300 overflow-hidden border-none"
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
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </Link>

        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className="rounded-[4px] bg-[#E8393A] px-2 py-1 text-[10px] font-bold text-white shadow-sm leading-none uppercase">
            -{product.discountPercent}%
          </span>

          {product.badge ? (
            <span className="rounded-[4px] bg-[#111111] px-2 py-1 text-[10px] font-bold text-white shadow-sm leading-none uppercase">
              {product.badge === "FLASH" ? "Flash Sale" : product.badge}
            </span>
          ) : null}
        </div>

        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-3 right-3 h-9 w-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:bg-white hover:shadow-lg transition-all"
          aria-label="Ajouter à la wishlist"
        >
          <motion.div whileTap={{ scale: 0.8 }} animate={isWishlisted ? { scale: [1, 1.2, 1] } : { scale: 1 }}>
            <Heart className={`h-5 w-5 ${isWishlisted ? "fill-[#E8393A] text-[#E8393A]" : "text-[#111111]"}`} />
          </motion.div>
        </button>

        <AnimatePresence>
          {hovered ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="absolute inset-x-3 bottom-3"
            >
              <button
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
                className={`w-full glass py-3 text-[10px] font-bold text-[#111111] uppercase tracking-widest shadow-lg ${shake ? "ring-2 ring-[#E8393A]" : ""}`}
              >
                {selectedSize ? "Ajouter au panier" : "Choisir une taille"}
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="flex flex-col flex-grow p-4 gap-2">
        <div className="flex items-start justify-between gap-2">
          <PriceTag price={product.price} originalPrice={product.originalPrice} />
          <div className="flex items-center gap-1 mt-1">
            <Star className="h-3 w-3 fill-[#111111] text-[#111111]" />
            <span className="text-[10px] font-bold">{product.rating}</span>
          </div>
        </div>

        <Link href={`/product/${product.id}`}>
          <h3 className="line-clamp-1 text-xs font-medium text-[#111111] group-hover:text-[#E8393A] transition-colors">{product.name}</h3>
        </Link>

        <p className="text-[10px] text-[#6b6b6b] line-clamp-1">Livré en 5 à 8 jours ouvrés</p>

        <div className="mt-auto pt-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            {product.colors.slice(0, 4).map((color) => (
              <button
                key={color.name}
                aria-label={color.name}
                onClick={() => {
                  setSelectedColor(color.name);
                  setSelectedImage(color.image || product.images[0]);
                }}
                className={`h-3 w-3 rounded-full ring-offset-2 transition-all ${selectedColor === color.name ? "ring-1 ring-[#111111]" : "hover:ring-1 hover:ring-[#e8e8e8]"}`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
            {product.colors.length > 4 ? (
              <span className="text-[9px] font-bold text-[#6b6b6b]">+{product.colors.length - 4}</span>
            ) : null}
          </div>

          <div className="flex items-center gap-1">
            {product.sizes.slice(0, 2).map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`h-6 min-w-[24px] px-1 text-[9px] font-bold rounded-[4px] border transition-all ${selectedSize === size ? "bg-[#111111] text-white border-[#111111]" : "border-[#e8e8e8] text-[#6b6b6b] hover:border-[#111111]"}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
