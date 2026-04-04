import type { Metadata } from "next";
import { HeroBanner } from "@/components/home/HeroBanner";
import { CategoryIcons } from "@/components/home/CategoryIcons";
import { FlashSaleSection } from "@/components/home/FlashSaleSection";
import { BannerGrid } from "@/components/home/BannerGrid";
import { FilterBar } from "@/components/ui/FilterBar";
import { ProductFeed } from "@/components/home/ProductFeed";

export const metadata: Metadata = {
  title: "Accueil",
  description: "Accueil SHEIN FR clone: ventes flash, tendances et nouveautés mode.",
  openGraph: {
    title: "SHEIN FR Clone · Accueil",
    description: "Explore les prix de ouf, promos et recommandations personnalisées.",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <CategoryIcons />
      <FlashSaleSection />
      <BannerGrid />
      <FilterBar />
      <ProductFeed />
    </>
  );
}
