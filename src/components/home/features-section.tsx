import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface FeatureItem {
  title: string;
  description: string;
  content: string;
  icon: string;
}

/**
 * Features section component displaying key benefits of the platform
 */
const FeaturesSection: React.FC = () => {
  const features: FeatureItem[] = [
    {
      title: 'Lightning Fast',
      description: 'Get results in seconds with our optimized infrastructure',
      content: 'Our platform is built for speed. Experience minimal latency and maximum throughput for all your AI model requests.',
      icon: '⚡'
    },
    {
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with 99.9% uptime guarantee',
      content: 'Your data is protected with industry-standard encryption and our infrastructure ensures consistent availability.',
      icon: '🔒'
    },
    {
      title: 'Easy Integration',
      description: 'Simple API with comprehensive documentation',
      content: 'Get started in minutes with our developer-friendly API and extensive documentation with code examples.',
      icon: '💡'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Fast Replicate?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Built for developers and businesses who need reliable AI model access
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{feature.icon}</span>
                  </div>
                  {feature.title}
                </CardTitle>
                <CardDescription>
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {feature.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

FeaturesSection.displayName = 'FeaturesSection';

export default FeaturesSection;