import { CreditCard, creditCards } from "@/data/creditCards";

export interface SpendingProfile {
  groceries: number;
  gas: number;
  dining: number;
  travel: number;
  other: number;
}

export interface Preferences {
  rewardType: "cashback" | "travel" | "store" | "no_preference";
  annualFee: "any" | "no_fee" | "low_fee";
  incomeRange: string;
  creditScore: string;
}

export interface RecommendationResult {
  card: CreditCard;
  yearlyRewards: number;
  netValue: number;
  matchScore: number;
  matchReason: string;
}

function parseIncomeRange(range: string): number {
  const map: Record<string, number> = {
    "Under $40,000": 30000,
    "$40,000 - $60,000": 50000,
    "$60,000 - $80,000": 70000,
    "$80,000 - $120,000": 100000,
    "$120,000+": 150000,
  };
  return map[range] ?? 50000;
}

function parseCreditScore(range: string): number {
  const map: Record<string, number> = {
    "Poor (300-574)": 450,
    "Fair (575-659)": 620,
    "Good (660-724)": 690,
    "Very Good (725-759)": 740,
    "Excellent (760+)": 790,
  };
  return map[range] ?? 690;
}

export function getRecommendations(
  spending: SpendingProfile,
  preferences: Preferences
): RecommendationResult[] {
  const income = parseIncomeRange(preferences.incomeRange);
  const creditScore = parseCreditScore(preferences.creditScore);

  const results: RecommendationResult[] = creditCards
    .filter((card) => {
      if (card.incomeRequirement > 0 && income < card.incomeRequirement)
        return false;
      if (creditScore < card.creditScoreMin) return false;
      if (
        preferences.annualFee === "no_fee" &&
        card.annualFee > 0
      )
        return false;
      if (
        preferences.annualFee === "low_fee" &&
        card.annualFee > 120
      )
        return false;
      return true;
    })
    .map((card) => {
      const yearlyRewards =
        spending.groceries * 12 * card.rewardRates.groceries +
        spending.gas * 12 * card.rewardRates.gas +
        spending.dining * 12 * card.rewardRates.dining +
        spending.travel * 12 * card.rewardRates.travel +
        spending.other * 12 * card.rewardRates.other;

      const netValue = yearlyRewards - card.annualFee;

      let matchScore = netValue;

      if (
        preferences.rewardType !== "no_preference" &&
        card.rewardType === preferences.rewardType
      ) {
        matchScore *= 1.15;
      }

      matchScore += card.welcomeBonusValue * 0.1;

      const topCategory = Object.entries(spending).sort(
        (a, b) => b[1] - a[1]
      )[0][0] as keyof SpendingProfile;

      const matchReason = generateMatchReason(card, spending, topCategory);

      return {
        card,
        yearlyRewards: Math.round(yearlyRewards * 100) / 100,
        netValue: Math.round(netValue * 100) / 100,
        matchScore,
        matchReason,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  return results;
}

function generateMatchReason(
  card: CreditCard,
  spending: SpendingProfile,
  topCategory: keyof SpendingProfile
): string {
  const categoryLabels: Record<string, string> = {
    groceries: "groceries",
    gas: "gas and transit",
    dining: "dining out",
    travel: "travel",
    other: "everyday purchases",
  };

  const topSpend = spending[topCategory];
  const monthlyTotal = Object.values(spending).reduce((a, b) => a + b, 0);
  const rate = card.rewardRates[topCategory];
  const rateMultiplier = Math.round(rate * 100);

  if (topCategory === "groceries" || topCategory === "dining") {
    return `Your high monthly spend on ${categoryLabels[topCategory]} ($${topSpend.toLocaleString()}+) earns you ${rateMultiplier}% back per dollar, maximizing your return compared to standard cards.`;
  }

  if (topCategory === "travel") {
    return `Excellent for your frequent travel spending. Points transfer flexibility and comprehensive travel insurance align with your lifestyle.`;
  }

  if (topCategory === "gas") {
    return `Top-tier ${rateMultiplier}% rewards on gas and recurring bills matches your spending patterns. Simple redemption for direct credit.`;
  }

  return `With $${monthlyTotal.toLocaleString()}/month in total spending, this card's balanced reward rates give you the best overall net value.`;
}
