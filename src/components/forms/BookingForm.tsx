"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { id: "accommodation", label: "Accommodation & Office Support" },
  { id: "concierge", label: "Concierge Services" },
  { id: "tour", label: "Tour Guide Services" },
  { id: "buying", label: "Buying Used Items" },
  { id: "repair", label: "Repair & Maintenance Services" },
];

const subServices: Record<string, string[]> = {
  accommodation: ["Apartment Finding Assistance", "Office Space Finding Assistance", "Relocation Support"],
  concierge: ["Hotel Reservations", "Flight Bookings", "Professional Drivers", "Rent-a-Car Services", "Housemate Finding Assistance"],
  tour: ["Hourly-Based Tour Guide Service", "Business Visitor Assistance", "City Tours & Local Experience", "Flexible Schedule at Competitive Rates"],
  buying: ["Used Furniture", "Used Electronics", "Used Cars"],
  repair: ["Refrigerator Servicing", "Air Conditioner Servicing", "Television Repair", "Home & Office Electronics Maintenance"],
};

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubServices, setSelectedSubServices] = useState<string[]>([]);
  
  // Step 3 state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const toggleSubService = (service: string) => {
    setSelectedSubServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Booking request submitted! (This is a prototype)");
    setStep(1);
    setSelectedCategory(null);
    setSelectedSubServices([]);
    setName("");
    setPhone("");
    setNotes("");
  };

  const canProceedToStep2 = selectedCategory !== null;
  const canProceedToStep3 = selectedSubServices.length > 0;
  const canSubmit = name.trim() !== "" && phone.trim() !== "";

  return (
    <section id="booking" className="bg-slate-900 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Book a Service
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Tell us what you need, and we'll take care of the rest.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-slate-800 p-6 shadow-2xl sm:p-12 border border-slate-700">
          {/* Progress Indicator */}
          <div className="mb-8 flex items-center justify-between">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-colors duration-300",
                    step >= i ? "bg-teal-500 text-white" : "bg-slate-700 text-slate-400"
                  )}
                >
                  {step > i ? <Check className="h-5 w-5" /> : i}
                </div>
                <span className="mt-2 hidden text-xs font-medium text-slate-400 sm:block">
                  {i === 1 ? "Category" : i === 2 ? "Services" : "Details"}
                </span>
              </div>
            ))}
            {/* Connecting lines */}
            <div className="absolute left-[calc(16%+1.25rem)] top-[2.25rem] -z-10 h-0.5 w-[calc(34%-2.5rem)] bg-slate-700 sm:top-[2.75rem]" />
            <div className="absolute right-[calc(16%+1.25rem)] top-[2.25rem] -z-10 h-0.5 w-[calc(34%-2.5rem)] bg-slate-700 sm:top-[2.75rem]" />
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="mb-6 text-xl font-semibold text-white">Select a Category</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setSelectedSubServices([]); // Reset sub-services on category change
                      }}
                      className={cn(
                        "flex items-center justify-between rounded-xl border p-4 text-left transition-all",
                        selectedCategory === category.id
                          ? "border-teal-500 bg-teal-500/10 shadow-[0_0_15px_rgba(20,184,166,0.15)]"
                          : "border-slate-700 bg-slate-800/50 hover:border-slate-500 hover:bg-slate-700/50"
                      )}
                    >
                      <span className={cn("font-medium", selectedCategory === category.id ? "text-teal-400" : "text-slate-300")}>
                        {category.label}
                      </span>
                      {selectedCategory === category.id && <Check className="h-5 w-5 text-teal-500" />}
                    </button>
                  ))}
                </div>
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={nextStep}
                    disabled={!canProceedToStep2}
                    className="flex items-center gap-2 rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white transition-all hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-teal-600"
                  >
                    Next Step <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="mb-6 text-xl font-semibold text-white">Select Specific Services</h3>
                <div className="grid gap-3">
                  {selectedCategory &&
                    subServices[selectedCategory].map((service) => {
                      const isSelected = selectedSubServices.includes(service);
                      return (
                        <label
                          key={service}
                          className={cn(
                            "flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-all",
                            isSelected
                              ? "border-teal-500 bg-teal-500/10"
                              : "border-slate-700 bg-slate-800/50 hover:bg-slate-700/30"
                          )}
                        >
                          <div
                            className={cn(
                              "flex h-6 w-6 shrink-0 items-center justify-center rounded border transition-colors",
                              isSelected ? "border-teal-500 bg-teal-500" : "border-slate-500"
                            )}
                          >
                            {isSelected && <Check className="h-4 w-4 text-white" />}
                          </div>
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={isSelected}
                            onChange={() => toggleSubService(service)}
                          />
                          <span className={cn("font-medium", isSelected ? "text-teal-100" : "text-slate-300")}>
                            {service}
                          </span>
                        </label>
                      );
                    })}
                </div>
                <div className="mt-8 flex justify-between">
                  <button
                    onClick={prevStep}
                    className="flex items-center gap-2 rounded-lg border border-slate-600 px-6 py-3 font-semibold text-slate-300 transition-all hover:bg-slate-700"
                  >
                    <ChevronLeft className="h-4 w-4" /> Back
                  </button>
                  <button
                    onClick={nextStep}
                    disabled={!canProceedToStep3}
                    className="flex items-center gap-2 rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white transition-all hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-teal-600"
                  >
                    Next Step <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="mb-6 text-xl font-semibold text-white">Your Details</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-300">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3 text-white placeholder-slate-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-300">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3 text-white placeholder-slate-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                      placeholder="+880 1XX XXX XXXX"
                    />
                  </div>
                  <div>
                    <label htmlFor="notes" className="mb-2 block text-sm font-medium text-slate-300">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      id="notes"
                      rows={4}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3 text-white placeholder-slate-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                      placeholder="Tell us more about what you need..."
                    />
                  </div>
                  <div className="mt-8 flex justify-between pt-4 border-t border-slate-700">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center gap-2 rounded-lg border border-slate-600 px-6 py-3 font-semibold text-slate-300 transition-all hover:bg-slate-700"
                    >
                      <ChevronLeft className="h-4 w-4" /> Back
                    </button>
                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className="flex items-center gap-2 rounded-lg bg-teal-600 px-8 py-3 font-semibold text-white transition-all hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-teal-600 shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)]"
                    >
                      Submit Request
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
