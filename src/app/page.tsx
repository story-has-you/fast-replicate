import {
  CtaSection,
  FeaturesSection,
  HeroSection,
  ModelCategoriesSection,
  ToolSection
} from "@/components/home";
import { MainLayout } from "@/components/layout";

/**
 * Home page component
 * Renders the main landing page with all key sections
 */
import React from "react";

const Home: React.FC = () => {
  return (
    <MainLayout>
      <HeroSection />
      <ToolSection />
      <FeaturesSection />
      <ModelCategoriesSection />
      <CtaSection />
    </MainLayout>
  );
};

Home.displayName = "Home";

export default Home;
