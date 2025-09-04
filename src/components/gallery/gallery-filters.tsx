/**
 * Gallery Filters Component
 * 画廊筛选和排序组件
 */

import React from 'react';
import { Filter, SortAsc } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ModelType, SortOption, GalleryFilters } from '@/types/gallery';
import { cn } from '@/lib/utils';

interface GalleryFiltersProps {
  /** Current filter state */
  filters: GalleryFilters;
  /** Callback when filters change */
  onFiltersChange: (filters: GalleryFilters) => void;
  /** Total count of artworks (for display) */
  totalCount?: number;
  /** Filtered count of artworks (for display) */
  filteredCount?: number;
  /** Optional className for styling */
  className?: string;
}

/**
 * Model type filter options
 */
const modelTypeOptions = [
  { value: 'all' as const, label: 'All Types', icon: '🎨' },
  { value: ModelType.IMAGE, label: 'Images', icon: '🖼️' },
  { value: ModelType.TEXT, label: 'Text', icon: '📝' },
  { value: ModelType.AUDIO, label: 'Audio', icon: '🎵' },
  { value: ModelType.VIDEO, label: 'Video', icon: '🎬' },
];

/**
 * Sort options
 */
const sortOptions = [
  { value: SortOption.MOST_LIKED, label: 'Most Liked' },
  { value: SortOption.RECENT, label: 'Most Recent' },
  { value: SortOption.TOP_RATED, label: 'Top Rated' },
];

/**
 * Gallery Filters Component
 */
const GalleryFilters: React.FC<GalleryFiltersProps> = ({
  filters,
  onFiltersChange,
  totalCount,
  filteredCount,
  className,
}) => {
  const handleModelTypeChange = (modelType: ModelType | 'all') => {
    onFiltersChange({
      ...filters,
      modelType,
    });
  };

  const handleSortChange = (sortBy: SortOption) => {
    onFiltersChange({
      ...filters,
      sortBy,
    });
  };

  const handleVisibilityToggle = () => {
    // Toggle between showing all and public only
    const newVisibility = filters.visibility === 'public' ? undefined : 'public';
    onFiltersChange({
      ...filters,
      visibility: newVisibility,
    });
  };

  const handleQualityFilter = () => {
    // Toggle between showing all and high quality only (rating > 8.0)
    const newMinQuality = filters.minQuality === 8.0 ? undefined : 8.0;
    onFiltersChange({
      ...filters,
      minQuality: newMinQuality,
    });
  };

  const resetFilters = () => {
    onFiltersChange({
      modelType: 'all',
      sortBy: SortOption.MOST_LIKED,
      visibility: undefined,
      minQuality: undefined,
    });
  };

  const hasActiveFilters = 
    filters.modelType !== 'all' || 
    filters.visibility !== undefined || 
    filters.minQuality !== undefined;

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header with counts */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-medium">Featured Artworks</h3>
          {filteredCount !== undefined && totalCount !== undefined && (
            <Badge variant="secondary" className="ml-2">
              {filteredCount} of {totalCount}
            </Badge>
          )}
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-muted-foreground"
          >
            Reset Filters
          </Button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Model Type Filter */}
        <div className="flex flex-wrap gap-2">
          {modelTypeOptions.map((option) => (
            <Button
              key={option.value}
              variant={filters.modelType === option.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleModelTypeChange(option.value)}
              className="text-xs"
            >
              <span className="mr-1">{option.icon}</span>
              {option.label}
            </Button>
          ))}
        </div>

        {/* Divider */}
        <div className="hidden sm:block h-6 w-px bg-border" />

        {/* Additional Filters */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filters.visibility === 'public' ? 'default' : 'outline'}
            size="sm"
            onClick={handleVisibilityToggle}
            className="text-xs"
          >
            Public Only
          </Button>
          <Button
            variant={filters.minQuality === 8.0 ? 'default' : 'outline'}
            size="sm"
            onClick={handleQualityFilter}
            className="text-xs"
          >
            High Quality (8.0+★)
          </Button>
        </div>

        {/* Divider */}
        <div className="hidden sm:block h-6 w-px bg-border" />

        {/* Sort Selection */}
        <div className="flex items-center space-x-2">
          <SortAsc className="h-4 w-4 text-muted-foreground" />
          <Select
            value={filters.sortBy}
            onValueChange={(value: SortOption) => handleSortChange(value)}
          >
            <SelectTrigger className="w-[140px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {filters.modelType !== 'all' && (
            <Badge variant="secondary" className="text-xs">
              {modelTypeOptions.find(opt => opt.value === filters.modelType)?.label}
            </Badge>
          )}
          {filters.visibility === 'public' && (
            <Badge variant="secondary" className="text-xs">
              Public Only
            </Badge>
          )}
          {filters.minQuality === 8.0 && (
            <Badge variant="secondary" className="text-xs">
              High Quality
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

GalleryFilters.displayName = 'GalleryFilters';

export default GalleryFilters;