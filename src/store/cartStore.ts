"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/product";

type CartStore = {
  items: CartItem[];
  addItem: (payload: {
    product: Product;
    quantity?: number;
    color: string;
    size: string;
  }) => void;
  removeItem: (id: string, color: string, size: string) => void;
  updateQuantity: (id: string, color: string, size: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: ({ product, quantity = 1, color, size }) => {
        set((state) => {
          const existing = state.items.find(
            (item) => item.id === product.id && item.color === color && item.size === size
          );

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === product.id && item.color === color && item.size === size
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                id: product.id,
                product,
                quantity,
                color,
                size,
              },
            ],
          };
        });
      },
      removeItem: (id, color, size) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.id === id && item.color === color && item.size === size)
          ),
        }));
      },
      updateQuantity: (id, color, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id, color, size);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.color === color && item.size === size
              ? { ...item, quantity }
              : item
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
      totalPrice: () =>
        Number(
          get()
            .items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
            .toFixed(2)
        ),
    }),
    {
      name: "shein-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
