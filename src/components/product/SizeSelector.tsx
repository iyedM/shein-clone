type SizeSelectorProps = {
  sizes: string[];
  value: string;
  onChange: (size: string) => void;
};

export function SizeSelector({ sizes, value, onChange }: SizeSelectorProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold">Taille</span>
        <button className="text-xs text-[#888888] underline">Guide des tailles</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onChange(size)}
            className={`min-w-10 border px-3 py-2 text-xs font-bold ${
              value === size ? "border-[#111111] bg-[#111111] text-white" : "border-[#e8e8e8] bg-white text-[#111111]"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
