export function BannerGrid() {
  const cards = ["Best-sellers", "Maison cosy", "Livraison rapide"];

  return (
    <section className="mx-auto mt-6 max-w-7xl px-3 md:px-4">
      <div className="grid gap-3 md:grid-cols-3">
        {cards.map((card, index) => (
          <article
            key={card}
            className={`min-h-28 p-4 text-white transition hover:brightness-110 ${
              index === 0 ? "bg-[#111111]" : index === 1 ? "bg-[#2b2b2b]" : "bg-[#3d3d3d]"
            }`}
          >
            <h3 className="text-lg font-black">{card}</h3>
            <p className="mt-1 text-xs text-white/80">Offres exclusives à durée limitée</p>
          </article>
        ))}
      </div>
    </section>
  );
}
