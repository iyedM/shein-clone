"use client";

import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const key = "shein-promo-bar-hidden";

const MESSAGES = [
  { text: "Livraison offerte dès 39€", icon: "✓" },
  { text: "Retours sous 30 jours totalement gratuits", icon: "✓" },
  { text: "-15% sur ta 1ère commande avec l'appli", icon: "PROMO", highlight: true },
  { text: "Nouveautés quotidiennes +1000 articles", icon: "NEW" },
];

export function TopBar() {
  const [hidden, setHidden] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const isHidden = typeof window !== "undefined" ? localStorage.getItem(key) === "1" : false;
    setHidden(isHidden);
  }, []);

  useEffect(() => {
    if (hidden) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [hidden]);

  const dismiss = () => {
    localStorage.setItem(key, "1");
    setHidden(true);
  };

  if (hidden) return null;

  return (
    <div className="relative z-[100] w-full bg-[#111111] text-white overflow-hidden border-b border-white/5">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 md:px-6 py-2">
        <div className="flex-1 flex justify-center md:justify-start overflow-hidden h-5 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="flex items-center gap-3 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em]"
            >
              {MESSAGES[index].highlight ? (
                <span className="bg-[#E8393A] px-1.5 py-0.5 rounded-xs text-white">
                  {MESSAGES[index].icon}
                </span>
              ) : (
                <span className="text-[#E8393A]">{MESSAGES[index].icon}</span>
              )}
              <span className={MESSAGES[index].highlight ? "text-[#E8393A]" : ""}>
                {MESSAGES[index].text}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 border-r border-white/10 pr-4 mr-2">
            <button
              onClick={() => setIndex((i) => (i - 1 + MESSAGES.length) % MESSAGES.length)}
              className="hover:text-[#E8393A] transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => setIndex((i) => (i + 1) % MESSAGES.length)}
              className="hover:text-[#E8393A] transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
          <button
            onClick={dismiss}
            className="p-1 text-white/40 hover:text-white transition-colors"
            aria-label="Fermer"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
