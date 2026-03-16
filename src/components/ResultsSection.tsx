"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RecommendationCard from "./RecommendationCard";
import type { RecommendationResult } from "@/utils/recommendationEngine";
import type { CreditCard } from "@/data/creditCards";

interface ResultsSectionProps {
  results: RecommendationResult[];
  onEditProfile: () => void;
  compareCards: CreditCard[];
  onToggleCompare: (card: CreditCard) => void;
  maxCompare: number;
}

type FilterTab =
  | "best_overall"
  | "no_annual_fee"
  | "travel"
  | "cashback"
  | "low_interest";

type SortMode = "net_value" | "rewards" | "fee_low" | "bonus";

const filterTabs: { id: FilterTab; label: string }[] = [
  { id: "best_overall", label: "Best Overall" },
  { id: "no_annual_fee", label: "No Annual Fee" },
  { id: "travel", label: "Travel Rewards" },
  { id: "cashback", label: "Cash Back" },
  { id: "low_interest", label: "Low Interest" },
];

const sortOptions: { id: SortMode; label: string }[] = [
  { id: "net_value", label: "Net Value" },
  { id: "rewards", label: "Yearly Rewards" },
  { id: "fee_low", label: "Lowest Fee" },
  { id: "bonus", label: "Welcome Bonus" },
];

export default function ResultsSection({
  results,
  onEditProfile,
  compareCards,
  onToggleCompare,
  maxCompare,
}: ResultsSectionProps) {
  const [activeTab, setActiveTab] = useState<FilterTab>("best_overall");
  const [sortMode, setSortMode] = useState<SortMode>("net_value");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showAllCards, setShowAllCards] = useState(false);

  const filteredAndSorted = useMemo(() => {
    let filtered = results;

    if (activeTab !== "best_overall") {
      filtered = results.filter((r) => {
        const tags = r.card.tags;
        switch (activeTab) {
          case "no_annual_fee":
            return r.card.annualFee === 0;
          case "travel":
            return tags.includes("travel") || r.card.rewardType === "travel";
          case "cashback":
            return tags.includes("cashback") || r.card.rewardType === "cashback";
          case "low_interest":
            return tags.includes("low_interest") || r.card.interestRate < 15;
          default:
            return true;
        }
      });
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortMode) {
        case "net_value":
          return b.netValue - a.netValue;
        case "rewards":
          return b.yearlyRewards - a.yearlyRewards;
        case "fee_low":
          return a.card.annualFee - b.card.annualFee;
        case "bonus":
          return b.card.welcomeBonusValue - a.card.welcomeBonusValue;
        default:
          return 0;
      }
    });

    return sorted;
  }, [results, activeTab, sortMode]);

  const displayResults = showAllCards
    ? filteredAndSorted
    : filteredAndSorted.slice(0, 5);

  const compareCardIds = new Set(compareCards.map((c) => c.id));

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
              Based on your spending profile, we matched{" "}
              <span className="font-bold text-primary">
                {results.length} cards
              </span>{" "}
              and ranked them by net annual value. Showing{" "}
              {filteredAndSorted.length} in this view.
            </p>
          </div>
          <div className="flex gap-2 relative">
            <div className="relative">
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm font-semibold border border-slate-200 hover:bg-slate-200 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">sort</span>
                Sort:{" "}
                {sortOptions.find((s) => s.id === sortMode)?.label}
              </button>
              <AnimatePresence>
                {showSortMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="absolute right-0 top-12 bg-white border border-slate-200 rounded-lg shadow-xl z-20 w-48 overflow-hidden"
                  >
                    {sortOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setSortMode(opt.id);
                          setShowSortMenu(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm font-medium hover:bg-slate-50 transition-colors ${
                          sortMode === opt.id
                            ? "text-primary bg-primary/5"
                            : "text-slate-700"
                        }`}
                      >
                        {opt.label}
                        {sortMode === opt.id && (
                          <span className="material-symbols-outlined text-sm float-right">
                            check
                          </span>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex gap-3 mb-10 overflow-x-auto pb-2 no-scrollbar">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setShowAllCards(false);
            }}
            className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "bg-primary/10 text-primary border border-primary/20 font-bold"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {filteredAndSorted.length}
              </span>
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeTab}-${sortMode}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          {displayResults.length > 0 ? (
            displayResults.map((result, index) => (
              <RecommendationCard
                key={result.card.id}
                result={result}
                rank={index + 1}
                index={index}
                isComparing={compareCardIds.has(result.card.id)}
                onToggleCompare={() => onToggleCompare(result.card)}
                compareFull={compareCards.length >= maxCompare}
              />
            ))
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
              <span className="material-symbols-outlined text-5xl text-slate-300 mb-4">
                search_off
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                No cards match this filter
              </h3>
              <p className="text-slate-500">
                Try a different category or adjust your spending profile.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {!showAllCards && filteredAndSorted.length > 5 && (
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <button
            onClick={() => setShowAllCards(true)}
            className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 font-bold py-3 px-8 rounded-xl hover:bg-slate-50 transition-all shadow-sm"
          >
            Show All {filteredAndSorted.length} Cards
            <span className="material-symbols-outlined text-sm">
              expand_more
            </span>
          </button>
        </motion.div>
      )}

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
