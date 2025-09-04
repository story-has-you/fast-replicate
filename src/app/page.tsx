
/**
 * Home Page
 * Landing page with Hero, Categories, Popular Models, and Features
 */
import React from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/shared/hero-section';
import CategoryNavigation from '@/components/shared/category-navigation';
import PopularModels from '@/components/shared/popular-models';
import FeaturesSection from '@/components/shared/features-section';

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

      {/* Footer */}
      <Footer />
    </div>
  );
};

Home.displayName = "Home";

export default Home;
