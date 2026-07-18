"use client";

import { useState, useEffect } from "react";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const places = ["Bashundhara", "Gulshan", "Banani", "Uttara", "Dhanmondi", "Mirpur"];

const backgrounds = [
  "/hero-bg.png",
  "/images/hero-slides/accommodation.png",
  "/images/hero-slides/concierge.png",
  "/images/hero-slides/tour_guide.png",
  "/images/hero-slides/repair.png",
  "/images/hero-slides/buying.png"
];

export default function HeroSection() {
  const [placeIndex, setPlaceIndex] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);
  const { scrollY } = useScroll();

  useEffect(() => {
    // Select a random starting place and bg on client-side mount
    setPlaceIndex(Math.floor(Math.random() * places.length));
    setBgIndex(Math.floor(Math.random() * backgrounds.length));

    const interval = setInterval(() => {
      setPlaceIndex((prev) => (prev + 1) % places.length);
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  
  // Parallax calculations: translates the background image slower than scroll speed
  const y = useTransform(scrollY, [0, 800], [0, 240]);
  const opacity = useTransform(scrollY, [0, 800], [1, 0.4]);

  return (
    <section id="home" className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-slate-900 px-6 py-24 text-center text-white sm:px-12">
      {/* Background Image Container with Parallax styling */}
      <motion.div 
        className="absolute inset-0 z-0 h-[120%] -top-[10%] overflow-hidden"
        style={{ y, opacity }}
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={bgIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image 
              src={backgrounds[bgIndex]} 
              alt="Dhaka City and Lifestyle" 
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        {/* Overlays for text readability and smooth blending */}
        <div className="absolute inset-0 bg-slate-900/70 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent z-10" />
      </motion.div>
      
      <div className="relative z-10 flex max-w-4xl flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-sm font-medium text-teal-300"
        >
          Be Happy in Dhaka
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col gap-3 text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl items-center text-white"
        >
          <span>Everything You Need in</span>
          <span className="relative inline-flex px-1 min-w-[160px] sm:min-w-[210px] md:min-w-[260px] justify-center overflow-hidden text-5xl sm:text-7xl md:text-8xl">
            <AnimatePresence mode="wait">
              <motion.span 
                key={places[placeIndex]}
                className="inline-block text-teal-400 font-extrabold"
                initial={{ y: 25, opacity: 0 }}
                animate={{ 
                  y: 0, 
                  opacity: 1,
                  textShadow: ["0px 0px 0px rgba(45, 212, 191, 0)", "0px 0px 20px rgba(45, 212, 191, 0.8)", "0px 0px 0px rgba(45, 212, 191, 0)"]
                }}
                exit={{ y: -25, opacity: 0 }}
                transition={{
                  y: { type: "spring", stiffness: 300, damping: 25 },
                  opacity: { duration: 0.15 },
                  textShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                {places[placeIndex]}
              </motion.span>
            </AnimatePresence>
            {/* Animated Underline */}
            <motion.span
              className="absolute -bottom-1 left-0 h-[4px] bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
            />
          </span>
          <span>
            We Make It Happen.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl text-lg text-slate-300 sm:text-xl"
        >
          Your comfort our commitment. We provide reliable and professional services to make your life easier in Dhaka.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-4 flex flex-col gap-4 sm:flex-row"
        >
          <a
            href="#booking"
            className="group flex items-center justify-center gap-2 rounded-full bg-teal-600 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-teal-500 hover:shadow-lg hover:shadow-teal-500/25 active:scale-95"
          >
            Book a Service
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#services"
            className="flex items-center justify-center rounded-full border border-slate-700 bg-slate-800/50 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-slate-700 active:scale-95"
          >
            Explore Services
          </a>
        </motion.div>
      </div>
    </section>
  );
}
