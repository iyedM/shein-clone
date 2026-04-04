"use client";

import Link from "next/link";
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SearchBar } from "@/components/ui/SearchBar";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { allCategories } from "@/lib/catalog";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { useFilterStore } from "@/store/filterStore";
import { usePathname, useRouter } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const wishlistCount = useWishlistStore((state) => state.ids.length);
  const totalItems = useCartStore((state) => state.totalItems());
  const setSearch = useFilterStore((state) => state.setSearch);

  const [sticky, setSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const searchPlaceholder = useMemo(
    () => (pathname.startsWith("/search") ? "Rechercher sur SHEIN..." : "Robe d'été, bikini, sandales..."),
    [pathname]
  );

  return (
    <header className={`sticky top-0 z-[70] w-full transition-all glass ${sticky ? "shadow-sm" : "border-b-transparent"}`}>
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-3 px-3 md:px-6">
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <button className="md:hidden" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-full bg-white p-0" showCloseButton>
            <div className="p-4">
              <SheetTitle className="text-xl font-bold text-[#E8393A]">SHEIN</SheetTitle>
            </div>
            <div className="grid max-h-[80vh] grid-cols-1 overflow-y-auto border-t border-[#e8e8e8]">
              {allCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/products/${category.slug}`}
                  className="border-b border-[#f2f2f2] px-4 py-3 text-sm font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  {category.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/" className="text-2xl leading-none font-bold tracking-tight text-[#E8393A]">SHEIN</Link>

        <div className="hidden flex-1 md:block lg:max-w-xl mx-auto">
          <SearchBar
            placeholder={searchPlaceholder}
            onChangeDebounced={(value) => {
              setSearch(value);
              if (value.length > 0) {
                router.push(`/search?q=${encodeURIComponent(value)}`);
              }
            }}
          />
        </div>

        <div className="ml-auto flex items-center gap-4">
          <button aria-label="Recherche" className="md:hidden">
            <Search className="h-5 w-5" />
          </button>
          <Link href="#" aria-label="Compte">
            <User className="h-5 w-5" />
          </Link>
          <Link href="/wishlist" aria-label="Wishlist" className="relative">
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 ? (
              <span className="absolute -top-1.5 -right-1.5 min-w-4 h-4 flex items-center justify-center rounded-full bg-[#111111] px-1 text-[9px] font-bold text-white">
                {wishlistCount}
              </span>
            ) : null}
          </Link>
          <Link href="/cart" aria-label="Panier" className="relative">
            <ShoppingBag className="h-5 w-5" />
            <AnimatePresence>
              {totalItems > 0 ? (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0.7 }}
                  animate={{ scale: [1, 1.1, 1] }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="absolute -top-1.5 -right-1.5 min-w-4 h-4 flex items-center justify-center rounded-full bg-[#E8393A] px-1 text-[9px] font-bold text-white"
                >
                  {totalItems}
                </motion.span>
              ) : null}
            </AnimatePresence>
          </Link>
        </div>
      </div>
      <div className="px-3 pb-3 md:hidden">
        <SearchBar
          placeholder={searchPlaceholder}
          onChangeDebounced={(value) => {
            setSearch(value);
            if (value.length > 0) {
              router.push(`/search?q=${encodeURIComponent(value)}`);
            }
          }}
        />
      </div>
    </header>
  );
}
