"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ServiceType } from "@/lib/servicesData";

interface FAQSectionProps {
  faqs: ServiceType["faqs"];
  title: string;
  subtitle: string;
}

export default function FAQSection({ faqs, title, subtitle }: FAQSectionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-teal-600 mb-1">{subtitle}</h3>
        <h2 className="text-2xl font-extrabold text-slate-900">{title}</h2>
      </div>
      <div className="space-y-2">
        {faqs.map((faq, idx) => {
          const isOpen = openFaq === idx;
          return (
            <div key={idx} className="border border-slate-200 rounded-xl bg-white overflow-hidden">
              <button
                onClick={() => setOpenFaq(isOpen ? null : idx)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-bold text-slate-800 text-xs sm:text-sm hover:bg-slate-50 transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown className={cn("h-4 w-4 text-teal-600 transition-transform", isOpen && "rotate-180")} />
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden border-t border-slate-100"
                  >
                    <p className="px-5 py-3 text-xs text-slate-600 leading-relaxed bg-slate-50/50">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
