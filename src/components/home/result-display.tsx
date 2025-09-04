import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ModelResult } from '@/types/ai-models';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Download, 
  Copy, 
  ExternalLink,
  Loader2,
  Play
} from 'lucide-react';

/**
 * Props for ResultDisplay component
 */
interface ResultDisplayProps {
  result?: ModelResult;
  isLoading?: boolean;
  className?: string;
}

/**
 * Result Display Component
 * Shows the AI model generation results with different states and actions
 */
const ResultDisplay: React.FC<ResultDisplayProps> = ({
  result,
  isLoading = false,
  className = ''
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silently fail if clipboard is not available
      // Could show a toast notification here in a real app
    }
  };

  const getStatusIcon = (status: ModelResult['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'processing':
        return <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusText = (status: ModelResult['status']) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'processing':
        return 'Processing';
      case 'pending':
        return 'Pending';
      case 'failed':
        return 'Failed';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status: ModelResult['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const renderResultContent = () => {
    if (!result?.outputs) return null;

    const { type, content } = result.outputs;

    switch (type) {
      case 'text':
        return (
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-lg p-4 border">
              <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                {typeof content === 'string' ? content : JSON.stringify(content, null, 2)}
              </pre>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopyToClipboard(typeof content === 'string' ? content : JSON.stringify(content))}
                className="text-gray-600 border-gray-300 hover:bg-gray-50"
              >
                {copied ? <CheckCircle className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>
        );

      case 'image':
        const imageUrls = Array.isArray(content) ? content : [content];
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {imageUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <Image
                    src={url}
                    alt={`Generated image ${index + 1}`}
                    width={512}
                    height={512}
                    className="w-full h-auto rounded-lg border shadow-sm"
                    unoptimized={true} // For external URLs
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" asChild>
                        <a href={url} download>
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </a>
                      </Button>
                      <Button size="sm" variant="secondary" asChild>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Open
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'audio':
        const audioUrls = Array.isArray(content) ? content : [content];
        return (
          <div className="space-y-3">
            {audioUrls.map((url, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 border">
                <audio
                  controls
                  className="w-full"
                  src={url}
                >
                  Your browser does not support the audio element.
                </audio>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline" asChild>
                    <a href={url} download>
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        );

      case 'video':
        const videoUrls = Array.isArray(content) ? content : [content];
        return (
          <div className="space-y-3">
            {videoUrls.map((url, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 border">
                <video
                  controls
                  className="w-full rounded-lg"
                  src={url}
                >
                  Your browser does not support the video element.
                </video>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline" asChild>
                    <a href={url} download>
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        );

      case 'file':
        const fileUrls = Array.isArray(content) ? content : [content];
        return (
          <div className="space-y-3">
            {fileUrls.map((url, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 border flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">Generated File {index + 1}</p>
                  <p className="text-xs text-gray-600">{url}</p>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <a href={url} download>
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </a>
                </Button>
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div className="bg-gray-50 rounded-lg p-4 border">
            <pre className="text-sm text-gray-800 font-mono">
              {JSON.stringify(content, null, 2)}
            </pre>
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <Card className={`bg-white border-gray-200 ${className}`}>
        <CardHeader>
          <CardTitle className="text-xl text-black flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing...
          </CardTitle>
          <CardDescription className="text-gray-600">
            Your AI model is generating results. This may take a few moments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card className={`bg-white border-gray-200 ${className}`}>
        <CardHeader>
          <CardTitle className="text-xl text-black flex items-center gap-2">
            <Play className="w-5 h-5 text-gray-400" />
            Ready to Generate
          </CardTitle>
          <CardDescription className="text-gray-600">
            Select a model and configure parameters to generate your first result.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-400">
            <Play className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No results yet. Start by running a model above.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`bg-white border-gray-200 ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="text-xl text-black">Result</CardTitle>
            <Badge className={getStatusColor(result.status)}>
              {getStatusIcon(result.status)}
              <span className="ml-1">{getStatusText(result.status)}</span>
            </Badge>
          </div>
          {result.completedAt && (
            <div className="text-sm text-gray-500">
              {new Date(result.completedAt).toLocaleString()}
            </div>
          )}
        </div>
        
        {result.processingTime && (
          <CardDescription className="text-gray-600">
            Processing time: {result.processingTime}s • Credits used: {result.creditsUsed}
          </CardDescription>
        )}
      </CardHeader>
      
      <CardContent>
        {result.status === 'failed' && result.error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 text-red-800">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">Generation Failed</span>
            </div>
            <p className="text-red-700 mt-1 text-sm">{result.error}</p>
          </div>
        )}

        {result.status === 'completed' && renderResultContent()}
        
        {result.status === 'processing' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-blue-800">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="font-medium">Processing your request...</span>
            </div>
            <p className="text-blue-700 mt-1 text-sm">
              This may take up to {result.outputs?.metadata?.estimatedTime || 'a few minutes'}.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

ResultDisplay.displayName = 'ResultDisplay';

export default ResultDisplay;