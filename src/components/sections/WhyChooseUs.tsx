"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock, BadgeDollarSign, MapPin, Headset } from "lucide-react";

const features = [
  {
    name: "Reliable & Professional Service",
    description: "Vetted experts committed to delivering top-notch quality.",
    icon: ShieldCheck,
  },
  {
    name: "Quick Response",
    description: "We value your time. Expect immediate assistance when you call.",
    icon: Clock,
  },
  {
    name: "Fair Pricing",
    description: "Transparent costs with absolutely no hidden fees.",
    icon: BadgeDollarSign,
  },
  {
    name: "Local Expertise",
    description: "Deep knowledge of Dhaka to guide you seamlessly.",
    icon: MapPin,
  },
  {
    name: "24/7 Customer Support",
    description: "Our dedicated team is available around the clock.",
    icon: Headset,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-teal-600">Our Pillars</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Why Choose Us?
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            We are dedicated to providing the best local concierge experience. Your comfort is our priority, and our core values reflect that commitment.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
        >
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                variants={item}
                className={`flex flex-col ${index >= 3 ? 'lg:col-span-1 lg:col-start-auto' : ''}`}
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
                    <feature.icon className="h-6 w-6 text-teal-600" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
