/**
 * Model Comparison Section Component
 * Displays AI model capabilities comparison and feature matrix
 */
import React from 'react';
import { 
  Check, 
  X, 
  Star, 
  Zap, 
  Clock, 
  DollarSign, 
  Image, 
  Music, 
  Video,
  MessageSquare,
  ChevronRight
} from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ModelComparisonSectionProps {}

interface ModelCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  models: Model[];
}

interface Model {
  id: string;
  name: string;
  description: string;
  performance: 'excellent' | 'good' | 'average';
  speed: 'fast' | 'medium' | 'slow';
  costLevel: 'low' | 'medium' | 'high';
  features: string[];
  limitations: string[];
  bestFor: string[];
}

interface ComparisonFeature {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const ModelComparisonSection: React.FC<ModelComparisonSectionProps> = () => {
  const modelCategories: ModelCategory[] = [
    {
      id: 'text-generation',
      name: 'Text Generation Models',
      description: 'Advanced language models for content creation and text processing',
      icon: <MessageSquare className="w-6 h-6" />,
      models: [
        {
          id: 'gpt-4-turbo',
          name: 'GPT-4 Turbo',
          description: 'Most capable model for complex reasoning and creative tasks',
          performance: 'excellent',
          speed: 'medium',
          costLevel: 'high',
          features: ['128K context', 'JSON mode', 'Function calling', 'Vision capabilities'],
          limitations: ['Higher cost', 'Slower response time'],
          bestFor: ['Complex analysis', 'Creative writing', 'Code generation', 'Research tasks']
        },
        {
          id: 'claude-3',
          name: 'Claude 3 Sonnet',
          description: 'Balanced model with strong reasoning and ethical guidelines',
          performance: 'excellent',
          speed: 'fast',
          costLevel: 'medium',
          features: ['200K context', 'Constitutional AI', 'Code analysis', 'Document processing'],
          limitations: ['More conservative responses', 'Limited availability'],
          bestFor: ['Professional writing', 'Code review', 'Academic research', 'Content moderation']
        },
        {
          id: 'llama-2-70b',
          name: 'Llama 2 70B',
          description: 'Open-source model with good performance and cost efficiency',
          performance: 'good',
          speed: 'fast',
          costLevel: 'low',
          features: ['Open source', 'Commercial use', 'Fine-tuning support', 'Multi-language'],
          limitations: ['Less nuanced responses', 'Smaller context window'],
          bestFor: ['Cost-sensitive applications', 'Custom fine-tuning', 'Bulk processing', 'Education']
        }
      ]
    },
    {
      id: 'image-generation',
      name: 'Image Generation Models',
      description: 'State-of-the-art models for creating and editing visual content',
      icon: <Image className="w-6 h-6" />,
      models: [
        {
          id: 'dall-e-3',
          name: 'DALL-E 3',
          description: 'Most advanced text-to-image model with excellent prompt adherence',
          performance: 'excellent',
          speed: 'medium',
          costLevel: 'high',
          features: ['1024x1024 resolution', 'Prompt adherence', 'Style consistency', 'Safety filters'],
          limitations: ['Single image per request', 'No inpainting', 'Limited editing'],
          bestFor: ['Marketing materials', 'Concept art', 'Social media graphics', 'Brand assets']
        },
        {
          id: 'midjourney-v6',
          name: 'Midjourney v6',
          description: 'Artist-focused model with exceptional aesthetic quality',
          performance: 'excellent',
          speed: 'medium',
          costLevel: 'medium',
          features: ['Artistic styles', 'High resolution', 'Style references', 'Aspect ratio control'],
          limitations: ['Discord-based', 'Learning curve', 'Limited API access'],
          bestFor: ['Artistic creations', 'Fantasy art', 'Character design', 'Album covers']
        },
        {
          id: 'stable-diffusion-xl',
          name: 'Stable Diffusion XL',
          description: 'Open-source model with flexibility and customization options',
          performance: 'good',
          speed: 'fast',
          costLevel: 'low',
          features: ['Open source', 'Local deployment', 'Custom training', 'Multiple resolutions'],
          limitations: ['Requires technical setup', 'Variable quality', 'Prompt engineering needed'],
          bestFor: ['Custom applications', 'Batch generation', 'Research projects', 'Cost optimization']
        }
      ]
    },
    {
      id: 'audio-generation',
      name: 'Audio & Music Models',
      description: 'AI models for generating music, voices, and audio effects',
      icon: <Music className="w-6 h-6" />,
      models: [
        {
          id: 'musicgen',
          name: 'MusicGen',
          description: 'Meta music generation model for creating original compositions',
          performance: 'good',
          speed: 'medium',
          costLevel: 'medium',
          features: ['Text-to-music', 'Melody conditioning', 'Various genres', '30-second tracks'],
          limitations: ['Limited duration', 'Basic instrument control', 'No vocals'],
          bestFor: ['Background music', 'Jingles', 'Game soundtracks', 'Mood music']
        },
        {
          id: 'eleven-labs',
          name: 'ElevenLabs Voice',
          description: 'Premium voice synthesis with natural-sounding speech',
          performance: 'excellent',
          speed: 'fast',
          costLevel: 'medium',
          features: ['Natural voices', 'Voice cloning', 'Multiple languages', 'Emotional control'],
          limitations: ['Usage limits', 'Ethical concerns', 'Premium pricing'],
          bestFor: ['Narration', 'Audiobooks', 'Podcasts', 'Voice-overs']
        }
      ]
    },
    {
      id: 'video-generation',
      name: 'Video Generation Models',
      description: 'Cutting-edge models for creating and editing video content',
      icon: <Video className="w-6 h-6" />,
      models: [
        {
          id: 'runway-gen2',
          name: 'RunwayML Gen-2',
          description: 'Advanced video generation and editing capabilities',
          performance: 'good',
          speed: 'slow',
          costLevel: 'high',
          features: ['Text-to-video', 'Image-to-video', 'Video editing', 'Style transfer'],
          limitations: ['Short clips only', 'High cost', 'Processing time'],
          bestFor: ['Marketing videos', 'Social media content', 'Concept videos', 'Art projects']
        }
      ]
    }
  ];

