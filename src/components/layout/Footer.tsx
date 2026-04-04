import { Apple, Play, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-10">
      <div className="border-t border-[#e8e8e8] bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-3">
          <div>
            <h3 className="mb-3 text-sm font-black">Aide & Service</h3>
            <ul className="space-y-2 text-xs text-[#888888]">
              <li>Suivre commande</li>
              <li>Retours</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-black">À propos SHEIN</h3>
            <ul className="space-y-2 text-xs text-[#888888]">
              <li>About</li>
              <li>Affilié</li>
              <li>Blog mode</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-black">Paiements</h3>
            <div className="mb-4 flex flex-wrap gap-2 text-[10px] font-bold">
              {[
                "VISA",
                "MC",
                "PayPal",
                "Apple Pay",
              ].map((item) => (
                <span key={item} className="border border-[#e8e8e8] px-2 py-1">
                  {item}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 border border-[#111111] px-2 py-1 text-[10px] font-bold">
                <Apple className="h-3 w-3" /> App Store
              </button>
              <button className="flex items-center gap-1 border border-[#111111] px-2 py-1 text-[10px] font-bold">
                <Play className="h-3 w-3" /> Google Play
              </button>
            </div>
            <p className="mt-3 flex items-center gap-1 text-[10px] text-[#888888]"><ShieldCheck className="h-3 w-3" /> Paiements sécurisés</p>
          </div>
        </div>
      </div>
      <div className="bg-[#111111] px-4 py-3 text-center text-[10px] text-white/80">
        © 2026 SHEIN Clone — Conditions · Confidentialité · Cookies
      </div>
    </footer>
  );
}
