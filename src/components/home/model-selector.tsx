import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AIModel } from '@/types/ai-models';
import { getModelCategories } from '@/lib/mock-models';
import { Sparkles, Star, Zap } from 'lucide-react';

/**
 * Props for ModelSelector component
 */
interface ModelSelectorProps {
  models: AIModel[];
  selectedModel?: AIModel;
  onModelSelect: (model: AIModel) => void;
  className?: string;
}

/**
 * AI Model Selector Component
 * Displays available AI models in a grid with categories and selection functionality
 */
const ModelSelector: React.FC<ModelSelectorProps> = ({
  models,
  selectedModel,
  onModelSelect,
  className = ''
}) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  
  const categories = React.useMemo(() => {
    return [
      { id: 'all', name: 'All Models', count: models.length },
      ...getModelCategories()
    ];
  }, [models]);

  const filteredModels = React.useMemo(() => {
    if (selectedCategory === 'all') {
      return models;
    }
    return models.filter(model => model.category === selectedCategory);
  }, [models, selectedCategory]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'text-generation':
        return '📝';
      case 'image-generation':
        return '🎨';
      case 'image-editing':
        return '✏️';
      case 'audio-generation':
        return '🎵';
      case 'video-generation':
        return '🎬';
      case 'code-generation':
        return '💻';
      case 'translation':
        return '🌍';
      case 'summarization':
        return '📋';
      default:
        return '🤖';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className={`text-sm ${
              selectedCategory === category.id
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-white text-black border-gray-300 hover:bg-gray-50'
            }`}
          >
            {category.id !== 'all' && (
              <span className="mr-1">{getCategoryIcon(category.id)}</span>
            )}
            {category.name}
            <Badge 
              variant="secondary" 
              className="ml-2 text-xs bg-gray-100 text-gray-600"
            >
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredModels.map((model) => (
          <Card
            key={model.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedModel?.id === model.id
                ? 'ring-2 ring-black bg-gray-50'
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onModelSelect(model)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg font-semibold text-black">
                      {model.name}
                    </CardTitle>
                    {model.isPopular && (
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                        <Star className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                    {model.isNew && (
                      <Badge className="bg-green-100 text-green-800 border-green-300">
                        <Sparkles className="w-3 h-3 mr-1" />
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{model.provider}</p>
                </div>
                <span className="text-2xl" role="img" aria-label="category">
                  {getCategoryIcon(model.category)}
                </span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <CardDescription className="text-sm text-gray-600 line-clamp-2">
                {model.description}
              </CardDescription>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-gray-500">
                  <Zap className="w-4 h-4" />
                  <span>{model.pricing.creditsPerUse} credits</span>
                </div>
                <span className="text-gray-500">{model.pricing.estimatedTime}</span>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {model.capabilities.slice(0, 3).map((capability, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="text-xs bg-gray-50 text-gray-600 border-gray-200"
                  >
                    {capability}
                  </Badge>
                ))}
                {model.capabilities.length > 3 && (
                  <Badge variant="outline" className="text-xs bg-gray-50 text-gray-600 border-gray-200">
                    +{model.capabilities.length - 3}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredModels.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No models found in this category.</p>
        </div>
      )}
    </div>
  );
};

ModelSelector.displayName = 'ModelSelector';

export default ModelSelector;