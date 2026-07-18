"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Phone,
  MessageCircle,
  Upload,
  X,
  Calendar,
  MapPin,
  Clock,
} from "lucide-react";
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

// Categories that benefit from file upload
const uploadCategories = ["repair", "buying"];
// Categories that benefit from address
const addressCategories = ["accommodation", "repair", "buying", "tour"];
// Categories that benefit from date/time
const dateCategories = ["accommodation", "concierge", "tour", "repair"];

interface UploadedFile {
  name: string;
  size: number;
  previewUrl?: string;
}

interface BookingFormProps {
  initialCategory?: string | null;
}

export default function BookingForm({ initialCategory = null }: BookingFormProps) {
  const [step, setStep] = useState(initialCategory ? 2 : 1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [selectedSubServices, setSelectedSubServices] = useState<string[]>([]);

  // Step 3 state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [notes, setNotes] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
      setSelectedSubServices([]);
      setStep(2);
    }
  }, [initialCategory]);

  useEffect(() => {
    const handleSelectCategory = (e: Event) => {
      const customEvent = e as CustomEvent<{ categoryId: string }>;
      if (customEvent.detail?.categoryId) {
        setSelectedCategory(customEvent.detail.categoryId);
        setSelectedSubServices([]);
        setStep(2);
        document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("select-booking-category", handleSelectCategory);
    return () => window.removeEventListener("select-booking-category", handleSelectCategory);
  }, []);

  const toggleSubService = (service: string) => {
    setSelectedSubServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setStep(1);
    setSelectedCategory(null);
    setSelectedSubServices([]);
    setName("");
    setPhone("");
    setAddress("");
    setPreferredDate("");
    setPreferredTime("");
    setNotes("");
    setUploadedFiles([]);
  };

  // File handling (mock — no real upload)
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

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const canProceedToStep2 = selectedCategory !== null;
  const canProceedToStep3 = selectedSubServices.length > 0;
  const canSubmit = name.trim() !== "" && phone.trim() !== "";

  const showAddress = selectedCategory && addressCategories.includes(selectedCategory);
  const showDate = selectedCategory && dateCategories.includes(selectedCategory);
  const showUpload = selectedCategory && uploadCategories.includes(selectedCategory);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  return (
    <section id="booking" className="bg-slate-900 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Book a Service
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Tell us what you need, and we&apos;ll take care of the rest.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-slate-800 p-6 shadow-2xl sm:p-12 border border-slate-700">
          {/* Success State */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800 z-10 text-center p-8"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-500/15 border border-teal-500/40 mb-6 shadow-[0_0_40px_rgba(20,184,166,0.2)]">
                  <CheckCircle2 className="h-10 w-10 text-teal-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Request Sent!</h3>
                <p className="text-slate-400 text-base max-w-xs leading-relaxed mb-8">
                  Thank you! Our team will contact you within 24 hours to confirm your booking.
                </p>
                <button
                  onClick={handleReset}
                  className="rounded-xl border border-slate-600 hover:border-teal-500 text-slate-300 hover:text-teal-400 text-sm font-semibold px-6 py-3 transition-all duration-300"
                >
                  Make Another Request
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress Indicator */}
          <div className="mb-10 flex items-center">
            {[1, 2, 3].map((i, idx) => (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-colors duration-300",
                      step > i
                        ? "bg-teal-500 text-white"
                        : step === i
                        ? "bg-teal-600 text-white ring-4 ring-teal-500/20"
                        : "bg-slate-700 text-slate-400"
                    )}
                  >
                    {step > i ? <Check className="h-5 w-5" /> : i}
                  </div>
                  <span className="mt-2 hidden text-xs font-medium text-slate-400 sm:block">
                    {i === 1 ? "Category" : i === 2 ? "Services" : "Details"}
                  </span>
                </div>
                {idx < 2 && (
                  <div
                    className={cn(
                      "flex-1 h-0.5 mx-2 transition-colors duration-500",
                      step > i ? "bg-teal-500" : "bg-slate-700"
                    )}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* ── Step 1: Category ── */}
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
                        setSelectedSubServices([]);
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
                      {selectedCategory === category.id && <Check className="h-5 w-5 text-teal-500 shrink-0" />}
                    </button>
                  ))}
                </div>
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={nextStep}
                    disabled={!canProceedToStep2}
                    className="flex items-center gap-2 rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white transition-all hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next Step <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── Step 2: Sub-services ── */}
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
                    className="flex items-center gap-2 rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white transition-all hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next Step <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── Step 3: Details ── */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="mb-6 text-xl font-semibold text-white">Your Details</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name & Phone — always shown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-300">
                        Full Name <span className="text-teal-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3 text-white placeholder-slate-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-colors"
                        placeholder="Your Full Name"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-300">
                        Phone Number <span className="text-teal-400">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3 text-white placeholder-slate-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-colors"
                        placeholder="+880 1XX XXX XXXX"
                      />
                    </div>
                  </div>

                  {/* Address — conditional */}
                  {showAddress && (
                    <div>
                      <label htmlFor="address" className="mb-2 flex items-center gap-1.5 text-sm font-medium text-slate-300">
                        <MapPin className="h-4 w-4 text-slate-400" /> Location / Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3 text-white placeholder-slate-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-colors"
                        placeholder="e.g., Road 3, Block A, Bashundhara R/A"
                      />
                    </div>
                  )}

                  {/* Date & Time — conditional */}
                  {showDate && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="preferred-date" className="mb-2 flex items-center gap-1.5 text-sm font-medium text-slate-300">
                          <Calendar className="h-4 w-4 text-slate-400" /> Preferred Date
                        </label>
                        <input
                          type="date"
                          id="preferred-date"
                          value={preferredDate}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3 text-white placeholder-slate-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-colors [color-scheme:dark]"
                        />
                      </div>
                      <div>
                        <label htmlFor="preferred-time" className="mb-2 flex items-center gap-1.5 text-sm font-medium text-slate-300">
                          <Clock className="h-4 w-4 text-slate-400" /> Preferred Time
                        </label>
                        <select
                          id="preferred-time"
                          value={preferredTime}
                          onChange={(e) => setPreferredTime(e.target.value)}
                          className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3 text-white focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-colors"
                        >
                          <option value="" className="bg-slate-800">Select a time slot</option>
                          <option value="morning" className="bg-slate-800">Morning (8 AM – 12 PM)</option>
                          <option value="afternoon" className="bg-slate-800">Afternoon (12 PM – 5 PM)</option>
                          <option value="evening" className="bg-slate-800">Evening (5 PM – 9 PM)</option>
                          <option value="flexible" className="bg-slate-800">Flexible / Any time</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  <div>
                    <label htmlFor="notes" className="mb-2 block text-sm font-medium text-slate-300">
                      Additional Notes <span className="text-slate-500 font-normal">(Optional)</span>
                    </label>
                    <textarea
                      id="notes"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3 text-white placeholder-slate-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-colors resize-none"
                      placeholder="Tell us more about what you need..."
                    />
                  </div>

                  {/* File Upload — conditional */}
                  {showUpload && (
                    <div>
                      <label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-slate-300">
                        <Upload className="h-4 w-4 text-slate-400" /> Upload Photos{" "}
                        <span className="text-slate-500 font-normal">(Optional, up to 5)</span>
                      </label>
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={cn(
                          "relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed cursor-pointer p-6 transition-all duration-200",
                          isDragging
                            ? "border-teal-400 bg-teal-500/10"
                            : "border-slate-600 hover:border-slate-400 bg-slate-900/30"
                        )}
                      >
                        <Upload className="h-8 w-8 text-slate-500" />
                        <p className="text-sm text-slate-400 text-center">
                          <span className="font-semibold text-teal-400">Click to upload</span> or drag & drop
                        </p>
                        <p className="text-xs text-slate-500">PNG, JPG, HEIC up to 10 MB each</p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          multiple
                          className="sr-only"
                          onChange={(e) => handleFiles(e.target.files)}
                        />
                      </div>

                      {/* Uploaded file previews */}
                      {uploadedFiles.length > 0 && (
                        <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {uploadedFiles.map((file, i) => (
                            <div key={i} className="relative group rounded-lg overflow-hidden border border-slate-700 bg-slate-900/50">
                              {file.previewUrl ? (
                                <img src={file.previewUrl} alt={file.name} className="w-full h-20 object-cover" />
                              ) : (
                                <div className="w-full h-20 flex items-center justify-center bg-slate-800">
                                  <Upload className="h-6 w-6 text-slate-500" />
                                </div>
                              )}
                              <div className="px-2 py-1">
                                <p className="text-xs text-slate-400 truncate">{file.name}</p>
                                <p className="text-xs text-slate-500">{formatFileSize(file.size)}</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFile(i)}
                                className="absolute top-1 right-1 rounded-full bg-black/60 p-0.5 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                aria-label="Remove file"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Inline support CTA */}
                  <div className="mt-2 flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-slate-900/50 border border-slate-700 p-4">
                    <p className="text-xs text-slate-500 mr-1">Prefer to talk directly?</p>
                    <a
                      href="https://wa.me/8801700000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-green-700/80 hover:bg-green-600 text-white text-xs font-semibold px-4 py-2 transition-all duration-200"
                    >
                      <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                    </a>
                    <a
                      href="tel:+8801700000000"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-600 hover:border-slate-400 text-slate-400 hover:text-slate-200 text-xs font-semibold px-4 py-2 transition-all duration-200"
                    >
                      <Phone className="h-3.5 w-3.5" /> Call Us
                    </a>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-slate-700">
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
                      className="flex items-center gap-2 rounded-lg bg-teal-600 px-8 py-3 font-semibold text-white transition-all hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-50 shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)]"
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
