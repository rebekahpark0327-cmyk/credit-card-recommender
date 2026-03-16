"use client";

import { motion } from "framer-motion";
import RecommendationCard from "./RecommendationCard";
import type { RecommendationResult } from "@/utils/recommendationEngine";

interface ResultsSectionProps {
  results: RecommendationResult[];
  onEditProfile: () => void;
}

const filterTabs = [
  "Best Overall",
  "No Annual Fee",
  "Travel Rewards",
  "Cash Back",
  "Low Interest",
];

export default function ResultsSection({
  results,
  onEditProfile,
}: ResultsSectionProps) {
  if (results.length === 0) return null;

  return (
    <section id="results" className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 py-8">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-4">
          <span className="hover:text-primary transition-colors cursor-pointer">
            Home
          </span>
          <span className="material-symbols-outlined text-xs">
            chevron_right
          </span>
          <span className="text-slate-900 font-medium">
            Credit Card Recommender
          </span>
        </nav>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="text-slate-900 text-4xl font-extrabold tracking-tight mb-2">
              Top Matches for You
            </h2>
            <p className="text-slate-600 text-lg">
              Based on your spending profile in Canada, we&apos;ve identified the
              cards that maximize your net annual value.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm font-semibold border border-slate-200">
              <span className="material-symbols-outlined text-sm">
                filter_list
              </span>
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm font-semibold border border-slate-200">
              <span className="material-symbols-outlined text-sm">sort</span>
              Sort by Net Value
            </button>
          </div>
        </div>
      </motion.div>

      <div className="flex gap-3 mb-10 overflow-x-auto pb-2 no-scrollbar">
        {filterTabs.map((tab, i) => (
          <button
            key={tab}
            className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
              i === 0
                ? "bg-primary/10 text-primary border border-primary/20 font-bold"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {results.map((result, index) => (
          <RecommendationCard
            key={result.card.id}
            result={result}
            rank={index + 1}
            index={index}
          />
        ))}
      </div>

      <motion.div
        className="mt-16 bg-primary/5 rounded-2xl p-8 border border-primary/20 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <span className="material-symbols-outlined text-5xl text-primary mb-4">
          analytics
        </span>
        <h3 className="text-2xl font-extrabold text-slate-900 mb-3">
          Refine Your Recommendation
        </h3>
        <p className="text-slate-600 max-w-lg mb-6 text-lg">
          Not seeing what you&apos;re looking for? Update your monthly spending
          categories to get even more precise results.
        </p>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="bg-primary text-white font-bold py-3 px-10 rounded-lg shadow-lg shadow-primary/30 hover:shadow-xl transition-all"
          onClick={onEditProfile}
        >
          Edit Spending Profile
        </motion.button>
      </motion.div>
    </section>
  );
}
