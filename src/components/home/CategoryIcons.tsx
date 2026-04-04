import Link from "next/link";
import { allCategories } from "@/lib/catalog";

export function CategoryIcons() {
  return (
    <section className="mx-auto mt-5 max-w-7xl px-3 md:px-4">
      <div className="flex gap-3 overflow-x-auto pb-1">
        {allCategories.slice(0, 12).map((category) => (
          <Link key={category.slug} href={`/products/${category.slug}`} className="group min-w-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f5f5f5] text-2xl transition group-hover:scale-105">
              {category.emoji}
            </div>
            <p className="mt-1 text-[11px] text-[#111111] transition group-hover:text-[#E8393A]">{category.label}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
