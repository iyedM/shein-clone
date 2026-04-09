import type { Metadata } from "next";
import { HeroBanner } from "@/components/home/HeroBanner";
import { CategoryIcons } from "@/components/home/CategoryIcons";
import { FlashSaleSection } from "@/components/home/FlashSaleSection";
import { FilterBar } from "@/components/ui/FilterBar";
import { ProductFeed } from "@/components/home/ProductFeed";
import { StoryRings } from "@/components/home/StoryRings";
import { EditorialGrid } from "@/components/home/EditorialGrid";
import { CuratedSection } from "@/components/home/CuratedSection";
import { SocialWall } from "@/components/home/SocialWall";

export const metadata: Metadata = {
  title: "SHINE AI | Hyper-Fluid 2026",
  description: "L'expérience shopping du futur. Mode fluide, IA personnalisée et tendances immersives.",
  openGraph: {
    title: "SHINE AI | Hyper-Fluid 2026",
    description: "Découvrez le futur de la mode avec notre interface fluide et nos recommandations IA.",
  },
};

export default function HomePage() {
  return (
    <div className="bg-[#FAFAF8]">
      <StoryRings />
      <HeroBanner />
      <CategoryIcons />
      <EditorialGrid />
      <FlashSaleSection />
      <CuratedSection />
      <div className="my-10">
        <FilterBar />
      </div>
      <ProductFeed />
      <SocialWall />
    </div>
  );
}
