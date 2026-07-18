"use client";

import { Mail, MapPin, Phone, Clock, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-slate-900 bg-slate-950 py-16 text-slate-400">
      {/* Top Border Teal Glow Accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4 lg:gap-16">
          {/* Brand/About Section */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold text-white tracking-tight">
              Be Happy <span className="text-teal-400">in Dhaka</span>
            </h3>
            <p className="text-sm leading-relaxed text-slate-400">
              Your premier, trusted partner for local services across Dhaka's finest neighborhoods. We bring comfort, ease, and reliability to your home and office.
            </p>
            {/* Social Icons */}
            <div className="mt-2 flex gap-4">
              <a
                href="#"
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-slate-400 transition-all duration-300 hover:scale-110 hover:border-teal-500/50 hover:bg-teal-500/10 hover:text-teal-400"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="#"
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-slate-400 transition-all duration-300 hover:scale-110 hover:border-teal-500/50 hover:bg-teal-500/10 hover:text-teal-400"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="#"
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-slate-400 transition-all duration-300 hover:scale-110 hover:border-teal-500/50 hover:bg-teal-500/10 hover:text-teal-400"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <a href="#home" className="transition-colors duration-200 hover:text-teal-400">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="transition-colors duration-200 hover:text-teal-400">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#responsibility" className="transition-colors duration-200 hover:text-teal-400">
                  Social Impact
                </a>
              </li>
              <li>
                <a href="#booking" className="transition-colors duration-200 hover:text-teal-400">
                  Book a Service
                </a>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Service Areas</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-teal-500 shrink-0" />
                <span>Gulshan & Banani</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-teal-500 shrink-0" />
                <span>Bashundhara R/A</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-teal-500 shrink-0" />
                <span>Uttara</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-teal-500 shrink-0" />
                <span>Dhanmondi</span>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Contact & Hours</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-teal-500 shrink-0" />
                <a href="tel:+8801700000000" className="hover:text-teal-400 transition-colors">
                  +880 17XX XXX XXX
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-teal-500 shrink-0" />
                <a href="mailto:info@behappyindhaka.com" className="hover:text-teal-400 transition-colors">
                  info@behappyindhaka.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-teal-500 shrink-0" />
                <span>Sat - Thu: 9:00 AM - 8:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-slate-900" />

        {/* Bottom Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500">
          <p>© {currentYear} Be Happy in Dhaka. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span>Made with</span>
            <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500 animate-pulse" />
            <span>for a better Dhaka. 10% profits support orphans.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
