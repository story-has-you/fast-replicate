/**
 * Result Display Component
 * Shows AI model prediction results with different formats based on output type
 */
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ModelResult, AIModel } from '@/types/ai-models';
import { 
  Download, 
  Copy, 
  Share2, 
  Clock, 
  Zap, 
  CheckCircle, 
  XCircle,
  Loader2,
  FileText,
  Music,
  Video,
  Eye,
  EyeOff
} from 'lucide-react';

interface ResultDisplayProps {
  result: ModelResult;
  model: AIModel;
  onRetry?: () => void;
  className?: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ 
  result, 
  model, 
  onRetry,
  className = "" 
}) => {
  const [showInputs, setShowInputs] = useState(false);

  const getStatusIcon = () => {
    switch (result.status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'processing':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (result.status) {
      case 'pending':
        return 'Waiting in queue...';
      case 'processing':
        return 'Generating your result...';
      case 'completed':
        return 'Generation completed';
      case 'failed':
        return 'Generation failed';
      default:
        return 'Unknown status';
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Could add toast notification here
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = (url: string, filename?: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || 'result';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderOutput = () => {
    if (!result.outputs) {
      return null;
    }

    const { type, content } = result.outputs;

    switch (type) {
      case 'text':
        return (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="whitespace-pre-wrap text-sm text-gray-900 font-mono">
                {Array.isArray(content) ? content.join('\n') : content}
              </pre>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleCopy(Array.isArray(content) ? content.join('\n') : content)}
              >
                <Copy className="w-4 h-4 mr-1" />
                Copy Text
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
        );

      case 'image':
        const imageUrls = Array.isArray(content) ? content : [content];
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {imageUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={`Generated image ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleDownload(url, `image-${index + 1}.png`)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleDownload(imageUrls[0], 'generated-image.png')}
              >
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
        );

      case 'audio':
        const audioUrls = Array.isArray(content) ? content : [content];
        return (
          <div className="space-y-4">
            {audioUrls.map((url, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Music className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium">Audio {index + 1}</span>
                </div>
                <audio controls className="w-full">
                  <source src={url} />
                  Your browser does not support the audio element.
                </audio>
              </div>
            ))}
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleDownload(audioUrls[0], 'generated-audio.wav')}
              >
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
        );

      case 'video':
        const videoUrls = Array.isArray(content) ? content : [content];
        return (
          <div className="space-y-4">
            {videoUrls.map((url, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Video className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium">Video {index + 1}</span>
                </div>
                <video controls className="w-full max-w-lg rounded-lg">
                  <source src={url} />
                  Your browser does not support the video element.
                </video>
              </div>
            ))}
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleDownload(videoUrls[0], 'generated-video.mp4')}
              >
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <FileText className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium">Result</span>
            </div>
            <pre className="text-sm text-gray-700">
              {Array.isArray(content) ? content.join('\n') : content}
            </pre>
          </div>
        );
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center space-x-2">
            {getStatusIcon()}
            <span>Result</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              {model.name}
            </Badge>
            {result.processingTime && (
              <Badge variant="secondary" className="text-xs">
                <Clock className="w-3 h-3 mr-1" />
                {result.processingTime}s
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {getStatusText()}
          </span>
          {result.creditsUsed > 0 && (
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <Zap className="w-4 h-4" />
              <span>{result.creditsUsed} credits used</span>
            </div>
          )}
        </div>

        {/* Progress indicator for processing */}
        {result.status === 'processing' && (
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }} />
          </div>
        )}

        {/* Error display */}
        {result.status === 'failed' && result.error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-red-800">Generation Failed</p>
                <p className="text-sm text-red-600">{result.error}</p>
                {onRetry && (
                  <Button variant="outline" size="sm" onClick={onRetry} className="mt-2">
                    Try Again
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Result output */}
        {result.status === 'completed' && result.outputs && (
          <div className="space-y-4">
            <Separator />
            {renderOutput()}
          </div>
        )}

        {/* Input parameters (collapsible) */}
        <div className="pt-4 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowInputs(!showInputs)}
            className="w-full justify-between"
          >
            <span className="text-sm font-medium">Input Parameters</span>
            {showInputs ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
          
          {showInputs && (
            <div className="mt-3 space-y-2">
              {Object.entries(result.inputs).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="font-medium text-gray-600 capitalize">
                    {key.replace(/_/g, ' ')}:
                  </span>
                  <span className="text-gray-900 text-right max-w-xs truncate">
                    {typeof value === 'string' && value.length > 50 
                      ? `${value.substring(0, 50)}...` 
                      : String(value)
                    }
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Timestamps */}
        <div className="text-xs text-gray-500 space-y-1">
          <div>Created: {new Date(result.createdAt).toLocaleString()}</div>
          {result.completedAt && (
            <div>Completed: {new Date(result.completedAt).toLocaleString()}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

ResultDisplay.displayName = 'ResultDisplay';

export default ResultDisplay;