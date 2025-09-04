'use client';

/**
 * FAQ Section Component
 * Comprehensive FAQ section with categorized questions and answers
 */
import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  CreditCard, 
  Shield, 
  Settings, 
  Zap, 
  Users,
  Search
} from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface FAQSectionProps {}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'pricing' | 'technical' | 'privacy' | 'support';
}

interface FAQCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const FAQSection: React.FC<FAQSectionProps> = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('general');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories: FAQCategory[] = [
    {
      id: 'general',
      name: 'General',
      description: 'Basic information about our platform',
      icon: <HelpCircle className="w-5 h-5" />,
      color: 'blue'
    },
    {
      id: 'pricing',
      name: 'Pricing & Credits',
      description: 'Subscription plans and credit system',
      icon: <CreditCard className="w-5 h-5" />,
      color: 'green'
    },
    {
      id: 'technical',
      name: 'Technical',
      description: 'API usage and technical details',
      icon: <Settings className="w-5 h-5" />,
      color: 'purple'
    },
    {
      id: 'privacy',
      name: 'Privacy & Security',
      description: 'Data protection and security measures',
      icon: <Shield className="w-5 h-5" />,
      color: 'red'
    },
    {
      id: 'support',
      name: 'Support',
      description: 'Getting help and account management',
      icon: <Users className="w-5 h-5" />,
      color: 'orange'
    }
  ];

  const faqItems: FAQItem[] = [
    // General
    {
      id: 'what-is-fast-replicate',
      question: 'What is Fast Replicate?',
      answer: 'Fast Replicate is an AI-as-a-Service platform that provides easy access to state-of-the-art AI models without requiring API keys or complex setup. Users can generate text, images, audio, and video content through our subscription-based service with a simple credit system.',
      category: 'general'
    },
    {
      id: 'how-does-it-work',
      question: 'How does Fast Replicate work?',
      answer: 'Simply sign up for an account, choose a subscription plan, and start using AI models immediately. Our platform handles all the technical complexity - no API keys, no setup required. You use credits from your subscription to generate content, and results are delivered quickly through our optimized infrastructure.',
      category: 'general'
    },
    {
      id: 'what-models-available',
      question: 'What AI models are available?',
      answer: 'We offer 50+ AI models across multiple categories including text generation (GPT-4, Claude 3), image generation (DALL-E 3, Midjourney, Stable Diffusion), audio synthesis (ElevenLabs, MusicGen), and video generation (RunwayML). Our catalog is constantly updated with the latest and most capable models.',
      category: 'general'
    },
    {
      id: 'free-trial',
      question: 'Do you offer a free trial?',
      answer: 'Yes! We offer a 7-day free trial with 100 credits so you can explore our platform and try different AI models. No credit card required for the trial. After the trial, you can choose from our flexible subscription plans.',
      category: 'general'
    },

    // Pricing
    {
      id: 'subscription-plans',
      question: 'What subscription plans do you offer?',
      answer: 'We offer three main plans: Starter ($19/month, 1000 credits), Professional ($49/month, 3000 credits), and Enterprise ($99/month, 8000 credits). All plans include access to all AI models, with credits refreshing monthly. Enterprise plans include priority support and advanced features.',
      category: 'pricing'
    },
    {
      id: 'how-credits-work',
      question: 'How do credits work?',
      answer: 'Credits are our usage currency. Different AI models consume different amounts of credits based on their computational cost. For example: text generation (1-5 credits), image generation (10-20 credits), video generation (50-100 credits). Your credits refresh at the beginning of each billing cycle.',
      category: 'pricing'
    },
    {
      id: 'unused-credits',
      question: 'What happens to unused credits?',
      answer: 'Unused credits do not roll over to the next month - they expire at the end of your billing cycle. However, any content you\'ve generated remains accessible in your account permanently. We recommend monitoring your usage through your dashboard.',
      category: 'pricing'
    },
    {
      id: 'cancel-subscription',
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time from your account settings. Your subscription will remain active until the end of your current billing period, and you\'ll retain access to all your generated content even after cancellation.',
      category: 'pricing'
    },

    // Technical
    {
      id: 'api-access',
      question: 'Do you provide API access?',
      answer: 'Yes, we offer REST API access for Professional and Enterprise plans. Our API allows you to integrate AI generation capabilities directly into your applications. We provide comprehensive documentation, SDKs for popular programming languages, and webhook support.',
      category: 'technical'
    },
    {
      id: 'rate-limits',
      question: 'Are there any rate limits?',
      answer: 'We implement fair usage rate limits to ensure optimal performance for all users. Starter plans have a limit of 10 requests per minute, Professional plans allow 30 requests per minute, and Enterprise plans have 100 requests per minute. Higher limits are available upon request.',
      category: 'technical'
    },
    {
      id: 'supported-formats',
      question: 'What file formats are supported?',
      answer: 'We support a wide range of formats: Images (PNG, JPEG, WebP), Audio (MP3, WAV), Video (MP4, WebM), and Text (TXT, JSON, Markdown). Output formats depend on the specific AI model used. All generated content can be downloaded or accessed via our API.',
      category: 'technical'
    },
    {
      id: 'processing-time',
      question: 'How long does processing take?',
      answer: 'Processing times vary by model complexity: Text generation (1-5 seconds), Image generation (10-30 seconds), Audio generation (30-60 seconds), Video generation (2-10 minutes). We provide real-time progress updates and email notifications for longer tasks.',
      category: 'technical'
    },

    // Privacy & Security
    {
      id: 'data-privacy',
      question: 'How is my data protected?',
      answer: 'We take data privacy seriously. All data is encrypted in transit and at rest. We comply with GDPR and CCPA regulations. Your input prompts and generated content are stored securely and are only accessible to you. We never use your data to train AI models without explicit consent.',
      category: 'privacy'
    },
    {
      id: 'content-ownership',
      question: 'Who owns the generated content?',
      answer: 'You own all content generated through our platform. We grant you full commercial rights to use, modify, and distribute the generated content. However, please ensure your input prompts don\'t infringe on others\' intellectual property rights.',
      category: 'privacy'
    },
    {
      id: 'data-retention',
      question: 'How long do you keep my data?',
      answer: 'Generated content is stored indefinitely in your account unless you choose to delete it. Input prompts and usage logs are retained for 90 days for technical support purposes. You can request complete data deletion at any time through your account settings.',
      category: 'privacy'
    },

    // Support
    {
      id: 'get-support',
      question: 'How can I get support?',
      answer: 'We offer multiple support channels: Email support (response within 24 hours), Live chat during business hours, comprehensive documentation and tutorials, and community forum. Enterprise customers get priority support with dedicated account managers.',
      category: 'support'
    },
    {
      id: 'account-issues',
      question: 'What if I have account or billing issues?',
      answer: 'For account or billing issues, please contact our support team immediately at support@fastreplicate.com or use the live chat. We typically resolve billing issues within 24 hours and can provide account recovery assistance.',
      category: 'support'
    },
    {
      id: 'model-requests',
      question: 'Can I request new AI models?',
      answer: 'Absolutely! We regularly evaluate and add new AI models based on user requests. Professional and Enterprise users can submit model requests through their dashboard. We prioritize models based on demand, capability, and integration feasibility.',
      category: 'support'
    }
  ];

  const toggleItem = (itemId: string) => {
    setActiveItem(activeItem === itemId ? null : itemId);
  };

  const getCategoryColor = (color: string): string => {
    const colors = {
      blue: 'text-blue-600 bg-blue-50 border-blue-200',
      green: 'text-green-600 bg-green-50 border-green-200',
      purple: 'text-purple-600 bg-purple-50 border-purple-200',
      red: 'text-red-600 bg-red-50 border-red-200',
      orange: 'text-orange-600 bg-orange-50 border-orange-200'
    } as const;
    
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const filteredFAQs = faqItems.filter(item => 
    (activeCategory === 'general' || item.category === activeCategory) &&
    (searchTerm === '' || 
     item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section className="bg-gray-50 py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about our AI platform, pricing, technical details, and more.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Category Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-black mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      activeCategory === category.id
                        ? getCategoryColor(category.color)
                        : 'text-gray-700 bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {category.icon}
                      <div>
                        <div className="font-medium">{category.name}</div>
                        <div className="text-xs opacity-75">{category.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg p-6">
              {filteredFAQs.length === 0 ? (
                <div className="text-center py-12">
                  <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No questions found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search terms or selecting a different category.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFAQs.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-black pr-4">
                          {item.question}
                        </span>
                        {activeItem === item.id ? (
                          <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      {activeItem === item.id && (
                        <div className="px-6 pb-4">
                          <div className="pt-2 border-t border-gray-100">
                            <p className="text-gray-700 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Support CTA */}
        <div className="bg-black text-white rounded-lg p-8 mt-16">
          <div className="text-center">
            <Zap className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Our support team is here to help you get the most out of our AI platform. 
              Reach out anytime for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Contact Support
              </button>
              <button className="border border-gray-400 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Join Community
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

FAQSection.displayName = 'FAQSection';

export default FAQSection;