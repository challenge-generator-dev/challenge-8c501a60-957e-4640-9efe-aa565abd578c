# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `app` | `app/` | practice, chapter | server | Node | Express, DynamoDB |
| `infra` | `infra/` | support | infra | Terraform (AWS) | Terraform |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate` — componente `infra` (support).
3. `cd app && npm install && npm run build` — componente `app` (practice, chapter).

### Contratos entre componentes

- `app` expone http (api: http://localhost:3000):
  - `POST /orders`
  - `GET /orders/:id`
  - `PUT /orders/:id`
  - `DELETE /orders/:id`
  - `GET /orders`

## Herramientas

- **Terraform**: Herramienta de trabajo del candidato: usala en la fase donde se depura o se prueba la solucion (no es una dependencia del proyecto).

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Boilerplate del stack que falta

Sin esto no compila ni arranca. Es andamiaje, no toca nada de lo pedagogico:

- **app/src/app.module.ts** — Sin el modulo raiz, Nest no tiene arbol de dependencias que resolver y el bootstrap falla.

## Como saber que terminaste

```bash
(cd app && npm install && npm run build) && (cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate) && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced L2

### Brecha de conocimiento
CRUD de ordenes en DynamoDB expuesto por una API REST (corrida e2e 20261109184921254), Implementa operaciones CRUD de ordenes sobre una tabla DynamoDB expuestas por una API REST

### Misión / candidato
Persistir y consultar ordenes

### Reto
- Tema: CRUD de ordenes sobre DynamoDB
- Seniority: advanced-l2
- Tipo: practical
- Título: Implementación de CRUD de órdenes en DynamoDB
- Tiempo estimado: 12 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración y modelado inicial — objetivo: Configurar la tabla DynamoDB y modelar las operaciones CRUD básicas. — entregable (NO resolver): Tabla DynamoDB configurada y operaciones CRUD básicas implementadas.
- Fase 2: Implementación de operaciones CRUD completas — objetivo: Implementar operaciones CRUD completas para órdenes, incluyendo lectura, actualización y eliminación. — entregable (NO resolver): Operaciones CRUD completas implementadas y verificadas.
- Fase 3: Optimización y manejo de errores — objetivo: Optimizar las operaciones CRUD y manejar adecuadamente los errores. — entregable (NO resolver): Operaciones CRUD optimizadas y manejo de errores implementado.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: app/package.json ===
{
  "name": "order-management-service",
  "version": "1.0.0",
  "description": "Servicio de gestión de órdenes con DynamoDB",
  "main": "dist/main.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/main.js",
    "dev": "nodemon src/main.ts",
    "test": "jest",
    "swagger": "ts-node src/infrastructure/controllers/swagger.ts"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@aws-sdk/client-dynamodb": "^3.658.0",
    "@aws-sdk/lib-dynamodb": "^3.658.0",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.1",
    "dotenv": "^16.4.5",
    "express": "^4.21.0",
    "swagger-ui-express": "^5.0.1",
    "uuid": "^9.0.1",
    "yamljs": "^0.3.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^22.7.4",
    "@types/swagger-ui-express": "^4.1.6",
    "@types/uuid": "^9.0.8",
    "nodemon": "^3.1.7",
    "ts-node": "^10.9.2",
    "typescript": "^5.7.0"
  }
}


// === ARCHIVO: app/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}

// === ARCHIVO: app/src/main.ts ===
import express from 'express';
import dotenv from 'dotenv';
import { errorHandler } from './utils/errorHandler';
import { OrderController } from './infrastructure/controllers/OrderController';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Swagger documentation
const swaggerDocument = YAML.load(path.join(__dirname, '../docs/swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
const orderController = new OrderController();
app.post('/orders', orderController.createOrder.bind(orderController));
app.get('/orders/:id', orderController.getOrder.bind(orderController));
app.put('/orders/:id', orderController.updateOrder.bind(orderController));
app.delete('/orders/:id', orderController.deleteOrder.bind(orderController));
app.get('/orders', orderController.listOrders.bind(orderController));

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
});

// === ARCHIVO: app/src/domain/models/Order.ts ===
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

// === ARCHIVO: app/src/domain/repositories/OrderRepository.ts ===
import { Order } from '../models/Order';

export interface OrderRepository {
  create(order: Order): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  update(order: Order): Promise<Order>;
  delete(id: string): Promise<void>;
  list(): Promise<Order[]>;
  findByCustomerId(customerId: string): Promise<Order[]>;
}

// === ARCHIVO: app/src/infrastructure/repositories/DynamoOrderRepository.ts ===
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

// === ARCHIVO: app/src/application/services/OrderService.ts ===
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

// === ARCHIVO: app/src/infrastructure/controllers/OrderController.ts ===
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

// === ARCHIVO: app/src/infrastructure/config/dynamoConfig.ts ===
import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, DynamoDBDocumentClientConfig } from '@aws-sdk/lib-dynamodb';
import * as dotenv from 'dotenv';

dotenv.config();

