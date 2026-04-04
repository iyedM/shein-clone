"use client";

import Link from "next/link";
import { allCategories } from "@/lib/catalog";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-[98px] z-[60] border-b border-[#e8e8e8] bg-white md:top-16">
      <div className="mx-auto flex max-w-7xl items-center gap-5 overflow-x-auto px-4 py-2">
        {allCategories.map((category, index) => {
          const active = pathname.includes(`/products/${category.slug}`) || (pathname === "/" && index === 0);

          return (
            <div key={category.slug} className="group relative">
              <Link
                href={`/products/${category.slug}`}
                className={`relative block shrink-0 text-xs font-bold whitespace-nowrap transition ${
                  category.label === "Prix de ouf"
                    ? "text-[#E8393A]"
                    : active
                      ? "text-[#E8393A]"
                      : "text-[#111111] hover:text-[#E8393A]"
                }`}
              >
                {category.label}
                {active ? <span className="absolute right-0 -bottom-2 left-0 h-0.5 bg-[#E8393A]" /> : null}
              </Link>
              <div className="pointer-events-none absolute left-0 z-40 mt-2 hidden min-w-56 border border-[#e8e8e8] bg-white p-3 text-xs opacity-0 shadow-md transition md:group-hover:block md:group-hover:opacity-100">
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
