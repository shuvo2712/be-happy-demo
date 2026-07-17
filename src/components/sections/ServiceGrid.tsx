"use client";

import { motion } from "framer-motion";
import { Home, Briefcase, Map, ShoppingBag, Wrench } from "lucide-react";

const services = [
  {
    title: "Accommodation & Office Support",
    description: "Find the perfect space for your needs seamlessly.",
    icon: Home,
    items: ["Apartment Finding Assistance", "Office Space Finding Assistance", "Relocation Support"],
  },
  {
    title: "Concierge Services",
    description: "Premium assistance for your travel and daily needs.",
    icon: Briefcase,
    items: ["Hotel Reservations", "Flight Bookings", "Professional Drivers", "Rent-a-Car Services", "Housemate Finding Assistance"],
  },
  {
    title: "Tour Guide Services",
    description: "Discover Dhaka with a trusted local guide.",
    icon: Map,
    items: ["Hourly-Based Tour Guide Service", "Business Visitor Assistance", "City Tours & Local Experience", "Flexible Schedule at Competitive Rates"],
  },
  {
    title: "Buying Used Items",
    description: "We purchase used Furniture, Electronics, and Cars.",
    icon: ShoppingBag,
    note: "Fast Evaluation • Fair Price • Immediate Cash Payment",
    items: ["Used Furniture", "Used Electronics", "Used Cars"],
  },
  {
    title: "Repair & Maintenance Services",
    description: "Expert servicing for all your home and office appliances.",
    icon: Wrench,
    items: ["Refrigerator Servicing", "Air Conditioner Servicing", "Television Repair", "Home & Office Electronics Maintenance"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ServiceGrid() {
  return (
    <section id="services" className="bg-slate-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-teal-600">Our Services</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need, in one place
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            From finding a home to fixing your AC, our comprehensive services cover all aspects of living and working in Dhaka.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={`flex flex-col rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200 transition-shadow hover:shadow-xl ${
                index >= 3 ? "lg:col-span-1 lg:col-start-auto" : ""
              } ${index === 3 || index === 4 ? "lg:col-span-1.5" : ""}`}
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
                <service.icon className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{service.description}</p>

              {service.note && (
                <div className="mt-4 rounded-lg bg-emerald-50 p-3 text-xs font-semibold text-emerald-700">
                  {service.note}
                </div>
              )}

              <ul className="mt-6 flex flex-col gap-3">
                {service.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                    <div className="mt-1 flex h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
