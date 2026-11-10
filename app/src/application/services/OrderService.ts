import { Order } from '../../domain/models/Order';
import { OrderRepository } from '../../domain/repositories/OrderRepository';
import { OrderCreateDTO, OrderUpdateDTO, OrderResponseDTO } from '../../types/orderTypes';
import { validateDTO, ValidationException } from '../../utils/validation';

export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async createOrder(dto: OrderCreateDTO): Promise<OrderResponseDTO> {
    try {
      await validateDTO(OrderCreateDTO, dto);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Validation failed';
      throw new ValidationException(message);
    }

    const existingOrder = await this.orderRepository.findByCustomerId(dto.customerId);
    if (existingOrder.length > 0) {
      const hasPendingOrder = existingOrder.some(o => o.status === 'PENDING');
      if (hasPendingOrder) {
        throw new Error('Customer already has a pending order');
      }
    }

    const order = new Order(
      this.generateOrderId(),
      dto.customerId,
      dto.products.map(p => ({
        productId: p.productId,
        quantity: p.quantity,
        price: p.price
      })),
      'PENDING',
      new Date(),
      new Date()
    );

    const createdOrder = await this.orderRepository.create(order);
    return this.toResponseDTO(createdOrder);
  }

  async getOrder(id: string): Promise<OrderResponseDTO> {
    if (!id || id.trim() === '') {
      throw new ValidationException('Order ID is required');
    }

    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new Error('Order not found');
    }

    return this.toResponseDTO(order);
  }

  async updateOrder(id: string, dto: OrderUpdateDTO): Promise<OrderResponseDTO> {
    try {
      await validateDTO(OrderUpdateDTO, dto);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Validation failed';
      throw new ValidationException(message);
    }

    const existingOrder = await this.orderRepository.findById(id);
    if (!existingOrder) {
      throw new Error('Order not found');
    }

    if (existingOrder.status === 'COMPLETED' || existingOrder.status === 'CANCELLED') {
      throw new Error('Cannot update a completed or cancelled order');
    }

    const updatedOrder = new Order(
      id,
      dto.customerId || existingOrder.customerId,
      dto.products ? dto.products.map(p => ({
        productId: p.productId,
        quantity: p.quantity,
        price: p.price
      })) : existingOrder.products,
      dto.status || existingOrder.status,
      existingOrder.createdAt,
      new Date()
    );

    const result = await this.orderRepository.update(updatedOrder);
    return this.toResponseDTO(result);
  }

  async deleteOrder(id: string): Promise<void> {
    if (!id || id.trim() === '') {
      throw new ValidationException('Order ID is required');
    }

    const existingOrder = await this.orderRepository.findById(id);
    if (!existingOrder) {
      throw new Error('Order not found');
    }

    if (existingOrder.status === 'COMPLETED') {
      throw new Error('Cannot delete a completed order');
    }

    await this.orderRepository.delete(id);
  }

  async listOrders(): Promise<OrderResponseDTO[]> {
    const orders = await this.orderRepository.list();
    return orders.map(order => this.toResponseDTO(order));
  }

  async getOrdersByCustomer(customerId: string): Promise<OrderResponseDTO[]> {
    if (!customerId || customerId.trim() === '') {
      throw new ValidationException('Customer ID is required');
    }

    const orders = await this.orderRepository.findByCustomerId(customerId);
    return orders.map(order => this.toResponseDTO(order));
  }

  private toResponseDTO(order: Order): OrderResponseDTO {
    return {
      id: order.id,
      customerId: order.customerId,
      products: order.products.map(p => ({
        productId: p.productId,
        quantity: p.quantity,
        price: p.price
      })),
      status: order.status,
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString()
    };
  }

  private generateOrderId(): string {
    return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}