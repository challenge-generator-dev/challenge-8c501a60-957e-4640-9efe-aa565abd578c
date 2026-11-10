import { Request, Response, NextFunction, Router } from 'express';
import { OrderService } from '../../application/services/OrderService';
import { OrderCreateDTO, OrderUpdateDTO } from '../../types/orderTypes';
import { validateDto, extractValidationErrors } from '../../utils/validation';
import { AppError } from '../../utils/errorHandler';
import { ValidationError } from 'class-validator';

export class OrderController {
  private readonly router: Router;
  private readonly basePath = '/orders';

  constructor(private readonly orderService: OrderService) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(this.basePath, this.createOrder.bind(this));
    this.router.get(`${this.basePath}/:id`, this.getOrder.bind(this));
    this.router.put(`${this.basePath}/:id`, this.updateOrder.bind(this));
    this.router.delete(`${this.basePath}/:id`, this.deleteOrder.bind(this));
    this.router.get(this.basePath, this.listOrders.bind(this));
  }

  getRouter(): Router {
    return this.router;
  }

  async createOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = req.body as OrderCreateDTO;
      
      try {
        await validateDto(OrderCreateDTO, dto);
      } catch (validationError) {
        if (validationError instanceof Error) {
          res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: validationError.message
          });
          return;
        }
        throw validationError;
      }

      const order = await this.orderService.createOrder(dto);
      
      res.status(201).json({
        success: true,
        data: order
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
          code: error.code
        });
        return;
      }
      
      next(error);
    }
  }

  async getOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      
      if (!id || id.trim() === '') {
        res.status(400).json({
          success: false,
          message: 'Order ID is required'
        });
        return;
      }

      const order = await this.orderService.getOrder(id);
      
      if (!order) {
        res.status(404).json({
          success: false,
          message: 'Order not found',
          code: 'ORDER_NOT_FOUND'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: order
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
          code: error.code
        });
        return;
      }
      
      next(error);
    }
  }

  async updateOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const dto = req.body as OrderUpdateDTO;
      
      if (!id || id.trim() === '') {
        res.status(400).json({
          success: false,
          message: 'Order ID is required'
        });
        return;
      }

      try {
        await validateDto(OrderUpdateDTO, dto);
      } catch (validationError) {
        if (validationError instanceof Error) {
          res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: validationError.message
          });
          return;
        }
        throw validationError;
      }

      const order = await this.orderService.updateOrder(id, dto);
      
      res.status(200).json({
        success: true,
        data: order
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
          code: error.code
        });
        return;
      }
      
      if ((error as any).name === 'ConditionalCheckFailedException') {
        res.status(409).json({
          success: false,
          message: 'Order version mismatch - concurrent modification detected',
          code: 'CONCURRENT_MODIFICATION'
        });
        return;
      }
      
      next(error);
    }
  }

  async deleteOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      
      if (!id || id.trim() === '') {
        res.status(400).json({
          success: false,
          message: 'Order ID is required'
        });
        return;
      }

      await this.orderService.deleteOrder(id);
      
      res.status(204).send();
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
          code: error.code
        });
        return;
      }
      
      next(error);
    }
  }

  async listOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const customerId = req.query.customerId as string | undefined;
      
      let orders;
      if (customerId) {
        orders = await this.orderService.getOrdersByCustomer(customerId);
      } else {
        orders = await this.orderService.listOrders();
      }

      res.status(200).json({
        success: true,
        data: orders,
        count: orders.length
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
          code: error.code
        });
        return;
      }
      
      next(error);
    }
  }
}