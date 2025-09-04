/**
 * Featured Artwork Card Component
 * 精选作品卡片组件
 */

import React from 'react';
import Image from 'next/image';
import { Heart, Play, FileText, Volume2 } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FeaturedArtwork, ModelType } from '@/types/gallery';
import { cn } from '@/lib/utils';

interface ArtworkCardProps {
  /** Artwork data to display */
  artwork: FeaturedArtwork;
  /** Callback when card is clicked for details */
  onCardClick: (artwork: FeaturedArtwork) => void;
  /** Optional className for styling */
  className?: string;
}

/**
 * Get appropriate icon for model type
 * 根据模型类型获取对应图标
 */
const getModelTypeIcon = (modelType: ModelType): React.ReactNode => {
  switch (modelType) {
    case ModelType.AUDIO:
      return <Volume2 className="h-4 w-4" />;
    case ModelType.TEXT:
      return <FileText className="h-4 w-4" />;
    case ModelType.VIDEO:
      return <Play className="h-4 w-4" />;
    case ModelType.IMAGE:
    default:
      return null; // Images show thumbnails directly
  }
};

/**
 * Get display content based on model type
 * 根据模型类型获取显示内容
 */
const getDisplayContent = (artwork: FeaturedArtwork) => {
  if (artwork.modelType === ModelType.IMAGE && artwork.thumbnailUrl) {
    return (
      <div className="relative aspect-square overflow-hidden rounded-md bg-muted">
        <Image
          src={artwork.thumbnailUrl}
          alt={artwork.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>
    );
  }

  // For non-image content, show icon and model type
  return (
    <div className="flex aspect-square items-center justify-center rounded-md bg-muted/50">
      <div className="flex flex-col items-center space-y-2 text-muted-foreground">
        {getModelTypeIcon(artwork.modelType)}
        <span className="text-xs font-medium capitalize">
          {artwork.modelType}
        </span>
      </div>
    </div>
  );
};

/**
 * Artwork Card Component
 */
const ArtworkCard: React.FC<ArtworkCardProps> = ({
  artwork,
  onCardClick,
  className,
}) => {
  const handleCardClick = () => {
    onCardClick(artwork);
  };

  return (
    <Card
      className={cn(
        'group cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-1',
        className
      )}
      onClick={handleCardClick}
    >
      <CardContent className="p-3">
        {/* Content Display */}
        {getDisplayContent(artwork)}

        {/* Content Info */}
        <div className="mt-3 space-y-2">
          {/* Title */}
          <h3 className="line-clamp-2 text-sm font-medium leading-tight">
            {artwork.title}
          </h3>

          {/* Model Type Badge */}
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              {artwork.modelName}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {artwork.qualityRating.toFixed(1)}★
            </span>
          </div>

          {/* Prompt Preview */}
          <p className="line-clamp-2 text-xs text-muted-foreground">
            {artwork.prompt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            {/* Creator */}
            <div className="flex items-center space-x-2">
              {artwork.creator.avatar && (
                <div className="relative h-6 w-6 overflow-hidden rounded-full">
                  <Image
                    src={artwork.creator.avatar}
                    alt={artwork.creator.name}
                    fill
                    className="object-cover"
                    sizes="24px"
                  />
                </div>
              )}
              <span className="text-xs text-muted-foreground">
                {artwork.creator.name}
              </span>
            </div>

            {/* Likes */}
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-1 hover:text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                // Handle like action (future implementation)
              }}
            >
              <Heart className="h-3 w-3 mr-1" />
              <span className="text-xs">{artwork.likesCount}</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

ArtworkCard.displayName = 'ArtworkCard';

export default ArtworkCard;