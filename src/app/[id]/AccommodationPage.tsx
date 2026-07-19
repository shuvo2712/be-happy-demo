"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  CheckCircle2,
  Star,
  ChevronDown,
  Phone,
  MessageCircle,
  Clock,
  Heart,
  Home,
  Briefcase,
  Truck,
  Check,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { iconMap, type ServiceType } from "@/lib/servicesData";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import GallerySection from "@/components/sections/GallerySection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import { cn } from "@/lib/utils";
import SubNavbar from "@/components/ui/SubNavbar";

interface AccommodationPageProps {
  service: ServiceType;
}

const areas = ["Gulshan", "Banani", "Baridhara", "Dhanmondi", "Uttara", "Bashundhara R/A"];

type TabType = "apartment" | "office" | "relocation";

const tabs: { id: TabType; label: string; shortLabel: string; icon: React.ElementType }[] = [
  { id: "apartment", label: "Apartment Search", shortLabel: "Apts", icon: Home },
  { id: "office", label: "Office Search", shortLabel: "Offices", icon: Briefcase },
  { id: "relocation", label: "Relocation Details", shortLabel: "Relocate", icon: Truck },
];

export default function AccommodationPage({ service }: AccommodationPageProps) {
  const [activeTab, setActiveTab] = useState<TabType>("apartment");
  const [step, setStep] = useState(1); // 1: search details, 2: contact info
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  // Common details (Step 2)
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  // Tab 1: Apartment details
  const [aptAreas, setAptAreas] = useState<string[]>([]);
  const [aptBudget, setAptBudget] = useState("");
  const [aptBedCount, setAptBedCount] = useState("");
  const [aptFurnishing, setAptFurnishing] = useState("");
  const [aptFastTrack, setAptFastTrack] = useState(false);

  // Tab 2: Office details
  const [offAreas, setOffAreas] = useState<string[]>([]);
  const [offType, setOffType] = useState("");
  const [offTeamSize, setOffTeamSize] = useState("");
  const [offBudget, setOffBudget] = useState("");
  const [offFastTrack, setOffFastTrack] = useState(false);

  // Tab 3: Relocation details
  const [relFrom, setRelFrom] = useState("");
  const [relTo, setRelTo] = useState("");
  const [relDate, setRelDate] = useState("");
  const [relScale, setRelScale] = useState("");
  const [relAddons, setRelAddons] = useState<string[]>([]);
  const [relFastTrack, setRelFastTrack] = useState(false);

  // Toggle area selections
  const toggleAptArea = (area: string) => {
    setAptAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const toggleOffArea = (area: string) => {
    setOffAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const toggleRelAddon = (addon: string) => {
    setRelAddons((prev) =>
      prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon]
    );
  };

  // Step 1 Validation
  const isAptStep1Valid = aptAreas.length > 0 && aptBudget && aptBedCount && aptFurnishing;
  const isOffStep1Valid = offAreas.length > 0 && offType && offTeamSize && offBudget;
  const isRelStep1Valid = relFrom.trim() !== "" && relTo.trim() !== "" && relScale && relDate;

  const isStep1Valid =
    activeTab === "apartment"
      ? isAptStep1Valid
      : activeTab === "office"
        ? isOffStep1Valid
        : isRelStep1Valid;

  const isStep2Valid = name.trim() !== "" && phone.trim() !== "";

  // Handle Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refNum = `BH-${activeTab.substring(0, 3).toUpperCase()}-${Math.floor(
      10000 + Math.random() * 90000
    )}`;
    setBookingRef(refNum);
    setSubmitted(true);
  };

  // Reset form
  const handleReset = () => {
    setSubmitted(false);
    setStep(1);
    setName("");
    setPhone("");
    setNotes("");
    setAptAreas([]);
    setAptBudget("");
    setAptBedCount("");
    setAptFurnishing("");
    setAptFastTrack(false);
    setOffAreas([]);
    setOffType("");
    setOffTeamSize("");
    setOffBudget("");
    setOffFastTrack(false);
    setRelFrom("");
    setRelTo("");
    setRelDate("");
    setRelScale("");
    setRelAddons([]);
    setRelFastTrack(false);
  };

  // Removed local faq state
  const IconComponent = iconMap[service.iconName as keyof typeof iconMap];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      {/* ── Header / Parallax Hero ── */}
      <section className="sticky top-0 z-40 relative bg-slate-950 pt-28 pb-4 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${service.heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(20,184,166,0.1),transparent_60%)]"></div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto max-w-7xl px-6 lg:px-8"
        >
          <div className="flex flex-row items-center gap-4 sm:gap-6 md:gap-8">
            <div className="hidden md:flex h-14 w-14 sm:h-20 sm:w-20 md:h-24 md:w-24 shrink-0 items-center justify-center rounded-2xl sm:rounded-3xl bg-teal-500/10 text-teal-400 border border-teal-500/30 shadow-[0_0_40px_rgba(20,184,166,0.2)]">
              <IconComponent className="h-7 w-7 sm:h-10 sm:w-10 md:h-12 md:w-12" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                Find Your Ideal Space in Dhaka
              </h1>
              {/* Value Props — glassmorphism cards */}
              <div className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-3">
                <div className="flex items-start gap-2 sm:gap-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm px-3 py-2.5 sm:px-4 sm:py-3">
                  <div className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                    <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-white">Fully Verified Landlords</p>
                    <p className="text-[10px] sm:text-xs text-slate-400 leading-relaxed mt-0.5 hidden sm:block">We verify all ownership documents so you avoid deposit scams.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm px-3 py-2.5 sm:px-4 sm:py-3">
                  <div className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                    <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-white">Bilingual Negotiation</p>
                    <p className="text-[10px] sm:text-xs text-slate-400 leading-relaxed mt-0.5 hidden sm:block">Our team mediates landlord discussions and drafts formal contracts.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sub-Navbar — perfectly shares hero background and sticky behavior */}
        <SubNavbar
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          layoutKey={service.id}
          disabled={step !== 1 || submitted}
        />
      </section>

      {/* ── Main Content Body: Split Screen ── */}
      <main className="mx-auto max-w-7xl w-full px-6 lg:px-8 py-6 sm:py-8">
        {/* Layout: Mobile puts wizard on top, Desktop puts it on the right side */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col gap-8 lg:gap-12 max-w-4xl mx-auto"
        >

          {/* ── LEFT COLUMN: Interactive Search Wizard (Mobile Top, Desktop Left) ── */}
          <div className="w-full order-1">



            {/* Main Booking Card */}
            <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl p-6 sm:p-8">

              {/* Orphan Donation Trust Badge */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-teal-600/90 to-teal-500/90 py-1.5 px-4 text-center text-[11px] font-bold text-white tracking-wide flex items-center justify-center gap-1">
                <Heart className="h-3 w-3 fill-white text-white animate-pulse" />
                10% of profit goes directly to supporting local orphans
              </div>

              {submitted ? (
                /* Success screen */
                <div className="pb-6 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 mb-6">
                    <Check className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Request Submitted!</h3>
                  <p className="text-xs text-slate-400 mb-6">Our dedicated assistant is starting your search today.</p>

                  <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 mb-6">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500">Booking Reference ID</p>
                    <p className="text-xl font-mono font-bold text-teal-400 mt-1">{bookingRef}</p>
                    <p className="text-[11px] text-slate-400 mt-2">
                      Please keep this number. We will contact you at your phone number shortly to verify.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <a
                      href={`https://wa.me/8801920149986?text=Hi%20Be%20Happy%2C%20I%20just%20submitted%20request%20${bookingRef}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-4 text-sm transition-colors w-full shadow-lg shadow-green-900/20"
                    >
                      <MessageCircle className="h-4.5 w-4.5 fill-white text-green-600" />
                      Chat on WhatsApp Now
                    </a>
                    <button
                      onClick={handleReset}
                      className="text-xs text-slate-400 hover:text-white transition-colors underline block mx-auto py-2"
                    >
                      Configure Another Search
                    </button>
                  </div>
                </div>
              ) : (
                <div className="pb-6">
                  {/* Wizard Header */}
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">
                      {step === 1 ? tabs.find((t) => t.id === activeTab)?.label : "Contact Details"}
                    </h3>
                    <span className="text-xs text-teal-400 font-bold bg-teal-500/10 px-2 py-0.5 rounded-md">
                      Step {step} of 2
                    </span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {step === 1 ? (
                      /* ── STEP 1 FORMS ── */
                      <div className="space-y-4">

                        {/* ── APARTMENT FORM ── */}
                        {activeTab === "apartment" && (
                          <>
                            {/* Area Tags */}
                            <div>
                              <label className="block text-xs font-semibold text-slate-300 mb-2">
                                Target Neighborhoods (Select Areas) *
                              </label>
                              <div className="flex flex-wrap gap-2">
                                {areas.map((area) => {
                                  const isSelected = aptAreas.includes(area);
                                  return (
                                    <button
                                      type="button"
                                      key={area}
                                      onClick={() => toggleAptArea(area)}
                                      className={cn(
                                        "px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200",
                                        isSelected
                                          ? "bg-teal-600/20 border-teal-500 text-teal-300"
                                          : "bg-slate-800/40 border-slate-700 text-slate-400 hover:border-slate-505"
                                      )}
                                    >
                                      {area}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Budget pre-defined buttons */}
                            <div>
                              <label className="block text-xs font-semibold text-slate-300 mb-2">
                                Monthly Budget Range (BDT) *
                              </label>
                              <div className="grid grid-cols-2 gap-2">
                                {[
                                  { label: "Below ৳50K", val: "below-50" },
                                  { label: "৳50K - ৳100K", val: "50-100" },
                                  { label: "৳100K - ৳200K", val: "100-200" },
                                  { label: "Above ৳200K", val: "above-200" },
                                ].map((b) => (
                                  <button
                                    type="button"
                                    key={b.val}
                                    onClick={() => setAptBudget(b.val)}
                                    className={cn(
                                      "py-2 rounded-xl text-xs font-bold border transition-all duration-200 text-center",
                                      aptBudget === b.val
                                        ? "bg-teal-600 border-teal-500 text-white"
                                        : "bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-600"
                                    )}
                                  >
                                    {b.label}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Bed count select buttons */}
                            <div>
                              <label className="block text-xs font-semibold text-slate-300 mb-2">
                                Bedrooms Required *
                              </label>
                              <div className="grid grid-cols-4 gap-2">
                                {["1 BHK", "2 BHK", "3 BHK", "4 BHK+"].map((bed) => (
                                  <button
                                    type="button"
                                    key={bed}
                                    onClick={() => setAptBedCount(bed)}
                                    className={cn(
                                      "py-2 rounded-xl text-xs font-bold border transition-all duration-200 text-center",
                                      aptBedCount === bed
                                        ? "bg-teal-600 border-teal-500 text-white"
                                        : "bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-600"
                                    )}
                                  >
                                    {bed}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Furnishing */}
                            <div>
                              <label className="block text-xs font-semibold text-slate-300 mb-2">
                                Furnishing Type *
                              </label>
                              <div className="grid grid-cols-3 gap-2">
                                {["Furnished", "Semi-Furnished", "Unfurnished"].map((f) => (
                                  <button
                                    type="button"
                                    key={f}
                                    onClick={() => setAptFurnishing(f)}
                                    className={cn(
                                      "py-2 rounded-xl text-[10px] sm:text-xs font-bold border transition-all duration-200 text-center",
                                      aptFurnishing === f
                                        ? "bg-teal-600 border-teal-500 text-white"
                                        : "bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-600"
                                    )}
                                  >
                                    {f}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Fast track urgency toggle */}
                            <div className="flex items-center justify-between rounded-xl bg-slate-800/40 border border-slate-800 p-3 mt-2">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-amber-500" />
                                <div>
                                  <p className="text-xs font-bold text-white">Fast-Track Search</p>
                                  <p className="text-[10px] text-slate-400">Need immediate move-in &lt; 7 days</p>
                                </div>
                              </div>
                              <input
                                type="checkbox"
                                checked={aptFastTrack}
                                onChange={(e) => setAptFastTrack(e.target.checked)}
                                className="h-4 w-4 rounded border-slate-600 text-teal-600 focus:ring-teal-500 focus:ring-offset-slate-900 accent-teal-500"
                              />
                            </div>
                          </>
                        )}

                        {/* ── OFFICE FORM ── */}
                        {activeTab === "office" && (
                          <>
                            {/* Area Tags */}
                            <div>
                              <label className="block text-xs font-semibold text-slate-300 mb-2">
                                Target Neighborhoods (Select Areas) *
                              </label>
                              <div className="flex flex-wrap gap-2">
                                {areas.map((area) => {
                                  const isSelected = offAreas.includes(area);
                                  return (
                                    <button
                                      type="button"
                                      key={area}
                                      onClick={() => toggleOffArea(area)}
                                      className={cn(
                                        "px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200",
                                        isSelected
                                          ? "bg-teal-600/20 border-teal-500 text-teal-300"
                                          : "bg-slate-800/40 border-slate-700 text-slate-400 hover:border-slate-505"
                                      )}
                                    >
                                      {area}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Space Type */}
                            <div>
                              <label className="block text-xs font-semibold text-slate-300 mb-2">
                                Office Workspace Type *
                              </label>
                              <div className="grid grid-cols-2 gap-2">
                                {[
                                  "Coworking Hotdesks",
                                  "Private Dedicated Office",
                                  "Shared Team Suite",
                                  "Corporate Building",
                                ].map((type) => (
                                  <button
                                    type="button"
                                    key={type}
                                    onClick={() => setOffType(type)}
                                    className={cn(
                                      "py-2 px-1 rounded-xl text-[10px] sm:text-xs font-bold border transition-all duration-200 text-center",
                                      offType === type
                                        ? "bg-teal-600 border-teal-500 text-white"
                                        : "bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-600"
                                    )}
                                  >
                                    {type}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Team Size */}
                            <div>
                              <label className="block text-xs font-semibold text-slate-300 mb-2">
                                Number of Employees / Desks *
                              </label>
                              <div className="grid grid-cols-4 gap-2">
                                {["1-5", "6-15", "16-50", "50+"].map((size) => (
                                  <button
                                    type="button"
                                    key={size}
                                    onClick={() => setOffTeamSize(size)}
                                    className={cn(
                                      "py-2 rounded-xl text-xs font-bold border transition-all duration-200 text-center",
                                      offTeamSize === size
                                        ? "bg-teal-600 border-teal-500 text-white"
                                        : "bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-600"
                                    )}
                                  >
                                    {size}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Budget range */}
                            <div>
                              <label className="block text-xs font-semibold text-slate-300 mb-2">
                                Monthly Office Budget Range *
                              </label>
                              <div className="grid grid-cols-3 gap-2">
                                {[
                                  { label: "Below ৳100K", val: "below-100" },
                                  { label: "৳100K - ৳250K", val: "100-250" },
                                  { label: "Above ৳250K", val: "above-250" },
                                ].map((b) => (
                                  <button
                                    type="button"
                                    key={b.val}
                                    onClick={() => setOffBudget(b.val)}
                                    className={cn(
                                      "py-2 rounded-xl text-[10px] sm:text-xs font-bold border transition-all duration-200 text-center",
                                      offBudget === b.val
                                        ? "bg-teal-600 border-teal-500 text-white"
                                        : "bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-600"
                                    )}
                                  >
                                    {b.label}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Fast track toggle */}
                            <div className="flex items-center justify-between rounded-xl bg-slate-800/40 border border-slate-800 p-3 mt-2">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-amber-500" />
                                <div>
                                  <p className="text-xs font-bold text-white">Fast-Track Search</p>
                                  <p className="text-[10px] text-slate-400">Need workspace immediate &lt; 7 days</p>
                                </div>
                              </div>
                              <input
                                type="checkbox"
                                checked={offFastTrack}
                                onChange={(e) => setOffFastTrack(e.target.checked)}
                                className="h-4 w-4 rounded border-slate-600 text-teal-600 focus:ring-teal-500 focus:ring-offset-slate-900 accent-teal-500"
                              />
                            </div>
                          </>
                        )}

                        {/* ── RELOCATION FORM ── */}
                        {activeTab === "relocation" && (
                          <>
                            {/* Relocation Move From/To */}
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-2">
                                  Current City / Country *
                                </label>
                                <input
                                  type="text"
                                  value={relFrom}
                                  onChange={(e) => setRelFrom(e.target.value)}
                                  className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                                  placeholder="e.g. London, UK"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-2">
                                  Target Area in Dhaka *
                                </label>
                                <input
                                  type="text"
                                  value={relTo}
                                  onChange={(e) => setRelTo(e.target.value)}
                                  className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                                  placeholder="e.g. Gulshan-2"
                                />
                              </div>
                            </div>

                            {/* Move Date */}
                            <div>
                              <label className="block text-xs font-semibold text-slate-300 mb-2">
                                Intended Move Date *
                              </label>
                              <input
                                type="date"
                                value={relDate}
                                min={new Date().toISOString().split("T")[0]}
                                onChange={(e) => setRelDate(e.target.value)}
                                className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-3.5 py-2 text-xs text-white focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 [color-scheme:dark]"
                              />
                            </div>

                            {/* Scale of Move */}
                            <div>
                              <label className="block text-xs font-semibold text-slate-300 mb-2">
                                Size / Scale of Move *
                              </label>
                              <div className="grid grid-cols-2 gap-2">
                                {[
                                  "Single Room / Studio",
                                  "2-3 Bedroom Apartment",
                                  "4+ Bedroom Villa",
                                  "Corporate Office Space",
                                ].map((scale) => (
                                  <button
                                    type="button"
                                    key={scale}
                                    onClick={() => setRelScale(scale)}
                                    className={cn(
                                      "py-2 px-1 rounded-xl text-[10px] sm:text-xs font-bold border transition-all duration-200 text-center",
                                      relScale === scale
                                        ? "bg-teal-600 border-teal-500 text-white"
                                        : "bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-600"
                                    )}
                                  >
                                    {scale}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Addon checkboxes */}
                            <div>
                              <label className="block text-xs font-semibold text-slate-300 mb-2">
                                Additional Relocation Add-ons
                              </label>
                              <div className="space-y-2">
                                {[
                                  "Airport Pickup & Relocation Vehicle",
                                  "AC Uninstall & Re-install / Electrical Setup",
                                  "Internet / Utility Setup Support",
                                  "House cleaning and painting before move-in",
                                ].map((addon) => {
                                  const isSelected = relAddons.includes(addon);
                                  return (
                                    <label
                                      key={addon}
                                      className={cn(
                                        "flex cursor-pointer items-center gap-3 rounded-lg border p-2.5 transition-all text-[11px]",
                                        isSelected
                                          ? "border-teal-500 bg-teal-500/10"
                                          : "border-slate-800 bg-slate-850 hover:bg-slate-800/40"
                                      )}
                                    >
                                      <div
                                        className={cn(
                                          "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                                          isSelected ? "border-teal-500 bg-teal-500" : "border-slate-600"
                                        )}
                                      >
                                        {isSelected && <Check className="h-3 w-3 text-white" />}
                                      </div>
                                      <input
                                        type="checkbox"
                                        className="sr-only"
                                        checked={isSelected}
                                        onChange={() => toggleRelAddon(addon)}
                                      />
                                      <span className={cn("font-medium", isSelected ? "text-teal-200" : "text-slate-400")}>
                                        {addon}
                                      </span>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Fast track toggle */}
                            <div className="flex items-center justify-between rounded-xl bg-slate-800/40 border border-slate-800 p-3 mt-2">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-amber-500" />
                                <div>
                                  <p className="text-xs font-bold text-white">Fast-Track Relocation</p>
                                  <p className="text-[10px] text-slate-400">Need move completed &lt; 7 days</p>
                                </div>
                              </div>
                              <input
                                type="checkbox"
                                checked={relFastTrack}
                                onChange={(e) => setRelFastTrack(e.target.checked)}
                                className="h-4 w-4 rounded border-slate-600 text-teal-600 focus:ring-teal-500 focus:ring-offset-slate-900 accent-teal-500"
                              />
                            </div>
                          </>
                        )}

                        {/* Step 1 Actions */}
                        <div className="pt-4 flex justify-end">
                          <button
                            type="button"
                            disabled={!isStep1Valid}
                            onClick={() => setStep(2)}
                            className="flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white transition-all hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Provide Contact Details <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* ── STEP 2 FORM ── */
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="name" className="mb-1.5 block text-xs font-semibold text-slate-300">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                            placeholder="Your Full Name"
                          />
                        </div>

                        <div>
                          <label htmlFor="phone" className="mb-1.5 block text-xs font-semibold text-slate-300">
                            Phone / WhatsApp Number *
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                            placeholder="+880 1XX XXX XXXX"
                          />
                        </div>

                        <div>
                          <label htmlFor="notes" className="mb-1.5 block text-xs font-semibold text-slate-300">
                            Additional Search Requirements (Optional)
                          </label>
                          <textarea
                            id="notes"
                            rows={3}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 resize-none"
                            placeholder="e.g. Near park, gym access, backup generator, high floor, etc."
                          />
                        </div>

                        {/* Step 2 Actions */}
                        <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                          >
                            <ChevronLeft className="h-4 w-4" /> Edit Parameters
                          </button>
                          <button
                            type="submit"
                            disabled={!isStep2Valid}
                            className="rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white transition-all hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-50 shadow-[0_0_20px_rgba(20,184,166,0.2)]"
                          >
                            Submit Search Request
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              )}
            </div>

            {/* Quick Contact Row */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <a
                href="https://wa.me/8801920149986"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-green-600 py-3 text-xs font-bold text-white hover:bg-green-500 transition-colors shadow-sm shadow-green-900/20"
              >
                <MessageCircle className="h-4 w-4 text-white fill-white" />
                WhatsApp Us
              </a>
              <a
                href="tel:+8801920149986"
                className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-xs font-bold text-white hover:bg-slate-800 transition-colors shadow-sm shadow-slate-900/20"
              >
                <Phone className="h-4 w-4 text-white fill-white" />
                Call Support
              </a>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Detailed Content Sections ── */}
          <div className="w-full order-2 space-y-12">

            {/* How Relocation Works */}
            <FeaturesSection
              title="How Relocation Works"
              subtitle="Simple Process"
              description=""
              layout="grid"
              items={[
                { step: 1, title: "Share Your Requirements", desc: "Tell us your preferences, budget, and move-in date." },
                { step: 2, title: "We Curate Options", desc: "We handpick verified properties matching your needs." },
                { step: 3, title: "Guided Viewing", desc: "We arrange accompanied physical or virtual tours." },
                { step: 4, title: "Sign & Settle In", desc: "We handle the paperwork for a seamless move-in." },
              ]}
            />

            {/* Premium Space Previews Grid */}
            <GallerySection
              title="Featured Premium Listings"
              subtitle="Verified Spaces"
              description="A glimpse of handpicked rental properties and co-working environments."
              items={[
                {
                  title: "Luxury 3-BHK Apartment",
                  area: "Gulshan-2, Dhaka",
                  price: "৳120,000 / mo",
                  img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&q=80",
                  subtitle: "Vetted Listing",
                },
                {
                  title: "Modern Premium Co-working",
                  area: "Banani, Dhaka",
                  price: "৳15,000 / seat",
                  img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80",
                  subtitle: "Vetted Listing",
                },
                {
                  title: "Elegant 2-BHK Flat",
                  area: "Dhanmondi, Dhaka",
                  price: "৳65,000 / mo",
                  img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&q=80",
                  subtitle: "Vetted Listing",
                },
                {
                  title: "Vast Corporate Bare Office",
                  area: "Tejgaon, Dhaka",
                  price: "৳250,000 / mo",
                  img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80",
                  subtitle: "Vetted Listing",
                },
              ]}
            />

            {/* Testimonials */}
            <TestimonialsSection
              testimonials={service.testimonials}
              subtitle="Expats & Corporations"
              title="What Relocated Clients Say"
            />

            {/* FAQ Accordion */}
            <FAQSection
              faqs={service.faqs}
              subtitle="Knowledge Base"
              title="Accommodation FAQ"
            />
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
