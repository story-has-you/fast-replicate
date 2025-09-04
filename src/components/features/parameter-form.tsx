/**
 * Parameter Form Component
 * Dynamic form for AI model parameters based on model configuration
 */
'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { AIModel, ModelParameter } from '@/types/ai-models';
import { Play, RotateCcw, HelpCircle } from 'lucide-react';

interface ParameterFormProps {
  model: AIModel;
  onSubmit: (parameters: Record<string, string | number | boolean>) => void;
  isLoading?: boolean;
  className?: string;
}

interface FormErrors {
  [key: string]: string;
}

const ParameterForm: React.FC<ParameterFormProps> = ({ 
  model, 
  onSubmit, 
  isLoading = false, 
  className = "" 
}) => {
  const [parameters, setParameters] = useState<Record<string, string | number | boolean>>(() => {
    const defaults: Record<string, string | number | boolean> = {};
    model.parameters.forEach(param => {
      if (param.defaultValue !== undefined) {
        defaults[param.key] = param.defaultValue;
      } else if (param.type === 'boolean') {
        defaults[param.key] = false;
      } else if (param.type === 'number' || param.type === 'range') {
        defaults[param.key] = param.min || 0;
      } else {
        defaults[param.key] = '';
      }
    });
    return defaults;
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateParameter = useCallback((param: ModelParameter, value: string | number | boolean): string => {
    // Required field validation
    if (param.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return `${param.label} is required`;
    }

    // String validation
    if (param.type === 'text' && typeof value === 'string') {
      if (param.validation?.minLength && value.length < param.validation.minLength) {
        return `${param.label} must be at least ${param.validation.minLength} characters`;
      }
      if (param.validation?.maxLength && value.length > param.validation.maxLength) {
        return `${param.label} must be no more than ${param.validation.maxLength} characters`;
      }
      if (param.validation?.pattern) {
        const regex = new RegExp(param.validation.pattern);
        if (!regex.test(value)) {
          return param.validation.message || `${param.label} format is invalid`;
        }
      }
    }

    // Number validation
    if ((param.type === 'number' || param.type === 'range') && typeof value === 'number') {
      if (param.min !== undefined && value < param.min) {
        return `${param.label} must be at least ${param.min}`;
      }
      if (param.max !== undefined && value > param.max) {
        return `${param.label} must be no more than ${param.max}`;
      }
    }

    return '';
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    model.parameters.forEach(param => {
      const value = parameters[param.key];
      const error = validateParameter(param, value);
      if (error) {
        newErrors[param.key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [model.parameters, parameters, validateParameter]);

  const handleParameterChange = useCallback((key: string, value: string | number | boolean) => {
    setParameters(prev => ({ ...prev, [key]: value }));
    setTouched(prev => ({ ...prev, [key]: true }));
    
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  }, [errors]);

  const handleSubmit = useCallback(() => {
    if (validateForm()) {
      onSubmit(parameters);
    }
  }, [validateForm, onSubmit, parameters]);

  const handleReset = useCallback(() => {
    const defaults: Record<string, string | number | boolean> = {};
    model.parameters.forEach(param => {
      if (param.defaultValue !== undefined) {
        defaults[param.key] = param.defaultValue;
      } else if (param.type === 'boolean') {
        defaults[param.key] = false;
      } else if (param.type === 'number' || param.type === 'range') {
        defaults[param.key] = param.min || 0;
      } else {
        defaults[param.key] = '';
      }
    });
    setParameters(defaults);
    setErrors({});
    setTouched({});
  }, [model.parameters]);

  const requiredCount = useMemo(() => 
    model.parameters.filter(p => p.required).length, 
    [model.parameters]
  );

  const filledRequiredCount = useMemo(() => 
    model.parameters.filter(p => 
      p.required && parameters[p.key] && parameters[p.key] !== ''
    ).length,
    [model.parameters, parameters]
  );

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Configure Parameters</CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              {filledRequiredCount}/{requiredCount} required
            </Badge>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleReset}
              disabled={isLoading}
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {model.parameters.map((param) => (
          <ParameterField
            key={param.key}
            parameter={param}
            value={parameters[param.key]}
            onChange={(value) => handleParameterChange(param.key, value)}
            error={touched[param.key] ? errors[param.key] : undefined}
            disabled={isLoading}
          />
        ))}

        <div className="pt-4 border-t">
          <Button 
            onClick={handleSubmit}
            disabled={isLoading || filledRequiredCount < requiredCount}
            className="w-full"
            size="lg"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Generating...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Generate with {model.name}
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface ParameterFieldProps {
  parameter: ModelParameter;
  value: string | number | boolean;
  onChange: (value: string | number | boolean) => void;
  error?: string;
  disabled?: boolean;
}

const ParameterField: React.FC<ParameterFieldProps> = ({
  parameter,
  value,
  onChange,
  error,
  disabled = false
}) => {
  const renderField = () => {
    switch (parameter.type) {
      case 'text':
        if (parameter.validation?.maxLength && parameter.validation.maxLength > 100) {
          return (
            <Textarea
              value={value as string}
              onChange={(e) => onChange(e.target.value)}
              placeholder={parameter.placeholder}
              disabled={disabled}
              className={error ? "border-red-500 focus:ring-red-500" : ""}
              rows={4}
            />
          );
        }
        return (
          <Input
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            placeholder={parameter.placeholder}
            disabled={disabled}
            className={error ? "border-red-500 focus:ring-red-500" : ""}
          />
        );

      case 'number':
        return (
          <Input
            type="number"
            value={value as number}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            placeholder={parameter.placeholder}
            min={parameter.min}
            max={parameter.max}
            step={parameter.step}
            disabled={disabled}
            className={error ? "border-red-500 focus:ring-red-500" : ""}
          />
        );

      case 'range':
        return (
          <div className="space-y-2">
            <Slider
              value={[value as number]}
              onValueChange={([newValue]) => onChange(newValue)}
              min={parameter.min || 0}
              max={parameter.max || 100}
              step={parameter.step || 1}
              disabled={disabled}
              className={error ? "accent-red-500" : ""}
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{parameter.min || 0}</span>
              <span className="font-medium">{value}</span>
              <span>{parameter.max || 100}</span>
            </div>
          </div>
        );

      case 'select':
        return (
          <Select 
            value={value as string} 
            onValueChange={(newValue) => onChange(newValue)}
            disabled={disabled}
          >
            <SelectTrigger className={error ? "border-red-500 focus:ring-red-500" : ""}>
              <SelectValue placeholder={parameter.placeholder || "Select an option"} />
            </SelectTrigger>
            <SelectContent>
              {parameter.options?.map((option) => (
                <SelectItem 
                  key={option.value.toString()} 
                  value={option.value.toString()}
                >
                  {option.label}
                  {option.description && (
                    <span className="text-xs text-gray-500 ml-2">
                      {option.description}
                    </span>
                  )}
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
              checked={value as boolean}
              onChange={(e) => onChange(e.target.checked)}
              disabled={disabled}
              className="rounded border-gray-300 text-black focus:ring-black"
            />
            <span className="text-sm text-gray-600">Enable this option</span>
          </div>
        );

      case 'file':
        return (
          <Input
            type="file"
            accept={parameter.accept}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                onChange(file.name);
              }
            }}
            disabled={disabled}
            className={error ? "border-red-500 focus:ring-red-500" : ""}
          />
        );

      default:
        return (
          <Input
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            placeholder={parameter.placeholder}
            disabled={disabled}
            className={error ? "border-red-500 focus:ring-red-500" : ""}
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Label htmlFor={parameter.key} className="text-sm font-medium">
          {parameter.label}
          {parameter.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        {parameter.description && (
          <div className="group relative">
            <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
            <div className="invisible group-hover:visible absolute z-10 w-64 p-2 mt-1 text-xs text-white bg-gray-900 rounded-lg shadow-lg -translate-x-1/2 left-1/2">
              {parameter.description}
            </div>
          </div>
        )}
      </div>
      
      {renderField()}
      
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

ParameterForm.displayName = 'ParameterForm';

export default ParameterForm;