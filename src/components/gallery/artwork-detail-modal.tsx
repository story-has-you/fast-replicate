/**
 * Artwork Detail Modal Component
 * 作品详情模态框组件
 */

import React from 'react';
import Image from 'next/image';
import { Heart, Download, Share2, Calendar, Settings, User } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FeaturedArtwork, ModelType } from '@/types/gallery';

interface ArtworkDetailModalProps {
  /** Artwork to display in detail */
  artwork: FeaturedArtwork | null;
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback to close the modal */
  onClose: () => void;
}

/**
 * Format date for display
 * 格式化日期显示
 */
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Render generation parameters
 * 渲染生成参数
 */
const GenerationParams: React.FC<{ params: Record<string, unknown> }> = ({
  params,
}) => (
  <div className="space-y-2">
    <h4 className="flex items-center text-sm font-medium">
      <Settings className="h-4 w-4 mr-2" />
      Generation Parameters
    </h4>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
      {Object.entries(params).map(([key, value]) => (
        <div key={key} className="flex justify-between">
          <span className="text-muted-foreground capitalize">
            {key.replace(/_/g, ' ')}:
          </span>
          <span className="font-medium">{String(value)}</span>
        </div>
      ))}
    </div>
  </div>
);

/**
 * Main content display based on model type
 * 根据模型类型显示主要内容
 */
const MainContent: React.FC<{ artwork: FeaturedArtwork }> = ({ artwork }) => {
  if (artwork.modelType === ModelType.IMAGE && artwork.contentUrl) {
    return (
      <div className="relative aspect-square max-h-[60vh] overflow-hidden rounded-lg bg-muted">
        <Image
          src={artwork.contentUrl}
          alt={artwork.title}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 60vw"
          priority
        />
      </div>
    );
  }

  if (artwork.modelType === ModelType.TEXT) {
    return (
      <div className="rounded-lg bg-muted/50 p-6">
        <div className="prose prose-sm max-w-none">
          <h4 className="text-lg font-medium mb-4">Generated Text Content</h4>
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {/* For demo purposes, showing a placeholder text */}
            {artwork.modelType === ModelType.TEXT && artwork.title === 'AI-Generated Poetry' && (
              <>
                <p className="font-medium mb-2">Haiku: AI & Human Collaboration</p>
                <p className="italic">
                  Silicon minds dream,<br />
                  Human hearts guide the vision—<br />
                  Art blooms from their dance.
                </p>
              </>
            )}
            {artwork.modelType === ModelType.TEXT && artwork.title === 'Space Exploration Story' && (
              <>
                <p className="font-medium mb-2">The Martian Artifact</p>
                <p>
                  Dr. Sarah Chen&apos;s gloved hands trembled as she brushed away the crimson dust from the metallic surface. 
                  After three months of excavation in the Valles Marineris canyon, her team had uncovered something that 
                  would change humanity&apos;s understanding of the cosmos forever. The artifact pulsed with a soft, blue light—
                  a heartbeat from an ancient civilization that once called Mars home...
                </p>
              </>
            )}
            {artwork.modelType === ModelType.TEXT && artwork.title === 'Marketing Copy' && (
              <>
                <p className="font-medium mb-2">Sustainable Fashion Campaign</p>
                <p>
                  <strong>Elevate Your Style. Protect Our Planet.</strong><br />
                  Join the sustainable fashion revolution with EcoThread—where every piece tells a story of conscious 
                  craftsmanship and environmental responsibility. Our premium collection features timeless designs created 
                  from innovative eco-friendly materials, perfect for the modern professional who values both style and sustainability.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (artwork.modelType === ModelType.AUDIO) {
    return (
      <div className="rounded-lg bg-muted/50 p-8 text-center">
        <div className="mx-auto max-w-md">
          <div className="h-32 w-32 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <div className="text-6xl">🎵</div>
          </div>
          <h4 className="text-lg font-medium mb-2">Audio Content</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Generated audio track - {artwork.title}
          </p>
          <Button variant="outline" className="w-full">
            Play Audio Sample
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-muted/50 p-8 text-center">
      <p className="text-muted-foreground">Content preview not available</p>
    </div>
  );
};

/**
 * Artwork Detail Modal Component
 */
const ArtworkDetailModal: React.FC<ArtworkDetailModalProps> = ({
  artwork,
  isOpen,
  onClose,
}) => {
  if (!artwork) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {artwork.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Main Content */}
          <MainContent artwork={artwork} />

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            <Button variant="outline" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              {artwork.likesCount} Likes
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          <Separator />

          {/* Artwork Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Basic Info */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-3">Artwork Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Model:</span>
                    <Badge variant="secondary">{artwork.modelName}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Type:</span>
                    <Badge variant="outline" className="capitalize">
                      {artwork.modelType}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Rating:</span>
                    <span className="text-sm font-medium">
                      {artwork.qualityRating.toFixed(1)}★
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Visibility:</span>
                    <Badge variant={artwork.visibility === 'public' ? 'default' : 'secondary'}>
                      {artwork.visibility}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Creator Info */}
              <div>
                <h4 className="flex items-center text-sm font-medium mb-2">
                  <User className="h-4 w-4 mr-2" />
                  Creator
                </h4>
                <div className="flex items-center space-x-3">
                  {artwork.creator.avatar && (
                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        src={artwork.creator.avatar}
                        alt={artwork.creator.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{artwork.creator.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(artwork.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Prompt and Parameters */}
            <div className="space-y-4">
              {/* Prompt */}
              <div>
                <h4 className="text-sm font-medium mb-2">Original Prompt</h4>
                <div className="rounded-md bg-muted/50 p-3">
                  <p className="text-sm leading-relaxed">{artwork.prompt}</p>
                </div>
              </div>

              {/* Generation Parameters */}
              <GenerationParams params={artwork.generationParams} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

ArtworkDetailModal.displayName = 'ArtworkDetailModal';

export default ArtworkDetailModal;