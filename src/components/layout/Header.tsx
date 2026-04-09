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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      setSticky(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const searchPlaceholder = useMemo(
    () => (pathname.startsWith("/search") ? "Rechercher sur SHEIN..." : "Robe d'été, bikini, sandales..."),
    [pathname]
  );

  return (
    <header
      className={`sticky top-0 z-[70] w-full transition-all duration-500 border-b border-white/5 ${sticky
        ? "bg-white/80 backdrop-blur-xl py-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
        : "bg-[#FAFAF8] py-4"
        }`}
    >
      <div className="mx-auto flex items-center gap-8 px-6 md:px-10 max-w-[1500px]">
        {/* Mobile Menu */}
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <button className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-all" aria-label="Menu">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] bg-white p-0 border-r" showCloseButton>
            <div className="p-8 border-b">
              <SheetTitle className="text-3xl font-black text-[#E8393A] italic tracking-tighter">SHEIN</SheetTitle>
            </div>
            <div className="py-2 overflow-y-auto">
              {allCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/products/${category.slug}`}
                  className="flex items-center justify-between px-8 py-5 text-sm font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {category.label}
                  <span className="text-gray-300">→</span>
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="text-4xl leading-none font-black tracking-tighter text-[#111111] hover:text-[#E8393A] transition-colors italic">
          SHEIN<span className="text-[#E8393A]">.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {["Femme", "Homme", "Enfant", "Maison"].map((item) => (
            <Link
              key={item}
              href="#"
              className="text-[11px] font-black uppercase tracking-[0.2em] text-[#111111]/60 hover:text-[#E8393A] transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#E8393A] transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-auto">
          <div className="relative w-full group">
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
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-5">
          <button aria-label="Recherche" className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-all">
            <Search className="h-6 w-6" />
          </button>

          <Link href="#" aria-label="Compte" className="hidden sm:flex p-2 hover:bg-gray-100 rounded-full transition-all group">
            <User className="h-6 w-6 group-hover:text-[#E8393A]" />
          </Link>

          <Link href="/wishlist" aria-label="Wishlist" className="relative p-2 hover:bg-gray-100 rounded-full transition-all group">
            <Heart className={`h-6 w-6 transition-colors group-hover:text-[#E8393A] ${mounted && wishlistCount > 0 ? "fill-[#E8393A] text-[#E8393A]" : ""}`} />
            {mounted && wishlistCount > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-[#111111] text-[9px] font-black text-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link href="/cart" aria-label="Panier" className="relative p-2 hover:bg-gray-100 rounded-full transition-all group">
            <ShoppingBag className="h-6 w-6 group-hover:text-[#E8393A]" />
            <AnimatePresence>
              {mounted && totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-[#E8393A] text-[9px] font-black text-white"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>
      </div>
    </header>
  );
}
