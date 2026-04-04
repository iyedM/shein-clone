"use client";

import Link from "next/link";
import { allCategories } from "@/lib/catalog";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-[98px] z-[60] bg-white shadow-sm md:top-16">
      <div className="mx-auto flex max-w-7xl items-center gap-5 overflow-x-auto px-4 py-3">
        {allCategories.map((category, index) => {
          const active = pathname.includes(`/products/${category.slug}`) || (pathname === "/" && index === 0);

          return (
            <div key={category.slug} className="group relative">
              <Link
                href={`/products/${category.slug}`}
                className={`relative block shrink-0 text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                  category.label === "Prix de ouf"
                    ? "text-[#E8393A]"
                    : active
                      ? "text-[#E8393A]"
                      : "text-[#111111] hover:text-[#E8393A]"
                }`}
              >
                {category.label}
                {active ? <span className="absolute right-0 -bottom-3 left-0 h-1 bg-gradient-to-r from-[#E8393A] to-[#ff6b6b] rounded-full" /> : null}
              </Link>
              <div className="pointer-events-none absolute left-0 z-40 mt-2 hidden min-w-56 border border-[#e8e8e8] bg-white p-4 text-xs opacity-0 shadow-xl rounded-lg transition md:group-hover:block md:group-hover:opacity-100">
                <p className="font-bold text-[#111111]">{category.label}</p>
                <p className="mt-1 text-[#888888]">Découvre les meilleures offres de cette catégorie.</p>
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
