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
    <div className="sticky top-[98px] z-30 bg-white shadow-sm md:top-16">
      <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-3 py-4 md:px-4">
        {chips.map((chip) => (
          <button
            key={chip}
            onClick={() => setActiveChip(chip)}
            className={`shrink-0 rounded-full border-2 px-4 py-2 text-sm font-bold transition-all duration-300 ${
              activeChip === chip
                ? "border-[#E8393A] bg-[#E8393A] text-white shadow-md hover:shadow-lg"
                : "border-[#e8e8e8] bg-white text-[#111111] hover:border-[#E8393A] hover:text-[#E8393A]"
            }`}
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
