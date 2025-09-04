/**
 * Result Display Component
 * Shows the generated content results or loading state
 */
'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Download, Share2, ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface GeneratedResult {
  id: string;
  imageUrl: string;
  prompt: string;
  createdAt: Date;
}

interface ResultDisplayProps {
  isGenerating?: boolean;
  result?: GeneratedResult;
  onDownload?: (result: GeneratedResult) => void;
  onShare?: (result: GeneratedResult) => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  isGenerating = false,
  result,
  onDownload,
  onShare,
}) => {
  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center h-80 text-gray-500">
      <ImageIcon className="w-16 h-16 mb-4 text-gray-300" />
      <h3 className="text-lg font-medium mb-2">Ready to Generate</h3>
      <p className="text-sm text-center max-w-sm">
        Enter your prompt above and click generate to create your AI image
      </p>
    </div>
  );

  const renderGeneratingState = () => (
    <div className="flex flex-col items-center justify-center h-80 text-gray-600">
      <Loader2 className="w-16 h-16 mb-4 animate-spin text-black" />
      <h3 className="text-lg font-medium mb-2">Generating Your Image</h3>
      <p className="text-sm text-center max-w-sm">
        This usually takes 10-30 seconds. Please wait...
      </p>
    </div>
  );

  const renderResult = (result: GeneratedResult) => (
    <div className="space-y-4">
      <div className="relative rounded-lg overflow-hidden">
        <Image
          src={result.imageUrl}
          alt={result.prompt}
          width={512}
          height={512}
          className="w-full h-auto"
          priority
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Generated on {result.createdAt.toLocaleDateString()}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onShare?.(result)}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDownload?.(result)}
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-black">Generated Result</h3>
        </div>
        
        {isGenerating
          ? renderGeneratingState()
          : result
          ? renderResult(result)
          : renderEmptyState()
        }
      </CardContent>
    </Card>
  );
};

ResultDisplay.displayName = 'ResultDisplay';

export default ResultDisplay;