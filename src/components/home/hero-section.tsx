import React from 'react';
import { Button } from '@/components/ui/button';

/**
 * Hero section component for the homepage
 * Displays main heading, description and primary call-to-action buttons
 */
const HeroSection: React.FC = () => {
  return (
    <section className="bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          AI Models Made
          <span className="block text-gray-300">Simple & Fast</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Access powerful AI models through our subscription platform. 
          Generate text, images, audio, and video with just a few clicks.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-white text-black hover:bg-gray-200">
            Get Started Free
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
            View Models
          </Button>
        </div>
      </div>
    </section>
  );
};

HeroSection.displayName = 'HeroSection';

export default HeroSection;