export interface DynamoConfig {
  client: DynamoDBDocumentClient;
  tableName: string;
  region: string;
}

function getClientConfig(): DynamoDBClientConfig {
  const config: DynamoDBClientConfig = {
    region: process.env.AWS_REGION || 'us-east-1',
  };

  if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
    config.credentials = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    };
  }

  if (process.env.DYNAMODB_ENDPOINT) {
    config.endpoint = process.env.DYNAMODB_ENDPOINT;
  }

  if (process.env.AWS_MAX_ATTEMPTS) {
    config.maxAttempts = parseInt(process.env.AWS_MAX_ATTEMPTS, 10);
  }

  if (process.env.AWS_RETRY_MODE) {
    config.retryMode = process.env.AWS_RETRY_MODE as 'standard' | 'adaptive';
  }

  return config;
}

function getDocumentClientConfig(): DynamoDBDocumentClientConfig {
  const config: DynamoDBDocumentClientConfig = {
    marshallOptions: {
      removeUndefinedValues: true,
      convertClassInstanceToMap: true,
      convertTopLevelContainer: true,
    },
    unmarshallOptions: {
      wrapNumbers: false,
    },
  };

  return config;
}

export function createDynamoClient(): DynamoDBDocumentClient {
  const clientConfig = getClientConfig();
  const documentClientConfig = getDocumentClientConfig();
  
  const dynamoClient = new DynamoDBClient(clientConfig);
  const docClient = DynamoDBDocumentClient.from(dynamoClient, documentClientConfig);
  
  return docClient;
}

export function createDynamoConfig(): DynamoConfig {
  const client = createDynamoClient();
  const tableName = process.env.DYNAMODB_TABLE_NAME || 'orders';
  const region = process.env.AWS_REGION || 'us-east-1';
  
  return {
    client,
    tableName,
    region,
  };
}

export function validateDynamoConfig(): void {
  const requiredEnvVars = ['AWS_REGION'];
  const missingEnvVars: string[] = [];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missingEnvVars.push(envVar);
    }
  }

  if (missingEnvVars.length > 0) {
    console.warn(
      `Warning: Missing required environment variables: ${missingEnvVars.join(', ')}. ` +
      `Using default values. For local development, ensure .env file is properly configured.`
    );
  }
}

export const dynamoConfig = createDynamoConfig();
export const dynamoClient = dynamoConfig.client;
export const orderTableName = dynamoConfig.tableName;

// === ARCHIVO: app/src/infrastructure/controllers/swagger.ts ===
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

// === ARCHIVO: app/src/types/orderTypes.ts ===
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

// === ARCHIVO: app/src/utils/errorHandler.ts ===
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

// === ARCHIVO: app/src/utils/validation.ts ===
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

// === ARCHIVO: infra/providers.tf ===
# Terraform configuration for AWS provider
# This file declares the required providers and their versions
# to ensure consistent infrastructure provisioning.

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.67.0"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region = var.aws_region
  
  # Default tags for all resources
  default_tags {
    tags = {
      Environment = var.environment
      Project     = var.project_name
      Terraform   = "true"
    }
  }
}

# Additional provider configuration for us-east-1
# Required for global services like ACM certificates
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
  
  default_tags {
    tags = {
      Environment = var.environment
      Project     = var.project_name
      Terraform   = "true"
    }
  }
}

# Local values for common configurations
locals {
  common_tags = {
    Environment = var.environment
    Project     = var.project_name
    ManagedBy   = "Terraform"
  }
}

# Output the AWS account ID for reference in other modules
output "aws_account_id" {
  description = "The AWS Account ID"
  value       = data.aws_caller_identity.current.account_id
}

# Get the current AWS account identity
data "aws_caller_identity" "current" {}

# Output the current AWS region
output "aws_region" {
  description = "The AWS region being used"
  value       = var.aws_region
}

// === ARCHIVO: infra/variables.tf ===
# Input variables for the Terraform configuration
# These variables allow customization of the infrastructure
# deployment for different environments.

variable "aws_region" {
  description = "The AWS region where resources will be created"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "The deployment environment (dev, staging, prod)"
  type        = string
  default     = "dev"
  
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be one of: dev, staging, prod"
  }
}

variable "project_name" {
  description = "The name of the project, used for resource naming and tagging"
  type        = string
  default     = "ecommerce-orders"
}

variable "dynamodb_table_name" {
  description = "The name of the DynamoDB table for orders"
  type        = string
  default     = "Orders"
}

variable "dynamodb_billing_mode" {
  description = "The billing mode for the DynamoDB table (PROVISIONED or PAY_PER_REQUEST)"
  type        = string
  default     = "PAY_PER_REQUEST"
  
  validation {
    condition     = contains(["PROVISIONED", "PAY_PER_REQUEST"], var.dynamodb_billing_mode)
    error_message = "Billing mode must be either PROVISIONED or PAY_PER_REQUEST"
  }
}

variable "dynamodb_read_capacity" {
  description = "The read capacity units for the DynamoDB table (only used when billing_mode is PROVISIONED)"
  type        = number
  default     = 5
}

