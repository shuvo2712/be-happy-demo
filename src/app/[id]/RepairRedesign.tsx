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
  Clock,
  Upload,
  X,
  Thermometer,
  Wind,
  Tv,
  Zap,
  MapPin,
  Calendar,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { iconMap, type ServiceType } from "@/lib/servicesData";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import { cn } from "@/lib/utils";

interface RepairRedesignProps {
  service: ServiceType;
}

type TabType = "fridge" | "ac" | "tv" | "general";

const tabs: { id: TabType; label: string; shortLabel: string; icon: React.ElementType }[] = [
  { id: "fridge", label: "Refrigerator Servicing", shortLabel: "Fridge", icon: Thermometer },
  { id: "ac", label: "AC Servicing", shortLabel: "A/C", icon: Wind },
  { id: "tv", label: "Television Repair", shortLabel: "TV", icon: Tv },
  { id: "general", label: "Home Electronics", shortLabel: "General", icon: Zap },
];

interface UploadedFile {
  name: string;
  size: number;
  previewUrl?: string;
}

export default function RepairRedesign({ service }: RepairRedesignProps) {
  const [activeTab, setActiveTab] = useState<TabType>("fridge");
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  // Contact (step 2)
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");

  // File upload (shared)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fridge fields
  const [fridgeBrand, setFridgeBrand] = useState("");
  const [fridgeIssues, setFridgeIssues] = useState<string[]>([]);
  const [fridgeAge, setFridgeAge] = useState("");

  // AC fields
  const [acBrand, setAcBrand] = useState("");
  const [acTons, setAcTons] = useState("");
  const [acIssues, setAcIssues] = useState<string[]>([]);
  const [acLastService, setAcLastService] = useState("");

  // TV fields
  const [tvBrand, setTvBrand] = useState("");
  const [tvSize, setTvSize] = useState("");
  const [tvIssues, setTvIssues] = useState<string[]>([]);

  // General fields
  const [genItem, setGenItem] = useState<string[]>([]);
  const [genIssue, setGenIssue] = useState("");
  const [genBrand, setGenBrand] = useState("");

  const toggleArr = (setter: React.Dispatch<React.SetStateAction<string[]>>) => (val: string) =>
    setter((p) => (p.includes(val) ? p.filter((x) => x !== val) : [...p, val]));

  const today = new Date().toISOString().split("T")[0];

  const isStep1Valid: Record<TabType, boolean> = {
    fridge: fridgeIssues.length > 0 && !!fridgeAge,
    ac: acIssues.length > 0 && !!acTons && !!acLastService,
    tv: tvIssues.length > 0 && !!tvSize,
    general: genItem.length > 0 && genIssue.trim() !== "",
  };
  const isStep2Valid =
    name.trim() !== "" && phone.trim() !== "" && address.trim() !== "" && !!preferredDate && !!preferredTime;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prefix = activeTab === "fridge" ? "FRG" : activeTab === "ac" ? "ACU" : activeTab === "tv" ? "TVR" : "GEN";
    setBookingRef(`BH-${prefix}-${Math.floor(10000 + Math.random() * 90000)}`);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false); setStep(1);
    setName(""); setPhone(""); setAddress(""); setPreferredDate(""); setPreferredTime("");
    setUploadedFiles([]);
    setFridgeBrand(""); setFridgeIssues([]); setFridgeAge("");
    setAcBrand(""); setAcTons(""); setAcIssues([]); setAcLastService("");
    setTvBrand(""); setTvSize(""); setTvIssues([]);
    setGenItem([]); setGenIssue(""); setGenBrand("");
  };

  // File handling
  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newFiles: UploadedFile[] = Array.from(files)
      .slice(0, 4 - uploadedFiles.length)
      .map((file) => ({
        name: file.name,
        size: file.size,
        previewUrl: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
      }));
    setUploadedFiles((prev) => [...prev, ...newFiles].slice(0, 4));
  };
  const removeFile = (i: number) => setUploadedFiles((p) => p.filter((_, idx) => idx !== i));
  const formatSize = (b: number) => b < 1048576 ? `${(b / 1024).toFixed(0)} KB` : `${(b / 1048576).toFixed(1)} MB`;

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial((a) => (a + 1) % service.testimonials.length), 4500);
    return () => clearInterval(t);
  }, [service.testimonials.length]);

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

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-slate-950 pt-28 pb-8 overflow-hidden">
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
            <div className="hidden md:flex h-14 w-14 sm:h-20 sm:w-20 md:h-24 md:w-24 shrink-0 items-center justify-center rounded-2xl sm:rounded-3xl bg-teal-500/10 text-teal-400 border border-teal-500/30 shadow-[0_0_40px_rgba(20,184,166,0.2)]">
              <IconComponent className="h-7 w-7 sm:h-10 sm:w-10 md:h-12 md:w-12" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                Book a Repair. Fixed Today.
              </h1>
              {/* Value Props — glassmorphism cards */}
              <div className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-3">
                <div className="flex items-start gap-2 sm:gap-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm px-3 py-2.5 sm:px-4 sm:py-3">
                  <div className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                    <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-white">30-Day Repair Warranty</p>
                    <p className="text-[10px] sm:text-xs text-slate-400 leading-relaxed mt-0.5 hidden sm:block">Same fault returns within 30 days? We fix it free.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm px-3 py-2.5 sm:px-4 sm:py-3">
                  <div className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                    <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-white">Same-Day Service</p>
                    <p className="text-[10px] sm:text-xs text-slate-400 leading-relaxed mt-0.5 hidden sm:block">Book before noon, technician dispatched same day.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Main Body */}
      <main className="mx-auto max-w-7xl w-full px-6 lg:px-8 py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col gap-8 lg:gap-12 max-w-4xl mx-auto"
        >

          {/* RIGHT — Wizard */}
          <div className="w-full order-1">



            {/* Booking Card */}
            <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl p-6 sm:p-8">
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-teal-600/90 to-teal-500/90 py-1.5 px-4 text-center text-[11px] font-bold text-white tracking-wide flex items-center justify-center gap-1">
                <Heart className="h-3 w-3 fill-white animate-pulse" />
                10% of every repair job supports local orphans in Dhaka
              </div>

              {submitted ? (
                <div className="pb-6 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 mb-5">
                    <Check className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Technician Booked!</h3>
                  <p className="text-xs text-slate-400 mb-5">Your technician will be assigned and will call to confirm the visit time.</p>
                  <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 mb-5">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500">Repair Reference</p>
                    <p className="text-xl font-mono font-bold text-teal-400 mt-1">{bookingRef}</p>
                    <p className="text-[11px] text-slate-400 mt-2">Mention this reference when the technician calls. A written quote will be provided before any work begins.</p>
                  </div>
                  <div className="space-y-3">
                    <a
                      href={`https://wa.me/8801920149986?text=Hi%20Be%20Happy%2C%20my%20repair%20booking%20ref%20is%20${bookingRef}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold py-3 text-sm transition-colors w-full"
                    >
                      <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                    </a>
                    <button onClick={handleReset} className="text-xs text-slate-400 hover:text-white underline block mx-auto py-2">
                      Book Another Repair
                    </button>
                  </div>
                </div>
              ) : (
                <div className="pb-6">
                  {/* Tabs */}
                  {step === 1 && (
                    <div className="grid grid-cols-4 gap-1 bg-slate-800/60 p-1 rounded-xl mb-6">
                      {tabs.map(({ id, shortLabel, icon: Icon }) => (
                        <button
                          key={id}
                          onClick={() => setActiveTab(id)}
                          className={cn(
                            "flex flex-col items-center gap-1.5 py-2.5 rounded-lg text-[9px] sm:text-[10px] font-bold transition-all",
                            activeTab === id ? "bg-teal-600 text-white shadow-md" : "text-slate-400 hover:text-white"
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          {shortLabel}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Step Header */}
                  <div className="mb-5 flex items-center justify-between">
                    <h3 className="text-lg font-bold">
                      {step === 1 ? tabs.find((t) => t.id === activeTab)?.label : "Appointment Details"}
                    </h3>
                    <span className="text-xs text-teal-400 font-bold bg-teal-500/10 px-2 py-0.5 rounded-md">Step {step}/2</span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {step === 1 ? (
                      <div className="space-y-4">

                        {/* ── FRIDGE ── */}
                        {activeTab === "fridge" && (
                          <>
                            <div>
                              <label className={labelCls}>Brand <span className="text-slate-500 font-normal">(Optional)</span></label>
                              <input type="text" value={fridgeBrand} onChange={(e) => setFridgeBrand(e.target.value)} className={inputCls} placeholder="e.g. Samsung, LG, Singer, Walton" />
                            </div>
                            <div>
                              <label className={labelCls}>What is the Problem? *</label>
                              <div className="flex flex-wrap gap-2">
                                {[
                                  "Not Cooling",
                                  "Making Loud Noise",
                                  "Ice Maker Broken",
                                  "Water Leaking",
                                  "Door Seal Issue",
                                  "Not Starting",
                                  "Compressor Issue",
                                  "Freezer Not Working",
                                ].map((issue) => (
                                  <button type="button" key={issue} onClick={() => toggleArr(setFridgeIssues)(issue)} className={tagBtn(fridgeIssues.includes(issue))}>{issue}</button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <label className={labelCls}>Age of Refrigerator *</label>
                              <div className="grid grid-cols-4 gap-2">
                                {["< 2 yrs", "2-5 yrs", "5-10 yrs", "10+ yrs"].map((a) => (
                                  <button type="button" key={a} onClick={() => setFridgeAge(a)} className={selBtn(fridgeAge === a)}>{a}</button>
                                ))}
                              </div>
                            </div>
                          </>
                        )}

                        {/* ── AC ── */}
                        {activeTab === "ac" && (
                          <>
                            <div>
                              <label className={labelCls}>Brand <span className="text-slate-500 font-normal">(Optional)</span></label>
                              <input type="text" value={acBrand} onChange={(e) => setAcBrand(e.target.value)} className={inputCls} placeholder="e.g. General, Midea, Gree, Daikin" />
                            </div>
                            <div>
                              <label className={labelCls}>AC Capacity *</label>
                              <div className="grid grid-cols-4 gap-2">
                                {["1 Ton", "1.5 Ton", "2 Ton", "2.5+ Ton"].map((t) => (
                                  <button type="button" key={t} onClick={() => setAcTons(t)} className={selBtn(acTons === t)}>{t}</button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <label className={labelCls}>What is the Problem? *</label>
                              <div className="flex flex-wrap gap-2">
                                {[
                                  "Not Cooling",
                                  "Water Leaking",
                                  "Making Noise",
                                  "Not Starting",
                                  "Remote Not Working",
                                  "Bad Smell / Gas Issue",
                                  "Routine Servicing",
                                  "Installation / Removal",
                                ].map((issue) => (
                                  <button type="button" key={issue} onClick={() => toggleArr(setAcIssues)(issue)} className={tagBtn(acIssues.includes(issue))}>{issue}</button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <label className={labelCls}>Last Service Date *</label>
                              <div className="grid grid-cols-2 gap-2">
                                {["Never / Unknown", "Over 1 Year Ago", "6-12 Months Ago", "Under 6 Months"].map((l) => (
                                  <button type="button" key={l} onClick={() => setAcLastService(l)} className={selBtn(acLastService === l)}>{l}</button>
                                ))}
                              </div>
                            </div>
                          </>
                        )}

                        {/* ── TV ── */}
                        {activeTab === "tv" && (
                          <>
                            <div>
                              <label className={labelCls}>Brand <span className="text-slate-500 font-normal">(Optional)</span></label>
                              <input type="text" value={tvBrand} onChange={(e) => setTvBrand(e.target.value)} className={inputCls} placeholder="e.g. Samsung, Sony, LG, Walton" />
                            </div>
                            <div>
                              <label className={labelCls}>TV Screen Size *</label>
                              <div className="grid grid-cols-4 gap-2">
                                {["24-32\"", "40-43\"", "49-55\"", "65\"+"].map((s) => (
                                  <button type="button" key={s} onClick={() => setTvSize(s)} className={selBtn(tvSize === s)}>{s}</button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <label className={labelCls}>What is the Problem? *</label>
                              <div className="flex flex-wrap gap-2">
                                {[
                                  "No Picture / Black Screen",
                                  "No Sound",
                                  "Cracked Screen",
                                  "Lines on Display",
                                  "Remote Not Working",
                                  "Not Turning On",
                                  "HDMI / Port Issue",
                                  "Smart TV / Software Issue",
                                ].map((issue) => (
                                  <button type="button" key={issue} onClick={() => toggleArr(setTvIssues)(issue)} className={tagBtn(tvIssues.includes(issue))}>{issue}</button>
                                ))}
                              </div>
                            </div>
                          </>
                        )}

                        {/* ── GENERAL ELECTRONICS ── */}
                        {activeTab === "general" && (
                          <>
                            <div>
                              <label className={labelCls}>What Device Needs Repair? *</label>
                              <div className="flex flex-wrap gap-2">
                                {[
                                  "Washing Machine",
                                  "Microwave Oven",
                                  "Electric Oven",
                                  "Water Heater",
                                  "Laptop / Computer",
                                  "Printer / Scanner",
                                  "UPS / IPS",
                                  "Generator",
                                  "Water Pump",
                                  "Fan / Exhaust Fan",
                                ].map((item) => (
                                  <button type="button" key={item} onClick={() => toggleArr(setGenItem)(item)} className={tagBtn(genItem.includes(item))}>{item}</button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <label className={labelCls}>Brand <span className="text-slate-500 font-normal">(Optional)</span></label>
                              <input type="text" value={genBrand} onChange={(e) => setGenBrand(e.target.value)} className={inputCls} placeholder="e.g. Samsung, Philips, Walton" />
                            </div>
                            <div>
                              <label className={labelCls}>Describe the Issue *</label>
                              <textarea
                                value={genIssue}
                                onChange={(e) => setGenIssue(e.target.value)}
                                rows={3}
                                className={inputCls + " resize-none"}
                                placeholder="e.g. Washing machine drum not spinning, makes grinding noise when turned on..."
                              />
                            </div>
                          </>
                        )}

                        {/* Photo Upload */}
                        <div>
                          <label className={labelCls}>
                            Upload Photos / Video <span className="text-slate-500 font-normal">(Optional — speeds up diagnosis)</span>
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
                            <p className="text-[10px] text-slate-500">Up to 4 photos, JPG / PNG</p>
                            <input ref={fileInputRef} type="file" accept="image/*" multiple className="sr-only" onChange={(e) => handleFiles(e.target.files)} />
                          </div>
                          {uploadedFiles.length > 0 && (
                            <div className="mt-2 grid grid-cols-4 gap-1.5">
                              {uploadedFiles.map((file, i) => (
                                <div key={i} className="relative group rounded-lg overflow-hidden border border-slate-700 bg-slate-800/50">
                                  {file.previewUrl ? (
                                    <img src={file.previewUrl} alt={file.name} className="w-full h-14 object-cover" />
                                  ) : (
                                    <div className="w-full h-14 flex items-center justify-center bg-slate-800">
                                      <Upload className="h-4 w-4 text-slate-500" />
                                    </div>
                                  )}
                                  <p className="text-[8px] text-slate-400 truncate px-1 py-0.5">{formatSize(file.size)}</p>
                                  <button type="button" onClick={() => removeFile(i)}
                                    className="absolute top-0.5 right-0.5 rounded-full bg-black/60 p-0.5 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                    <X className="h-2.5 w-2.5" />
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
                            Schedule Appointment <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Step 2 — Appointment */
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
                          <label htmlFor="address" className={labelCls}>
                            <MapPin className="inline h-3.5 w-3.5 mr-1 text-slate-400" />
                            Home / Office Address *
                          </label>
                          <input id="address" type="text" required value={address} onChange={(e) => setAddress(e.target.value)} className={inputCls} placeholder="e.g. Apt 4B, Road 11, Banani, Dhaka" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label htmlFor="pref-date" className={labelCls}>
                              <Calendar className="inline h-3.5 w-3.5 mr-1 text-slate-400" />
                              Preferred Date *
                            </label>
                            <input id="pref-date" type="date" min={today} value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} className={inputCls + " [color-scheme:dark]"} />
                          </div>
                          <div>
                            <label htmlFor="pref-time" className={labelCls}>
                              <Clock className="inline h-3.5 w-3.5 mr-1 text-slate-400" />
                              Preferred Time *
                            </label>
                            <select id="pref-time" value={preferredTime} onChange={(e) => setPreferredTime(e.target.value)} className={inputCls}>
                              <option value="" className="bg-slate-800">Select time</option>
                              {["Morning (8–12 PM)", "Afternoon (12–5 PM)", "Evening (5–8 PM)", "Flexible / Any Time"].map((t) => (
                                <option key={t} value={t} className="bg-slate-800">{t}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Warranty reminder */}
                        <div className="rounded-xl bg-slate-800/40 border border-slate-800 p-3 flex items-start gap-3">
                          <ShieldCheck className="h-4 w-4 text-teal-400 mt-0.5 shrink-0" />
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            <span className="text-white font-semibold">30-day repair warranty</span> on all work. Our technician will diagnose first and give you a written quote before starting any repair.
                          </p>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                          <button type="button" onClick={() => setStep(1)} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
                            <ChevronLeft className="h-4 w-4" /> Edit Issue
                          </button>
                          <button type="submit" disabled={!isStep2Valid} className="rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white transition-all hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-50 shadow-[0_0_20px_rgba(20,184,166,0.2)]">
                            Confirm Booking
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
          </div>

          {/* LEFT — Trust, Gallery, Testimonials, FAQ */}
          <div className="w-full order-2 space-y-12">


            {/* How It Works */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-teal-600 mb-1">Simple Process</h3>
                <h2 className="text-2xl font-extrabold text-slate-900">How Repair Booking Works</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { step: 1, title: "Describe the Issue", desc: "Tell us what's broken and optionally upload photos. Our team can prepare the right tools in advance." },
                  { step: 2, title: "Technician is Dispatched", desc: "A certified technician is assigned and calls to confirm before arriving at your location." },
                  { step: 3, title: "Free Diagnosis & Quote", desc: "The technician inspects the appliance and gives you a transparent written quote — no hidden fees." },
                  { step: 4, title: "Fixed with Warranty", desc: "Repair is completed using genuine parts. All work is backed by a 30-day return guarantee." },
                ].map((s) => (
                  <div key={s.step} className="flex gap-4 rounded-2xl bg-white border border-slate-100 p-5 shadow-sm">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-teal-500 text-white font-extrabold text-base flex items-center justify-center shadow-[0_0_15px_rgba(20,184,166,0.25)]">
                      {s.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-0.5">{s.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Gallery */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-teal-600 mb-1">Appliance Services</h3>
                <h2 className="text-2xl font-extrabold text-slate-900">What We Repair</h2>
                <p className="text-xs text-slate-500">Certified technicians covering all major home and office appliances.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Air Conditioner Servicing", area: "All Brands, All Capacities", img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&q=80" },
                  { title: "Refrigerator & Fridge Repair", area: "Gas Refill, Compressor & More", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&q=80" },
                  { title: "Television & Display Repair", area: "Smart TV, LED, OLED", img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80" },
                  { title: "Home Electronics Maintenance", area: "Washing Machines, Ovens & More", img: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&q=80" },
                ].map((item, idx) => (
                  <div key={idx} className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative">
                      <img src={item.img} alt={item.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      <span className="absolute bottom-2 left-2 rounded-lg bg-slate-900/80 backdrop-blur-sm text-[10px] font-bold text-white px-2 py-1">{item.area}</span>
                    </div>
                    <div className="p-4">
                      <h4 className="text-xs font-bold text-slate-800">{item.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">30-Day Warranty Included</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider text-teal-400">Homeowners & Offices</span>
              <h3 className="text-xl font-bold mt-1 mb-6">What Clients Say</h3>
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
                    {Array.from({ length: service.testimonials[activeTestimonial].rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <blockquote className="text-sm text-slate-300 italic leading-relaxed">
                    &ldquo;{service.testimonials[activeTestimonial].quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="h-9 w-9 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 font-bold text-sm">
                      {service.testimonials[activeTestimonial].name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold">{service.testimonials[activeTestimonial].name}</p>
                      <p className="text-[10px] text-slate-500">{service.testimonials[activeTestimonial].location}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* FAQ */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-teal-600 mb-1">Common Questions</h3>
                <h2 className="text-2xl font-extrabold text-slate-900">Repair & Maintenance FAQ</h2>
              </div>
              <div className="space-y-2">
                {service.faqs.map((faq, idx) => {
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
                          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden border-t border-slate-100">
                            <p className="px-5 py-3 text-xs text-slate-600 leading-relaxed bg-slate-50/50">{faq.answer}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
