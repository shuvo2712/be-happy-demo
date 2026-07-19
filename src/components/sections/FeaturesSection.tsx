import React from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FeatureItem {
  title: string;
  desc: string;
  step?: number;
  icon?: boolean;
}

interface FeaturesSectionProps {
  items: FeatureItem[];
  title: string;
  subtitle: string;
  description: string;
  layout?: "horizontal" | "vertical" | "grid"; // horizontal for flex-row, vertical for flex-col, grid for 2-col
}

export default function FeaturesSection({ items, title, subtitle, description, layout = "horizontal" }: FeaturesSectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-teal-600 mb-1">{subtitle}</h3>
        <h2 className="text-2xl font-extrabold text-slate-900">{title}</h2>
        {description && <p className="text-xs text-slate-500 mt-1">{description}</p>}
      </div>
      <div className={cn(
        "gap-4",
        layout === "horizontal" ? "flex flex-col sm:flex-row" : 
        layout === "grid" ? "grid grid-cols-1 sm:grid-cols-2" : 
        "flex flex-col"
      )}>
        {items.map((item, idx) => (
          <div key={idx} className={cn(
            "rounded-2xl bg-white border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow",
            layout === "horizontal" ? "flex-1" : "flex gap-4"
          )}>
            {item.step !== undefined ? (
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-teal-500 text-white font-extrabold text-base flex items-center justify-center shadow-[0_0_15px_rgba(20,184,166,0.25)] mb-3 sm:mb-0">
                {item.step}
              </div>
            ) : item.icon ? (
              <CheckCircle2 className="h-6 w-6 text-teal-500 mb-3 shrink-0" />
            ) : null}
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
