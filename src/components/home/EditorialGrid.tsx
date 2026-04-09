"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";

const editorialItems = [
    {
        id: 1,
        size: "large",
        type: "video",
        title: "FUTURE NOIR",
        subtitle: "STREETWEAR COLLECTION",
        video: "https://player.vimeo.com/external/517090025.sd.mp4?s=d7e3a9688a449175791781297e0b51f893414995&profile_id=165&oauth2_token_id=57447761",
        link: "/products/homme"
    },
    {
        id: 2,
        size: "small",
        type: "image",
        title: "ACCESSORIES",
        image: "https://images.unsplash.com/photo-1523206489230-c012c66b622e?auto=format&fit=crop&q=80&w=800",
        link: "/products/accessoires"
    },
    {
        id: 3,
        size: "medium",
        type: "image",
        title: "ÉLÉGANCE MINIMALE",
        image: "https://images.unsplash.com/photo-1485968579580-b6d095142e8e?auto=format&fit=crop&q=80&w=1000",
        link: "/products/femme"
    },
    {
        id: 4,
        size: "small",
        type: "image",
        title: "L'ART DU DÉTAIL",
        image: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&q=80&w=800",
        link: "/products/maison"
    }
];

export function EditorialGrid() {
    return (
        <section className="px-6 md:px-10 py-20 bg-white">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                    <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#E8393A] mb-4">ÉDITORIAL</h2>
                    <h3 className="text-4xl md:text-6xl font-black font-heading italic uppercase leading-none">BENTO <span className="text-gray-300">STREAM</span></h3>
                </div>
                <p className="max-w-md text-gray-500 text-sm font-medium tracking-tight">Une immersion visuelle dans nos univers créatifs. Explorez les textures, les mouvements et les inspirations de la saison 2026.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[1200px] md:h-[800px]">
                {/* Large Editorial Block (Video) */}
                <motion.div
                    whileHover={{ scale: 0.99 }}
                    className="md:col-span-2 md:row-span-2 relative overflow-hidden bg-black group rounded-3xl"
                >
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                    >
                        <source src={editorialItems[0].video} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute inset-0 p-10 flex flex-col justify-end">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center mb-6 group-hover:bg-[#E8393A] transition-all">
                            <Play className="text-white fill-white" size={24} />
                        </div>
                        <h4 className="text-sm font-black uppercase tracking-[0.4em] text-[#E8393A] mb-2">{editorialItems[0].subtitle}</h4>
                        <h3 className="text-5xl font-black text-white italic font-heading uppercase">{editorialItems[0].title}</h3>
                        <Link href={editorialItems[0].link} className="mt-8 flex items-center gap-2 text-white text-[10px] font-black uppercase tracking-widest hover:gap-4 transition-all">
                            VOIR LE FILM <ArrowUpRight size={14} />
                        </Link>
                    </div>
                </motion.div>

                {/* Medium Editorial Block */}
                <motion.div
                    whileHover={{ scale: 0.99 }}
                    className="md:col-span-2 md:row-span-1 relative overflow-hidden group rounded-3xl"
                >
                    <Image
                        src={editorialItems[2].image!}
                        alt={editorialItems[2].title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all" />
                    <div className="absolute inset-0 p-10 flex flex-col justify-end">
                        <h3 className="text-3xl font-black text-white italic font-heading uppercase">{editorialItems[2].title}</h3>
                        <Link href={editorialItems[2].link} className="mt-4 flex items-center gap-2 text-white text-[10px] font-black uppercase tracking-widest hover:gap-4 transition-all">
                            EXPLORER <ArrowUpRight size={14} />
                        </Link>
                    </div>
                </motion.div>

                {/* Small Editorial Blocks */}
                {editorialItems.filter(item => item.size === "small").map((item) => (
                    <motion.div
                        key={item.id}
                        whileHover={{ scale: 0.99 }}
                        className="md:col-span-1 md:row-span-1 relative overflow-hidden group rounded-3xl"
                    >
                        <Image
                            src={item.image!}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all" />
                        <div className="absolute inset-0 p-8 flex flex-col justify-end">
                            <h3 className="text-xl font-black text-white italic font-heading uppercase leading-tight">{item.title}</h3>
                            <Link href={item.link} className="mt-4 flex items-center gap-2 text-white text-[10px] font-black uppercase tracking-widest">
                                <ArrowUpRight size={14} />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
