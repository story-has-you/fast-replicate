import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ModelCategory {
  name: string;
  description: string;
  icon: string;
}

/**
 * Model categories section displaying different types of AI models available
 */
const ModelCategoriesSection: React.FC = () => {
  const categories: ModelCategory[] = [
    {
      name: 'Text Generation',
      description: 'GPT, Claude, and more',
      icon: '📝'
    },
    {
      name: 'Image Generation',
      description: 'DALL-E, Midjourney, Stable Diffusion',
      icon: '🎨'
    },
    {
      name: 'Audio Generation',
      description: 'Music, speech, and sound effects',
      icon: '🎵'
    },
    {
      name: 'Video Generation',
      description: 'Video creation and editing',
      icon: '🎬'
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore AI Models
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our curated collection of state-of-the-art AI models
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <CardHeader className="text-center">
                <div className="text-4xl mb-4">{category.icon}</div>
                <CardTitle className="text-lg">{category.name}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

ModelCategoriesSection.displayName = 'ModelCategoriesSection';

export default ModelCategoriesSection;