"use client";

import { useFilterStore } from "@/store/filterStore";

const chips = [
  "Juste pour toi",
  "Tendances",
  "Robes",
  "Tops",
  "Pantalons",
  "Maillots de bain",
  "Accessoires",
  "Soldes",
];

export function FilterBar() {
  const activeChip = useFilterStore((state) => state.activeChip);
  const setActiveChip = useFilterStore((state) => state.setActiveChip);

  return (
    <div className="sticky top-[112px] z-30 glass md:top-28">
      <div className="mx-auto flex max-w-[1400px] gap-3 overflow-x-auto px-6 py-6 no-scrollbar">
        {chips.map((chip) => {
          const isActive = activeChip === chip;
          return (
            <button
              key={chip}
              onClick={() => setActiveChip(chip)}
              className={`shrink-0 rounded-full border px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 ease-in-out whitespace-nowrap ${isActive
                  ? "border-[#E8393A] bg-[#E8393A] text-white min-w-[140px]"
                  : "border-[#E8E8E8] bg-white text-[#6b6b6b] hover:border-[#E8393A] hover:text-[#E8393A]"
                }`}
            >
              {chip}
            </button>
          );
        })}
      </div>
    </div>
  );
}
