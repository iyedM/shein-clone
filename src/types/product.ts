export type ProductBadge = "NEW" | "BESTSELLER" | "FLASH" | null;

export type ProductColor = {
  name: string;
  hex: string;
  image?: string;
};

export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  colors: ProductColor[];
  sizes: ProductSize[];
  images: string[];
  badge: ProductBadge;
  isTrending: boolean;
  deliveryDays: number;
  description: string;
  material: string;
  tags: string[];
};

export type Category = {
  slug: string;
  label: string;
  emoji: string;
};

export type Banner = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  gradient: string;
};
