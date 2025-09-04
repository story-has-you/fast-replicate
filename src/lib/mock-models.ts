import { AIModel } from '@/types/ai-models';

/**
 * Mock AI Models Data
 * This file contains sample AI models for development and testing purposes
 */

export const mockAIModels: AIModel[] = [
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    description: 'Advanced language model for text generation, analysis, and conversation',
    category: 'text-generation',
    provider: 'OpenAI',
    version: '1.0',
    isPopular: true,
    pricing: {
      creditsPerUse: 10,
      estimatedTime: '~5 seconds'
    },
    parameters: [
      {
        key: 'prompt',
        label: 'Prompt',
        type: 'text',
        description: 'Enter your text prompt or question',
        required: true,
        placeholder: 'Write a creative story about...'
      },
      {
        key: 'max_tokens',
        label: 'Max Tokens',
        type: 'range',
        description: 'Maximum number of tokens to generate',
        required: false,
        defaultValue: 1000,
        min: 100,
        max: 4000,
        step: 100
      },
      {
        key: 'temperature',
        label: 'Creativity',
        type: 'range',
        description: 'Higher values make output more creative and random',
        required: false,
        defaultValue: 0.7,
        min: 0,
        max: 1,
        step: 0.1
      }
    ],
    capabilities: ['Text Generation', 'Code Writing', 'Analysis', 'Translation'],
    examples: [
      {
        title: 'Creative Writing',
        description: 'Generate a short story',
        inputs: { prompt: 'Write a short story about a robot learning to paint' }
      }
    ]
  },
  {
    id: 'dall-e-3',
    name: 'DALL-E 3',
    description: 'Advanced AI model for generating high-quality images from text descriptions',
    category: 'image-generation',
    provider: 'OpenAI',
    version: '3.0',
    isPopular: true,
    pricing: {
      creditsPerUse: 25,
      estimatedTime: '~15 seconds'
    },
    parameters: [
      {
        key: 'prompt',
        label: 'Image Description',
        type: 'text',
        description: 'Describe the image you want to generate',
        required: true,
        placeholder: 'A futuristic city at sunset with flying cars...'
      },
      {
        key: 'size',
        label: 'Image Size',
        type: 'select',
        description: 'Choose the output image dimensions',
        required: true,
        defaultValue: '1024x1024',
        options: [
          { label: 'Square (1024×1024)', value: '1024x1024' },
          { label: 'Landscape (1792×1024)', value: '1792x1024' },
          { label: 'Portrait (1024×1792)', value: '1024x1792' }
        ]
      },
      {
        key: 'style',
        label: 'Art Style',
        type: 'select',
        description: 'Choose the artistic style',
        required: false,
        defaultValue: 'natural',
        options: [
          { label: 'Natural', value: 'natural' },
          { label: 'Vivid', value: 'vivid' }
        ]
      }
    ],
    capabilities: ['Image Generation', 'Artistic Styles', 'High Resolution'],
    examples: [
      {
        title: 'Fantasy Landscape',
        description: 'Generate a magical forest scene',
        inputs: { prompt: 'A magical forest with glowing mushrooms and fairy lights' }
      }
    ]
  },
  {
    id: 'stable-diffusion-xl',
    name: 'Stable Diffusion XL',
    description: 'Open-source image generation model with fine-tuned control',
    category: 'image-generation',
    provider: 'Stability AI',
    version: '1.0',
    pricing: {
      creditsPerUse: 15,
      estimatedTime: '~20 seconds'
    },
    parameters: [
      {
        key: 'prompt',
        label: 'Prompt',
        type: 'text',
        description: 'Detailed description of the image to generate',
        required: true,
        placeholder: 'A professional portrait of...'
      },
      {
        key: 'negative_prompt',
        label: 'Negative Prompt',
        type: 'text',
        description: 'What to avoid in the generated image',
        required: false,
        placeholder: 'blurry, low quality, distorted...'
      },
      {
        key: 'steps',
        label: 'Inference Steps',
        type: 'range',
        description: 'Number of denoising steps (more steps = higher quality)',
        required: false,
        defaultValue: 30,
        min: 10,
        max: 100,
        step: 5
      },
      {
        key: 'guidance_scale',
        label: 'Guidance Scale',
        type: 'range',
        description: 'How closely to follow the prompt',
        required: false,
        defaultValue: 7.5,
        min: 1,
        max: 20,
        step: 0.5
      }
    ],
    capabilities: ['High Quality Images', 'Negative Prompts', 'Style Control'],
    examples: [
      {
        title: 'Portrait Photography',
        description: 'Professional headshot generation',
        inputs: { prompt: 'Professional business portrait, studio lighting' }
      }
    ]
  },
  {
    id: 'musicgen-large',
    name: 'MusicGen Large',
    description: 'Generate music and audio from text descriptions',
    category: 'audio-generation',
    provider: 'Meta',
    version: '1.0',
    isNew: true,
    pricing: {
      creditsPerUse: 20,
      estimatedTime: '~45 seconds'
    },
    parameters: [
      {
        key: 'prompt',
        label: 'Music Description',
        type: 'text',
        description: 'Describe the music you want to generate',
        required: true,
        placeholder: 'Upbeat jazz melody with piano and saxophone...'
      },
      {
        key: 'duration',
        label: 'Duration (seconds)',
        type: 'range',
        description: 'Length of the generated audio',
        required: false,
        defaultValue: 30,
        min: 5,
        max: 60,
        step: 5
      },
      {
        key: 'temperature',
        label: 'Creativity',
        type: 'range',
        description: 'Higher values create more experimental music',
        required: false,
        defaultValue: 1.0,
        min: 0.1,
        max: 2.0,
        step: 0.1
      }
    ],
    capabilities: ['Music Generation', 'Various Genres', 'Custom Duration'],
    examples: [
      {
        title: 'Ambient Background',
        description: 'Relaxing ambient music',
        inputs: { prompt: 'Peaceful ambient music with soft synth pads' }
      }
    ]
  },
  {
    id: 'whisper-large',
    name: 'Whisper Large',
    description: 'Advanced speech recognition and transcription',
    category: 'audio-generation',
    provider: 'OpenAI',
    version: '2.0',
    pricing: {
      creditsPerUse: 5,
      estimatedTime: '~10 seconds'
    },
    parameters: [
      {
        key: 'audio_file',
        label: 'Audio File',
        type: 'file',
        description: 'Upload audio file to transcribe',
        required: true,
        accept: 'audio/*'
      },
      {
        key: 'language',
        label: 'Language',
        type: 'select',
        description: 'Source language of the audio (auto-detect if not specified)',
        required: false,
        options: [
          { label: 'Auto-detect', value: 'auto' },
          { label: 'English', value: 'en' },
          { label: '中文', value: 'zh' },
          { label: 'Español', value: 'es' },
          { label: 'Français', value: 'fr' }
        ]
      }
    ],
    capabilities: ['Speech Recognition', 'Multi-language', 'High Accuracy'],
    examples: [
      {
        title: 'Podcast Transcription',
        description: 'Transcribe audio to text',
        inputs: { language: 'auto' }
      }
    ]
  }
];

/**
 * Get all available models
 */
export const getAvailableModels = (): AIModel[] => {
  return mockAIModels;
};

/**
 * Get models by category
 */
export const getModelsByCategory = (category: string): AIModel[] => {
  return mockAIModels.filter(model => model.category === category);
};

/**
 * Get model by ID
 */
export const getModelById = (id: string): AIModel | undefined => {
  return mockAIModels.find(model => model.id === id);
};

/**
 * Get popular models
 */
export const getPopularModels = (): AIModel[] => {
  return mockAIModels.filter(model => model.isPopular);
};

/**
 * Get model categories
 */
export const getModelCategories = () => {
  const categories = Array.from(new Set(mockAIModels.map(model => model.category)));
  return categories.map(category => ({
    id: category,
    name: category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' '),
    count: mockAIModels.filter(model => model.category === category).length
  }));
};