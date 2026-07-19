"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Star,
  ChevronDown,
  Phone,
  MessageCircle,
  Heart,
  Check,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sofa,
  Tv,
  Car,
  Upload,
  X,
  Clock,
  BadgeDollarSign,
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
import { useScrolled } from "@/hooks/useScrolled";
import { useIsMobile } from "@/hooks/useIsMobile";

interface BuyingPageProps {
  service: ServiceType;
}

type TabType = "furniture" | "electronics" | "car";

const tabs: { id: TabType; label: string; shortLabel: string; icon: React.ElementType }[] = [
  { id: "furniture", label: "Used Furniture", shortLabel: "Furniture", icon: Sofa },
  { id: "electronics", label: "Used Electronics", shortLabel: "Electronics", icon: Tv },
  { id: "car", label: "Used Car", shortLabel: "Car", icon: Car },
];

interface UploadedFile {
  name: string;
  size: number;
  previewUrl?: string;
}

export default function BuyingPage({ service }: BuyingPageProps) {
  const [activeTab, setActiveTab] = useState<TabType>("furniture");
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  // Contact (step 2)
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  // File upload state (shared across tabs)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Furniture fields
  const [furnItems, setFurnItems] = useState<string[]>([]);
  const [furnCondition, setFurnCondition] = useState("");
  const [furnQuantity, setFurnQuantity] = useState("");

  // Electronics fields
  const [elecItems, setElecItems] = useState<string[]>([]);
  const [elecCondition, setElecCondition] = useState("");
  const [elecBrand, setElecBrand] = useState("");
  const [elecAge, setElecAge] = useState("");

  // Car fields
  const [carBrand, setCarBrand] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carYear, setCarYear] = useState("");
  const [carCondition, setCarCondition] = useState("");
  const [carMileage, setCarMileage] = useState("");

  const toggleFurnItem = (i: string) =>
    setFurnItems((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));
  const toggleElecItem = (i: string) =>
    setElecItems((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));

  const today = new Date().toISOString().split("T")[0];

  const isStep1Valid: Record<TabType, boolean> = {
    furniture: furnItems.length > 0 && !!furnCondition && !!furnQuantity,
    electronics: elecItems.length > 0 && !!elecCondition && !!elecAge,
    car: carBrand.trim() !== "" && carModel.trim() !== "" && !!carYear && !!carCondition && carMileage.trim() !== "",
  };
  const isStep2Valid = name.trim() !== "" && phone.trim() !== "" && address.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prefix = activeTab === "furniture" ? "FRN" : activeTab === "electronics" ? "ELC" : "CAR";
    setBookingRef(`BH-${prefix}-${Math.floor(10000 + Math.random() * 90000)}`);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false); setStep(1);
    setName(""); setPhone(""); setAddress(""); setNotes("");
    setUploadedFiles([]);
    setFurnItems([]); setFurnCondition(""); setFurnQuantity("");
    setElecItems([]); setElecCondition(""); setElecBrand(""); setElecAge("");
    setCarBrand(""); setCarModel(""); setCarYear(""); setCarCondition(""); setCarMileage("");
  };

  // File handling
  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newFiles: UploadedFile[] = Array.from(files)
      .slice(0, 5 - uploadedFiles.length)
      .map((file) => ({
        name: file.name,
        size: file.size,
        previewUrl: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
      }));
    setUploadedFiles((prev) => [...prev, ...newFiles].slice(0, 5));
  };
  const removeFile = (i: number) => setUploadedFiles((p) => p.filter((_, idx) => idx !== i));
  const formatSize = (b: number) => b < 1048576 ? `${(b / 1024).toFixed(0)} KB` : `${(b / 1048576).toFixed(1)} MB`;

  // Removed local faq state

  // Style helpers
  const selBtn = (active: boolean) =>
    cn(
      "py-2 px-1 rounded-xl text-[10px] sm:text-xs font-bold border transition-all duration-200 text-center",
      active ? "bg-teal-600 border-teal-500 text-white" : "bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-600"
    );
  const tagBtn = (active: boolean) =>
    cn(
      "px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200",
      active ? "bg-teal-600/20 border-teal-500 text-teal-300" : "bg-slate-800/40 border-slate-700 text-slate-400 hover:border-slate-500"
    );
  const inputCls = "w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-colors";
  const labelCls = "block text-xs font-semibold text-slate-300 mb-1.5";
  const IconComponent = iconMap[service.iconName as keyof typeof iconMap];

  const heroScrolled = useScrolled(50);
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero and SubNavbar Unified Sticky Header */}
      <section className="sticky top-0 z-40 relative bg-slate-950 pt-28 pb-4 overflow-hidden shadow-[0_8px_30px_rgba(20,184,166,0.15)] border-b border-teal-500/50">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${service.heroImage})` }} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(20,184,166,0.1),transparent_60%)]" />
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto max-w-7xl px-6 lg:px-8"
        >
          <div className="flex flex-row items-center gap-4 sm:gap-6 md:gap-8">
            {/* Desktop service icon — shrinks when scrolled */}
            <motion.div
              initial={{ width: "6rem", height: "6rem" }}
              animate={heroScrolled
                ? { width: "3.5rem", height: "3.5rem" }
                : { width: "6rem", height: "6rem" }
              }
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="hidden md:flex shrink-0 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/30 shadow-[0_0_40px_rgba(20,184,166,0.2)]"
            >
              <motion.div
                initial={{ width: "3rem", height: "3rem" }}
                animate={heroScrolled
                  ? { width: "1.75rem", height: "1.75rem" }
                  : { width: "3rem", height: "3rem" }
                }
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <IconComponent className="w-full h-full" />
              </motion.div>
            </motion.div>
            <div className="flex-1">
              <motion.h1
                initial={isMobile ? { fontSize: "1.875rem", lineHeight: "2.25rem" } : { fontSize: "3rem", lineHeight: "1" }}
                animate={isMobile && heroScrolled
                  ? { fontSize: "1.125rem", lineHeight: "1.75rem" }
                  : (isMobile ? { fontSize: "1.875rem", lineHeight: "2.25rem" } : { fontSize: "3rem", lineHeight: "1" })
                }
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="font-extrabold tracking-tight text-white sm:text-5xl"
              >
                Sell Your Used Items Fast
              </motion.h1>
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

      {/* Main */}
      <main className="mx-auto max-w-7xl w-full px-6 lg:px-8 py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col gap-8 lg:gap-12 max-w-4xl mx-auto"
        >

          {/* RIGHT — Wizard */}
          <div className="w-full order-1">



            {/* Main Card */}
            <div id="booking-form" className="scroll-mt-44 sm:scroll-mt-48 relative overflow-hidden rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl pt-12 pb-6 px-6 sm:pt-14 sm:pb-8 sm:px-8">
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-teal-600/90 to-teal-500/90 py-1.5 px-4 text-center text-[11px] font-bold text-white tracking-wide flex items-center justify-center gap-1">
                <Heart className="h-3 w-3 fill-white animate-pulse" />
                10% of every deal supports local orphans in Dhaka
              </div>

              {submitted ? (
                <div className="pb-6 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 mb-5">
                    <Check className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Evaluation Request Sent!</h3>
                  <p className="text-xs text-slate-400 mb-5">Our evaluator will contact you to schedule a free home visit within 24 hours.</p>
                  <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 mb-5">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500">Evaluation Reference</p>
                    <p className="text-xl font-mono font-bold text-teal-400 mt-1">{bookingRef}</p>
                    <p className="text-[11px] text-slate-400 mt-2">Keep this ID. Our team will call you at the number provided to confirm the visit time.</p>
                  </div>
                  <div className="space-y-3">
                    <a
                      href={`https://wa.me/8801920149986?text=Hi%20Be%20Happy%2C%20I%20submitted%20a%20sell%20request.%20My%20ref%20is%20${bookingRef}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold py-3 text-sm transition-colors w-full"
                    >
                      <MessageCircle className="h-4 w-4" /> Follow Up on WhatsApp
                    </a>
                    <button onClick={handleReset} className="text-xs text-slate-400 hover:text-white underline block mx-auto py-2">
                      Submit Another Item
                    </button>
                  </div>
                </div>
              ) : (
                <div className="pb-6">
                  {/* Step Header */}
                  <div className="mb-5 flex items-center justify-between">
                    <h3 className="text-lg font-bold">
                      {step === 1 ? `Sell Your ${tabs.find((t) => t.id === activeTab)?.label}` : "Your Contact & Location"}
                    </h3>
                    <span className="text-xs text-teal-400 font-bold bg-teal-500/10 px-2 py-0.5 rounded-md">Step {step}/2</span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {step === 1 ? (
                      <div className="space-y-4">

                        {/* ── FURNITURE ── */}
                        {activeTab === "furniture" && (
                          <>
                            <div>
                              <label className={labelCls}>What Furniture Are You Selling? *</label>
                              <div className="flex flex-wrap gap-2">
                                {["Sofa / Couch", "Dining Table", "Bed Frame", "Wardrobe", "Study Desk", "Chairs", "Bookshelf", "TV Stand", "Fridge", "Washing Machine"].map((i) => (
                                  <button type="button" key={i} onClick={() => toggleFurnItem(i)} className={tagBtn(furnItems.includes(i))}>{i}</button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <label className={labelCls}>Overall Condition *</label>
                              <div className="grid grid-cols-2 gap-2">
                                {["Like New", "Good", "Fair / Used", "Needs Repair"].map((c) => (
                                  <button type="button" key={c} onClick={() => setFurnCondition(c)} className={selBtn(furnCondition === c)}>{c}</button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <label className={labelCls}>Number of Items *</label>
                              <div className="grid grid-cols-4 gap-2">
                                {["1", "2-5", "6-10", "10+"].map((q) => (
                                  <button type="button" key={q} onClick={() => setFurnQuantity(q)} className={selBtn(furnQuantity === q)}>{q}</button>
                                ))}
                              </div>
                            </div>
                          </>
                        )}

                        {/* ── ELECTRONICS ── */}
                        {activeTab === "electronics" && (
                          <>
                            <div>
                              <label className={labelCls}>What Electronics Are You Selling? *</label>
                              <div className="flex flex-wrap gap-2">
                                {["Laptop", "Desktop PC", "Television", "Air Conditioner", "Refrigerator", "Washing Machine", "Microwave", "Phone / Tablet", "Camera", "Printer"].map((i) => (
                                  <button type="button" key={i} onClick={() => toggleElecItem(i)} className={tagBtn(elecItems.includes(i))}>{i}</button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <label className={labelCls}>Brand (if applicable)</label>
                              <input type="text" value={elecBrand} onChange={(e) => setElecBrand(e.target.value)} className={inputCls} placeholder="e.g. Samsung, Sony, Dell, LG" />
                            </div>
                            <div>
                              <label className={labelCls}>Overall Condition *</label>
                              <div className="grid grid-cols-2 gap-2">
                                {["Like New", "Good", "Fair / Working", "Faulty / Parts"].map((c) => (
                                  <button type="button" key={c} onClick={() => setElecCondition(c)} className={selBtn(elecCondition === c)}>{c}</button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <label className={labelCls}>Age of Item(s) *</label>
                              <div className="grid grid-cols-4 gap-2">
                                {["< 1 yr", "1-3 yrs", "3-5 yrs", "5+ yrs"].map((a) => (
                                  <button type="button" key={a} onClick={() => setElecAge(a)} className={selBtn(elecAge === a)}>{a}</button>
                                ))}
                              </div>
                            </div>
                          </>
                        )}

                        {/* ── CAR ── */}
                        {activeTab === "car" && (
                          <>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className={labelCls}>Car Brand *</label>
                                <input type="text" value={carBrand} onChange={(e) => setCarBrand(e.target.value)} className={inputCls} placeholder="e.g. Toyota, Honda" />
                              </div>
                              <div>
                                <label className={labelCls}>Model *</label>
                                <input type="text" value={carModel} onChange={(e) => setCarModel(e.target.value)} className={inputCls} placeholder="e.g. Corolla, Civic" />
                              </div>
                            </div>
                            <div>
                              <label className={labelCls}>Year of Manufacture *</label>
                              <div className="grid grid-cols-4 gap-2">
                                {["2020+", "2015-19", "2010-14", "Before 2010"].map((y) => (
                                  <button type="button" key={y} onClick={() => setCarYear(y)} className={selBtn(carYear === y)}>{y}</button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <label className={labelCls}>Overall Condition *</label>
                              <div className="grid grid-cols-2 gap-2">
                                {["Excellent", "Good", "Average", "Needs Work"].map((c) => (
                                  <button type="button" key={c} onClick={() => setCarCondition(c)} className={selBtn(carCondition === c)}>{c}</button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <label className={labelCls}>Approx. Mileage *</label>
                              <input type="text" value={carMileage} onChange={(e) => setCarMileage(e.target.value)} className={inputCls} placeholder="e.g. 45,000 km" />
                            </div>
                          </>
                        )}

                        {/* Photo Upload — shared across all tabs */}
                        <div>
                          <label className={labelCls}>
                            Upload Photos <span className="text-slate-500 font-normal">(Optional — helps us quote faster)</span>
                          </label>
                          <div
                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files); }}
                            onClick={() => fileInputRef.current?.click()}
                            className={cn(
                              "flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed cursor-pointer p-5 transition-all",
                              isDragging ? "border-teal-400 bg-teal-500/10" : "border-slate-700 hover:border-slate-500 bg-slate-800/20"
                            )}
                          >
                            <Upload className="h-6 w-6 text-slate-500" />
                            <p className="text-xs text-slate-400 text-center">
                              <span className="font-semibold text-teal-400">Click to upload</span> or drag & drop
                            </p>
                            <p className="text-[10px] text-slate-500">Up to 5 photos, JPG / PNG / HEIC</p>
                            <input ref={fileInputRef} type="file" accept="image/*" multiple className="sr-only" onChange={(e) => handleFiles(e.target.files)} />
                          </div>

                          {uploadedFiles.length > 0 && (
                            <div className="mt-2 grid grid-cols-3 gap-2">
                              {uploadedFiles.map((file, i) => (
                                <div key={i} className="relative group rounded-lg overflow-hidden border border-slate-700 bg-slate-800/50">
                                  {file.previewUrl ? (
                                    <img src={file.previewUrl} alt={file.name} className="w-full h-16 object-cover" />
                                  ) : (
                                    <div className="w-full h-16 flex items-center justify-center bg-slate-800">
                                      <Upload className="h-5 w-5 text-slate-500" />
                                    </div>
                                  )}
                                  <p className="text-[9px] text-slate-400 truncate px-1 py-0.5">{formatSize(file.size)}</p>
                                  <button
                                    type="button"
                                    onClick={() => removeFile(i)}
                                    className="absolute top-0.5 right-0.5 rounded-full bg-black/60 p-0.5 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="pt-3 flex justify-end">
                          <button
                            type="button"
                            disabled={!isStep1Valid[activeTab]}
                            onClick={() => setStep(2)}
                            className="flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white transition-all hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Add Your Location <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Step 2 */
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="name" className={labelCls}>Full Name *</label>
                          <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className={inputCls} placeholder="Your Full Name" />
                        </div>
                        <div>
                          <label htmlFor="phone" className={labelCls}>Phone / WhatsApp *</label>
                          <input id="phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} placeholder="+880 1XX XXX XXXX" />
                        </div>
                        <div>
                          <label htmlFor="address" className={labelCls}>Home / Item Location *</label>
                          <input id="address" type="text" required value={address} onChange={(e) => setAddress(e.target.value)} className={inputCls} placeholder="e.g. Road 3, Block A, Bashundhara R/A" />
                        </div>
                        <div>
                          <label htmlFor="notes" className={labelCls}>Additional Info <span className="text-slate-500 font-normal">(Optional)</span></label>
                          <textarea id="notes" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} className={inputCls + " resize-none"} placeholder="Any extra details about the items, access instructions, preferred visit time, etc." />
                        </div>

                        {/* Trust reminder */}
                        <div className="rounded-xl bg-slate-800/40 border border-slate-800 p-3 flex items-start gap-3">
                          <Clock className="h-4 w-4 text-teal-400 mt-0.5 shrink-0" />
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            <span className="text-white font-semibold">Free home visit.</span> Our evaluator will arrive within 24 hours at your convenience. No obligation to sell — the evaluation is completely free.
                          </p>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                          <button type="button" onClick={() => setStep(1)} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
                            <ChevronLeft className="h-4 w-4" /> Edit Items
                          </button>
                          <button type="submit" disabled={!isStep2Valid} className="rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white transition-all hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-50 shadow-[0_0_20px_rgba(20,184,166,0.2)]">
                            Request Free Evaluation
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              )}
            </div>

            {/* Quick Contact */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <a href="https://wa.me/8801920149986" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-green-600 py-3 text-xs font-bold text-white hover:bg-green-500 transition-colors shadow-sm shadow-green-900/20">
                <MessageCircle className="h-4 w-4 text-white fill-white" /> WhatsApp Us
              </a>
              <a href="tel:+8801920149986"
                className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-xs font-bold text-white hover:bg-slate-800 transition-colors shadow-sm shadow-slate-900/20">
                <Phone className="h-4 w-4 text-white fill-white" /> Call Support
              </a>
            </div>

            {/* Gallery */}
            <div className="mt-8">
              <GallerySection
                title="Items We Accept"
                subtitle="What We Buy"
                description="We purchase a wide range of used items in good to fair condition."
                items={[
                  { title: "Furniture & Home Items", area: "Sofas, Tables, Wardrobes & More", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80", subtitle: "Free evaluation — no obligation" },
                  { title: "Consumer Electronics", area: "Laptops, TVs, ACs, Appliances", img: "https://images.unsplash.com/photo-1593640408182-31c228b42e0e?w=500&q=80", subtitle: "Free evaluation — no obligation" },
                  { title: "Vehicles & Cars", area: "All Brands & Conditions", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&q=80", subtitle: "Free evaluation — no obligation" },
                  { title: "Full Apartment Clearance", area: "We Buy Everything at Once", img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500&q=80", subtitle: "Free evaluation — no obligation" },
                ]}
              />
            </div>
          </div>

          {/* LEFT — Trust, Gallery, Testimonials, FAQ */}
          <div className="w-full order-2 space-y-12">
            {/* Value Propositions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              <div className="flex items-start gap-2 sm:gap-3 rounded-2xl bg-slate-100 border border-slate-200 px-3 py-2.5 sm:px-4 sm:py-3">
                <div className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-600">
                  <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-slate-900">Honest Market Valuation</p>
                  <p className="text-[10px] sm:text-xs text-slate-500 leading-relaxed mt-0.5">Fair, transparent price based on current Dhaka market data.</p>
                </div>
              </div>
              <div className="flex items-start gap-2 sm:gap-3 rounded-2xl bg-slate-100 border border-slate-200 px-3 py-2.5 sm:px-4 sm:py-3">
                <div className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-600">
                  <BadgeDollarSign className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-slate-900">Cash Paid on the Spot</p>
                  <p className="text-[10px] sm:text-xs text-slate-500 leading-relaxed mt-0.5">Agree to our offer and get paid immediately — no waiting.</p>
                </div>
              </div>
            </div>


            {/* Testimonials */}
            <TestimonialsSection
              testimonials={service.testimonials}
              subtitle="Expats & Departing Residents"
              title="What Sellers Say"
            />

            {/* How It Works */}
            <FeaturesSection
              title="How Buying Works"
              subtitle="Simple Process"
              description=""
              layout="grid"
              items={[
                { step: 1, title: "Submit Your Items", desc: "Tell us what you have and upload a few photos. Takes under 2 minutes." },
                { step: 2, title: "We Schedule a Visit", desc: "Our evaluator comes to your home — usually within 24 hours, at your convenience." },
                { step: 3, title: "Get a Fair Quote", desc: "We assess each item and give you a transparent, market-rate offer." },
                { step: 4, title: "Cash on the Spot", desc: "Accept the offer and we pay you immediately and take everything away." },
              ]}
            />

            <FAQSection
              faqs={service.faqs}
              subtitle="Common Questions"
              title="Buying Used Items FAQ"
            />
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
