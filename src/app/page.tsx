
/**
 * Home page component
 * Complete AI model playground with tool selection and prediction
 */
'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ModelSelector from '@/components/features/model-selector';
import ParameterForm from '@/components/features/parameter-form';
import ResultDisplay from '@/components/features/result-display';
import UsageGuide from '@/components/features/usage-guide';
import { AIModel, ModelResult } from '@/types/ai-models';
import { simulateModelPrediction } from '@/lib/mock-api';
import { getPopularModels } from '@/lib/mock-models';
import { 
  Sparkles, 
  Zap, 
  Users, 
  TrendingUp,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const Home: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<AIModel | undefined>();
  const [currentResult, setCurrentResult] = useState<ModelResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showGuide, setShowGuide] = useState(true);

  const popularModels = getPopularModels();

  const handleModelSelect = useCallback((model: AIModel) => {
    setSelectedModel(model);
    setCurrentResult(null); // Clear previous results when changing models
  }, []);

  const handleParameterSubmit = useCallback(async (parameters: Record<string, string | number | boolean>) => {
    if (!selectedModel) return;

    setIsLoading(true);
    setCurrentResult(null);

    try {
      const result = await simulateModelPrediction(selectedModel, parameters);
      setCurrentResult(result);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Prediction error:', error);
      setCurrentResult({
        id: `error_${Date.now()}`,
        modelId: selectedModel.id,
        status: 'failed',
        inputs: parameters,
        error: 'Unexpected error occurred. Please try again.',
        createdAt: new Date(),
        completedAt: new Date(),
        creditsUsed: 0
      });
    } finally {
      setIsLoading(false);
    }
  }, [selectedModel]);

  const handleTryExample = useCallback((inputs: Record<string, string | number | boolean>) => {
    handleParameterSubmit(inputs);
  }, [handleParameterSubmit]);

  const handleRetry = useCallback(() => {
    if (currentResult && selectedModel) {
      handleParameterSubmit(currentResult.inputs);
    }
  }, [currentResult, selectedModel, handleParameterSubmit]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Fast Replicate</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful AI models at your fingertips. Generate text, images, audio, and more with 
              state-of-the-art machine learning models.
            </p>
            
            {/* Stats */}
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4" />
                <span>5+ AI Models</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>1000+ Users</span>
              </div>
              <div className="flex items-center space-x-1">
                <Zap className="w-4 h-4" />
                <span>Fast Generation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Model Selection */}
          <div className="lg:col-span-2 space-y-6">
            <ModelSelector 
              selectedModel={selectedModel}
              onSelectModel={handleModelSelect}
            />

            {/* Popular Models Quick Access */}
            {!selectedModel && popularModels.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-orange-500" />
                    <span>Popular Models</span>
                  </CardTitle>
                  <CardDescription>
                    Most used models by our community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {popularModels.slice(0, 4).map((model) => (
                      <div
                        key={model.id}
                        onClick={() => handleModelSelect(model)}
                        className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 hover:shadow-sm transition-all"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-900">{model.name}</h3>
                            <Badge variant="secondary" className="text-xs">
                              {model.pricing.creditsPerUse} credits
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {model.description}
                          </p>
                          <div className="flex items-center text-xs text-gray-500">
                            <span>{model.provider}</span>
                            <span className="mx-2">•</span>
                            <span>{model.pricing.estimatedTime}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Parameter Form */}
            {selectedModel && (
              <ParameterForm
                model={selectedModel}
                onSubmit={handleParameterSubmit}
                isLoading={isLoading}
              />
            )}
          </div>

          {/* Right Column - Guide and Results */}
          <div className="space-y-6">
            {/* Usage Guide */}
            <div className="space-y-3">
              <Button
                variant="ghost"
                onClick={() => setShowGuide(!showGuide)}
                className="w-full justify-between"
              >
                <span className="font-medium">Usage Guide</span>
                {showGuide ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
              
              {showGuide && (
                <UsageGuide
                  selectedModel={selectedModel}
                  onTryExample={handleTryExample}
                />
              )}
            </div>

            {/* Results */}
            {currentResult && selectedModel && (
              <ResultDisplay
                result={currentResult}
                model={selectedModel}
                onRetry={handleRetry}
              />
            )}

            {/* Getting Started CTA */}
            {!selectedModel && !currentResult && (
              <Card className="bg-gradient-to-br from-gray-50 to-gray-100">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto">
                    <ArrowRight className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900">Ready to Start?</h3>
                    <p className="text-sm text-gray-600">
                      Select an AI model from the left to begin generating amazing content
                    </p>
                  </div>
                  <Button 
                    onClick={() => {
                      const firstModel = popularModels[0];
                      if (firstModel) handleModelSelect(firstModel);
                    }}
                    className="w-full"
                    disabled={popularModels.length === 0}
                  >
                    Try {popularModels[0]?.name || 'a Model'}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>
              Powered by state-of-the-art AI models. 
              <span className="mx-2">•</span>
              Built with Next.js 15 & React 19
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

Home.displayName = "Home";

export default Home;
