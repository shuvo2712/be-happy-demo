"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Image from "next/image";

export default function SocialResponsibility() {
  return (
    <section id="responsibility" className="px-6 py-12 sm:px-12 lg:px-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-slate-950 px-6 py-16 text-center shadow-2xl sm:px-16 border border-slate-800/80"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0 h-full w-full">
          <Image
            src="/responsibility-bg.png"
            alt="Smiling children symbolizing hope and care"
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover opacity-60"
            priority
          />
          {/* Overlays for high contrast text readability */}
          <div className="absolute inset-0 bg-slate-950/60" />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-teal-950/70 to-transparent opacity-95" />
        </div>

        {/* Decorative Grid Pattern Overlay */}
        <div
          className="absolute inset-0 z-[1] opacity-5 mix-blend-overlay"
          style={{
            backgroundImage: "radial-gradient(circle at center, white 2px, transparent 2px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-teal-600 shadow-xl border border-teal-500/20">
            <Heart className="h-8 w-8 fill-teal-600" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-shadow-sm">
            Social Responsibility
          </h2>
          <p className="text-xl font-medium text-teal-300 sm:text-2xl">
            We proudly donate <span className="font-extrabold text-white">10%</span> of our profits to support orphans.
          </p>
          <p className="text-base text-slate-300 leading-relaxed max-w-2xl">
            Every service you book with us brings comfort to you, and hope to a child in need. Together, we can make a difference in Dhaka.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
