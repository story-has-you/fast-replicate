import React from 'react';
import { Button } from '@/components/ui/button';

/**
 * Call-to-action section component encouraging users to get started
 */
const CtaSection: React.FC = () => {
  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Join thousands of developers already building with Fast Replicate
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" className="bg-white text-black hover:bg-gray-100">
            Start Free Trial
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
            View Pricing
          </Button>
        </div>
      </div>
    </section>
  );
};

CtaSection.displayName = 'CtaSection';

export default CtaSection;