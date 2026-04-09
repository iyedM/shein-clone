"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types/product";

type RecentlyViewedState = {
    products: Product[];
    addProduct: (product: Product) => void;
};

export const useRecentlyViewed = create<RecentlyViewedState>()(
    persist(
        (set) => ({
            products: [],
            addProduct: (product) =>
                set((state) => {
                    const filtered = state.products.filter((p) => p.id !== product.id);
                    return {
                        products: [product, ...filtered].slice(0, 10),
                    };
                }),
        }),
        {
            name: "shein-recently-viewed",
        }
    )
);
