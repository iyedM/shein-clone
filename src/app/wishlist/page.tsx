import type { Metadata } from "next";
import { WishlistClient } from "@/components/product/WishlistClient";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Tes favoris SHINE clone.",
};

export default function WishlistPage() {
  return <WishlistClient />;
}
