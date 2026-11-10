import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ValidationError } from 'class-validator';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number, code: string = 'INTERNAL_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, identifier?: string) {
    const message = identifier 
      ? `${resource} con identificador '${identifier}' no encontrado`
      : `${resource} no encontrado`;
    super(message, 404, 'NOT_FOUND');
  }
}

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 400, 'BAD_REQUEST');
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, 'CONFLICT');
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = 'Error interno del servidor') {
    super(message, 500, 'INTERNAL_ERROR');
  }
}

interface ValidationErrorResponse {
  success: boolean;
  error: {
    code: string;
    message: string;
    details?: Array<{
      field: string;
      message: string;
    }>;
  };
}

interface OperationalErrorResponse {
  success: boolean;
  error: {
    code: string;
    message: string;
  };
}

type ErrorResponse = ValidationErrorResponse | OperationalErrorResponse;

function formatValidationErrors(errors: ValidationError[]): Array<{ field: string; message: string }> {
  return errors.map(err => ({
    field: err.property,
    message: Object.values(err.constraints || {}).join(', ')
  }));
}

export const errorHandler: RequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(`[ErrorHandler] Error capturado:`, {
    name: err.name,
    message: err.message,
    stack: err.stack
  });

  if (err instanceof ValidationError) {
    const response: ValidationErrorResponse = {
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Error de validación en los datos proporcionados',
        details: formatValidationErrors([err])
      }
    };
    res.status(400).json(response);
    return;
  }

  if (err instanceof AppError) {
    const response: OperationalErrorResponse = {
      success: false,
      error: {
        code: err.code,
        message: err.message
      }
    };
    res.status(err.statusCode).json(response);
    return;
  }

  const response: OperationalErrorResponse = {
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Error interno del servidor'
    }
  };
  res.status(500).json(response);
};