"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";

type SearchBarProps = {
  placeholder?: string;
  defaultValue?: string;
  onChangeDebounced?: (value: string) => void;
};

export function SearchBar({
  placeholder = "Robe d'été, bikini, sandales...",
  defaultValue = "",
  onChangeDebounced,
}: SearchBarProps) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChangeDebounced?.(value);
    }, 300);

    return () => clearTimeout(timeout);
  }, [onChangeDebounced, value]);

  return (
    <div className="flex w-full items-center gap-2 border border-[#e8e8e8] bg-[#f5f5f5] px-3 py-2">
      <Search className="h-4 w-4 text-[#888888]" />
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm outline-none placeholder:text-[#888888]"
      />
    </div>
  );
}
