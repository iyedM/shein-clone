"use client";

import { motion } from "framer-motion";
import { Home, Search, Heart, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";

const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Search, label: "Explore", href: "/search" },
    { icon: Heart, label: "Wishlist", href: "/wishlist" },
    { icon: ShoppingBag, label: "Cart", href: "/cart" },
    { icon: User, label: "Profile", href: "/profile" },
];

import { useState, useEffect } from "react";

export function SmartBar() {
    const pathname = usePathname();
    const cartCount = useCartStore((state) => state.totalItems());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-[400px]">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.5 }}
                className="bg-white/70 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] rounded-[2.5rem] px-6 py-3 flex items-center justify-between"
            >
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link key={item.href} href={item.href} className="relative group p-3">
                            <motion.div
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                className={`transition-colors duration-300 ${isActive ? "text-[#E8393A]" : "text-gray-400"}`}
                            >
                                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                                {item.label === "Cart" && mounted && cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-[#E8393A] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                                        {cartCount}
                                    </span>
                                )}
                            </motion.div>
                            {isActive && (
                                <motion.div
                                    layoutId="smartbar-active"
                                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#E8393A] rounded-full"
                                />
                            )}
                        </Link>
                    );
                })}
            </motion.div>
        </div>
    );
}
