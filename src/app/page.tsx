"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import WhyUseSection from "@/components/WhyUseSection";
import SpendingForm from "@/components/SpendingForm";
import ResultsSection from "@/components/ResultsSection";
import ComparisonTable from "@/components/ComparisonTable";
import InfoSection from "@/components/InfoSection";
import Footer from "@/components/Footer";
import {
  getRecommendations,
  type SpendingProfile,
  type Preferences,
  type RecommendationResult,
} from "@/utils/recommendationEngine";

export default function Home() {
  const [results, setResults] = useState<RecommendationResult[]>([]);

  const handleFormSubmit = (
    spending: SpendingProfile,
    preferences: Preferences
  ) => {
    const recommendations = getRecommendations(spending, preferences);
    setResults(recommendations);
  };

  const handleEditProfile = () => {
    document
      .getElementById("form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Navbar />
      <Hero />
      <HowItWorks />
      <WhyUseSection />
      <SpendingForm onSubmit={handleFormSubmit} />
      {results.length > 0 && (
        <ResultsSection results={results} onEditProfile={handleEditProfile} />
      )}
      <ComparisonTable />
      <InfoSection />
      <Footer />
    </div>
  );
}
