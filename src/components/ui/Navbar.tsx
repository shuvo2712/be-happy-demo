"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Responsibility", href: "#responsibility" },
  { name: "About", href: "#about" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if we have scrolled past 50px for styling the navbar
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check which section is currently active
      const sections = navLinks.map((link) => link.href.substring(1));
      
      // Find the section that is closest to the top of the viewport
      let current = "home";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the section top is above the middle of the screen (or close to top), consider it active
          if (rect.top <= 150) {
            current = section;
          }
        }
      }
      
      // Edge case: if we are at the very bottom of the page, select the last section
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
        current = sections[sections.length - 1];
      }
      
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Update hash manually if needed or just let it be
    history.pushState(null, "", "#home");
  };

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
        <a
          href="#home"
          onClick={scrollToTop}
          className={cn(
            "text-2xl font-bold tracking-tight transition-colors",
            isScrolled ? "text-white" : "text-white" // In hero section text is white, scrolled text is white
          )}
        >
          Be Happy
        </a>
      </div>

      {/* Middle: Navigation Links */}
      <nav className="hidden md:flex items-center gap-1 rounded-full bg-slate-800/40 p-1 backdrop-blur-sm border border-slate-700/50">
        {navLinks.map((link) => {
          const isActive = activeSection === link.href.substring(1);
          return (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
              )}
            >
              {link.name}
            </a>
          );
        })}
      </nav>
      
      {/* Right: Call To Action */}
      <div className="flex flex-1 items-center justify-end">
        <a
          href="#booking"
          className="hidden md:inline-flex rounded-full bg-teal-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal-500 hover:shadow-teal-500/25 active:scale-95"
        >
          Book Now
        </a>
        <div className="md:hidden flex items-center">
          {/* Mobile menu button could go here if needed later */}
        </div>
      </div>
    </header>
  );
}
