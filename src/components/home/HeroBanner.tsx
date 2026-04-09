"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "SYMPHONY",
    subtitle: "ÉTÉ 2026",
    description: "Une collection où la fluidité rencontre l'élégance radicale.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000",
    color: "#E8393A",
    tag: "HAUTE TENDANCE"
  },
  {
    id: 2,
    title: "KINETIC",
    subtitle: "MOUVEMENT",
    description: "Des coupes conçues pour la vie en mouvement perpétuel.",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=2000",
    color: "#111111",
    tag: "NOUVELLE ÈRE"
  },
  {
    id: 3,
    title: "ECO-LUXE",
    subtitle: "CONSCIENT",
    description: "Le futur de la mode est durable. Découvrez notre gamme bio.",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=2000",
    color: "#3A5A40",
    tag: "ÉCO-RESPONSABLE"
  }
];

export function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full h-[90vh] md:h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background Image with Breathing Effect */}
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
            className="relative w-full h-full"
          >
            <Image
              src={slides[current].image}
              alt={slides[current].title}
              fill
              className="object-cover opacity-80"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
          </motion.div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-center px-6 md:px-20 lg:px-32">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex items-center gap-4 mb-6"
              >
                <span className="w-12 h-[1px] bg-[#E8393A]" />
                <span className="text-xs font-black uppercase tracking-[0.4em] text-[#E8393A]">
                  {slides[current].tag}
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(20px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <h2 className="text-[12px] md:text-[14px] font-bold uppercase tracking-[0.5em] text-white opacity-50 mb-2">
                  {slides[current].subtitle}
                </h2>
                <h1 className="text-7xl md:text-[10rem] font-black text-white leading-none tracking-tighter uppercase font-heading italic">
                  {slides[current].title}
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="text-white/60 text-lg md:text-2xl mt-8 max-w-xl font-light italic"
              >
                {slides[current].description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="mt-12 flex flex-wrap gap-6"
              >
                <Link
                  href="/products/all"
                  className="group relative px-10 py-5 bg-[#E8393A] text-white overflow-hidden shadow-2xl transition-all"
                >
                  <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3">
                    Explorer la collection <ArrowRight size={16} />
                  </span>
                  <motion.div
                    whileHover={{ x: "100%" }}
                    className="absolute inset-0 bg-[#111111] -translate-x-full transition-transform duration-500 ease-in-out"
                  />
                </Link>

                <Link
                  href="/products/nouveautes"
                  className="px-10 py-5 border border-white/20 text-white hover:bg-white hover:text-[#111111] transition-all text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 backdrop-blur-md"
                >
                  Nouveautés
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-20 right-6 md:right-20 flex flex-col items-center gap-8">
        <div className="flex flex-col gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="group flex items-center gap-4 relative"
              aria-label={`Go to slide ${i + 1}`}
            >
              <span className={`text-[10px] font-black tracking-widest transition-all ${current === i ? "text-white opacity-100" : "text-white/20 opacity-0 group-hover:opacity-40"
                }`}>
                0{i + 1}
              </span>
              <div className={`h-12 w-[2px] transition-all duration-700 ${current === i ? "bg-[#E8393A] h-16" : "bg-white/10"
                }`} />
            </button>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            onClick={prevSlide}
            className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#E8393A] hover:border-[#E8393A] transition-all group"
          >
            <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <button
            onClick={nextSlide}
            className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#E8393A] hover:border-[#E8393A] transition-all group"
          >
            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Floating Elements (Parallax) */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-[10%] w-64 h-64 bg-[#E8393A] rounded-full blur-[120px] opacity-20 hidden lg:block"
      />
    </section>
  );
}
