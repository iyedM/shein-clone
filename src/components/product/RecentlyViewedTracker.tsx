"use client";

import { useEffect } from "react";
import { useRecentlyViewed } from "@/store/recentlyViewedStore";
import type { Product } from "@/types/product";

export function RecentlyViewedTracker({ product }: { product: Product }) {
    const addProduct = useRecentlyViewed((state) => state.addProduct);

    useEffect(() => {
        if (product) {
            addProduct(product);
        }
    }, [product, addProduct]);

    return null;
}
