import { Apple, Play, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20">
      <div className="border-t border-[#e8e8e8] bg-white pt-14 pb-20">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 md:grid-cols-4">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold tracking-tighter text-[#E8393A] mb-6">SHEIN</h2>
            <p className="text-xs leading-relaxed text-[#6b6b6b] max-w-xs">
              La destination mode numéro 1 pour les dernières tendances à prix mini. Rejoignez notre communauté de millions de passionnés de mode.
            </p>
          </div>
          <div>
            <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-[#111111]">Aide & Service</h3>
            <ul className="space-y-4 text-xs font-medium text-[#6b6b6b]">
              <li className="hover:text-[#E8393A] cursor-pointer transition-colors">Suivre ma commande</li>
              <li className="hover:text-[#E8393A] cursor-pointer transition-colors">Retours & Échanges</li>
              <li className="hover:text-[#E8393A] cursor-pointer transition-colors">Guide des tailles</li>
              <li className="hover:text-[#E8393A] cursor-pointer transition-colors">FAQ & Support</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-[#111111]">Entreprise</h3>
            <ul className="space-y-4 text-xs font-medium text-[#6b6b6b]">
              <li className="hover:text-[#E8393A] cursor-pointer transition-colors">À propos de SHEIN</li>
              <li className="hover:text-[#E8393A] cursor-pointer transition-colors">Responsabilité sociale</li>
              <li className="hover:text-[#E8393A] cursor-pointer transition-colors">Espace presse</li>
              <li className="hover:text-[#E8393A] cursor-pointer transition-colors">Carrières</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-[#111111]">Application</h3>
            <p className="mb-8 text-xs text-[#6b6b6b]">Téléchargez notre application pour des offres de ouf.</p>
            <div className="flex flex-col gap-3">
              <button className="flex items-center gap-3 bg-[#111111] px-4 py-3 rounded-xl text-white hover:bg-[#333333] transition-all">
                <Apple size={18} fill="white" />
                <div className="text-left">
                  <p className="text-[9px] uppercase leading-none opacity-60">Available on</p>
                  <p className="text-xs font-bold leading-tight">App Store</p>
                </div>
              </button>
              <button className="flex items-center gap-3 bg-[#111111] px-4 py-3 rounded-xl text-white hover:bg-[#333333] transition-all">
                <Play size={18} fill="white" />
                <div className="text-left">
                  <p className="text-[9px] uppercase leading-none opacity-60">Get it on</p>
                  <p className="text-xs font-bold leading-tight">Google Play</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#111111] px-6 py-6 text-center text-[10px] font-bold uppercase tracking-widest text-white/40">
        © 2026 SHEIN Clone — Tous droits réservés · France
      </div>
    </footer>
  );
}
