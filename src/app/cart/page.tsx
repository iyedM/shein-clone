import type { Metadata } from "next";
import { CartClient } from "@/components/cart/CartClient";

export const metadata: Metadata = {
  title: "Panier",
  description: "Consulte ton panier SHEIN clone et valide ta commande.",
  openGraph: {
    title: "Panier · SHEIN Clone FR",
  },
};

export default function CartPage() {
  return <CartClient />;
}
