"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useToastStore } from "@/store/toastStore";

export function ToastViewport() {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div className="fixed right-4 bottom-4 z-[90] flex w-full max-w-xs flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            className="border border-[#e8e8e8] bg-white px-3 py-2 text-xs font-bold text-[#111111] shadow-lg"
          >
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
