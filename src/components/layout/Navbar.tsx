"use client";

import Link from "next/link";
import { allCategories } from "@/lib/catalog";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-[72px] md:top-[88px] z-[60] bg-[#FAFAF8] border-b border-gray-100 overflow-hidden">
      <div className="mx-auto flex max-w-[1500px] items-center gap-10 overflow-x-auto px-6 md:px-10 no-scrollbar">
        {allCategories.map((category, index) => {
          const active = pathname.includes(`/products/${category.slug}`) || (pathname === "/" && index === 0);
          const isSpecial = category.label === "Prix de ouf" || category.label === "Nouveautés";

          return (
            <div key={category.slug} className="group relative">
              <Link
                href={`/products/${category.slug}`}
                className={`relative block shrink-0 py-5 text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-300 ${isSpecial
                    ? "text-[#E8393A]"
                    : active
                      ? "text-[#111111]"
                      : "text-[#111111]/40 hover:text-[#111111]"
                  }`}
              >
                {category.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#111111]"
                  />
                )}
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
