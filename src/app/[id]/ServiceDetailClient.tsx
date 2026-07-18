"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Star,
  ChevronDown,
  Phone,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { iconMap, type ServiceType } from "@/lib/servicesData";
import BookingForm from "@/components/forms/BookingForm";
import Footer from "@/components/sections/Footer";
import Navbar from "@/components/ui/Navbar";
import { cn } from "@/lib/utils";

/* ───────────── Fade-in on scroll ───────────── */
function FadeInSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ───────────── FAQ Accordion Item ───────────── */
function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <FadeInSection delay={index * 80}>
      <div className="border border-slate-200 rounded-2xl overflow-hidden">
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-slate-50 transition-colors"
        >
          <span className="text-base font-semibold text-slate-800">{question}</span>
          <ChevronDown
            className={cn(
              "h-5 w-5 text-teal-500 shrink-0 transition-transform duration-300",
              open && "rotate-180"
            )}
          />
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="px-6 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                {answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeInSection>
  );
}

/* ───────────── Testimonial Carousel ───────────── */
function TestimonialCarousel({ testimonials }: { testimonials: ServiceType["testimonials"] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((a) => (a + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-xl"
        >
          {/* Stars */}
          <div className="flex gap-1 mb-5">
            {Array.from({ length: testimonials[active].rating }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
            ))}
            {Array.from({ length: 5 - testimonials[active].rating }).map((_, i) => (
              <Star key={i} className="h-5 w-5 text-slate-600" />
            ))}
          </div>
          <blockquote className="text-lg text-slate-200 leading-relaxed font-light italic mb-6">
            "{testimonials[active].quote}"
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 font-bold text-sm">
              {testimonials[active].name.charAt(0)}
            </div>
            <div>
              <p className="text-white font-semibold text-sm">{testimonials[active].name}</p>
              <p className="text-slate-400 text-xs">{testimonials[active].location}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-5">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === active ? "w-6 bg-teal-400" : "w-2 bg-slate-600 hover:bg-slate-500"
            )}
            aria-label={`Go to review ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ───────────── Main Page ───────────── */
export default function ServiceDetailClient({ service }: { service: ServiceType }) {
  const IconComponent = iconMap[service.iconName];
  const headerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 500], [0, 120]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      {/* ── Premium Parallax Header ── */}
      <section
        ref={headerRef}
        className="relative bg-slate-900 pt-28 pb-20 sm:pt-40 sm:pb-28 overflow-hidden"
      >
        {/* Parallax background image */}
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 scale-110"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${service.heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900" />
        </motion.div>

        {/* Subtle dot grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at center, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        {/* Teal glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(20,184,166,0.15),transparent_60%)]" />

        <div className="relative mx-auto max-w-5xl px-6 lg:px-8">

          <div className="flex flex-row items-start gap-4 sm:gap-6 md:gap-10">
            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex h-14 w-14 sm:h-20 sm:w-20 md:h-24 md:w-24 shrink-0 items-center justify-center rounded-2xl sm:rounded-3xl bg-teal-500/10 text-teal-400 border border-teal-500/30 shadow-[0_0_40px_rgba(20,184,166,0.2)]"
            >
              <IconComponent className="h-7 w-7 sm:h-10 sm:w-10 md:h-12 md:w-12" />
            </motion.div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h1 className="text-xl sm:text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                  {service.title}
                </h1>
                <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed">
                  {service.longDescription}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What We Offer Checklist ── */}
      <section className="bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-14">
              <h2 className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-3">
                Service Details
              </h2>
              <p className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                What We Offer
              </p>
            </div>
          </FadeInSection>

          {service.note && (
            <FadeInSection delay={100}>
              <div className="mx-auto max-w-2xl mb-10 rounded-2xl bg-emerald-50 border border-emerald-200/60 p-4 sm:p-5 text-center text-sm font-semibold text-emerald-800 shadow-sm">
                ✨ {service.note}
              </div>
            </FadeInSection>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.items.map((item, index) => (
              <FadeInSection key={index} delay={index * 80}>
                <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 hover:shadow-md hover:ring-teal-500/30 transition-all duration-300">
                  <CheckCircle2 className="h-6 w-6 text-teal-500 shrink-0" />
                  <span className="text-base font-semibold text-slate-800">{item}</span>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing Card ── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-14">
              <h2 className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-3">
                Transparent Pricing
              </h2>
              <p className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Simple & Fair
              </p>
            </div>
          </FadeInSection>

          <FadeInSection delay={100}>
            <div className="mx-auto max-w-md">
              <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 sm:p-10 border border-slate-700 shadow-2xl overflow-hidden">
                {/* Teal glow accent */}
                <div className="absolute top-0 right-0 h-40 w-40 bg-teal-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />

                <p className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-4">
                  {service.pricing.label}
                </p>

                {/* Dual currency */}
                <div className="mb-2">
                  <span className="text-5xl font-extrabold text-white tracking-tight">
                    {service.pricing.bdtPrice}
                  </span>
                </div>
                <div className="mb-6">
                  <span className="text-sm text-slate-400 font-medium">
                    {service.pricing.usdApprox}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 mb-8 -mt-4">
                  *USD price is approximate
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {service.pricing.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-teal-400 shrink-0" />
                      <span className="text-sm text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#booking"
                  className="block w-full text-center rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold py-3.5 transition-all duration-300 shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)]"
                >
                  {service.buttonText}
                </a>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-slate-900 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-14">
              <h2 className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-3">
                Client Stories
              </h2>
              <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                What Our Clients Say
              </p>
            </div>
          </FadeInSection>

          <FadeInSection delay={100}>
            <div className="mx-auto max-w-2xl">
              <TestimonialCarousel testimonials={service.testimonials} />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ── FAQ Accordion ── */}
      <section className="bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-14">
              <h2 className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-3">
                Common Questions
              </h2>
              <p className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Frequently Asked
              </p>
            </div>
          </FadeInSection>

          <div className="space-y-3">
            {service.faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Inline Contact CTA ── */}
      <section className="bg-white py-12 border-b border-slate-100">
        <FadeInSection>
          <div className="mx-auto max-w-3xl px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-5 rounded-3xl bg-slate-900 p-8 shadow-xl">
            <div>
              <p className="text-white font-bold text-lg">Need instant help?</p>
              <p className="text-slate-400 text-sm mt-1">
                Talk to us directly — we respond fast.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href={`https://wa.me/${service.whatsappNumber.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-5 py-3 transition-all duration-300 shadow-lg hover:shadow-green-500/30"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <a
                href={`tel:${service.phoneNumber}`}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-600 hover:border-teal-500 text-slate-300 hover:text-teal-400 text-sm font-semibold px-5 py-3 transition-all duration-300"
              >
                <Phone className="h-4 w-4" />
                Call Us
              </a>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* ── Booking Form ── */}
      <BookingForm initialCategory={service.id} />

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}
