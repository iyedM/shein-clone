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
    <div className="sticky top-0 z-[80] w-full bg-[#111111] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-2 text-[11px] md:px-4 md:text-xs">
        <div className="flex flex-1 flex-wrap items-center gap-x-4 gap-y-1">
          <span>Livraison gratuite dès 39 €</span>
          <span className="hidden md:inline">Retours gratuits sous 30 jours</span>
          <span className="hidden sm:inline">Télécharge l&apos;appli — coupon -15%</span>
        </div>
        <button onClick={dismiss} className="p-1 text-white/80 hover:text-white md:hidden" aria-label="Fermer la bannière">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
