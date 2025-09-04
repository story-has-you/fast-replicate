import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AIModel, ModelParameter } from '@/types/ai-models';
import { Info, Play, Loader2 } from 'lucide-react';

/**
 * Props for ParameterForm component
 */
interface ParameterFormProps {
  model: AIModel;
  values: Record<string, string | number | boolean | File>;
  onChange: (key: string, value: string | number | boolean | File) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  className?: string;
}

/**
 * Dynamic Parameter Input Form Component
 * Renders form inputs based on the selected AI model's parameter configuration
 */
const ParameterForm: React.FC<ParameterFormProps> = ({
  model,
  values,
  onChange,
  onSubmit,
  isLoading = false,
  className = ''
}) => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validateParameter = (param: ModelParameter, value: string | number | boolean | File): string | null => {
    if (param.required && (!value || value === '')) {
      return `${param.label} is required`;
    }

    if (param.validation) {
      const { minLength, maxLength, pattern, message } = param.validation;
      
      if (typeof value === 'string') {
        if (minLength && value.length < minLength) {
          return message || `${param.label} must be at least ${minLength} characters`;
        }
        if (maxLength && value.length > maxLength) {
          return message || `${param.label} must be no more than ${maxLength} characters`;
        }
        if (pattern && !new RegExp(pattern).test(value)) {
          return message || `${param.label} format is invalid`;
        }
      }
    }

    return null;
  };

  const handleValueChange = (key: string, value: string | number | boolean | File) => {
    const param = model.parameters.find(p => p.key === key);
    if (!param) return;

    const error = validateParameter(param, value);
    setErrors(prev => ({
      ...prev,
      [key]: error || ''
    }));

    onChange(key, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all required parameters
    const newErrors: Record<string, string> = {};
    let hasErrors = false;

    model.parameters.forEach(param => {
      const error = validateParameter(param, values[param.key]);
      if (error) {
        newErrors[param.key] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);

    if (!hasErrors) {
      onSubmit();
    }
  };

  const renderParameterInput = (param: ModelParameter) => {
    const value = values[param.key] ?? param.defaultValue ?? '';
    const hasError = errors[param.key];

    switch (param.type) {
      case 'text':
        return (
          <Textarea
            value={value}
            onChange={(e) => handleValueChange(param.key, e.target.value)}
            placeholder={param.placeholder}
            className={`min-h-[100px] resize-y ${hasError ? 'border-red-500' : ''}`}
          />
        );

      case 'number':
        return (
          <Input
            type="number"
            value={value}
            onChange={(e) => handleValueChange(param.key, Number(e.target.value))}
            placeholder={param.placeholder}
            min={param.min}
            max={param.max}
            step={param.step}
            className={hasError ? 'border-red-500' : ''}
          />
        );

      case 'range':
        return (
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Value: {value}</span>
              <span>{param.min} - {param.max}</span>
            </div>
            <Slider
              value={[Number(value)]}
              onValueChange={([newValue]) => handleValueChange(param.key, newValue)}
              min={param.min}
              max={param.max}
              step={param.step}
              className="w-full"
            />
          </div>
        );

      case 'select':
        return (
          <Select
            value={String(value)}
            onValueChange={(newValue) => handleValueChange(param.key, newValue)}
          >
            <SelectTrigger className={hasError ? 'border-red-500' : ''}>
              <SelectValue placeholder={param.placeholder || `Select ${param.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {param.options?.map((option) => (
                <SelectItem key={String(option.value)} value={String(option.value)}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'boolean':
        return (
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={param.key}
              checked={Boolean(value)}
              onChange={(e) => handleValueChange(param.key, e.target.checked)}
              className="rounded border-gray-300 text-black focus:ring-black"
            />
            <Label htmlFor={param.key} className="text-sm">
              Enable {param.label.toLowerCase()}
            </Label>
          </div>
        );

      case 'file':
        return (
          <Input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleValueChange(param.key, file);
              }
            }}
            accept={param.accept}
            className={hasError ? 'border-red-500' : ''}
          />
        );

      default:
        return (
          <Input
            type="text"
            value={value}
            onChange={(e) => handleValueChange(param.key, e.target.value)}
            placeholder={param.placeholder}
            className={hasError ? 'border-red-500' : ''}
          />
        );
    }
  };

  return (
    <Card className={`bg-white border-gray-200 ${className}`}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle className="text-xl text-black">Configure Parameters</CardTitle>
          <Badge className="bg-black text-white">
            {model.name}
          </Badge>
        </div>
        <CardDescription className="text-gray-600">
          Customize the model parameters for your specific needs
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {model.parameters.map((param) => (
            <div key={param.key} className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor={param.key} className="text-sm font-medium text-black">
                  {param.label}
                  {param.required && <span className="text-red-500">*</span>}
                </Label>
                <div className="group relative">
                  <Info className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    {param.description}
                  </div>
                </div>
              </div>
              
              {renderParameterInput(param)}
              
              {errors[param.key] && (
                <p className="text-sm text-red-500">{errors[param.key]}</p>
              )}
            </div>
          ))}

          {/* Model Info */}
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Cost per run:</span>
              <span className="font-medium">{model.pricing.creditsPerUse} credits</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Estimated time:</span>
              <span className="font-medium">{model.pricing.estimatedTime}</span>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white hover:bg-gray-800 disabled:bg-gray-400"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Generate Result
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

ParameterForm.displayName = 'ParameterForm';

export default ParameterForm;