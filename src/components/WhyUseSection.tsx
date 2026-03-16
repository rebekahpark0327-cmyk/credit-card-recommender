"use client";

import { motion } from "framer-motion";

const features = [
  { icon: "trending_up", label: "Real-time Data" },
  { icon: "shield", label: "Unbiased Reviews" },
  { icon: "card_giftcard", label: "Exclusive Offers" },
  { icon: "update", label: "Daily Updates" },
];

export default function WhyUseSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div
            className="lg:w-1/2 flex flex-col gap-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
              Why use our recommender?
            </h2>
            <p className="text-lg text-slate-600">
              We analyze hundreds of Canadian credit cards to find your perfect
              match. Our algorithm considers annual fees, welcome bonuses, and
              category earn rates.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.label}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-full">
                    {feature.icon}
                  </span>
                  <span className="font-semibold text-slate-800">
                    {feature.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="lg:w-1/2 w-full"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-primary p-1 rounded-2xl shadow-2xl">
              <div className="bg-white rounded-xl p-8 flex flex-col gap-6">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <span className="font-bold text-lg">Top Recommendation</span>
                  <span className="text-primary font-bold">#1 Match</span>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-24 h-16 rounded-lg overflow-hidden shrink-0">
                    <div className="w-full h-full bg-gradient-to-br from-primary to-indigo-900" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900">
                      World Elite Mastercard
                    </span>
                    <span className="text-sm text-slate-500">
                      Earn 4% on Groceries
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <div className="text-xs text-slate-500 uppercase font-bold mb-1">
                      Annual Value
                    </div>
                    <div className="text-xl font-black text-primary">$840+</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <div className="text-xs text-slate-500 uppercase font-bold mb-1">
                      Welcome Bonus
                    </div>
                    <div className="text-xl font-black text-slate-900">
                      60k Pts
                    </div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/20"
                  onClick={() =>
                    document
                      .getElementById("form")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Learn More
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
