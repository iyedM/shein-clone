"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Send, Gift, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export function NewsletterPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        const hasSeen = localStorage.getItem("shein-newsletter-seen");
        if (!hasSeen) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, []);

    const closePopup = () => {
        setIsOpen(false);
        localStorage.setItem("shein-newsletter-seen", "true");
    };

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setTimeout(() => {
                closePopup();
            }, 3000);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (!open) closePopup();
        }}>
            <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white border-none" showCloseButton={false}>
                <DialogTitle className="sr-only">Inscription à la newsletter</DialogTitle>
                <DialogDescription className="sr-only">
                    Inscrivez-vous pour recevoir une réduction de 15% sur votre première commande.
                </DialogDescription>

                <div className="relative w-full overflow-hidden flex flex-col md:flex-row min-h-[400px]">
                    <button
                        onClick={closePopup}
                        className="absolute top-4 right-4 z-20 p-2 bg-white/10 hover:bg-[#111111] hover:text-white transition-all rounded-full"
                    >
                        <X size={20} />
                    </button>

                    {/* Left Side - Image/Offer */}
                    <div className="md:w-1/2 bg-[#111111] text-white p-10 flex flex-col justify-center relative overflow-hidden">
                        <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-[#E8393A] rounded-full blur-[80px] opacity-30" />
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
                                <Sparkles size={12} className="text-yellow-400" />
                                Offre Exclusive
                            </div>
                            <h3 className="text-4xl font-black leading-tight mb-4 font-heading italic">REJOINS LE CLUB</h3>
                            <p className="text-lg text-white/70 mb-8 font-light italic">Inscris-toi et reçois <span className="text-[#E8393A] font-bold">-15%</span> sur ta première commande.</p>
                            <div className="flex items-center gap-4 text-xs font-bold text-white/40 uppercase tracking-widest">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-[#111111] bg-gray-600" />
                                    ))}
                                </div>
                                <span>+10k Membres</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="md:w-1/2 p-10 flex flex-col justify-center bg-white">
                        {!isSubscribed ? (
                            <>
                                <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Pas de spam, c'est promis.</h4>
                                <p className="text-xs text-gray-500 mb-8">Découvre les tendances avant tout le monde et reçois nos offres flash directement dans ta boîte mail.</p>

                                <form onSubmit={handleSubscribe} className="space-y-4">
                                    <div className="relative">
                                        <input
                                            type="email"
                                            required
                                            placeholder="Ton adresse email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-4 bg-gray-50 border-none text-sm focus:ring-2 focus:ring-[#E8393A] outline-none transition-all"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-[#111111] text-white py-4 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-[#E8393A] transition-all"
                                    >
                                        <Send size={16} />
                                        S'abonner maintenant
                                    </button>
                                </form>
                                <button
                                    onClick={closePopup}
                                    className="mt-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-[#111111] transition-colors"
                                >
                                    Non merci, je préfère payer le prix fort
                                </button>
                            </>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-10"
                            >
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Gift size={32} />
                                </div>
                                <h4 className="text-xl font-black mb-2 uppercase">BIENVENUE !</h4>
                                <p className="text-sm text-gray-500 mb-8">Ton code promo de <span className="font-bold text-[#111111]">-15%</span> arrive dans quelques instants.</p>
                                <div className="p-4 bg-gray-50 border-2 border-dashed border-gray-200 text-xl font-mono font-bold tracking-widest">
                                    SHINE2026
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
