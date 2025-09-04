
/**
 * Home Page
 * Complete landing page with Hero section, tool navigation, 
 * comprehensive SEO content areas, and call-to-action elements
 */
import React from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/shared/hero-section';
import CategoryNavigation from '@/components/shared/category-navigation';
import PopularModels from '@/components/shared/popular-models';
import FeaturesSection from '@/components/shared/features-section';
import AIFeaturesSection from '@/components/shared/ai-features-section';
import UseCasesSection from '@/components/shared/use-cases-section';
import ModelComparisonSection from '@/components/shared/model-comparison-section';
import TechAdvantagesSection from '@/components/shared/tech-advantages-section';
import FAQSection from '@/components/shared/faq-section';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Category Navigation */}
      <CategoryNavigation />

      {/* Popular Models */}
      <PopularModels />

      {/* Features Section */}
      <FeaturesSection />

      {/* SEO Content Sections */}
      {/* AI Features and Capabilities */}
      <AIFeaturesSection />

      {/* Use Cases and Success Stories */}
      <UseCasesSection />

      {/* Model Comparison and Selection */}
      <ModelComparisonSection />

      {/* Technical Advantages and Infrastructure */}
      <TechAdvantagesSection />

      {/* Frequently Asked Questions */}
      <FAQSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

Home.displayName = "Home";

export default Home;
