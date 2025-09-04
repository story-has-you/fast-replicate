/**
 * Credit Display Component
 * Shows user's current credit balance and usage
 */
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Coins } from 'lucide-react';

interface CreditDisplayProps {
  currentCredits: number;
  totalCredits: number;
}

const CreditDisplay: React.FC<CreditDisplayProps> = ({ currentCredits, totalCredits }) => {
  return (
    <div className="flex items-center space-x-2 text-sm">
      <Coins className="w-4 h-4 text-gray-600" />
      <span className="text-gray-600">My Credits:</span>
      <Badge variant="secondary" className="bg-gray-100 text-black">
        {currentCredits}/{totalCredits}
      </Badge>
    </div>
  );
};

CreditDisplay.displayName = 'CreditDisplay';

export default CreditDisplay;