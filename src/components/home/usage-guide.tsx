import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AIModel } from '@/types/ai-models';
import { 
  HelpCircle, 
  Lightbulb, 
  ArrowRight, 
  Zap, 
  Clock, 
  Star,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

/**
 * Props for UsageGuide component
 */
interface UsageGuideProps {
  selectedModel?: AIModel;
  className?: string;
}

/**
 * Usage Guide Component
 * Provides helpful tips and examples for using AI models
 */
const UsageGuide: React.FC<UsageGuideProps> = ({
  selectedModel,
  className = ''
}) => {
  const [expandedSection, setExpandedSection] = React.useState<string>('getting-started');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? '' : section);
  };

  const generalSteps = [
    {
      step: 1,
      title: 'Choose a Model',
      description: 'Browse and select from our collection of AI models',
      icon: '🤖'
    },
    {
      step: 2,
      title: 'Configure Parameters',
      description: 'Adjust settings to customize the output for your needs',
      icon: '⚙️'
    },
    {
      step: 3,
      title: 'Generate Results',
      description: 'Click generate and wait for your AI-powered results',
      icon: '✨'
    },
    {
      step: 4,
      title: 'Download & Share',
      description: 'Save your results or share them with others',
      icon: '📥'
    }
  ];

  const quickTips = [
    {
      icon: '💡',
      title: 'Be Specific',
      description: 'More detailed prompts generally produce better results'
    },
    {
      icon: '🎯',
      title: 'Experiment',
      description: 'Try different parameter combinations to find what works best'
    },
    {
      icon: '⏱️',
      title: 'Be Patient',
      description: 'Complex models may take longer but often produce higher quality results'
    },
    {
      icon: '🔄',
      title: 'Iterate',
      description: 'Refine your inputs based on previous results for better outputs'
    }
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Getting Started */}
      <Card className="bg-white border-gray-200">
        <CardHeader 
          className="cursor-pointer select-none"
          onClick={() => toggleSection('getting-started')}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-black flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              Getting Started
            </CardTitle>
            {expandedSection === 'getting-started' ? 
              <ChevronUp className="w-5 h-5 text-gray-400" /> : 
              <ChevronDown className="w-5 h-5 text-gray-400" />
            }
          </div>
        </CardHeader>
        
        {expandedSection === 'getting-started' && (
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {generalSteps.map((item) => (
                <div key={item.step} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {item.step}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{item.icon}</span>
                      <h3 className="font-medium text-black">{item.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Quick Tips */}
      <Card className="bg-white border-gray-200">
        <CardHeader 
          className="cursor-pointer select-none"
          onClick={() => toggleSection('quick-tips')}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-black flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
              Quick Tips
            </CardTitle>
            {expandedSection === 'quick-tips' ? 
              <ChevronUp className="w-5 h-5 text-gray-400" /> : 
              <ChevronDown className="w-5 h-5 text-gray-400" />
            }
          </div>
        </CardHeader>
        
        {expandedSection === 'quick-tips' && (
          <CardContent className="pt-0">
            <div className="space-y-3">
              {quickTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <span className="text-lg flex-shrink-0">{tip.icon}</span>
                  <div>
                    <h4 className="font-medium text-black">{tip.title}</h4>
                    <p className="text-sm text-gray-600">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Model-Specific Help */}
      {selectedModel && (
        <Card className="bg-white border-gray-200">
          <CardHeader 
            className="cursor-pointer select-none"
            onClick={() => toggleSection('model-help')}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-black flex items-center gap-2">
                <Star className="w-5 h-5 text-purple-600" />
                {selectedModel.name} Guide
              </CardTitle>
              {expandedSection === 'model-help' ? 
                <ChevronUp className="w-5 h-5 text-gray-400" /> : 
                <ChevronDown className="w-5 h-5 text-gray-400" />
              }
            </div>
          </CardHeader>
          
          {expandedSection === 'model-help' && (
            <CardContent className="pt-0 space-y-4">
              {/* Model Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-black">Model Information</h3>
                  <Badge className="bg-black text-white">{selectedModel.provider}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{selectedModel.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-600" />
                    <span className="text-gray-600">Cost: {selectedModel.pricing.creditsPerUse} credits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-600">Time: {selectedModel.pricing.estimatedTime}</span>
                  </div>
                </div>
              </div>

              {/* Capabilities */}
              <div>
                <h3 className="font-medium text-black mb-2">Capabilities</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedModel.capabilities.map((capability, index) => (
                    <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {capability}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Examples */}
              {selectedModel.examples && selectedModel.examples.length > 0 && (
                <div>
                  <h3 className="font-medium text-black mb-2">Examples</h3>
                  <div className="space-y-3">
                    {selectedModel.examples.map((example, index) => (
                      <div key={index} className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                        <h4 className="font-medium text-blue-900 mb-1">{example.title}</h4>
                        <p className="text-sm text-blue-700 mb-2">{example.description}</p>
                        <div className="bg-white rounded p-2 text-xs font-mono text-gray-700">
                          {JSON.stringify(example.inputs, null, 2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Limitations */}
              {selectedModel.limitations && selectedModel.limitations.length > 0 && (
                <div>
                  <h3 className="font-medium text-black mb-2">Limitations</h3>
                  <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                    <ul className="text-sm text-red-700 space-y-1">
                      {selectedModel.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-red-500 mt-0.5">•</span>
                          <span>{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          )}
        </Card>
      )}

      {/* Need More Help */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-4">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <HelpCircle className="w-5 h-5" />
              <span className="font-medium">Need More Help?</span>
            </div>
            <p className="text-sm text-gray-600">
              Check out our documentation or contact support for assistance
            </p>
            <div className="flex gap-2 justify-center">
              <Button variant="outline" size="sm" className="text-gray-600 border-gray-300 hover:bg-white">
                Documentation
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Button variant="outline" size="sm" className="text-gray-600 border-gray-300 hover:bg-white">
                Contact Support
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

UsageGuide.displayName = 'UsageGuide';

export default UsageGuide;