import type { Metadata } from "next";
import { SearchResultsClient } from "@/components/product/SearchResultsClient";

export const metadata: Metadata = {
  title: "Recherche",
  description: "Recherche produits SHEIN clone.",
};

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  return <SearchResultsClient query={q} />;
}
