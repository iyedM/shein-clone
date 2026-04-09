import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryListingClient } from "@/components/product/CategoryListingClient";
import { allCategories, getProductsByCategory } from "@/lib/catalog";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const title = allCategories.find((item) => item.slug === category)?.label ?? "Catégorie";
  return {
    title,
    description: `Explore la catégorie ${title} sur SHINE clone.`,
    openGraph: {
      title: `${title} · SHINE Clone FR`,
      description: `Nouveautés et meilleures ventes ${title}.`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const categoryItem = allCategories.find((item) => item.slug === category);
  const products = getProductsByCategory(category);

  if (!categoryItem) {
    notFound();
  }

  return (
    <>
      <section className="mx-auto max-w-7xl px-3 pt-4 md:px-4">
        <p className="text-xs text-[#888888]">Home &gt; Femme &gt; {categoryItem.label}</p>
        <h1 className="mt-2 text-xl font-black">{categoryItem.label}</h1>
      </section>
      <CategoryListingClient products={products} />
    </>
  );
}
