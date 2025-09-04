/**
 * Popular Models Component
 * Showcase featured AI models with quick access
 */
import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Image as ImageIcon, FileText, Music, TrendingUp } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface PopularModelsProps {}

interface PopularModel {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  creditsPerUse: number;
  href: string;
  featured?: boolean;
}

const PopularModels: React.FC<PopularModelsProps> = () => {
  const popularModels: PopularModel[] = [
    {
      id: 'sdxl',
      name: 'SDXL',
      description: 'High-quality AI image generation with Stable Diffusion XL',
      icon: <ImageIcon className="w-6 h-6" />,
      category: 'Image Generation',
      creditsPerUse: 1,
      href: '/models/sdxl',
      featured: true
    },
    {
      id: 'gpt-4',
      name: 'GPT-4',
      description: 'Advanced text generation and conversational AI',
      icon: <FileText className="w-6 h-6" />,
      category: 'Text Generation', 
      creditsPerUse: 1,
      href: '/models/gpt-4'
    },
    {
      id: 'whisper',
      name: 'Whisper',
      description: 'State-of-the-art speech recognition and transcription',
      icon: <Music className="w-6 h-6" />,
      category: 'Audio Processing',
      creditsPerUse: 1,
      href: '/models/whisper'
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <TrendingUp className="w-6 h-6 text-black" />
            <h2 className="text-3xl font-bold text-black">Popular Models</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Most used AI models by our community - start creating amazing content today
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularModels.map((model) => (
            <Card 
              key={model.id}
              className={`group border-2 transition-all duration-200 hover:shadow-lg ${
                model.featured 
                  ? 'border-black' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-black group-hover:text-white transition-colors">
                      {model.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-black">
                        {model.name}
                      </CardTitle>
                      {model.featured && (
                        <Badge className="bg-black text-white text-xs">Featured</Badge>
                      )}
                    </div>
                  </div>
                  <Badge variant="outline" className="text-gray-600 border-gray-300">
                    {model.creditsPerUse} credit{model.creditsPerUse !== 1 ? 's' : ''}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {model.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {model.category}
                  </span>
                  <Link href={model.href}>
                    <Button 
                      size="sm"
                      className={`${
                        model.featured
                          ? 'bg-black hover:bg-gray-800 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-black'
                      } transition-colors`}
                    >
                      Try Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/models">
            <Button 
              variant="outline" 
              size="lg"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              View All Models
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

PopularModels.displayName = 'PopularModels';

export default PopularModels;