variable "dynamodb_write_capacity" {
  description = "The write capacity units for the DynamoDB table (only used when billing_mode is PROVISIONED)"
  type        = number
  default     = 5
}

variable "dynamodb_hash_key" {
  description = "The hash key (partition key) for the DynamoDB table"
  type        = string
  default     = "order_id"
}

variable "dynamodb_range_key" {
  description = "The range key (sort key) for the DynamoDB table"
  type        = string
  default     = ""
}

variable "dynamodb_attributes" {
  description = "List of attribute definitions for the DynamoDB table"
  type = list(object({
    name = string
    type = string
  }))
  default = [
    {
      name = "order_id"
      type = "S"
    },
    {
      name = "customer_id"
      type = "S"
    },
    {
      name = "order_date"
      type = "S"
    },
    {
      name = "status"
      type = "S"
    }
  ]
}

variable "dynamodb_global_secondary_indexes" {
  description = "List of global secondary indexes for the DynamoDB table"
  type = list(object({
    name               = string
    hash_key           = string
    range_key          = string
    projection_type    = string
    read_capacity      = number
    write_capacity     = number
    non_key_attributes = list(string)
  }))
  default = [
    {
      name               = "CustomerIndex"
      hash_key           = "customer_id"
      range_key          = "order_date"
      projection_type    = "INCLUDE"
      read_capacity      = 5
      write_capacity     = 5
      non_key_attributes = ["status", "total_amount"]
    },
    {
      name               = "StatusIndex"
      hash_key           = "status"
      range_key          = "order_date"
      projection_type    = "KEYS_ONLY"
      read_capacity      = 5
      write_capacity     = 5
      non_key_attributes = []
    }
  ]
}

variable "enable_dynamodb_point_in_time_recovery" {
  description = "Enable point-in-time recovery for the DynamoDB table"
  type        = bool
  default     = true
}

variable "enable_dynamodb_stream" {
  description = "Enable DynamoDB Streams for the table"
  type        = bool
  default     = true
}

variable "dynamodb_stream_view_type" {
  description = "When an item in the table is modified, what information is written to the stream"
  type        = string
  default     = "NEW_AND_OLD_IMAGES"
  
  validation {
    condition     = contains(["KEYS_ONLY", "NEW_IMAGE", "OLD_IMAGE", "NEW_AND_OLD_IMAGES"], var.dynamodb_stream_view_type)
    error_message = "Stream view type must be one of: KEYS_ONLY, NEW_IMAGE, OLD_IMAGE, NEW_AND_OLD_IMAGES"
  }
}

// === ARCHIVO: infra/modules/dynamodb/variables.tf ===
# Input variables for the DynamoDB module
# These variables allow customization of the DynamoDB table
# configuration for different use cases.

variable "table_name" {
  description = "The name of the DynamoDB table"
  type        = string
}

variable "billing_mode" {
  description = "The billing mode for the DynamoDB table (PROVISIONED or PAY_PER_REQUEST)"
  type        = string
  default     = "PAY_PER_REQUEST"
  
  validation {
    condition     = contains(["PROVISIONED", "PAY_PER_REQUEST"], var.billing_mode)
    error_message = "Billing mode must be either PROVISIONED or PAY_PER_REQUEST"
  }
}

variable "read_capacity" {
  description = "The read capacity units for the DynamoDB table (only used when billing_mode is PROVISIONED)"
  type        = number
  default     = 5
}

variable "write_capacity" {
  description = "The write capacity units for the DynamoDB table (only used when billing_mode is PROVISIONED)"
  type        = number
  default     = 5
}

variable "hash_key" {
  description = "The hash key (partition key) for the DynamoDB table"
  type        = string
}

variable "range_key" {
  description = "The range key (sort key) for the DynamoDB table"
  type        = string
  default     = ""
}

variable "attributes" {
  description = "List of attribute definitions for the DynamoDB table"
  type = list(object({
    name = string
    type = string
  }))
}

variable "global_secondary_indexes" {
  description = "List of global secondary indexes for the DynamoDB table"
  type = list(object({
    name               = string
    hash_key           = string
    range_key          = string
    projection_type    = string
    read_capacity      = number
    write_capacity     = number
    non_key_attributes = list(string)
  }))
  default = []
}

variable "enable_point_in_time_recovery" {
  description = "Enable point-in-time recovery for the DynamoDB table"
  type        = bool
  default     = false
}

variable "enable_stream" {
  description = "Enable DynamoDB Streams for the table"
  type        = bool
  default     = false
}

variable "stream_view_type" {
  description = "When an item in the table is modified, what information is written to the stream"
  type        = string
  default     = "NEW_AND_OLD_IMAGES"
  
  validation {
    condition     = contains(["KEYS_ONLY", "NEW_IMAGE", "OLD_IMAGE", "NEW_AND_OLD_IMAGES"], var.stream_view_type)
    error_message = "Stream view type must be one of: KEYS_ONLY, NEW_IMAGE, OLD_IMAGE, NEW_AND_OLD_IMAGES"
  }
}

