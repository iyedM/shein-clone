import Link from "next/link";
import { allCategories } from "@/lib/catalog";

export function CategoryIcons() {
  return (
    <section className="mx-auto mt-8 max-w-7xl px-3 md:px-4">
      <div className="flex gap-4 overflow-x-auto pb-2">
        {allCategories.slice(0, 12).map((category) => (
          <Link key={category.slug} href={`/products/${category.slug}`} className="group min-w-20 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#f9f9f9] to-[#f0f0f0] text-3xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:bg-gradient-to-br group-hover:from-[#E8393A] group-hover:to-[#ff6b6b]">
              {category.emoji}
            </div>
            <p className="mt-2 text-[12px] font-semibold text-[#111111] transition-all duration-300 group-hover:text-[#E8393A]">{category.label}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
