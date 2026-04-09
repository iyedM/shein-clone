"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import type { Product } from "@/types/product";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

type ProductGalleryProps = {
  product: Product;
};

export function ProductGallery({ product }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % product.images.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + product.images.length) % product.images.length);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Thumbnails (Desktop Side / Mobile Bottom) */}
      <div className="order-2 lg:order-1 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto no-scrollbar lg:max-h-[800px] px-6 lg:px-0">
        {product.images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`relative w-20 h-28 md:w-24 md:h-32 shrink-0 rounded-2xl overflow-hidden transition-all duration-500 ${currentIndex === idx
                ? "ring-2 ring-[#E8393A] scale-100 shadow-premium"
                : "opacity-40 hover:opacity-100 scale-95"
              }`}
          >
            <Image src={img} alt={`${product.name} ${idx}`} fill className="object-cover" sizes="100px" />
          </button>
        ))}
      </div>

      {/* Main Image Viewport */}
      <div className="order-1 lg:order-2 relative flex-1 aspect-[3/4] lg:rounded-[3rem] overflow-hidden bg-white shadow-premium group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full"
          >
            <Image
              src={product.images[currentIndex]}
              alt={product.name}
              fill
              priority
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              sizes="(max-width: 1024px) 100vw, 800px"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dynamic Controls */}
        <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={prevImage}
            className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all pointer-events-auto"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextImage}
            className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all pointer-events-auto"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Zoom Action */}
        <button
          className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-white/80 backdrop-blur-xl flex items-center justify-center text-black shadow-xl hover:scale-110 transition-transform opacity-0 group-hover:opacity-100"
        >
          <Maximize2 size={20} />
        </button>

        {/* Index Indicator */}
        <div className="absolute bottom-6 left-6 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full text-white text-[10px] font-black tracking-widest">
          {currentIndex + 1} / {product.images.length}
        </div>
      </div>
    </div>
  );
}