variable "tags" {
  description = "A map of tags to assign to the DynamoDB table"
  type        = map(string)
  default     = {}
}

variable "ttl_attribute_name" {
  description = "The name of the TTL attribute for the DynamoDB table"
  type        = string
  default     = ""
}

variable "server_side_encryption_enabled" {
  description = "Enable server-side encryption for the DynamoDB table"
  type        = bool
  default     = true
}

variable "server_side_encryption_kms_key_arn" {
  description = "The ARN of the KMS key to use for server-side encryption"
  type        = string
  default     = ""
}

// === ARCHIVO: infra/versions.tf ===
terraform {
  required_version = ">= 1.9.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.67.0"
    }

    random = {
      source  = "hashicorp/random"
      version = "3.6.3"
    }
  }

  backend "s3" {
    bucket = "terraform-state-bucket-${var.environment}"
    key    = "infra/state.tfstate"
    region = "us-east-1"

    dynamodb_table = "terraform-state-lock"
    encrypt        = true
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Environment = var.environment
      Project     = "ecommerce-orders"
      ManagedBy   = "terraform"
      Owner       = "platform-team"
    }
  }

  ignore_tags {
    keys = ["managed-by-terraform"]
  }
}

provider "aws" {
  alias  = "dynamodb"
  region = var.dynamodb_region

  default_tags {
    tags = {
      Environment = var.environment
      Project     = "ecommerce-orders"
      ManagedBy   = "terraform"
      Component   = "dynamodb"
    }
  }
}

variable "aws_region" {
  description = "Región primaria de AWS para recursos principales"
  type        = string
  default     = "us-east-1"
}

variable "dynamodb_region" {
  description = "Región para la tabla DynamoDB (puede ser diferente para redundancia)"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Entorno de despliegue (dev, staging, prod)"
  type        = string
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "El entorno debe ser: dev, staging o prod."
  }
}

output "terraform_version" {
  description = "Versión de Terraform utilizada"
  value       = terraform.version
}

output "aws_provider_version" {
  description = "Versión del provider de AWS"
  value       = provider.aws.version
}

// === ARCHIVO: infra/README.md ===
# Módulo de Infraestructura - DynamoDB para Órdenes

## Propósito

Este módulo define la infraestructura necesaria para gestionar órdenes de una plataforma de comercio electrónico utilizando Amazon DynamoDB como almacenamiento primario.

## Recursos Definidos

### Tabla DynamoDB
- **Nombre**: `orders-${var.environment}`
- **Tipo**: PAY_PER_REQUEST (onder demanda)
- **Partición clave**: `order_id` (String)
- **Orden de sort**: `created_at` (String - timestamp ISO 8601)

### Índice Secundario Global (GSI)
- **GSI1 - Por cliente**: Permite consultas por `customer_id`
- **GSI2 - Por estado**: Permite consultas por `status` con filtro de fecha
- **GSI3 - Por fecha de actualización**: Seguimiento de órdenes modificadas recientemente

### Políticas IAM
- Rol de aplicación con permisos de lectura/escritura condicionados
- Política de acceso con mínimo privilegio basada en el ID de orden
- Permisos para CloudWatch Logs y X-Ray

## Uso del Módulo

```hcl
module "infra" {
  source = "./infra"

  environment = "dev"
  aws_region  = "us-east-1"
  
  table_name             = "orders"
  billing_mode           = "PAY_PER_REQUEST"
  enable_point_in_time   = true
  enable_server_side_encryption = true
  
  tags = {
    CostCenter = "ecommerce"
  }
}
```

## Validación Local

### Requisitos Previos
- Terraform >= 1.9.0
- AWS CLI configurado con credenciales
- Provider de AWS versión 5.67.0

### Comandos de Validación

1. **Inicializar el backend y descargar providers**:
   ```bash
   cd infra
   terraform init
   ```

2. **Validar sintaxis y formato**:
   ```bash
   terraform validate
   ```

3. **Planificar cambios** (simula sin aplicar):
   ```bash
   terraform plan -var-file=../environments/dev/terraform.tfvars
   ```

4. **Aplicar infraestructura** (entorno dev):
   ```bash
   terraform apply -var-file=../environments/dev/terraform.tfvars
   ```

5. **Destruir recursos** (limpieza):
   ```bash
   terraform destroy -var-file=../environments/dev/terraform.tfvars
   ```

## Estructura de Archivos

```
infra/
├── versions.tf          # Configuración de providers y backend
├── README.md            # Este archivo
├── main.tf              # Definición de recursos principales
├── variables.tf         # Parámetros configurables
├── outputs.tf           # Valores exportados
└── modules/
    └── dynamodb/
        ├── main.tf
        ├── variables.tf
        └── outputs.tf
```

## Variables Principales

