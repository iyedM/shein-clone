import { Apple, Play, Camera, Mail, Globe, ShieldCheck, Smartphone } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-40 bg-[#111111] text-white">
      {/* Newsletter / CTA Section */}
      <div className="border-b border-white/5 py-20 px-6">
        <div className="mx-auto max-w-[1400px] flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter mb-4 uppercase font-heading">RESTEZ CONNECTÉ<span className="text-[#E8393A]">.</span></h2>
            <p className="text-white/40 text-sm font-medium tracking-wide">Recevez les tendances en avant-première et des offres exclusives directement dans votre boîte mail.</p>
          </div>
          <div className="w-full max-w-md">
            <div className="relative group">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="w-full bg-white/5 border border-white/10 px-6 py-5 text-sm outline-none focus:border-[#E8393A] transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-white text-[#111111] px-6 text-[10px] font-black uppercase tracking-widest hover:bg-[#E8393A] hover:text-white transition-all">
                S'inscrire
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] py-24 px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <h2 className="text-4xl font-black tracking-tighter text-white mb-8 italic uppercase font-heading">SHINE<span className="text-[#E8393A]">.</span></h2>
            <div className="flex gap-4">
              {[Camera, Mail, Globe, Smartphone].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 flex items-center justify-center border border-white/10 rounded-full hover:bg-white hover:text-[#111111] hover:border-white transition-all text-white/40">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-8 text-[11px] font-black uppercase tracking-[0.2em] text-[#E8393A]">Aide & Service</h3>
            <ul className="space-y-4 text-xs font-bold text-white/40 uppercase tracking-widest">
              {["Suivre ma commande", "Retours & Échanges", "Guide des tailles", "FAQ & Support", "Nous contacter"].map((link) => (
                <li key={link} className="hover:text-white cursor-pointer transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-[1px] bg-[#E8393A] transition-all group-hover:w-3" />
                  {link}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-8 text-[11px] font-black uppercase tracking-[0.2em] text-[#E8393A]">Entreprise</h3>
            <ul className="space-y-4 text-xs font-bold text-white/40 uppercase tracking-widest">
              {["À propos de SHINE", "Responsabilité sociale", "Vendre sur SHINE", "Espace presse", "Carrières"].map((link) => (
                <li key={link} className="hover:text-white cursor-pointer transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-[1px] bg-[#E8393A] transition-all group-hover:w-3" />
                  {link}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-8 text-[11px] font-black uppercase tracking-[0.2em] text-[#E8393A]">Légal</h3>
            <ul className="space-y-4 text-xs font-bold text-white/40 uppercase tracking-widest">
              {["Confidentialité", "Cookies", "Conditions d'utilisation", "Mentions légales", "Sécurité"].map((link) => (
                <li key={link} className="hover:text-white cursor-pointer transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-[1px] bg-[#E8393A] transition-all group-hover:w-3" />
                  {link}
                </li>
              ))}
            </ul>
          </div>

          {/* Apps */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="mb-8 text-[11px] font-black uppercase tracking-[0.2em] text-[#E8393A]">Application</h3>
            <div className="flex flex-col gap-4">
              <button className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 text-white hover:bg-white hover:text-[#111111] transition-all">
                <Apple size={18} fill="currentColor" />
                <div className="text-left">
                  <p className="text-[8px] font-black uppercase leading-none opacity-40">Available on</p>
                  <p className="text-[10px] font-black leading-tight uppercase tracking-tight">App Store</p>
                </div>
              </button>
              <button className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 text-white hover:bg-white hover:text-[#111111] transition-all">
                <Play size={18} fill="currentColor" />
                <div className="text-left">
                  <p className="text-[8px] font-black uppercase leading-none opacity-40">Get it on</p>
                  <p className="text-[10px] font-black leading-tight uppercase tracking-tight">Google Play</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment / Trusted */}
      <div className="border-t border-white/5 bg-black/40 py-10 px-6">
        <div className="mx-auto max-w-[1400px] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-8 opacity-20 hover:opacity-100 transition-opacity">
            <span className="text-[10px] font-black uppercase tracking-widest">Payment Methods</span>
            {/* Simple colored blocks to represent payment types */}
            <div className="flex gap-2">
              {["#FFD700", "#1A1A1A", "#0070BA", "#000000"].map((color, i) => (
                <div key={i} className="w-8 h-5 rounded-[2px]" style={{ backgroundColor: color }} />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
            <Globe size={14} />
            France | Français | EUR
          </div>
        </div>
      </div>

      <div className="bg-[#0a0a0a] px-6 py-8 text-center text-[9px] font-black uppercase tracking-[0.4em] text-white/5 border-t border-white/5">
        © 2026 SHINE CLONE PORTAL — ALL RIGHTS RESERVED
      </div>
    </footer>
  );
}
