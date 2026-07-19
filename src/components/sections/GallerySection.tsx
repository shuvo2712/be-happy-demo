import React from "react";

export interface GalleryItem {
  title: string;
  area: string;
  img: string;
  price?: string;
  subtitle?: string;
}

interface GallerySectionProps {
  items: GalleryItem[];
  title: string;
  subtitle: string;
  description: string;
}

export default function GallerySection({ items, title, subtitle, description }: GallerySectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-teal-600 mb-1">{subtitle}</h3>
        <h2 className="text-2xl font-extrabold text-slate-900">{title}</h2>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item, idx) => (
          <div key={idx} className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative">
              <img src={item.img} alt={item.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <span className="absolute bottom-2 left-2 rounded-lg bg-slate-900/80 backdrop-blur-sm text-[10px] font-bold text-white px-2 py-1">
                {item.area}
              </span>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 truncate max-w-[180px]">{item.title}</h4>
                {item.subtitle && <p className="text-[10px] text-slate-400 mt-0.5">{item.subtitle}</p>}
              </div>
              {item.price && (
                <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-md">{item.price}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
