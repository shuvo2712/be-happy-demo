"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { servicesData, iconMap } from "@/lib/servicesData";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ServiceGrid() {
  return (
    <section id="services" className="bg-slate-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-teal-600">Our Services</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need, in one place
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            From finding a home to fixing your AC, our comprehensive services cover all aspects of living and working in Dhaka.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:mx-0 lg:max-w-none"
        >
          {servicesData.map((service, index) => {
            const IconComponent = iconMap[service.iconName];
            return (
              <Link
                key={service.id}
                href={`/${service.id}`}
                className="col-span-1"
              >
                <motion.div
                  variants={cardVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="relative group flex flex-col h-full rounded-2xl sm:rounded-3xl bg-white p-3 sm:p-8 shadow-md ring-2 ring-teal-500 border-t-4 border-t-teal-500/80 transition-all hover:bg-gradient-to-br hover:from-white hover:to-teal-50/20 hover:shadow-[0_20px_40px_rgba(20,184,166,0.12)] focus:outline-none focus:ring-2 focus:ring-teal-500 active:scale-[0.98] active:duration-75 cursor-pointer"
                >
                  {/* Floating Booking Cue */}
                  <div className="absolute top-4 right-4 sm:top-8 sm:right-8 text-[9px] sm:text-xs font-semibold text-slate-400 opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:text-teal-600 group-hover:translate-x-0.5 pointer-events-none">
                    Details →
                  </div>

                  <div className="mb-3 sm:mb-6 flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-teal-100 transition-all duration-300 group-hover:bg-teal-500 group-hover:shadow-lg group-hover:shadow-teal-500/30 group-hover:ring-4 group-hover:ring-teal-100">
                    <IconComponent className="h-4 w-4 sm:h-6 sm:w-6 text-teal-600 transition-colors duration-300 group-hover:text-white group-hover:scale-110" />
                  </div>
                  <h3 className="text-xs sm:text-xl font-bold text-slate-900 transition-colors group-hover:text-teal-700">{service.title}</h3>
                  <p className="mt-1 sm:mt-2 text-[10px] sm:text-sm text-slate-500 mb-6">{service.description}</p>

                  <div className="mt-auto w-full flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl border border-teal-500 bg-teal-500 py-1.5 sm:py-3 text-[10px] sm:text-sm font-semibold text-white transition-all duration-300 shadow-[0_4px_12px_rgba(20,184,166,0.15)] group-hover:bg-teal-600 group-hover:border-teal-600 group-hover:shadow-[0_10px_20px_rgba(20,184,166,0.25)]">
                    <span>{service.buttonText}</span>
                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
