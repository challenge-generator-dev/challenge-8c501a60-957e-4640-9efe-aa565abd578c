import express, { Express, Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import * as yaml from 'yamljs';
import * as path from 'path';

const swaggerDocument = {
  openapi: '3.0.3',
  info: {
    title: 'Order Management API',
    version: '1.0.0',
    description: 'API REST para la gestión de órdenes en una plataforma de comercio electrónico. Proporciona operaciones CRUD completas para la administración de órdenes de clientes.',
    contact: {
      name: 'API Support',
      email: 'support@example.com'
    },
    license: {
      name: 'ISC',
      url: 'https://opensource.org/licenses/ISC'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de desarrollo local'
    }
  ],
  tags: [
    {
      name: 'Orders',
      description: 'Operaciones CRUD para la gestión de órdenes'
    }
  ],
  paths: {
    '/orders': {
      get: {
        tags: ['Orders'],
        summary: 'Listar todas las órdenes',
        description: 'Obtiene una lista de todas las órdenes. Opcionalmente filtra por ID de cliente.',
        operationId: 'listOrders',
        parameters: [
          {
            name: 'customerId',
            in: 'query',
            description: 'Filtrar órdenes por ID de cliente',
            required: false,
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '200': {
            description: 'Lista de órdenes exitosa',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean' },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/OrderResponse' }
                    },
                    count: { type: 'integer' }
                  }
                }
              }
            }
          },
          '500': {
            description: 'Error interno del servidor',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      },
      post: {
        tags: ['Orders'],
        summary: 'Crear una nueva orden',
        description: 'Crea una nueva orden en el sistema. La orden debe contener al menos un producto con cantidad válida.',
        operationId: 'createOrder',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/OrderCreate' }
            }
          }
        },
        responses: {
          '201': {
            description: 'Orden creada exitosamente',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean' },
                    data: { $ref: '#/components/schemas/OrderResponse' }
                  }
                }
              }
            }
          },
          '400': {
            description: 'Solicitud inválida - error de validación',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ValidationError' }
              }
            }
          },
          '409': {
            description: 'Conflicto - orden duplicada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },
    '/orders/{id}': {
      get: {
        tags: ['Orders'],
        summary: 'Obtener una orden por ID',
        description: 'Recupera los detalles de una orden específica utilizando su identificador único.',
        operationId: 'getOrder',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Identificador único de la orden',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '200': {
            description: 'Orden encontrada exitosamente',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean' },
                    data: { $ref: '#/components/schemas/OrderResponse' }
                  }
                }
              }
            }
          },
          '404': {
            description: 'Orden no encontrada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      },
      put: {
        tags: ['Orders'],
        summary: 'Actualizar una orden existente',
        description: 'Actualiza los datos de una orden existente. Soporta actualización parcial de campos.',
        operationId: 'updateOrder',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Identificador único de la orden',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/OrderUpdate' }
            }
          }
        },
        responses: {
          '200': {
            description: 'Orden actualizada exitosamente',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean' },
                    data: { $ref: '#/components/schemas/OrderResponse' }
                  }
                }
              }
            }
          },
          '400': {
            description: 'Solicitud inválida - error de validación',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ValidationError' }
              }
            }
          },
          '404': {
            description: 'Orden no encontrada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          },
          '409': {
            description: 'Conflicto - modificación concurrente detectada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      },
      delete: {
        tags: ['Orders'],
        summary: 'Eliminar una orden',
        description: 'Elimina una orden del sistema permanentemente.',
        operationId: 'deleteOrder',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Identificador único de la orden',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '204': {
            description: 'Orden eliminada exitosamente'
          },
          '404': {
            description: 'Orden no encontrada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      OrderProduct: {
        type: 'object',
        required: ['productId', 'quantity', 'price'],
        properties: {
          productId: {
            type: 'string',
            description: 'Identificador único del producto'
          },
          quantity: {
            type: 'integer',
            minimum: 1,
            description: 'Cantidad del producto ordenada'
          },
          price: {
            type: 'number',
            minimum: 0,
            description: 'Precio unitario del producto'
          }
        }
      },
      OrderCreate: {
        type: 'object',
        required: ['customerId', 'products'],
        properties: {
          customerId: {
            type: 'string',
            description: 'Identificador único del cliente'
          },
          products: {
            type: 'array',
            items: { $ref: '#/components/schemas/OrderProduct' },
            minItems: 1,
            description: 'Lista de productos en la orden'
          },
          shippingAddress: {
            type: 'string',
            description: 'Dirección de envío'
          }
        }
      },
      OrderUpdate: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            enum: ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
            description: 'Nuevo estado de la orden'
          },
          products: {
            type: 'array',
            items: { $ref: '#/components/schemas/OrderProduct' },
            minItems: 1,
            description: 'Lista actualizada de productos'
          },
          shippingAddress: {
            type: 'string',
            description: 'Dirección de envío actualizada'
          }
        }
      },
      OrderResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Identificador único de la orden'
          },
          customerId: {
            type: 'string',
            description: 'Identificador del cliente'
          },
          status: {
            type: 'string',
            enum: ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
            description: 'Estado actual de la orden'
          },
          products: {
            type: 'array',
            items: { $ref: '#/components/schemas/OrderProduct' },
            description: 'Lista de productos'
          },
          totalAmount: {
            type: 'number',
            description: 'Monto total de la orden'
          },
          shippingAddress: {
            type: 'string',
            description: 'Dirección de envío'
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Fecha de creación'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Última fecha de actualización'
          },
          version: {
            type: 'integer',
            description: 'Versión para control de concurrencia optimista'
          }
        }
      },
      Error: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: false
          },
          message: {
            type: 'string',
            description: 'Mensaje de error'
          },
          code: {
            type: 'string',
            description: 'Código de error'
          }
        }
      },
      ValidationError: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: false
          },
          message: {
            type: 'string',
            example: 'Validation failed'
          },
          errors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                field: { type: 'string' },
                message: { type: 'string' }
              }
            }
          }
        }
      }
    }
  }
};

export function setupSwagger(app: Express): void {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  
  app.get('/api-docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDocument);
  });

  app.get('/api-docs.yaml', (req: Request, res: Response) => {
    const yamlDocument = yaml.stringify(swaggerDocument, 10, 2);
    res.setHeader('Content-Type', 'text/yaml');
    res.send(yamlDocument);
  });
}

export default swaggerDocument;