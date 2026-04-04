export function BannerGrid() {
  const cards = [
    { title: "Best-sellers", emoji: "⭐", color: "from-[#111111] to-[#353535]" },
    { title: "Collections tendance", emoji: "✨", color: "from-[#E8393A] to-[#ff6b6b]" },
    { title: "Livraison rapide", emoji: "⚡", color: "from-[#FF9800] to-[#FFB74D]" }
  ];

  return (
    <section className="mx-auto mt-8 max-w-7xl px-3 md:px-4">
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <article
            key={card.title}
            className={`min-h-32 p-6 text-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br ${card.color} cursor-pointer`}
          >
            <div className="text-3xl mb-2">{card.emoji}</div>
            <h3 className="text-xl font-black">{card.title}</h3>
            <p className="mt-2 text-sm font-medium text-white/90">Offres exclusives à durée limitée</p>
          </article>
        ))}
      </div>
    </section>
  );
}
