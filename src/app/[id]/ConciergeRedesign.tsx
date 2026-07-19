"use client";

import React, { useState, useEffect } from "react";
import {
  Star,
  ChevronDown,
  Phone,
  MessageCircle,
  Clock,
  Heart,
  Hotel,
  Plane,
  Car,
  Users,
  UserCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { iconMap, type ServiceType } from "@/lib/servicesData";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import { cn } from "@/lib/utils";

interface ConciergeRedesignProps {
  service: ServiceType;
}

const dhakaAreas = ["Gulshan", "Banani", "Baridhara", "Dhanmondi", "Uttara", "Motijheel"];

type TabType = "hotel" | "flight" | "driver" | "car" | "housemate";

const tabs: { id: TabType; label: string; shortLabel: string; icon: React.ElementType }[] = [
  { id: "hotel", label: "Hotel Reservation", shortLabel: "Hotel", icon: Hotel },
  { id: "flight", label: "Flight Booking", shortLabel: "Flight", icon: Plane },
  { id: "driver", label: "Professional Driver", shortLabel: "Driver", icon: UserCheck },
  { id: "car", label: "Rent-a-Car", shortLabel: "Rent Car", icon: Car },
  { id: "housemate", label: "Housemate Finding", shortLabel: "Housemate", icon: Users },
];

export default function ConciergeRedesign({ service }: ConciergeRedesignProps) {
  const [activeTab, setActiveTab] = useState<TabType>("hotel");
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  // Contact details (Step 2)
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  // Hotel fields
  const [hotelAreas, setHotelAreas] = useState<string[]>([]);
  const [hotelCheckin, setHotelCheckin] = useState("");
  const [hotelCheckout, setHotelCheckout] = useState("");
  const [hotelGuests, setHotelGuests] = useState("");
  const [hotelStars, setHotelStars] = useState("");

  // Flight fields
  const [flightFrom, setFlightFrom] = useState("");
  const [flightTo, setFlightTo] = useState("");
  const [flightDate, setFlightDate] = useState("");
  const [flightReturn, setFlightReturn] = useState("");
  const [flightRoundTrip, setFlightRoundTrip] = useState(false);
  const [flightPassengers, setFlightPassengers] = useState("");
  const [flightClass, setFlightClass] = useState("");

  // Driver fields
  const [driverDate, setDriverDate] = useState("");
  const [driverTime, setDriverTime] = useState("");
  const [driverPickup, setDriverPickup] = useState("");
  const [driverDropoff, setDriverDropoff] = useState("");
  const [driverVehicle, setDriverVehicle] = useState("");
  const [driverHourly, setDriverHourly] = useState<boolean | null>(null);

  // Car Rental fields
  const [carPickupDate, setCarPickupDate] = useState("");
  const [carReturnDate, setCarReturnDate] = useState("");
  const [carArea, setCarArea] = useState("");
  const [carVehicle, setCarVehicle] = useState("");
  const [carWithDriver, setCarWithDriver] = useState<boolean | null>(null);

  // Housemate fields
  const [hmAreas, setHmAreas] = useState<string[]>([]);
  const [hmBudget, setHmBudget] = useState("");
  const [hmGender, setHmGender] = useState("");
  const [hmMoveDate, setHmMoveDate] = useState("");

  const toggleHotelArea = (a: string) =>
    setHotelAreas((p) => (p.includes(a) ? p.filter((x) => x !== a) : [...p, a]));
  const toggleHmArea = (a: string) =>
    setHmAreas((p) => (p.includes(a) ? p.filter((x) => x !== a) : [...p, a]));

  // Step 1 validity per tab
  const isStep1Valid: Record<TabType, boolean> = {
    hotel: hotelAreas.length > 0 && !!hotelCheckin && !!hotelCheckout && !!hotelGuests && !!hotelStars,
    flight: !!flightFrom && !!flightTo && !!flightDate && !!flightPassengers && !!flightClass && (flightRoundTrip ? !!flightReturn : true),
    driver: !!driverDate && !!driverTime && !!driverPickup && !!driverDropoff && !!driverVehicle && driverHourly !== null,
    car: !!carPickupDate && !!carReturnDate && !!carArea && !!carVehicle && carWithDriver !== null,
    housemate: hmAreas.length > 0 && !!hmBudget && !!hmGender && !!hmMoveDate,
  };

  const isStep2Valid = name.trim() !== "" && phone.trim() !== "";
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prefix = activeTab.substring(0, 3).toUpperCase();
    setBookingRef(`BH-${prefix}-${Math.floor(10000 + Math.random() * 90000)}`);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setStep(1);
    setName(""); setPhone(""); setNotes("");
    setHotelAreas([]); setHotelCheckin(""); setHotelCheckout(""); setHotelGuests(""); setHotelStars("");
    setFlightFrom(""); setFlightTo(""); setFlightDate(""); setFlightReturn(""); setFlightRoundTrip(false); setFlightPassengers(""); setFlightClass("");
    setDriverDate(""); setDriverTime(""); setDriverPickup(""); setDriverDropoff(""); setDriverVehicle(""); setDriverHourly(null);
    setCarPickupDate(""); setCarReturnDate(""); setCarArea(""); setCarVehicle(""); setCarWithDriver(null);
    setHmAreas([]); setHmBudget(""); setHmGender(""); setHmMoveDate("");
  };

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial((a) => (a + 1) % service.testimonials.length), 4500);
    return () => clearInterval(t);
  }, [service.testimonials.length]);

  // Reusable selection button style
  const selBtn = (active: boolean) =>
    cn(
      "py-2 px-1 rounded-xl text-[10px] sm:text-xs font-bold border transition-all duration-200 text-center",
      active ? "bg-teal-600 border-teal-500 text-white" : "bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-600"
    );

  const areaTag = (active: boolean) =>
    cn(
      "px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200",
      active ? "bg-teal-600/20 border-teal-500 text-teal-300" : "bg-slate-800/40 border-slate-700 text-slate-400 hover:border-slate-500"
    );

  const inputCls = "w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-colors";
  const labelCls = "block text-xs font-semibold text-slate-300 mb-1.5";
  const gridHalf = "grid grid-cols-2 gap-3";
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
                One Message. Everything Arranged.
              </h1>
              {/* Value Props — glassmorphism cards */}
              <div className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-3">
                <div className="flex items-start gap-2 sm:gap-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm px-3 py-2.5 sm:px-4 sm:py-3">
                  <div className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                    <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-white">Fully Vetted Partners</p>
                    <p className="text-[10px] sm:text-xs text-slate-400 leading-relaxed mt-0.5 hidden sm:block">Hotels, drivers &amp; vendors personally vetted for safety and fair pricing.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm px-3 py-2.5 sm:px-4 sm:py-3">
                  <div className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                    <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-white">Same-Day Confirmation</p>
                    <p className="text-[10px] sm:text-xs text-slate-400 leading-relaxed mt-0.5 hidden sm:block">Submit before noon, confirmed by end of business day.</p>
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

          {/* RIGHT COLUMN — Wizard (Top on mobile, Right on desktop) */}
          <div className="w-full order-1">



            {/* Booking Card */}
            <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl p-6 sm:p-8">
              {/* Donation Badge */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-teal-600/90 to-teal-500/90 py-1.5 px-4 text-center text-[11px] font-bold text-white tracking-wide flex items-center justify-center gap-1">
                <Heart className="h-3 w-3 fill-white text-white animate-pulse" />
                10% of every booking supports local orphans in Dhaka
              </div>

              {submitted ? (
                /* Success */
                <div className="pb-6 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 mb-5">
                    <Check className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Booking Request Sent!</h3>
                  <p className="text-xs text-slate-400 mb-5">Our concierge will confirm your arrangement within the hour.</p>
                  <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 mb-5">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500">Reference ID</p>
                    <p className="text-xl font-mono font-bold text-teal-400 mt-1">{bookingRef}</p>
                    <p className="text-[11px] text-slate-400 mt-2">Keep this for your records. We will call or message you shortly.</p>
                  </div>
                  <div className="space-y-3">
                    <a
                      href={`https://wa.me/8801920149986?text=Hi%20Be%20Happy%2C%20my%20concierge%20request%20ref%20is%20${bookingRef}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-4 text-sm transition-colors w-full"
                    >
                      <MessageCircle className="h-4 w-4" /> Chat on WhatsApp Now
                    </a>
                    <button onClick={handleReset} className="text-xs text-slate-400 hover:text-white transition-colors underline block mx-auto py-2">
                      Make Another Request
                    </button>
                  </div>
                </div>
              ) : (
                <div className="pb-6">
                  {/* Tabs — scrollable row */}
                  {step === 1 && (
                    <div className="flex gap-1 bg-slate-800/60 p-1 rounded-xl mb-6 overflow-x-auto scrollbar-hide">
                      {tabs.map(({ id, shortLabel, icon: Icon }) => (
                        <button
                          key={id}
                          onClick={() => setActiveTab(id)}
                          className={cn(
                            "flex flex-col items-center gap-1.5 py-2.5 px-3 rounded-lg text-[10px] font-bold transition-all whitespace-nowrap shrink-0",
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
                    <h3 className="text-lg font-bold text-white">
                      {step === 1 ? tabs.find((t) => t.id === activeTab)?.label : "Your Contact Details"}
                    </h3>
                    <span className="text-xs text-teal-400 font-bold bg-teal-500/10 px-2 py-0.5 rounded-md">Step {step}/2</span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {step === 1 ? (
                      <div className="space-y-4">

                        {/* ── HOTEL ── */}
                        {activeTab === "hotel" && (
                          <>
                            <div>
                              <label className={labelCls}>Area in Dhaka *</label>
                              <div className="flex flex-wrap gap-2">
                                {dhakaAreas.map((a) => (
                                  <button type="button" key={a} onClick={() => toggleHotelArea(a)} className={areaTag(hotelAreas.includes(a))}>{a}</button>
                                ))}
                              </div>
                            </div>
                            <div className={gridHalf}>
                              <div>
                                <label className={labelCls}>Check-in *</label>
                                <input type="date" min={today} value={hotelCheckin} onChange={(e) => setHotelCheckin(e.target.value)} className={inputCls + " [color-scheme:dark]"} />
                              </div>
                              <div>
                                <label className={labelCls}>Check-out *</label>
                                <input type="date" min={hotelCheckin || today} value={hotelCheckout} onChange={(e) => setHotelCheckout(e.target.value)} className={inputCls + " [color-scheme:dark]"} />
                              </div>
                            </div>
                            <div>
                              <label className={labelCls}>Number of Guests *</label>
                              <div className="grid grid-cols-4 gap-2">
                                {["1", "2", "3", "4+"].map((n) => <button type="button" key={n} onClick={() => setHotelGuests(n)} className={selBtn(hotelGuests === n)}>{n}</button>)}
                              </div>
                            </div>
                            <div>
                              <label className={labelCls}>Star Rating Preference *</label>
                              <div className="grid grid-cols-3 gap-2">
                                {[
                                  { label: "3★ Economy", val: "3" },
                                  { label: "4★ Comfort", val: "4" },
                                  { label: "5★ Luxury", val: "5" },
                                ].map((s) => <button type="button" key={s.val} onClick={() => setHotelStars(s.val)} className={selBtn(hotelStars === s.val)}>{s.label}</button>)}
                              </div>
                            </div>
                          </>
                        )}

                        {/* ── FLIGHT ── */}
                        {activeTab === "flight" && (
                          <>
                            <div className={gridHalf}>
                              <div>
                                <label className={labelCls}>Departure From *</label>
                                <input type="text" value={flightFrom} onChange={(e) => setFlightFrom(e.target.value)} className={inputCls} placeholder="e.g. London, LHR" />
                              </div>
                              <div>
                                <label className={labelCls}>Destination *</label>
                                <input type="text" value={flightTo} onChange={(e) => setFlightTo(e.target.value)} className={inputCls} placeholder="e.g. Dhaka, DAC" />
                              </div>
                            </div>
                            <div>
                              <label className={labelCls}>Travel Date *</label>
                              <input type="date" min={today} value={flightDate} onChange={(e) => setFlightDate(e.target.value)} className={inputCls + " [color-scheme:dark]"} />
                            </div>
                            {/* Round trip toggle */}
                            <div className="flex items-center justify-between rounded-xl bg-slate-800/40 border border-slate-800 p-3">
                              <div className="flex items-center gap-2">
                                <RefreshCw className="h-4 w-4 text-teal-400" />
                                <div>
                                  <p className="text-xs font-bold text-white">Round Trip</p>
                                  <p className="text-[10px] text-slate-400">Toggle for return flight booking</p>
                                </div>
                              </div>
                              <input type="checkbox" checked={flightRoundTrip} onChange={(e) => setFlightRoundTrip(e.target.checked)} className="h-4 w-4 rounded accent-teal-500" />
                            </div>
                            {flightRoundTrip && (
                              <div>
                                <label className={labelCls}>Return Date *</label>
                                <input type="date" min={flightDate || today} value={flightReturn} onChange={(e) => setFlightReturn(e.target.value)} className={inputCls + " [color-scheme:dark]"} />
                              </div>
                            )}
                            <div className={gridHalf}>
                              <div>
                                <label className={labelCls}>Passengers *</label>
                                <div className="grid grid-cols-4 gap-1">
                                  {["1", "2", "3", "4+"].map((n) => <button type="button" key={n} onClick={() => setFlightPassengers(n)} className={selBtn(flightPassengers === n)}>{n}</button>)}
                                </div>
                              </div>
                              <div>
                                <label className={labelCls}>Cabin Class *</label>
                                <div className="grid grid-cols-2 gap-1">
                                  {["Economy", "Business"].map((c) => <button type="button" key={c} onClick={() => setFlightClass(c)} className={selBtn(flightClass === c)}>{c}</button>)}
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                        {/* ── DRIVER ── */}
                        {activeTab === "driver" && (
                          <>
                            <div className={gridHalf}>
                              <div>
                                <label className={labelCls}>Date Needed *</label>
                                <input type="date" min={today} value={driverDate} onChange={(e) => setDriverDate(e.target.value)} className={inputCls + " [color-scheme:dark]"} />
                              </div>
                              <div>
                                <label className={labelCls}>Pick-up Time *</label>
                                <select value={driverTime} onChange={(e) => setDriverTime(e.target.value)} className={inputCls}>
                                  <option value="" className="bg-slate-800">Select time</option>
                                  {["Early Morning (5–8 AM)", "Morning (8–12 PM)", "Afternoon (12–5 PM)", "Evening (5–9 PM)", "Late Night (9 PM+)"].map((t) => (
                                    <option key={t} value={t} className="bg-slate-800">{t}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div>
                              <label className={labelCls}>Pick-up Location *</label>
                              <input type="text" value={driverPickup} onChange={(e) => setDriverPickup(e.target.value)} className={inputCls} placeholder="e.g. Hazrat Shahjalal Airport" />
                            </div>
                            <div>
                              <label className={labelCls}>Drop-off Location *</label>
                              <input type="text" value={driverDropoff} onChange={(e) => setDriverDropoff(e.target.value)} className={inputCls} placeholder="e.g. Gulshan-2, Dhaka" />
                            </div>
                            <div>
                              <label className={labelCls}>Vehicle Type *</label>
                              <div className="grid grid-cols-3 gap-2">
                                {["Sedan", "SUV", "Van / Minibus"].map((v) => (
                                  <button type="button" key={v} onClick={() => setDriverVehicle(v)} className={selBtn(driverVehicle === v)}>{v}</button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <label className={labelCls}>Service Type *</label>
                              <div className="grid grid-cols-2 gap-2">
                                {[{ label: "Fixed Trip", val: false }, { label: "Hourly Rate", val: true }].map((opt) => (
                                  <button type="button" key={String(opt.val)} onClick={() => setDriverHourly(opt.val)}
                                    className={selBtn(driverHourly === opt.val)}>
                                    {opt.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </>
                        )}

                        {/* ── CAR RENTAL ── */}
                        {activeTab === "car" && (
                          <>
                            <div className={gridHalf}>
                              <div>
                                <label className={labelCls}>Pick-up Date *</label>
                                <input type="date" min={today} value={carPickupDate} onChange={(e) => setCarPickupDate(e.target.value)} className={inputCls + " [color-scheme:dark]"} />
                              </div>
                              <div>
                                <label className={labelCls}>Return Date *</label>
                                <input type="date" min={carPickupDate || today} value={carReturnDate} onChange={(e) => setCarReturnDate(e.target.value)} className={inputCls + " [color-scheme:dark]"} />
                              </div>
                            </div>
                            <div>
                              <label className={labelCls}>Pick-up Area in Dhaka *</label>
                              <input type="text" value={carArea} onChange={(e) => setCarArea(e.target.value)} className={inputCls} placeholder="e.g. Banani, Gulshan, Airport" />
                            </div>
                            <div>
                              <label className={labelCls}>Vehicle Type *</label>
                              <div className="grid grid-cols-3 gap-2">
                                {["Sedan", "SUV", "Microbus"].map((v) => (
                                  <button type="button" key={v} onClick={() => setCarVehicle(v)} className={selBtn(carVehicle === v)}>{v}</button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <label className={labelCls}>With Driver? *</label>
                              <div className="grid grid-cols-2 gap-2">
                                {[{ label: "With Driver", val: true }, { label: "Self-Drive", val: false }].map((opt) => (
                                  <button type="button" key={String(opt.val)} onClick={() => setCarWithDriver(opt.val)}
                                    className={selBtn(carWithDriver === opt.val)}>
                                    {opt.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </>
                        )}

                        {/* ── HOUSEMATE ── */}
                        {activeTab === "housemate" && (
                          <>
                            <div>
                              <label className={labelCls}>Target Neighborhoods *</label>
                              <div className="flex flex-wrap gap-2">
                                {dhakaAreas.map((a) => (
                                  <button type="button" key={a} onClick={() => toggleHmArea(a)} className={areaTag(hmAreas.includes(a))}>{a}</button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <label className={labelCls}>Monthly Budget Contribution *</label>
                              <div className="grid grid-cols-2 gap-2">
                                {[
                                  { label: "Below ৳20K", val: "below-20" },
                                  { label: "৳20K - ৳40K", val: "20-40" },
                                  { label: "৳40K - ৳60K", val: "40-60" },
                                  { label: "Above ৳60K", val: "above-60" },
                                ].map((b) => (
                                  <button type="button" key={b.val} onClick={() => setHmBudget(b.val)} className={selBtn(hmBudget === b.val)}>{b.label}</button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <label className={labelCls}>Preferred Housemate Gender *</label>
                              <div className="grid grid-cols-3 gap-2">
                                {["Male", "Female", "No Preference"].map((g) => (
                                  <button type="button" key={g} onClick={() => setHmGender(g)} className={selBtn(hmGender === g)}>{g}</button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <label className={labelCls}>Move-in Date *</label>
                              <input type="date" min={today} value={hmMoveDate} onChange={(e) => setHmMoveDate(e.target.value)} className={inputCls + " [color-scheme:dark]"} />
                            </div>
                          </>
                        )}

                        {/* Step 1 Next */}
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
                          <label htmlFor="notes" className={labelCls}>Special Requests <span className="text-slate-500 font-normal">(Optional)</span></label>
                          <textarea id="notes" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} className={inputCls + " resize-none"} placeholder="Any preferences, special requirements, or additional info..." />
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                          <button type="button" onClick={() => setStep(1)} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
                            <ChevronLeft className="h-4 w-4" /> Edit Details
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

          {/* LEFT COLUMN — Trust, Gallery, Testimonials, FAQ */}
          <div className="w-full order-2 space-y-12">


            {/* Service Showcase Gallery */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-teal-600 mb-1">What We Arrange</h3>
                <h2 className="text-2xl font-extrabold text-slate-900">Our Concierge Services</h2>
                <p className="text-xs text-slate-500">From a last-minute airport transfer to a week-long hotel stay — we handle it all.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "5-Star Hotel Reservations", area: "Gulshan & Baridhara", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80" },
                  { title: "Professional Airport Drivers", area: "HSIA, Dhaka", img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&q=80" },
                  { title: "Luxury Car Rentals", area: "All Areas, Dhaka", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&q=80" },
                  { title: "Flight & Travel Planning", area: "International Departures", img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500&q=80" },
                ].map((item, idx) => (
                  <div key={idx} className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative">
                      <img src={item.img} alt={item.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      <span className="absolute bottom-2 left-2 rounded-lg bg-slate-900/80 backdrop-blur-sm text-[10px] font-bold text-white px-2 py-1">{item.area}</span>
                    </div>
                    <div className="p-4">
                      <h4 className="text-xs font-bold text-slate-800">{item.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Vetted Concierge Partner</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider text-teal-400">Business Travelers & Expats</span>
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
                <h3 className="text-sm font-bold uppercase tracking-wider text-teal-600 mb-1">Knowledge Base</h3>
                <h2 className="text-2xl font-extrabold text-slate-900">Concierge FAQ</h2>
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
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
