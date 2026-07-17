"use client";

import { motion } from "framer-motion";
import { PhoneCall } from "lucide-react";

export default function FloatingActionButton() {
  return (
    <motion.a
      href="tel:+8801920149986"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center gap-2 rounded-full bg-teal-600 px-6 py-4 text-white shadow-xl hover:bg-teal-700 active:scale-95 md:bottom-10 md:right-10"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={{ rotate: [0, -15, 15, -15, 15, 0] }}
        transition={{
          repeat: Infinity,
          repeatDelay: 3,
          duration: 0.5,
        }}
      >
        <PhoneCall className="h-6 w-6" />
      </motion.div>
      <span className="font-semibold md:text-lg">Call Now</span>
    </motion.a>
  );
}
