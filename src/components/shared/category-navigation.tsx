/**
 * Category Navigation Component
 * Navigation tabs for different AI model categories
 */
import React from 'react';
import Link from 'next/link';
import { FileText, Image as ImageIcon, Music, Video } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface CategoryNavigationProps {}

interface CategoryItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  description: string;
}

const CategoryNavigation: React.FC<CategoryNavigationProps> = () => {
  const categories: CategoryItem[] = [
    {
      id: 'text-generation',
      label: 'Text Generation',
      icon: <FileText className="w-5 h-5" />,
      href: '/models/text-generation',
      description: 'AI-powered text and content generation'
    },
    {
      id: 'image-generation',
      label: 'Image Generation',
      icon: <ImageIcon className="w-5 h-5" />,
      href: '/models/image-generation',
      description: 'Create stunning visuals with AI'
    },
    {
      id: 'audio-generation',
      label: 'Audio Generation',
      icon: <Music className="w-5 h-5" />,
      href: '/models/audio-generation',
      description: 'Generate music and audio content'
    },
    {
      id: 'video-generation',
      label: 'Video Generation',
      icon: <Video className="w-5 h-5" />,
      href: '/models/video-generation',
      description: 'AI-powered video creation'
    }
  ];

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-black mb-2">
            Explore AI Model Categories
          </h2>
          <p className="text-gray-600">
            Choose from our comprehensive collection of AI models
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group bg-white rounded-lg border border-gray-200 p-6 hover:border-gray-300 hover:shadow-md transition-all duration-200"
            >
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg group-hover:bg-black group-hover:text-white transition-colors">
                  {category.icon}
                </div>
                <h3 className="font-medium text-black group-hover:text-gray-900">
                  {category.label}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

CategoryNavigation.displayName = 'CategoryNavigation';

export default CategoryNavigation;