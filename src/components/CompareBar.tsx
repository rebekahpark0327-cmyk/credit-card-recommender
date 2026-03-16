"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { CreditCard } from "@/data/creditCards";

interface CompareBarProps {
  cards: CreditCard[];
  maxCompare: number;
  onRemove: (cardId: string) => void;
  onClear: () => void;
  onCompare: () => void;
}

export default function CompareBar({
  cards,
  maxCompare,
  onRemove,
  onClear,
  onCompare,
}: CompareBarProps) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-[0_-8px_30px_rgba(0,0,0,0.12)]"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className="material-symbols-outlined text-blue-500">
              compare_arrows
            </span>
            <span className="text-sm font-bold text-slate-900">
              Compare
            </span>
            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full font-medium">
              {cards.length}/{maxCompare}
            </span>
          </div>

          <div className="flex gap-3 overflow-x-auto flex-1 no-scrollbar">
            <AnimatePresence mode="popLayout">
              {cards.map((card) => (
                <motion.div
                  key={card.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg pl-2 pr-1 py-1 shrink-0"
                >
                  <div className="w-10 h-7 rounded overflow-hidden bg-slate-100 flex items-center justify-center shrink-0">
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
                  <span className="text-xs font-semibold text-slate-700 whitespace-nowrap max-w-[120px] truncate">
                    {card.name.split(" ").slice(0, 3).join(" ")}
                  </span>
                  <button
                    onClick={() => onRemove(card.id)}
                    className="w-5 h-5 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0"
                  >
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </motion.div>
              ))}

              {Array.from({ length: maxCompare - cards.length }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="w-[160px] h-9 border-2 border-dashed border-slate-200 rounded-lg shrink-0 flex items-center justify-center"
                >
                  <span className="text-xs text-slate-400">+ Add card</span>
                </div>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onClear}
              className="text-sm text-slate-500 hover:text-slate-700 font-medium px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Clear
            </button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onCompare}
              disabled={cards.length < 2}
              className={`text-sm font-bold px-5 py-2.5 rounded-lg transition-all flex items-center gap-1.5 ${
                cards.length >= 2
                  ? "bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/25"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              <span className="material-symbols-outlined text-sm">
                compare
              </span>
              Compare {cards.length >= 2 ? `(${cards.length})` : ""}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
