"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { SpendingProfile, Preferences } from "@/utils/recommendationEngine";

interface SpendingFormProps {
  onSubmit: (spending: SpendingProfile, preferences: Preferences) => void;
}

export default function SpendingForm({ onSubmit }: SpendingFormProps) {
  const [spending, setSpending] = useState<SpendingProfile>({
    groceries: 0,
    gas: 0,
    dining: 0,
    travel: 0,
    other: 0,
  });

  const [preferences, setPreferences] = useState<Preferences>({
    rewardType: "no_preference",
    annualFee: "any",
    incomeRange: "$60,000 - $80,000",
    creditScore: "Good (660-724)",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onSubmit(spending, preferences);
      setIsSubmitting(false);
      setTimeout(() => {
        document
          .getElementById("results")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }, 600);
  };

  const spendingFields = [
    { key: "groceries" as const, label: "Groceries", placeholder: "500" },
    { key: "gas" as const, label: "Gas & Transit", placeholder: "200" },
    {
      key: "dining" as const,
      label: "Dining & Entertainment",
      placeholder: "300",
    },
    { key: "travel" as const, label: "Travel", placeholder: "150" },
  ];

  return (
    <section id="form" className="py-10 px-4 sm:px-6 flex justify-center">
      <motion.div
        className="w-full max-w-[800px] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-8 border-b border-slate-200 bg-slate-50">
          <h2 className="text-slate-900 text-3xl font-black leading-tight tracking-tight mb-2">
            Find Your Perfect Credit Card
          </h2>
          <p className="text-slate-600 text-lg">
            Tell us about your spending habits to get personalized Canadian
            credit card recommendations.
          </p>
        </div>

        <form className="p-8 space-y-10" onSubmit={handleSubmit}>
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">
                account_balance_wallet
              </span>
              <h3 className="text-slate-900 text-xl font-bold">
                Monthly Spending (CAD)
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {spendingFields.map((field) => (
                <div
                  key={field.key}
                  className="flex flex-col gap-2"
                >
                  <label className="text-slate-700 text-sm font-semibold">
                    {field.label}
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      $
                    </span>
                    <input
                      className="w-full pl-8 pr-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder={field.placeholder}
                      type="number"
                      min="0"
                      value={spending[field.key] || ""}
                      onChange={(e) =>
                        setSpending((prev) => ({
                          ...prev,
                          [field.key]: Number(e.target.value) || 0,
                        }))
                      }
                    />
                  </div>
                </div>
              ))}
              <div
                className="flex flex-col gap-2 md:col-span-2"
              >
                <label className="text-slate-700 text-sm font-semibold">
                  Other Monthly Bills
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    $
                  </span>
                  <input
                    className="w-full pl-8 pr-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="1000"
                    type="number"
                    min="0"
                    value={spending.other || ""}
                    onChange={(e) =>
                      setSpending((prev) => ({
                        ...prev,
                        other: Number(e.target.value) || 0,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">
                tune
              </span>
              <h3 className="text-slate-900 text-xl font-bold">
                Preferences & Eligibility
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-slate-700 text-sm font-semibold">
                  Reward Type
                </label>
                <select
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none transition-all"
                  value={preferences.rewardType}
                  onChange={(e) =>
                    setPreferences((prev) => ({
                      ...prev,
                      rewardType: e.target.value as Preferences["rewardType"],
                    }))
                  }
                >
                  <option value="no_preference">No Preference</option>
                  <option value="cashback">Cashback</option>
                  <option value="travel">Travel Points</option>
                  <option value="store">Store Rewards</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-700 text-sm font-semibold">
                  Annual Fee
                </label>
                <select
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none transition-all"
                  value={preferences.annualFee}
                  onChange={(e) =>
                    setPreferences((prev) => ({
                      ...prev,
                      annualFee: e.target.value as Preferences["annualFee"],
                    }))
                  }
                >
                  <option value="any">Any Fee</option>
                  <option value="no_fee">No Fee Only</option>
                  <option value="low_fee">Low Fee (&lt;$120)</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-700 text-sm font-semibold">
                  Annual Income (CAD)
                </label>
                <select
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none transition-all"
                  value={preferences.incomeRange}
                  onChange={(e) =>
                    setPreferences((prev) => ({
                      ...prev,
                      incomeRange: e.target.value,
                    }))
                  }
                >
                  <option>Under $40,000</option>
                  <option>$40,000 - $60,000</option>
                  <option>$60,000 - $80,000</option>
                  <option>$80,000 - $120,000</option>
                  <option>$120,000+</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-700 text-sm font-semibold">
                  Estimated Credit Score
                </label>
                <select
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none transition-all"
                  value={preferences.creditScore}
                  onChange={(e) =>
                    setPreferences((prev) => ({
                      ...prev,
                      creditScore: e.target.value,
                    }))
                  }
                >
                  <option>Poor (300-574)</option>
                  <option>Fair (575-659)</option>
                  <option>Good (660-724)</option>
                  <option>Very Good (725-759)</option>
                  <option>Excellent (760+)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <motion.button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-lg"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <motion.span
                  className="material-symbols-outlined animate-spin"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  progress_activity
                </motion.span>
              ) : (
                <>
                  <span>Get My Recommendations</span>
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </>
              )}
            </motion.button>
            <p className="text-center text-slate-500 text-xs mt-4">
              We do not store your personal data. Recommendations are calculated
              locally based on your inputs.
            </p>
          </div>
        </form>

        <div className="px-8 pb-10">
          <div className="bg-primary/5 rounded-xl p-6 border border-primary/20 flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-1/3 rounded-lg overflow-hidden flex items-center justify-center bg-slate-100">
              <img
                src="/cards/rbc-avion.png"
                alt="RBC Avion Visa Infinite"
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
            <div className="flex-1 space-y-2">
              <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full">
                Top Pick for Travel
              </span>
              <h3 className="text-slate-900 font-bold text-lg leading-snug">
                Did you know?
              </h3>
              <p className="text-slate-600 text-sm">
                Most Canadians can save over $400/year in annual value by
                switching to a card that matches their top spending category.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
