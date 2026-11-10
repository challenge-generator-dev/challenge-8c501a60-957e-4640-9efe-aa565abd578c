import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export class OrderProduct {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  constructor(productId: string, quantity: number, price: number) {
    this.productId = productId;
    this.quantity = quantity;
    this.price = price;
  }
}

export class Order {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsUUID()
  @IsNotEmpty()
  customerId: string;

  @IsEnum(OrderStatus)
  @IsNotEmpty()
  status: OrderStatus;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProduct)
  products: OrderProduct[];

  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @IsString()
  @IsNotEmpty()
  createdAt: string;

  @IsString()
  updatedAt: string;

  constructor(
    id: string,
    customerId: string,
    status: OrderStatus,
    products: OrderProduct[],
    totalAmount: number,
    createdAt: string,
    updatedAt: string
  ) {
    this.id = id;
    this.customerId = customerId;
    this.status = status;
    this.products = products;
    this.totalAmount = totalAmount;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}