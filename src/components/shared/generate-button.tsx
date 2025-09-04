/**
 * Generate Button Component
 * Main CTA button for generating AI content
 */
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Palette, Loader2 } from 'lucide-react';

interface GenerateButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  creditCost?: number;
  variant?: 'default' | 'secondary';
}

const GenerateButton: React.FC<GenerateButtonProps> = ({
  onClick,
  isLoading = false,
  disabled = false,
  creditCost = 1,
  variant = 'default',
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || isLoading}
      size="lg"
      variant={variant}
      className={`w-full h-14 text-base font-semibold ${
        variant === 'default'
          ? 'bg-black hover:bg-gray-800 text-white'
          : 'bg-gray-100 hover:bg-gray-200 text-black'
      }`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 mr-3 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Palette className="w-5 h-5 mr-3" />
          Generate Image (Costs {creditCost} Credit{creditCost > 1 ? 's' : ''})
        </>
      )}
    </Button>
  );
};

GenerateButton.displayName = 'GenerateButton';

export default GenerateButton;