/**
 * Mock API Service
 * Simulates AI model prediction requests for development and testing
 */

import { AIModel, ModelResult } from '@/types/ai-models';

// Mock delay function
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generate random result ID
const generateResultId = () => `result_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Mock successful text generation
const generateMockTextOutput = (model: AIModel, inputs: Record<string, string | number | boolean>): string => {
  const prompt = inputs.prompt || inputs.text || 'Hello world';
  
  switch (model.id) {
    case 'gpt-4-turbo':
      return `Based on your prompt "${prompt}", here's a creative response:\n\nThis is a simulated text generation result from ${model.name}. In a real implementation, this would be the actual AI-generated content based on your input parameters.\n\nThe model processed your request with the following parameters:\n${Object.entries(inputs)
        .filter(([key]) => key !== 'prompt')
        .map(([key, value]) => `• ${key}: ${value}`)
        .join('\n')}`;
    
    default:
      return `Mock response from ${model.name}: ${prompt}\n\nThis is a placeholder response for development purposes.`;
  }
};

// Mock image URLs (using placeholder images)
const generateMockImageOutput = (_model: AIModel, inputs: Record<string, string | number | boolean>): string[] => {
  const size = (inputs.size as string) || '1024x1024';
  const [width, height] = size.split('x').map(Number);
  
  // Generate mock image URLs using placeholder services
  return [
    `https://picsum.photos/${width}/${height}?random=${Math.floor(Math.random() * 1000)}`,
    // You could add more images here for multi-image models
  ];
};

// Mock audio URLs
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const generateMockAudioOutput = (_model: AIModel, _inputs: Record<string, string | number | boolean>): string[] => {
  // In a real app, these would be actual generated audio files
  return [
    `https://www.soundjay.com/misc/sounds-human-male-scream-03.mp3` // Placeholder
  ];
};

// Simulate processing with realistic delays
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const simulateProcessing = async (_model: AIModel): Promise<void> => {
  const baseTime = 2000; // 2 seconds base
  const randomTime = Math.random() * 3000; // up to 3 more seconds
  const totalTime = baseTime + randomTime;
  
  await delay(totalTime);
};

/**
 * Mock API function to simulate model prediction
 */
export const simulateModelPrediction = async (
  model: AIModel,
  inputs: Record<string, string | number | boolean>
): Promise<ModelResult> => {
  const resultId = generateResultId();
  const createdAt = new Date();

  // Create initial result
  let result: ModelResult = {
    id: resultId,
    modelId: model.id,
    status: 'pending',
    inputs,
    createdAt,
    creditsUsed: model.pricing.creditsPerUse
  };

  // Simulate immediate pending status
  await delay(100);

  // Update to processing
  result = {
    ...result,
    status: 'processing'
  };

  // Simulate processing time
  await simulateProcessing(model);

  // Simulate occasional failures (5% chance)
  if (Math.random() < 0.05) {
    return {
      ...result,
      status: 'failed',
      error: 'Mock error: Model temporarily unavailable. Please try again.',
      completedAt: new Date(),
      processingTime: Math.round((new Date().getTime() - createdAt.getTime()) / 1000)
    };
  }

  // Generate mock outputs based on model category
  let outputs;
  switch (model.category) {
    case 'text-generation':
    case 'code-generation':
    case 'translation':
    case 'summarization':
      outputs = {
        type: 'text' as const,
        content: generateMockTextOutput(model, inputs),
        metadata: { 
          wordCount: Math.floor(Math.random() * 500) + 100,
          language: 'en'
        }
      };
      break;

    case 'image-generation':
    case 'image-editing':
      outputs = {
        type: 'image' as const,
        content: generateMockImageOutput(model, inputs),
        metadata: {
          width: 1024,
          height: 1024,
          format: 'png'
        }
      };
      break;

    case 'audio-generation':
      outputs = {
        type: 'audio' as const,
        content: generateMockAudioOutput(model, inputs),
        metadata: {
          duration: inputs.duration || 30,
          format: 'mp3',
          sampleRate: 44100
        }
      };
      break;

    case 'video-generation':
      outputs = {
        type: 'video' as const,
        content: ['https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'],
        metadata: {
          duration: inputs.duration || 10,
          width: 1280,
          height: 720,
          format: 'mp4'
        }
      };
      break;

    default:
      outputs = {
        type: 'text' as const,
        content: `Mock output from ${model.name}`,
        metadata: {}
      };
  }

  return {
    ...result,
    status: 'completed',
    outputs,
    completedAt: new Date(),
    processingTime: Math.round((new Date().getTime() - createdAt.getTime()) / 1000)
  };
};

/**
 * Hook to manage model prediction state
 */
export const useMockPrediction = () => {
  const [currentResult, setCurrentResult] = React.useState<ModelResult | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const runPrediction = async (
    model: AIModel, 
    inputs: Record<string, string | number | boolean>
  ) => {
    setIsLoading(true);
    setCurrentResult(null);

    try {
      const result = await simulateModelPrediction(model, inputs);
      setCurrentResult(result);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Prediction error:', error);
      setCurrentResult({
        id: generateResultId(),
        modelId: model.id,
        status: 'failed',
        inputs,
        error: 'Unexpected error occurred. Please try again.',
        createdAt: new Date(),
        completedAt: new Date(),
        creditsUsed: 0
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearResult = () => {
    setCurrentResult(null);
  };

  return {
    currentResult,
    isLoading,
    runPrediction,
    clearResult
  };
};

// We need to add React import at the top for the hook
import React from 'react';

/**
 * Get model usage statistics (mock data)
 */
export const getMockModelUsage = () => {
  return {
    totalRuns: Math.floor(Math.random() * 10000) + 1000,
    successfulRuns: Math.floor(Math.random() * 9500) + 950,
    totalCreditsUsed: Math.floor(Math.random() * 50000) + 10000,
    avgProcessingTime: Math.floor(Math.random() * 30) + 5,
    lastUsed: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // Within last week
  };
};

/**
 * Validate model inputs before prediction
 */
export const validateModelInputs = (
  model: AIModel,
  inputs: Record<string, string | number | boolean>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  model.parameters.forEach(param => {
    const value = inputs[param.key];
    
    // Required field validation
    if (param.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      errors.push(`${param.label} is required`);
    }
    
    // Type-specific validation
    if (value !== undefined && value !== '') {
      switch (param.type) {
        case 'number':
        case 'range':
          const numValue = typeof value === 'number' ? value : parseFloat(String(value));
          if (isNaN(numValue)) {
            errors.push(`${param.label} must be a valid number`);
          } else {
            if (param.min !== undefined && numValue < param.min) {
              errors.push(`${param.label} must be at least ${param.min}`);
            }
            if (param.max !== undefined && numValue > param.max) {
              errors.push(`${param.label} must be no more than ${param.max}`);
            }
          }
          break;
          
        case 'text':
          const strValue = String(value);
          if (param.validation?.minLength && strValue.length < param.validation.minLength) {
            errors.push(`${param.label} must be at least ${param.validation.minLength} characters`);
          }
          if (param.validation?.maxLength && strValue.length > param.validation.maxLength) {
            errors.push(`${param.label} must be no more than ${param.validation.maxLength} characters`);
          }
          break;
      }
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
};