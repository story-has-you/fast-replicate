/**
 * Featured Gallery Component
 * 精选作品画廊主组件
 */

'use client';

import React, { useState, useMemo } from 'react';

import ArtworkCard from './artwork-card';
import ArtworkDetailModal from './artwork-detail-modal';
import GalleryFilters from './gallery-filters';
import { Button } from '@/components/ui/button';
import { 
  FeaturedArtwork, 
  GalleryFilters as GalleryFiltersType, 
  SortOption 
} from '@/types/gallery';
import { mockFeaturedArtworks } from '@/lib/gallery/mock-data';

interface FeaturedGalleryProps {
  /** Optional className for styling */
  className?: string;
  /** Initial number of items to show */
  initialItemsToShow?: number;
  /** Number of items to load per "Load More" action */
  itemsPerLoad?: number;
}

/**
 * Filter artworks based on current filters
 * 根据当前筛选条件过滤作品
 */
const filterArtworks = (
  artworks: FeaturedArtwork[],
  filters: GalleryFiltersType
): FeaturedArtwork[] => {
  return artworks.filter((artwork) => {
    // Model type filter
    if (filters.modelType !== 'all' && artwork.modelType !== filters.modelType) {
      return false;
    }

    // Visibility filter
    if (filters.visibility && artwork.visibility !== filters.visibility) {
      return false;
    }

    // Quality rating filter
    if (filters.minQuality && artwork.qualityRating < filters.minQuality) {
      return false;
    }

    return true;
  });
};

/**
 * Sort artworks based on sort option
 * 根据排序选项对作品排序
 */
const sortArtworks = (
  artworks: FeaturedArtwork[],
  sortBy: SortOption
): FeaturedArtwork[] => {
  return [...artworks].sort((a, b) => {
    switch (sortBy) {
      case SortOption.MOST_LIKED:
        return b.likesCount - a.likesCount;
      case SortOption.RECENT:
        return b.createdAt.getTime() - a.createdAt.getTime();
      case SortOption.TOP_RATED:
        return b.qualityRating - a.qualityRating;
      default:
        return 0;
    }
  });
};

/**
 * Featured Gallery Component
 */
const FeaturedGallery: React.FC<FeaturedGalleryProps> = ({
  className = '',
  initialItemsToShow = 8,
  itemsPerLoad = 4,
}) => {
  // State management
  const [filters, setFilters] = useState<GalleryFiltersType>({
    modelType: 'all',
    sortBy: SortOption.MOST_LIKED,
  });

  const [selectedArtwork, setSelectedArtwork] = useState<FeaturedArtwork | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(initialItemsToShow);

  // Process artworks based on filters
  const processedArtworks = useMemo(() => {
    const filtered = filterArtworks(mockFeaturedArtworks, filters);
    const sorted = sortArtworks(filtered, filters.sortBy);
    return sorted;
  }, [filters]);

  // Current visible artworks
  const visibleArtworks = useMemo(() => {
    return processedArtworks.slice(0, itemsToShow);
  }, [processedArtworks, itemsToShow]);

  // Handlers
  const handleFiltersChange = (newFilters: GalleryFiltersType) => {
    setFilters(newFilters);
    setItemsToShow(initialItemsToShow); // Reset pagination when filters change
  };

  const handleCardClick = (artwork: FeaturedArtwork) => {
    setSelectedArtwork(artwork);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedArtwork(null);
  };

  const handleLoadMore = () => {
    setItemsToShow(prev => prev + itemsPerLoad);
  };

  const hasMoreItems = itemsToShow < processedArtworks.length;

  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Filters */}
        <GalleryFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          totalCount={mockFeaturedArtworks.length}
          filteredCount={processedArtworks.length}
          className="mb-8"
        />

        {/* Gallery Grid */}
        {visibleArtworks.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {visibleArtworks.map((artwork) => (
                <ArtworkCard
                  key={artwork.id}
                  artwork={artwork}
                  onCardClick={handleCardClick}
                  className="w-full"
                />
              ))}
            </div>

            {/* Load More Button */}
            {hasMoreItems && (
              <div className="text-center mt-12">
                <Button
                  onClick={handleLoadMore}
                  variant="outline"
                  size="lg"
                  className="px-8"
                >
                  Load More Artworks
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  Showing {visibleArtworks.length} of {processedArtworks.length} artworks
                </p>
              </div>
            )}
          </>
        ) : (
          // Empty state
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-xl font-medium mb-2">No artworks found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters to see more results.
            </p>
            <Button
              onClick={() => handleFiltersChange({
                modelType: 'all',
                sortBy: SortOption.MOST_LIKED,
              })}
              variant="outline"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <ArtworkDetailModal
        artwork={selectedArtwork}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </section>
  );
};

FeaturedGallery.displayName = 'FeaturedGallery';

export default FeaturedGallery;