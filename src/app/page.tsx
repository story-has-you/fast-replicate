
/**
 * Home Page
 * Redesigned as a premium tool workspace page with 100vh first screen
 * and comprehensive SEO content sections below
 */
import React from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ToolWorkspace from '@/components/shared/tool-workspace';
import ModelIntroductionSection from '@/components/shared/model-introduction-section';
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

      {/* Tool Workspace - 100vh First Screen */}
      <ToolWorkspace
        modelTitle="Stable Diffusion XL Image Generation"
        modelDescription="High-quality AI art creation, generate professional images with a single click"
        currentCredits={45}
        totalCredits={100}
        creditCost={1}
      />

      {/* Second Screen - Model Introduction (Primary SEO Content) */}
      <ModelIntroductionSection 
        modelName="Stable Diffusion XL"
        modelVersion="1.0"
      />

      {/* Additional SEO Content Sections */}
      <div className="bg-white">
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
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

Home.displayName = "Home";

export default Home;
