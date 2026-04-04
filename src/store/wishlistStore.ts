"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type WishlistStore = {
  ids: string[];
  toggle: (id: string) => void;
  isWishlisted: (id: string) => boolean;
};

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) => {
        set((state) => ({
          ids: state.ids.includes(id)
            ? state.ids.filter((current) => current !== id)
            : [...state.ids, id],
        }));
      },
      isWishlisted: (id) => get().ids.includes(id),
    }),
    {
      name: "shein-wishlist",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