| Variable | Tipo | Default | Descripción |
|----------|------|---------|-------------|
| `environment` | string | - | Entorno (dev/staging/prod) |
| `aws_region` | string | us-east-1 | Región de AWS |
| `table_name` | string | orders | Nombre base de la tabla |
| `billing_mode` | string | PAY_PER_REQUEST | Modo de facturación |
| `enable_point_in_time` | bool | true | Recuperación a punto en tiempo |
| `enable_server_side_encryption` | bool | true | Cifrado en servidor |

## Outputs Exportados

- `table_name`: Nombre completo de la tabla DynamoDB
- `table_arn`: ARN de la tabla para permisos IAM
- `table_stream_arn`: ARN del stream para eventos (si está habilitado)
- `dynamodb_endpoint`: Endpoint de la tabla
- `region`: Región donde está desplegada la tabla

## Consideraciones de Seguridad

- El cifrado SSE-KMS usa CMK gestionada por AWS por defecto
- Point-in-time recovery habilitado para recuperación ante desastres
- TTL configurado para limpieza automática de registros antiguos
- Políticas IAM con acceso condicionadas por atributos de recurso

## Notas de Diseño

- El patrón de nombres `orders-{entorno}` permite entornos aislados
- GSI configurados para optimizar los patrones de consulta del dominio
- Modo de facturación on-demand para escalar sin configuración manual
- Tags obligatorios para trazabilidad y costeo en todas las cuentas

// === ARCHIVO: infra/main.tf ===
# =============================================================================
# Configuración principal de recursos AWS para el sistema de pedidos
# Este archivo define la infraestructura core: tabla DynamoDB para órdenes
# y políticas IAM asociadas para acceso seguro
# =============================================================================

# -----------------------------------------------------------------------------
# Tabla DynamoDB para gestión de órdenes
# -----------------------------------------------------------------------------
resource "aws_dynamodb_table" "orders" {
  name           = var.orders_table_name
  billing_mode   = var.billing_mode
  hash_key       = "orderId"
  range_key      = "customerId"

  attribute {
    name = "orderId"
    type = "S"
  }

  attribute {
    name = "customerId"
    type = "S"
  }

  attribute {
    name = "status"
    type = "S"
  }

  attribute {
    name = "createdAt"
    type = "S"
  }

  attribute {
    name = "updatedAt"
    type = "S"
  }

  # GSI para consultas por cliente: permite obtener todas las órdenes de un cliente
  global_secondary_index {
    name            = "CustomerIdIndex"
    hash_key        = "customerId"
    range_key       = "createdAt"
    projection_type = "ALL"
    read_capacity   = var.gsi_read_capacity
    write_capacity  = var.gsi_write_capacity
  }

  # GSI para consultas por estado: permite filtrar órdenes por status
  global_secondary_index {
    name            = "StatusIndex"
    hash_key        = "status"
    range_key       = "createdAt"
    projection_type = "ALL"
    read_capacity   = var.gsi_read_capacity
    write_capacity  = var.gsi_write_capacity
  }

  # GSI para consultas por cliente y estado: combinación útil para soporte
  global_secondary_index {
    name            = "CustomerStatusIndex"
    hash_key        = "customerId"
    range_key       = "status"
    projection_type = "INCLUDE"
    non_key_attributes = ["orderId", "createdAt", "updatedAt", "totalAmount"]
    read_capacity   = var.gsi_read_capacity
    write_capacity  = var.gsi_write_capacity
  }

  ttl {
    attribute_name = "ttl"
    enabled        = true
  }

  tags = merge(
    var.common_tags,
    {
      Name        = "${var.orders_table_name}"
      Description = "Tabla de órdenes para el sistema de e-commerce"
      Component   = "orders"
      Environment = terraform.workspace
    }
  )

  lifecycle {
    prevent_destroy = false
  }
}

# -----------------------------------------------------------------------------
# Política IAM para acceso completo a la tabla de órdenes
# -----------------------------------------------------------------------------
resource "aws_iam_policy" "dynamodb_full_access" {
  name        = "${var.orders_table_name}-full-access"
  description = "Política de acceso completo a la tabla de órdenes de DynamoDB"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:PutItem",
          "dynamodb:GetItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Query",
          "dynamodb:Scan"
        ]
        Resource = [
          aws_dynamodb_table.orders.arn,
          "${aws_dynamodb_table.orders.arn}/index/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "dynamodb:DescribeTable",
          "dynamodb:GetItem",
          "dynamodb:Scan"
        ]
        Resource = aws_dynamodb_table.orders.arn
      }
    ]
  })

  tags = merge(
    var.common_tags,
    {
      Name = "${var.orders_table_name}-full-access"
    }
  )
}

# -----------------------------------------------------------------------------
# Política IAM de solo lectura para soporte al cliente
# -----------------------------------------------------------------------------
resource "aws_iam_policy" "dynamodb_read_only" {
  name        = "${var.orders_table_name}-read-only"
  description = "Política de solo lectura para consultas de soporte al cliente"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:GetItem",
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:DescribeTable"
        ]
        Resource = [
          aws_dynamodb_table.orders.arn,
          "${aws_dynamodb_table.orders.arn}/index/*"
        ]
      }
    ]
  })

  tags = merge(
    var.common_tags,
    {
      Name = "${var.orders_table_name}-read-only"
    }
  )
}

