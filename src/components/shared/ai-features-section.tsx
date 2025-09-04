/**
 * AI Features Section Component
 * Showcases AI tool capabilities and benefits with detailed descriptions
 */
import React from 'react';
import { Brain, Cpu, Image, MessageSquare, Music, Video, Zap, Globe } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface AIFeaturesSectionProps {}

interface AIFeature {
  id: string;
  title: string;
  description: string;
  details: string;
  icon: React.ReactNode;
  category: 'generation' | 'processing' | 'enhancement' | 'analysis';
}

const AIFeaturesSection: React.FC<AIFeaturesSectionProps> = () => {
  const aiFeatures: AIFeature[] = [
    {
      id: 'text-generation',
      title: 'Advanced Text Generation',
      description: 'Generate high-quality content with state-of-the-art language models',
      details: 'From creative writing to technical documentation, our AI models understand context and produce coherent, relevant text that matches your specific requirements.',
      icon: <MessageSquare className="w-6 h-6" />,
      category: 'generation'
    },
    {
      id: 'image-creation',
      title: 'Image & Art Creation',
      description: 'Create stunning visuals and artwork from text descriptions',
      details: 'Transform your ideas into beautiful images, illustrations, and digital art using cutting-edge diffusion models trained on millions of high-quality images.',
      icon: <Image className="w-6 h-6" />,
      category: 'generation'
    },
    {
      id: 'video-synthesis',
      title: 'Video Synthesis',
      description: 'Generate dynamic videos and animations with AI',
      details: 'Create engaging video content, animations, and visual effects using advanced neural networks that understand motion and temporal relationships.',
      icon: <Video className="w-6 h-6" />,
      category: 'generation'
    },
    {
      id: 'audio-processing',
      title: 'Audio & Music Processing',
      description: 'Generate music, voices, and sound effects with AI',
      details: 'Compose original music, synthesize natural-sounding voices, or create unique sound effects using specialized audio generation models.',
      icon: <Music className="w-6 h-6" />,
      category: 'generation'
    },
    {
      id: 'intelligent-analysis',
      title: 'Intelligent Content Analysis',
      description: 'Analyze and understand content across multiple formats',
      details: 'Extract insights, classify content, detect patterns, and understand context from text, images, audio, and video with advanced AI analysis.',
      icon: <Brain className="w-6 h-6" />,
      category: 'analysis'
    },
    {
      id: 'real-time-processing',
      title: 'Real-time Processing',
      description: 'Get instant results with optimized AI inference',
      details: 'Experience lightning-fast generation and processing with our optimized infrastructure designed for real-time AI applications.',
      icon: <Zap className="w-6 h-6" />,
      category: 'processing'
    },
    {
      id: 'content-enhancement',
      title: 'Content Enhancement',
      description: 'Improve and refine existing content automatically',
      details: 'Enhance image quality, upscale resolutions, improve audio clarity, or refine text quality using specialized enhancement models.',
      icon: <Cpu className="w-6 h-6" />,
      category: 'enhancement'
    },
    {
      id: 'multilingual-support',
      title: 'Multilingual Capabilities',
      description: 'Work with content in multiple languages seamlessly',
      details: 'Generate, translate, and analyze content across dozens of languages with models trained on diverse, multilingual datasets.',
      icon: <Globe className="w-6 h-6" />,
      category: 'processing'
    }
  ];

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'generation': return 'border-l-blue-500 bg-blue-50';
      case 'processing': return 'border-l-green-500 bg-green-50';
      case 'enhancement': return 'border-l-purple-500 bg-purple-50';
      case 'analysis': return 'border-l-orange-500 bg-orange-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getCategoryIconBg = (category: string): string => {
    switch (category) {
      case 'generation': return 'bg-blue-500';
      case 'processing': return 'bg-green-500';
      case 'enhancement': return 'bg-purple-500';
      case 'analysis': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-6">
            Powerful AI Capabilities at Your Fingertips
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Access a comprehensive suite of AI tools designed to transform how you create, analyze, and enhance content. 
            Our platform brings together the most advanced AI models in one seamless experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {aiFeatures.map((feature) => (
            <div 
              key={feature.id}
              className={`border-l-4 ${getCategoryColor(feature.category)} p-6 rounded-r-lg shadow-sm hover:shadow-md transition-all duration-200`}
            >
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-12 h-12 ${getCategoryIconBg(feature.category)} rounded-lg flex items-center justify-center text-white`}>
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-black mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 font-medium mb-3">
                    {feature.description}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.details}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Key Statistics */}
        <div className="bg-gray-50 rounded-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-black mb-2">
              Trusted Performance Metrics
            </h3>
            <p className="text-gray-600">
              Real numbers from our platform usage and user feedback
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-black mb-1">5+</div>
              <div className="text-sm text-gray-600">AI Model Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-black mb-1">50+</div>
              <div className="text-sm text-gray-600">Available Models</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-black mb-1">99.9%</div>
              <div className="text-sm text-gray-600">Uptime Reliability</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-black mb-1">&lt;30s</div>
              <div className="text-sm text-gray-600">Average Response Time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

AIFeaturesSection.displayName = 'AIFeaturesSection';

export default AIFeaturesSection;