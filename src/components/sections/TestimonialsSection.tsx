"use client";

import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { ServiceType } from "@/lib/servicesData";

interface TestimonialsSectionProps {
  testimonials: ServiceType["testimonials"];
  subtitle: string;
  title: string;
}

export default function TestimonialsSection({ testimonials, subtitle, title }: TestimonialsSectionProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    if (!testimonials || testimonials.length === 0) return;
    const t = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(t);
  }, [testimonials]);

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl text-white">
      <span className="text-[10px] uppercase font-bold tracking-wider text-teal-400">{subtitle}</span>
      <h3 className="text-xl font-bold mt-1 mb-6">{title}</h3>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTestimonial}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          <div className="flex gap-1">
            {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <blockquote className="text-sm text-slate-300 italic leading-relaxed">
            &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
          </blockquote>
          <div className="flex items-center gap-3 pt-2">
            <div className="h-9 w-9 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 font-bold text-sm">
              {testimonials[activeTestimonial].name.charAt(0)}
            </div>
            <div>
              <p className="text-xs font-bold">{testimonials[activeTestimonial].name}</p>
              <p className="text-[10px] text-slate-500">{testimonials[activeTestimonial].location}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
