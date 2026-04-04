type PriceTagProps = {
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  large?: boolean;
};

export function PriceTag({ price, originalPrice, discountPercent, large }: PriceTagProps) {
  return (
    <div className="flex items-center gap-2">
      <span className={large ? "text-3xl font-black text-[#E8393A]" : "text-base font-bold text-[#E8393A]"}>
        {price.toFixed(2)}€
      </span>
      {originalPrice ? (
        <span className="text-xs text-[#888888] line-through">{originalPrice.toFixed(2)}€</span>
      ) : null}
      {discountPercent ? (
        <span className="rounded-[2px] bg-[#E8393A] px-1.5 py-0.5 text-[10px] font-bold text-white">
          -{discountPercent}%
        </span>
      ) : null}
    </div>
  );
}