# -----------------------------------------------------------------------------
# Política IAM para operaciones de procesamiento de pagos
# -----------------------------------------------------------------------------
resource "aws_iam_policy" "dynamodb_payment_processor" {
  name        = "${var.orders_table_name}-payment-processor"
  description = "Política específica para el servicio de procesamiento de pagos"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:UpdateItem",
          "dynamodb:GetItem"
        ]
        Resource = aws_dynamodb_table.orders.arn
        Condition = {
          ForAllValues:StringLikeIfExists = {
            "dynamodb:UpdateExpression" = ["SET #status = :newStatus"]
          }
        }
      }
    ]
  })

  tags = merge(
    var.common_tags,
    {
      Name = "${var.orders_table_name}-payment-processor"
    }
  )
}

# -----------------------------------------------------------------------------
# Bucket S3 para logs de auditoría
# -----------------------------------------------------------------------------
resource "aws_s3_bucket" "audit_logs" {
  bucket = "${var.project_name}-${terraform.workspace}-audit-logs"

  tags = merge(
    var.common_tags,
    {
      Name        = "${var.project_name}-${terraform.workspace}-audit-logs"
      Description = "Bucket para logs de auditoría del sistema de órdenes"
      Component   = "audit"
      Environment = terraform.workspace
    }
  )
}

