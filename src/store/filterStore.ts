"use client";

import { create } from "zustand";

type FilterStore = {
  activeChip: string;
  search: string;
  minPrice: number;
  maxPrice: number;
  sizes: string[];
  colors: string[];
  minRating: number;
  fastDelivery: boolean;
  setActiveChip: (chip: string) => void;
  setSearch: (value: string) => void;
  setPrice: (min: number, max: number) => void;
  toggleSize: (size: string) => void;
  toggleColor: (color: string) => void;
  setMinRating: (rating: number) => void;
  setFastDelivery: (enabled: boolean) => void;
  clearAll: () => void;
};

const defaultState = {
  activeChip: "Juste pour toi",
  search: "",
  minPrice: 0,
  maxPrice: 200,
  sizes: [] as string[],
  colors: [] as string[],
  minRating: 0,
  fastDelivery: false,
};

export const useFilterStore = create<FilterStore>((set) => ({
  ...defaultState,
  setActiveChip: (activeChip) => set({ activeChip }),
  setSearch: (search) => set({ search }),
  setPrice: (minPrice, maxPrice) => set({ minPrice, maxPrice }),
  toggleSize: (size) =>
    set((state) => ({
      sizes: state.sizes.includes(size)
        ? state.sizes.filter((item) => item !== size)
        : [...state.sizes, size],
    })),
  toggleColor: (color) =>
    set((state) => ({
      colors: state.colors.includes(color)
        ? state.colors.filter((item) => item !== color)
        : [...state.colors, color],
    })),
  setMinRating: (minRating) => set({ minRating }),
  setFastDelivery: (fastDelivery) => set({ fastDelivery }),
  clearAll: () => set(defaultState),
}));
