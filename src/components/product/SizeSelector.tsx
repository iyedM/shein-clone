"use client";

type SizeSelectorProps = {
  sizes: string[];
  value: string;
  onChange: (size: string) => void;
};

export function SizeSelector({ sizes, value, onChange }: SizeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => onChange(size)}
          className={`min-w-[70px] h-14 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-500 border ${value === size
              ? "bg-[#111111] text-white border-black shadow-premium scale-105"
              : "bg-white text-gray-400 border-gray-100 hover:border-gray-300 hover:text-black"
            }`}
        >
          {size}
        </button>
      ))}
    </div>
  );
}
