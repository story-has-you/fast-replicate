/**
 * AI Model Configuration Types
 * Defines the structure for AI models, parameters, and related configurations
 */

export type ParameterType = 
  | 'text' 
  | 'number' 
  | 'boolean' 
  | 'select' 
  | 'multiSelect' 
  | 'file' 
  | 'range';

export interface ParameterOption {
  label: string;
  value: string | number | boolean;
  description?: string;
}

export interface ModelParameter {
  key: string;
  label: string;
  type: ParameterType;
  description: string;
  required: boolean;
  defaultValue?: string | number | boolean;
  placeholder?: string;
  options?: ParameterOption[];
  min?: number;
  max?: number;
  step?: number;
  accept?: string; // for file inputs
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    message?: string;
  };
}

export type ModelCategory = 
  | 'text-generation'
  | 'image-generation' 
  | 'image-editing'
  | 'audio-generation'
  | 'video-generation'
  | 'code-generation'
  | 'translation'
  | 'summarization';

export interface AIModel {
  id: string;
  name: string;
  description: string;
  category: ModelCategory;
  provider: string;
  version: string;
  isPopular?: boolean;
  isNew?: boolean;
  pricing: {
    creditsPerUse: number;
    estimatedTime: string; // e.g., "~30 seconds"
  };
  parameters: ModelParameter[];
  examples?: {
    title: string;
    description: string;
    inputs: Record<string, string | number | boolean>;
    outputPreview?: string;
  }[];
  capabilities: string[];
  limitations?: string[];
}

export interface ModelResult {
  id: string;
  modelId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  inputs: Record<string, string | number | boolean>;
  outputs?: {
    type: 'text' | 'image' | 'audio' | 'video' | 'file';
    content: string | string[]; // URL(s) or content
    metadata?: Record<string, string | number | boolean>;
  };
  error?: string;
  createdAt: Date;
  completedAt?: Date;
  processingTime?: number; // seconds
  creditsUsed: number;
}

export interface ModelUsage {
  totalRuns: number;
  successfulRuns: number;
  totalCreditsUsed: number;
  avgProcessingTime: number;
  lastUsed?: Date;
}