"use client";

import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import WhyUseSection from "@/components/WhyUseSection";
import SpendingForm from "@/components/SpendingForm";
import ResultsSection from "@/components/ResultsSection";
import ComparisonTable from "@/components/ComparisonTable";
import CompareBar from "@/components/CompareBar";
import InfoSection from "@/components/InfoSection";
import Footer from "@/components/Footer";
import {
  getRecommendations,
  type SpendingProfile,
  type Preferences,
  type RecommendationResult,
} from "@/utils/recommendationEngine";
import type { CreditCard } from "@/data/creditCards";

const MAX_COMPARE = 4;

export default function Home() {
  const [results, setResults] = useState<RecommendationResult[]>([]);
  const [compareCards, setCompareCards] = useState<CreditCard[]>([]);

  const handleFormSubmit = (
    spending: SpendingProfile,
    preferences: Preferences
  ) => {
    const recommendations = getRecommendations(spending, preferences);
    setResults(recommendations);
    setCompareCards([]);
  };

  const handleEditProfile = () => {
    document
      .getElementById("form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleCompare = useCallback((card: CreditCard) => {
    setCompareCards((prev) => {
      const exists = prev.some((c) => c.id === card.id);
      if (exists) return prev.filter((c) => c.id !== card.id);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, card];
    });
  }, []);

  const removeFromCompare = useCallback((cardId: string) => {
    setCompareCards((prev) => prev.filter((c) => c.id !== cardId));
  }, []);

  const clearCompare = useCallback(() => {
    setCompareCards([]);
  }, []);

  const scrollToComparison = useCallback(() => {
    document
      .getElementById("comparison")
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Navbar />
      <Hero />
      <HowItWorks />
      <WhyUseSection />
      <SpendingForm onSubmit={handleFormSubmit} />
      {results.length > 0 && (
        <ResultsSection
          results={results}
          onEditProfile={handleEditProfile}
          compareCards={compareCards}
          onToggleCompare={toggleCompare}
          maxCompare={MAX_COMPARE}
        />
      )}
      {compareCards.length >= 2 && (
        <ComparisonTable cards={compareCards} />
      )}
      {compareCards.length > 0 && (
        <CompareBar
          cards={compareCards}
          maxCompare={MAX_COMPARE}
          onRemove={removeFromCompare}
          onClear={clearCompare}
          onCompare={scrollToComparison}
        />
      )}
      <InfoSection />
      <Footer />
    </div>
  );
}
