"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const stories = [
    { id: 1, name: "Live Try-on", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=200", isLive: true },
    { id: 2, name: "New In", img: "https://images.unsplash.com/photo-1539109132374-34845945c3af?auto=format&fit=crop&q=80&w=200" },
    { id: 3, name: "Hauls", img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=200" },
    { id: 4, name: "Summer 26", img: "https://images.unsplash.com/photo-1523359346063-d1433f971557?auto=format&fit=crop&q=80&w=200" },
    { id: 5, name: "Streetwear", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=200" },
    { id: 6, name: "Eco-Line", img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=200" },
    { id: 7, name: "Party", img: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&q=80&w=200" },
];

export function StoryRings() {
    return (
        <div className="w-full overflow-x-auto no-scrollbar py-8 bg-[#FAFAF8]">
            <div className="flex gap-6 px-6 md:px-10 min-w-max">
                {stories.map((story, i) => (
                    <motion.div
                        key={story.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1, type: "spring" }}
                        className="flex flex-col items-center gap-3 cursor-pointer group"
                    >
                        <div className="relative">
                            {/* Animated Gradient Border */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className={`w-[84px] h-[84px] rounded-full p-[3px] bg-gradient-to-tr ${story.isLive ? "from-[#E8393A] via-[#FF6B00] to-[#E8393A]" : "from-gray-200 via-gray-400 to-gray-200"
                                    } group-hover:from-[#E8393A] group-hover:to-[#FF6B00] transition-all`}
                            >
                                <div className="w-full h-full rounded-full border-[3px] border-[#FAFAF8] overflow-hidden bg-gray-100">
                                    <Image
                                        src={story.img}
                                        alt={story.name}
                                        width={80}
                                        height={80}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                            </motion.div>

                            {story.isLive && (
                                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#E8393A] text-white text-[8px] font-black px-2 py-0.5 rounded-sm uppercase tracking-tighter shadow-lg">
                                    LIVE
                                </span>
                            )}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-[#111111] transition-colors">{story.name}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
