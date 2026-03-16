"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <span className="material-symbols-outlined text-white text-2xl">
                payments
              </span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              CardWise{" "}
              <span className="text-primary">Canada</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a
              className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
              href="#form"
            >
              Compare
            </a>
            <a
              className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
              href="#results"
            >
              Rewards
            </a>
            <a
              className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
              href="#guides"
            >
              Guides
            </a>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-md shadow-primary/20"
              onClick={() =>
                document
                  .getElementById("form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Get Started
            </motion.button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className="material-symbols-outlined text-slate-600">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-200 bg-white"
          >
            <div className="flex flex-col px-4 py-4 gap-4">
              <a
                className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
                href="#form"
                onClick={() => setMobileOpen(false)}
              >
                Compare
              </a>
              <a
                className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
                href="#results"
                onClick={() => setMobileOpen(false)}
              >
                Rewards
              </a>
              <a
                className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
                href="#guides"
                onClick={() => setMobileOpen(false)}
              >
                Guides
              </a>
              <button
                className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold w-full"
                onClick={() => {
                  setMobileOpen(false);
                  document
                    .getElementById("form")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
