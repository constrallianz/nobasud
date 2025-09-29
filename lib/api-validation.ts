import { NextRequest, NextResponse } from 'next/server';
import { sanitizeInput, validateEmail, validatePhone } from './security';

/**
 * API Middleware Utilities for Request Validation
 */

export interface ValidationRule {
  required?: boolean;
  type?: 'string' | 'number' | 'email' | 'phone' | 'boolean';
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
}

export interface ValidationSchema {
  [key: string]: ValidationRule;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  sanitizedData: Record<string, any>;
}

// Validate a single field
function validateField(field: string, value: any, rules: ValidationRule): {
  isValid: boolean;
  error?: string;
  sanitizedValue: any;
} {
  // Check required fields
  if (rules.required && (value === undefined || value === null || value === '')) {
    return { isValid: false, error: `${field} is required`, sanitizedValue: value };
  }

  // Skip validation if field is not required and empty
  if (!rules.required && (value === undefined || value === null || value === '')) {
    return { isValid: true, sanitizedValue: value };
  }

  // Type validation and sanitization
  const typeValidation = validateFieldType(field, value, rules.type || 'string');
  if (!typeValidation.isValid) {
    return typeValidation;
  }

  let sanitizedValue = typeValidation.sanitizedValue;

  // Length validation for strings
  if (typeof sanitizedValue === 'string') {
    const lengthValidation = validateStringLength(field, sanitizedValue, rules);
    if (!lengthValidation.isValid) {
      return lengthValidation;
    }
  }

  // Pattern validation
  if (rules.pattern && typeof sanitizedValue === 'string') {
    if (!rules.pattern.test(sanitizedValue)) {
      return { isValid: false, error: `${field} format is invalid`, sanitizedValue };
    }
  }

  // Custom validation
  if (rules.custom) {
    const customResult = rules.custom(sanitizedValue);
    if (typeof customResult === 'string') {
      return { isValid: false, error: customResult, sanitizedValue };
    } else if (customResult === false) {
      return { isValid: false, error: `${field} validation failed`, sanitizedValue };
    }
  }

  return { isValid: true, sanitizedValue };
}

function validateFieldType(field: string, value: any, type: string): {
  isValid: boolean;
  error?: string;
  sanitizedValue: any;
} {
  switch (type) {
    case 'string':
      if (typeof value !== 'string') {
        return { isValid: false, error: `${field} must be a string`, sanitizedValue: value };
      }
      return { isValid: true, sanitizedValue: sanitizeInput(value) };

    case 'number': {
      let numValue = value;
      if (typeof value === 'string') {
        numValue = Number(value);
      }
      if (typeof numValue !== 'number' || isNaN(numValue)) {
        return { isValid: false, error: `${field} must be a number`, sanitizedValue: value };
      }
      return { isValid: true, sanitizedValue: numValue };
    }

    case 'email':
      if (typeof value !== 'string' || !validateEmail(value)) {
        return { isValid: false, error: `${field} must be a valid email address`, sanitizedValue: value };
      }
      return { isValid: true, sanitizedValue: sanitizeInput(value).toLowerCase() };

    case 'phone':
      if (typeof value !== 'string' || !validatePhone(value)) {
        return { isValid: false, error: `${field} must be a valid phone number`, sanitizedValue: value };
      }
      return { isValid: true, sanitizedValue: sanitizeInput(value) };

    case 'boolean': {
      let boolValue = value;
      if (typeof value === 'string') {
        boolValue = value.toLowerCase() === 'true';
      } else if (typeof value !== 'boolean') {
        return { isValid: false, error: `${field} must be a boolean`, sanitizedValue: value };
      }
      return { isValid: true, sanitizedValue: boolValue };
    }

    default: {
      const sanitizedValue = typeof value === 'string' ? sanitizeInput(value) : value;
      return { isValid: true, sanitizedValue };
    }
  }
}

function validateStringLength(field: string, value: string, rules: ValidationRule): {
  isValid: boolean;
  error?: string;
  sanitizedValue: string;
} {
  if (rules.minLength && value.length < rules.minLength) {
    return { 
      isValid: false, 
      error: `${field} must be at least ${rules.minLength} characters long`,
      sanitizedValue: value
    };
  }
  if (rules.maxLength && value.length > rules.maxLength) {
    return { 
      isValid: false, 
      error: `${field} must not exceed ${rules.maxLength} characters`,
      sanitizedValue: value
    };
  }
  return { isValid: true, sanitizedValue: value };
}

// Validate request body against schema
export function validateRequestBody(body: any, schema: ValidationSchema): ValidationResult {
  const errors: Record<string, string> = {};
  const sanitizedData: Record<string, any> = {};

  for (const [field, rules] of Object.entries(schema)) {
    const validation = validateField(field, body[field], rules);
    
    if (!validation.isValid && validation.error) {
      errors[field] = validation.error;
    } else {
      sanitizedData[field] = validation.sanitizedValue;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitizedData,
  };
}

// Middleware wrapper for API routes with validation
export function withValidation(
  schema: ValidationSchema,
  handler: (req: NextRequest, validatedData: any) => Promise<NextResponse>
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    try {
      // Only validate POST, PUT, PATCH requests
      if (!['POST', 'PUT', 'PATCH'].includes(req.method)) {
        return handler(req, {});
      }

      // Parse request body
      let body;
      try {
        body = await req.json();
      } catch (error) {
        console.error('Error parsing request body:', error);
        return NextResponse.json(
          { error: 'Invalid JSON in request body' },
          { status: 400 }
        );
      }

      // Validate request body
      const validation = validateRequestBody(body, schema);
      
      if (!validation.isValid) {
        return NextResponse.json(
          { 
            error: 'Validation failed',
            details: validation.errors 
          },
          { status: 400 }
        );
      }

      // Call handler with sanitized data
      return handler(req, validation.sanitizedData);
    } catch (error) {
      console.error('Validation middleware error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}

// Common validation schemas
export const commonSchemas = {
  contact: {
    name: {
      required: true,
      type: 'string' as const,
      minLength: 2,
      maxLength: 100,
    },
    email: {
      required: true,
      type: 'email' as const,
    },
    phone: {
      required: false,
      type: 'phone' as const,
    },
    company: {
      required: false,
      type: 'string' as const,
      maxLength: 100,
    },
    message: {
      required: true,
      type: 'string' as const,
      minLength: 10,
      maxLength: 2000,
    },
  },

  feedback: {
    name: {
      required: true,
      type: 'string' as const,
      minLength: 2,
      maxLength: 100,
    },
    email: {
      required: true,
      type: 'email' as const,
    },
    rating: {
      required: true,
      type: 'number' as const,
      custom: (value: number) => value >= 1 && value <= 5 ? true : 'Rating must be between 1 and 5',
    },
    comment: {
      required: false,
      type: 'string' as const,
      maxLength: 1000,
    },
  },

  application: {
    name: {
      required: true,
      type: 'string' as const,
      minLength: 2,
      maxLength: 100,
    },
    email: {
      required: true,
      type: 'email' as const,
    },
    phone: {
      required: true,
      type: 'phone' as const,
    },
    position: {
      required: true,
      type: 'string' as const,
      minLength: 2,
      maxLength: 100,
    },
    experience: {
      required: false,
      type: 'string' as const,
      maxLength: 2000,
    },
    coverLetter: {
      required: false,
      type: 'string' as const,
      maxLength: 3000,
    },
  },

  adminLogin: {
    username: {
      required: true,
      type: 'string' as const,
      minLength: 3,
      maxLength: 50,
    },
    password: {
      required: true,
      type: 'string' as const,
      minLength: 8,
    },
  },
};