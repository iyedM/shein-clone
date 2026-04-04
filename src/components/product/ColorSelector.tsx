import type { ProductColor } from "@/types/product";

type ColorSelectorProps = {
  colors: ProductColor[];
  value: string;
  onChange: (color: ProductColor) => void;
};

export function ColorSelector({ colors, value, onChange }: ColorSelectorProps) {
  return (
    <div className="space-y-2">
      <span className="text-xs font-bold">Couleur: {value}</span>
      <div className="flex gap-2">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => onChange(color)}
            aria-label={color.name}
            className={`h-7 w-7 border-2 ${value === color.name ? "border-[#111111]" : "border-[#e8e8e8]"}`}
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>
    </div>
  );
}
