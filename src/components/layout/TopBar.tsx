"use client";

import { X } from "lucide-react";
import { useState } from "react";

const key = "shein-promo-bar-hidden";

export function TopBar() {
  const [hidden, setHidden] = useState(
    typeof window !== "undefined" ? localStorage.getItem(key) === "1" : false
  );

  const dismiss = () => {
    localStorage.setItem(key, "1");
    setHidden(true);
  };

  if (hidden) {
    return null;
  }

  return (
    <div className="sticky top-0 z-[100] w-full bg-[#111111] text-white">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest">
        <div className="flex flex-1 flex-wrap items-center gap-x-8 gap-y-1">
          <span className="flex items-center gap-2 italic">
            <span className="text-[#E8393A]">✓</span> Livraison offerte dès 39€
          </span>
          <span className="hidden md:flex items-center gap-2 italic">
            <span className="text-[#E8393A]">✓</span> Retours sous 30 jours
          </span>
          <span className="hidden lg:flex items-center gap-2 italic uppercase bg-[#E8393A] px-2 py-0.5 rounded-sm">
            -15% sur ta 1ère commande appli
          </span>
        </div>
        <button onClick={dismiss} className="p-1 text-white/40 hover:text-white transition-colors" aria-label="Fermer">
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
