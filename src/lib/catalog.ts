import products from "@/data/products.json";
import categories from "@/data/categories.json";
import banners from "@/data/banners.json";
import type { Banner, Category, Product } from "@/types/product";

export const allProducts = products as Product[];
export const allCategories = categories as Category[];
export const heroBanners = banners as Banner[];

export function getProductById(id: string) {
  return allProducts.find((product) => product.id === id);
}

export function getProductsByCategory(category: string) {
  return allProducts.filter((product) => product.category === category);
}

export function searchProducts(query: string) {
  const q = query.toLowerCase().trim();

  if (!q) {
    return allProducts;
  }

  return allProducts.filter((product) => {
    const haystack = [
      product.name,
      product.category,
      product.description,
      product.material,
      product.tags.join(" "),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(q);
  });
}

export function filteredProducts(options: {
  products: Product[];
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  colors?: string[];
  minRating?: number;
  fastDelivery?: boolean;
  chip?: string;
  search?: string;
}) {
  const {
    products,
    minPrice = 0,
    maxPrice = 1000,
    sizes = [],
    colors = [],
    minRating = 0,
    fastDelivery = false,
    chip,
    search,
  } = options;

  return products.filter((product) => {
    const inPrice = product.price >= minPrice && product.price <= maxPrice;
    const inSize = sizes.length === 0 || product.sizes.some((size) => sizes.includes(size));
    const inColor =
      colors.length === 0 ||
      product.colors.some((color) => colors.includes(color.hex) || colors.includes(color.name));
    const inRating = product.rating >= minRating;
    const inDelivery = !fastDelivery || product.deliveryDays <= 4;

    const inChip = !chip || chip === "Juste pour toi" || product.tags.some((tag) => tag.toLowerCase().includes(chip.toLowerCase()));

    const inSearch =
      !search ||
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));

    return inPrice && inSize && inColor && inRating && inDelivery && inChip && inSearch;
  });
}

export function sortProducts(productsToSort: Product[], sortBy: string) {
  const clone = [...productsToSort];

  switch (sortBy) {
    case "Prix croissant":
      return clone.sort((a, b) => a.price - b.price);
    case "Prix décroissant":
      return clone.sort((a, b) => b.price - a.price);
    case "Nouveautés":
      return clone.sort((a, b) => Number(b.badge === "NEW") - Number(a.badge === "NEW"));
    case "Meilleures ventes":
      return clone.sort((a, b) => b.reviewCount - a.reviewCount);
    default:
      return clone.sort((a, b) => b.rating - a.rating);
  }
}
