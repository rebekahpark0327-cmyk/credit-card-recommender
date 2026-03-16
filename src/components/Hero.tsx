"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="flex flex-col gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit">
              <span className="material-symbols-outlined text-sm">
                verified
              </span>
              100% Unbiased Recommendations
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-5xl lg:text-7xl font-black leading-tight tracking-tight text-slate-900">
                Find the Best{" "}
                <span className="text-primary">Credit Card</span> for Your
                Spending
              </h1>
              <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl">
                Compare top Canadian cards for groceries, gas, dining, and
                travel. Stop leaving money on the table and start maximizing
                your rewards today.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-xl shadow-primary/25 flex items-center gap-2"
                onClick={() =>
                  document
                    .getElementById("form")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Get Recommendations
                <span className="material-symbols-outlined">arrow_forward</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white border border-slate-200 text-slate-900 px-8 py-4 rounded-xl text-lg font-bold hover:bg-slate-50 transition-all"
                onClick={() =>
                  document
                    .getElementById("comparison")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Browse Cards
              </motion.button>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <div className="flex -space-x-2">
                {[
                  "bg-primary",
                  "bg-emerald-500",
                  "bg-amber-500",
                ].map((color, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full border-2 border-white ${color} flex items-center justify-center`}
                  >
                    <span className="text-white text-xs font-bold">
                      {["R", "S", "M"][i]}
                    </span>
                  </div>
                ))}
              </div>
              <span>Join 50,000+ Canadians saving money</span>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
              <div className="bg-gradient-to-br from-primary via-indigo-700 to-slate-900 aspect-[16/10] flex flex-col items-center justify-center p-8 lg:p-12">
                <div className="flex gap-4 lg:gap-6 items-end">
                  {[
                    { img: "/cards/amex-cobalt.png", rotate: "-rotate-6", alt: "Amex Cobalt" },
                    { img: "/cards/scotiabank-gold.png", rotate: "", alt: "Scotiabank Gold" },
                    { img: "/cards/td-cashback.png", rotate: "rotate-6", alt: "TD Cash Back" },
                  ].map((card, i) => (
                    <motion.div
                      key={i}
                      className={`${card.rotate} rounded-xl shadow-2xl overflow-hidden border border-white/20`}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.15 }}
                    >
                      <img
                        src={card.img}
                        alt={card.alt}
                        className="w-32 lg:w-44 h-auto object-contain"
                      />
                    </motion.div>
                  ))}
                </div>
                <p className="text-white/60 text-sm mt-8 font-medium">
                  Find your perfect match
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
