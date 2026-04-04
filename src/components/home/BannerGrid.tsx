export function BannerGrid() {
  const cards = [
    { title: "Best-sellers", emoji: "⭐", color: "from-[#111111] to-[#353535]" },
    { title: "Collections tendance", emoji: "✨", color: "from-[#E8393A] to-[#ff6b6b]" },
    { title: "Livraison rapide", emoji: "⚡", color: "from-[#FF9800] to-[#FFB74D]" }
  ];

  return (
    <section className="mx-auto mt-14 max-w-[1400px] px-6 py-14">
      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <article
            key={card.title}
            className={`group relative min-h-[200px] p-8 text-white rounded-2xl shadow-premium hover:shadow-hover transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br ${card.color} cursor-pointer overflow-hidden border-none`}
          >
            <div className="absolute top-0 right-0 p-8 text-6xl opacity-20 group-hover:scale-110 transition-transform duration-500">{card.emoji}</div>
            <div className="relative z-10 h-full flex flex-col justify-end">
              <h3 className="text-2xl font-bold tracking-tight uppercase">{card.title}</h3>
              <p className="mt-2 text-sm font-medium text-white/80">Explorez les pièces les plus convoitées de la saison avec des remises allant jusqu'à -70%.</p>
              <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
                DÉCOUVRIR <span className="text-xl">→</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
