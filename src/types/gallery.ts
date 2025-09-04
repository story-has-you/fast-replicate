/**
 * Gallery showcase types for featured AI-generated content
 * 精选作品展示相关类型定义
 */

/**
 * AI model types for content categorization
 * AI模型类型，用于内容分类
 */
export enum ModelType {
  TEXT = 'text',
  IMAGE = 'image',
  AUDIO = 'audio',
  VIDEO = 'video',
}

/**
 * Content visibility settings
 * 内容可见性设置
 */
export enum VisibilityType {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

/**
 * Sort options for gallery display
 * 画廊显示的排序选项
 */
export enum SortOption {
  MOST_LIKED = 'most_liked',
  RECENT = 'recent',
  TOP_RATED = 'top_rated',
}

/**
 * Generation parameters for AI models
 * AI模型的生成参数
 */
export interface GenerationParams {
  /** Model identifier */
  model: string;
  /** Generation seed for reproducibility */
  seed?: number;
  /** Additional model-specific parameters */
  [key: string]: unknown;
}

/**
 * Featured artwork data structure
 * 精选作品数据结构
 */
export interface FeaturedArtwork {
  /** Unique identifier */
  id: string;
  /** Content title */
  title: string;
  /** User prompt or input text */
  prompt: string;
  /** Generated content URL (image, audio, etc.) */
  contentUrl: string;
  /** Thumbnail URL for preview */
  thumbnailUrl: string;
  /** AI model type */
  modelType: ModelType;
  /** Model name used for generation */
  modelName: string;
  /** Number of likes received */
  likesCount: number;
  /** Quality rating (1-10) */
  qualityRating: number;
  /** Content visibility */
  visibility: VisibilityType;
  /** Generation parameters used */
  generationParams: GenerationParams;
  /** Creation timestamp */
  createdAt: Date;
  /** Creator information */
  creator: {
    id: string;
    name: string;
    avatar?: string;
  };
}

/**
 * Gallery filter options
 * 画廊筛选选项
 */
export interface GalleryFilters {
  /** Filter by model type */
  modelType?: ModelType | 'all';
  /** Filter by visibility */
  visibility?: VisibilityType;
  /** Minimum quality rating */
  minQuality?: number;
  /** Sort option */
  sortBy: SortOption;
}