resource "aws_s3_bucket_server_side_encryption_configuration" "audit_logs" {
  bucket = aws_s3_bucket.audit_logs.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_versioning" "audit_logs" {
  bucket = aws_s3_bucket.audit_logs.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_public_access_block" "audit_logs" {
  bucket = aws_s3_bucket.audit_logs.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# -----------------------------------------------------------------------------
# Exportar información de recursos creados
# -----------------------------------------------------------------------------
output "orders_table_name" {
  description = "Nombre de la tabla DynamoDB de órdenes"
  value       = aws_dynamodb_table.orders.name
}

output "orders_table_arn" {
  description = "ARN de la tabla DynamoDB de órdenes"
  value       = aws_dynamodb_table.orders.arn
}

output "audit_logs_bucket_name" {
  description = "Nombre del bucket de logs de auditoría"
  value       = aws_s3_bucket.audit_logs.id
}

output "dynamodb_full_access_policy_arn" {
  description = "ARN de la política de acceso completo a DynamoDB"
  value       = aws_iam_policy.dynamodb_full_access.arn
}

output "dynamodb_read_only_policy_arn" {
  description = "ARN de la política de solo lectura de DynamoDB"
  value       = aws_iam_policy.dynamodb_read_only.arn
}

output "dynamodb_payment_processor_policy_arn" {
  description = "ARN de la política de procesamiento de pagos"
  value       = aws_iam_policy.dynamodb_payment_processor.arn
}

// === ARCHIVO: infra/outputs.tf ===
# Outputs de la infraestructura de DynamoDB para gestión de órdenes
# Este archivo expone los valores de los recursos creados que son necesarios
# para la aplicación y para otras configuraciones de infraestructura.

output "dynamodb_table_arn" {
  description = "ARN completo de la tabla DynamoDB de órdenes"
  value       = module.dynamodb.dynamodb_table_arn
}

output "dynamodb_table_name" {
  description = "Nombre de la tabla DynamoDB de órdenes"
  value       = module.dynamodb.dynamodb_table_name
}

output "dynamodb_table_id" {
  description = "Identificador único de la tabla DynamoDB"
  value       = module.dynamodb.dynamodb_table_id
}

output "dynamodb_table_stream_arn" {
  description = "ARN del stream de DynamoDB para captura de cambios (CDC)"
  value       = module.dynamodb.dynamodb_table_stream_arn
  sensitive   = false
}

output "dynamodb_table_stream_label" {
  description = "Etiqueta del stream actual de DynamoDB"
  value       = module.dynamodb.dynamodb_table_stream_label
  sensitive   = false
}

output "dynamodb_table_endpoint" {
  description = "Endpoint de la tabla DynamoDB para conexiones directas"
  value       = "dynamodb.${var.aws_region}.amazonaws.com"
}

output "dynamodb_table_partition_key_name" {
  description = "Nombre de la clave de partición de la tabla"
  value       = module.dynamodb.dynamodb_table_partition_key_name
}

output "dynamodb_table_sort_key_name" {
  description = "Nombre de la clave de ordenación de la tabla"
  value       = module.dynamodb.dynamodb_table_sort_key_name
  nullable    = true
}

output "dynamodb_table_global_secondary_index_names" {
  description = "Nombres de los índices secundarios globales configurados"
  value       = module.dynamodb.dynamodb_table_global_secondary_index_names
}

output "dynamodb_table regional_secondary_index_names" {
  description = "Nombres de los índices secundarios locales configurados"
  value       = module.dynamodb.dynamodb_table_local_secondary_index_names
}

output "iam_role_arn" {
  description = "ARN del rol IAM con permisos de acceso a la tabla"
  value       = aws_iam_role.dynamodb_access.arn
}

output "iam_role_name" {
  description = "Nombre del rol IAM con permisos de acceso a la tabla"
  value       = aws_iam_role.dynamodb_access.name
}

output "dynamodb_kms_key_arn" {
  description = "ARN de la clave KMS usada para cifrado en reposo"
  value       = aws_kms_key.dynamodb_encryption.arn
}

output "dynamodb_backup_bucket_name" {
  description = "Nombre del bucket S3 para backups automáticos"
  value       = aws_s3_bucket.backups.id
}

output "dynamodb_backup_bucket_arn" {
  description = "ARN del bucket S3 para backups automáticos"
  value       = aws_s3_bucket.backups.arn
}

output "environment" {
  description = "Entorno de despliegue actual"
  value       = var.environment
}

output "aws_region" {
  description = "Región de AWS donde se desplegó la infraestructura"
  value       = var.aws_region
}

output "tags_applied" {
  description = "Tags aplicados a todos los recursos"
  value       = var.common_tags
}

output "terraform_workspace" {
  description = "Workspace de Terraform utilizado"
  value       = terraform.workspace
}

// === ARCHIVO: infra/environments/dev/terraform.tfvars ===
# Variables específicas del entorno de desarrollo
# Estas valores se cargan automáticamente cuando Terraform se ejecuta
# en el directorio environments/dev con el archivo terraform.tfvars

# Configuración del entorno
environment = "dev"
aws_region  = "us-east-1"

# Nombre base para los recursos (se añadirán sufijos automáticamente)
project_name = "ecommerce-orders"

# Configuración de la tabla DynamoDB
dynamodb_table_name = "orders-dev"
dynamodb_billing_mode = "PAY_PER_REQUEST"

# Capacidad bajo demanda (solo se usa si billing_mode es PROVISIONED)
read_capacity  = 5
write_capacity = 5

# Configuración de claves de la tabla
partition_key_name = "order_id"
partition_key_type = "S"

sort_key_name    = "customer_id"
sort_key_type    = "S"
enable_sort_key  = true

# Habilitar streams para captura de cambios
enable_dynamodb_streams = true
stream_view_type = "NEW_AND_OLD_IMAGES"

# Índices secundarios globales para consultas eficientes
gsi_config = [
  {
    name            = "CustomerOrdersIndex"
    partition_key  = "customer_id"
    sort_key       = "created_at"
    projection_type = "ALL"
    read_capacity  = 5
    write_capacity = 5
  },
  {
    name            = "StatusIndex"
    partition_key  = "status"
    sort_key       = "updated_at"
    projection_type = "ALL"
    read_capacity  = 5
    write_capacity = 5
  }
]

# Índices secundarios locales
lsi_config = [
  {
    name        = "OrderDateIndex"
    sort_key   = "order_date"
    projection_type = "KEYS_ONLY"
  }
]

# Configuración de seguridad
enable_server_side_encryption = true
kms_key_description = "Clave de cifrado para tabla DynamoDB de órdenes - DEV"
kms_key_deletion_window = 7

# Configuración de backups
enable_point_in_time_recovery = true
retention_days = 1

enable_s3_backup        = false
backup_bucket_prefix    = "dynamodb-backups"
backup_schedule         = "cron(0 5 ? * * *)"

# Configuración de TTL
enable_ttl                    = true
ttl_attribute_name            = "expiration_time"
ttl_delete_after_days         = 90

# Configuración de IAM
enable_iam_access = true
allowed_iam_principals = [
  "arn:aws:iam::123456789012:user/dev-user"
]

# Permisos específicos del rol IAM
iam_permissions = [
  "dynamodb:GetItem",
  "dynamodb:PutItem",
  "dynamodb:UpdateItem",
  "dynamodb:DeleteItem",
  "dynamodb:Query",
  "dynamodb:Scan",
  "dynamodb:DescribeTable",
  "dynamodb:GetRecords",
  "dynamodb:GetShardIterator"
]

# Tags estándar aplicados a todos los recursos
common_tags = {
  Environment  = "dev"
  Project      = "ecommerce-orders"
  ManagedBy    = "terraform"
  CostCenter   = "engineering"
  Team         = "platform"
  Compliance   = "pci-ready"
}

# Configuración de características avanzadas
enable_deletion_protection = false
enable_auto_scaling        = false

# Límites de throttle para protección
max_throttle_errors_per_second = 1000

# Configuración de logging
enable_cloudwatch_logs     = true
log_retention_days         = 7
log_level                  = "INFO"

// === ARCHIVO: infra/modules/dynamodb/main.tf ===
resource "aws_dynamodb_table" "this" {
  name           = var.table_name
  billing_mode   = var.billing_mode
  stream_enabled = var.enable_stream
  stream_view_type = var.stream_view_type

  dynamic "attribute" {
    for_each = var.attributes
    content {
      name = attribute.value.name
      type = attribute.value.type
    }
  }

  hash_key       = var.partition_key
  range_key      = var.sort_key

  dynamic "global_secondary_index" {
    for_each = var.gsi
    content {
      name            = gsi.value.name
      hash_key        = gsi.value.partition_key
      range_key       = try(gsi.value.sort_key, null)
      projection_type = try(gsi.value.projection_type, "KEYS_ONLY")
      read_capacity   = try(gsi.value.read_capacity, var.default_read_capacity)
      write_capacity  = try(gsi.value.write_capacity, var.default_write_capacity)
    }
  }

  dynamic "local_secondary_index" {
    for_each = var.lsi
    content {
      name       = lsi.value.name
      range_key  = lsi.value.sort_key
      projection_type = try(lsi.value.projection_type, "KEYS_ONLY")
    }
  }

  point_in_time_recovery {
    enabled = var.enable_pitr
  }

  ttl {
    enabled        = var.ttl_enabled
    attribute_name = var.ttl_attribute
  }

  server_side_encryption {
    enabled     = var.server_side_encryption
    kms_key_arn = var.kms_key_arn
  }

  tags = merge(
    var.tags,
    {
      "Name"        = var.table_name
      "Environment" = var.environment
      "ManagedBy"   = "Terraform"
      "Project"     = var.project
    }
  )

  lifecycle {
    ignore_changes = [tags]
  }
}

resource "aws_iam_role" "dynamodb_access" {
  count = var.create_iam_role ? 1 : 0
  name  = "${var.table_name}-access-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = ["lambda.amazonaws.com", "ecs-tasks.amazonaws.com"]
        }
      }
    ]
  })

  tags = var.tags
}

