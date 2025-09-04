/**
 * AI Model Selector Component
 * Allows users to browse and select AI models by category
 */
'use client';

import React, { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AIModel, ModelCategory } from '@/types/ai-models';
import { getAvailableModels, getModelCategories } from '@/lib/mock-models';
import { Zap, Clock, Sparkles, Star } from 'lucide-react';

interface ModelSelectorProps {
  selectedModel?: AIModel;
  onSelectModel: (model: AIModel) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onSelectModel }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const models = useMemo(() => getAvailableModels(), []);
  const categories = useMemo(() => getModelCategories(), []);
  
  const filteredModels = useMemo(() => {
    if (selectedCategory === 'all') {
      return models;
    }
    return models.filter(model => model.category === selectedCategory);
  }, [models, selectedCategory]);

  const getCategoryIcon = (category: ModelCategory) => {
    const iconMap = {
      'text-generation': '✏️',
      'image-generation': '🎨',
      'image-editing': '🖼️',
      'audio-generation': '🎵',
      'video-generation': '🎬',
      'code-generation': '💻',
      'translation': '🌐',
      'summarization': '📝'
    };
    return iconMap[category] || '🔧';
  };

  const formatCategoryName = (category: string) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">
          Choose Your AI Model
        </h2>
        <p className="text-gray-600">
          Select from our collection of powerful AI models
        </p>
      </div>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 gap-1">
          <TabsTrigger value="all" className="text-sm">
            All Models
          </TabsTrigger>
          {categories.slice(0, 5).map((category) => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="text-sm"
            >
              {getCategoryIcon(category.id as ModelCategory)} {formatCategoryName(category.name)}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <ModelGrid models={filteredModels} selectedModel={selectedModel} onSelectModel={onSelectModel} />
        </TabsContent>
        
        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-6">
            <ModelGrid 
              models={filteredModels} 
              selectedModel={selectedModel} 
              onSelectModel={onSelectModel} 
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

interface ModelGridProps {
  models: AIModel[];
  selectedModel?: AIModel;
  onSelectModel: (model: AIModel) => void;
}

const ModelGrid: React.FC<ModelGridProps> = ({ models, selectedModel, onSelectModel }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {models.map((model) => (
        <ModelCard
          key={model.id}
          model={model}
          isSelected={selectedModel?.id === model.id}
          onSelect={() => onSelectModel(model)}
        />
      ))}
    </div>
  );
};

interface ModelCardProps {
  model: AIModel;
  isSelected: boolean;
  onSelect: () => void;
}

const ModelCard: React.FC<ModelCardProps> = ({ model, isSelected, onSelect }) => {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
        isSelected 
          ? 'ring-2 ring-black shadow-md' 
          : 'hover:ring-1 hover:ring-gray-200'
      }`}
      onClick={onSelect}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg leading-tight">
              {model.name}
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              {model.provider} • v{model.version}
            </CardDescription>
          </div>
          
          <div className="flex flex-col items-end space-y-1">
            {model.isPopular && (
              <Badge variant="secondary" className="text-xs">
                <Star className="w-3 h-3 mr-1" />
                Popular
              </Badge>
            )}
            {model.isNew && (
              <Badge variant="outline" className="text-xs">
                <Sparkles className="w-3 h-3 mr-1" />
                New
              </Badge>
            )}
          </div>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2">
          {model.description}
        </p>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Pricing Info */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1 text-gray-600">
              <Zap className="w-4 h-4" />
              <span>{model.pricing.creditsPerUse} credits</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{model.pricing.estimatedTime}</span>
            </div>
          </div>
          
          {/* Capabilities */}
          <div className="flex flex-wrap gap-1">
            {model.capabilities.slice(0, 3).map((capability, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {capability}
              </Badge>
            ))}
            {model.capabilities.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{model.capabilities.length - 3}
              </Badge>
            )}
          </div>
          
          {/* Select Button */}
          <Button 
            variant={isSelected ? "default" : "outline"} 
            size="sm" 
            className="w-full"
          >
            {isSelected ? 'Selected' : 'Select Model'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

ModelSelector.displayName = 'ModelSelector';

export default ModelSelector;