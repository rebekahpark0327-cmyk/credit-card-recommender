"use client";

import { motion } from "framer-motion";
import { creditCards } from "@/data/creditCards";

const comparisonCards = [
  creditCards.find((c) => c.id === "amex-cobalt")!,
  creditCards.find((c) => c.id === "scotiabank-gold")!,
  creditCards.find((c) => c.id === "td-first-class")!,
];

const rewardRateLabels: Record<string, string[]> = {
  "amex-cobalt": ["5x Food/Drink", "3x Streaming", "2x Travel"],
  "scotiabank-gold": ["6x Groceries", "5x Dining/Movie", "3x Transit"],
  "td-first-class": ["9x Expedia/TD", "6x Groceries/Dining", "4.5x Recurring Bills"],
};

type CellValue =
  | { type: "text"; main: string; sub?: string | null; mainClass?: string }
  | { type: "lines"; lines: string[] }
  | { type: "badge"; main: string };

type CardType = (typeof comparisonCards)[number];

const rows: { icon: string; label: string; getValue: (card: CardType) => CellValue }[] = [
  {
    icon: "payments",
    label: "Annual Fee",
    getValue: (card) => ({
      type: "text",
      main: `$${card.annualFee.toFixed(card.monthlyFee ? 2 : 0)}`,
      sub: card.monthlyFee ? `$${card.monthlyFee}/mo` : null,
    }),
  },
  {
    icon: "card_giftcard",
    label: "Welcome Bonus",
    getValue: (card) => ({
      type: "text",
      main: card.welcomeBonus,
      sub: `Approx. $${card.welcomeBonusValue} value`,
      mainClass: "text-primary",
    }),
  },
  {
    icon: "trending_up",
    label: "Reward Rate",
    getValue: (card) => ({
      type: "lines",
      lines: rewardRateLabels[card.id] || [],
    }),
  },
  {
    icon: "account_balance_wallet",
    label: "Income Req.",
    getValue: (card) =>
      card.incomeRequirement === 0
        ? { type: "text", main: "N/A", sub: "(Soft requirement)" }
        : { type: "text", main: `$${card.incomeRequirement.toLocaleString()}` },
  },
  {
    icon: "public",
    label: "Foreign Exchange",
    getValue: (card) => {
      const isZero = card.foreignExchangeFee === "0%";
      return isZero
        ? { type: "badge", main: "0% (None)" }
        : { type: "text", main: card.foreignExchangeFee };
    },
  },
  {
    icon: "stars",
    label: "Best Category",
    getValue: (card) => ({
      type: "text",
      main: card.bestCategory,
    }),
  },
];

export default function ComparisonTable() {
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
                Compare Credit Cards
              </h2>
              <p className="text-slate-600 max-w-2xl">
                We&apos;ve analyzed over 150 Canadian credit cards to find your
                best matches. Review the side-by-side details below.
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
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-slate-50">
                  <th className="p-6 w-[220px] text-sm font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                    Card Features
                  </th>
                  {comparisonCards.map((card, i) => (
                    <th
                      key={card.id}
                      className="p-6 min-w-[220px] border-b border-slate-200"
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
                        <span className="font-bold text-slate-900">
                          {card.name.split(" ").slice(0, 2).join(" ")}
                        </span>
                        {i === 0 && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full w-max font-bold">
                            Top Pick
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
                    <td className="p-6 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-slate-400 text-[20px]">
                          {row.icon}
                        </span>
                        <span className="text-sm font-medium">{row.label}</span>
                      </div>
                    </td>
                    {comparisonCards.map((card) => {
                      const val = row.getValue(card);
                      return (
                        <td
                          key={card.id}
                          className="p-6 border-b border-slate-100"
                        >
                          {val.type === "lines" ? (
                            <div className="space-y-1">
                              {val.lines.map((line) => (
                                <p key={line} className="text-sm">
                                  {line}
                                </p>
                              ))}
                            </div>
                          ) : val.type === "badge" ? (
                            <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded">
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
                  <td className="p-6" />
                  {comparisonCards.map((card) => (
                    <td key={card.id} className="p-6">
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

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "verified_user",
              title: "Insurance Coverage",
              text: "All three cards offer comprehensive travel insurance, including Emergency Medical and Flight Delay. Amex Cobalt provides superior mobile device protection.",
            },
            {
              icon: "local_airport",
              title: "Lounge Access",
              text: "The TD First Class Visa offers limited lounge pass discounts. Amex cards do not include complimentary lounge access in these versions.",
            },
            {
              icon: "redeem",
              title: "Points Value",
              text: "Amex Membership Rewards are widely considered the most flexible and valuable points in Canada, transferable to multiple airlines 1:1.",
            },
          ].map((info, i) => (
            <motion.div
              key={info.title}
              className="p-5 bg-white rounded-xl border border-slate-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
            >
              <h4 className="text-sm font-bold mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  {info.icon}
                </span>
                {info.title}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {info.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
