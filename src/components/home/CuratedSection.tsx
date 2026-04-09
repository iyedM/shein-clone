"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, ShoppingBag } from "lucide-react";
import { allProducts } from "@/lib/catalog";
import { PriceTag } from "@/components/ui/PriceTag";
import { Product } from "@/types/product";

export function CuratedSection() {
    const curatedProducts = allProducts.slice(0, 6);

    return (
        <section className="py-20 bg-[#f4f4f2]">
            <div className="px-6 md:px-10 mb-12 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-premium">
                        <Sparkles className="text-[#E8393A]" size={20} />
                    </div>
                    <div>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">IA PERSONNALISÉE</h2>
                        <h3 className="text-3xl font-black font-heading italic uppercase">POUR <span className="text-[#E8393A]">VOUS</span></h3>
                    </div>
                </div>
                <div className="hidden md:block text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#E8393A] animate-pulse">Basé sur vos préférences</p>
                </div>
            </div>

            <div className="flex overflow-x-auto no-scrollbar gap-6 px-6 md:px-10 snap-x snap-mandatory">
                {curatedProducts.map((product: Product, i: number) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="min-w-[300px] md:min-w-[350px] snap-start group"
                    >
                        <div className="relative h-[450px] bg-white rounded-[2rem] overflow-hidden shadow-premium group-hover:shadow-hover transition-all duration-500">
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Availability Overlay */}
                            <div className="absolute top-6 left-6">
                                <div className="glass px-4 py-2 rounded-full flex items-center gap-2 border border-white/40">
                                    <div className="w-1.5 h-1.5 bg-[#E8393A] rounded-full animate-ping" />
                                    <span className="text-[9px] font-black uppercase tracking-widest text-[#E8393A]">
                                        Seulement {(product.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % 5) + 2} restants !
                                    </span>
                                </div>
                            </div>

                            {/* Add to Cart Overlay */}
                            <div className="absolute inset-x-6 bottom-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                <button className="w-full bg-[#111111] text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-widest text-[10px] hover:bg-[#E8393A] transition-colors">
                                    <ShoppingBag size={14} />
                                    Ajout Rapide
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 px-2">
                            <h4 className="text-[11px] font-black uppercase tracking-widest text-[#111111] mb-1">{product.name}</h4>
                            <PriceTag price={product.price} originalPrice={product.originalPrice} />
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
