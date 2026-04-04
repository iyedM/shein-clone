"use client";

import Link from "next/link";
import { allCategories } from "@/lib/catalog";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-[98px] z-[60] glass md:top-16">
      <div className="mx-auto flex max-w-[1400px] items-center gap-6 overflow-x-auto px-4 md:px-6">
        {allCategories.map((category, index) => {
          const active = pathname.includes(`/products/${category.slug}`) || (pathname === "/" && index === 0);

          return (
            <div key={category.slug} className="group relative">
              <Link
                href={`/products/${category.slug}`}
                className={`relative block shrink-0 py-4 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${category.label === "Prix de ouf"
                    ? "text-[#E8393A]"
                    : active
                      ? "text-[#E8393A]"
                      : "text-[#111111]/70 hover:text-[#E8393A]"
                  }`}
              >
                {category.label}
                {active ? <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E8393A]" /> : null}
              </Link>
              <div className="pointer-events-none absolute left-0 z-40 mt-1 hidden min-w-56 border border-[#e8e8e8] bg-white p-4 text-xs opacity-0 shadow-premium rounded-xl transition md:group-hover:block md:group-hover:opacity-100">
                <p className="font-bold text-[#111111]">{category.label}</p>
                <p className="mt-1 text-[#6b6b6b]">Découvre les meilleures offres de cette catégorie.</p>
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
