"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Accommodation", href: "/accommodation" },
  { name: "Concierge", href: "/concierge" },
  { name: "Tour Guide", href: "/tour" },
  { name: "Buying Used", href: "/buying" },
  { name: "Repair & Maintenance", href: "/repair" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 md:px-12",
        isScrolled
          ? "bg-slate-900/80 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-6"
      )}
    >
      {/* Left: Logo */}
      <div className="flex flex-1 items-center justify-start">
        <Link
          href="/"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex items-center gap-3 text-2xl font-bold tracking-tight text-white transition-colors"
        >
          <Image
            src="/images/logo-nobg.png"
            alt="Be Happy Logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <span>Be Happy</span>
        </Link>
      </div>

      {/* Middle: Navigation Links */}
      <nav className="hidden md:flex items-center gap-1 rounded-full bg-slate-800/40 p-1 backdrop-blur-sm border border-slate-700/50">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "relative rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200",
                isActive
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
              )}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
      
      {/* Right: Call To Action */}
      <div className="flex flex-1 items-center justify-end">
        <a
          href="/#booking"
          className="hidden md:inline-flex rounded-full bg-teal-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal-500 hover:shadow-teal-500/25 active:scale-95"
        >
          Book Now
        </a>
        <a
          href="tel:+8801920149986"
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 text-white shadow-md hover:bg-teal-500 active:scale-95"
          aria-label="Call support"
        >
          <Phone className="h-5 w-5" />
        </a>
      </div>
    </header>
  );
}
