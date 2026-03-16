"use client";

import { motion } from "framer-motion";
import type { RecommendationResult } from "@/utils/recommendationEngine";

interface RecommendationCardProps {
  result: RecommendationResult;
  rank: number;
  index: number;
}

const issuerColors: Record<string, string> = {
  "American Express": "text-primary",
  RBC: "text-red-600",
  TD: "text-emerald-600",
  Scotiabank: "text-amber-600",
  CIBC: "text-rose-600",
  Tangerine: "text-orange-600",
  BMO: "text-blue-700",
  "Rogers Bank": "text-red-600",
  MBNA: "text-amber-700",
  "PC Financial": "text-red-600",
  "Canadian Tire": "text-red-600",
  "National Bank": "text-red-600",
  HSBC: "text-red-600",
  "Capital One": "text-blue-700",
  "Neo Financial": "text-blue-600",
  "Home Trust": "text-teal-600",
};

export default function RecommendationCard({
  result,
  rank,
  index,
}: RecommendationCardProps) {
  const { card, yearlyRewards, netValue, matchReason } = result;
  const isTopPick = rank === 1;
  const matchPercent = Math.min(
    99,
    Math.max(70, Math.round(85 + netValue / 100))
  );

  return (
    <motion.div
      className={`group bg-white rounded-xl overflow-hidden flex flex-col lg:flex-row relative ${
        isTopPick
          ? "border-2 border-primary shadow-lg"
          : "border border-slate-200 shadow-sm hover:shadow-md"
      } transition-shadow`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ y: -2 }}
    >
      <div
        className={`absolute top-0 right-0 text-[10px] uppercase tracking-widest font-black px-4 py-1 rounded-bl-lg ${
          isTopPick
            ? "bg-primary text-white"
            : "bg-slate-100 text-slate-600"
        }`}
      >
        {matchPercent}% Match
      </div>

      <div className="lg:w-1/3 p-8 flex items-center justify-center bg-slate-50">
        {card.imageUrl ? (
          <div className="w-full max-w-[300px] flex items-center justify-center">
            <img
              src={card.imageUrl}
              alt={card.name}
              className="w-full h-auto rounded-xl shadow-2xl object-contain"
            />
          </div>
        ) : (
          <div
            className={`w-full max-w-[300px] aspect-[1.58/1] rounded-xl shadow-2xl bg-gradient-to-br ${card.cardGradient} p-6 flex flex-col justify-between text-white relative overflow-hidden`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl" />
            <div className="flex justify-between items-start">
              <span className="material-symbols-outlined text-3xl opacity-80">
                credit_card
              </span>
              <span className="text-xs font-bold tracking-widest opacity-60 uppercase">
                {card.network}
              </span>
            </div>
            <div className="space-y-1">
              <div className="h-8 w-12 bg-yellow-600/20 rounded border border-yellow-600/40" />
              <div className="text-xs font-semibold opacity-80 truncate">
                {card.name.split(" ").slice(0, 3).join(" ")}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="lg:w-2/3 p-8 flex flex-col">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`${issuerColors[card.issuer] ?? "text-slate-600"} font-bold text-sm tracking-wide`}
            >
              {card.issuer}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="text-slate-500 text-sm">{card.category}</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900">{card.name}</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div>
            <p className="text-slate-500 text-xs uppercase font-bold tracking-tighter mb-1">
              Net Value
            </p>
            <p className="text-primary text-xl font-black">
              ${netValue.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-slate-500 text-xs uppercase font-bold tracking-tighter mb-1">
              Yearly Rewards
            </p>
            <p className="text-slate-900 text-xl font-black">
              ${yearlyRewards.toFixed(0)}
            </p>
          </div>
          <div>
            <p className="text-slate-500 text-xs uppercase font-bold tracking-tighter mb-1">
              Annual Fee
            </p>
            <p className="text-slate-900 text-xl font-black">
              ${card.annualFee.toFixed(card.monthlyFee ? 2 : 0)}
            </p>
          </div>
          <div>
            <p className="text-slate-500 text-xs uppercase font-bold tracking-tighter mb-1">
              Welcome Bonus
            </p>
            <p className="text-emerald-600 text-xl font-black">
              {card.welcomeBonus}
            </p>
          </div>
        </div>

        <div
          className={`rounded-lg p-4 mb-8 border ${
            isTopPick
              ? "bg-primary/5 border-primary/10"
              : "bg-slate-50 border-slate-200"
          }`}
        >
          <div className="flex gap-3">
            <span
              className={`material-symbols-outlined ${
                isTopPick ? "text-primary" : "text-slate-400"
              }`}
            >
              {isTopPick ? "auto_awesome" : "info"}
            </span>
            <p className="text-slate-700 text-sm leading-relaxed">
              <span className="font-bold text-slate-900">
                Why it&apos;s a match:
              </span>{" "}
              {matchReason}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-auto">
          <motion.a
            href={card.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`flex-1 min-w-[140px] font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 ${
              isTopPick
                ? "bg-primary hover:bg-primary/90 text-white"
                : "bg-primary/10 text-primary hover:bg-primary/20"
            }`}
          >
            Apply Now
            <span className="material-symbols-outlined text-sm">
              open_in_new
            </span>
          </motion.a>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 min-w-[140px] bg-white border border-slate-200 text-slate-700 font-bold py-3 px-6 rounded-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            onClick={() =>
              document
                .getElementById("comparison")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span className="material-symbols-outlined text-sm">
              compare_arrows
            </span>
            Compare
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-4 py-3 rounded-lg border border-slate-200 text-slate-500 hover:text-red-500 transition-all"
          >
            <span className="material-symbols-outlined">favorite</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
