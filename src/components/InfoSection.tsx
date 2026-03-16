"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const guides = [
  {
    icon: "payments",
    iconBg: "bg-blue-50 text-blue-600",
    title: "How Annual Fees Work",
    content: (
      <>
        <p className="text-slate-600 leading-relaxed">
          Annual fees are a yearly cost charged by card issuers for the privilege
          of carrying a specific card. In Canada, these fees can range from $0
          for entry-level cards to over $700 for ultra-premium cards like the
          AMEX Platinum.
        </p>
        <div className="mt-4 p-4 rounded-lg bg-slate-50 border-l-4 border-primary">
          <p className="text-sm font-medium italic">
            &quot;A general rule of thumb: If the value of the perks (insurance,
            lounge access, credits) exceeds the fee, the card is worth it.&quot;
          </p>
        </div>
      </>
    ),
  },
  {
    icon: "flight_takeoff",
    iconBg: "bg-emerald-50 text-emerald-600",
    title: "Cashback vs. Travel Rewards",
    content: (
      <>
        <p className="mb-4 text-slate-600">
          Choosing between cashback and travel depends on your spending habits
          and lifestyle. Cashback offers simplicity and immediate value, while
          travel rewards (like Aeroplan or Avion) can provide significantly
          higher value when redeemed for premium flights.
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Cashback is best for simple, fixed-value savings.",
            "Travel points are best for luxury redemptions.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-slate-600">
              <span className="material-symbols-outlined text-emerald-500">
                check_circle
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    icon: "verified_user",
    iconBg: "bg-amber-50 text-amber-600",
    title: "Credit Card Approval Factors",
    content: (
      <>
        <p className="text-slate-600">
          Canadian banks look at three main pillars: your credit score (Equifax
          or TransUnion), your gross annual income, and your current
          debt-to-service ratio. Understanding these can help you apply for cards
          you&apos;re likely to get.
        </p>
        <div className="mt-4 flex gap-3">
          <div className="flex-1 p-3 bg-slate-50 rounded text-center">
            <div className="text-xs uppercase font-bold text-slate-400">
              Score Needed
            </div>
            <div className="text-xl font-black text-slate-900">660 - 750+</div>
          </div>
          <div className="flex-1 p-3 bg-slate-50 rounded text-center">
            <div className="text-xs uppercase font-bold text-slate-400">
              Income Min
            </div>
            <div className="text-xl font-black text-slate-900">$12k - $80k</div>
          </div>
        </div>
      </>
    ),
  },
  {
    icon: "security",
    iconBg: "bg-rose-50 text-rose-600",
    title: "Avoiding Interest and Debt",
    content: (
      <p className="text-slate-600">
        The golden rule of credit cards: pay your statement in full every month.
        Standard Canadian interest rates hover around 19.99% - 22.99%. We show
        you how to set up autopay and manage your statement cycles effectively.
      </p>
    ),
  },
];

export default function InfoSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="guides" className="py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            <span className="material-symbols-outlined text-sm">school</span>
            Learn & Save
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
            Education <span className="text-primary">Hub</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-600">
            Master the complexities of Canadian credit cards. From understanding
            interest rates to maximizing travel rewards, we provide the clarity
            you need.
          </p>
        </motion.div>

        <div className="space-y-4">
          {guides.map((guide, index) => (
            <motion.div
              key={guide.title}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <button
                className="flex items-center justify-between p-6 w-full text-left cursor-pointer"
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${guide.iconBg}`}>
                    <span className="material-symbols-outlined">
                      {guide.icon}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {guide.title}
                  </h3>
                </div>
                <motion.span
                  className="material-symbols-outlined text-slate-400"
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  expand_more
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">{guide.content}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 relative overflow-hidden rounded-2xl bg-primary px-8 py-12 text-center text-white shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4">
              Never miss a bonus offer
            </h3>
            <p className="max-w-xl mx-auto mb-8 opacity-90">
              Get weekly updates on the best credit card sign-up bonuses and
              financial tips for Canadians.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                className="flex-1 rounded-lg border-none px-4 py-3 text-slate-900 focus:ring-2 focus:ring-white"
                placeholder="Enter your email"
                type="email"
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-slate-900 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-800 transition-colors"
                type="submit"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <svg
              className="w-full h-full"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <path
                d="M0 100 C 20 0 50 0 100 100"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
              <path
                d="M0 80 C 30 20 70 20 100 80"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
