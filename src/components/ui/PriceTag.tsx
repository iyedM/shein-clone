type PriceTagProps = {
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  large?: boolean;
};

export function PriceTag({ price, originalPrice, discountPercent, large }: PriceTagProps) {
  return (
    <div className="flex items-center gap-2">
      <span className={large ? "text-3xl font-bold tracking-tighter text-[#E8393A]" : "text-base font-bold text-[#E8393A]"}>
        {price.toFixed(2)}€
      </span>
      {originalPrice ? (
        <span className="text-xs text-[#6b6b6b] line-through font-medium">{originalPrice.toFixed(2)}€</span>
      ) : null}
      {discountPercent ? (
        <span className="rounded-[4px] bg-[#E8393A] px-2 py-0.5 text-[10px] font-bold text-white uppercase shadow-sm">
          -{discountPercent}%
        </span>
      ) : null}
    </div>
  );
}

