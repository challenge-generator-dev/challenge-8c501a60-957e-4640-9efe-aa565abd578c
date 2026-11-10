import { IsString, IsNumber, IsArray, IsOptional, IsEnum, IsDateString, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  FAILED = 'FAILED'
}

export class OrderProductDTO {
  @IsString()
  productId!: string;

  @IsNumber()
  @Min(1)
  quantity!: number;

  @IsNumber()
  @Min(0)
  price!: number;
}

export class OrderCreateDTO {
  @IsString()
  customerId!: string;

  @IsString()
  @IsOptional()
  customerEmail?: string;

  @IsString()
  @IsOptional()
  customerName?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDTO)
  products!: OrderProductDTO[];

  @IsString()
  @IsOptional()
  shippingAddress?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class OrderUpdateDTO {
  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDTO)
  @IsOptional()
  products?: OrderProductDTO[];

  @IsString()
  @IsOptional()
  shippingAddress?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class OrderResponseDTO {
  @IsString()
  id!: string;

  @IsString()
  customerId!: string;

  @IsString()
  @IsOptional()
  customerEmail?: string;

  @IsString()
  @IsOptional()
  customerName?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDTO)
  products!: OrderProductDTO[];

  @IsEnum(OrderStatus)
  status!: OrderStatus;

  @IsNumber()
  totalAmount!: number;

  @IsString()
  @IsOptional()
  shippingAddress?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsDateString()
  createdAt!: string;

  @IsDateString()
  @IsOptional()
  updatedAt?: string;
}

export class OrderListResponseDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderResponseDTO)
  orders!: OrderResponseDTO[];

  @IsNumber()
  total!: number;
}