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
    <div className="sticky top-[98px] z-30 border-y border-[#e8e8e8] bg-white">
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-3 py-3 md:px-4">
        {chips.map((chip) => (
          <button
            key={chip}
            onClick={() => setActiveChip(chip)}
            className={`shrink-0 rounded-[3px] border px-3 py-1 text-xs font-bold transition ${
              activeChip === chip
                ? "border-[#111111] bg-[#111111] text-white"
                : "border-[#e8e8e8] bg-white text-[#111111] hover:text-[#E8393A]"
            }`}
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
