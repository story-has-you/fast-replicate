/**
 * Model Introduction Section Component
 * Dedicated second screen content for detailed AI model information
 * Focuses on the current model (Stable Diffusion XL) with comprehensive details
 */
import React from 'react';
import { 
  Sparkles, 
  Image, 
  Zap, 
  Target, 
  Palette, 
  Brain,
  Settings,
  CheckCircle,
  ArrowRight,
  Info
} from 'lucide-react';

interface ModelIntroductionSectionProps {
  modelName?: string;
  modelVersion?: string;
}

interface ModelFeature {
  id: string;
  title: string;
  description: string;
  detail: string;
  icon: React.ReactNode;
  highlight?: boolean;
}

interface UseCase {
  id: string;
  title: string;
  description: string;
  examples: string[];
  icon: React.ReactNode;
}

interface TechnicalSpec {
  id: string;
  label: string;
  value: string;
  description: string;
}

interface ComparisonPoint {
  id: string;
  aspect: string;
  sdxl: string;
  previous: string;
  improvement: string;
}

const ModelIntroductionSection: React.FC<ModelIntroductionSectionProps> = ({ 
  modelName = "Stable Diffusion XL"
}) => {
  const modelFeatures: ModelFeature[] = [
    {
      id: 'high-resolution',
      title: 'High-Resolution Output',
      description: 'Generate stunning 1024x1024 pixel images',
      detail: 'Produces crisp, detailed images at higher resolutions than previous generations, perfect for professional use cases and print materials.',
      // eslint-disable-next-line jsx-a11y/alt-text
      icon: <Image className="w-5 h-5" />,
      highlight: true
    },
    {
      id: 'enhanced-details',
      title: 'Enhanced Detail Rendering',
      description: 'Superior fine detail representation',
      detail: 'Advanced neural architecture captures intricate textures, patterns, and subtle visual elements with unprecedented clarity.',
      icon: <Sparkles className="w-5 h-5" />,
      highlight: true
    },
    {
      id: 'art-styles',
      title: 'Multi-Style Support',
      description: 'Wide range of artistic styles and genres',
      detail: 'From photorealistic portraits to abstract art, anime to oil paintings - supports diverse artistic expressions.',
      icon: <Palette className="w-5 h-5" />
    },
    {
      id: 'text-understanding',
      title: 'Advanced Prompt Processing',
      description: 'More accurate text-to-image interpretation',
      detail: 'Improved natural language understanding enables more precise generation based on complex, nuanced prompts.',
      icon: <Brain className="w-5 h-5" />
    },
    {
      id: 'fast-generation',
      title: 'Optimized Performance',
      description: 'Faster generation with maintained quality',
      detail: 'Efficient processing delivers high-quality results in reasonable time, optimized for production workflows.',
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: 'flexible-control',
      title: 'Advanced Control Options',
      description: 'Fine-tune generation parameters',
      detail: 'Comprehensive control over style, composition, lighting, and artistic direction for professional results.',
      icon: <Settings className="w-5 h-5" />
    }
  ];

  const useCases: UseCase[] = [
    {
      id: 'illustration-art',
      title: 'Digital Illustration & Concept Art',
      description: 'Professional artwork for creative projects',
      examples: ['Character designs', 'Book illustrations', 'Game concept art', 'Fantasy artwork'],
      icon: <Palette className="w-5 h-5" />
    },
    {
      id: 'product-design',
      title: 'Product Design Visualization',
      description: 'Prototype and mockup generation',
      examples: ['Product concepts', 'Packaging designs', 'UI mockups', 'Architecture visualization'],
      icon: <Target className="w-5 h-5" />
    },
    {
      id: 'social-media',
      title: 'Social Media Content',
      description: 'Engaging visual content for platforms',
      examples: ['Instagram posts', 'YouTube thumbnails', 'Blog headers', 'Profile images'],
      // eslint-disable-next-line jsx-a11y/alt-text
      icon: <Image className="w-5 h-5" />
    },
    {
      id: 'marketing-materials',
      title: 'Marketing & Advertising',
      description: 'Professional marketing visuals',
      examples: ['Advertisement graphics', 'Poster designs', 'Brand assets', 'Campaign visuals'],
      icon: <Sparkles className="w-5 h-5" />
    }
  ];

  const technicalSpecs: TechnicalSpec[] = [
    {
      id: 'resolution',
      label: 'Output Resolution',
      value: '1024 × 1024 pixels',
      description: 'Native high-resolution output'
    },
    {
      id: 'model-size',
      label: 'Model Parameters',
      value: '3.5B parameters',
      description: 'Advanced neural network capacity'
    },
    {
      id: 'generation-time',
      label: 'Average Generation Time',
      value: '15-30 seconds',
      description: 'Optimized for production use'
    },
    {
      id: 'training-data',
      label: 'Training Dataset',
      value: 'Curated image-text pairs',
      description: 'High-quality, diverse training data'
    }
  ];

  const comparisonPoints: ComparisonPoint[] = [
    {
      id: 'resolution',
      aspect: 'Image Resolution',
      sdxl: '1024×1024',
      previous: '512×512',
      improvement: '4× pixel count'
    },
    {
      id: 'detail-quality',
      aspect: 'Detail Quality',
      sdxl: 'Enhanced fine details',
      previous: 'Basic details',
      improvement: 'Significantly improved'
    },
    {
      id: 'style-variety',
      aspect: 'Style Range',
      sdxl: 'Wide artistic spectrum',
      previous: 'Limited styles',
      improvement: 'Expanded capabilities'
    },
    {
      id: 'prompt-accuracy',
      aspect: 'Prompt Following',
      sdxl: 'Precise interpretation',
      previous: 'Basic understanding',
      improvement: 'Better adherence'
    }
  ];

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full mb-6">
            <Info className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">AI Model Overview</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-black mb-6">
            About {modelName}
          </h2>
          <div className="w-24 h-1 bg-black mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {modelName} represents the latest advancement in AI image generation technology. 
            With enhanced capabilities and superior output quality, it sets a new standard for 
            professional creative workflows and artistic expression.
          </p>
        </div>

        {/* What is SDXL Section */}
        <div className="mb-20">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-black">What is {modelName}?</h3>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {modelName} is the latest generation of AI image generation models, representing a significant 
              leap forward in quality, resolution, and creative control. Built on advanced diffusion technology, 
              it transforms text descriptions into stunning visual content with unprecedented accuracy and detail.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Compared to previous generations, {modelName} offers enhanced understanding of complex prompts, 
              superior detail rendering, and native high-resolution output that meets professional standards 
              for creative and commercial applications.
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-20">
          <div className="flex items-center space-x-3 mb-12">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-black">Key Features & Capabilities</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {modelFeatures.map((feature) => (
              <div 
                key={feature.id} 
                className={`border rounded-lg p-6 hover:shadow-md transition-all duration-200 ${
                  feature.highlight ? 'border-black bg-gray-50' : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                    feature.highlight ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-black mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-gray-700 font-medium mb-3">
                      {feature.description}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-20">
          <div className="flex items-center space-x-3 mb-12">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Target className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-black">Perfect Use Cases</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase) => (
              <div key={useCase.id} className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-md transition-all duration-200">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                    {useCase.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-black mb-2">
                      {useCase.title}
                    </h4>
                    <p className="text-gray-700 text-sm">
                      {useCase.description}
                    </p>
                  </div>
                </div>
                <div className="pl-14">
                  <ul className="space-y-2">
                    {useCase.examples.map((example, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm">
                        <ArrowRight className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-600">{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Model Comparison */}
        <div className="mb-20">
          <div className="flex items-center space-x-3 mb-12">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-black">Model Comparison</h3>
          </div>

          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-medium">Feature</th>
                    <th className="px-6 py-4 text-left font-medium">{modelName}</th>
                    <th className="px-6 py-4 text-left font-medium">Previous Generation</th>
                    <th className="px-6 py-4 text-left font-medium">Improvement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparisonPoints.map((point) => (
                    <tr key={point.id} className="bg-white hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-black">{point.aspect}</td>
                      <td className="px-6 py-4 text-gray-700">{point.sdxl}</td>
                      <td className="px-6 py-4 text-gray-600">{point.previous}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                          {point.improvement}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div>
          <div className="flex items-center space-x-3 mb-12">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Settings className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-black">Technical Specifications</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technicalSpecs.map((spec) => (
              <div key={spec.id} className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:border-gray-300 hover:shadow-md transition-all duration-200">
                <div className="text-2xl font-bold text-black mb-2">
                  {spec.value}
                </div>
                <div className="text-sm font-medium text-gray-700 mb-2">
                  {spec.label}
                </div>
                <div className="text-xs text-gray-600">
                  {spec.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

ModelIntroductionSection.displayName = 'ModelIntroductionSection';

export default ModelIntroductionSection;