import { cn } from "@/lib/utils";

type PriceTagProps = {
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  className?: string;
};

export function PriceTag({ price, originalPrice, discountPercent, className }: PriceTagProps) {
  return (
    <div className={cn("flex items-baseline gap-3", className)}>
      <span className="font-black text-[#111111] font-heading tracking-tighter italic">
        {price.toFixed(2)}€
      </span>
      {originalPrice && originalPrice > price ? (
        <span className="text-[0.6em] text-gray-400 line-through font-bold opacity-60">
          {originalPrice.toFixed(2)}€
        </span>
      ) : null}
      {discountPercent ? (
        <span className="bg-[#E8393A]/5 text-[#E8393A] px-2 py-0.5 rounded-full text-[0.4em] font-black uppercase tracking-widest border border-[#E8393A]/10">
          -{discountPercent}%
        </span>
      ) : null}
    </div>
  );
}
