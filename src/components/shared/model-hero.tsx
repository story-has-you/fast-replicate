/**
 * Model Hero Component
 * Displays the model title and description in the tool workspace
 */
import React from 'react';

interface ModelHeroProps {
  title: string;
  description: string;
}

const ModelHero: React.FC<ModelHeroProps> = ({ title, description }) => {
  return (
    <div className="text-center space-y-4 mb-8">
      <h1 className="text-4xl font-bold text-black">
        {title}
      </h1>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        {description}
      </p>
    </div>
  );
};

ModelHero.displayName = 'ModelHero';

export default ModelHero;