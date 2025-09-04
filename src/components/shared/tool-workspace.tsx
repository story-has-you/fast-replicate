/**
 * Tool Workspace Component
 * Main workspace for AI tool interaction, designed for 100vh first screen
 */
'use client';

import React, { useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import ModelHero from '@/components/shared/model-hero';
import PromptInput from '@/components/shared/prompt-input';
import CreditDisplay from '@/components/shared/credit-display';
import GenerateButton from '@/components/shared/generate-button';
import ResultDisplay from '@/components/shared/result-display';
import { ChevronRight } from 'lucide-react';

interface GeneratedResult {
  id: string;
  imageUrl: string;
  prompt: string;
  createdAt: Date;
}

interface ToolWorkspaceProps {
  modelTitle?: string;
  modelDescription?: string;
  currentCredits?: number;
  totalCredits?: number;
  creditCost?: number;
}

const ToolWorkspace: React.FC<ToolWorkspaceProps> = ({
  modelTitle = "Stable Diffusion XL Image Generation",
  modelDescription = "High-quality AI art creation, generate professional images with a single click",
  currentCredits = 45,
  totalCredits = 100,
  creditCost = 1,
}) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate API call - replace with actual implementation
    setTimeout(() => {
      setResult({
        id: '1',
        imageUrl: `https://picsum.photos/512/512?random=${Date.now()}`,
        prompt,
        createdAt: new Date(),
      });
      setIsGenerating(false);
    }, 3000);
  };

  const handleAdvancedSettings = () => {
    // TODO: Open advanced settings modal
  };

  const handleDownload = (result: GeneratedResult) => {
    // TODO: Implement download functionality
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = result;
  };

  const handleShare = (result: GeneratedResult) => {
    // TODO: Implement share functionality
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = result;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Tool Workspace - 100vh first screen */}
      <div className="h-screen flex flex-col">
        <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb Navigation */}
          <div className="mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/models">AI Tools</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>Image Generation</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Model Hero Section */}
          <ModelHero title={modelTitle} description={modelDescription} />

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 flex-1">
            {/* Left Column - Input and Controls */}
            <div className="space-y-6">
              {/* Prompt Input */}
              <PromptInput
                value={prompt}
                onChange={setPrompt}
                onAdvancedSettings={handleAdvancedSettings}
                placeholder="Describe the image you want to generate..."
              />

              {/* Credits and Generate Button */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <CreditDisplay
                    currentCredits={currentCredits}
                    totalCredits={totalCredits}
                  />
                </div>

                <GenerateButton
                  onClick={handleGenerate}
                  isLoading={isGenerating}
                  disabled={!prompt.trim() || currentCredits < creditCost}
                  creditCost={creditCost}
                />
              </div>
            </div>

            {/* Right Column - Result Display */}
            <div className="flex flex-col">
              <ResultDisplay
                isGenerating={isGenerating}
                result={result}
                onDownload={handleDownload}
                onShare={handleShare}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ToolWorkspace.displayName = 'ToolWorkspace';

export default ToolWorkspace;