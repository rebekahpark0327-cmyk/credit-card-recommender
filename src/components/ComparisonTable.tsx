"use client";

import { motion } from "framer-motion";
import type { CreditCard } from "@/data/creditCards";

interface ComparisonTableProps {
  cards: CreditCard[];
}

type CellValue =
  | { type: "text"; main: string; sub?: string | null; mainClass?: string }
  | { type: "lines"; lines: string[] }
  | { type: "badge"; main: string; color?: "green" | "blue" | "amber" };

function formatRate(rate: number): string {
  if (rate === 0) return "—";
  return `${(rate * 100).toFixed(rate >= 0.01 ? 0 : 1)}%`;
}

function getTopRewardCategories(card: CreditCard): string[] {
  const entries = Object.entries(card.rewardRates) as [string, number][];
  const labels: Record<string, string> = {
    groceries: "Groceries",
    gas: "Gas",
    dining: "Dining",
    travel: "Travel",
    other: "Other",
  };
  return entries
    .filter(([, rate]) => rate > 0)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([cat, rate]) => `${(rate * 100).toFixed(rate >= 0.01 ? 0 : 1)}% ${labels[cat]}`);
}

const rows: {
  icon: string;
  label: string;
  getValue: (card: CreditCard) => CellValue;
}[] = [
  {
    icon: "payments",
    label: "Annual Fee",
    getValue: (card) => ({
      type: "text",
      main: card.annualFee === 0 ? "Free" : `$${card.annualFee.toFixed(card.monthlyFee ? 2 : 0)}`,
      sub: card.monthlyFee ? `$${card.monthlyFee}/mo` : null,
      mainClass: card.annualFee === 0 ? "text-emerald-600" : undefined,
    }),
  },
  {
    icon: "card_giftcard",
    label: "Welcome Bonus",
    getValue: (card) => ({
      type: "text",
      main: card.welcomeBonus,
      sub: card.welcomeBonusValue > 0 ? `≈ $${card.welcomeBonusValue} value` : null,
      mainClass: "text-primary",
    }),
  },
  {
    icon: "trending_up",
    label: "Top Rewards",
    getValue: (card) => {
      const top = getTopRewardCategories(card);
      return top.length > 0
        ? { type: "lines", lines: top }
        : { type: "text", main: "No rewards" };
    },
  },
  {
    icon: "grocery",
    label: "Groceries",
    getValue: (card) => ({
      type: "text",
      main: formatRate(card.rewardRates.groceries),
      mainClass: card.rewardRates.groceries >= 0.04 ? "text-emerald-600" : undefined,
    }),
  },
  {
    icon: "restaurant",
    label: "Dining",
    getValue: (card) => ({
      type: "text",
      main: formatRate(card.rewardRates.dining),
      mainClass: card.rewardRates.dining >= 0.04 ? "text-emerald-600" : undefined,
    }),
  },
  {
    icon: "local_gas_station",
    label: "Gas",
    getValue: (card) => ({
      type: "text",
      main: formatRate(card.rewardRates.gas),
      mainClass: card.rewardRates.gas >= 0.04 ? "text-emerald-600" : undefined,
    }),
  },
  {
    icon: "flight",
    label: "Travel",
    getValue: (card) => ({
      type: "text",
      main: formatRate(card.rewardRates.travel),
      mainClass: card.rewardRates.travel >= 0.04 ? "text-emerald-600" : undefined,
    }),
  },
  {
    icon: "percent",
    label: "Interest Rate",
    getValue: (card) => ({
      type: "text",
      main: `${card.interestRate}%`,
      mainClass: card.interestRate < 15 ? "text-emerald-600" : undefined,
    }),
  },
  {
    icon: "public",
    label: "FX Fee",
    getValue: (card) => {
      const isZero = card.foreignExchangeFee === "0%";
      return isZero
        ? { type: "badge", main: "No FX Fee", color: "green" }
        : { type: "text", main: card.foreignExchangeFee };
    },
  },
  {
    icon: "account_balance_wallet",
    label: "Income Req.",
    getValue: (card) =>
      card.incomeRequirement === 0
        ? { type: "text", main: "None" }
        : { type: "text", main: `$${card.incomeRequirement.toLocaleString()}` },
  },
  {
    icon: "credit_score",
    label: "Min. Credit Score",
    getValue: (card) => ({
      type: "text",
      main: `${card.creditScoreMin}+`,
    }),
  },
  {
    icon: "sell",
    label: "Reward Type",
    getValue: (card) => ({
      type: "badge",
      main: card.rewardType === "travel" ? "Travel Points" : card.rewardType === "cashback" ? "Cash Back" : "Store Points",
      color: card.rewardType === "travel" ? "blue" : card.rewardType === "cashback" ? "green" : "amber",
    }),
  },
  {
    icon: "credit_card",
    label: "Network",
    getValue: (card) => ({
      type: "text",
      main: card.network === "amex" ? "American Express" : card.network === "visa" ? "Visa" : "Mastercard",
    }),
  },
  {
    icon: "stars",
    label: "Best For",
    getValue: (card) => ({
      type: "text",
      main: card.bestCategory,
      mainClass: "text-primary",
    }),
  },
];

