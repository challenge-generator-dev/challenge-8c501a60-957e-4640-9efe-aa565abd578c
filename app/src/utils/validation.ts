import { validate, ValidationError, ValidatorOptions } from 'class-validator';
import { plainToInstance, ClassTransformOptions } from 'class-transformer';
import { BadRequestError } from './errorHandler';

export interface ValidationResult {
  success: boolean;
  errors: ValidationError[];
  formattedErrors?: Record<string, string>;
}

export const defaultValidatorOptions: ValidatorOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
  forbidUnknownValues: true,
  transform: true,
  stopAtFirstError: false
};

export const defaultTransformOptions: ClassTransformOptions = {
  excludeExtraneousValues: true,
  enableImplicitConversion: true
};

export class ValidationException extends BadRequestError {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationException';
  }
}

export async function validateDTO<T>(
  dtoClass: new (...args: any[]) => T,
  plainObject: unknown,
  options: ValidatorOptions = defaultValidatorOptions
): Promise<T> {
  const instance = plainToInstance(dtoClass, plainObject, defaultTransformOptions);
  
  const errors = await validate(instance as object, options);
  
  if (errors.length > 0) {
    const formattedErrors = errors.reduce((acc, error) => {
      const messages = Object.values(error.constraints || {});
      acc[error.property] = messages.join(', ');
      return acc;
    }, {} as Record<string, string>);
    
    throw new BadRequestError(`Validación fallida: ${JSON.stringify(formattedErrors)}`);
  }
  
  return instance;
}

export const validateDto = validateDTO;

export async function validatePartialDTO<T>(
  dtoClass: new (...args: any[]) => T,
  plainObject: unknown
): Promise<Partial<T>> {
  const transformOptions: ClassTransformOptions = {
    ...defaultTransformOptions,
    excludeExtraneousValues: false
  };
  
  const instance = plainToInstance(dtoClass, plainObject, transformOptions);
  
  const validatorOptions: ValidatorOptions = {
    ...defaultValidatorOptions,
    whitelist: false,
    forbidNonWhitelisted: false
  };
  
  const errors = await validate(instance as object, validatorOptions);
  
  if (errors.length > 0) {
    const formattedErrors = errors.reduce((acc, error) => {
      const messages = Object.values(error.constraints || {});
      acc[error.property] = messages.join(', ');
      return acc;
    }, {} as Record<string, string>);
    
    throw new BadRequestError(`Validación fallida: ${JSON.stringify(formattedErrors)}`);
  }
  
  return instance as Partial<T>;
}

export async function validateArray<T>(
  dtoClass: new (...args: any[]) => T,
  plainArray: unknown[]
): Promise<T[]> {
  if (!Array.isArray(plainArray)) {
    throw new BadRequestError('Se esperaba un arreglo de elementos');
  }
  
  const results: T[] = [];
  
  for (let i = 0; i < plainArray.length; i++) {
    const item = await validateDTO(dtoClass, plainArray[i]);
    results.push(item);
  }
  
  return results;
}

export function extractValidationErrors(errors: ValidationError[]): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  
  for (const error of errors) {
    const constraints = error.constraints ? Object.values(error.constraints) : [];
    result[error.property] = constraints;
    
    if (error.children && error.children.length > 0) {
      const childErrors = extractValidationErrors(error.children);
      for (const [key, value] of Object.entries(childErrors)) {
        result[`${error.property}.${key}`] = value;
      }
    }
  }
  
  return result;
}