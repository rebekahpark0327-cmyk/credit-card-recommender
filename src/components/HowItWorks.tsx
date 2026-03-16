"use client";

import { motion } from "framer-motion";

const steps = [
  {
    icon: "edit_note",
    title: "Enter habits",
    description:
      "Tell us where you spend most each month, from groceries at Loblaws to gas at Shell.",
  },
  {
    icon: "tune",
    title: "Choose preferences",
    description:
      "Select reward types like direct cash back, travel points (Aeroplan/WestJet), or store credits.",
  },
  {
    icon: "auto_awesome",
    title: "Get matches",
    description:
      "See a curated list of cards that fit your profile, ranked by net annual value.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Three simple steps to unlock your maximum earning potential. We do
            the math, you get the rewards.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="group p-8 bg-background-light rounded-2xl border border-slate-200 hover:border-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -4 }}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl font-bold">
                  {step.icon}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {step.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
