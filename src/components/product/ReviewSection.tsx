"use client";

import { Star, ThumbsUp, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
  { id: 1, user: "Marie L.", stars: 5, text: "Très belle qualité, taille parfaitement. Le tombé est incroyable, je ne m'attendais pas à une telle finesse dans les détails.", size: "M", date: "il y a 2 jours", location: "Paris, FR" },
  { id: 2, user: "Sarah K.", stars: 4, text: "La couleur est sublime, livraison ultra rapide. Un peu plus large que prévu mais ça donne un style oversize sympa.", size: "S", date: "il y a 5 jours", location: "Lyon, FR" },
  { id: 3, user: "Alicia V.", stars: 5, text: "Encore mieux en vrai, je recommande vivement. Les finitions SHINE LUXE 2026 sont vraiment d'un autre niveau.", size: "L", date: "il y a 1 semaine", location: "Bordeaux, FR" },
];

export function ReviewSection() {
  return (
    <div id="reviews" className="space-y-12">
      <div className="grid gap-12 md:grid-cols-[280px_1fr]">
        {/* Rating Overview */}
        <div className="bg-[#FAFAF8] p-8 rounded-[2.5rem] border border-gray-100 flex flex-col items-center justify-center text-center h-fit">
          <p className="text-6xl font-black font-heading text-[#111111] italic leading-none">4.8</p>
          <div className="flex gap-1 my-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-8">Basé sur 1,240 avis</p>

          <div className="w-full space-y-3">
            {[5, 4, 3, 2, 1].map((value) => (
              <div key={value} className="flex items-center gap-4">
                <span className="text-[10px] font-black w-4">{value}</span>
                <div className="h-1.5 flex-1 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${value === 5 ? 85 : value === 4 ? 10 : 5}%` }}
                    viewport={{ once: true }}
                    className="h-full bg-[#111111]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Feed */}
        <div className="space-y-8">
          {reviews.map((review, i) => (
            <motion.article
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 rounded-[2rem] border border-gray-100 bg-white hover:shadow-premium transition-all duration-500"
            >
              <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className={`h-3 w-3 ${index < review.stars ? "fill-[#111111] text-[#111111]" : "text-gray-200"}`} />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black uppercase tracking-tight">{review.user}</span>
                    <div className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{review.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin size={12} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{review.location}</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed font-satoshi mb-6 italic">
                "{review.text}"
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400 rounded-full">Taille: {review.size}</span>
                  <span className="px-3 py-1 bg-[#E8393A]/5 text-[10px] font-black uppercase tracking-widest text-[#E8393A] rounded-full">Achat vérifié</span>
                </div>

                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
                  <ThumbsUp size={14} /> Utile (12)
                </button>
              </div>
            </motion.article>
          ))}

          <button className="w-full py-6 rounded-2xl border-2 border-gray-100 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#111111] hover:text-white hover:border-[#111111] transition-all">
            Charger plus de témoignages
          </button>
        </div>
      </div>
    </div>
  );
}
