"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, Map, ShoppingBag, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

const tabsConfig = [
  { name: "Home", href: "/", shortName: "Home", icon: Home },
  { name: "Accommodation", href: "/accommodation", shortName: "Stay", icon: Home },
  { name: "Concierge", href: "/concierge", shortName: "Concierge", icon: Briefcase },
  { name: "Tour Guide", href: "/tour", shortName: "Tour", icon: Map },
  { name: "Buying Used", href: "/buying", shortName: "Buy", icon: ShoppingBag },
  { name: "Repair", href: "/repair", shortName: "Repair", icon: Wrench },
];

export default function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50">
      {/* Frosted glass container */}
      <div className="bg-slate-900/85 backdrop-blur-2xl border-t border-slate-700/50 shadow-[0_-8px_40px_rgba(0,0,0,0.5)]">
        {/* 6-Column Grid Layout to guarantee fit on all screens */}
        <div className="grid grid-cols-6 gap-0.5 px-1 py-2">
          {tabsConfig.map((tab) => {
            const isActive = pathname === tab.href;
            const Icon = tab.icon;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "relative flex flex-col items-center justify-center gap-1 rounded-xl py-1.5 px-0.5 text-center transition-all duration-250 active:scale-95",
                  isActive
                    ? "bg-teal-500/10 text-teal-400"
                    : "text-slate-500 hover:text-slate-300"
                )}
              >
                {/* Glow effect for active */}
                {isActive && (
                  <span className="absolute inset-0 rounded-xl bg-teal-400/5 ring-1 ring-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.05)]" />
                )}
                <Icon
                  className={cn(
                    "relative h-5 w-5 transition-all duration-200",
                    isActive ? "text-teal-400" : "text-slate-500"
                  )}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
                <span
                  className={cn(
                    "relative text-[8px] font-bold tracking-tight uppercase leading-none whitespace-nowrap transition-all duration-200",
                    isActive ? "text-teal-400" : "text-slate-500"
                  )}
                >
                  {tab.shortName}
                </span>
              </Link>
            );
          })}
        </div>
        {/* iOS safe area */}
        <div style={{ paddingBottom: "env(safe-area-inset-bottom)" }} />
      </div>
    </nav>
  );
}
