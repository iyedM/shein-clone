"use client";

import { Star } from "lucide-react";

const reviews = [
  { id: 1, stars: 5, text: "Très belle qualité, taille parfaitement.", size: "M" },
  { id: 2, stars: 4, text: "La couleur est sublime, livraison rapide.", size: "S" },
  { id: 3, stars: 5, text: "Encore mieux en vrai, je recommande.", size: "L" },
  { id: 4, stars: 4, text: "Confortable et bien coupé.", size: "XL" },
  { id: 5, stars: 5, text: "Excellent rapport qualité/prix.", size: "M" },
];

export function ReviewSection() {
  return (
    <section id="reviews" className="space-y-5 border-t border-[#e8e8e8] pt-8">
      <h2 className="text-lg font-black">Avis clients</h2>
      <div className="grid gap-6 md:grid-cols-[220px_1fr]">
        <div>
          <p className="text-3xl font-black text-[#111111]">4.6/5</p>
          <div className="mt-3 space-y-2">
            {[5, 4, 3, 2, 1].map((value) => (
              <div key={value} className="flex items-center gap-2">
                <span className="w-4 text-xs">{value}</span>
                <div className="h-2 flex-1 bg-[#f1f1f1]">
                  <div className="h-2 bg-[#111111]" style={{ width: `${(value / 5) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          {reviews.map((review) => (
            <article key={review.id} className="border border-[#e8e8e8] p-3">
              <div className="mb-2 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className={`h-3 w-3 ${index < review.stars ? "fill-[#111111] text-[#111111]" : "text-[#d9d9d9]"}`} />
                ))}
              </div>
              <p className="text-sm">{review.text}</p>
              <p className="mt-1 text-xs text-[#888888]">Taille achetée: {review.size}</p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {[1, 2, 3].map((slot) => (
                  <div key={slot} className="h-14 bg-[#f5f5f5]" />
                ))}
              </div>
            </article>
          ))}
          <button className="border border-[#111111] px-4 py-2 text-xs font-bold">Voir plus d&apos;avis</button>
        </div>
      </div>
    </section>
  );
}