  const comparisonFeatures: ComparisonFeature[] = [
    {
      id: 'performance',
      name: 'Performance Quality',
      description: 'Overall output quality and capability',
      icon: <Star className="w-4 h-4" />
    },
    {
      id: 'speed',
      name: 'Generation Speed',
      description: 'Time required to generate results',
      icon: <Zap className="w-4 h-4" />
    },
    {
      id: 'cost',
      name: 'Cost Efficiency',
      description: 'Credit cost per generation',
      icon: <DollarSign className="w-4 h-4" />
    },
    {
      id: 'reliability',
      name: 'Reliability',
      description: 'Consistency and uptime',
      icon: <Clock className="w-4 h-4" />
    }
  ];

  const getPerformanceColor = (level: string): string => {
    switch (level) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'average': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSpeedColor = (speed: string): string => {
    switch (speed) {
      case 'fast': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'slow': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCostColor = (cost: string): string => {
    switch (cost) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-6">
            AI Model Capabilities & Comparison
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Choose the perfect AI model for your needs. Compare performance, speed, cost, and features 
            across our curated collection of state-of-the-art AI models.
          </p>
        </div>

        {/* Comparison Overview */}
        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <h3 className="text-2xl font-bold text-black mb-6 text-center">
            Model Performance Matrix
          </h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {comparisonFeatures.map((feature) => (
              <div key={feature.id} className="text-center">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-white mx-auto mb-3">
                  {feature.icon}
                </div>
                <h4 className="font-semibold text-black mb-2">{feature.name}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Model Categories */}
        <div className="space-y-12">
          {modelCategories.map((category) => (
            <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-100 p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-white">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-black">{category.name}</h3>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  {category.models.map((model) => (
                    <div key={model.id} className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-md transition-all duration-200">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6">
                        {/* Model Info */}
                        <div className="flex-1 mb-6 lg:mb-0">
                          <div className="flex items-center space-x-3 mb-3">
                            <h4 className="text-xl font-bold text-black">{model.name}</h4>
                            <div className="flex space-x-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPerformanceColor(model.performance)}`}>
                                {model.performance}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSpeedColor(model.speed)}`}>
                                {model.speed}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCostColor(model.costLevel)}`}>
                                {model.costLevel} cost
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-4">{model.description}</p>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Features */}
                            <div>
                              <h5 className="font-semibold text-black mb-2">Key Features</h5>
                              <ul className="space-y-1">
                                {model.features.map((feature, index) => (
                                  <li key={index} className="flex items-center space-x-2 text-sm">
                                    <Check className="w-3 h-3 text-green-500" />
                                    <span className="text-gray-700">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Best For */}
                            <div>
                              <h5 className="font-semibold text-black mb-2">Best For</h5>
                              <ul className="space-y-1">
                                {model.bestFor.map((use, index) => (
                                  <li key={index} className="flex items-center space-x-2 text-sm">
                                    <ChevronRight className="w-3 h-3 text-blue-500" />
                                    <span className="text-gray-700">{use}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Limitations */}
                            <div>
                              <h5 className="font-semibold text-black mb-2">Limitations</h5>
                              <ul className="space-y-1">
                                {model.limitations.map((limitation, index) => (
                                  <li key={index} className="flex items-center space-x-2 text-sm">
                                    <X className="w-3 h-3 text-red-500" />
                                    <span className="text-gray-700">{limitation}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selection Guide */}
        <div className="bg-black text-white rounded-lg p-8 mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              Need Help Choosing the Right Model?
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our AI model selection tool helps you find the perfect model based on your specific requirements, 
              budget, and use case.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Model Selection Tool
            </button>
            <button className="border border-gray-400 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Contact Expert Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

ModelComparisonSection.displayName = 'ModelComparisonSection';

export default ModelComparisonSection;