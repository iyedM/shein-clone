"use client";

import { Product } from "@/types/product";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ProductGallery } from "@/components/product/ProductGallery";
import { PriceTag } from "@/components/ui/PriceTag";
import { Star, ShoppingBag, Heart, ShieldCheck, Truck, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { SizeSelector } from "@/components/product/SizeSelector";
import { ColorSelector } from "@/components/product/ColorSelector";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useToastStore } from "@/store/toastStore";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import Link from "next/link";

type QuickViewProps = {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
};

export function QuickView({ product, isOpen, onClose }: QuickViewProps) {
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name ?? "");

    const addItem = useCartStore((state) => state.addItem);
    const toggleWishlist = useWishlistStore((state) => state.toggle);
    const isWishlisted = useWishlistStore((state) => product ? state.isWishlisted(product.id) : false);
    const pushToast = useToastStore((state) => state.push);

    useEffect(() => {
        if (product) setSelectedColor(product.colors[0]?.name);
    }, [product]);

    if (!product) return null;

    const handleAddToCart = () => {
        if (!selectedSize) {
            pushToast("Sélectionnez votre taille");
            return;
        }
        addItem({
            product,
            color: selectedColor || "Unique",
            size: selectedSize,
        });
        pushToast("Magnifique ! Ajouté au panier.");
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[1300px] w-[95vw] p-0 overflow-hidden bg-white rounded-[2rem] md:rounded-[3rem] border-none shadow-2xl">
                <DialogDescription className="sr-only">
                    Aperçu immersif de {product.name}
                </DialogDescription>

                <div className="flex flex-col md:flex-row h-[90vh] md:h-[min(800px,85vh)] overflow-hidden">
                    {/* Immersive Gallery Section */}
                    <div className="hidden md:flex flex-1 bg-[#FAFAF8] relative overflow-hidden p-8 md:p-12 border-r border-gray-50 overflow-y-auto no-scrollbar">
                        <div className="w-full h-full">
                            <ProductGallery product={product} />
                        </div>
                    </div>

                    {/* Mobile Gallery (Simple) */}
                    <div className="md:hidden h-72 relative bg-[#FAFAF8]">
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-lg">
                            <X size={18} />
                        </button>
                    </div>

                    {/* Refined Detail Section */}
                    <div className="flex-1 md:w-[500px] md:flex-none bg-white p-6 md:p-12 flex flex-col gap-6 overflow-y-auto no-scrollbar">
                        <div className="hidden md:flex items-center justify-between mb-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 font-satoshi">Quick Look</span>
                            <button onClick={onClose} className="p-3 hover:bg-gray-100 rounded-full transition-all">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <DialogTitle className="text-2xl md:text-4xl font-black font-heading tracking-tight uppercase leading-[1.1] italic">
                                {product.name}
                            </DialogTitle>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-1.5 bg-yellow-400/10 px-3 py-1 rounded-full text-yellow-700">
                                    <Star className="h-4 w-4 fill-current" />
                                    <span className="text-[11px] font-bold">{product.rating}</span>
                                </div>
                                <PriceTag price={product.price} originalPrice={product.originalPrice} className="text-xl md:text-3xl" />
                            </div>
                        </div>

                        <div className="space-y-8 py-4">
                            <ColorSelector
                                colors={product.colors}
                                value={selectedColor}
                                onChange={(c) => setSelectedColor(c.name)}
                            />

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#111111]">Taille</h3>
                                    <span className="text-[10px] font-bold text-[#E8393A] uppercase tracking-widest">Stock Limité</span>
                                </div>
                                <SizeSelector
                                    sizes={product.sizes}
                                    value={selectedSize}
                                    onChange={setSelectedSize}
                                />
                            </div>
                        </div>

                        <div className="mt-auto space-y-6 pt-6">
                            <div className="grid grid-cols-[1fr_75px] gap-4">
                                <MagneticButton className="w-full">
                                    <button
                                        onClick={handleAddToCart}
                                        className="w-full bg-[#111111] text-white py-5 md:py-6 rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 shadow-2xl transition-all hover:bg-[#E8393A]"
                                    >
                                        <ShoppingBag size={18} />
                                        Ajouter au Panier
                                    </button>
                                </MagneticButton>

                                <button
                                    onClick={() => toggleWishlist(product.id)}
                                    className={`w-full aspect-square rounded-2xl border flex items-center justify-center transition-all ${isWishlisted ? "bg-[#E8393A]/10 border-[#E8393A] text-[#E8393A]" : "border-gray-200 hover:border-black"
                                        }`}
                                >
                                    <Heart size={24} className={isWishlisted ? "fill-current" : ""} />
                                </button>
                            </div>

                            <Link
                                href={`/product/${product.id}`}
                                onClick={onClose}
                                className="flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 hover:text-black transition-all hover:gap-5"
                            >
                                Expérience complète <ArrowRight size={14} />
                            </Link>
                        </div>

                        {/* Trust Signals */}
                        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-50">
                            <div className="flex items-center gap-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                                <Truck size={14} className="text-[#E8393A]" />
                                Livraison Pro 2026
                            </div>
                            <div className="flex items-center gap-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                                <ShieldCheck size={14} className="text-[#E8393A]" />
                                Sécurité Totale
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
