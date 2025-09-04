import {
  CtaSection,
  FeaturesSection,
  HeroSection,
  ModelCategoriesSection
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
      <FeaturesSection />
      <ModelCategoriesSection />
      <CtaSection />
    </MainLayout>
  );
};

Home.displayName = "Home";

export default Home;
