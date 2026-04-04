import type { Product } from "@/types/product";

export type CartItem = {
  id: string;
  product: Product;
  quantity: number;
  color: string;
  size: string;
};
