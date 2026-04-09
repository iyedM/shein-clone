"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { History, X, ArrowRight, ShoppingBag } from "lucide-react";
import { useRecentlyViewed } from "@/store/recentlyViewedStore";
import Image from "next/image";
import Link from "next/link";
import { PriceTag } from "./PriceTag";

export function RecentlyViewed() {
    const [isOpen, setIsOpen] = useState(false);
    const { products } = useRecentlyViewed();

    if (products.length === 0) return null;

    return (
        <>
            {/* Floating Button */}
            <motion.button
                initial={{ x: 100 }}
                animate={{ x: 0 }}
                onClick={() => setIsOpen(true)}
                className="fixed right-0 top-1/2 -translate-y-1/2 z-[60] bg-[#111111] text-white p-3 shadow-2xl flex flex-col items-center gap-2 group transition-all hover:pr-5"
            >
                <History size={20} className="group-hover:rotate-[-45deg] transition-transform" />
                <span className="[writing-mode:vertical-lr] text-[9px] font-black uppercase tracking-widest">Récent</span>
            </motion.button>

            {/* Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 bottom-0 z-[120] w-full max-w-[380px] bg-[#FAFAF8] shadow-2xl flex flex-col"
                        >
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#E8393A]/5 text-[#E8393A] rounded-full flex items-center justify-center">
                                        <History size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-black uppercase tracking-widest">Consultés récemment</h3>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase">{products.length} ARTICLES</p>
                                    </div>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-all">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {products.map((product) => (
                                    <Link
                                        key={product.id}
                                        href={`/product/${product.id}`}
                                        onClick={() => setIsOpen(false)}
                                        className="flex gap-4 group"
                                    >
                                        <div className="relative w-20 h-28 bg-white border border-gray-100 overflow-hidden shrink-0">
                                            <Image
                                                src={product.images[0]}
                                                alt={product.name}
                                                fill
                                                className="object-cover transition-transform group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="flex flex-col py-1">
                                            <h4 className="text-[11px] font-black uppercase tracking-tight text-gray-500 group-hover:text-[#E8393A] transition-colors line-clamp-2">
                                                {product.name}
                                            </h4>
                                            <div className="mt-2">
                                                <PriceTag price={product.price} originalPrice={product.originalPrice} className="text-sm" />
                                            </div>
                                            <div className="mt-auto flex items-center gap-1 text-[9px] font-black text-[#E8393A] uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all">
                                                Voir le produit <ArrowRight size={10} />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            <div className="p-6 border-t border-gray-100 bg-white">
                                <Link
                                    href="/products/all"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full bg-[#111111] text-white py-4 font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-[#E8393A] transition-all"
                                >
                                    Continuer le shopping
                                    <ArrowRight size={14} />
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
