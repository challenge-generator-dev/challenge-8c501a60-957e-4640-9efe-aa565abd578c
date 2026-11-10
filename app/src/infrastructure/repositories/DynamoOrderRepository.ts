import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand, ScanCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { Order, OrderStatus } from '../../domain/models/Order';
import { OrderRepository } from '../../domain/repositories/OrderRepository';
import { v4 as uuidv4 } from 'uuid';

export class DynamoOrderRepository implements OrderRepository {
  private readonly client: DynamoDBDocumentClient;
  private readonly tableName: string;

  constructor(client: DynamoDBClient, tableName: string) {
    this.client = DynamoDBDocumentClient.from(client);
    this.tableName = tableName;
  }

  async create(order: Order): Promise<Order> {
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const orderWithTimestamps = {
      ...order,
      createdAt,
      updatedAt
    };

    const params = {
      TableName: this.tableName,
      Item: {
        id: orderWithTimestamps.id,
        customerId: orderWithTimestamps.customerId,
        status: orderWithTimestamps.status,
        products: orderWithTimestamps.products.map(product => ({
          productId: product.productId,
          quantity: product.quantity,
          price: product.price
        })),
        totalAmount: orderWithTimestamps.totalAmount,
        createdAt: orderWithTimestamps.createdAt,
        updatedAt: orderWithTimestamps.updatedAt
      },
      ConditionExpression: 'attribute_not_exists(id)'
    };

    try {
      await this.client.send(new PutCommand(params));
      return orderWithTimestamps;
    } catch (error) {
      if (error.name === 'ConditionalCheckFailedException') {
        throw new Error('Order already exists');
      }
      throw error;
    }
  }

  async findById(id: string): Promise<Order | null> {
    const params = {
      TableName: this.tableName,
      Key: { id }
    };

    const result = await this.client.send(new GetCommand(params));
    if (!result.Item) {
      return null;
    }

    return this.mapDynamoItemToOrder(result.Item);
  }

  async update(order: Order): Promise<Order> {
    const updatedAt = new Date().toISOString();
    const params = {
      TableName: this.tableName,
      Key: { id: order.id },
      UpdateExpression: 'SET #status = :status, products = :products, totalAmount = :totalAmount, updatedAt = :updatedAt',
      ExpressionAttributeNames: {
        '#status': 'status'
      },
      ExpressionAttributeValues: {
        ':status': order.status,
        ':products': order.products.map(product => ({
          productId: product.productId,
          quantity: product.quantity,
          price: product.price
        })),
        ':totalAmount': order.totalAmount,
        ':updatedAt': updatedAt
      },
      ReturnValues: 'ALL_NEW'
    };

    const result = await this.client.send(new UpdateCommand(params));
    if (!result.Attributes) {
      throw new Error('Order not found');
    }

    return this.mapDynamoItemToOrder(result.Attributes);
  }

  async delete(id: string): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: { id }
    };

    await this.client.send(new DeleteCommand(params));
  }

  async list(): Promise<Order[]> {
    const params = {
      TableName: this.tableName
    };

    const result = await this.client.send(new ScanCommand(params));
    if (!result.Items) {
      return [];
    }

    return result.Items.map(item => this.mapDynamoItemToOrder(item));
  }

  async findByCustomerId(customerId: string): Promise<Order[]> {
    const params = {
      TableName: this.tableName,
      IndexName: 'CustomerIdIndex',
      KeyConditionExpression: 'customerId = :customerId',
      ExpressionAttributeValues: {
        ':customerId': customerId
      }
    };

    const result = await this.client.send(new QueryCommand(params));
    if (!result.Items) {
      return [];
    }

    return result.Items.map(item => this.mapDynamoItemToOrder(item));
  }

  private mapDynamoItemToOrder(item: any): Order {
    return new Order(
      item.id,
      item.customerId,
      item.status as OrderStatus,
      item.products.map((product: any) => new OrderProduct(product.productId, product.quantity, product.price)),
      item.totalAmount,
      item.createdAt,
      item.updatedAt
    );
  }
}