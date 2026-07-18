"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  CheckCircle2,
  Star,
  ChevronDown,
  Phone,
  MessageCircle,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { iconMap, type ServiceType } from "@/lib/servicesData";
import BookingForm from "@/components/forms/BookingForm";
import Footer from "@/components/sections/Footer";
import Navbar from "@/components/ui/Navbar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import AccommodationRedesign from "./AccommodationRedesign";

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
          <div className="flex gap-1 mb-5">
            {Array.from({ length: testimonials[active].rating }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
            ))}
            {Array.from({ length: 5 - testimonials[active].rating }).map((_, i) => (
              <Star key={i} className="h-5 w-5 text-slate-600" />
            ))}
          </div>
          <blockquote className="text-lg text-slate-200 leading-relaxed font-light italic mb-6">
            &ldquo;{testimonials[active].quote}&rdquo;
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

/* ───────────── Gallery Lightbox ───────────── */
function GalleryLightbox({
  images,
  startIndex,
  onClose,
}: {
  images: string[];
  startIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);

  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-4 right-4 z-10 rounded-full bg-white/10 hover:bg-white/20 p-2.5 text-white transition-colors"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Prev */}
      <button
        className="absolute left-4 z-10 rounded-full bg-white/10 hover:bg-white/20 p-2.5 text-white transition-colors"
        onClick={(e) => { e.stopPropagation(); prev(); }}
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Image */}
      <div className="relative w-full max-w-4xl max-h-[85vh] mx-16" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={images[current]}
            alt={`Gallery image ${current + 1}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full object-contain rounded-xl max-h-[85vh]"
          />
        </AnimatePresence>
      </div>

      {/* Next */}
      <button
        className="absolute right-4 z-10 rounded-full bg-white/10 hover:bg-white/20 p-2.5 text-white transition-colors"
        onClick={(e) => { e.stopPropagation(); next(); }}
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
        {current + 1} / {images.length}
      </div>
    </motion.div>
  );
}

/* ───────────── Masonry Gallery ───────────── */
function MasonryGallery({ images }: { images: string[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <div className="columns-2 md:columns-3 gap-3 space-y-3">
        {images.map((src, i) => (
          <FadeInSection key={i} delay={i * 60}>
            <div
              className="relative overflow-hidden rounded-xl cursor-pointer group break-inside-avoid"
              onClick={() => setLightboxIndex(i)}
            >
              <img
                src={src}
                alt={`Gallery ${i + 1}`}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ aspectRatio: i % 3 === 1 ? "4/5" : "4/3" }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-8 w-8" />
              </div>
            </div>
          </FadeInSection>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <GalleryLightbox
            images={images}
            startIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ───────────── Process Steps ───────────── */
function ProcessSection({ steps }: { steps: ServiceType["process"] }) {
  return (
    <div className="relative">
      {/* Vertical connector line on desktop */}
      <div className="hidden md:block absolute left-[calc(50%-1px)] top-8 bottom-8 w-0.5 bg-gradient-to-b from-teal-500/60 via-teal-500/20 to-transparent" />

      <div className="grid md:grid-cols-2 gap-6 md:gap-10">
        {steps.map((step, i) => (
          <FadeInSection key={step.step} delay={i * 100}>
            <div
              className={cn(
                "relative flex gap-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 hover:shadow-md hover:ring-teal-500/20 transition-all duration-300",
                i % 2 === 1 && "md:mt-8"
              )}
            >
              {/* Step number bubble */}
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-teal-500 text-white font-extrabold text-lg flex items-center justify-center shadow-[0_0_20px_rgba(20,184,166,0.3)]">
                {step.step}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
              </div>
            </div>
          </FadeInSection>
        ))}
      </div>
    </div>
  );
}

/* ───────────── Pricing Tiers ───────────── */
function PricingSection({
  tiers,
  buttonText,
}: {
  tiers: ServiceType["pricingTiers"];
  buttonText: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-6 mx-auto",
        tiers.length === 1 ? "max-w-sm grid-cols-1" : "max-w-2xl grid-cols-1 sm:grid-cols-2"
      )}
    >
      {tiers.map((tier, i) => (
        <FadeInSection key={tier.label} delay={i * 120}>
          <div
            className={cn(
              "relative rounded-3xl p-8 border shadow-xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-1",
              tier.isPopular
                ? "bg-gradient-to-br from-slate-900 to-slate-800 border-teal-500/50 shadow-teal-500/10"
                : "bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600"
            )}
          >
            {tier.isPopular && (
              <div className="absolute top-4 right-4 rounded-full bg-teal-500 text-white text-xs font-bold px-3 py-1">
                Most Popular
              </div>
            )}
            {/* Glow */}
            <div className="absolute top-0 right-0 h-32 w-32 bg-teal-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />

            <p className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-4">
              {tier.label}
            </p>
            <div className="mb-1">
              <span className="text-4xl font-extrabold text-white tracking-tight">{tier.bdtPrice}</span>
            </div>
            <p className="text-sm text-slate-400 font-medium mb-6">{tier.usdApprox}</p>

            <ul className="space-y-3 mb-8 flex-1">
              {tier.features.map((feature, fi) => (
                <li key={fi} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-teal-400 shrink-0" />
                  <span className="text-sm text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href="#booking"
              className={cn(
                "block w-full text-center rounded-xl font-semibold py-3.5 transition-all duration-300",
                tier.isPopular
                  ? "bg-teal-600 hover:bg-teal-500 text-white shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)]"
                  : "border border-slate-500 hover:border-teal-500 text-slate-300 hover:text-white"
              )}
            >
              {buttonText}
            </a>
          </div>
        </FadeInSection>
      ))}
    </div>
  );
}

/* ───────────── Sticky Mobile CTA ───────────── */
function StickyMobileCTA({
  service,
}: {
  service: ServiceType;
}) {
  const [visible, setVisible] = useState(false);
  const popularTier = service.pricingTiers.find((t) => t.isPopular) ?? service.pricingTiers[0];

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          // Sits above the mobile tab bar (72px) + safe area
          className="fixed bottom-[72px] left-0 right-0 z-40 md:hidden px-4 pb-2"
        >
          <div className="bg-slate-900/95 backdrop-blur-md border border-teal-500/30 rounded-2xl shadow-2xl shadow-teal-500/10 flex items-center justify-between gap-3 px-4 py-3">
            <div>
              <p className="text-xs text-slate-400 font-medium">Starting from</p>
              <p className="text-white font-bold text-lg leading-tight">{popularTier.bdtPrice}</p>
            </div>
            <a
              href="#booking"
              className="flex-shrink-0 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-sm font-bold px-5 py-2.5 transition-colors shadow-[0_0_15px_rgba(20,184,166,0.4)]"
            >
              Book Now
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ───────────── Main Page ───────────── */
export default function ServiceDetailClient({ service }: { service: ServiceType }) {
  if (service.id === "accommodation") {
    return <AccommodationRedesign service={service} />;
  }
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
        <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${service.heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900" />
        </motion.div>

        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at center, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(20,184,166,0.15),transparent_60%)]" />

        <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
          <div className="flex flex-row items-start gap-4 sm:gap-6 md:gap-10">
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

                {/* Quick CTA in header */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="#booking"
                    className="inline-flex items-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold px-5 py-2.5 text-sm transition-all duration-300 shadow-[0_0_20px_rgba(20,184,166,0.3)]"
                  >
                    {service.buttonText}
                  </a>
                  <a
                    href={`https://wa.me/${service.whatsappNumber.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 hover:border-white/40 text-white/80 hover:text-white font-semibold px-5 py-2.5 text-sm transition-all duration-300"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp Us
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What We Offer ── */}
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

      {/* ── How It Works ── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-14">
              <h2 className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-3">
                Simple Process
              </h2>
              <p className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                How It Works
              </p>
              <p className="mt-4 text-slate-500 max-w-xl mx-auto">
                Getting started is easy. Here&apos;s exactly what happens after you reach out.
              </p>
            </div>
          </FadeInSection>
          <ProcessSection steps={service.process} />
        </div>
      </section>

      {/* ── Gallery ── */}
      {service.galleryImages.length > 0 && (
        <section className="bg-slate-50 py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <FadeInSection>
              <div className="text-center mb-14">
                <h2 className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-3">
                  Our Work
                </h2>
                <p className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Photo Gallery
                </p>
                <p className="mt-4 text-slate-500">Click any image to view fullscreen.</p>
              </div>
            </FadeInSection>
            <MasonryGallery images={service.galleryImages} />
          </div>
        </section>
      )}

      {/* ── Pricing ── */}
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
          <PricingSection tiers={service.pricingTiers} buttonText={service.buttonText} />
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

      {/* ── Sticky Mobile CTA ── */}
      <StickyMobileCTA service={service} />
    </div>
  );
}
