"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star, Eye, ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { Product } from "@/types/product";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import { PriceTag } from "@/components/ui/PriceTag";
import { QuickView } from "./QuickView";
import { MagneticButton } from "@/components/ui/MagneticButton";

type ProductCardProps = {
  product: Product;
};

// Particle component for the explosion
const Particle = ({ i }: { i: number }) => (
  <motion.div
    key={i}
    initial={{ scale: 0, x: 0, y: 0 }}
    animate={{
      scale: [0, 1, 0],
      x: (Math.random() - 0.5) * 120,
      y: (Math.random() - 0.5) * 120,
      rotate: Math.random() * 360
    }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="absolute pointer-events-none"
  >
    <Heart size={10} className="fill-[#E8393A] text-[#E8393A]" />
  </motion.div>
);

export function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name ?? "");
  const [selectedSize, setSelectedSize] = useState("");
  const [isLiking, setIsLiking] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleWishlist = useWishlistStore((state) => state.toggle);
  const isWishlisted = useWishlistStore((state) => state.isWishlisted(product.id));
  const addItem = useCartStore((state) => state.addItem);
  const pushToast = useToastStore((state) => state.push);

  const imageToShow = hovered && product.images[1] ? product.images[1] : selectedImage;

  const handleLike = () => {
    if (!isWishlisted) {
      setIsLiking(true);
      setTimeout(() => setIsLiking(false), 1000);
    }
    toggleWishlist(product.id);
  };

  return (
    <>
      <article
        className="group relative flex flex-col h-full bg-white transition-all duration-500 overflow-hidden rounded-[2.5rem] border border-transparent hover:border-gray-100 shadow-premium hover:shadow-hover"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[#f3f3f1]">
          {/* Shimmer Effect */}
          <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite] z-10 ${!isLoading && "hidden"}`} />

          <Link href={`/product/${product.id}`} aria-label={product.name} className="block w-full h-full">
            <Image
              src={imageToShow}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className={`object-cover transition-all duration-1000 ${isLoading ? "scale-110 blur-2xl" : "scale-100 blur-0"} group-hover:scale-110`}
              onLoad={() => setIsLoading(false)}
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-6 left-6 flex flex-col gap-2 z-20">
            <motion.span
              whileHover={{ scale: 1.1 }}
              className="bg-[#E8393A] px-4 py-1.5 text-[10px] font-black text-white uppercase tracking-widest rounded-full shadow-2xl"
            >
              -{product.discountPercent}%
            </motion.span>
            {product.badge && (
              <span className="bg-[#111111] px-4 py-1.5 text-[10px] font-black text-white uppercase tracking-widest rounded-full shadow-2xl">
                {product.badge}
              </span>
            )}
          </div>

          {/* Wishlist Button with Explosion */}
          <div className="absolute top-6 right-6 z-30">
            <button
              onClick={handleLike}
              className={`h-12 w-12 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-2xl shadow-2xl transition-all duration-500 ${isWishlisted ? "scale-110" : "scale-100 hover:scale-110"
                }`}
              aria-label="Ajouter à la wishlist"
            >
              <Heart className={`h-5 w-5 transition-colors ${isWishlisted ? "fill-[#E8393A] text-[#E8393A]" : "text-[#111111]"}`} />
              <AnimatePresence>
                {isLiking && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <Particle key={i} i={i} />
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Actions Overlay */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute inset-x-0 bottom-6 px-6 flex flex-col gap-3 z-30"
              >
                <div className="flex gap-3">
                  <MagneticButton
                    className="flex-1 bg-white/95 backdrop-blur-2xl text-[#111111] py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center shadow-2xl hover:bg-[#111111] hover:text-white transition-all"
                  >
                    <div onClick={() => setIsQuickViewOpen(true)} className="flex items-center gap-2 w-full h-full justify-center cursor-pointer">
                      <Eye size={18} />
                      Aperçu
                    </div>
                  </MagneticButton>

                  <button
                    onClick={() => {
                      if (!selectedSize) {
                        setIsQuickViewOpen(true);
                        return;
                      }
                      addItem({
                        product,
                        color: selectedColor || "Unique",
                        size: selectedSize,
                      });
                      pushToast("Ajouté au panier");
                    }}
                    className="w-14 h-14 bg-[#E8393A] text-white rounded-2xl flex items-center justify-center hover:bg-[#111111] transition-all shadow-2xl active:scale-90"
                  >
                    <ShoppingBag size={22} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-8 gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {product.colors.slice(0, 3).map((color) => (
                <button
                  key={color.name}
                  onClick={() => {
                    setSelectedColor(color.name);
                    setSelectedImage(color.image || product.images[0]);
                  }}
                  className={`h-3.5 w-3.5 rounded-full ring-2 ring-transparent ring-offset-2 transition-all ${selectedColor === color.name ? "ring-[#E8393A]" : "hover:ring-gray-300"}`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-[11px] font-black text-gray-400">+{product.colors.length - 3}</span>
              )}
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#FAFAF8] rounded-full border border-gray-100">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-[11px] font-black">{product.rating}</span>
            </div>
          </div>

          <Link href={`/product/${product.id}`} className="group/title">
            <h3 className="line-clamp-1 text-sm font-bold text-gray-400 group-hover/title:text-[#111111] transition-colors uppercase tracking-[0.1em] font-satoshi">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-end justify-between mt-auto">
            <PriceTag price={product.price} originalPrice={product.originalPrice} className="text-xl font-black" />

            <AnimatePresence mode="wait">
              {!hovered ? (
                <motion.p
                  key="status"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="text-[10px] text-[#E8393A] font-black uppercase tracking-widest italic"
                >
                  Hot Choice
                </motion.p>
              ) : (
                <motion.div
                  key="sizes"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex gap-2"
                >
                  {product.sizes.slice(0, 3).map((size) => (
                    <span
                      key={size}
                      className="text-[10px] font-black text-gray-300 uppercase tracking-tighter"
                    >
                      {size}
                    </span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </article>

      <QuickView
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}
