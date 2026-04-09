import type { ProductColor } from "@/types/product";

type ColorSelectorProps = {
  colors: ProductColor[];
  value: string;
  onChange: (color: ProductColor) => void;
};

export function ColorSelector({ colors, value, onChange }: ColorSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 font-satoshi">Couleur: <span className="text-[#111111]">{value}</span></h3>
      <div className="flex gap-4">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => onChange(color)}
            aria-label={color.name}
            className={`group relative h-10 w-10 flex items-center justify-center rounded-full transition-all duration-300 ${value === color.name ? "ring-2 ring-black ring-offset-4 scale-110" : "hover:scale-105"
              }`}
          >
            <div
              className="h-full w-full rounded-full border border-gray-100 shadow-sm"
              style={{ backgroundColor: color.hex }}
            />
            {value === color.name && (
              <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
