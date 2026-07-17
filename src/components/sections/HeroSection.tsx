"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section id="home" className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-slate-900 px-6 py-24 text-center text-white sm:px-12">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/hero-bg.png" 
          alt="Dhaka City Skyline at Dusk" 
          fill
          priority
          className="object-cover"
        />
        {/* Overlays for text readability and smooth blending */}
        <div className="absolute inset-0 bg-slate-900/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent" />
      </div>
      
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
          className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl"
        >
          Everything You Need in Dhaka,{" "}
          <span className="bg-gradient-to-r from-teal-400 to-emerald-300 bg-clip-text text-transparent">
            One Call Away.
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
