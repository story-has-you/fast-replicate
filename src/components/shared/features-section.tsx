/**
 * Features Section Component
 * Highlight key product advantages and benefits
 */
import React from 'react';
import { Check, Zap, BarChart3, Clock, Headphones, CreditCard } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface FeaturesSectionProps {}

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = () => {
  const features: Feature[] = [
    {
      id: 'zero-config',
      title: 'Zero Configuration',
      description: 'No API keys or complex setup required. Start using AI models instantly.',
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: 'multiple-models',
      title: 'Multiple AI Models',
      description: 'Access a diverse collection of state-of-the-art AI models in one platform.',
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      id: 'subscription-based',
      title: 'Subscription Pricing',
      description: 'Transparent, predictable pricing with credit-based usage system.',
      icon: <CreditCard className="w-5 h-5" />
    },
    {
      id: 'real-time-results',
      title: 'Real-time Results',
      description: 'Get your AI-generated content quickly with optimized processing.',
      icon: <Clock className="w-5 h-5" />
    },
    {
      id: 'usage-analytics',
      title: 'Usage Statistics',
      description: 'Track your usage, monitor performance, and optimize your workflow.',
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      id: 'support',
      title: '24/7 Support',
      description: 'Get help whenever you need it with our dedicated support team.',
      icon: <Headphones className="w-5 h-5" />
    }
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black mb-4">
            Why Choose Fast Replicate?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful AI capabilities made simple and accessible for everyone
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id}
              className="bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white">
                  {feature.icon}
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <h3 className="font-semibold text-black">
                    {feature.title}
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed ml-13">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-black mb-2">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of creators using AI to build amazing content
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Start Free Trial
              </button>
              <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-colors">
                View Pricing Plans
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

FeaturesSection.displayName = 'FeaturesSection';

export default FeaturesSection;