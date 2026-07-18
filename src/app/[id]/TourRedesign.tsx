"use client";

import React, { useState, useEffect } from "react";
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
  Map,
  Briefcase,
  Camera,
  Users,
  Globe,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { type ServiceType } from "@/lib/servicesData";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import { cn } from "@/lib/utils";

interface TourRedesignProps {
  service: ServiceType;
}

type TabType = "hourly" | "business" | "city";

const dhakaSpots = [
  "Lalbagh Fort",
  "Ahsan Manzil",
  "Dhaka University",
  "Old Dhaka Markets",
  "Hatirjheel",
  "National Museum",
  "Sonargaon",
  "Bashundhara City",
];

const languages = ["English", "Bengali", "Arabic", "French", "Mandarin", "Hindi"];

const tabs: { id: TabType; label: string; shortLabel: string; icon: React.ElementType }[] = [
  { id: "hourly", label: "Hourly Private Guide", shortLabel: "Hourly", icon: Clock },
  { id: "business", label: "Business Visitor Assistance", shortLabel: "Business", icon: Briefcase },
  { id: "city", label: "City Tour & Experience", shortLabel: "City Tour", icon: Camera },
];

export default function TourRedesign({ service }: TourRedesignProps) {
  const [activeTab, setActiveTab] = useState<TabType>("hourly");
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  // Contact (step 2)
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  // Tab 1 — Hourly Private Guide
  const [hourlyDate, setHourlyDate] = useState("");
  const [hourlyTime, setHourlyTime] = useState("");
  const [hourlyDuration, setHourlyDuration] = useState("");
  const [hourlyGroupSize, setHourlyGroupSize] = useState("");
  const [hourlyLanguage, setHourlyLanguage] = useState("");
  const [hourlyPickup, setHourlyPickup] = useState("");

  // Tab 2 — Business Visitor
  const [bizDate, setBizDate] = useState("");
  const [bizVisitors, setBizVisitors] = useState("");
  const [bizCompany, setBizCompany] = useState("");
  const [bizPurpose, setBizPurpose] = useState("");
  const [bizAreas, setBizAreas] = useState<string[]>([]);
  const [bizLanguage, setBizLanguage] = useState("");

  // Tab 3 — City Tour
  const [cityDate, setCityDate] = useState("");
  const [cityDuration, setCityDuration] = useState("");
  const [cityGroupSize, setCityGroupSize] = useState("");
  const [citySpots, setCitySpots] = useState<string[]>([]);
  const [cityLanguage, setCityLanguage] = useState("");
  const [cityInterests, setCityInterests] = useState<string[]>([]);

  const toggleBizArea = (a: string) =>
    setBizAreas((p) => (p.includes(a) ? p.filter((x) => x !== a) : [...p, a]));
  const toggleCitySpot = (s: string) =>
    setCitySpots((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));
  const toggleCityInterest = (i: string) =>
    setCityInterests((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));

  const today = new Date().toISOString().split("T")[0];

  const isStep1Valid: Record<TabType, boolean> = {
    hourly: !!hourlyDate && !!hourlyTime && !!hourlyDuration && !!hourlyGroupSize && !!hourlyLanguage && hourlyPickup.trim() !== "",
    business: !!bizDate && !!bizVisitors && bizCompany.trim() !== "" && !!bizPurpose && !!bizLanguage,
    city: !!cityDate && !!cityDuration && !!cityGroupSize && citySpots.length > 0 && !!cityLanguage,
  };
  const isStep2Valid = name.trim() !== "" && phone.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prefix = activeTab === "hourly" ? "TOUR" : activeTab === "business" ? "BIZ" : "CITY";
    setBookingRef(`BH-${prefix}-${Math.floor(10000 + Math.random() * 90000)}`);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false); setStep(1);
    setName(""); setPhone(""); setNotes("");
    setHourlyDate(""); setHourlyTime(""); setHourlyDuration(""); setHourlyGroupSize(""); setHourlyLanguage(""); setHourlyPickup("");
    setBizDate(""); setBizVisitors(""); setBizCompany(""); setBizPurpose(""); setBizAreas([]); setBizLanguage("");
    setCityDate(""); setCityDuration(""); setCityGroupSize(""); setCitySpots([]); setCityLanguage(""); setCityInterests([]);
  };

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

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-slate-950 pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${service.heroImage})` }} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(20,184,166,0.1),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/10 px-3 py-1 text-xs font-semibold text-teal-400 ring-1 ring-inset ring-teal-500/20">
              <Map className="h-3.5 w-3.5" /> Local Expert Tour Guides — Dhaka
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Discover Dhaka Like a Local
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
              Whether you're a first-time visitor, a business delegation, or a returning Bangladeshi — our bilingual expert guides unlock the real Dhaka for you, from historic landmarks to bustling bazaars and elite business districts.
            </p>
          </div>
        </div>
      </section>

      {/* Main body */}
      <main className="mx-auto max-w-7xl w-full px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">

          {/* RIGHT — Wizard (top on mobile, right on desktop) */}
          <div className="w-full lg:w-[480px] shrink-0 order-1 lg:order-2 lg:sticky lg:top-24">

            {/* Live Status */}
            <div className="mb-4 flex items-center justify-between rounded-xl bg-white px-4 py-2.5 shadow-sm ring-1 ring-slate-100">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-xs font-semibold text-slate-700">Guides Available Today in Dhaka</span>
              </div>
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">GMT+6 Active</span>
            </div>

            {/* Booking Card */}
            <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl p-6 sm:p-8">
              {/* Donation badge */}
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-teal-600/90 to-teal-500/90 py-1.5 px-4 text-center text-[11px] font-bold text-white tracking-wide flex items-center justify-center gap-1">
                <Heart className="h-3 w-3 fill-white animate-pulse" />
                10% of every tour booking supports local orphans in Dhaka
              </div>

              {submitted ? (
                <div className="pt-6 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 mb-5">
                    <Check className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Tour Booked!</h3>
                  <p className="text-xs text-slate-400 mb-5">Your guide will be confirmed and will contact you within a few hours.</p>
                  <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 mb-5">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500">Booking Reference</p>
                    <p className="text-xl font-mono font-bold text-teal-400 mt-1">{bookingRef}</p>
                    <p className="text-[11px] text-slate-400 mt-2">Save this number. Your assigned guide will message you to confirm meeting details.</p>
                  </div>
                  <div className="space-y-3">
                    <a
                      href={`https://wa.me/8801920149986?text=Hi%20Be%20Happy%2C%20my%20tour%20booking%20ref%20is%20${bookingRef}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold py-3 text-sm transition-colors w-full"
                    >
                      <MessageCircle className="h-4 w-4" /> Chat on WhatsApp Now
                    </a>
                    <button onClick={handleReset} className="text-xs text-slate-400 hover:text-white underline block mx-auto py-2">
                      Book Another Tour
                    </button>
                  </div>
                </div>
              ) : (
                <div className="pt-6">
                  {/* Tabs */}
                  {step === 1 && (
                    <div className="flex gap-1 bg-slate-800/60 p-1 rounded-xl mb-6 overflow-x-auto">
                      {tabs.map(({ id, shortLabel, icon: Icon }) => (
                        <button
                          key={id}
                          onClick={() => setActiveTab(id)}
                          className={cn(
                            "flex flex-col items-center gap-1.5 py-2.5 px-4 rounded-lg text-[10px] font-bold transition-all whitespace-nowrap flex-1",
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
                      {step === 1 ? tabs.find((t) => t.id === activeTab)?.label : "Your Contact Details"}
                    </h3>
                    <span className="text-xs text-teal-400 font-bold bg-teal-500/10 px-2 py-0.5 rounded-md">Step {step}/2</span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {step === 1 ? (
                      <div className="space-y-4">

                        {/* ── HOURLY PRIVATE GUIDE ── */}
                        {activeTab === "hourly" && (
                          <>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className={labelCls}>Tour Date *</label>
                                <input type="date" min={today} value={hourlyDate} onChange={(e) => setHourlyDate(e.target.value)} className={inputCls + " [color-scheme:dark]"} />
                              </div>
                              <div>
                                <label className={labelCls}>Start Time *</label>
                                <select value={hourlyTime} onChange={(e) => setHourlyTime(e.target.value)} className={inputCls}>
                                  <option value="" className="bg-slate-800">Select time</option>
                                  {["7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"].map((t) => (
                                    <option key={t} value={t} className="bg-slate-800">{t}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div>
                              <label className={labelCls}>Duration *</label>
                              <div className="grid grid-cols-4 gap-2">
                                {["2 hrs", "3 hrs", "4 hrs", "6 hrs"].map((d) => (
                                  <button type="button" key={d} onClick={() => setHourlyDuration(d)} className={selBtn(hourlyDuration === d)}>{d}</button>
                                ))}
                              </div>
                            </div>

                            <div>
                              <label className={labelCls}>Group Size *</label>
                              <div className="grid grid-cols-4 gap-2">
                                {["1", "2-3", "4-6", "7+"].map((g) => (
                                  <button type="button" key={g} onClick={() => setHourlyGroupSize(g)} className={selBtn(hourlyGroupSize === g)}>{g}</button>
                                ))}
                              </div>
                            </div>

                            <div>
                              <label className={labelCls}>Guide Language *</label>
                              <div className="flex flex-wrap gap-2">
                                {languages.map((lang) => (
                                  <button type="button" key={lang} onClick={() => setHourlyLanguage(lang)} className={tagBtn(hourlyLanguage === lang)}>{lang}</button>
                                ))}
                              </div>
                            </div>

                            <div>
                              <label className={labelCls}>Pick-up Location *</label>
                              <input type="text" value={hourlyPickup} onChange={(e) => setHourlyPickup(e.target.value)} className={inputCls} placeholder="e.g. Hotel Sarina, Banani or Airport" />
                            </div>
                          </>
                        )}

                        {/* ── BUSINESS VISITOR ASSISTANCE ── */}
                        {activeTab === "business" && (
                          <>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className={labelCls}>Visit Date *</label>
                                <input type="date" min={today} value={bizDate} onChange={(e) => setBizDate(e.target.value)} className={inputCls + " [color-scheme:dark]"} />
                              </div>
                              <div>
                                <label className={labelCls}>No. of Visitors *</label>
                                <div className="grid grid-cols-2 gap-1 mt-0">
                                  {["1-2", "3-5", "6-10", "10+"].map((v) => (
                                    <button type="button" key={v} onClick={() => setBizVisitors(v)} className={selBtn(bizVisitors === v)}>{v}</button>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div>
                              <label className={labelCls}>Company / Organization Name *</label>
                              <input type="text" value={bizCompany} onChange={(e) => setBizCompany(e.target.value)} className={inputCls} placeholder="e.g. ABC Corp Ltd." />
                            </div>

                            <div>
                              <label className={labelCls}>Purpose of Visit *</label>
                              <div className="grid grid-cols-2 gap-2">
                                {["Factory Inspection", "Trade Meeting", "Conference / Event", "Investment Scouting", "NGO / Aid Work", "Media / Press Visit"].map((p) => (
                                  <button type="button" key={p} onClick={() => setBizPurpose(p)} className={selBtn(bizPurpose === p)}>{p}</button>
                                ))}
                              </div>
                            </div>

                            <div>
                              <label className={labelCls}>Business Districts to Visit</label>
                              <div className="flex flex-wrap gap-2">
                                {["Motijheel (CBD)", "Tejgaon Industrial", "Gulshan Business", "Uttara EPZ", "Narayanganj"].map((a) => (
                                  <button type="button" key={a} onClick={() => toggleBizArea(a)} className={tagBtn(bizAreas.includes(a))}>{a}</button>
                                ))}
                              </div>
                            </div>

                            <div>
                              <label className={labelCls}>Guide Language *</label>
                              <div className="flex flex-wrap gap-2">
                                {languages.map((lang) => (
                                  <button type="button" key={lang} onClick={() => setBizLanguage(lang)} className={tagBtn(bizLanguage === lang)}>{lang}</button>
                                ))}
                              </div>
                            </div>
                          </>
                        )}

                        {/* ── CITY TOUR & EXPERIENCE ── */}
                        {activeTab === "city" && (
                          <>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className={labelCls}>Tour Date *</label>
                                <input type="date" min={today} value={cityDate} onChange={(e) => setCityDate(e.target.value)} className={inputCls + " [color-scheme:dark]"} />
                              </div>
                              <div>
                                <label className={labelCls}>Duration *</label>
                                <div className="grid grid-cols-2 gap-1">
                                  {["Half Day (4h)", "Full Day (8h)"].map((d) => (
                                    <button type="button" key={d} onClick={() => setCityDuration(d)} className={selBtn(cityDuration === d)}>{d}</button>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div>
                              <label className={labelCls}>Group Size *</label>
                              <div className="grid grid-cols-4 gap-2">
                                {["1", "2-3", "4-8", "9+"].map((g) => (
                                  <button type="button" key={g} onClick={() => setCityGroupSize(g)} className={selBtn(cityGroupSize === g)}>{g}</button>
                                ))}
                              </div>
                            </div>

                            <div>
                              <label className={labelCls}>Interests (Select Topics) *</label>
                              <div className="flex flex-wrap gap-2">
                                {["History & Heritage", "Food & Street Eats", "Art & Culture", "Shopping & Bazaars", "Photography", "Religious Sites"].map((i) => (
                                  <button type="button" key={i} onClick={() => toggleCityInterest(i)} className={tagBtn(cityInterests.includes(i))}>{i}</button>
                                ))}
                              </div>
                            </div>

                            <div>
                              <label className={labelCls}>Landmark Preferences *</label>
                              <div className="flex flex-wrap gap-2">
                                {dhakaSpots.map((s) => (
                                  <button type="button" key={s} onClick={() => toggleCitySpot(s)} className={tagBtn(citySpots.includes(s))}>{s}</button>
                                ))}
                              </div>
                            </div>

                            <div>
                              <label className={labelCls}>Guide Language *</label>
                              <div className="flex flex-wrap gap-2">
                                {languages.map((lang) => (
                                  <button type="button" key={lang} onClick={() => setCityLanguage(lang)} className={tagBtn(cityLanguage === lang)}>{lang}</button>
                                ))}
                              </div>
                            </div>
                          </>
                        )}

                        <div className="pt-3 flex justify-end">
                          <button
                            type="button"
                            disabled={!isStep1Valid[activeTab]}
                            onClick={() => setStep(2)}
                            className="flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white transition-all hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Add Contact Details <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
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
                          <label htmlFor="notes" className={labelCls}>Special Requirements <span className="text-slate-500 font-normal">(Optional)</span></label>
                          <textarea id="notes" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} className={inputCls + " resize-none"} placeholder="Dietary needs, mobility requirements, specific interests, etc." />
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                          <button type="button" onClick={() => setStep(1)} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
                            <ChevronLeft className="h-4 w-4" /> Edit Tour Details
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
                className="flex items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 py-3 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors shadow-sm">
                <MessageCircle className="h-4 w-4 text-green-600 fill-green-600" /> WhatsApp Us
              </a>
              <a href="tel:+8801920149986"
                className="flex items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 py-3 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors shadow-sm">
                <Phone className="h-4 w-4 text-teal-600 fill-teal-600" /> Call Support
              </a>
            </div>
          </div>

          {/* LEFT — Trust, Gallery, Testimonials, FAQ */}
          <div className="w-full flex-1 order-2 lg:order-1 space-y-12">

            {/* Value Props */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm">
                <div className="h-10 w-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 mb-4">
                  <Globe className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Bilingual Expert Guides</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  All guides are fluent in English and Bengali with knowledge of history, culture, and business geography across Dhaka.
                </p>
              </div>
              <div className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm">
                <div className="h-10 w-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 mb-4">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">100% Flexible Schedule</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Start as early as 7 AM, go as long as you need. Routes are fully customized based on your interests and time.
                </p>
              </div>
            </div>

            {/* Tour Gallery */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-teal-600 mb-1">Real Dhaka</h3>
                <h2 className="text-2xl font-extrabold text-slate-900">What You Will Experience</h2>
                <p className="text-xs text-slate-500">Iconic landmarks, hidden markets, and authentic local culture — all with an expert guide by your side.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Lalbagh Fort", area: "Old Dhaka", img: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=500&q=80" },
                  { title: "Ahsan Manzil Palace", area: "Sadarghat, Dhaka", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80" },
                  { title: "Old Dhaka Markets", area: "Chawkbazar, Dhaka", img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=500&q=80" },
                  { title: "Hatirjheel Lake Park", area: "Rampura, Dhaka", img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&q=80" },
                ].map((item, idx) => (
                  <div key={idx} className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative">
                      <img src={item.img} alt={item.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      <span className="absolute bottom-2 left-2 rounded-lg bg-slate-900/80 backdrop-blur-sm text-[10px] font-bold text-white px-2 py-1">{item.area}</span>
                    </div>
                    <div className="p-4">
                      <h4 className="text-xs font-bold text-slate-800">{item.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Guided Experience Available</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider text-teal-400">Tourists & Delegations</span>
              <h3 className="text-xl font-bold mt-1 mb-6">What Visitors Say</h3>
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
                <h3 className="text-sm font-bold uppercase tracking-wider text-teal-600 mb-1">Knowledge Base</h3>
                <h2 className="text-2xl font-extrabold text-slate-900">Tour Guide FAQ</h2>
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

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
