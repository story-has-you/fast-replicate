/**
 * Use Cases Section Component
 * Showcases real-world applications and usage scenarios for AI tools
 */
import React from 'react';
import { 
  Palette, 
  PenTool, 
  Briefcase, 
  GraduationCap, 
  Megaphone, 
  Code, 
  Camera, 
  TrendingUp,
  Users,
  ArrowRight
} from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface UseCasesSectionProps {}

interface UseCase {
  id: string;
  title: string;
  description: string;
  example: string;
  icon: React.ReactNode;
  category: 'creative' | 'business' | 'education' | 'development';
  benefits: string[];
}

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  results: string;
  industry: string;
  icon: React.ReactNode;
}

const UseCasesSection: React.FC<UseCasesSectionProps> = () => {
  const useCases: UseCase[] = [
    {
      id: 'creative-design',
      title: 'Creative Design & Art',
      description: 'Generate stunning visuals, artwork, and design concepts',
      example: 'Create brand logos, social media graphics, concept art, and illustrations',
      icon: <Palette className="w-6 h-6" />,
      category: 'creative',
      benefits: ['Rapid prototyping', 'Endless inspiration', 'Cost-effective design']
    },
    {
      id: 'content-creation',
      title: 'Content Creation',
      description: 'Produce engaging written content for various platforms',
      example: 'Blog posts, product descriptions, social media captions, and newsletters',
      icon: <PenTool className="w-6 h-6" />,
      category: 'creative',
      benefits: ['SEO optimization', 'Consistent tone', 'Scalable production']
    },
    {
      id: 'business-automation',
      title: 'Business Process Automation',
      description: 'Streamline operations with AI-powered document processing',
      example: 'Generate reports, analyze data, create presentations, and automate workflows',
      icon: <Briefcase className="w-6 h-6" />,
      category: 'business',
      benefits: ['Time savings', 'Error reduction', 'Improved efficiency']
    },
    {
      id: 'education-learning',
      title: 'Education & Learning',
      description: 'Enhance teaching and learning experiences with AI',
      example: 'Create educational content, quizzes, explanations, and study materials',
      icon: <GraduationCap className="w-6 h-6" />,
      category: 'education',
      benefits: ['Personalized learning', 'Interactive content', 'Knowledge retention']
    },
    {
      id: 'marketing-campaigns',
      title: 'Marketing & Advertising',
      description: 'Develop compelling marketing materials and campaigns',
      example: 'Ad copy, email campaigns, product photography, and promotional videos',
      icon: <Megaphone className="w-6 h-6" />,
      category: 'business',
      benefits: ['Higher conversion', 'Brand consistency', 'Audience targeting']
    },
    {
      id: 'software-development',
      title: 'Software Development',
      description: 'Accelerate development with AI-assisted coding',
      example: 'Code generation, documentation, testing, and UI/UX design mockups',
      icon: <Code className="w-6 h-6" />,
      category: 'development',
      benefits: ['Faster development', 'Code quality', 'Documentation automation']
    }
  ];

  const caseStudies: CaseStudy[] = [
    {
      id: 'ecommerce-boost',
      title: 'E-commerce Sales Boost',
      description: 'Online retailer used AI-generated product images and descriptions',
      results: '40% increase in conversion rate, 60% reduction in content creation time',
      industry: 'E-commerce',
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      id: 'agency-efficiency',
      title: 'Creative Agency Efficiency',
      description: 'Marketing agency streamlined campaign creation with AI tools',
      results: '300% faster campaign development, 50% cost reduction per project',
      industry: 'Marketing',
      icon: <Users className="w-5 h-5" />
    },
    {
      id: 'content-scaling',
      title: 'Content Production Scaling',
      description: 'Media company automated blog content and social media posts',
      results: '10x content output increase, consistent quality across platforms',
      industry: 'Media',
      icon: <Camera className="w-5 h-5" />
    }
  ];

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'creative': return 'border-pink-200 bg-pink-50';
      case 'business': return 'border-blue-200 bg-blue-50';
      case 'education': return 'border-green-200 bg-green-50';
      case 'development': return 'border-purple-200 bg-purple-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getCategoryIconBg = (category: string): string => {
    switch (category) {
      case 'creative': return 'bg-pink-500';
      case 'business': return 'bg-blue-500';
      case 'education': return 'bg-green-500';
      case 'development': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <section className="bg-gray-50 py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-6">
            Real-World Applications & Success Stories
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Discover how professionals across industries are leveraging AI to transform their workflows, 
            increase productivity, and achieve exceptional results.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {useCases.map((useCase) => (
            <div 
              key={useCase.id}
              className={`border ${getCategoryColor(useCase.category)} rounded-lg p-6 hover:shadow-lg transition-all duration-200`}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`flex-shrink-0 w-12 h-12 ${getCategoryIconBg(useCase.category)} rounded-lg flex items-center justify-center text-white`}>
                  {useCase.icon}
                </div>
                <h3 className="text-xl font-semibold text-black">
                  {useCase.title}
                </h3>
              </div>
              
              <p className="text-gray-700 mb-4">
                {useCase.description}
              </p>
              
              <div className="bg-white bg-opacity-50 rounded-lg p-3 mb-4">
                <p className="text-sm text-gray-600 italic">
                  <strong>Example:</strong> {useCase.example}
                </p>
              </div>
              
              <div className="space-y-2">
                {useCase.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Case Studies */}
        <div className="bg-white rounded-lg p-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-black mb-4">
              Success Stories from Our Users
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real results achieved by businesses and creators using our AI tools
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <div key={study.id} className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-md transition-all duration-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white">
                    {study.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-black">{study.title}</h4>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {study.industry}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm mb-4">
                  {study.description}
                </p>
                
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm font-medium text-black">
                    Results: {study.results}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center space-x-4 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
              <span className="font-medium">Start Your Success Story</span>
              <ArrowRight className="w-4 h-4" />
            </div>
            <p className="text-sm text-gray-500 mt-3">
              Join thousands of professionals transforming their work with AI
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

UseCasesSection.displayName = 'UseCasesSection';

export default UseCasesSection;