const badgeColors = {
  green: "bg-emerald-100 text-emerald-700",
  blue: "bg-blue-100 text-blue-700",
  amber: "bg-amber-100 text-amber-700",
};

export default function ComparisonTable({ cards }: ComparisonTableProps) {
  if (cards.length < 2) return null;

  return (
    <section id="comparison" className="py-16 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2 text-slate-900">
                Side-by-Side Comparison
              </h2>
              <p className="text-slate-600 max-w-2xl">
                Comparing {cards.length} selected cards across all key features.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-50">
                  <th className="p-6 w-[180px] text-sm font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200 sticky left-0 bg-slate-50 z-10">
                    Card Features
                  </th>
                  {cards.map((card, i) => (
                    <th
                      key={card.id}
                      className="p-6 min-w-[200px] border-b border-slate-200"
                    >
                      <div className="flex flex-col gap-3">
                        <div className="w-28 h-18 rounded-lg shadow-inner overflow-hidden flex items-center justify-center bg-slate-100">
                          {card.imageUrl ? (
                            <img
                              src={card.imageUrl}
                              alt={card.name}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <div
                              className={`w-full h-full bg-gradient-to-br ${card.cardGradient}`}
                            />
                          )}
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 text-sm leading-tight block">
                            {card.name}
                          </span>
                          <span className="text-xs text-slate-500">{card.issuer}</span>
                        </div>
                        {i === 0 && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full w-max font-bold">
                            Your #1 Pick
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.label}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-5 border-b border-slate-100 sticky left-0 bg-white z-10">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-slate-400 text-[20px]">
                          {row.icon}
                        </span>
                        <span className="text-sm font-medium">{row.label}</span>
                      </div>
                    </td>
                    {cards.map((card) => {
                      const val = row.getValue(card);
                      return (
                        <td
                          key={card.id}
                          className="p-5 border-b border-slate-100"
                        >
                          {val.type === "lines" ? (
                            <div className="space-y-1">
                              {val.lines.map((line) => (
                                <p key={line} className="text-sm font-medium text-slate-700">
                                  {line}
                                </p>
                              ))}
                            </div>
                          ) : val.type === "badge" ? (
                            <span
                              className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                                badgeColors[val.color ?? "green"]
                              }`}
                            >
                              {val.main}
                            </span>
                          ) : (
                            <>
                              <span
                                className={`text-lg font-bold text-slate-900 ${
                                  val.mainClass ?? ""
                                }`}
                              >
                                {val.main}
                              </span>
                              {val.sub && (
                                <p className="text-xs text-slate-500 mt-1">
                                  {val.sub}
                                </p>
                              )}
                            </>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr className="bg-slate-50/50">
                  <td className="p-5 sticky left-0 bg-slate-50/50 z-10" />
                  {cards.map((card) => (
                    <td key={card.id} className="p-5">
                      <motion.a
                        href={card.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full py-3 px-4 bg-primary text-white rounded-lg font-bold text-sm hover:brightness-110 transition-all shadow-md flex items-center justify-center gap-1"
                      >
                        Apply Now
                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                      </motion.a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
