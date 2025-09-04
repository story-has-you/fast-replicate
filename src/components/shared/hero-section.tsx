/**
 * Hero Section Component
 * Main landing section with headline, description, and call-to-action buttons
 */
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface HeroSectionProps {}

const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight">
              Fast Replicate
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 font-medium">
              一键调用顶级AI模型
            </p>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto">
              无需API密钥，订阅即用，快速出结果
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              className="bg-black hover:bg-gray-800 text-white min-w-[200px] h-12"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Start Free Trial
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 min-w-[180px] h-12"
            >
              View Pricing
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Social Proof */}
          <div className="pt-8">
            <p className="text-sm text-gray-500 mb-4">
              Trusted by developers and creators worldwide
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>5+ AI Models</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>1000+ Users</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Fast Generation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

HeroSection.displayName = 'HeroSection';

export default HeroSection;