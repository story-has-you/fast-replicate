/**
 * Tech Advantages Section Component
 * Explains technical principles, infrastructure advantages, and competitive benefits
 */
import React from 'react';
import { 
  Server, 
  Zap, 
  Shield, 
  Globe, 
  Cpu, 
  Database, 
  Lock, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Cloud,
  Activity
} from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface TechAdvantagesSectionProps {}

interface TechAdvantage {
  id: string;
  title: string;
  description: string;
  details: string[];
  icon: React.ReactNode;
  category: 'infrastructure' | 'security' | 'performance' | 'scalability';
}

interface CompetitiveAdvantage {
  id: string;
  title: string;
  description: string;
  ourApproach: string;
  traditionalApproach: string;
  benefit: string;
  icon: React.ReactNode;
}

const TechAdvantagesSection: React.FC<TechAdvantagesSectionProps> = () => {
  const techAdvantages: TechAdvantage[] = [
    {
      id: 'optimized-infrastructure',
      title: 'Optimized AI Infrastructure',
      description: 'Purpose-built infrastructure designed specifically for AI workloads',
      details: [
        'GPU clusters with automatic load balancing',
        'Model-specific optimization and caching',
        'Intelligent request routing and queuing',
        'Real-time resource scaling based on demand'
      ],
      icon: <Server className="w-6 h-6" />,
      category: 'infrastructure'
    },
    {
      id: 'enterprise-security',
      title: 'Enterprise-Grade Security',
      description: 'Multi-layered security architecture protecting your data and operations',
      details: [
        'End-to-end encryption for all data transmission',
        'Zero-trust network architecture',
        'SOC 2 Type II compliance',
        'Regular security audits and penetration testing'
      ],
      icon: <Shield className="w-6 h-6" />,
      category: 'security'
    },
    {
      id: 'lightning-performance',
      title: 'Lightning-Fast Performance',
      description: 'Optimized processing pipelines delivering industry-leading speed',
      details: [
        'Advanced model quantization techniques',
        'Edge computing for reduced latency',
        'Intelligent caching and pre-computation',
        'Parallel processing across multiple GPUs'
      ],
      icon: <Zap className="w-6 h-6" />,
      category: 'performance'
    },
    {
      id: 'global-scalability',
      title: 'Global Scalability',
      description: 'Worldwide infrastructure ensuring consistent performance everywhere',
      details: [
        'Multi-region deployment across 5 continents',
        'Automatic failover and disaster recovery',
        'Dynamic scaling from 1 to 100,000+ requests',
        'Content delivery network integration'
      ],
      icon: <Globe className="w-6 h-6" />,
      category: 'scalability'
    }
  ];

  const competitiveAdvantages: CompetitiveAdvantage[] = [
    {
      id: 'no-api-complexity',
      title: 'Zero API Complexity',
      description: 'Start using AI immediately without technical barriers',
      ourApproach: 'Simple web interface + optional API access',
      traditionalApproach: 'Complex API keys, documentation, and setup',
      benefit: 'Reduce time-to-value from weeks to minutes',
      icon: <CheckCircle className="w-5 h-5" />
    },
    {
      id: 'unified-platform',
      title: 'Unified AI Platform',
      description: 'Access multiple AI models through a single subscription',
      ourApproach: 'One subscription, 50+ models, unified billing',
      traditionalApproach: 'Multiple subscriptions, separate billing, integration complexity',
      benefit: 'Simplify workflows and reduce costs by up to 60%',
      icon: <Database className="w-5 h-5" />
    },
    {
      id: 'predictable-pricing',
      title: 'Predictable Pricing',
      description: 'Transparent credit system with no surprise costs',
      ourApproach: 'Fixed monthly cost, clear credit pricing',
      traditionalApproach: 'Pay-per-use with variable rates and hidden fees',
      benefit: 'Budget predictably with 100% cost visibility',
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      id: 'optimized-models',
      title: 'Pre-Optimized Models',
      description: 'AI models fine-tuned for optimal performance and quality',
      ourApproach: 'Curated, optimized models with quality guarantees',
      traditionalApproach: 'Raw models requiring manual optimization',
      benefit: 'Get 40% better results with 60% less effort',
      icon: <Cpu className="w-5 h-5" />
    }
  ];

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'infrastructure': return 'bg-blue-500';
      case 'security': return 'bg-red-500';
      case 'performance': return 'bg-green-500';
      case 'scalability': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const infrastructureStats = [
    { label: 'Global Data Centers', value: '12+', icon: <Globe className="w-5 h-5" /> },
    { label: 'GPU Compute Nodes', value: '1000+', icon: <Cpu className="w-5 h-5" /> },
    { label: 'Uptime SLA', value: '99.9%', icon: <Activity className="w-5 h-5" /> },
    { label: 'Average Response Time', value: '<2s', icon: <Zap className="w-5 h-5" /> }
  ];

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-6">
            Technical Excellence & Competitive Advantages
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Built on cutting-edge infrastructure with enterprise-grade security and performance. 
            Discover what makes our AI platform the most reliable and efficient choice for professionals.
          </p>
        </div>

        {/* Infrastructure Stats */}
        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {infrastructureStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-white mx-auto mb-3">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-black mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Advantages */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-black text-center mb-12">
            Technical Infrastructure Advantages
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {techAdvantages.map((advantage) => (
              <div key={advantage.id} className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-12 h-12 ${getCategoryColor(advantage.category)} rounded-lg flex items-center justify-center text-white`}>
                    {advantage.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-black mb-3">
                      {advantage.title}
                    </h4>
                    <p className="text-gray-700 mb-4">
                      {advantage.description}
                    </p>
                    <ul className="space-y-2">
                      {advantage.details.map((detail, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-black rounded-full flex-shrink-0"></div>
                          <span className="text-sm text-gray-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Competitive Advantages */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-black text-center mb-12">
            Why Choose Us Over Traditional AI Services
          </h3>
          <div className="space-y-6">
            {competitiveAdvantages.map((advantage) => (
              <div key={advantage.id} className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-md transition-all duration-200">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-3">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        {advantage.icon}
                      </div>
                      <h4 className="text-lg font-semibold text-black">
                        {advantage.title}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      {advantage.description}
                    </p>
                  </div>

                  <div className="lg:col-span-4">
                    <div className="space-y-3">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="text-xs text-green-600 font-medium mb-1">Our Approach</div>
                        <div className="text-sm text-black">{advantage.ourApproach}</div>
                      </div>
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="text-xs text-red-600 font-medium mb-1">Traditional Approach</div>
                        <div className="text-sm text-black">{advantage.traditionalApproach}</div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-1 flex justify-center">
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                  </div>

                  <div className="lg:col-span-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="text-xs text-blue-600 font-medium mb-2">Your Benefit</div>
                      <div className="text-sm text-black font-medium">{advantage.benefit}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture Principles */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-black text-center mb-8">
            Our Architecture Principles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center text-white mx-auto mb-4">
                <Cloud className="w-8 h-8" />
              </div>
              <h4 className="font-semibold text-black mb-2">Cloud-Native</h4>
              <p className="text-sm text-gray-600">
                Built for the cloud from day one with microservices architecture
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center text-white mx-auto mb-4">
                <Lock className="w-8 h-8" />
              </div>
              <h4 className="font-semibold text-black mb-2">Security-First</h4>
              <p className="text-sm text-gray-600">
                Zero-trust security model with end-to-end encryption
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center text-white mx-auto mb-4">
                <Activity className="w-8 h-8" />
              </div>
              <h4 className="font-semibold text-black mb-2">High Availability</h4>
              <p className="text-sm text-gray-600">
                99.9% uptime with automatic failover and disaster recovery
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center text-white mx-auto mb-4">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h4 className="font-semibold text-black mb-2">Auto-Scaling</h4>
              <p className="text-sm text-gray-600">
                Dynamic resource allocation based on real-time demand
              </p>
            </div>
          </div>
        </div>

        {/* Technical CTA */}
        <div className="text-center mt-16">
          <div className="bg-black text-white rounded-lg p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Experience the Technical Difference
            </h3>
            <p className="text-gray-300 mb-6">
              Our enterprise-grade infrastructure and optimized AI models deliver superior performance, 
              reliability, and cost-efficiency compared to traditional AI services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                View Technical Specs
              </button>
              <button className="border border-gray-400 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

TechAdvantagesSection.displayName = 'TechAdvantagesSection';

export default TechAdvantagesSection;