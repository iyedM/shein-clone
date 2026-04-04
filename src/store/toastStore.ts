"use client";

import { create } from "zustand";

type Toast = {
  id: number;
  message: string;
};

type ToastStore = {
  toasts: Toast[];
  push: (message: string) => void;
  remove: (id: number) => void;
};

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  push: (message) => {
    const id = Date.now();
    set((state) => ({ toasts: [...state.toasts, { id, message }] }));

    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) }));
    }, 2200);
  },
  remove: (id) =>
    set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) })),
}));
