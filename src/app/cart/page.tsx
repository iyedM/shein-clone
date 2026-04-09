import type { Metadata } from "next";
import { CartClient } from "@/components/cart/CartClient";

export const metadata: Metadata = {
  title: "Panier",
  description: "Consulte ton panier SHINE clone et valide ta commande.",
  openGraph: {
    title: "Panier · SHINE Clone FR",
  },
};

export default function CartPage() {
  return <CartClient />;
}
