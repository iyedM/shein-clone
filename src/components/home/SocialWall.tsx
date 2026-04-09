"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Share2, Heart } from "lucide-react";

const ugcItems = [
    { id: 1, user: "@sophie.val", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600" },
    { id: 2, user: "@marco_26", img: "https://images.unsplash.com/photo-1539109132374-34845945c3af?auto=format&fit=crop&q=80&w=600" },
    { id: 3, user: "@elena_trend", img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=600" },
    { id: 4, user: "@street_style", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600" },
    { id: 5, user: "@chic_vibe", img: "https://images.unsplash.com/photo-1523359346063-d1433f971557?auto=format&fit=crop&q=80&w=600" },
    { id: 6, user: "@fashion_bio", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600" },
];

export function SocialWall() {
    return (
        <section className="py-32 bg-black overflow-hidden relative">
            <div className="mx-auto max-w-[1400px] px-6 mb-20 text-center">
                <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="w-12 h-[1px] bg-white/20" />
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#E8393A]">VOUS CHEZ SHEIN</span>
                    <div className="w-12 h-[1px] bg-white/20" />
                </div>
                <h2 className="text-4xl md:text-7xl font-black italic text-white font-heading uppercase">VOTRE STYLE, <span className="text-[#E8393A]">NOTRE HISTOIRE</span></h2>
            </div>

            <div className="relative">
                <div className="flex gap-4 animate-marquee">
                    {[...ugcItems, ...ugcItems].map((item, i) => (
                        <div key={i} className="relative w-[300px] h-[450px] shrink-0 overflow-hidden group rounded-2xl">
                            <Image
                                src={item.img}
                                alt={item.user}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-white uppercase tracking-widest">{item.user}</span>
                                    <div className="flex items-center gap-2 text-white/60">
                                        <Heart size={14} />
                                        <span className="text-[10px] font-bold">1.2k</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Reverse Marquee */}
            <div className="relative mt-4">
                <div className="flex gap-4 animate-marquee-reverse">
                    {[...ugcItems, ...ugcItems].reverse().map((item, i) => (
                        <div key={i} className="relative w-[300px] h-[450px] shrink-0 overflow-hidden group rounded-2xl">
                            <Image
                                src={item.img}
                                alt={item.user}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-white uppercase tracking-widest">{item.user}</span>
                                    <div className="flex items-center gap-2 text-white/60">
                                        <Heart size={14} />
                                        <span className="text-[10px] font-bold">850</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
        </section>
    );
}
