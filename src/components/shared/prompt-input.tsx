/**
 * Prompt Input Component
 * Large textarea input area with advanced settings
 */
'use client';

import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Settings, Sparkles } from 'lucide-react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onAdvancedSettings?: () => void;
}

const PromptInput: React.FC<PromptInputProps> = ({
  value,
  onChange,
  placeholder = "Describe the image you want to generate...",
  onAdvancedSettings,
}) => {
  return (
    <div className="w-full space-y-4">
      <div className="relative">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-h-[120px] text-base resize-none border-gray-300 focus:border-black focus:ring-black"
          rows={5}
        />
        <div className="absolute top-3 left-3 text-gray-400">
          <Sparkles className="w-5 h-5" />
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={onAdvancedSettings}
          className="text-gray-600 hover:text-black"
        >
          <Settings className="w-4 h-4 mr-2" />
          Advanced Settings
        </Button>
        
        <div className="text-sm text-gray-500">
          {value.length}/2000 characters
        </div>
      </div>
    </div>
  );
};

PromptInput.displayName = 'PromptInput';

export default PromptInput;