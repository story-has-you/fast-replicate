/**
 * Usage Guide Component
 * Provides helpful tips and guidance for using AI models
 */
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AIModel } from '@/types/ai-models';
import { 
  Lightbulb, 
  Zap, 
  TrendingUp, 
  CheckCircle,
  X,
  ChevronRight,
  Play
} from 'lucide-react';

interface UsageGuideProps {
  selectedModel?: AIModel;
  onClose?: () => void;
  onTryExample?: (inputs: Record<string, string | number | boolean>) => void;
  className?: string;
}

const UsageGuide: React.FC<UsageGuideProps> = ({ 
  selectedModel, 
  onClose,
  onTryExample,
  className = "" 
}) => {
  const [activeTab, setActiveTab] = useState<'tips' | 'examples' | 'best-practices'>('tips');

  if (!selectedModel) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            <span>Get Started</span>
          </CardTitle>
          <CardDescription>
            Select an AI model to see specific tips and examples
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-xl">1️⃣</span>
              </div>
              <h3 className="font-medium">Choose Model</h3>
              <p className="text-sm text-gray-600">
                Browse our collection of AI models
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-xl">2️⃣</span>
              </div>
              <h3 className="font-medium">Configure</h3>
              <p className="text-sm text-gray-600">
                Set parameters for your task
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-xl">3️⃣</span>
              </div>
              <h3 className="font-medium">Generate</h3>
              <p className="text-sm text-gray-600">
                Watch AI create amazing results
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <TrendingUp className="w-5 h-5 text-blue-500 mt-1" />
              <div className="space-y-1">
                <h4 className="font-medium text-gray-900">Pro Tip</h4>
                <p className="text-sm text-gray-600">
                  Start with popular models like GPT-4 Turbo or DALL-E 3 for the best experience.
                  These models are optimized for quality and speed.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const renderTips = () => (
    <div className="space-y-4">
      <div className="grid gap-3">
        {getTipsForModel(selectedModel).map((tip, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <h4 className="font-medium text-gray-900">{tip.title}</h4>
              <p className="text-sm text-gray-600">{tip.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Zap className="w-5 h-5 text-blue-500 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-medium text-blue-900">Credit Usage</h4>
            <p className="text-sm text-blue-700">
              This model uses <strong>{selectedModel.pricing.creditsPerUse} credits</strong> per generation.
              Estimated processing time: <strong>{selectedModel.pricing.estimatedTime}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderExamples = () => (
    <div className="space-y-4">
      {selectedModel.examples && selectedModel.examples.length > 0 ? (
        selectedModel.examples.map((example, index) => (
          <Card key={index} className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{example.title}</CardTitle>
              <CardDescription>{example.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                {Object.entries(example.inputs).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="font-medium text-gray-600 capitalize">
                      {key.replace(/_/g, ' ')}:
                    </span>
                    <span className="text-gray-900 text-right max-w-xs">
                      {typeof value === 'string' && value.length > 40 
                        ? `"${value.substring(0, 40)}..."` 
                        : `"${value}"`
                      }
                    </span>
                  </div>
                ))}
              </div>
              {onTryExample && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onTryExample(example.inputs)}
                  className="w-full"
                >
                  <Play className="w-4 h-4 mr-1" />
                  Try This Example
                </Button>
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">
          <Lightbulb className="w-8 h-8 mx-auto mb-2" />
          <p>No examples available for this model yet.</p>
        </div>
      )}
    </div>
  );

  const renderBestPractices = () => (
    <div className="space-y-4">
      <div className="grid gap-3">
        {getBestPracticesForModel(selectedModel).map((practice, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-blue-600">{index + 1}</span>
              </div>
              <div className="space-y-1">
                <h4 className="font-medium text-gray-900">{practice.title}</h4>
                <p className="text-sm text-gray-600">{practice.description}</p>
                {practice.examples && (
                  <ul className="text-xs text-gray-500 mt-2 space-y-1">
                    {practice.examples.map((ex, i) => (
                      <li key={i} className="flex items-center space-x-1">
                        <ChevronRight className="w-3 h-3" />
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <span>{selectedModel.name} Guide</span>
            </CardTitle>
            <CardDescription>
              Tips and examples for getting the best results
            </CardDescription>
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
        
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('tips')}
            className={`flex-1 text-sm py-2 px-3 rounded-md transition-colors ${
              activeTab === 'tips' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Tips
          </button>
          <button
            onClick={() => setActiveTab('examples')}
            className={`flex-1 text-sm py-2 px-3 rounded-md transition-colors ${
              activeTab === 'examples' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Examples
          </button>
          <button
            onClick={() => setActiveTab('best-practices')}
            className={`flex-1 text-sm py-2 px-3 rounded-md transition-colors ${
              activeTab === 'best-practices' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Best Practices
          </button>
        </div>
      </CardHeader>
      
      <CardContent>
        {activeTab === 'tips' && renderTips()}
        {activeTab === 'examples' && renderExamples()}
        {activeTab === 'best-practices' && renderBestPractices()}
      </CardContent>
    </Card>
  );
};

// Helper functions to generate content based on model type
const getTipsForModel = (model: AIModel) => {
  const baseTips = [
    {
      title: "Start with clear inputs",
      description: "The quality of your output depends heavily on the clarity and specificity of your inputs."
    },
    {
      title: "Experiment with parameters",
      description: "Try different parameter values to see how they affect the output quality and style."
    }
  ];

  switch (model.category) {
    case 'text-generation':
      return [
        ...baseTips,
        {
          title: "Be specific in your prompts",
          description: "Instead of 'write a story', try 'write a 500-word mystery story set in Victorian London'."
        },
        {
          title: "Use context and examples",
          description: "Provide background information and examples of the style or format you want."
        }
      ];
    
    case 'image-generation':
      return [
        ...baseTips,
        {
          title: "Include style and mood",
          description: "Specify artistic styles, lighting, colors, and overall mood in your prompts."
        },
        {
          title: "Mention composition details",
          description: "Include details about perspective, framing, and subject positioning."
        }
      ];
    
    case 'audio-generation':
      return [
        ...baseTips,
        {
          title: "Specify genre and instruments",
          description: "Be clear about musical style, tempo, and which instruments you want featured."
        },
        {
          title: "Consider duration carefully",
          description: "Longer audio takes more time and credits. Start with shorter clips to test ideas."
        }
      ];
    
    default:
      return baseTips;
  }
};

const getBestPracticesForModel = (model: AIModel) => {
  const basePractices = [
    {
      title: "Test with simple inputs first",
      description: "Start with basic prompts to understand how the model responds before trying complex scenarios.",
      examples: ["Try a simple test prompt", "Verify basic functionality"]
    },
    {
      title: "Save successful configurations",
      description: "When you find parameter combinations that work well, note them for future use.",
      examples: ["Screenshot good results", "Keep a notes file"]
    }
  ];

  switch (model.category) {
    case 'text-generation':
      return [
        ...basePractices,
        {
          title: "Structure your prompts clearly",
          description: "Use clear sections, bullet points, and explicit instructions for best results.",
          examples: ["Use 'Task:', 'Context:', 'Requirements:' sections", "Number your requirements"]
        },
        {
          title: "Control output length explicitly",
          description: "Specify desired word count, paragraph count, or format to get the right length.",
          examples: ["'Write exactly 3 paragraphs'", "'Keep under 200 words'"]
        }
      ];
    
    case 'image-generation':
      return [
        ...basePractices,
        {
          title: "Layer your prompt details",
          description: "Start with main subject, then add style, lighting, and fine details.",
          examples: ["Subject + setting + style + lighting", "Main focus → supporting elements → atmosphere"]
        },
        {
          title: "Use negative prompts effectively",
          description: "Specify what you don't want to avoid common unwanted elements.",
          examples: ["'avoid blurry, low quality'", "'no text, no watermarks'"]
        }
      ];
    
    default:
      return basePractices;
  }
};

UsageGuide.displayName = 'UsageGuide';

export default UsageGuide;