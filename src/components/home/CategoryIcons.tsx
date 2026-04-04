import Link from "next/link";
import { allCategories } from "@/lib/catalog";
import { Flame, Sparkles, Zap, Shirt, User, Footprints, Gem, ShoppingBag } from "lucide-react";

const iconMap: Record<string, any> = {
  "prix-de-ouf": Flame,
  "nouveautes": Sparkles,
  "livraison-rapide": Zap,
  "vetements-pour-femmes": Shirt,
  "vetements-pour-hommes": User,
  "chaussures": Footprints,
  "bijoux-accessoires": Gem,
};

export function CategoryIcons() {
  return (
    <section className="mx-auto mt-14 max-w-[1400px] px-6 py-14">
      <div className="flex gap-8 overflow-x-auto pb-4 no-scrollbar">
        {allCategories.map((category) => {
          const Icon = iconMap[category.slug] || ShoppingBag;
          return (
            <Link key={category.slug} href={`/products/${category.slug}`} className="group flex flex-col items-center min-w-[100px] text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-premium transition-all duration-300 group-hover:bg-[#FFF0F0] group-hover:shadow-hover">
                <Icon
                  size={32}
                  strokeWidth={1.5}
                  className="text-[#E8393A] transition-transform duration-300 group-hover:rotate-8"
                />
              </div>
              <p className="mt-4 text-xs font-bold tracking-tight text-[#111111] group-hover:text-[#E8393A] transition-colors">{category.label}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

