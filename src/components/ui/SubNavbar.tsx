"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SubNavbarTab<T extends string = string> {
  id: T;
  shortLabel: string;
  icon: React.ElementType;
}

interface SubNavbarProps<T extends string = string> {
  tabs: SubNavbarTab<T>[];
  activeTab: T;
  onTabChange: (id: T) => void;
  layoutKey: string;
  disabled?: boolean;
}

export default function SubNavbar<T extends string = string>({
  tabs,
  activeTab,
  onTabChange,
  layoutKey,
  disabled = false,
}: SubNavbarProps<T>) {
  return (
    <div
      className={cn(
        "w-full pt-4", // Simple padding to separate from hero text
        disabled && "opacity-50 pointer-events-none"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-stretch gap-0.5 sm:gap-1 py-2 sm:py-2.5">
          {tabs.map(({ id, shortLabel, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => {
                  if (!disabled) {
                    onTabChange(id);
                    setTimeout(() => {
                      const formElement = document.getElementById("booking-form");
                      if (formElement) {
                        const header = document.querySelector("section.sticky");
                        const headerHeight = header ? header.getBoundingClientRect().height : 0;
                        const targetY = window.scrollY + formElement.getBoundingClientRect().top;
                        window.scrollTo({
                          top: targetY - headerHeight - 16,
                          behavior: "smooth",
                        });
                      }
                    }, 50);
                  }
                }}
                className={cn(
                  "relative flex flex-col flex-1 items-center justify-center gap-1 py-2 sm:py-2.5 px-2 sm:px-5 rounded-lg sm:rounded-xl",
                  "text-[10px] sm:text-xs font-bold tracking-wide transition-colors z-10 overflow-hidden",
                  isActive ? "text-white" : "text-white/70 hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId={`subNavIndicator-${layoutKey}`}
                    className="absolute inset-0 bg-teal-600/80 rounded-lg sm:rounded-xl -z-10"
                    style={{ boxShadow: "0 2px 12px rgba(13,148,136,0.4)" }}
                    transition={{ type: "spring", stiffness: 450, damping: 38 }}
                  />
                )}
                <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                <span className="truncate leading-none">{shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