resource "aws_iam_policy" "dynamodb_table_access" {
  count = var.create_iam_role ? 1 : 0
  name  = "${var.table_name}-table-access"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:DescribeTable"
        ]
        Resource = [
          aws_dynamodb_table.this.arn,
          "${aws_dynamodb_table.this.arn}/index/*"
        ]
      }
    ]
  })

  tags = var.tags
}

resource "aws_iam_role_policy_attachment" "dynamodb_access_attachment" {
  count      = var.create_iam_role ? 1 : 0
  role       = aws_iam_role.dynamodb_access[0].name
  policy_arn = aws_iam_policy.dynamodb_table_access[0].arn
}

resource "aws_dynamodb_table_replica" "replica" {
  count = var.replica_regions != [] ? length(var.replica_regions) : 0
  provider = aws.replica
  table_name = aws_dynamodb_table.this.name
  region = var.replica_regions[count.index]
}

// === ARCHIVO: infra/modules/dynamodb/outputs.tf ===
output "table_name" {
  description = "Nombre de la tabla DynamoDB de órdenes"
  value       = aws_dynamodb_table.orders_table.name
}

output "table_arn" {
  description = "ARN de la tabla DynamoDB de órdenes"
  value       = aws_dynamodb_table.orders_table.arn
}

output "table_id" {
  description = "ID único de la tabla DynamoDB de órdenes"
  value       = aws_dynamodb_table.orders_table.id
}

output "table_stream_arn" {
  description = "ARN del stream de DynamoDB para procesamiento de eventos"
  value       = aws_dynamodb_table.orders_table.stream_arn
}

output "table_stream_label" {
  description = "Etiqueta del stream de DynamoDB"
  value       = aws_dynamodb_table.orders_table.stream_label
}

output "table_endpoint" {
  description = "Endpoint de la tabla DynamoDB"
  value       = "https://dynamodb.${var.region}.amazonaws.com"
}

output "tags" {
  description = "Tags aplicados a la tabla DynamoDB"
  value       = aws_dynamodb_table.orders_table.tags
}

output "billing_mode" {
  description = "Modo de facturación de la tabla (PAY_PER_REQUEST o PROVISIONED)"
  value       = aws_dynamodb_table.orders_table.billing_mode
}

output "deletion_protection_enabled" {
  description = "Indica si la protección contra eliminación está habilitada"
  value       = aws_dynamodb_table.orders_table.deletion_protection_enabled
}

output "read_capacity" {
  description = "Capacidad de lectura aprovisionada (si aplica)"
  value       = aws_dynamodb_table.orders_table.read_capacity
}

output "write_capacity" {
  description = "Capacidad de escritura aprovisionada (si aplica)"
  value       = aws_dynamodb_table.orders_table.write_capacity
}

output "global_secondary_indexes" {
  description = "Índices secundarios globales configurados en la tabla"
  value       = { for gsi in aws_dynamodb_table.orders_table.global_secondary_index : gsi.name => {
    hash_key       = gsi.hash_key
    range_key      = gsi.range_key
    projection_type = gsi.projection_type
    read_capacity  = gsi.read_capacity
    write_capacity = gsi.write_capacity
  }}
}

output "local_secondary_indexes" {
  description = "Índices secundarios locales configurados en la tabla"
  value       = { for lsi in aws_dynamodb_table.orders_table.local_secondary_index : lsi.name => {
    range_key       = lsi.range_key
    projection_type = lsi.projection_type
  }}
}

// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "app-items" "id"

```
